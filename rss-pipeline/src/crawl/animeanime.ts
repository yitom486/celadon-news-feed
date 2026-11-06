import type { CrawlItem } from "../types";
import { makeItem } from "../item";
import { fetchRssItems } from "./rss";
import { enrichArticle } from "./enrich";
import type { CrawlContext } from "./sources";

const FEED = "https://animeanime.jp/rss20/index.rdf";

export async function crawlAnimeAnime(ctx: CrawlContext): Promise<CrawlItem[]> {
  const feedItems = (await fetchRssItems(FEED)).slice(0, ctx.limitPerSource);
  const out: CrawlItem[] = [];
  for (const it of feedItems) {
    let content = it.descriptionText ?? "";
    let images = it.imageUrls;
    let cover = images[0] ?? null;
    let publishedAt = it.publishedAt ?? new Date().toISOString();
    try {
      const page = await enrichArticle(it.link, {
        bodyStart: /<article\b[^>]*arti-body/i,
        bodyEnd: /<\/article>/i,
      });
      if (page) {
        content = page.contentText || content;
        images = [...images, ...page.imageUrls];
        cover = page.coverUrl || cover;
        publishedAt = page.publishedAt || publishedAt;
      }
    } catch {
      /* listing-level fields still usable */
    }
    out.push(
      makeItem({
        channel: "anime",
        source: { name: "Anime! Anime!", site: "animeanime.jp", url: it.link },
        publishedAt,
        titleOriginal: it.title,
        language: "ja",
        excerptOriginal: it.descriptionText,
        contentText: content,
        coverUrl: cover,
        imageUrls: images,
        tags: ["animation"],
        guid: it.guid,
      }),
    );
  }
  return out;
}
