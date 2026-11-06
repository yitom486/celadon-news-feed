export const LIMITS = {
  maxItemsPerBatch: 50,
  maxBodyBytes: 2 * 1024 * 1024,
  maxContentChars: 60_000,
  maxExcerptChars: 6_000,
  maxImagesPerItem: 50,
} as const;

export function clampText(s: string, max: number): string {
  if (s.length <= max) return s;
  return s.slice(0, max);
}

/** Dedupe https images. If unique count > max and `strict`, throw (receiver rejects whole batch). */
export function uniqueHttpsImages(
  urls: Array<string | null | undefined>,
  opts: { max?: number; strict?: boolean } = {},
): string[] {
  const max = opts.max ?? LIMITS.maxImagesPerItem;
  const out: string[] = [];
  const seen = new Set<string>();
  for (const u of urls) {
    if (!u) continue;
    let abs: string;
    try {
      abs = new URL(u).toString();
    } catch {
      continue;
    }
    if (!/^https:/i.test(abs)) continue;
    if (seen.has(abs)) continue;
    seen.add(abs);
    out.push(abs);
  }
  if (opts.strict && out.length > max) {
    throw new Error(`more than ${max} images (${out.length}); receiver rejects the whole batch`);
  }
  return out.slice(0, max);
}
