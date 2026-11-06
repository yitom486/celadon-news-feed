import type { CrawlItem } from "../types";
import { makeItem } from "../item";
import { fetchText } from "../http";
import { stripTags } from "../html";
import type { CrawlContext } from "./sources";

const HOME = "https://www.yunmanzhan.com/index.php";

/**
 * 次元黄页 cards live on the homepage as #title-{id} anchors
 * (receiver keeps meaningful hash routes).
 */
export async function crawlYunmanzhan(ctx: CrawlContext): Promise<CrawlItem[]> {
  const res = await fetchText(HOME);
  if (!res.ok) throw new Error(`yunmanzhan HTTP ${res.status}`);
  const html = res.text;
  const blocks = [...html.matchAll(/<div class="con-title-container" id="(title-\d+)"([\s\S]*?)(?=<div class="con-title-container" id="title-|\s*<\/td>)/g)];

  const out: CrawlItem[] = [];
  for (const m of blocks.slice(0, ctx.limitPerSource)) {
    const anchor = m[1];
    const chunk = m[0];
    const strong = chunk.match(/<strong>([\s\S]*?)<\/strong>/i);
    const title = strong ? stripTags(strong[1]) : anchor;
    const loc = chunk.match(/<small class="text-muted">\s*([^<]+)/i)?.[1]?.trim();
    const dateRange = chunk.match(/(\d{4}-\d{2}-\d{2}\s*至\s*\d{4}-\d{2}-\d{2})/)?.[1];
    const price = chunk.match(/(\d+\s*元(?:\s*起)?|免费)/)?.[1];
    const textParts = [title, loc, dateRange, price].filter(Boolean).join("\n");
    const imgs = [...chunk.matchAll(/(?:data-src|data-orig|src)="(upload\/[^"]+)"/gi)].map(
      (x) => new URL(x[1], "https://www.yunmanzhan.com/").toString(),
    );
    const publishedAt = dateRange?.match(/(\d{4}-\d{2}-\d{2})/)?.[1]
      ? `${dateRange.match(/(\d{4}-\d{2}-\d{2})/)![1]}T00:00:00+08:00`
      : new Date().toISOString();
    const url = `https://www.yunmanzhan.com/#${anchor}`;
    out.push(
      makeItem({
        channel: "events",
        source: { name: "次元黄页", site: "www.yunmanzhan.com", url },
        publishedAt,
        titleOriginal: title,
        language: "zh-CN",
        excerptOriginal: textParts,
        contentText: stripTags(chunk).slice(0, 8000) || textParts,
        coverUrl: imgs[0] ?? null,
        imageUrls: imgs,
        tags: ["event", "convention"],
        guid: anchor,
        titleHintZh: title,
      }),
    );
  }
  if (!out.length) throw new Error("yunmanzhan: no title-* cards parsed");
  return out;
}
