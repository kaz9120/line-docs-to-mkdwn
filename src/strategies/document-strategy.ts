import { BasePageStrategy } from "../page-strategies";
import { SELECTORS } from "../constants";
import { removeElements } from "../dom-utils";

export class DocumentPageStrategy extends BasePageStrategy {
  readonly name = "document";
  readonly urlPattern = /\/(docs|reference|faq|glossary|ja\/docs)\//;

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
}
