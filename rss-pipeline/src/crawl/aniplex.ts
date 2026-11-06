import type { CrawlItem } from "../types";
import { makeItem } from "../item";
import { fetchText } from "../http";
import { enrichArticle } from "./enrich";
import type { CrawlContext } from "./sources";

const LIST = "https://news.aniplex.co.jp/?category=news";

export async function crawlAniplex(ctx: CrawlContext): Promise<CrawlItem[]> {
  const res = await fetchText(LIST);
  if (!res.ok) throw new Error(`aniplex news listing HTTP ${res.status}`);
  const ids = [...res.text.matchAll(/detail\.html\?id=(\d+)/g)].map((m) => m[1]);
  const unique = [...new Set(ids)].slice(0, ctx.limitPerSource);

  const out: CrawlItem[] = [];
  for (const id of unique) {
    // Prefer news.aniplex.co.jp detail (richer body); also emit canonical www URL style used in old feed when present.
    const url = `https://news.aniplex.co.jp/detail.html?id=${id}`;
    const page = await enrichArticle(url, {
      bodyStart: /<article class="single"/i,
      bodyEnd: /<\/article>/i,
    });
    if (!page?.title) continue;
    out.push(
      makeItem({
        channel: "anime",
        source: { name: "Aniplex 官方", site: "news.aniplex.co.jp", url },
        publishedAt: page.publishedAt ?? new Date().toISOString(),
        titleOriginal: page.title.replace(/\s*\|\s*ANIPLEX.*$/i, "").trim(),
        language: "ja",
        excerptOriginal: page.description,
        contentText: page.contentText || page.description || "",
        coverUrl: page.coverUrl,
        imageUrls: page.imageUrls,
        tags: ["animation", "aniplex"],
        guid: id,
      }),
    );
  }
  return out;
}
