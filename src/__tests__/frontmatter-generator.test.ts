import { describe, expect, it } from "vitest";
import { generateFrontMatter } from "../frontmatter-generator";
import type {
  DocumentFrontMatter,
  GlossaryFrontMatter,
  NewsFrontMatter,
} from "../global";

describe("generateFrontMatter", () => {
  describe("ニュースページのフロントマター生成", () => {
    it("タグありの場合", () => {
      const metadata: NewsFrontMatter = {
        url: "https://developers.line.biz/ja/news/2024/01/15/api-update",
        copied_at: "2024-01-20T10:30:00+09:00",
        tags: ["LINE Messaging API", "アップデート"],
      };

      const result = generateFrontMatter(metadata);

      expect(result).toBe(`---
url: https://developers.line.biz/ja/news/2024/01/15/api-update
copied_at: 2024-01-20T10:30:00+09:00
tags:
  - "LINE Messaging API"
  - "アップデート"
---
`);
    });

    it("タグなしの場合", () => {
      const metadata: NewsFrontMatter = {
        url: "https://developers.line.biz/ja/news/2024/01/15/api-update",
        copied_at: "2024-01-20T10:30:00+09:00",
      };

      const result = generateFrontMatter(metadata);

      expect(result).toBe(`---
url: https://developers.line.biz/ja/news/2024/01/15/api-update
copied_at: 2024-01-20T10:30:00+09:00
---
`);
    });

    it("空のタグ配列の場合", () => {
      const metadata: NewsFrontMatter = {
        url: "https://developers.line.biz/ja/news/2024/01/15/api-update",
        copied_at: "2024-01-20T10:30:00+09:00",
        tags: [],
      };

      const result = generateFrontMatter(metadata);

      expect(result).not.toContain("tags:");
    });
  });

  describe("ドキュメントページのフロントマター生成", () => {
    it("基本フィールドのみ", () => {
      const metadata: DocumentFrontMatter = {
        url: "https://developers.line.biz/ja/docs/messaging-api/overview",
        copied_at: "2024-01-20T10:30:00+09:00",
      };

      const result = generateFrontMatter(metadata);

      expect(result).toBe(`---
url: https://developers.line.biz/ja/docs/messaging-api/overview
copied_at: 2024-01-20T10:30:00+09:00
---
`);
    });
  });

  describe("用語集ページのフロントマター生成", () => {
    it("基本フィールドのみ", () => {
      const metadata: GlossaryFrontMatter = {
        url: "https://developers.line.biz/ja/glossary/",
        copied_at: "2024-01-20T10:30:00+09:00",
      };

      const result = generateFrontMatter(metadata);

      expect(result).toBe(`---
url: https://developers.line.biz/ja/glossary/
copied_at: 2024-01-20T10:30:00+09:00
---
`);
    });
  });

  describe("文字列エスケープ", () => {
    it("タグに引用符が含まれる場合", () => {
      const metadata: NewsFrontMatter = {
        url: "https://example.com",
        copied_at: "2024-01-20T10:30:00+09:00",
        tags: ['LINE "Messaging" API', "通常タグ"],
      };

      const result = generateFrontMatter(metadata);

      expect(result).toContain('- "LINE \\"Messaging\\" API"');
      expect(result).toContain('- "通常タグ"');
    });
  });
});
