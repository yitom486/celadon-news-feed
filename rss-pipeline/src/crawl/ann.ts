import type { CrawlItem } from "../types";
import { makeItem } from "../item";
import { fetchRssItems } from "./rss";
import type { CrawlContext } from "./sources";

const FEED = "https://www.animenewsnetwork.com/news/rss.xml?ann-edition=w";

export async function crawlAnn(ctx: CrawlContext): Promise<CrawlItem[]> {
  let feedItems;
  try {
    feedItems = await fetchRssItems(FEED);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    throw new Error(`ANN RSS blocked or failed (${msg}). Retry from a less-filtered egress or add a mirror later.`);
  }
  return feedItems.slice(0, ctx.limitPerSource).map((it) =>
    makeItem({
      channel: "anime",
      source: { name: "Anime News Network", site: "www.animenewsnetwork.com", url: it.link },
      publishedAt: it.publishedAt ?? new Date().toISOString(),
      titleOriginal: it.title,
      language: "en",
      excerptOriginal: it.descriptionText,
      contentText: it.descriptionText ?? "",
      coverUrl: it.imageUrls[0] ?? null,
      imageUrls: it.imageUrls,
      tags: ["animation", "industry"],
      guid: it.guid,
    }),
  );
}
