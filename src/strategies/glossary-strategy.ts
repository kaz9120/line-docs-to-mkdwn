import type TurndownService from "turndown";
import { GLOSSARY_SELECTORS, SELECTORS } from "../constants";
import { removeElements } from "../dom-utils";
import { BasePageStrategy } from "../page-strategies";

export class GlossaryPageStrategy extends BasePageStrategy {
  readonly name = "glossary";
  readonly urlPattern = /\/glossary\//;

  readonly selectors = {
    title: ".main-column h1", // 用語集ページのタイトルは h1 要素
    content: SELECTORS.CONTENT_DEFAULT,
    excludeElements: [
      SELECTORS.HEADER_ANCHOR,
      SELECTORS.COPY_BUTTON,
      GLOSSARY_SELECTORS.SIDE_COLUMN,
    ],
  };

  addCustomRules(turndownService: TurndownService): void {
    // 用語集ページ全体を表形式に変換
    turndownService.addRule("glossaryPage", {
      filter: (node: HTMLElement) => {
        return node.classList?.contains("glossary-page");
      },
      replacement: (_content: string, node: Node) => {
        const element = node as Element;
        return this.convertGlossaryToTable(element);
      },
    });
  }

  preprocessContent(contentElement: HTMLElement): void {
    // 共通要素の削除
    this.selectors.excludeElements?.forEach((selector) => {
      removeElements(contentElement, selector);
    });

    // タイトル要素を取得してcontentElementの先頭に追加
    const titleElement = this.getTitleElement();
    if (titleElement) {
      const titleClone = titleElement.cloneNode(true) as HTMLElement;
      contentElement.insertBefore(titleClone, contentElement.firstChild);
    }
  }

  private convertGlossaryToTable(glossaryElement: Element): string {
    const sections = glossaryElement.querySelectorAll(
      GLOSSARY_SELECTORS.GLOSSARY_SECTION,
    );

    if (sections.length === 0) {
      return "";
    }

    // テーブルヘッダー
    let table = "| 用語 | 説明 |\n";
    table += "|------|------|\n";

    // 各セクションを処理
    sections.forEach((section) => {
      const entries = section.querySelectorAll(
        GLOSSARY_SELECTORS.GLOSSARY_ENTRY,
      );

      entries.forEach((entry) => {
        const termElement = entry.querySelector("h3");
        const descriptionElement = entry.querySelector("p");

        if (termElement && descriptionElement) {
          const term = this.cleanTermText(termElement.textContent || "");
          const description = this.cleanDescriptionText(descriptionElement);

          table += `| ${term} | ${description} |\n`;
        }
      });
    });

    return table + "\n";
  }

  private cleanTermText(text: string): string {
    // "#" を削除し、余分な空白を削除
    return text.replace(/^#\s*/, "").trim();
  }

  private cleanDescriptionText(element: Element): string {
    // リンクのテキストのみ取得し、改行やマークダウン記号をエスケープ
    let text = element.textContent || "";
    text = text.replace(/\n/g, " "); // 改行を空白に置き換え
    text = text.replace(/\s+/g, " "); // 連続する空白を単一の空白に
    text = text.replace(/\|/g, "\\|"); // パイプ文字をエスケープ
    return text.trim();
  }
}
