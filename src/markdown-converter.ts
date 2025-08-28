import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";
import { BASE_URL, CSS_CLASSES, NOTE_TYPES, SELECTORS } from "./constants";
import { cloneContentElement, removeElements } from "./dom-utils";

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
  addTableCellWithListRule(turndownService);
  addCustomBlockRule(turndownService);
  addAbsoluteLinkRule(turndownService);
  addAbsoluteImageRule(turndownService);
}

function addTableCellWithListRule(turndownService: TurndownService): void {
  turndownService.addRule("tableCellWithList", {
    filter: (node: HTMLElement) => {
      return (
        (node.nodeName === "TD" || node.nodeName === "TH") &&
        node.querySelector &&
        !!(node.querySelector("ul") || node.querySelector("ol"))
      );
    },
    replacement: (_content: string, node: Node) => {
      const element = node as Element;
      const innerHTML = element.innerHTML
        .trim()
        .replace(/\n\s+/g, "\n")
        .replace(/\s+/g, " ");
      return innerHTML;
    },
  });
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
  removeElements(contentElement, SELECTORS.HEADER_ANCHOR);
  removeElements(contentElement, SELECTORS.COPY_BUTTON);
  preprocessTableBreakTags(contentElement);
}

function preprocessTableBreakTags(contentElement: HTMLElement): void {
  const tableCells = contentElement.querySelectorAll("td, th");
  tableCells.forEach((cell) => {
    cell.innerHTML = cell.innerHTML.replace(/<br\s*\/?>/gi, "BRLINEBREAKTAG");
  });
}

export function convertToMarkdown(): string | null {
  const contentElement = cloneContentElement();
  if (!contentElement) {
    return null;
  }

  preprocessContentElement(contentElement);

  const turndownService = createTurndownService();
  let markdown = turndownService.turndown(contentElement);

  // プレースホルダーを<br/>に変換
  markdown = markdown.replace(/BRLINEBREAKTAG/g, "<br/>");

  return markdown;
}
