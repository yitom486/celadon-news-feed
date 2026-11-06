import type { CrawlItem, IngestBatch } from "./types";
import { LIMITS, clampText, uniqueHttpsImages } from "./truncate";
import { normalizeSourceUrl } from "./normalize-url";
import { itemIdFromUrl } from "./id";

/** Asia/Shanghai offset label for batchId readability. */
export function batchIdNow(d = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(d);
  const g = (t: string) => parts.find((p) => p.type === t)?.value ?? "00";
  return `${g("year")}-${g("month")}-${g("day")}T${g("hour")}:${g("minute")}:${g("second")}+08:00`;
}

function sanitizeItem(item: CrawlItem): CrawlItem {
  const url = normalizeSourceUrl(item.source.url);
  const images = uniqueHttpsImages([item.coverUrl, ...item.imageUrls], { strict: true });
  const coverUrl = item.coverUrl && images.includes(item.coverUrl) ? item.coverUrl : images[0] ?? null;
  return {
    ...item,
    id: item.id || itemIdFromUrl(url),
    source: {
      ...item.source,
      url,
      site: item.source.site || new URL(url).hostname,
    },
    excerptOriginal: clampText(item.excerptOriginal ?? "", LIMITS.maxExcerptChars),
    contentText: clampText(item.contentText ?? "", LIMITS.maxContentChars),
    coverUrl,
    imageUrls: images,
    titleHintZh: item.titleHintZh ?? null,
    tags: item.tags ?? [],
  };
}

export type BuildBatchOptions = {
  batchId?: string;
  /** Drop duplicates by normalized source.url (first wins — prefer newer batches upstream). */
  dedupe?: boolean;
};

export function buildBatch(items: CrawlItem[], opts: BuildBatchOptions = {}): IngestBatch {
  if (items.length < 1) throw new Error("batch must contain 1–50 items");
  if (items.length > LIMITS.maxItemsPerBatch) {
    throw new Error(`batch has ${items.length} items; max is ${LIMITS.maxItemsPerBatch}`);
  }

  const cleaned = items.map(sanitizeItem);
  const out: CrawlItem[] = [];
  const seen = new Set<string>();
  for (const it of cleaned) {
    const key = normalizeSourceUrl(it.source.url);
    if (opts.dedupe !== false) {
      if (seen.has(key)) continue;
      seen.add(key);
    }
    // Guard image count again after sanitize
    if (it.imageUrls.length > LIMITS.maxImagesPerItem) {
      throw new Error(`${key}: >${LIMITS.maxImagesPerItem} images (receiver rejects whole batch)`);
    }
    out.push(it);
  }
  if (out.length < 1) throw new Error("batch empty after dedupe");
  if (out.length > LIMITS.maxItemsPerBatch) {
    throw new Error(`after dedupe still ${out.length} items; max ${LIMITS.maxItemsPerBatch}`);
  }

  const batch: IngestBatch = {
    batchId: opts.batchId ?? batchIdNow(),
    items: out,
  };

  const bytes = Buffer.byteLength(JSON.stringify(batch), "utf8");
  if (bytes > LIMITS.maxBodyBytes) {
    throw new Error(`batch body ${bytes} bytes exceeds 2 MiB limit`);
  }
  return batch;
}

export function chunkItems(items: CrawlItem[], size = LIMITS.maxItemsPerBatch): CrawlItem[][] {
  const chunks: CrawlItem[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}
