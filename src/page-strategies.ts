import type TurndownService from "turndown";
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
  preprocessContent?(contentElement: HTMLElement): void;
  addCustomRules?(turndownService: TurndownService): void;
}
