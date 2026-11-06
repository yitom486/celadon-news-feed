import type { Channel, CrawlItem, CrawlSource } from "./types";
import { itemIdFromUrl } from "./id";
import { normalizeSourceUrl } from "./normalize-url";
import { clampText, uniqueHttpsImages, LIMITS } from "./truncate";

export function makeItem(input: {
  channel: Channel;
  source: CrawlSource;
  publishedAt: string;
  titleOriginal: string;
  language: string;
  excerptOriginal?: string;
  contentText?: string;
  coverUrl?: string | null;
  imageUrls?: string[];
  tags?: string[];
  titleHintZh?: string | null;
  guid?: string;
}): CrawlItem {
  const url = normalizeSourceUrl(input.source.url);
  const images = uniqueHttpsImages([input.coverUrl, ...(input.imageUrls ?? [])], { strict: true });
  return {
    id: itemIdFromUrl(url),
    channel: input.channel,
    source: {
      name: input.source.name,
      site: input.source.site || new URL(url).hostname,
      url,
    },
    publishedAt: input.publishedAt,
    fetchedAt: new Date().toISOString(),
    titleOriginal: input.titleOriginal.trim(),
    titleHintZh: input.titleHintZh ?? null,
    language: input.language,
    excerptOriginal: clampText(input.excerptOriginal ?? "", LIMITS.maxExcerptChars),
    contentText: clampText(input.contentText ?? "", LIMITS.maxContentChars),
    coverUrl: images[0] ?? null,
    imageUrls: images,
    tags: input.tags ?? [],
    raw: input.guid ? { guid: input.guid } : undefined,
  };
}
