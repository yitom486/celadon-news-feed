import { createHash } from "node:crypto";
import { normalizeSourceUrl } from "./normalize-url";

export function itemIdFromUrl(url: string): string {
  const normalized = normalizeSourceUrl(url);
  const hash = createHash("sha256").update(normalized).digest("hex");
  return `sha256:${hash}`;
}
