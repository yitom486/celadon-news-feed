import type { CrawlItem } from "../types";
import { makeItem } from "../item";
import { fetchText } from "../http";
import { enrichArticle } from "./enrich";
import type { CrawlContext } from "./sources";

const PORTAL = "https://www.gxdm.net/portal.php";

export async function crawlGxdm(ctx: CrawlContext): Promise<CrawlItem[]> {
  const res = await fetchText(PORTAL);
  if (!res.ok) throw new Error(`gxdm portal HTTP ${res.status}`);
  const ids = [...res.text.matchAll(/article-(\d+)-1\.html/g)].map((m) => m[1]);
  // Prefer higher ids (newer) while keeping order of appearance uniqueness
  const unique = [...new Set(ids)].slice(0, ctx.limitPerSource);

  const out: CrawlItem[] = [];
  for (const id of unique) {
    const url = `https://www.gxdm.net/article-${id}-1.html`;
    const page = await enrichArticle(url, {
      bodyStart: /<div class="ev-content/i,
      bodyEnd: /<div class="ev-|<\/div><\/div><\/div>/i,
    });
    if (!page?.title) continue;
    out.push(
      makeItem({
        channel: "events",
        source: { name: "高校动漫网", site: "www.gxdm.net", url },
        publishedAt: page.publishedAt ?? new Date().toISOString(),
        titleOriginal: page.title.replace(/\s*-\s*高校动漫网\s*$/i, "").trim(),
        language: "zh-CN",
        excerptOriginal: page.description,
        contentText: page.contentText,
        coverUrl: page.coverUrl?.includes("logo.png") ? page.imageUrls[0] ?? null : page.coverUrl,
        imageUrls: page.imageUrls.filter((u) => !/logo\.png/i.test(u)),
        tags: ["event"],
        guid: id,
        titleHintZh: page.title,
      }),
    );
  }
  return out;
}
