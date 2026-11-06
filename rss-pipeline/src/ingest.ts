import type { IngestBatch, IngestResult } from "./types";
import { sleep } from "./http";

const DEFAULT_URL = "https://tomy.wutsuu0577.sbs/feeds/ingest";

export type PostIngestOptions = {
  url?: string;
  token?: string;
  maxAttempts?: number;
  /** Base delay for exponential backoff (ms). */
  baseDelayMs?: number;
};

export function resolveIngestToken(explicit?: string): string | null {
  const t = (explicit ?? process.env.ANIME_INGEST_TOKEN ?? "").trim();
  return t || null;
}

export async function postIngest(
  batch: IngestBatch,
  opts: PostIngestOptions = {},
): Promise<IngestResult> {
  const token = resolveIngestToken(opts.token);
  if (!token) {
    return {
      ok: false,
      status: 0,
      error:
        "ANIME_INGEST_TOKEN missing. Set it in the environment (see .env.example). Receiver keeps the canonical value at /root/.config/anime-rss/upstream-auth.env — do not invent a token.",
    };
  }

  const url = (opts.url ?? process.env.ANIME_INGEST_URL ?? DEFAULT_URL).trim();
  const maxAttempts = opts.maxAttempts ?? 5;
  const baseDelayMs = opts.baseDelayMs ?? 800;
  const body = JSON.stringify(batch);

  let lastErr = "unknown";
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
          accept: "application/json",
        },
        body,
      });
      const text = await res.text();
      let parsed: unknown = text;
      try {
        parsed = text ? JSON.parse(text) : null;
      } catch {
        /* keep text */
      }

      if (res.status === 202) {
        return { ok: true, status: 202, body: parsed };
      }
      if (res.status === 200) {
        const replayed =
          typeof parsed === "object" &&
          parsed !== null &&
          "replayed" in parsed &&
          (parsed as { replayed?: boolean }).replayed === true;
        if (replayed) return { ok: true, status: 200, replayed: true, body: parsed };
        // 200 without replayed still counts as accepted idempotent ack
        return { ok: true, status: 200, replayed: true, body: parsed };
      }
      if (res.status === 401 || res.status === 409 || res.status === 422) {
        return {
          ok: false,
          status: res.status,
          error: `ingest rejected with HTTP ${res.status}`,
          body: parsed,
        };
      }
      // 429 / 5xx → retry
      if (res.status === 429 || res.status >= 500) {
        lastErr = `HTTP ${res.status}`;
        if (attempt < maxAttempts) {
          await sleep(baseDelayMs * 2 ** (attempt - 1));
          continue;
        }
        return { ok: false, status: res.status, error: lastErr, body: parsed };
      }
      return {
        ok: false,
        status: res.status,
        error: `unexpected HTTP ${res.status}`,
        body: parsed,
      };
    } catch (e) {
      lastErr = e instanceof Error ? e.message : String(e);
      if (attempt < maxAttempts) {
        await sleep(baseDelayMs * 2 ** (attempt - 1));
        continue;
      }
      return { ok: false, status: 0, error: `network: ${lastErr}` };
    }
  }
  return { ok: false, status: 0, error: lastErr };
}
