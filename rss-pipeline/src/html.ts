import { decodeHTML } from "./entities";

export function metaContent(html: string, prop: string): string | null {
  const re = new RegExp(
    `<meta[^>]+(?:property|name)=["']${escapeReg(prop)}["'][^>]+content=["']([^"']+)["']`,
    "i",
  );
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${escapeReg(prop)}["']`,
    "i",
  );
  return decodeHTML(match1(html, re) ?? match1(html, re2) ?? "") || null;
}

export function titleTag(html: string): string | null {
  const m = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? decodeHTML(m[1].replace(/\s+/g, " ").trim()) : null;
}

export function stripTags(html: string): string {
  return decodeHTML(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<\/div>/gi, "\n")
      .replace(/<\/h[1-6]>/gi, "\n")
      .replace(/<[^>]+>/g, " ")
      .replace(/\u00a0/g, " ")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .replace(/[ \t]{2,}/g, " ")
      .trim(),
  );
}

export function extractImgs(html: string, baseUrl: string): string[] {
  const out: string[] = [];
  const re = /<img[^>]+(?:src|data-src|data-original)=["']([^"']+)["']/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    try {
      out.push(new URL(m[1], baseUrl).toString());
    } catch {
      /* skip */
    }
  }
  return out;
}

export function sliceBetween(html: string, startRe: RegExp, endRe: RegExp): string | null {
  const s = html.search(startRe);
  if (s < 0) return null;
  const rest = html.slice(s);
  const e = rest.search(endRe);
  return e > 0 ? rest.slice(0, e) : rest.slice(0, 80_000);
}

function match1(s: string, re: RegExp): string | null {
  const m = s.match(re);
  return m?.[1] ?? null;
}

function escapeReg(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
