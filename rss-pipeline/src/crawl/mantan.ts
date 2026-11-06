import type { CrawlItem } from "../types";
import { makeItem } from "../item";
import { fetchText } from "../http";
import { enrichArticle } from "./enrich";
import type { CrawlContext } from "./sources";

const LIST = "https://mantan-web.jp/anime/";

export async function crawlMantan(ctx: CrawlContext): Promise<CrawlItem[]> {
  const res = await fetchText(LIST);
  if (!res.ok) throw new Error(`mantan listing HTTP ${res.status}`);
  const hrefs = [...res.text.matchAll(/href="(\/article\/[^"]+\.html)"/g)].map((m) => m[1]);
  const urls = [...new Set(hrefs)].slice(0, ctx.limitPerSource).map((p) => `https://mantan-web.jp${p}`);

  const out: CrawlItem[] = [];
  for (const url of urls) {
    const page = await enrichArticle(url);
    if (!page?.title) continue;
    out.push(
      makeItem({
        channel: "anime",
        source: { name: "MANTANWEB 动画", site: "mantan-web.jp", url },
        publishedAt: page.publishedAt ?? guessDateFromMantanUrl(url) ?? new Date().toISOString(),
        titleOriginal: page.title.replace(/\s*-\s*MANTANWEB.*$/i, "").trim(),
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

function guessDateFromMantanUrl(url: string): string | undefined {
  // /article/20261106dog00m200058000a.html
  const m = url.match(/\/article\/(\d{4})(\d{2})(\d{2})/);
  if (!m) return undefined;
  return `${m[1]}-${m[2]}-${m[3]}T00:00:00+09:00`;
}
