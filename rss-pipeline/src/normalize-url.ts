/** Tracking / analytics query keys stripped on both sides. */
const TRACKING_PARAMS = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "utm_id",
  "utm_reader",
  "fbclid",
  "gclid",
  "gbraid",
  "wbraid",
  "mc_cid",
  "mc_eid",
  "igshid",
  "si",
  "spm",
  "scm",
  "from",
  "ref",
  "ref_src",
  "ref_url",
  "feature",
  "ncid",
  "cmpid",
  "yclid",
  "msclkid",
  "_ga",
  "_gl",
  "openExternalBrowser",
]);

/**
 * Normalize source.url for dedupe (aligned with receiver):
 * - lowercase host
 * - strip default ports
 * - strip plain fragment anchors (keep meaningful hash routes like #title-123 / #/path?id=)
 * - strip common tracking params; keep other query
 */
export function normalizeSourceUrl(input: string): string {
  const raw = input.trim();
  if (!raw) throw new Error("empty url");
  const url = new URL(raw);

  url.protocol = url.protocol.toLowerCase();
  url.hostname = url.hostname.toLowerCase();

  if (
    (url.protocol === "http:" && url.port === "80") ||
    (url.protocol === "https:" && url.port === "443")
  ) {
    url.port = "";
  }

  // Meaningful SPA / in-page routes use path-like hashes.
  const hash = url.hash;
  if (hash && hash.length > 1) {
    const body = hash.slice(1);
    const meaningful =
      body.startsWith("/") ||
      body.startsWith("title-") ||
      body.includes("=") ||
      body.includes("&") ||
      /^[A-Za-z][\w-]*\/.+/.test(body);
    if (!meaningful) {
      url.hash = "";
    }
  } else {
    url.hash = "";
  }

  const kept = new URLSearchParams();
  for (const [k, v] of url.searchParams) {
    if (TRACKING_PARAMS.has(k.toLowerCase())) continue;
    kept.append(k, v);
  }
  // Stable order
  const keys = [...new Set([...kept.keys()])].sort();
  const sorted = new URLSearchParams();
  for (const k of keys) {
    for (const v of kept.getAll(k)) sorted.append(k, v);
  }
  url.search = sorted.toString() ? `?${sorted.toString()}` : "";

  // Drop trailing slash on plain paths (keep root "/")
  if (url.pathname.length > 1 && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.replace(/\/+$/, "");
  }

  return url.toString();
}
