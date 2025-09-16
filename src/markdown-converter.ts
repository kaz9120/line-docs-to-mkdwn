import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";
import { BASE_URL, CSS_CLASSES, NOTE_TYPES, SELECTORS } from "./constants";
import { cloneContentElement } from "./dom-utils";
import { generateFrontMatter } from "./frontmatter-generator";
import { detectCurrentPageStrategy } from "./strategies";

function createTurndownService(): TurndownService {
  const turndownService = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
  });

  turndownService.use(gfm);

  addCustomRules(turndownService);

  return turndownService;
}

function addCustomRules(turndownService: TurndownService): void {
  addCustomBlockRule(turndownService);
  addAbsoluteLinkRule(turndownService);
  addAbsoluteImageRule(turndownService);

  // Strategyパターンからカスタムルールを追加
  const strategy = detectCurrentPageStrategy();
  strategy?.addCustomRules?.(turndownService);
}

function addCustomBlockRule(turndownService: TurndownService): void {
  turndownService.addRule("customBlock", {
    filter: (node: HTMLElement) =>
      !!node.classList?.contains(CSS_CLASSES.CUSTOM_BLOCK),
    replacement: (_content: string, node: Node) => {
      const element = node as Element;
      const title =
        element
          .querySelector(SELECTORS.CUSTOM_BLOCK_TITLE)
          ?.textContent?.trim() || "";
      const bodyContent = element.querySelector(
        SELECTORS.CUSTOM_BLOCK_CONTENT,
      ) as HTMLElement;
      const body = bodyContent ? turndownService.turndown(bodyContent) : "";

      const noteType = determineNoteType(element);
      let content = body;
      if (title) {
        content = `${title}\n${body}`;
      }

      return `:::note ${noteType}\n${content}\n:::\n\n`;
    },
  });
}

function determineNoteType(element: Element): string {
  if (
    element.classList.contains(CSS_CLASSES.CUSTOM_BLOCK_DANGER) ||
    element.classList.contains(CSS_CLASSES.CUSTOM_BLOCK_ALERT)
  ) {
    return NOTE_TYPES.ALERT;
  }
  if (element.classList.contains(CSS_CLASSES.CUSTOM_BLOCK_WARNING)) {
    return NOTE_TYPES.WARN;
  }
  return NOTE_TYPES.INFO;
}

function addAbsoluteLinkRule(turndownService: TurndownService): void {
  turndownService.addRule("absoluteLink", {
    filter: (node: HTMLElement) =>
      node.nodeName === "A" && !!node.getAttribute("href"),
    replacement: (content: string, node: Node) => {
      let href = (node as Element).getAttribute("href");
      if (href?.startsWith("/")) {
        href = `${BASE_URL}${href}`;
      }
      return `[${content}](${href})`;
    },
  });
}

function addAbsoluteImageRule(turndownService: TurndownService): void {
  turndownService.addRule("absoluteImage", {
    filter: (node: HTMLElement) =>
      node.nodeName === "IMG" && !!node.getAttribute("src"),
    replacement: (_content: string, node: Node) => {
      let src = (node as Element).getAttribute("src");
      const alt = (node as Element).getAttribute("alt") || "";
      if (src?.startsWith("/")) {
        src = `${BASE_URL}${src}`;
      }
      return `![${alt}](${src})`;
    },
  });
}

function preprocessContentElement(contentElement: HTMLElement): void {
  // Strategyパターンから前処理を実行
  const strategy = detectCurrentPageStrategy();
  strategy?.preprocessContent?.(contentElement);

  // テーブル処理（共通）
  preprocessTableBreakTags(contentElement);
  preprocessTableListTags(contentElement);
}

function preprocessTableBreakTags(contentElement: HTMLElement): void {
  const tableCells = contentElement.querySelectorAll("td, th");
  tableCells.forEach((cell) => {
    cell.innerHTML = cell.innerHTML.replace(/<br\s*\/?>/gi, "BRLINEBREAKTAG");
  });
}

const tableListPlaceholders: Map<string, string> = new Map();

function preprocessTableListTags(contentElement: HTMLElement): void {
  tableListPlaceholders.clear();
  let listCounter = 0;

  const tableCells = contentElement.querySelectorAll("td, th");
  tableCells.forEach((cell) => {
    const ulElements = cell.querySelectorAll("ul");
    ulElements.forEach((ul) => {
      const placeholder = `ULLISTPLACEHOLDER${listCounter}END`;
      const originalHtml = ul.outerHTML
        .replace(/\n\s*/g, "")
        .replace(/\s+/g, " ")
        .replace(/<br\s*\/?>/gi, "BRLINEBREAKTAG");
      tableListPlaceholders.set(placeholder, originalHtml);
      ul.outerHTML = placeholder;
      listCounter++;
    });

    const olElements = cell.querySelectorAll("ol");
    olElements.forEach((ol) => {
      const placeholder = `OLLISTPLACEHOLDER${listCounter}END`;
      const originalHtml = ol.outerHTML
        .replace(/\n\s*/g, "")
        .replace(/\s+/g, " ")
        .replace(/<br\s*\/?>/gi, "BRLINEBREAKTAG");
      tableListPlaceholders.set(placeholder, originalHtml);
      ol.outerHTML = placeholder;
      listCounter++;
    });
  });
}

export function convertToMarkdown(): string | null {
  const strategy = detectCurrentPageStrategy();
  if (!strategy) {
    return null;
  }

  const contentElement = cloneContentElement();
  if (!contentElement) {
    return null;
  }

  preprocessContentElement(contentElement);

  const turndownService = createTurndownService();
  let markdown = turndownService.turndown(contentElement);

  // プレースホルダーを元のHTMLに戻す
  markdown = markdown.replace(/BRLINEBREAKTAG/g, "<br/>");

  // リストプレースホルダーを元のHTMLに戻す
  for (const [placeholder, originalHtml] of tableListPlaceholders.entries()) {
    markdown = markdown.replace(placeholder, originalHtml);
  }

  // フロントマターを追加
  const metadata = strategy.getMetadata();
  const frontMatter = generateFrontMatter(metadata);

  return frontMatter + markdown;
}
