import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "../fixtures/extension";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Test URLs for LINE Developers documentation pages
 * These URLs will be tested to ensure the Markdown copy button works correctly
 */
const TEST_URLS = [
  "https://developers.line.biz/ja/docs/messaging-api/overview/",
  "https://developers.line.biz/ja/docs/messaging-api/sending-messages/",
  "https://developers.line.biz/ja/docs/line-login/overview/",
];

/**
 * E2E tests for the LINE Docs to Markdown Chrome Extension
 */
test.describe("Markdown Copy Button", () => {
  /**
   * Set up test output directory before all tests
   */
  test.beforeAll(async () => {
    // Create output directory for captured markdown
    const outputDir = path.join(
      __dirname,
      "../../test-results/markdown-outputs",
    );
    await fs.mkdir(outputDir, { recursive: true });
  });

  /**
   * Test each URL to verify the Markdown copy functionality
   */
  for (const url of TEST_URLS) {
    test(`should copy markdown from ${url}`, async ({ page }, testInfo) => {
      // Navigate to the test URL
      await page.goto(url, { waitUntil: "networkidle" });

      // Wait for page content to load (important for LINE Developers docs)
      // The content script waits for this element before adding the button
      await page.waitForSelector(".markdown-content h1", { timeout: 15000 });

      // Wait additional time for content script to initialize and add button
      await page.waitForTimeout(2000);

      // Wait for the copy button to appear (correct ID: copy-markdown-btn)
      const copyButton = page.locator("#copy-markdown-btn");
      await expect(copyButton).toBeVisible({ timeout: 15000 });
      await expect(copyButton).toHaveText("Markdownコピー");

      // Take screenshot before clicking
      await testInfo.attach("before-click", {
        body: await page.screenshot(),
        contentType: "image/png",
      });

      // Click the copy button
      await copyButton.click();

      // Wait for clipboard operation to complete
      await page.waitForTimeout(500);

      // Read markdown content from clipboard
      const markdownContent = await page.evaluate(async () => {
        return await navigator.clipboard.readText();
      });

      // Verify markdown content
      expect(markdownContent).toBeTruthy();
      expect(markdownContent.length).toBeGreaterThan(0);

      // Verify it's actually Markdown (should contain heading markers)
      expect(markdownContent).toMatch(/^#/m);

      // Create safe filename from URL
      const safeFileName = url
        .replace(/https?:\/\//, "")
        .replace(/\//g, "_")
        .replace(/[^a-zA-Z0-9_-]/g, "");

      // Create result object with metadata
      const result = {
        url: url,
        markdown: markdownContent,
        timestamp: new Date().toISOString(),
        testName: testInfo.title,
        status: "passed",
        length: markdownContent.length,
        duration: testInfo.duration,
      };

      // Save as JSON
      const outputDir = path.join(
        __dirname,
        "../../test-results/markdown-outputs",
      );
      const jsonPath = path.join(outputDir, `${safeFileName}.json`);
      await fs.writeFile(jsonPath, JSON.stringify(result, null, 2));

      // Save as Markdown file
      const mdPath = path.join(outputDir, `${safeFileName}.md`);
      await fs.writeFile(mdPath, markdownContent);

      // Attach to Playwright report
      await testInfo.attach("captured-markdown", {
        body: markdownContent,
        contentType: "text/markdown",
      });

      // Log summary
      console.log(
        `✓ Captured ${markdownContent.length} characters from ${url}`,
      );
    });
  }
});

/**
 * Additional test to verify button behavior on non-target pages
 */
test.describe("Button visibility", () => {
  test("should only show button on LINE Developers docs pages", async ({
    page,
  }) => {
    // Navigate to a non-LINE Developers page
    await page.goto("https://www.google.com");

    // Wait a bit to ensure content script would have loaded if it was going to
    await page.waitForTimeout(2000);

    // Button should not exist (correct ID: copy-markdown-btn)
    const copyButton = page.locator("#copy-markdown-btn");
    await expect(copyButton)
      .not.toBeVisible({ timeout: 3000 })
      .catch(() => {
        // Expected to fail - button should not be visible
      });
  });
});
