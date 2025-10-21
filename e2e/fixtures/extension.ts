import path from "node:path";
import { fileURLToPath } from "node:url";
import { type BrowserContext, test as base, chromium } from "@playwright/test";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Custom fixtures for Chrome Extension testing
 *
 * This extends the base Playwright test with:
 * - context: A BrowserContext with the extension loaded
 * - extensionId: The ID of the loaded extension
 */
export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
}>({
  /**
   * Create a persistent context with the Chrome extension loaded
   */
  // biome-ignore lint/correctness/noEmptyPattern: Playwright fixture requires object destructuring
  context: async ({}, use) => {
    // Path to the built extension (dist directory)
    const pathToExtension = path.join(__dirname, "../../dist");

    // Launch persistent context with extension loaded
    const context = await chromium.launchPersistentContext("", {
      headless: false, // Extensions require headed mode
      channel: "chromium",
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
        "--no-sandbox", // Required for some CI environments
      ],
    });

    await use(context);
    await context.close();
  },

  /**
   * Extract the extension ID from the service worker URL
   */
  extensionId: async ({ context }, use) => {
    // Get the background service worker
    let [background] = context.serviceWorkers();

    // Wait for service worker if not immediately available
    if (!background) {
      background = await context.waitForEvent("serviceworker");
    }

    // Extract extension ID from service worker URL
    // Format: chrome-extension://<extensionId>/background.js
    const extensionId = background.url().split("/")[2];

    await use(extensionId);
  },
});

export { expect } from "@playwright/test";
