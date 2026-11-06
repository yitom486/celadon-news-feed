import type { FeedArticle } from "../src/types";
import { guidFromUrl } from "../src/guid";

/**
 * Curated 国内漫展资讯 for v1.
 * Same event appearing on yunmanzhan + gxdm is collapsed to one item.
 * Aggregator pages are clues — always remind readers to verify with organizers.
 */
export const eventArticles: FeedArticle[] = [
  {
    channel: "events",
    title: "烟台·永昼梦乐奇境动漫展进行中：11 月 6–8 日永旺梦乐城金沙滩店",
    link: "https://www.yunmanzhan.com/#title-13078",
    publishedAt: "2026-11-06T03:00:00.000Z",
    sourceLabel: "次元黄页",
    sources: ["yunmanzhan.com", "gxdm.net"],
    guid: guidFromUrl("https://www.yunmanzhan.com/#title-13078"),
    markdown: `## 资讯归纳

聚合站「次元黄页」显示：烟台开发区「永昼梦乐奇境动漫展」档期为 2026 年 11 月 6 日至 8 日，场馆写的是永旺梦乐城（烟台金沙滩店），地区标注山东·烟台。页面标题带「免费活动」「资料更新」，状态已从「未开始」改为「进行中」；票价栏仍出现「30 元起」字样，和「免费」说法并存，需要以主办方现场规则为准。

高校动漫网同步收录了同名活动条目，时间和场馆大体一致，属于同一场活动的多站镜像，这里合并成一条。

## 背景补充

烟台金沙滩一带的购物中心档漫展，通常吃的是周末与小长假人流，形态偏「商场联动 + 舞台/集市」，和一线城市大型展会不是同一量级。聚合站擅长把全国中小场次收进来，但字段更新频率参差不齐，标题里的「免费」有时只覆盖部分入场方式。

## 解读

若你人就在烟台，最稳的做法是到场馆当面看主办立牌和检票口说明，不要只凭聚合标题判断能不能免票。若你在外地专程跑，先找主办社媒或票务页核对开放时间和是否需要预约。本站只转述第三方聚合线索，不代表主办方刚刚官宣，也不担保活动未改期。

## 参考链接

1. [次元黄页条目](https://www.yunmanzhan.com/#title-13078)
2. [高校动漫网条目](https://www.gxdm.net/article-50436-1.html)
`,
  },
  {
    channel: "events",
    title: "哈尔滨·剑网 3 同人 ONLY 2.0：11 月 7 日江上城堡，聚合站显示已停售",
    link: "https://www.gxdm.net/article-50529-1.html",
    publishedAt: "2026-11-05T14:51:00.000Z",
    sourceLabel: "高校动漫网",
    sources: ["gxdm.net", "yunmanzhan.com"],
    guid: guidFromUrl("https://www.gxdm.net/article-50529-1.html"),
    markdown: `## 资讯归纳

「哈尔滨·剑网 3 同人 ONLY 2.0」出现在高校动漫网与次元黄页的活动列表中，日期为 2026 年 11 月 7 日，场馆写哈尔滨江上城堡。次元黄页票务状态显示「已停售」，活动状态仍标「未开始」。

## 背景补充

剑网 3（剑侠情缘网络版叁）同人 ONLY 一般以同人摊位、COS、舞台为主，体量通常小于综合漫展，但粉丝向更集中。哈尔滨冬季前后的室内场馆档期紧张，「江上城堡」这类场地常见于本地二次元中小型活动。

## 解读

「已停售」不等于活动取消，更常见的是预售结束或转现场票。去之前务必看主办最新动态：是否还有现场票、是否限制本命本、入场证件要求是什么。聚合站时间粒度有时只到日，开闭馆时刻以主办为准。

## 参考链接

1. [高校动漫网](https://www.gxdm.net/article-50529-1.html)
2. [次元黄页](https://www.yunmanzhan.com/)
`,
  },
  {
    channel: "events",
    title: "深圳·智趣动漫游戏嘉年华：聚合站标注延期，原定 11 月 7 日有来荟 UL HUB",
    link: "https://www.yunmanzhan.com/#title-12827",
    publishedAt: "2026-11-05T14:51:00.000Z",
    sourceLabel: "次元黄页",
    sources: ["yunmanzhan.com"],
    guid: guidFromUrl("https://www.yunmanzhan.com/#title-12827"),
    markdown: `## 资讯归纳

次元黄页收录「深圳·智趣动漫游戏嘉年华」，原列日期 2026 年 11 月 7 日，场馆「有来荟 UL HUB」，地区广东·深圳，票价栏写「39 元起」。当前列表状态字段显示「延期」。

## 背景补充

深圳中小型漫展、嘉年华档期密集，场地审批、档期冲突或主办运营调整都可能导致延期。聚合站能第一时间标红状态，但常常给不出新日期——这不是站点偷懒，而是主办自己还没放出下一档。

## 解读

这条的重点不是「周末去不去」，而是「先别买错日期的票」。看到延期后，应以主办公告里的新时间为准；若主办沉默，就默认原日期作废。本站不编造新档期。

## 参考链接

1. [次元黄页条目](https://www.yunmanzhan.com/#title-12827)
`,
  },
  {
    channel: "events",
    title: "西安·澜珊动漫展（于澜珊处·邂逅幻想）：11 月 7 日老钢厂创意产业园",
    link: "https://www.gxdm.net/article-49800-1.html",
    publishedAt: "2026-11-05T14:51:00.000Z",
    sourceLabel: "高校动漫网",
    sources: ["gxdm.net", "yunmanzhan.com"],
    guid: guidFromUrl("https://www.gxdm.net/article-49800-1.html"),
    markdown: `## 资讯归纳

「西安·澜珊动漫展（于澜珊处·邂逅幻想）」出现在高校动漫网与次元黄页，日期 2026 年 11 月 7 日，场馆西安老钢厂设计创意产业园，票价栏约 45 元起，状态未开始。

## 背景补充

老钢厂是西安二次元活动常用场地之一，交通和餐饮配套相对成熟，适合一日往返。标题里的副标「于澜珊处·邂逅幻想」更像本届主题文案，不额外对应另一个独立展会。

## 解读

西安同城活动信息在大众点评、主办超话、票务平台之间经常互相拷贝，建议收藏主办账号核对入场方式（电子票 / 身份证 / 是否禁止外带饮料等）。聚合站只解决「这座城市这周末有什么」，细则还得回主办。

## 参考链接

1. [高校动漫网](https://www.gxdm.net/article-49800-1.html)
2. [次元黄页](https://www.yunmanzhan.com/)
`,
  },
  {
    channel: "events",
    title: "长沙·明日方舟 × 终末地同人 ONLY：11 月 7 日长沙次元中心",
    link: "https://www.yunmanzhan.com/#title-12152",
    publishedAt: "2026-11-05T14:51:00.000Z",
    sourceLabel: "次元黄页",
    sources: ["yunmanzhan.com"],
    guid: guidFromUrl("https://www.yunmanzhan.com/#title-12152"),
    markdown: `## 资讯归纳

「长沙·首届明日方舟 × 终末地同人 ONLY 展·跨越大地的相遇」收录于次元黄页，日期 2026 年 11 月 7 日，场馆长沙次元中心，票价栏约 88 元起，状态未开始。

## 背景补充

明日方舟与终末地同属鹰角系作品宇宙的周边话题圈，双作联合 ONLY 通常会把摊位本子、COS 主题和舞台表演限制在这两条线及相关二创。票价高于同城综合小展时，多半因为场馆成本或嘉宾/舞台预算，具体构成仍要看票种说明。

## 解读

ONLY 展对「本子内容边界」「COS 武器道具」常有更细的社群规约。第一次去的人先读摊主须知和观众守则，别只看标题里的作品名就默认和综合漫展一样松。

## 参考链接

1. [次元黄页条目](https://www.yunmanzhan.com/#title-12152)
`,
  },
  {
    channel: "events",
    title: "广州·幻境动漫嘉年华 3.0：11 月 7 日健康港星河 COCO Park",
    link: "https://www.yunmanzhan.com/#title-12820",
    publishedAt: "2026-11-05T14:51:00.000Z",
    sourceLabel: "次元黄页",
    sources: ["yunmanzhan.com"],
    guid: guidFromUrl("https://www.yunmanzhan.com/#title-12820"),
    markdown: `## 资讯归纳

「广州·幻境动漫嘉年华 3.0」日期 2026 年 11 月 7 日，场馆健康港星河 COCO Park，票价栏约 39 元起，状态未开始。信息来自次元黄页聚合列表。

## 背景补充

广州商场联动型漫展密度高，COCO Park 体系场馆适合把舞台、市集和品牌快闪放在同一动线上。第 3.0 这类命名通常表示系列活动迭代，不保证与往届阵容连续。

## 解读

商场展最怕的是「票买了但楼层动线临时改」。出发前看主办当天楼层图和安检口，比纠结票面价更重要。

## 参考链接

1. [次元黄页条目](https://www.yunmanzhan.com/#title-12820)
`,
  },
  {
    channel: "events",
    title: "深圳·第三届漫次方动漫嘉年华：11 月 7–8 日新芽里，票价约 9.9 元起",
    link: "https://www.yunmanzhan.com/#title-13086",
    publishedAt: "2026-11-05T14:51:00.000Z",
    sourceLabel: "次元黄页",
    sources: ["yunmanzhan.com"],
    guid: guidFromUrl("https://www.yunmanzhan.com/#title-13086"),
    markdown: `## 资讯归纳

「深圳·第三届漫次方动漫嘉年华」档期 2026 年 11 月 7 日至 8 日，场馆新芽里，票价栏约 9.9 元起，状态未开始。来源为次元黄页。

## 背景补充

低票价两日展常见于社区商业或文创园区，目标是把周边居民和同好拉进场，而不是做大型企业级展台。第三届说明主办至少跑过两轮，但仍要用本届票种和入场规则重新核对。

## 解读

「9.9 元起」往往意味着存在更贵的 VIP / 早鸟差价，也可能只是体验票。下单前看清楚票种包含什么，避免到门口才发现无舞台区权限。

## 参考链接

1. [次元黄页条目](https://www.yunmanzhan.com/#title-13086)
`,
  },
  {
    channel: "events",
    title: "武汉·Dream Park 游戏动漫展「绮梦回响」：11 月 7–8 日武商梦时代",
    link: "https://www.yunmanzhan.com/#dream-park-wuhan-2026-11",
    publishedAt: "2026-11-05T14:51:00.000Z",
    sourceLabel: "次元黄页",
    sources: ["yunmanzhan.com"],
    guid: guidFromUrl("https://www.yunmanzhan.com/#dream-park-wuhan-2026-11"),
    markdown: `## 资讯归纳

「武汉·第三届 Dream Park 游戏动漫展 ·绮梦回响」列在次元黄页 11 月档，日期 2026 年 11 月 7 日至 8 日，场馆 WS 梦乐园（武商梦时代店），票价栏约 68 元起，状态未开始。

## 背景补充

武汉武商梦时代一带商场活动频繁，Dream Park 系列偏游戏 + 动漫综合向，和纯同人 ONLY 的人群结构不同。第三届「绮梦回响」是本届主题名。

## 解读

两日展要先确认自己买的是单日票还是通票，以及周六周日舞台表是否对称。聚合站通常不展示详细 Stage Time。

## 参考链接

1. [次元黄页](https://www.yunmanzhan.com/)
`,
  },
  {
    channel: "events",
    title: "北京·死火海同人 only 3.0：11 月 7 日超级光合，票价约 118 元起",
    link: "https://www.yunmanzhan.com/#sihuohai-only-3-2026-11",
    publishedAt: "2026-11-05T14:51:00.000Z",
    sourceLabel: "次元黄页",
    sources: ["yunmanzhan.com"],
    guid: guidFromUrl("https://www.yunmanzhan.com/#sihuohai-only-3-2026-11"),
    markdown: `## 资讯归纳

「北京·死火海同人 only 3.0」日期 2026 年 11 月 7 日，场馆超级光合，票价栏约 118 元起，状态未开始。信息来自次元黄页。

## 背景补充

死火海同人 only 属于题材向小型 ONLY，票价高于同城商场展时，通常对应场馆租金和更窄的受众。第三届说明社群有一定复访基础。

## 解读

ONLY 展对摊位内容与观众礼仪更敏感。不了解题材也想去凑热闹的话，至少先读观众须知，避免在摄影区和摊位区踩线。

## 参考链接

1. [次元黄页](https://www.yunmanzhan.com/)
`,
  },
  {
    channel: "events",
    title: "济南·蜜糖 × 次元动漫派对：11 月 7 日领秀城贵和，标题标免费但票价栏仍有数字",
    link: "https://www.yunmanzhan.com/#title-13082",
    publishedAt: "2026-11-05T14:51:00.000Z",
    sourceLabel: "次元黄页",
    sources: ["yunmanzhan.com"],
    guid: guidFromUrl("https://www.yunmanzhan.com/#title-13082"),
    markdown: `## 资讯归纳

「【免费活动】济南·2026 蜜糖 × 次元动漫派对」日期 2026 年 11 月 7 日，场馆领秀城贵和购物中心，状态未开始。标题写免费，票价栏却出现「25 元起」，两者冲突，需以主办说明为准。

## 背景补充

商场派对型活动经常「门票免费 + 部分项目收费」，或「体验票免费 / 完整票收费」。聚合站把「免费」写进标题，容易让人误判。

## 解读

出发前问清楚：是否完全免票、是否需要预约、哪些区域另收费。看到标题和票价栏打架时，默认以主办最新海报为准，而不是以聚合站标题为准。

## 参考链接

1. [次元黄页条目](https://www.yunmanzhan.com/#title-13082)
`,
  },
];
