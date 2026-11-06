# rss-pipeline（采集 → ingest）

爬取日本动漫 / 国内漫展**原文素材**，按约定 POST 到接收端润色发布。  
**不做**中文摘要、背景解读或站点 D1 写入。

```
sources ──crawl──▶ CrawlItem[] ──batch──▶ POST /feeds/ingest ──▶ tomy RSS ──▶ lowbculture.com
```

## Quick start

```sh
bun install
bun test
bun run dry-run -- --channel anime --limit 3
# after ANIME_INGEST_TOKEN is set on this host:
bun run crawl -- --channel all --ingest
```

## Docs

- [`ANIME_UPSTREAM_API.md`](./ANIME_UPSTREAM_API.md) — collector client contract
- [`ANIME_UPSTREAM_HANDOFF.md`](./ANIME_UPSTREAM_HANDOFF.md) — paste to the receiving agent (status + editor prompt)

Token: set `ANIME_INGEST_TOKEN` from the receiver’s `upstream-auth.env` (never commit).
