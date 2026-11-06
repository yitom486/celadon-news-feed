/** Prefer https article/poster images; skip site logos and tracking pixels. */
export function pickHttpsCover(...candidates: Array<string | undefined | null>) {
  for (const raw of candidates) {
    if (!raw) continue;
    let url: URL;
    try {
      url = new URL(raw.trim());
    } catch {
      continue;
    }
    if (url.protocol !== "https:") continue;
    const href = url.href;
    const low = href.toLowerCase();
    if (/(logo|avatar|icon|sprite|emoji|pixel|1x1|tracking)/i.test(low)) continue;
    if (/gxdm\.net\/template\//i.test(low)) continue;
    return href;
  }
  return undefined;
}

/** Pull og:image / twitter:image / first content https image from HTML. */
export function extractCoverFromHtml(html: string) {
  const metas: string[] = [];
  for (const prop of ["og:image", "twitter:image", "og:image:url", "og:image:secure_url"]) {
    const re = new RegExp(
      `<meta[^>]+(?:property|name)=["']${prop}["'][^>]+content=["']([^"']+)["']|<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${prop}["']`,
      "i",
    );
    const m = html.match(re);
    if (m) metas.push((m[1] || m[2] || "").trim());
  }
  const imgs: string[] = [];
  for (const m of html.matchAll(/<img[^>]+src=["'](https:\/\/[^"']+)["']/gi)) {
    imgs.push(m[1]!);
    if (imgs.length >= 8) break;
  }
  return pickHttpsCover(...metas, ...imgs);
}
