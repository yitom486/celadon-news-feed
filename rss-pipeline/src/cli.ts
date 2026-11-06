#!/usr/bin/env bun
import { mkdir, writeFile, readFile } from "node:fs/promises";
import { join } from "node:path";
import { crawlAll, type SourceId } from "./crawl/sources";
import { buildBatch, chunkItems, batchIdNow } from "./batch";
import { postIngest, resolveIngestToken } from "./ingest";
import type { CrawlItem, IngestBatch } from "./types";
import { normalizeSourceUrl } from "./normalize-url";

function usage() {
  console.log(`anime-rss-pipeline — crawl → ingest (raw only)

Usage:
  bun run src/cli.ts crawl [options]
  bun run src/cli.ts ingest --file out/batch-....json

crawl options:
  --channel anime|events|all     (default all)
  --only id,id                   source ids (animeanime,animehack,mantan,aniplex,ann,yunmanzhan,gxdm,chinajoy,comiday)
  --limit N                      per-source article cap (default CRAWL_LIMIT_PER_SOURCE or 12)
  --dry-run                      write JSON only; never POST
  --ingest                       POST batches when ANIME_INGEST_TOKEN is set
  --out DIR                      output directory (default ./out)

Env:
  ANIME_INGEST_TOKEN   bearer for POST /feeds/ingest (required for --ingest)
  ANIME_INGEST_URL     default https://tomy.wutsuu0577.sbs/feeds/ingest
`);
}

function arg(flag: string, argv: string[]): string | undefined {
  const i = argv.indexOf(flag);
  if (i < 0) return undefined;
  return argv[i + 1];
}

function has(flag: string, argv: string[]) {
  return argv.includes(flag);
}

async function main() {
  const argv = process.argv.slice(2);
  const cmd = argv[0];
  if (!cmd || cmd === "-h" || cmd === "--help") {
    usage();
    process.exit(cmd ? 0 : 1);
  }

  if (cmd === "crawl") {
    await runCrawl(argv.slice(1));
    return;
  }
  if (cmd === "ingest") {
    await runIngestFile(argv.slice(1));
    return;
  }
  usage();
  process.exit(1);
}

async function runCrawl(argv: string[]) {
  const channel = (arg("--channel", argv) as "anime" | "events" | "all" | undefined) ?? "all";
  const onlyRaw = arg("--only", argv);
  const only = onlyRaw ? (onlyRaw.split(",").map((s) => s.trim()) as SourceId[]) : undefined;
  const limit = Number(arg("--limit", argv) || process.env.CRAWL_LIMIT_PER_SOURCE || 12);
  const dryRun = has("--dry-run", argv) || !has("--ingest", argv);
  const doIngest = has("--ingest", argv);
  const outDir = arg("--out", argv) || join(import.meta.dir, "..", "out");

  const { items, errors } = await crawlAll({
    channel,
    only,
    limitPerSource: limit,
    log: (m) => console.log(m),
  });

  // Prefer fresher items first; avoid late old batches overwriting pending receiver drafts.
  items.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt) || a.id.localeCompare(b.id));

  const maxAgeMs = 15 * 24 * 60 * 60 * 1000;
  const cutoff = Date.now() - maxAgeMs;
  const fresh = items.filter((it) => {
    const t = Date.parse(it.publishedAt);
    return Number.isFinite(t) && t >= cutoff;
  });
  if (fresh.length !== items.length) {
    console.log(`dropped ${items.length - fresh.length} items older than 15 days (receiver 422)`);
  }

  const deduped: CrawlItem[] = [];
  const seen = new Set<string>();
  for (const it of fresh) {
    const key = normalizeSourceUrl(it.source.url);
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(it);
  }

  await mkdir(outDir, { recursive: true });
  const stamp = batchIdNow().replace(/[:]/g, "");
  const allPath = join(outDir, `crawl-${stamp}.json`);
  await writeFile(
    allPath,
    JSON.stringify({ generatedAt: new Date().toISOString(), count: deduped.length, errors, items: deduped }, null, 2) +
      "\n",
    "utf8",
  );
  console.log(`wrote ${deduped.length} items → ${allPath}`);
  if (errors.length) console.log(`source errors: ${errors.map((e) => `${e.source}:${e.error}`).join(" | ")}`);

  const chunks = chunkItems(deduped, 50);
  const batchPaths: string[] = [];
  for (let i = 0; i < chunks.length; i++) {
    const batch = buildBatch(chunks[i], { batchId: `${batchIdNow()}#${i + 1}` });
    const p = join(outDir, `batch-${stamp}-${i + 1}.json`);
    await writeFile(p, JSON.stringify(batch, null, 2) + "\n", "utf8");
    batchPaths.push(p);
    console.log(`batch ${i + 1}: ${batch.items.length} items, batchId=${batch.batchId} → ${p}`);
  }

  if (dryRun && !doIngest) {
    console.log("dry-run complete (pass --ingest with ANIME_INGEST_TOKEN to POST)");
    return;
  }

  if (doIngest) {
    if (!resolveIngestToken()) {
      console.error("ANIME_INGEST_TOKEN not set — batches saved locally only");
      process.exitCode = 2;
      return;
    }
    for (const p of batchPaths) {
      const batch = JSON.parse(await readFile(p, "utf8")) as IngestBatch;
      console.log(`POST ${batch.batchId} (${batch.items.length}) …`);
      const result = await postIngest(batch);
      console.log(JSON.stringify(result, null, 2));
      if (!result.ok) process.exitCode = 1;
    }
  }
}

async function runIngestFile(argv: string[]) {
  const file = arg("--file", argv);
  if (!file) {
    console.error("--file required");
    process.exit(1);
  }
  const raw = JSON.parse(await readFile(file, "utf8")) as IngestBatch | { items: CrawlItem[]; batchId?: string };
  const batch = buildBatch(raw.items, { batchId: "batchId" in raw ? raw.batchId : undefined });
  if (!resolveIngestToken()) {
    console.log(JSON.stringify(batch, null, 2));
    console.error("ANIME_INGEST_TOKEN missing — printed sanitized batch only");
    process.exitCode = 2;
    return;
  }
  const result = await postIngest(batch);
  console.log(JSON.stringify(result, null, 2));
  if (!result.ok) process.exitCode = 1;
}

await main();
