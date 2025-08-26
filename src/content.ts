import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

// ボタンを初期化する関数
function initializeButton() {
  // ボタンが既に追加されていないか確認
  if (document.getElementById("copy-markdown-btn")) {
    return;
  }

  // タイトル要素が存在するかチェック
  const titleElement = document.querySelector("#page-title");
  if (!titleElement) {
    return;
  }

  // 1. ボタン要素を作成
  const button = document.createElement("button");
  button.id = "copy-markdown-btn";
  button.textContent = "Markdownコピー";
  button.className = "copy-markdown-button";

  // 2. ボタンをページのタイトル横に追加
  titleElement.appendChild(button);

  // 3. ボタンがクリックされたときの処理
  button.addEventListener("click", (event) => {
    event.stopPropagation(); // イベントの伝播を停止
    copyMarkdownToClipboard(button);
  });
}

// DOM変更を監視してボタンを追加
function setupMutationObserver() {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        // #page-titleが追加されたかチェック
        const addedNodes = Array.from(mutation.addedNodes).filter(
          (node): node is Element => node.nodeType === Node.ELEMENT_NODE,
        );

        for (const node of addedNodes) {
          if (node.id === "page-title" || node.querySelector?.("#page-title")) {
            initializeButton();
            return;
          }
        }
      }
    }
  });

  // document.bodyの変更を監視
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return observer;
}

// 初回実行とセットアップ
let currentUrl = window.location.href;

// 初回ボタン追加を試行
initializeButton();

// DOM監視を開始
setupMutationObserver();

// URL変更の監視（補助的な対策）
setInterval(() => {
  if (currentUrl !== window.location.href) {
    currentUrl = window.location.href;
    // URL変更後、少し待ってからボタン追加を試行
    setTimeout(() => {
      initializeButton();
    }, 500);
  }
}, 1000);

// Markdownをコピーするメインの関数
function copyMarkdownToClipboard(button: HTMLButtonElement) {
  const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
  });

  // プラグインとカスタムルールの追加
  turndownService.use(gfm);

  turndownService.addRule("customBlock", {
    filter: (node: HTMLElement) => !!node.classList?.contains("custom-block"),
    replacement: (_content: string, node: Node) => {
      const title =
        (node as Element)
          .querySelector(".custom-block-title")
          ?.textContent?.trim() || "";
      const bodyContent = (node as Element).querySelector(
        ".custom-block-content",
      ) as HTMLElement;
      const body = bodyContent ? turndownService.turndown(bodyContent) : "";
      return `> **${title}**\n>\n> ${body.replace(/\n\n/g, "\n> \n> ").replace(/\n/g, "\n> ")}\n\n`;
    },
  });

  turndownService.addRule("absoluteLink", {
    filter: (node: HTMLElement) =>
      node.nodeName === "A" && !!node.getAttribute("href"),
    replacement: (content: string, node: Node) => {
      let href = (node as Element).getAttribute("href");
      if (href?.startsWith("/")) {
        href = `https://developers.line.biz${href}`;
      }
      return `[${content}](${href})`;
    },
  });

  const contentElement = document
    .querySelector(".content__default")
    ?.cloneNode(true) as HTMLElement;
  if (!contentElement) return;

  // ヘッダーアンカーを削除
  contentElement.querySelectorAll("a.header-anchor").forEach((el: Element) => {
    el.remove();
  });

  const markdown = turndownService.turndown(contentElement);

  navigator.clipboard
    .writeText(markdown)
    .then(() => {
      console.log("✅ Markdownをクリップボードにコピーしました！");
      // 成功したことをユーザーにフィードバック
      button.textContent = "コピー完了！";
      button.classList.add("success");
      setTimeout(() => {
        button.textContent = "Markdownコピー";
        button.classList.remove("success");
      }, 2000); // 2秒後に元に戻す
    })
    .catch((err) => {
      console.error("クリップボードへのコピーに失敗:", err);
      button.textContent = "コピー失敗";
    });
}
