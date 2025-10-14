import type TurndownService from "turndown";
import { NEWS_SELECTORS, SELECTORS } from "../constants";
import { removeElements } from "../dom-utils";
import type { NewsFrontMatter } from "../global";
import { BasePageStrategy } from "../page-strategies";

export class NewsPageStrategy extends BasePageStrategy {
  readonly name = "news";
  readonly urlPattern = /\/news\/\d{4}\/\d{2}\/\d{2}\//;

  readonly selectors = {
    title: NEWS_SELECTORS.NEWS_TITLE,
    content: NEWS_SELECTORS.NEWS_ARTICLE, // .news-article 全体を取得
    buttonAnchor: NEWS_SELECTORS.NEWS_DATE, // 日付の下にボタンを配置
    excludeElements: [
      SELECTORS.HEADER_ANCHOR,
      SELECTORS.COPY_BUTTON,
      ".markdown-copy-container", // ボタンコンテナを除外
      NEWS_SELECTORS.NEWS_LINK_HIDDEN,
      NEWS_SELECTORS.TAGS_SECTION,
      NEWS_SELECTORS.PREV_NEXT_SECTION,
      NEWS_SELECTORS.SIDE_COLUMN,
      NEWS_SELECTORS.HR_SEPARATOR,
    ],
  };

  getContentElement(): HTMLElement | null {
    // .news-article 全体を取得（タイトル、日付、コンテンツすべて含む）
    return document.querySelector(
      NEWS_SELECTORS.NEWS_ARTICLE,
    ) as HTMLElement | null;
  }

  getButtonAnchorElement(): HTMLElement | null {
    // ニュースページでは日付の下にボタンを配置
    if (this.selectors.buttonAnchor) {
      const dateElement = document.querySelector(
        this.selectors.buttonAnchor,
      ) as HTMLElement | null;
      if (dateElement) return dateElement;
    }

    // フォールバック: タイトルの下に配置
    return this.getTitleElement();
  }

  addCustomRules(turndownService: TurndownService): void {
    // ニュースタイトル(.news-title)をh1として扱う
    turndownService.addRule("newsTitle", {
      filter: (node: HTMLElement) => !!node.classList?.contains("news-title"),
      replacement: (content: string) => `# ${content.trim()}\n\n`,
    });

    // 日付(.text-caption-date)を削除（フロントマターに含まれるため）
    turndownService.addRule("newsDate", {
      filter: (node: HTMLElement) =>
        node.classList?.contains("text-caption-date") ||
        node.classList?.contains("mb-20"),
      replacement: () => "",
    });

    // hr要素を除外
    turndownService.addRule("excludeHR", {
      filter: "hr",
      replacement: () => "",
    });
  }

  preprocessContent(contentElement: HTMLElement): void {
    // 共通要素の削除
    this.selectors.excludeElements?.forEach((selector) => {
      removeElements(contentElement, selector);
    });

    // 見出し内のアンカー構造を正規化
    this.normalizeHeadings(contentElement);
  }

  private normalizeHeadings(contentElement: HTMLElement): void {
    // h2, h3, h4などの見出し要素を処理
    const headings = contentElement.querySelectorAll("h2, h3, h4, h5, h6");
    headings.forEach((heading) => {
      // 見出し内の不要なdiv要素を削除（アンカー用の空div）
      const anchorDiv = heading.querySelector(
        "div.w-px.h-px.absolute",
      ) as HTMLElement;
      if (anchorDiv) {
        anchorDiv.remove();
      }

      // 見出し内のaタグからテキストを抽出して、見出し要素に直接設定
      const anchorLink = heading.querySelector(
        "a.markdown-header-anchor",
      ) as HTMLAnchorElement;
      if (anchorLink) {
        const textContent = anchorLink.textContent?.trim() || "";
        if (textContent) {
          heading.textContent = textContent;
        }
      }
    });
  }

  getMetadata(): NewsFrontMatter {
    return {
      url: window.location.href,
      copied_at: new Date().toISOString(),
      tags: this.extractTags(),
    };
  }

  private extractTags(): string[] | undefined {
    const tagsElement = document.querySelector(NEWS_SELECTORS.TAGS_SECTION);
    if (!tagsElement) return undefined;

    const tagElements = tagsElement.querySelectorAll("a");
    if (tagElements.length === 0) return undefined;

    return Array.from(tagElements)
      .map((tag) => tag.textContent?.trim() || "")
      .filter(Boolean);
  }
}
