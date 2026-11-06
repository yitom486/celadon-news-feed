import type { Channel, CrawlItem } from "../types";
import { crawlAnimeAnime } from "./animeanime";
import { crawlAnimeHack } from "./eiga";
import { crawlMantan } from "./mantan";
import { crawlAniplex } from "./aniplex";
import { crawlAnn } from "./ann";
import { crawlYunmanzhan } from "./yunmanzhan";
import { crawlGxdm } from "./gxdm";
import { crawlChinajoy } from "./chinajoy";
import { crawlComiday } from "./comiday";

export type SourceId =
  | "animeanime"
  | "animehack"
  | "mantan"
  | "aniplex"
  | "ann"
  | "yunmanzhan"
  | "gxdm"
  | "chinajoy"
  | "comiday";

export type CrawlContext = {
  limitPerSource: number;
  log?: (msg: string) => void;
};

export type SourceDef = {
  id: SourceId;
  channel: Channel;
  label: string;
  crawl: (ctx: CrawlContext) => Promise<CrawlItem[]>;
};

export const SOURCES: SourceDef[] = [
  { id: "animeanime", channel: "anime", label: "Anime! Anime!", crawl: crawlAnimeAnime },
  { id: "animehack", channel: "anime", label: "Anime Hack (anime.eiga.com)", crawl: crawlAnimeHack },
  { id: "mantan", channel: "anime", label: "MANTANWEB 动画", crawl: crawlMantan },
  { id: "aniplex", channel: "anime", label: "Aniplex 官方", crawl: crawlAniplex },
  { id: "ann", channel: "anime", label: "Anime News Network", crawl: crawlAnn },
  { id: "yunmanzhan", channel: "events", label: "次元黄页 / yunmanzhan", crawl: crawlYunmanzhan },
  { id: "gxdm", channel: "events", label: "高校动漫网", crawl: crawlGxdm },
  { id: "chinajoy", channel: "events", label: "ChinaJoy 官方", crawl: crawlChinajoy },
  { id: "comiday", channel: "events", label: "ComiDay 官方", crawl: crawlComiday },
];

export async function crawlAll(
  opts: {
    channel?: Channel | "all";
    only?: SourceId[];
    limitPerSource?: number;
    log?: (msg: string) => void;
  } = {},
): Promise<{ items: CrawlItem[]; errors: Array<{ source: string; error: string }> }> {
  const limitPerSource = opts.limitPerSource ?? Number(process.env.CRAWL_LIMIT_PER_SOURCE || 12);
  const channel = opts.channel ?? "all";
  const selected = SOURCES.filter((s) => {
    if (opts.only?.length) return opts.only.includes(s.id);
    if (channel === "all") return true;
    return s.channel === channel;
  });

  const items: CrawlItem[] = [];
  const errors: Array<{ source: string; error: string }> = [];
  const ctx: CrawlContext = { limitPerSource, log: opts.log };

  for (const src of selected) {
    opts.log?.(`crawl ${src.id} (${src.label}) …`);
    try {
      const got = await src.crawl(ctx);
      opts.log?.(`  → ${got.length} items`);
      items.push(...got);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      opts.log?.(`  ✗ ${msg}`);
      errors.push({ source: src.id, error: msg });
    }
  }
  return { items, errors };
}
