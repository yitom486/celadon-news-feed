import type { CrawlItem } from "../types";
import { makeItem } from "../item";
import { fetchText } from "../http";
import { stripTags } from "../html";
import type { CrawlContext } from "./sources";

/**
 * ChinaJoy site is a Vue SPA. We probe a few public list endpoints and
 * also accept hash-route URLs already used by the receiver feed shape:
 *   https://www.chinajoy.net/#/navStation/homeNewsDetail?id=…
 */
const CANDIDATE_APIS = [
  "https://www.chinajoy.net/prod-api/website/news/list?pageNum=1&pageSize=20",
  "https://www.chinajoy.net/prod-api/news/list?pageNum=1&pageSize=20",
  "https://www.chinajoy.net/api/website/article/list?page=1&size=20",
];

export async function crawlChinajoy(ctx: CrawlContext): Promise<CrawlItem[]> {
  for (const api of CANDIDATE_APIS) {
    try {
      const res = await fetchText(api, {
        headers: { accept: "application/json,text/plain,*/*" },
      });
      if (!res.ok) continue;
      const items = parseJsonList(res.text, ctx.limitPerSource);
      if (items.length) return items;
    } catch {
      /* try next */
    }
  }

  // Fallback: scrape absolute news links from homepage HTML/JS if any leaked
  const home = await fetchText("https://www.chinajoy.net/");
  if (!home.ok) throw new Error(`chinajoy home HTTP ${home.status}`);
  const ids = [...home.text.matchAll(/homeNewsDetail\?id=(\d+)/g)].map((m) => m[1]);
  const unique = [...new Set(ids)].slice(0, ctx.limitPerSource);
  if (!unique.length) {
    throw new Error(
      "chinajoy: SPA list API not reachable from this egress; add a working list endpoint or seed hash ids",
    );
  }
  return unique.map((id) =>
    makeItem({
      channel: "events",
      source: {
        name: "ChinaJoy 官方",
        site: "www.chinajoy.net",
        url: `https://www.chinajoy.net/#/navStation/homeNewsDetail?id=${id}&language=Zh`,
      },
      publishedAt: new Date().toISOString(),
      titleOriginal: `ChinaJoy 资讯 #${id}`,
      language: "zh-CN",
      excerptOriginal: "",
      contentText: "",
      coverUrl: null,
      imageUrls: [],
      tags: ["event", "chinajoy"],
      guid: id,
    }),
  );
}

function parseJsonList(text: string, limit: number): CrawlItem[] {
  let data: unknown;
  try {
    data = JSON.parse(text);
  } catch {
    return [];
  }
  const rows = pickRows(data).slice(0, limit);
  return rows
    .map((row) => {
      const id = String(row.id ?? row.newsId ?? row.articleId ?? "");
      const title = String(row.title ?? row.newsTitle ?? row.name ?? "");
      if (!id || !title) return null;
      const url = `https://www.chinajoy.net/#/navStation/homeNewsDetail?id=${id}&language=Zh`;
      const cover = (row.coverImage || row.image || row.thumb || row.pic) as string | undefined;
      const content = stripTags(String(row.content ?? row.summary ?? row.desc ?? ""));
      const published =
        String(row.publishTime ?? row.createTime ?? row.pubDate ?? "") || new Date().toISOString();
      let publishedAt = new Date().toISOString();
      const t = Date.parse(published);
      if (Number.isFinite(t)) publishedAt = new Date(t).toISOString();
      return makeItem({
        channel: "events",
        source: { name: "ChinaJoy 官方", site: "www.chinajoy.net", url },
        publishedAt,
        titleOriginal: title,
        language: "zh-CN",
        excerptOriginal: content.slice(0, 500),
        contentText: content,
        coverUrl: cover ?? null,
        imageUrls: cover ? [cover] : [],
        tags: ["event", "chinajoy"],
        guid: id,
        titleHintZh: title,
      });
    })
    .filter((x): x is CrawlItem => !!x);
}

function pickRows(data: unknown): Array<Record<string, unknown>> {
  if (!data || typeof data !== "object") return [];
  const o = data as Record<string, unknown>;
  for (const key of ["rows", "list", "records", "data", "result"]) {
    const v = o[key];
    if (Array.isArray(v)) return v as Array<Record<string, unknown>>;
    if (v && typeof v === "object") {
      const nested = pickRows(v);
      if (nested.length) return nested;
    }
  }
  return [];
}
