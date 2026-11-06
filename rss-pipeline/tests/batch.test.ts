import { describe, expect, test } from "bun:test";
import { buildBatch, batchIdNow } from "../src/batch";
import { makeItem } from "../src/item";
import type { CrawlItem } from "../src/types";

describe("buildBatch", () => {
  test("batchId uses +08:00 style", () => {
    expect(batchIdNow()).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\+08:00$/);
  });

  test("rejects empty and oversize image lists", () => {
    expect(() => buildBatch([])).toThrow();
    const base = makeItem({
      channel: "anime",
      source: { name: "t", site: "example.com", url: "https://example.com/a" },
      publishedAt: "2026-11-06T00:00:00Z",
      titleOriginal: "t",
      language: "ja",
    });
    const fat: CrawlItem = {
      ...base,
      imageUrls: Array.from({ length: 51 }, (_, i) => `https://cdn.example.com/${i}.jpg`),
    };
    expect(() => buildBatch([fat])).toThrow(/50/);
  });

  test("dedupes by normalized url", () => {
    const a = makeItem({
      channel: "anime",
      source: { name: "t", site: "example.com", url: "https://Example.com/a?utm_source=1" },
      publishedAt: "2026-11-06T00:00:00Z",
      titleOriginal: "one",
      language: "ja",
    });
    const b = makeItem({
      channel: "anime",
      source: { name: "t", site: "example.com", url: "https://example.com/a" },
      publishedAt: "2026-11-06T01:00:00Z",
      titleOriginal: "two",
      language: "ja",
    });
    const batch = buildBatch([a, b]);
    expect(batch.items).toHaveLength(1);
    expect(batch.items[0].titleOriginal).toBe("one");
  });
});
