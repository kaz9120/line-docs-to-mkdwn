import { BUTTON_TEXTS } from "./constants";
import { convertToMarkdown } from "./markdown-converter";

export interface ClipboardResult {
  success: boolean;
  message: string;
}

export async function copyMarkdownToClipboard(): Promise<ClipboardResult> {
  const markdown = convertToMarkdown();

  if (!markdown) {
    return {
      success: false,
      message: "コンテンツが見つかりません",
    };
  }

  try {
    await navigator.clipboard.writeText(markdown);
    console.log("✅ Markdownをクリップボードにコピーしました！");

    return {
      success: true,
      message: BUTTON_TEXTS.SUCCESS,
    };
  } catch (error) {
    console.error("クリップボードへのコピーに失敗:", error);

    return {
      success: false,
      message: BUTTON_TEXTS.ERROR,
    };
  }
}
