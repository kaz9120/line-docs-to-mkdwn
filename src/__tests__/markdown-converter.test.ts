import { beforeEach, describe, expect, it, vi } from "vitest";
import * as domUtils from "../dom-utils";
import { convertToMarkdown } from "../markdown-converter";
import {
  basicContent,
  complexContent,
  complexTableContent,
  contentWithAnchorAndButton,
  customBlockContent,
  emptyContent,
  imageContent,
  linkContent,
  tableContent,
  tableWithBreakTags,
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

    it("空のコンテンツの場合はフロントマターのみ返す", () => {
      document.body.innerHTML = emptyContent;
      const result = convertToMarkdown();

      expect(result).toContain("---");
      expect(result).toContain("url: https://developers.line.biz");
      expect(result).toContain("copied_at: ");
      expect(result).toContain("---\n");
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

    it("テーブルセル内の改行タグを適切に処理する", () => {
      document.body.innerHTML = tableWithBreakTags;
      const result = convertToMarkdown();

      expect(result).not.toBeNull();
      if (!result) return;

      // ヘッダー内の<br>タグが<br/>に変換されている
      expect(result).toContain("<br/>");
      expect(result).toContain(
        "方法1<br/>Messaging APIの<br/>「[プロフィール情報を取得する](https://developers.line.biz/ja/reference/messaging-api/#get-profile)」",
      );
      expect(result).toContain(
        "方法2<br/>LINEログインの<br/>「[ユーザー情報を取得する](https://developers.line.biz/ja/reference/line-login/#userinfo)」",
      );

      // セル内のコンテンツが正しく含まれている
      expect(result).toContain("ユーザーID");
      expect(result).toContain("✅（`userId`）");
      expect(result).toContain("✅（`sub`）");
      expect(result).toContain("表示名");
      expect(result).toContain("✅（`displayName`）");
      expect(result).toContain("✅（`name`）");

      // テーブル構造の基本チェック
      const lines = result.split("\n");
      const tableLines = lines.filter(
        (line) => line.includes("|") && line.trim() !== "",
      );

      expect(tableLines.length).toBeGreaterThanOrEqual(3); // ヘッダー、区切り線、データ行
      expect(tableLines.find((line) => line.includes("---"))).toBeDefined(); // 区切り線
    });

    it("リストと改行タグを含む複合的なテーブルを適切に処理する", () => {
      document.body.innerHTML = complexTableContent;
      const result = convertToMarkdown();

      expect(result).not.toBeNull();
      if (!result) return;

      // ヘッダーの<br>タグが<br/>に変換されている
      expect(result).toContain("iOS版LINE<br/>Android版LINE");
      expect(result).toContain("PC版LINE<br/>（macOS版、Windows版）");

      // リストが適切に含まれている
      expect(result).toContain("<ul>");
      expect(result).toContain("<li>");
      expect(result).toContain("maxWidth");
      expect(result).toContain("maxHeight");

      // バージョン情報が含まれている
      expect(result).toContain("11.22.0以上");
      expect(result).toContain("7.7.0以上");

      // テーブル構造の基本チェック
      const lines = result.split("\n");
      const tableLines = lines.filter(
        (line) => line.includes("|") && line.trim() !== "",
      );

      // ヘッダー、区切り線、データ行が存在
      expect(tableLines.length).toBeGreaterThanOrEqual(3);

      // 区切り線が存在
      expect(tableLines.find((line) => line.includes("---"))).toBeDefined();
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
