import { SELECTORS } from "../constants";
import type { DocumentFrontMatter } from "../global";
import { BasePageStrategy } from "../page-strategies";

export class DocumentPageStrategy extends BasePageStrategy {
  readonly name = "document";
  readonly urlPattern = /\/(docs|reference|faq|ja\/docs)\//;

  readonly selectors = {
    title: SELECTORS.PAGE_TITLE,
    content: SELECTORS.CONTENT_DEFAULT,
    buttonAnchor: SELECTORS.PAGE_TITLE,
    excludeElements: [SELECTORS.HEADER_ANCHOR, SELECTORS.COPY_BUTTON],
  };

  getMetadata(): DocumentFrontMatter {
    return {
      url: window.location.href,
      copied_at: new Date().toISOString(),
    };
  }
}
