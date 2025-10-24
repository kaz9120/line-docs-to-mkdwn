import type TurndownService from "turndown";
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

  preprocessContent(contentElement: HTMLElement): void {
    // 親クラスの前処理を実行
    super.preprocessContent(contentElement);

    // Vue.jsのコメントマーカーを削除
    this.removeVueComments(contentElement);
  }

  private removeVueComments(contentElement: HTMLElement): void {
    // <!--[-->と<!--]-->を削除
    const walker = document.createTreeWalker(
      contentElement,
      NodeFilter.SHOW_COMMENT,
      null,
    );

    const commentsToRemove: Comment[] = [];

    while (true) {
      const node = walker.nextNode() as Comment | null;
      if (!node) break;

      if (node.nodeValue === "[" || node.nodeValue === "]") {
        commentsToRemove.push(node);
      }
    }

    for (const comment of commentsToRemove) {
      comment.remove();
    }
  }

  addCustomRules(turndownService: TurndownService): void {
    // div.relative要素をコードブロックとして変換
    turndownService.addRule("codeBlock", {
      filter: (node: HTMLElement) => {
        return (
          node.nodeName === "DIV" &&
          node.classList?.contains("relative") &&
          node.hasAttribute("code")
        );
      },
      replacement: (_content: string, node: Node) => {
        const element = node as HTMLElement;

        // code属性から実際のコード内容を取得
        const codeContent = element.getAttribute("code") || "";

        // 言語ラベルを取得
        const languageLabelElement = element.querySelector(
          ".code-language-label",
        );
        const language =
          languageLabelElement?.textContent?.trim().toLowerCase() || "";

        // マークダウンのコードブロックとして出力
        return `\n\`\`\`${language}\n${codeContent}\`\`\`\n\n`;
      },
    });
  }
}
