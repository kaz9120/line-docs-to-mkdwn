import { NEWS_SELECTORS, SELECTORS } from "./constants";

export function findPageTitle(): HTMLElement | null {
  // 既存のドキュメントページのタイトル
  const docTitle = document.querySelector(SELECTORS.PAGE_TITLE);
  if (docTitle) {
    return docTitle as HTMLElement;
  }

  // ニュースページのタイトル
  const newsTitle = document.querySelector(NEWS_SELECTORS.NEWS_TITLE);
  return newsTitle as HTMLElement | null;
}

export function findContentElement(): HTMLElement | null {
  return document.querySelector(SELECTORS.CONTENT_DEFAULT);
}

export function findCopyButton(): HTMLElement | null {
  return document.getElementById(SELECTORS.COPY_BUTTON.slice(1));
}

export function removeElements(parent: Element, selector: string): void {
  parent.querySelectorAll(selector).forEach((el) => {
    el.remove();
  });
}

export function insertAfterElement(
  newElement: Element,
  targetElement: Element,
): void {
  targetElement.parentNode?.insertBefore(newElement, targetElement.nextSibling);
}

export function isElementAdded(
  mutation: MutationRecord,
  selector: string,
): boolean {
  if (mutation.type !== "childList") {
    return false;
  }

  const addedNodes = Array.from(mutation.addedNodes).filter(
    (node): node is Element => node.nodeType === Node.ELEMENT_NODE,
  );

  return addedNodes.some(
    (node) =>
      node.matches?.(selector) || node.querySelector?.(selector) !== null,
  );
}

export function findNewsDate(): HTMLElement | null {
  return document.querySelector(NEWS_SELECTORS.NEWS_DATE);
}

export function cloneContentElement(): HTMLElement | null {
  const contentElement = findContentElement();
  if (!contentElement) {
    return null;
  }
  return contentElement.cloneNode(true) as HTMLElement;
}
