import { describe, expect, test } from "bun:test";
import { normalizeSourceUrl } from "../src/normalize-url";

describe("normalizeSourceUrl", () => {
  test("lowercases host and strips default https port", () => {
    expect(normalizeSourceUrl("https://AnimeAnime.JP:443/article/1/")).toBe(
      "https://animeanime.jp/article/1",
    );
  });

  test("strips tracking params but keeps meaningful query", () => {
    expect(
      normalizeSourceUrl(
        "https://news.aniplex.co.jp/detail.html?utm_source=x&id=71636&fbclid=abc",
      ),
    ).toBe("https://news.aniplex.co.jp/detail.html?id=71636");
  });

  test("drops plain fragment anchors", () => {
    expect(normalizeSourceUrl("https://example.com/a#section")).toBe("https://example.com/a");
  });

  test("keeps meaningful hash routes", () => {
    expect(normalizeSourceUrl("https://www.yunmanzhan.com/#title-13078")).toBe(
      "https://www.yunmanzhan.com/#title-13078",
    );
    expect(
      normalizeSourceUrl(
        "https://www.chinajoy.net/#/navStation/homeNewsDetail?id=534606&language=Zh",
      ),
    ).toBe("https://www.chinajoy.net/#/navStation/homeNewsDetail?id=534606&language=Zh");
  });
});
