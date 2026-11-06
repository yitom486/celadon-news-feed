import type { FeedArticle } from "../src/types";
import { guidFromUrl } from "../src/guid";

/**
 * Curated 日本动漫资讯 for v1.
 * Prefer primary JP reports; one item per story after host-level dedupe.
 */
export const animeArticles: FeedArticle[] = [
  {
    channel: "anime",
    title: "天原《33岁单身女骑士队长。》动画化：数字职人制作，纪念 MV 同步上线",
    link: "https://www.pashplus.jp/anime/501817/",
    publishedAt: "2026-11-06T03:45:00.000Z",
    coverUrl: "https://www.pashplus.jp/wp-content/uploads/52f1bd3f2e5342889ac76e50be981a3d.jpg",
    sourceLabel: "PASH! PLUS / Digital Shokunin",
    sources: ["pashplus.jp", "kirapo.jp", "animenewsnetwork.com"],
    guid: guidFromUrl("https://www.pashplus.jp/anime/501817/"),
    markdown: `![封面](https://www.pashplus.jp/wp-content/uploads/52f1bd3f2e5342889ac76e50be981a3d.jpg)

## 资讯归纳

数字职人株式会社（デジタル職人 / Digital Shokunin）宣布：天原漫画《33岁单身女骑士队长。》（日文原名『33歳独身女騎士隊長。』）确定动画化。消息随作品十周年节点放出，并同日公开作品 Logo、主要角色设计，以及纪念音乐视频；官方 X 与 YouTube 频道也一并开通。

纪念 MV 使用雪歌演唱的《ブギーイング☆ダンス騎士。》（可译作《Boogieing☆Dance 骑士。》），画面大量拼贴原作分镜，偏轻快流行风。放送形态、集数、档期和主创名单目前都还没公布。

## 背景补充

原作由天原执笔，他更广为人知的作品还有《异种族评论家》（『異種族レビュアーズ』）和《平稳世代的韦驮天们》（『平穏世代の韋駄天達』）。本作从 2015 年 10 月起连载，讲的是 33 岁单身女骑士队长梅尔（メイル）和伙伴们被杂务压得喘不过气、空闲时间只够喝酒睡觉的异世界喜剧；尺度偏成人向，单行本目前出到第 4 卷。

青文出版社出过中文版，分级是 18 禁。日文侧连载平台与刊载媒体在不同报道里说法不完全一致，以官方与出版社后续说明为准。数字职人官网列着漫画视频、广告动画、YouTube 动画等业务，所以这次「动画化」具体是电视番、网番还是短片向，还得等下一轮情报。

## 解读

这次更像「项目正式启动」而不是「档期官宣」。能确认的是制作方与十周年物料；不能确认的是片长形态、播出窗口，以及成人向原作上线时会不会再切分级版本。纪念曲目前也只是公开物料，还不能直接当成正片主题曲。

对天原粉丝来说，短篇节奏本来就碎，改编时怎么把一页两页的笑料串成连续影像，会是后面真正要看的点。有兴趣的话先跟官方频道，别急着按常规新番规格脑补。

## 参考链接

1. [PASH! PLUS 报道](https://www.pashplus.jp/anime/501817/)
2. [きら星ポータル 十周年短篇动画信息](https://kirapo.jp/p/informations/260115a/)
3. [Anime News Network 英文报道](https://www.animenewsnetwork.com/news/2026-11-05/amahara-33-years-old-single-girl-knight-captain-manga-gets-anime/.243579)
`,
  },
  {
    channel: "anime",
    title: "原创动画《Ninja Skooler / 忍者学校》公开试播片，剧中歌《結び目》同步上线",
    link: "https://prtimes.jp/main/html/rd/p/000000011.000141283.html",
    publishedAt: "2026-11-06T01:00:00.000Z",
    coverUrl:
      "https://prcdn.freetls.fastly.net/release_image/141283/11/141283-11-d94cd097949935fce97b20febe526949-1920x1080.png",
    sourceLabel: "PR TIMES / BLUE RIGHTS",
    sources: ["prtimes.jp", "livechart.me", "animenewsnetwork.com"],
    guid: guidFromUrl("https://prtimes.jp/main/html/rd/p/000000011.000141283.html"),
    markdown: `![封面](https://prcdn.freetls.fastly.net/release_image/141283/11/141283-11-d94cd097949935fce97b20febe526949-1920x1080.png)

## 资讯归纳

BLUE RIGHTS 公开原创动画《ニンジャスクーラー》（英文名 Ninja Skooler；中文报道里也常见「忍者学校」这一说法）的试播片，片长约 8 分 57 秒，可在官方 YouTube 观看。同期上线的还有岩见陆创作并演唱的剧中歌《結び目》（可直译为《绳结 / Knots》）。

监督与分镜是宝井俊介，角色原案为漫画家はみ（中文读者可能更熟悉他在《吹响！上低音号》漫画化一侧的名字），动画制作标注为 breccia 与 Kinema Citrus，Studio Hale 团队参与制作。项目最早可追溯到 2024 年 Anime Central 上 Kinema Citrus 的企划披露。

## 背景补充

故事讲孤儿らっぱ（Rappa）憧憬虚构忍者，雪夜坠楼时被真正的忍者御徒町和师父救下，后来三人像家人一样生活；若干年后らっぱ想成为守护小镇的忍者，师父开的駄菓子屋也成了孩子们的落脚处——直到他瞥见师父藏着的辛苦。

制作侧把街头文化与忍者动作揉进日常剧。监督提到影像尝试弱化轮廓线，让角色和背景更「溶」在一起，想表现童年那种不稳定、易受伤的感觉。官方还说希望把 IP 往漫画、短片、角色企划和周边多线铺，不只做一季电视番。

## 解读

试播片证明项目还活着，而且完成度已经能拿出来给人看；但它仍然是「pilot」，不等于正式系列的档期、集数、播出平台已经定了。歌先数发、片先公开，是近几年原创项目常见的暖场方式。

若你盯的是 Kinema Citrus 系动作与日常混搭，值得把试播片看完再决定要不要长期跟；若只等「什么时候开播」，现在还没有可写进日程表的答案。

## 参考链接

1. [BLUE RIGHTS / PR TIMES 公告](https://prtimes.jp/main/html/rd/p/000000011.000141283.html)
2. [试播片 YouTube](https://www.youtube.com/watch?v=hfrbzeG6v2I)
3. [LiveChart 条目](https://www.livechart.me/anime/13889)
`,
  },
  {
    channel: "anime",
    title: "Netflix《愚者之夜》追加若山诗音、冈本信彦等声优，主题曲与主 PV 公开",
    link: "https://anime.eiga.com/news/127807/",
    publishedAt: "2026-11-05T09:00:00.000Z",
    coverUrl: "https://media.eiga.com/images/anime/news/127807/photo/ee0d47a8840353e7/640.jpg",
    sourceLabel: "Anime Hack",
    sources: ["anime.eiga.com", "bangumi.tv", "about.netflix.com"],
    guid: guidFromUrl("https://anime.eiga.com/news/127807/"),
    markdown: `![封面](https://media.eiga.com/images/anime/news/127807/photo/ee0d47a8840353e7/640.jpg)

## 资讯归纳

动画《フールナイト》（Bangumi 中文名《愚者之夜》，英文 Fool Night）将于 2026 年 11 月 26 日起在 Netflix 全球独占、全话一举上线。本轮情报追加声优：若山诗音、冈本信彦、小林由美子、千本木彩花、土田大等，并公开主题曲信息与主 PV、主视觉。

OP 是 Tempalay 的《Shake! spit out》，ED 是 Nowlu 的《息》。动画制作是 SUNRISE × SHAFT。

## 背景补充

原作是安田佳澄在小学馆《Big Comic Superior》连载的漫画。故事舞台是厚云遮日、植物枯死、氧气短缺的未来地球；人类靠把临终者「転花」成植物来换取一点氧气。贫穷青年神谷トーシロー绝望之下接受転花，却觉醒了听见「霊花」声音的能力，之后卷入连续杀人案。

监督汤川敦之，系列构成田中仁。Netflix 侧此前已强调这是日升与 SHAFT 的首次正式联手，卖点是残酷的生态寓言加上社会派悬疑。

## 解读

11 月 26 日「全话一举」意味着不用等周更，也意味着口碑会来得很快——好与坏都会在同一周内摊开。追加卡司里，小林由美子演全身藤蔓的アイヴィー，PV 里也给了更多冲突戏份，说明正片不会只停在设定展示。

中文名以 Bangumi 的《愚者之夜》为准即可；流媒体页面仍常写 Fool Night。想追的话把档期记在 11/26，并留意分区上架是否同步。

## 参考链接

1. [Anime Hack 报道](https://anime.eiga.com/news/127807/)
2. [Bangumi：《愚者之夜》](https://bangumi.tv/subject/661692)
3. [官方站点新闻](https://www.foolnight.com/news/detail.php?id=24109)
`,
  },
  {
    channel: "anime",
    title: "《Code Geass 逐星的阿斯帕尔》公布主角声优：柴田伊凡、山村响，2027 年活动上映",
    link: "https://anime.eiga.com/news/127813/",
    publishedAt: "2026-11-05T09:00:00.000Z",
    coverUrl: "https://media.eiga.com/images/anime/news/127813/photo/728a5bc1ebf0cfd2/640.jpg",
    sourceLabel: "Anime Hack",
    sources: ["anime.eiga.com", "geass.jp", "bangumi.tv"],
    guid: guidFromUrl("https://anime.eiga.com/news/127813/"),
    markdown: `![封面](https://media.eiga.com/images/anime/news/127813/photo/728a5bc1ebf0cfd2/640.jpg)

## 资讯归纳

《コードギアス 星追いのアスパル》（Bangumi 中文名《Code Geass 逐星的阿斯帕尔》）公开主角阵容：奴隶少年アスパル由菲律宾马尼拉出身的声优柴田あいばん（萌娘百科等中文资料写作柴田伊凡）饰演，神秘女性ゾエ由山村响饰演。同期放出主视觉、引言，以及机体「アガルマータ」中的クロノス设定。

官方确认 2027 年启动活动上映，并计划从 2027 年 1 月起在全国五大城市做先行试映。监督野村和也，系列构成野崎まど，原作・企划仍是 Sunrise，故事原案大河内一楼、谷口悟朗。

## 背景补充

Code Geass 系列从 2006 年《反叛的鲁路修》起家，后来有《亡国的阿基德》《夺回的罗塞》等。本作把舞台拉到神历 606 年的「罗马帝国」，皇帝フォカス暴政与连年战争之下，失去记忆的奴隶少年在ネアポリス遇见「只剩头颅却仍活着」的ゾエ——这套开头已经和鲁路修主线的不列颠尼亚框架拉开距离。

机体类别名アガルマータ（Agalmata）是本篇新设定，クロノス只是目前公开的一台。

## 解读

活动上映 + 先行试映，说明短时间内更可能走剧场/活动窗口，而不是立刻周播电视档。声优选择上，主角起用相对年轻的柴田伊凡，搭配山村响，阵容本身就在释放「新一代 Geass」的信号。

系列老粉可以先把世界观当「同宇宙新章」看，别急着和鲁路修时间线硬对齐；具体 Geass 能力如何落地，官方还没细讲。

## 参考链接

1. [Anime Hack 报道](https://anime.eiga.com/news/127813/)
2. [公式サイト](https://geass.jp/aspal/)
3. [Bangumi 条目](https://bangumi.tv/subject/613910)
`,
  },
  {
    channel: "anime",
    title: "FNS 歌谣祭将唱《剧场版 吉伊卡哇》串烧：《今日の日はさようなら》等三曲",
    link: "https://anime.eiga.com/news/127805/",
    publishedAt: "2026-11-06T03:00:00.000Z",
    coverUrl: "https://media.eiga.com/images/anime/news/127805/photo/0fad2e9d7abc7805/640.jpg",
    sourceLabel: "Anime Hack",
    sources: ["anime.eiga.com"],
    guid: guidFromUrl("https://anime.eiga.com/news/127805/"),
    markdown: `![封面](https://media.eiga.com/images/anime/news/127805/photo/0fad2e9d7abc7805/640.jpg)

## 资讯归纳

富士电视台音乐节目《2026 FNS 歌谣祭》将播出《电影 吉伊卡哇 人鱼岛的秘密》（日文『映画ちいかわ 人魚の島のひみつ』）限定串烧，曲目为《今日の日はさようなら》《うさぎラップ／うさぎ・モモンガ・人魚》《島のうた》三首，仅在该节目中以这一编排呈现。节目第一夜定在 12 月 2 日 18 时档（日本时间）。

同档还会首次在音乐节目披露人气角色パペットスンスン的新曲《カラー》。

## 背景补充

ちいかわ（中文通称吉伊卡哇）由ナガノ创作，靠短篇漫画和动画扩散；剧场版把人鱼岛篇拉到大银幕后，歌曲本身也成了周边传播的一部分。《今日の日はさようなら》本是日本告别歌名曲，被放进吉伊卡哇语境后更偏「温柔收束」的听感。

FNS 歌谣祭一向是年末各社歌曲集中曝光的窗口，动画歌、剧场版宣传曲挤进黄金档并不稀奇，但对吉伊卡哇这种「全年龄 + 社交媒体表情包」属性的 IP 来说，电视音乐祭仍是破圈的有效位置。

## 解读

若你关心的是「能不能在华语区同步听到同样串烧」，答案通常是：日本电视直播为主，后续是否剪进碟片或正版视频平台要另等公告。三曲串烧是节目限定编曲，不等于剧场版原盘曲目顺序。

想追现场感的话，先盯 12/2 的节目表；只想听歌的话，单曲数字发行渠道往往比电视回放更快。

## 参考链接

1. [Anime Hack 报道](https://anime.eiga.com/news/127805/)
`,
  },
  {
    channel: "anime",
    title: "《药屋少女的呢喃》真人逃脱游戏第 2 弹：原创婚宴毒案，2027 年 1 月东京开跑",
    link: "https://animeanime.jp/article/2026/11/06/104528.html",
    publishedAt: "2026-11-06T03:30:00.000Z",
    coverUrl: "https://animeanime.jp/imgs/ogp_f/952448.png",
    sourceLabel: "Anime! Anime!",
    sources: ["animeanime.jp"],
    guid: guidFromUrl("https://animeanime.jp/article/2026/11/06/104528.html"),
    markdown: `![封面](https://animeanime.jp/imgs/ogp_f/952448.png)

## 资讯归纳

动画《药屋少女的呢喃》（日文『薬屋のひとりごと』）与 SCRAP「真人逃脱游戏」合作第 2 弹确定举办。作品名《殺意潜む祝宴からの脱出》（可译《杀意潜伏的祝宴逃脱》），完全原创故事并收录新录音；2027 年 1 月 28 日起先在东京 Mystery Circus 开跑，再向日本全国展开。

故事设定是某贵人婚礼上新娘突然中毒，猫猫与新娘互换身份争取时间，参加者要以见习药师身份治疗、调查并脱困。

## 背景补充

《药屋少女的呢喃》原作是日向夏的小说，动画把宫廷推理和配药细节做成了大众向爆款。SCRAP 的真人逃脱在日本落地场馆多，和人气 IP 联名通常能把「看过动画」转成「愿意出门玩一晚」的消费。

第 2 弹强调原创剧本 + 新录音，意思是不会简单复读第 1 弹线索，老玩家也得重新上手。

## 解读

目前能确定的是东京首站日期和「全国展开」方向；各城市具体场馆、票价、难度分级还要以 SCRAP 后续售票页为准。华语区玩家若想飞去玩，建议等场次表出齐再定行程，避免只看见东京日期就下单机票。

## 参考链接

1. [Anime! Anime! 报道](https://animeanime.jp/article/2026/11/06/104528.html)
`,
  },
  {
    channel: "anime",
    title: "作词家森雪之丞推出首部自传：《CHA-LA HEAD-CHA-LA》等 25 首代表作自解",
    link: "https://anime.eiga.com/news/127806/",
    publishedAt: "2026-11-04T03:00:00.000Z",
    coverUrl: "https://media.eiga.com/images/anime/news/127806/photo/233f90d0c53171e7/640.jpg",
    sourceLabel: "Anime Hack",
    sources: ["anime.eiga.com"],
    guid: guidFromUrl("https://anime.eiga.com/news/127806/"),
    markdown: `![封面](https://media.eiga.com/images/anime/news/127806/photo/233f90d0c53171e7/640.jpg)

## 资讯归纳

作词家森雪之丞的首部自传《作詞家 森雪之丞の正体》已于 11 月 4 日由 blueprint 出版，定价 3300 日元（含税）。书中回顾他自 1976 年出道以来跨偶像、动画歌、摇滚与流行的约五十年写作生涯，并收录其自选 25 首代表作的「自我解说」。

动画歌读者最熟的，大概是《龙珠 Z》前期 OP《CHA-LA HEAD-CHA-LA》，以及《筋肉人》（キン肉マン）第 1 期 OP《キン肉マンGo Fight!》；书中还涉及《限界突破×サバイバー》《葛飾ラプソディー》等后来被反复翻唱、重制的作品。

## 背景补充

森雪之丞长期处在「曲子被人记住、写词人名字不一定被记住」的位置。把代表作自己拆开讲，对做动画音乐史、做翻唱企划的人会很有用：能看到歌词里哪些意象是当时制作环境逼出来的，哪些是作者本人的执念。

中文圈对《CHA-LA HEAD-CHA-LA》几乎从不意译歌名，保留罗马字或日文专名即可；《筋肉人》是更常见的中文作品名。

## 解读

这是出版新闻，不是新番档期。若你做歌单、做节目、写动画音乐笔记，它比一般通稿有用；若只想确认「有没有新动画歌企划」，这本书本身给不了那种情报。日版到手渠道以日本书店和网上书店为准。

## 参考链接

1. [Anime Hack 报道](https://anime.eiga.com/news/127806/)
`,
  },
  {
    channel: "anime",
    title: "Animelo Summer Live 福冈 2027 公布第一弹 20 组：雅倍 T 恤屋、BLUE ENCOUNT 初登场",
    link: "https://anime.eiga.com/news/127808/",
    publishedAt: "2026-11-05T06:00:00.000Z",
    coverUrl: "https://media.eiga.com/images/anime/news/127808/photo/054dc1a66ce6d8b2/640.jpg",
    sourceLabel: "Anime Hack",
    sources: ["anime.eiga.com"],
    guid: guidFromUrl("https://anime.eiga.com/news/127808/"),
    markdown: `![封面](https://media.eiga.com/images/anime/news/127808/photo/054dc1a66ce6d8b2/640.jpg)

## 资讯归纳

2027 年 3 月 13、14 日将在瑞穗 PayPay 巨蛋福冈举办的《ANISAMA FUKUOKA 2027》（Animelo Summer Live 福冈 2027）公布第一弹出演阵容，共 20 组。其中雅倍 T 恤屋さん（ヤバイTシャツ屋さん）、BLUE ENCOUNT 为首次登上 Anisama。

## 背景补充

Animelo Summer Live 是日本最大型动画歌曲演唱会品牌之一，近年除了埼玉超级竞技场主场，也在做地方巡回与分站。福冈站落在巨蛋级别场馆，容量和舞台规格会不同于普通演唱会厅，对声优艺人与乐队混排的 Anisama 来说，意味着灯光与转场节奏都得按体育场逻辑重做。

## 解读

第一弹 20 组只是开胃菜，后续还会有追加；购票轮次、座位图、两日分流规则都以官方售票页为准。对在国内追 Anisama 的人，更实际的问题通常是：正版直播有没有、哪家平台拿授权——这些现在都还没随阵容一起宣布。

## 参考链接

1. [Anime Hack 报道](https://anime.eiga.com/news/127808/)
`,
  },
  {
    channel: "anime",
    title: "《凡尔赛玫瑰》时隔约 50 年再携东急百货店办「奥斯卡的圣诞节」",
    link: "https://animeanime.jp/article/2026/11/06/104522.html",
    publishedAt: "2026-11-06T02:40:00.000Z",
    coverUrl: "https://animeanime.jp/imgs/ogp_f/951680.jpg",
    sourceLabel: "Anime! Anime!",
    sources: ["animeanime.jp"],
    guid: guidFromUrl("https://animeanime.jp/article/2026/11/06/104522.html"),
    markdown: `![封面](https://animeanime.jp/imgs/ogp_f/951680.jpg)

## 资讯归纳

东急百货店于 2026 年 11 月 5 日至 12 月 25 日举办《凡尔赛玫瑰》（『ベルサイユのばら』）联名企划「奥斯卡的圣诞节」。官方强调这是对 1975 年圣诞节首次合作的复刻，距今约半个世纪。

内容包括需预约的联名圣诞蛋糕（预约至 12 月 16 日）、联动餐饮、快闪店，以及等身立牌等展示。购买指定蛋糕可获原创迷你色纸，图案随门店不同。

## 背景补充

《凡尔赛玫瑰》是池田理代子的经典少女漫画，奥斯卡与安德莱的形象在华语区也有很长的传播史。百货公司圣诞档本来就靠联名拉客流，把五十年前的合作拿出来复刻，等于同时打怀旧牌和新周边牌。

## 解读

这是线下零售与展览型活动，核心受众在日本东急各店辐射范围。蛋糕预约有截止日，想尝鲜的人别拖到十二月中；海外读者更实际的收获通常是活动视觉和周边图，而不是跨境寄圣诞蛋糕。

## 参考链接

1. [Anime! Anime! 报道](https://animeanime.jp/article/2026/11/06/104522.html)
`,
  },
  {
    channel: "anime",
    title: "《魔卡少女樱 透明牌篇》一番赏开售：片头服装小樱手办、库洛牌之书收纳盒领衔",
    link: "https://animeanime.jp/article/2026/11/06/104519.html",
    publishedAt: "2026-11-06T01:15:00.000Z",
    coverUrl: "https://animeanime.jp/imgs/ogp_f/951814.jpg",
    sourceLabel: "Anime! Anime!",
    sources: ["animeanime.jp"],
    guid: guidFromUrl("https://animeanime.jp/article/2026/11/06/104519.html"),
    markdown: `![封面](https://animeanime.jp/imgs/ogp_f/951814.jpg)

## 资讯归纳

BANDAI SPIRITS「一番赏 动画 魔卡少女樱 透明牌篇～Blessed collection～」自 2026 年 11 月 6 日起陆续发售，每抽 750 日元（含税）。A 赏为身着《透明牌篇》片头服装的木之本樱手办，B 赏是库洛牌之书造型小物收纳盒，C 赏为友枝小学制服造型收纳包。

## 背景补充

《魔卡少女樱》（カードキャプターさくら）在华语区长期沿用「魔卡少女樱」这一译名；《クリアカード編》通行译法是《透明牌篇》。一番赏把动画关键视觉直接做成可抽赏品，是万代很成熟的周边路径：用 A 赏手办拉高期待，再用中赏收纳类提高「抽到也不亏」的体感。

## 解读

日本便利店 / 一番赏专门店现货节奏和线上二次流转价格会差一截。若你只想要 A 赏，关注官方再贩与正规电商往往比追黄牛稳；若接受整套收集，再看中赏清单是否真的用得上。

## 参考链接

1. [Anime! Anime! 报道](https://animeanime.jp/article/2026/11/06/104519.html)
`,
  },
  {
    channel: "anime",
    title: "凯蒂猫抽奖 11 月 7 日开卖：行李箱、毛绒与首饰盒登上罗森柜台",
    link: "https://animeanime.jp/article/2026/11/06/104529.html",
    publishedAt: "2026-11-06T03:45:00.000Z",
    coverUrl: "https://animeanime.jp/imgs/ogp_f/951333.jpg",
    sourceLabel: "Anime! Anime!",
    sources: ["animeanime.jp"],
    guid: guidFromUrl("https://animeanime.jp/article/2026/11/06/104529.html"),
    markdown: `![封面](https://animeanime.jp/imgs/ogp_f/951333.jpg)

## 资讯归纳

三丽鸥「11 月 Hello Kitty 抽奖」（ハローキティの当りくじ）将于 2026 年 11 月 7 日起在日本全国罗森等店铺依次发售，每抽 990 日元（含税），售完即止。奖品包括行李箱、毛绒玩偶、首饰盒，以及挂件、马克杯、迷你托特包等；最后一位抽奖者可获最后特别奖围巾。

## 背景补充

Hello Kitty（凯蒂猫）在华语区几乎不需要再介绍。罗森「当りくじ」是日本便利店很常见的柜台式抽选，流程短、客单价固定，适合做季节主题周边。发售日按门店陆续铺货，不是全国同一小时开卖。

## 解读

这类消息对在日读者最有用；跨境代购要算上体积（行李箱）和运费。想要头奖的话，现实策略仍是看门店库存和抽选规则，不存在稳赚公式。

## 参考链接

1. [Anime! Anime! 报道](https://animeanime.jp/article/2026/11/06/104529.html)
`,
  },
];
