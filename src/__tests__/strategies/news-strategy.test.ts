import { beforeEach, describe, expect, it, vi } from "vitest";
import { NewsPageStrategy } from "../../strategies/news-strategy";

// モックを設定してstrategy indexファイルの循環参照を回避
vi.mock("../../dom-utils", () => ({
  PAGE_STRATEGIES: [],
}));

describe("NewsPageStrategy", () => {
  let strategy: NewsPageStrategy;

  beforeEach(() => {
    strategy = new NewsPageStrategy();
    document.body.innerHTML = "";
    vi.clearAllMocks();
  });

  describe("detectPage", () => {
    it("ニュースページのURLパターンを正しく検出する", () => {
      // @ts-expect-error
      delete window.location;
      // @ts-expect-error
      window.location = { pathname: "/news/2024/01/15/api-update" };

      expect(strategy.detectPage()).toBe(true);
    });

    it("ニュースページ以外のURLでは false を返す", () => {
      // @ts-expect-error
      delete window.location;
      // @ts-expect-error
      window.location = { pathname: "/docs/messaging-api" };

      expect(strategy.detectPage()).toBe(false);
    });
  });

  describe("getMetadata", () => {
    beforeEach(() => {
      // @ts-expect-error
      delete window.location;
      // @ts-expect-error
      window.location = {
        href: "https://developers.line.biz/ja/news/2024/01/15/api-update",
        pathname: "/news/2024/01/15/api-update",
      };

      vi.spyOn(Date.prototype, "toISOString").mockReturnValue(
        "2024-01-20T10:30:00.000Z",
      );
    });

    it("タグありのニュースページのメタデータを取得", () => {
      document.body.innerHTML = `
        <div class="tags">
          <a href="/tag1">LINE Messaging API</a>
          <a href="/tag2">アップデート</a>
        </div>
      `;

      const metadata = strategy.getMetadata();

      expect(metadata).toEqual({
        url: "https://developers.line.biz/ja/news/2024/01/15/api-update",
        copied_at: "2024-01-20T10:30:00.000Z",
        tags: ["LINE Messaging API", "アップデート"],
      });
    });

    it("タグなしのニュースページのメタデータを取得", () => {
      document.body.innerHTML = `<div>コンテンツ</div>`;

      const metadata = strategy.getMetadata();

      expect(metadata).toEqual({
        url: "https://developers.line.biz/ja/news/2024/01/15/api-update",
        copied_at: "2024-01-20T10:30:00.000Z",
        tags: undefined,
      });
    });
  });

  describe("extractTags", () => {
    it("タグ要素からタグ配列を取得", () => {
      document.body.innerHTML = `
        <div class="tags">
          <a href="/tag1">タグ1</a>
          <a href="/tag2">タグ2</a>
          <a href="/tag3">タグ3</a>
        </div>
      `;

      const metadata = strategy.getMetadata();
      expect(metadata.tags).toEqual(["タグ1", "タグ2", "タグ3"]);
    });

    it("タグ要素が見つからない場合はundefinedを返す", () => {
      document.body.innerHTML = `<div>コンテンツ</div>`;

      const metadata = strategy.getMetadata();
      expect(metadata.tags).toBeUndefined();
    });

    it("空のタグ要素の場合はundefinedを返す", () => {
      document.body.innerHTML = `
        <div class="tags"></div>
      `;

      const metadata = strategy.getMetadata();
      expect(metadata.tags).toBeUndefined();
    });
  });
});
