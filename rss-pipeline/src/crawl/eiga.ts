import type { CrawlItem } from "../types";
import { makeItem } from "../item";
import { fetchText } from "../http";
import { enrichArticle } from "./enrich";
import type { CrawlContext } from "./sources";

/** Anime Hack = アニメハック on anime.eiga.com (映画.com). */
const LIST = "https://anime.eiga.com/news/";

export async function crawlAnimeHack(ctx: CrawlContext): Promise<CrawlItem[]> {
  const res = await fetchText(LIST);
  if (!res.ok) throw new Error(`anime.eiga.com listing HTTP ${res.status}`);
  const hrefs = [...res.text.matchAll(/href="(\/news\/\d+\/)"/g)].map((m) => m[1]);
  const urls = [...new Set(hrefs)].slice(0, ctx.limitPerSource).map((p) => `https://anime.eiga.com${p}`);

  const out: CrawlItem[] = [];
  for (const url of urls) {
    const page = await enrichArticle(url, {
      bodyStart: /<div class="newsDetailBox/i,
      bodyEnd: /<div class="thumbnailArea/i,
    });
    if (!page?.title) continue;
    out.push(
      makeItem({
        channel: "anime",
        source: { name: "Anime Hack", site: "anime.eiga.com", url },
        publishedAt: page.publishedAt ?? new Date().toISOString(),
        titleOriginal: page.title,
        language: "ja",
        excerptOriginal: page.description,
        contentText: page.contentText,
        coverUrl: page.coverUrl,
        imageUrls: page.imageUrls,
        tags: ["animation"],
      }),
    );
  }
  return out;
}
