export type Channel = "anime" | "events";

export type FeedArticle = {
  /** Stable GUID used by the site parser; must be unique. */
  guid: string;
  channel: Channel;
  /** Chinese title for readers of 亚域空间. */
  title: string;
  /** Canonical source URL (prefer primary JP/CN report). */
  link: string;
  /** ISO-8601 publish time from the source (or best known). */
  publishedAt: string;
  /** Absolute https cover URL when available. */
  coverUrl?: string;
  /** Markdown body: 资讯归纳 / 背景补充 / 解读 / 参考链接. */
  markdown: string;
  /** Short source label for debugging. */
  sourceLabel: string;
  /** Hosts / outlets consulted while writing (for index.json). */
  sources: string[];
};
