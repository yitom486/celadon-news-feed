import type { FeedArticle } from "./types";
import { markdownToHtml } from "./markdown";

function xmlEscape(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function rfc2822(iso: string) {
  const d = new Date(iso);
  if (!Number.isFinite(d.getTime())) throw new Error(`invalid publishedAt: ${iso}`);
  return d.toUTCString();
}

function buildItem(article: FeedArticle) {
  let bodyHtml = markdownToHtml(article.markdown);
  if (article.coverUrl) {
    // Site parser currently ignores enclosure attributes; put cover as first <img>
    // so a future sanitize whitelist (img/figure) can pick it up. Text still works today.
    const cover = `<p><img src="${xmlEscape(article.coverUrl)}" alt="${xmlEscape(article.title)}" /></p>\n`;
    if (!bodyHtml.includes(article.coverUrl)) bodyHtml = cover + bodyHtml;
  }

  const enclosure = article.coverUrl
    ? `\n      <enclosure url="${xmlEscape(article.coverUrl)}" type="image/jpeg" length="0" />\n      <media:content url="${xmlEscape(article.coverUrl)}" medium="image" />`
    : "";

  // description: plain-ish excerpt for clients that skip content:encoded
  const excerpt = bodyHtml
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);

  return `    <item>
      <guid isPermaLink="false">${xmlEscape(article.guid)}</guid>
      <title>${xmlEscape(article.title)}</title>
      <link>${xmlEscape(article.link)}</link>
      <pubDate>${rfc2822(article.publishedAt)}</pubDate>
      <description><![CDATA[<p>${xmlEscape(excerpt)}</p>]]></description>
      <content:encoded><![CDATA[
${bodyHtml}
]]></content:encoded>${enclosure}
    </item>`;
}

export function buildRss(opts: {
  channel: "anime" | "events";
  title: string;
  description: string;
  link: string;
  articles: FeedArticle[];
}) {
  const sorted = [...opts.articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const lastBuild = new Date().toUTCString();
  const items = sorted.map(buildItem).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${xmlEscape(opts.title)}</title>
    <link>${xmlEscape(opts.link)}</link>
    <description>${xmlEscape(opts.description)}</description>
    <language>zh-CN</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${xmlEscape(opts.link)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
}
