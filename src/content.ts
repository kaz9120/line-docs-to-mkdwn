import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

// ボタンが既に追加されていないか確認
if (!document.getElementById("copy-markdown-btn")) {
	// 1. ボタン要素を作成
	const button = document.createElement("button");
	button.id = "copy-markdown-btn";
	button.textContent = "Markdownコピー";
	button.className = "copy-markdown-button";

	// 2. ボタンをページのタイトル横に追加
	const titleElement = document.querySelector("#page-title");
	if (titleElement) {
		titleElement.appendChild(button);
	}

	// 3. ボタンがクリックされたときの処理
	button.addEventListener("click", (event) => {
		event.stopPropagation(); // イベントの伝播を停止
		copyMarkdownToClipboard(button);
	});
}

// Markdownをコピーするメインの関数
function copyMarkdownToClipboard(button: HTMLButtonElement) {
	const turndownService = new TurndownService({
		headingStyle: "atx",
		codeBlockStyle: "fenced",
	});

	// プラグインとカスタムルールの追加
	turndownService.use(gfm);

	turndownService.addRule("customBlock", {
		filter: (node: any) =>
			node.classList && node.classList.contains("custom-block"),
		replacement: (_content: string, node: any) => {
			const title =
				node.querySelector(".custom-block-title")?.textContent?.trim() || "";
			const bodyContent = node.querySelector(".custom-block-content");
			const body = bodyContent ? turndownService.turndown(bodyContent) : "";
			return `> **${title}**\n>\n> ${body.replace(/\n\n/g, "\n> \n> ").replace(/\n/g, "\n> ")}\n\n`;
		},
	});

	turndownService.addRule("absoluteLink", {
		filter: (node: any) => node.nodeName === "A" && node.getAttribute("href"),
		replacement: (content: string, node: any) => {
			let href = node.getAttribute("href");
			if (href && href.startsWith("/")) {
				href = "https://developers.line.biz" + href;
			}
			return "[" + content + "](" + href + ")";
		},
	});

	const contentElement = document
		.querySelector(".content__default")
		?.cloneNode(true) as HTMLElement;
	if (!contentElement) return;

	// ヘッダーアンカーを削除
	contentElement
		.querySelectorAll("a.header-anchor")
		.forEach((el: any) => el.remove());

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
