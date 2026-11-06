# Anime upstream API — collector client notes

Receiver (authoritative production):

```
POST https://tomy.wutsuu0577.sbs/feeds/ingest
Authorization: Bearer <ANIME_INGEST_TOKEN>
Content-Type: application/json
```

This document is the **collector-side** companion. The receiver’s full contract lives on their host as `rss-pipeline/ANIME_UPSTREAM_API.md`; keep field names aligned.

## Auth

- Token is **not** a model API key.
- Receiver stores it at `/root/.config/anime-rss/upstream-auth.env`.
- Collector configures the same value as env `ANIME_INGEST_TOKEN` (see `.env.example`). Never commit the secret.

## Request body

```json
{
  "batchId": "2026-11-06T16:30:00+08:00",
  "items": [ /* 1–50 CrawlItem */ ]
}
```

### CrawlItem (raw only — no 摘要 / 背景与解读)

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | `sha256:` + hex of normalized `source.url` |
| `channel` | `"anime"` \| `"events"` | |
| `source.name` | string | Outlet label |
| `source.site` | string | Hostname |
| `source.url` | string | Canonical article / event URL (dedupe key after normalize) |
| `publishedAt` | ISO-8601 | From source when known |
| `fetchedAt` | ISO-8601 | Crawl time (UTC) |
| `titleOriginal` | string | Original-language title |
| `titleHintZh` | string \| null | Optional hint; receiver may ignore |
| `language` | string | `ja` / `en` / `zh-CN` … |
| `excerptOriginal` | string | ≤ 6 000 chars |
| `contentText` | string | Plain text body ≤ 60 000 chars |
| `coverUrl` | string \| null | https |
| `imageUrls` | string[] | https, deduped, ≤ 50 (else whole batch 422) |
| `tags` | string[] | |
| `raw.guid` | string? | Upstream guid for receipts only |

### URL normalize (both sides)

- Lowercase host; strip default ports
- Strip plain `#fragment` anchors
- **Keep** meaningful hashes (`#title-123`, `#/path?id=`)
- Strip common tracking query params; keep other query

## Responses

| Status | Meaning |
| --- | --- |
| **202** | Accepted / queued (not yet published) |
| **200** + `replayed: true` | Same `batchId` replayed |
| **401** | Bad / missing bearer |
| **409** | Same `batchId` with different body, or same URL with channel change |
| **422** | Validation (size, image count, schema) |

Limits: body ≤ 2 MiB; 1–50 items; receiver processes ~12 audit / 6 generate per minute cycle.

## Client usage

```sh
cd rss-pipeline
cp .env.example .env   # set ANIME_INGEST_TOKEN on the collector host
bun install
bun run dry-run -- --channel anime --limit 5
bun run crawl -- --channel all --ingest
bun run ingest -- --file out/batch-….json
```

Without a token, crawl still writes `out/crawl-*.json` and `out/batch-*.json` (dry-run).

## Finished feeds (site already dual-subscribes)

- https://tomy.wutsuu0577.sbs/feeds/anime.xml
- https://tomy.wutsuu0577.sbs/feeds/events.xml
- https://tomy.wutsuu0577.sbs/feeds/all.xml

Collector does **not** write D1; `animate-site` Worker keeps pulling these RSS URLs.
