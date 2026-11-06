import { fetchText } from "../http";
import { extractImgs, metaContent, sliceBetween, stripTags, titleTag } from "../html";

export type EnrichedPage = {
  title?: string;
  description?: string;
  coverUrl?: string | null;
  imageUrls: string[];
  contentText: string;
  publishedAt?: string;
};

export async function enrichArticle(
  url: string,
  opts: { bodyStart?: RegExp; bodyEnd?: RegExp } = {},
): Promise<EnrichedPage | null> {
  const res = await fetchText(url);
  if (!res.ok) return null;
  const html = res.text;
  const title =
    metaContent(html, "og:title") || metaContent(html, "twitter:title") || titleTag(html) || undefined;
  const description =
    metaContent(html, "og:description") || metaContent(html, "description") || undefined;
  const coverUrl = metaContent(html, "og:image") || metaContent(html, "twitter:image") || null;
  const bodyHtml =
    (opts.bodyStart && opts.bodyEnd
      ? sliceBetween(html, opts.bodyStart, opts.bodyEnd)
      : null) ||
    sliceBetween(html, /<article\b/i, /<\/article>/i) ||
    "";
  const imageUrls = extractImgs(bodyHtml || html, res.finalUrl);
  const contentText = stripTags(bodyHtml || description || "");
  const published =
    metaContent(html, "article:published_time") ||
    metaContent(html, "pubdate") ||
    metaContent(html, "publishdate") ||
    undefined;
  let publishedAt: string | undefined;
  if (published) {
    const t = Date.parse(published);
    if (Number.isFinite(t)) publishedAt = new Date(t).toISOString();
  }
  return {
    title: title ?? undefined,
    description: description ?? undefined,
    coverUrl,
    imageUrls,
    contentText,
    publishedAt,
  };
}
