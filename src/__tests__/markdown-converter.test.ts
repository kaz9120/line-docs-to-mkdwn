import { beforeEach, describe, expect, it, vi } from "vitest";
import * as domUtils from "../dom-utils";
import { convertToMarkdown } from "../markdown-converter";
import {
  basicContent,
  complexContent,
  contentWithAnchorAndButton,
  customBlockContent,
  emptyContent,
  imageContent,
  linkContent,
  tableContent,
} from "./fixtures/test-html";

describe("convertToMarkdown", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = "";
  });

  describe("基本的な変換機能", () => {
    it("基本的なHTML要素をMarkdownに変換する", () => {
      document.body.innerHTML = basicContent;
      const result = convertToMarkdown();

      expect(result).toContain("# 見出し1");
      expect(result).toContain("## 見出し2");
      expect(result).toContain("これは段落のテストです。");
      expect(result).toContain("*   リスト項目1");
      expect(result).toContain("*   リスト項目2");
    });

    it("空のコンテンツの場合は空文字列を返す", () => {
      document.body.innerHTML = emptyContent;
      const result = convertToMarkdown();

      expect(result).toBe("");
    });

    it("コンテンツ要素が見つからない場合はnullを返す", () => {
      document.body.innerHTML = "";
      const result = convertToMarkdown();

      expect(result).toBe(null);
    });
  });

  describe("リンク変換", () => {
    it("相対リンクを絶対URLに変換する", () => {
      document.body.innerHTML = linkContent;
      const result = convertToMarkdown();

      expect(result).toContain(
        "[相対リンク](https://developers.line.biz/docs/messaging-api)",
      );
      expect(result).toContain("[絶対リンク](https://example.com)");
    });
  });

  describe("画像変換", () => {
    it("相対パスの画像を絶対URLに変換する", () => {
      document.body.innerHTML = imageContent;
      const result = convertToMarkdown();

      expect(result).toContain(
        "![テスト画像](https://developers.line.biz/images/test.png)",
      );
      expect(result).toContain("![外部画像](https://example.com/image.jpg)");
    });
  });

  describe("テーブル変換", () => {
    it("通常のテーブルをMarkdownに変換する", () => {
      document.body.innerHTML = tableContent;
      const result = convertToMarkdown();

      expect(result).toContain("| 項目 | 説明 |");
      expect(result).toContain("| --- | --- |");
      expect(result).toContain("| 項目1 | 説明1 |");
    });

    it("テーブルセル内のリストを正しく変換する", () => {
      document.body.innerHTML = tableContent;
      const result = convertToMarkdown();

      expect(result).toContain("<ul>");
      expect(result).toContain("<li>リスト項目1</li>");
      expect(result).toContain("<li>リスト項目2</li>");
      expect(result).toContain("</ul>");
    });
  });

  describe("カスタムブロック変換", () => {
    it("infoブロックを正しく変換する", () => {
      document.body.innerHTML = customBlockContent;
      const result = convertToMarkdown();

      expect(result).toContain(":::note info");
      expect(result).toContain("情報");
      expect(result).toContain("これは情報ブロックです。");
      expect(result).toContain(":::");
    });

    it("warningブロックを正しく変換する", () => {
      document.body.innerHTML = customBlockContent;
      const result = convertToMarkdown();

      expect(result).toContain(":::note warn");
      expect(result).toContain("警告");
      expect(result).toContain("これは警告ブロックです。");
    });

    it("dangerブロックをalertとして変換する", () => {
      document.body.innerHTML = customBlockContent;
      const result = convertToMarkdown();

      expect(result).toContain(":::note alert");
      expect(result).toContain("危険");
      expect(result).toContain("これは危険ブロックです。");
    });
  });

  describe("前処理", () => {
    it("header-anchorとcopy-buttonを削除する", () => {
      document.body.innerHTML = contentWithAnchorAndButton;
      const result = convertToMarkdown();

      expect(result).not.toContain("¶");
      expect(result).not.toContain("コピーボタン");
      expect(result).toContain("## 見出し");
      expect(result).toContain("コンテンツ");
    });
  });

  describe("複合的なコンテンツの変換", () => {
    it("複雑なHTMLコンテンツを正しく変換する", () => {
      document.body.innerHTML = complexContent;
      const result = convertToMarkdown();

      // 見出し
      expect(result).toContain("# メインタイトル");
      expect(result).toContain("## 機能一覧");

      // リンク（相対パス→絶対URL）
      expect(result).toContain(
        "[機能1](https://developers.line.biz/docs/feature1)",
      );
      expect(result).toContain("[外部リンク](https://external.com)");

      // カスタムブロック
      expect(result).toContain(":::note info");
      expect(result).toContain("ヒント");

      // 画像（相対パス→絶対URL）
      expect(result).toContain(
        "![ヒント画像](https://developers.line.biz/images/tip.png)",
      );

      // テーブル
      expect(result).toContain("| API | 説明 | パラメーター |");

      // テーブル内のリスト
      expect(result).toContain("<li>text: string</li>");

      // 不要要素が削除されている
      expect(result).not.toContain("¶");
      expect(result).not.toContain("コピーボタン");
    });
  });

  describe("エラーハンドリング", () => {
    it("cloneContentElementがnullを返す場合はnullを返す", () => {
      const spy = vi
        .spyOn(domUtils, "cloneContentElement")
        .mockReturnValue(null);

      const result = convertToMarkdown();

      expect(result).toBe(null);
      expect(spy).toHaveBeenCalled();
    });
  });
});
