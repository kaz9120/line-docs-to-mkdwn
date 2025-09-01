import {
  type ClipboardResult,
  copyMarkdownToClipboard,
} from "./clipboard-manager";
import { BUTTON_TEXTS, CSS_CLASSES, TIMEOUTS } from "./constants";
import {
  findCopyButton,
  findNewsDate,
  findPageTitle,
  insertAfterElement,
} from "./dom-utils";
import { createCheckIcon, createCopyIcon } from "./icons";

export function createCopyButton(): HTMLButtonElement {
  const button = document.createElement("button");
  button.id = "copy-markdown-btn";
  button.className = CSS_CLASSES.BUTTON;

  button.innerHTML = `
    <span class="${CSS_CLASSES.BUTTON_ICON}">${createCopyIcon()}</span>
    <span class="${CSS_CLASSES.BUTTON_TEXT}">${BUTTON_TEXTS.COPY}</span>
  `;

  button.addEventListener("click", handleButtonClick);

  return button;
}

export function createButtonContainer(): HTMLDivElement {
  const container = document.createElement("div");
  container.className = CSS_CLASSES.CONTAINER;
  return container;
}

export function initializeButton(): boolean {
  if (findCopyButton()) {
    return false;
  }

  // ニュースページの場合は日付の後に配置
  const newsDateElement = findNewsDate();
  if (newsDateElement) {
    const container = createButtonContainer();
    const button = createCopyButton();

    container.appendChild(button);
    insertAfterElement(container, newsDateElement);

    return true;
  }

  // ドキュメントページの場合はタイトルの後に配置
  const titleElement = findPageTitle();
  if (!titleElement) {
    return false;
  }

  const container = createButtonContainer();
  const button = createCopyButton();

  container.appendChild(button);
  insertAfterElement(container, titleElement);

  return true;
}

async function handleButtonClick(event: Event): Promise<void> {
  event.stopPropagation();

  const button = event.currentTarget as HTMLButtonElement;
  const result = await copyMarkdownToClipboard();

  updateButtonState(button, result);
}

function updateButtonState(
  button: HTMLButtonElement,
  result: ClipboardResult,
): void {
  const iconElement = button.querySelector(`.${CSS_CLASSES.BUTTON_ICON}`);
  const textElement = button.querySelector(`.${CSS_CLASSES.BUTTON_TEXT}`);

  if (!iconElement || !textElement) {
    return;
  }

  if (result.success) {
    showSuccessState(button, iconElement, textElement);
    setTimeout(
      () => resetButtonState(button, iconElement, textElement),
      TIMEOUTS.SUCCESS_FEEDBACK,
    );
  } else {
    showErrorState(textElement, result.message);
  }
}

function showSuccessState(
  button: HTMLButtonElement,
  iconElement: Element,
  textElement: Element,
): void {
  iconElement.innerHTML = createCheckIcon();
  textElement.textContent = BUTTON_TEXTS.SUCCESS;
  button.classList.add(CSS_CLASSES.SUCCESS);
}

function showErrorState(textElement: Element, message: string): void {
  textElement.textContent = message;
}

function resetButtonState(
  button: HTMLButtonElement,
  iconElement: Element,
  textElement: Element,
): void {
  iconElement.innerHTML = createCopyIcon();
  textElement.textContent = BUTTON_TEXTS.COPY;
  button.classList.remove(CSS_CLASSES.SUCCESS);
}
