export const DEFAULT_UA =
  process.env.CRAWL_USER_AGENT?.trim() ||
  "celadon-crawl/0.1 (+https://lowbculture.com; crawl-only)";

export async function fetchText(
  url: string,
  init: RequestInit & { timeoutMs?: number } = {},
): Promise<{ ok: boolean; status: number; text: string; finalUrl: string }> {
  const { timeoutMs = 20_000, ...rest } = init;
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      ...rest,
      redirect: "follow",
      signal: ctrl.signal,
      headers: {
        "user-agent": DEFAULT_UA,
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,application/rss+xml;q=0.8,*/*;q=0.7",
        "accept-language": "ja,zh-CN,zh;q=0.9,en;q=0.8",
        ...(rest.headers ?? {}),
      },
    });
    const text = await res.text();
    return { ok: res.ok, status: res.status, text, finalUrl: res.url };
  } finally {
    clearTimeout(t);
  }
}

export function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
