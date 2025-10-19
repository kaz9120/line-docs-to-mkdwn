import { SELECTORS } from "./constants";
import { detectCurrentPageStrategy } from "./strategies";

export function findPageTitle(): HTMLElement | null {
  const strategy = detectCurrentPageStrategy();
  return strategy?.getTitleElement() || null;
}

export function findContentElement(): HTMLElement | null {
  const strategy = detectCurrentPageStrategy();
  return strategy?.getContentElement() || null;
}

export function findButtonAnchorElement(): HTMLElement | null {
  const strategy = detectCurrentPageStrategy();
  return strategy?.getButtonAnchorElement() || null;
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

export function cloneContentElement(): HTMLElement | null {
  const contentElement = findContentElement();
  if (!contentElement) {
    return null;
  }
  return contentElement.cloneNode(true) as HTMLElement;
}
