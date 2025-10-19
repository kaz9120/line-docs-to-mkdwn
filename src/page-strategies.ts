import type TurndownService from "turndown";
import { removeElements } from "./dom-utils";
import type { FrontMatter } from "./global";

export interface PageSelectors {
  title?: string;
  content: string;
  buttonAnchor?: string;
  excludeElements?: string[];
}

export interface PageStrategy {
  readonly name: string;
  readonly urlPattern: RegExp;
  readonly selectors: PageSelectors;

  detectPage(): boolean;
  getTitleElement(): HTMLElement | null;
  getContentElement(): HTMLElement | null;
  getButtonAnchorElement(): HTMLElement | null;
  getMetadata(): FrontMatter;
  addCustomRules?(turndownService: TurndownService): void;
  preprocessContent?(contentElement: HTMLElement): void;
}

export abstract class BasePageStrategy implements PageStrategy {
  abstract readonly name: string;
  abstract readonly urlPattern: RegExp;
  abstract readonly selectors: PageSelectors;

  detectPage(): boolean {
    return this.urlPattern.test(window.location.pathname);
  }

  getTitleElement(): HTMLElement | null {
    if (!this.selectors.title) return null;
    return document.querySelector(this.selectors.title) as HTMLElement | null;
  }

  getContentElement(): HTMLElement | null {
    return document.querySelector(this.selectors.content) as HTMLElement | null;
  }

  getButtonAnchorElement(): HTMLElement | null {
    const titleElement = this.getTitleElement();
    if (titleElement) return titleElement;

    // フォールバック: buttonAnchor指定があればそれを使用
    if (this.selectors.buttonAnchor) {
      return document.querySelector(
        this.selectors.buttonAnchor,
      ) as HTMLElement | null;
    }

    return null;
  }

  abstract getMetadata(): FrontMatter;
  addCustomRules?(turndownService: TurndownService): void;

  preprocessContent(contentElement: HTMLElement): void {
    // 共通要素の削除
    this.selectors.excludeElements?.forEach((selector) => {
      removeElements(contentElement, selector);
    });

    // 見出し内のアンカー構造を正規化
    this.normalizeHeadings(contentElement);
  }

  protected normalizeHeadings(contentElement: HTMLElement): void {
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
}
