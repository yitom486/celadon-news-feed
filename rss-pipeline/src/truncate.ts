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

/** Site chrome / ads — keep content SVGs and photos; drop logos & trackers. */
function isChromeOrAdImage(pathname: string): boolean {
  const path = pathname.toLowerCase();
  const base = path.split("/").pop() ?? "";
  // filename heuristics (any extension, including .svg)
  if (
    /^(?:logo|icon|sprite|favicon|x-logo|google-icon|facebook-logo|twitter-logo|line-logo|apple-touch|og-logo)(?:[-_.].*)?\.(?:svg|png|jpe?g|webp|gif|ico)$/i.test(
      base,
    )
  ) {
    return true;
  }
  if (/(?:^|\/)(?:ads?|banner|sponsor|tracking|pixel|beacon)(?:\/|-|_)/i.test(path)) {
    return true;
  }
  // common static chrome directories with logo-ish names already covered; also bare /assets/logo*
  if (/\/(?:assets|static|common|img\/common|images\/common)\//i.test(path) && /logo|icon|sprite|favicon/i.test(base)) {
    return true;
  }
  return false;
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
    let path: string;
    try {
      const parsed = new URL(u);
      abs = parsed.toString();
      path = parsed.pathname;
    } catch {
      continue;
    }
    if (!/^https:/i.test(abs)) continue;
    // Receiver now accepts SVG as external links; still drop ads / site logos.
    if (isChromeOrAdImage(path)) continue;
    if (seen.has(abs)) continue;
    seen.add(abs);
    out.push(abs);
  }
  if (opts.strict && out.length > max) {
    throw new Error(`more than ${max} images (${out.length}); receiver rejects the whole batch`);
  }
  return out.slice(0, max);
}
