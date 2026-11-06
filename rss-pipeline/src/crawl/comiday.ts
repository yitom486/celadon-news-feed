import type { CrawlItem } from "../types";
import { makeItem } from "../item";
import { fetchText } from "../http";
import { enrichArticle } from "./enrich";
import type { CrawlContext } from "./sources";

const HOME = "https://www.comiday.org/";

export async function crawlComiday(ctx: CrawlContext): Promise<CrawlItem[]> {
  const res = await fetchText(HOME);
  if (!res.ok) throw new Error(`comiday HTTP ${res.status}`);
  const ids = [...res.text.matchAll(/[?&]act=article&id=(\d+)/g)].map((m) => m[1]);
  const unique = [...new Set(ids)].slice(0, ctx.limitPerSource);

  const out: CrawlItem[] = [];
  for (const id of unique) {
    const url = `https://www.comiday.org/?act=article&id=${id}`;
    const page = await enrichArticle(url);
    if (!page?.title) continue;
    out.push(
      makeItem({
        channel: "events",
        source: { name: "ComiDay 官方", site: "www.comiday.org", url },
        publishedAt: page.publishedAt ?? new Date().toISOString(),
        titleOriginal: page.title,
        language: "zh-CN",
        excerptOriginal: page.description,
        contentText: page.contentText,
        coverUrl: page.coverUrl,
        imageUrls: page.imageUrls,
        tags: ["event", "comiday"],
        guid: id,
        titleHintZh: page.title,
      }),
    );
  }
  return out;
}
