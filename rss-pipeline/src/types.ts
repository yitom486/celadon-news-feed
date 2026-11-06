export type Channel = "anime" | "events";

export type CrawlSource = {
  name: string;
  site: string;
  url: string;
};

/** Collector → receiver ingest item (raw crawl only; no 摘要/解读). */
export type CrawlItem = {
  id: string;
  channel: Channel;
  source: CrawlSource;
  publishedAt: string;
  fetchedAt: string;
  titleOriginal: string;
  titleHintZh: string | null;
  language: string;
  excerptOriginal: string;
  contentText: string;
  coverUrl: string | null;
  imageUrls: string[];
  tags: string[];
  raw?: { guid?: string; [key: string]: unknown };
};

export type IngestBatch = {
  batchId: string;
  items: CrawlItem[];
};

export type IngestResult =
  | { ok: true; status: 202; body: unknown }
  | { ok: true; status: 200; replayed: true; body: unknown }
  | { ok: false; status: number; error: string; body?: unknown };
