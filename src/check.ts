/**
 * Smoke-check emitted RSS with the same parse rules as animate-site parseNewsRss
 * (copied locally so we don't need animate-site node_modules).
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { XMLParser, XMLValidator } from "fast-xml-parser";
import sanitizeHtml from "sanitize-html";
import { decodeHTML } from "entities";

function sanitizeNewsHtml(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      "p", "br", "div", "span", "h2", "h3", "h4", "strong", "b", "em", "i",
      "ul", "ol", "li", "blockquote", "a", "hr", "pre", "code",
    ],
    allowedAttributes: { a: ["href", "title", "target", "rel"] },
    allowedSchemes: ["https", "http"],
    allowProtocolRelative: false,
  }).trim();
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function parseNewsRss(xml: string, channel: string) {
  if (/<!DOCTYPE|<!ENTITY/i.test(xml)) throw new Error("RSS 不允许 DTD 或实体声明");
  if (XMLValidator.validate(xml) !== true) throw new Error("RSS XML 格式错误");
  const document = new XMLParser({
    ignoreAttributes: true,
    parseTagValue: false,
    trimValues: true,
    isArray: (name) => name === "item",
  }).parse(xml);
  const feed = document?.rss?.channel;
  if (!feed || typeof feed !== "object") throw new Error("未找到 RSS 2.0 channel");
  const rows: Record<string, unknown>[] = feed.item ?? [];
  const seen = new Set<string>();
  return rows
    .map((row) => {
      const guid = text(row.guid);
      const title = text(row.title);
      const sourceUrl = text(row.link);
      const publishedAt = Date.parse(text(row.pubDate));
      const contentHtml = sanitizeNewsHtml(text(row["content:encoded"]) || text(row.description));
      if (!guid || !title || !contentHtml || !Number.isFinite(publishedAt)) {
        throw new Error("RSS 条目缺少 GUID、标题、正文或有效日期");
      }
      const url = new URL(sourceUrl);
      if (!["http:", "https:"].includes(url.protocol)) throw new Error("协议无效");
      return {
        guid,
        channel,
        title,
        sourceUrl: url.href,
        contentHtml,
        publishedAt,
        excerpt: decodeHTML(contentHtml.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim().slice(0, 180),
      };
    })
    .filter((row) => {
      if (seen.has(row.guid)) return false;
      seen.add(row.guid);
      return true;
    });
}

const dist = join(import.meta.dir, "..", "dist");
for (const [file, channel] of [
  ["anime.xml", "anime"],
  ["events.xml", "events"],
] as const) {
  const xml = await readFile(join(dist, file), "utf8");
  const rows = parseNewsRss(xml, channel);
  console.log(`${file}: parsed ${rows.length} items`);
  const sample = rows[0]!;
  console.log(`  sample: ${sample.title}`);
  console.log(`  excerpt: ${sample.excerpt.slice(0, 120)}`);
  if (!sample.contentHtml.includes("<h2>")) throw new Error(`${file}: missing h2`);
  // imgs are stripped by current sanitize — expected until site whitelist expands
  if (/<img\b/i.test(sample.contentHtml)) {
    console.warn(`  note: img survived sanitize (unexpected with current whitelist)`);
  } else {
    console.log(`  note: cover <img> stripped by current site sanitize (expected; body text remains)`);
  }
}
console.log("parseNewsRss smoke OK");
