/** Minimal Markdown → sanitize-friendly HTML for RSS content:encoded. */
export function markdownToHtml(md: string): string {
  const lines = md.replace(/\r\n/g, "\n").trim().split("\n");
  const out: string[] = [];
  let i = 0;
  let list: "ul" | "ol" | null = null;

  const flushList = () => {
    if (list) {
      out.push(`</${list}>`);
      list = null;
    }
  };

  const inline = (text: string) =>
    text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/!\[([^\]]*)\]\((https?:[^)\s]+)\)/g, '<img src="$2" alt="$1" />')
      .replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g, '<a href="$2">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/`([^`]+)`/g, "<code>$1</code>");

  while (i < lines.length) {
    const line = lines[i] ?? "";
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      i++;
      continue;
    }

    if (/^```/.test(trimmed)) {
      flushList();
      const lang = trimmed.slice(3).trim();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```/.test((lines[i] ?? "").trim())) {
        buf.push(lines[i] ?? "");
        i++;
      }
      i++; // closing fence
      const code = buf.join("\n").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      out.push(`<pre><code${lang ? ` data-lang="${lang}"` : ""}>${code}</code></pre>`);
      continue;
    }

    const h = trimmed.match(/^(#{2,3})\s+(.+)$/);
    if (h) {
      flushList();
      const level = h[1]!.length;
      out.push(`<h${level}>${inline(h[2]!)}</h${level}>`);
      i++;
      continue;
    }

    if (/^>\s?/.test(trimmed)) {
      flushList();
      const quote: string[] = [];
      while (i < lines.length && /^>\s?/.test((lines[i] ?? "").trim())) {
        quote.push((lines[i] ?? "").trim().replace(/^>\s?/, ""));
        i++;
      }
      out.push(`<blockquote><p>${inline(quote.join(" "))}</p></blockquote>`);
      continue;
    }

    const ul = trimmed.match(/^[-*]\s+(.+)$/);
    if (ul) {
      if (list !== "ul") {
        flushList();
        out.push("<ul>");
        list = "ul";
      }
      out.push(`<li>${inline(ul[1]!)}</li>`);
      i++;
      continue;
    }

    const ol = trimmed.match(/^\d+\.\s+(.+)$/);
    if (ol) {
      if (list !== "ol") {
        flushList();
        out.push("<ol>");
        list = "ol";
      }
      out.push(`<li>${inline(ol[1]!)}</li>`);
      i++;
      continue;
    }

    flushList();
    // paragraph: gather until blank
    const para: string[] = [trimmed];
    i++;
    while (i < lines.length) {
      const next = (lines[i] ?? "").trim();
      if (!next || /^(#{2,3}\s|[-*]\s|\d+\.\s|>\s?|```)/.test(next)) break;
      para.push(next);
      i++;
    }
    out.push(`<p>${inline(para.join(" "))}</p>`);
  }

  flushList();
  return out.join("\n");
}
