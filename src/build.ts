import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { animeArticles } from "../content/anime";
import { eventArticles } from "../content/events";
import { buildRss } from "./rss";
import type { FeedArticle } from "./types";

const root = join(import.meta.dir, "..");
const dist = join(root, "dist");

function assertArticles(articles: FeedArticle[], channel: string) {
  const guids = new Set<string>();
  const links = new Set<string>();
  for (const a of articles) {
    if (a.channel !== channel) throw new Error(`${a.title}: channel mismatch`);
    if (!a.guid || !a.title || !a.link || !a.markdown || !a.publishedAt) {
      throw new Error(`${a.title}: missing required fields`);
    }
    if (guids.has(a.guid)) throw new Error(`duplicate guid ${a.guid}`);
    if (links.has(a.link)) throw new Error(`duplicate link ${a.link}`);
    guids.add(a.guid);
    links.add(a.link);
    const t = Date.parse(a.publishedAt);
    if (!Number.isFinite(t)) throw new Error(`${a.title}: bad publishedAt`);
    if (a.coverUrl && !/^https:\/\//.test(a.coverUrl)) {
      throw new Error(`${a.title}: coverUrl must be https`);
    }
  }
}

assertArticles(animeArticles, "anime");
assertArticles(eventArticles, "events");

const site = "https://yitom486.github.io/celadon-news-feed";

const animeXml = buildRss({
  channel: "anime",
  title: "亚域空间 · 日本动漫资讯",
  description: "由 celadon-news-feed 整理的日本动漫资讯 RSS，供 lowbculture.com 同步 Worker 订阅。",
  link: `${site}/anime.xml`,
  articles: animeArticles,
});

const eventsXml = buildRss({
  channel: "events",
  title: "亚域空间 · 国内漫展资讯",
  description: "由 celadon-news-feed 整理的国内漫展资讯 RSS，供 lowbculture.com 同步 Worker 订阅。",
  link: `${site}/events.xml`,
  articles: eventArticles,
});

const index = {
  generatedAt: new Date().toISOString(),
  feeds: {
    anime: `${site}/anime.xml`,
    events: `${site}/events.xml`,
  },
  counts: {
    anime: animeArticles.length,
    events: eventArticles.length,
  },
  anime: animeArticles.map((a) => ({
    guid: a.guid,
    title: a.title,
    link: a.link,
    publishedAt: a.publishedAt,
    coverUrl: a.coverUrl ?? null,
    sourceLabel: a.sourceLabel,
    sources: a.sources,
  })),
  events: eventArticles.map((a) => ({
    guid: a.guid,
    title: a.title,
    link: a.link,
    publishedAt: a.publishedAt,
    coverUrl: a.coverUrl ?? null,
    sourceLabel: a.sourceLabel,
    sources: a.sources,
  })),
};

await mkdir(dist, { recursive: true });
await writeFile(join(dist, "anime.xml"), animeXml, "utf8");
await writeFile(join(dist, "events.xml"), eventsXml, "utf8");
await writeFile(join(dist, "index.json"), JSON.stringify(index, null, 2) + "\n", "utf8");
await writeFile(
  join(dist, "index.html"),
  `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>celadon-news-feed</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 720px; margin: 2rem auto; padding: 0 1rem; line-height: 1.5; }
    code { background: #f4f4f5; padding: 0.1em 0.35em; border-radius: 4px; }
    li { margin: 0.35rem 0; }
  </style>
</head>
<body>
  <h1>celadon-news-feed</h1>
  <p>亚域空间（lowbculture.com）资讯上游 RSS。Cloudflare Secrets 可指向：</p>
  <ul>
    <li><a href="./anime.xml"><code>anime.xml</code></a> — 日本动漫资讯（${animeArticles.length}）</li>
    <li><a href="./events.xml"><code>events.xml</code></a> — 国内漫展资讯（${eventArticles.length}）</li>
    <li><a href="./index.json"><code>index.json</code></a> — 调试索引</li>
  </ul>
  <p>生成时间（UTC）：${index.generatedAt}</p>
</body>
</html>
`,
  "utf8",
);

console.log(`built anime=${animeArticles.length} events=${eventArticles.length} -> ${dist}`);
