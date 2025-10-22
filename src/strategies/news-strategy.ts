import type TurndownService from "turndown";
import { NEWS_SELECTORS, SELECTORS } from "../constants";
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

  /**
   * 表示されている記事要素を取得
   * display:noneでない最初の.news-article要素を返す
   */
  private getVisibleArticle(): HTMLElement | null {
    const articles = document.querySelectorAll(NEWS_SELECTORS.NEWS_ARTICLE);
    for (const article of articles) {
      const htmlElement = article as HTMLElement;
      // 計算されたスタイルでdisplayがnoneでないことを確認
      const computedStyle = window.getComputedStyle(htmlElement);
      if (computedStyle.display !== "none") {
        return htmlElement;
      }
    }
    return null;
  }

  getContentElement(): HTMLElement | null {
    // 表示されている記事を取得（タイトル、日付、コンテンツすべて含む）
    return this.getVisibleArticle();
  }

  getButtonAnchorElement(): HTMLElement | null {
    // 表示されている記事内の日付要素を取得
    const visibleArticle = this.getVisibleArticle();
    if (visibleArticle && this.selectors.buttonAnchor) {
      const dateElement = visibleArticle.querySelector(
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
