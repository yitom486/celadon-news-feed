import { createHash } from "node:crypto";

/** Stable non-permalink GUID derived from the canonical source URL. */
export function guidFromUrl(url: string) {
  const normalized = new URL(url).href;
  const hash = createHash("sha256").update(normalized).digest("hex").slice(0, 24);
  return `celadon:${hash}`;
}
