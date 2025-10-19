export const SELECTORS = {
  // ドキュメントページ用セレクタ
  PAGE_TITLE: ".markdown-content h1",
  CONTENT_DEFAULT: ".markdown-content > div",
  HEADER_ANCHOR: "a.header-anchor",
  COPY_BUTTON: "#copy-markdown-btn",
  TABLE_CELL_WITH_LIST: "TD, TH",
  CUSTOM_BLOCK: ".custom-block",
  CUSTOM_BLOCK_TITLE: ".custom-block-title",
  CUSTOM_BLOCK_CONTENT: ".custom-block-content",
} as const;

export const NEWS_SELECTORS = {
  NEWS_ARTICLE: ".news-article",
  NEWS_TITLE: ".news-title",
  NEWS_DATE: ".text-caption-date",
  NEWS_CONTENT: ".news-article-content-slot",
  NEWS_CONTENT_WRAPPER: ".news-content",
  // 除外する要素
  NEWS_LINK_HIDDEN: ".news-link.hidden",
  TAGS_SECTION: ".tags",
  PREV_NEXT_SECTION: "hr + .flex",
  SIDE_COLUMN: ".side-column",
  HR_SEPARATOR: "hr", // 区切り線
} as const;

export const GLOSSARY_SELECTORS = {
  GLOSSARY_PAGE: ".glossary-page",
  GLOSSARY_SECTION: ".glossary-section",
  GLOSSARY_SECTION_HEADER: ".glossary-section-header",
  GLOSSARY_ENTRY: ".glossary-entry",
  SIDE_COLUMN: ".side-column", // 索引部分（除外対象）
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

export const PLACEHOLDER_STRINGS = {
  BR_LINE_BREAK: "BRLINEBREAKTAG",
  UL_LIST_PREFIX: "ULLISTPLACEHOLDER",
  OL_LIST_PREFIX: "OLLISTPLACEHOLDER",
  LIST_SUFFIX: "END",
} as const;
