# celadon-news-feed

亚域空间（[lowbculture.com](https://lowbculture.com)）资讯上游 RSS。

本仓库**只产出**两个 RSS 2.0 feed，供 `animate-site` 的 `celadon-news-sync` Worker 拉取写入 D1。不改站点代码、不改 Cloudflare Secrets——Secrets 切换由站长手动完成。

## 公共地址（GitHub Pages）

生成并推送后：

| Secret 名 | 建议值 |
| --- | --- |
| `NEWS_ANIME_RSS_URL` | `https://yitom486.github.io/celadon-news-feed/anime.xml` |
| `NEWS_EVENTS_RSS_URL` | `https://yitom486.github.io/celadon-news-feed/events.xml` |

调试索引：`https://yitom486.github.io/celadon-news-feed/index.json`

备用同源（jsDelivr，Pages 未生效时可用）：

- `https://cdn.jsdelivr.net/gh/yitom486/celadon-news-feed@master/dist/anime.xml`
- `https://cdn.jsdelivr.net/gh/yitom486/celadon-news-feed@master/dist/events.xml`

## 本地生成

```sh
bun install
bun run build    # 写出 dist/anime.xml dist/events.xml dist/index.json
bun run check    # 用与站点相同的 parse/sanitize 规则冒烟
```

## 条目结构

`content/anime.ts` / `content/events.ts` 里每条 `FeedArticle`：

| 字段 | 说明 |
| --- | --- |
| `guid` | `celadon:` + 规范源 URL 的短哈希，全局唯一 |
| `title` | 中文标题 |
| `link` | 规范原文链接（多源去重后的主来源） |
| `publishedAt` | ISO-8601，来自原文时间 |
| `coverUrl` | 可选，https 封面；写入 enclosure / media:content，并作为正文首图 |
| `markdown` | 撰稿用 Markdown，构建时转 HTML 进 `content:encoded` |
| `sources` | 撰写时参考过的域名，仅调试 |

正文固定四段（不要写「AI 补充」字样）：

1. **资讯归纳** — 发生了什么
2. **背景补充** — 作品/主办/系列上下文
3. **解读** — 可确认与仍未知，不编造
4. **参考链接** — 可点回去源

专有名词：有通行中文译名（Bangumi / 常见中文资料）就用中文，并在首次出现括注日文或英文。

## 去重策略

- 动漫：同一事件只留一条，优先日文一手报道（Anime! Anime!、Anime Hack、PR TIMES、PASH 等）；ANN 作对照。
- 漫展：`yunmanzhan.com` 与 `gxdm.net` 同场合并；状态以聚合站字段转述，并提醒读者核实主办。

## 与站点解析的兼容

站点 `parseNewsRss` 需要：RSS 2.0、`guid` / `title` / `link` / `pubDate`、以及 `content:encoded` 或 `description`。当前消毒白名单**尚未**放行 `img`，因此封面图会在入库时被剥掉，文字与标题仍可用；站点放开 `img`/`figure` 并接上封面字段后，首图即可显示。

## 更新流程

1. 在 `content/*.ts` 增改稿件  
2. `bun run build && bun run check`  
3. 提交并推送 `master`（GitHub Actions 发布 Pages；`dist/` 亦入库以便 jsDelivr）

## 许可与边界

稿件为亚域空间编辑整理，转述公开报道；漫展条目标明第三方聚合线索。本 feed 可公开订阅；生产 Secrets 切换前请先在预览环境验证。
