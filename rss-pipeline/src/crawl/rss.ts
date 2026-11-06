import { XMLParser } from "fast-xml-parser";
import { fetchText } from "../http";
import { decodeHTML } from "../entities";
import { stripTags } from "../html";

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  textNodeName: "#text",
  trimValues: true,
  cdataPropName: "__cdata",
});

function textOf(node: unknown): string {
  if (node == null) return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (typeof node === "object") {
    const o = node as Record<string, unknown>;
    if ("__cdata" in o) return textOf(o.__cdata);
    if ("#text" in o) return textOf(o["#text"]);
  }
  return "";
}

function asArray<T>(v: T | T[] | undefined | null): T[] {
  if (v == null) return [];
  return Array.isArray(v) ? v : [v];
}

export type ParsedFeedItem = {
  title: string;
  link: string;
  guid?: string;
  publishedAt?: string;
  descriptionHtml?: string;
  descriptionText?: string;
  imageUrls: string[];
};

export async function fetchRssItems(feedUrl: string): Promise<ParsedFeedItem[]> {
  const res = await fetchText(feedUrl, {
    headers: { accept: "application/rss+xml,application/atom+xml,application/xml,text/xml,*/*" },
  });
  if (!res.ok) throw new Error(`RSS ${feedUrl} -> HTTP ${res.status}`);
  return parseFeedXml(res.text);
}

export function parseFeedXml(xml: string): ParsedFeedItem[] {
  const doc = parser.parse(xml);
  if (doc.rss?.channel) {
    return asArray(doc.rss.channel.item).map(mapRssItem).filter((x) => x.link && x.title);
  }
  if (doc.feed) {
    return asArray(doc.feed.entry).map(mapAtomEntry).filter((x) => x.link && x.title);
  }
  throw new Error("unrecognized feed format");
}

function mapRssItem(item: Record<string, unknown>): ParsedFeedItem {
  const title = decodeHTML(textOf(item.title));
  const link = textOf(item.link) || textOf(item.guid);
  const guid = textOf(item.guid) || undefined;
  const publishedAt = toIso(textOf(item.pubDate) || textOf(item.published));
  const descriptionHtml = textOf(item.description) || textOf(item["content:encoded"]) || undefined;
  const imageUrls: string[] = [];
  for (const media of asArray(item["media:content"])) {
    const u = (media as { "@_url"?: string })?.["@_url"];
    if (u) imageUrls.push(u);
  }
  for (const media of asArray(item["media:thumbnail"])) {
    const u = (media as { "@_url"?: string })?.["@_url"];
    if (u) imageUrls.push(u);
  }
  const enc = item.enclosure as { "@_url"?: string; "@_type"?: string } | undefined;
  if (enc?.["@_url"] && String(enc["@_type"] ?? "").startsWith("image/")) {
    imageUrls.push(enc["@_url"]);
  }
  if (descriptionHtml) {
    for (const m of descriptionHtml.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)) {
      imageUrls.push(m[1]);
    }
  }
  return {
    title,
    link,
    guid,
    publishedAt,
    descriptionHtml,
    descriptionText: descriptionHtml ? stripTags(descriptionHtml) : undefined,
    imageUrls,
  };
}

function mapAtomEntry(entry: Record<string, unknown>): ParsedFeedItem {
  const title = decodeHTML(textOf(entry.title));
  let link = "";
  for (const l of asArray(entry.link)) {
    if (typeof l === "string") {
      link = l;
      break;
    }
    const o = l as { "@_href"?: string; "@_rel"?: string };
    if (!o?.["@_href"]) continue;
    if (!o["@_rel"] || o["@_rel"] === "alternate") {
      link = o["@_href"];
      break;
    }
    if (!link) link = o["@_href"];
  }
  const publishedAt = toIso(textOf(entry.published) || textOf(entry.updated));
  const descriptionHtml = textOf(entry.content) || textOf(entry.summary) || undefined;
  const imageUrls: string[] = [];
  if (descriptionHtml) {
    for (const m of descriptionHtml.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)) {
      imageUrls.push(m[1]);
    }
  }
  return {
    title,
    link,
    guid: textOf(entry.id) || undefined,
    publishedAt,
    descriptionHtml,
    descriptionText: descriptionHtml ? stripTags(descriptionHtml) : undefined,
    imageUrls,
  };
}

function toIso(s: string): string | undefined {
  if (!s) return undefined;
  const t = Date.parse(s);
  if (!Number.isFinite(t)) return undefined;
  return new Date(t).toISOString();
}
