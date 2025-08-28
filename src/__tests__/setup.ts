import { vi } from "vitest";

// DOM環境のセットアップ
Object.defineProperty(window, "location", {
  value: {
    href: "https://developers.line.biz/ja/docs/",
    origin: "https://developers.line.biz",
  },
  writable: true,
});

// ClipboardAPIのモック
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(() => Promise.resolve()),
  },
});

// コンソールエラーを抑制（テスト実行時の不要なログを減らす）
const originalError = console.error;
beforeEach(() => {
  console.error = vi.fn();
});

afterEach(() => {
  console.error = originalError;
  vi.clearAllMocks();
  document.body.innerHTML = "";
});
