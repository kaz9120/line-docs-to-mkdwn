import { initializeButton } from "./button-manager";
import { SELECTORS, TIMEOUTS } from "./constants";
import { isElementAdded } from "./dom-utils";

export class PageObserver {
  private mutationObserver?: MutationObserver;
  private urlWatcher?: number;
  private currentUrl: string;
  private initRetryCount = 0;
  private readonly MAX_INIT_RETRIES = 5;
  private readonly INIT_RETRY_DELAY = 500;

  constructor() {
    this.currentUrl = window.location.href;
  }

  public start(): void {
    this.setupMutationObserver();
    this.setupUrlWatcher();

    // Wait for DOM to be ready before initializing button
    this.waitForDOMAndInitialize();
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

  /**
   * Wait for DOM to be ready and initialize button with retry logic
   */
  private waitForDOMAndInitialize(): void {
    // If DOM is already ready, try to initialize immediately
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      this.tryInitializeWithRetry();
      return;
    }

    // Otherwise, wait for DOMContentLoaded
    const initOnReady = () => {
      this.tryInitializeWithRetry();
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initOnReady, {
        once: true,
      });
    } else {
      // Fallback: try immediately if readyState is unexpected
      this.tryInitializeWithRetry();
    }
  }

  /**
   * Try to initialize button with retry logic
   * This handles cases where DOM is ready but content is still loading
   */
  private tryInitializeWithRetry(): void {
    const success = initializeButton();

    // If initialization succeeded or we've exhausted retries, stop
    if (success || this.initRetryCount >= this.MAX_INIT_RETRIES) {
      this.initRetryCount = 0;
      return;
    }

    // Retry after delay
    this.initRetryCount++;
    setTimeout(() => {
      this.tryInitializeWithRetry();
    }, this.INIT_RETRY_DELAY);
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
