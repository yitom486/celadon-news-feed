# 给接收端智能体的交接说明（采集端现状 + 编辑提示词）

把本文整段发给 **tomy.wutsuu0577.sbs 一侧的润色/发布智能体** 即可。

---

## 1. 流水线现状（采集端）

| 角色 | 谁做 | 产出 |
| --- | --- | --- |
| 爬取 | 采集端 `celadon-news-feed/rss-pipeline` | 原始 JSON `batchId` + `items[]`（无「资讯摘要 / 背景与解读」） |
| 审核 + 中文整理 + 发布 | 接收端 | RSS 2.0：`anime.xml` / `events.xml` / `all.xml` |
| 站点展示 | `lowbculture.com` Worker 双订 RSS 入库 | 不直连采集 ingest |

- Ingest：`POST https://tomy.wutsuu0577.sbs/feeds/ingest` + `Authorization: Bearer <ANIME_INGEST_TOKEN>`
- 采集端已实现：URL 规范化、批次大小/2MiB/≤50 图校验、202/200/401/409/422 处理、网络/5xx 退避重试、无 token 时 dry-run 落盘
- **令牌**：以接收服务器 `/root/.config/anime-rss/upstream-auth.env` 为准，配置到采集机环境变量 `ANIME_INGEST_TOKEN`；不要用模型 Key，不要在聊天里索要或粘贴明文
- 采集端会尽量**先发新稿**（按 `publishedAt` 降序），避免旧批次晚到覆盖你们未发布素材
- 成品 RSS 地址不变；站点 Secrets 已可双订 tomy +（可选）Bot 撰稿源

### 当前爬取源

**anime：** Anime! Anime!（RSS）、Anime Hack=`anime.eiga.com`、MANTANWEB、Aniplex（news.aniplex.co.jp）、ANN（若 egress 被 403 会报错跳过）

**events：** 次元黄页 yunmanzhan（`#title-{id}`）、高校动漫网 gxdm、ChinaJoy（SPA，列表 API 不通时可能空）、ComiDay

字段契约见同目录 `ANIME_UPSTREAM_API.md`。

---

## 2. 采集端发给你们的 JSON 形状（输入）

与此前约定一致：`id, channel, source{name,site,url}, publishedAt, fetchedAt, titleOriginal, titleHintZh, language, excerptOriginal, contentText, coverUrl, imageUrls[], tags[], raw.guid?`

你们**不要**要求采集端再写摘要/解读；正文生成仍用你们现有流水线（每条最多取原稿前约 30 000 字）。

---

## 3. 对你们输出的期望（保持现状即可）

继续 RSS 2.0 图文即可（不必另做七字段 JSON API）：

- `category` / 频道 ↔ `channel`
- `title` ↔ 中文标题
- `link` ↔ `sourceUrl`
- `pubDate` ↔ `publishedAt`
- `media:thumbnail` ↔ `coverUrl`
- 多个 `media:content` ↔ `images[]`
- `description` + `content:encoded` = **HTML**（不是单独 markdown）

去重主键：规范化后的原文 URL；已发布动漫正文不因重复推送重写（图可补）；展会实质变更可出新版本。

---

## 4. 更新后的编辑提示词（请替换/合并进你们生成步骤）

> 你是亚域空间（lowbculture.com）资讯编辑。输入是采集端 JSON 数组中的单条原稿（日文/英文/中文皆有）。你只做整理，不爬取。
>
> **必须输出结构（写入 HTML，供 `content:encoded` / `description`）：**
> 1. 二级标题「资讯摘要」——只写可核实的事实（时间、价格、主办、作品名、是否官宣）。信息不足就写「以官方后续公布为准」，禁止编造档期/价格/阵容。
> 2. 配图：按输入 `coverUrl` / `imageUrls` 顺序使用 `<figure><img src="https://…" loading="lazy" referrerpolicy="no-referrer" /><figcaption>…</figcaption></figure>`。不下载、不托管图片；不写没见过的画面描述；没有图就不要假装有图。
> 3. 二级标题「背景与解读」——短、有信息量；补充作品/系列/主办语境与「已确认 vs 未确认」。不要出现「AI」「模型认为」「作为人工智能」等身份话术。
>
> **标题：** 外语稿译成自然中文标题；中文原稿可保留原标题并做摘要。专有名词：优先可核实的官方中文名，其次常用译名，无法确认则保留原名并括注原文。`titleHintZh` 仅作提示，不可无条件采用。
>
> **元数据：** 保留原文 `source.url` 作为 RSS `link`；`channel` 不得与输入不一致；`publishedAt` 转 RSS `pubDate`；封面写入 `media:thumbnail`，其余图写入 `media:content`。
>
> **禁止：** 把采集端 `contentText` 原样当成品；输出 markdown 代替 HTML；同一 URL 改频道；编造未出现的数据。

---

## 5. 联调建议

1. 采集端 dry-run 出真实 URL 批次（勿造假新闻）。
2. 配置好 token 后 `bun run crawl -- --channel anime --limit 3 --ingest`。
3. 期望：首包 **202**；同 `batchId` 重放 **200 replayed**；坏 token **401**。
4. 几分钟后在 `anime.xml` / `events.xml` 看是否出现对应 `link`。
5. 无公开任务状态 API —— 以 RSS 与接收端日志为准。

有问题回采集端时请带上：HTTP 状态、`batchId`、规范化后的 `source.url`、以及是否已进入 RSS。
