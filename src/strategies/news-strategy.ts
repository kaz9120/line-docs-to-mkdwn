import type TurndownService from "turndown";
import { BasePageStrategy } from "../page-strategies";
import { NEWS_SELECTORS, SELECTORS } from "../constants";
import { removeElements } from "../dom-utils";

export class NewsPageStrategy extends BasePageStrategy {
  readonly name = "news";
  readonly urlPattern = /\/news\/\d{4}\/\d{2}\/\d{2}\//;

  readonly selectors = {
    title: NEWS_SELECTORS.NEWS_TITLE,
    content: SELECTORS.CONTENT_DEFAULT,
    buttonAnchor: NEWS_SELECTORS.NEWS_DATE, // 日付の下にボタンを配置
    excludeElements: [
      SELECTORS.HEADER_ANCHOR,
      SELECTORS.COPY_BUTTON,
      NEWS_SELECTORS.NEWS_LINK_HIDDEN,
      NEWS_SELECTORS.TAGS_SECTION,
      NEWS_SELECTORS.PREV_NEXT_SECTION,
      NEWS_SELECTORS.SIDE_COLUMN,
      NEWS_SELECTORS.HR_SEPARATOR,
    ],
  };

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
    // ニュースタイトルをh1として扱う
    turndownService.addRule("newsTitle", {
      filter: (node: HTMLElement) => !!node.classList?.contains("news-title"),
      replacement: (content: string) => `# ${content.trim()}\n\n`,
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
  }
}
