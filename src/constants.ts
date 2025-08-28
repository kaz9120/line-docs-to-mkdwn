export const SELECTORS = {
  PAGE_TITLE: "#page-title",
  CONTENT_DEFAULT: ".content__default",
  HEADER_ANCHOR: "a.header-anchor",
  COPY_BUTTON: "#copy-markdown-btn",
  TABLE_CELL_WITH_LIST: "TD, TH",
  CUSTOM_BLOCK: ".custom-block",
  CUSTOM_BLOCK_TITLE: ".custom-block-title",
  CUSTOM_BLOCK_CONTENT: ".custom-block-content",
} as const;

export const CSS_CLASSES = {
  CONTAINER: "markdown-copy-container",
  BUTTON: "copy-markdown-button",
  BUTTON_ICON: "button-icon",
  BUTTON_TEXT: "button-text",
  SUCCESS: "success",
  CUSTOM_BLOCK: "custom-block",
  CUSTOM_BLOCK_DANGER: "danger",
  CUSTOM_BLOCK_ALERT: "alert",
  CUSTOM_BLOCK_WARNING: "warning",
  CUSTOM_BLOCK_TIP: "tip",
  CUSTOM_BLOCK_INFO: "info",
} as const;

export const TIMEOUTS = {
  URL_CHECK_INTERVAL: 1000,
  BUTTON_INIT_DELAY: 500,
  SUCCESS_FEEDBACK: 2000,
} as const;

export const BASE_URL = "https://developers.line.biz" as const;

export const BUTTON_TEXTS = {
  COPY: "Markdownコピー",
  SUCCESS: "コピー完了！",
  ERROR: "コピー失敗",
} as const;

export const NOTE_TYPES = {
  INFO: "info",
  WARN: "warn",
  ALERT: "alert",
} as const;
