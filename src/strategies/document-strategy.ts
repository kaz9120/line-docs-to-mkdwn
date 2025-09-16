import { SELECTORS } from "../constants";
import { removeElements } from "../dom-utils";
import type { DocumentFrontMatter } from "../global";
import { BasePageStrategy } from "../page-strategies";

export class DocumentPageStrategy extends BasePageStrategy {
  readonly name = "document";
  readonly urlPattern = /\/(docs|reference|faq|ja\/docs)\//;

  readonly selectors = {
    title: SELECTORS.PAGE_TITLE,
    content: SELECTORS.CONTENT_DEFAULT,
    excludeElements: [SELECTORS.HEADER_ANCHOR, SELECTORS.COPY_BUTTON],
  };

  preprocessContent(contentElement: HTMLElement): void {
    // 共通要素の削除
    this.selectors.excludeElements?.forEach((selector) => {
      removeElements(contentElement, selector);
    });
  }

  getMetadata(): DocumentFrontMatter {
    return {
      url: window.location.href,
      copied_at: new Date().toISOString(),
    };
  }
}
