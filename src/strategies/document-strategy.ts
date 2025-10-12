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
    buttonAnchor: SELECTORS.PAGE_TITLE,
    excludeElements: [SELECTORS.HEADER_ANCHOR, SELECTORS.COPY_BUTTON],
  };

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

  getMetadata(): DocumentFrontMatter {
    return {
      url: window.location.href,
      copied_at: new Date().toISOString(),
    };
  }
}
