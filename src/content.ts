import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

// SVGアイコンを生成する関数
function createCopyIcon() {
  return `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M4 2a2 2 0 0 1 2-2h4.5L14 3.5V12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3.707L11.293 1H6z"/>
      <path d="M3.5 1.75a.25.25 0 0 0-.25.25v8.5a.25.25 0 0 0 .5 0V2a.75.75 0 0 1 .75-.75H8a.25.25 0 0 0 0-.5H3.5z"/>
    </svg>
  `;
}

function createCheckIcon() {
  return `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm3.78-9.72a.75.75 0 0 0-1.06-1.06L6.75 9.19 5.28 7.72a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4.5-4.5z"/>
    </svg>
  `;
}

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

  // 1. コンテナを作成
  const container = document.createElement("div");
  container.className = "markdown-copy-container";

  // 2. ボタン要素を作成
  const button = document.createElement("button");
  button.id = "copy-markdown-btn";
  button.className = "copy-markdown-button";

  // アイコンとテキストを設定
  button.innerHTML = `
    <span class="button-icon">${createCopyIcon()}</span>
    <span class="button-text">Markdownコピー</span>
  `;

  // 3. コンテナにボタンを追加し、タイトルの後に挿入
  container.appendChild(button);
  titleElement.parentNode?.insertBefore(container, titleElement.nextSibling);

  // 4. ボタンがクリックされたときの処理
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
      const element = node as Element;
      const title =
        element.querySelector(".custom-block-title")?.textContent?.trim() || "";
      const bodyContent = element.querySelector(
        ".custom-block-content",
      ) as HTMLElement;
      const body = bodyContent ? turndownService.turndown(bodyContent) : "";

      // Qiita記法に変換
      let noteType = "info";
      if (
        element.classList.contains("danger") ||
        element.classList.contains("alert")
      ) {
        noteType = "alert";
      } else if (element.classList.contains("warning")) {
        noteType = "warn";
      } else if (
        element.classList.contains("tip") ||
        element.classList.contains("info")
      ) {
        noteType = "info";
      }

      let content = body;
      if (title) {
        content = `${title}\n${body}`;
      }

      return `:::note ${noteType}\n${content}\n:::\n\n`;
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

  turndownService.addRule("absoluteImage", {
    filter: (node: HTMLElement) =>
      node.nodeName === "IMG" && !!node.getAttribute("src"),
    replacement: (_content: string, node: Node) => {
      let src = (node as Element).getAttribute("src");
      const alt = (node as Element).getAttribute("alt") || "";
      if (src?.startsWith("/")) {
        src = `https://developers.line.biz${src}`;
      }
      return `![${alt}](${src})`;
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

  // Markdownコピーボタンを削除
  contentElement
    .querySelectorAll("#copy-markdown-btn")
    .forEach((el: Element) => {
      el.remove();
    });

  const markdown = turndownService.turndown(contentElement);

  navigator.clipboard
    .writeText(markdown)
    .then(() => {
      console.log("✅ Markdownをクリップボードにコピーしました！");
      // 成功したことをユーザーにフィードバック
      const iconElement = button.querySelector(".button-icon");
      const textElement = button.querySelector(".button-text");
      if (iconElement && textElement) {
        iconElement.innerHTML = createCheckIcon();
        textElement.textContent = "コピー完了！";
      }
      button.classList.add("success");
      setTimeout(() => {
        if (iconElement && textElement) {
          iconElement.innerHTML = createCopyIcon();
          textElement.textContent = "Markdownコピー";
        }
        button.classList.remove("success");
      }, 2000); // 2秒後に元に戻す
    })
    .catch((err) => {
      console.error("クリップボードへのコピーに失敗:", err);
      const textElement = button.querySelector(".button-text");
      if (textElement) {
        textElement.textContent = "コピー失敗";
      }
    });
}
