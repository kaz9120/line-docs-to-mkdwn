import { initializeButton } from "./button-manager";
import { SELECTORS, TIMEOUTS } from "./constants";
import { isElementAdded } from "./dom-utils";

export class PageObserver {
  private mutationObserver?: MutationObserver;
  private urlWatcher?: number;
  private currentUrl: string;

  constructor() {
    this.currentUrl = window.location.href;
  }

  public start(): void {
    this.setupMutationObserver();
    this.setupUrlWatcher();

    initializeButton();
  }

  public stop(): void {
    this.stopMutationObserver();
    this.stopUrlWatcher();
  }

  private setupMutationObserver(): void {
    this.mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (isElementAdded(mutation, SELECTORS.PAGE_TITLE)) {
          initializeButton();
          return;
        }
      }
    });

    this.mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  private stopMutationObserver(): void {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
      this.mutationObserver = undefined;
    }
  }

  private setupUrlWatcher(): void {
    this.urlWatcher = window.setInterval(() => {
      if (this.hasUrlChanged()) {
        this.handleUrlChange();
      }
    }, TIMEOUTS.URL_CHECK_INTERVAL);
  }

  private stopUrlWatcher(): void {
    if (this.urlWatcher) {
      window.clearInterval(this.urlWatcher);
      this.urlWatcher = undefined;
    }
  }

  private hasUrlChanged(): boolean {
    return this.currentUrl !== window.location.href;
  }

  private handleUrlChange(): void {
    this.currentUrl = window.location.href;

    setTimeout(() => {
      initializeButton();
    }, TIMEOUTS.BUTTON_INIT_DELAY);
  }
}

let pageObserver: PageObserver | undefined;

export function startPageObserver(): void {
  if (pageObserver) {
    pageObserver.stop();
  }

  pageObserver = new PageObserver();
  pageObserver.start();
}

export function stopPageObserver(): void {
  if (pageObserver) {
    pageObserver.stop();
    pageObserver = undefined;
  }
}
