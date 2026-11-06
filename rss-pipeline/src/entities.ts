const NAMED: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: "\u00a0",
};

export function decodeHTML(s: string): string {
  return s.replace(/&(#x?[0-9a-fA-F]+|\w+);/g, (full, body: string) => {
    if (body[0] === "#") {
      const hex = body[1] === "x" || body[1] === "X";
      const n = Number.parseInt(hex ? body.slice(2) : body.slice(1), hex ? 16 : 10);
      if (Number.isFinite(n)) return String.fromCodePoint(n);
      return full;
    }
    return NAMED[body] ?? full;
  });
}
