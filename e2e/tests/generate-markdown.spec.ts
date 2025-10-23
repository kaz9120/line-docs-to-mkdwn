import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "../fixtures/extension";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Convert URL to markdown file path
 * Example: https://developers.line.biz/ja/docs/basics/channel-access-token/
 *       -> docs/basics/channel-access-token.md
 */
function urlToPath(url: string): string {
  const baseUrl = "https://developers.line.biz/ja/";
  if (!url.startsWith(baseUrl)) {
    throw new Error(`URL must start with ${baseUrl}`);
  }

  // Remove base URL and trailing slash
  let relativePath = url.substring(baseUrl.length);
  if (relativePath.endsWith("/")) {
    relativePath = relativePath.slice(0, -1);
  }

  // Add .md extension
  return `${relativePath}.md`;
}

/**
 * Load URL list from urls.txt
 */
async function loadUrlList(): Promise<string[]> {
  const urlsFilePath = path.join(__dirname, "../../urls.txt");
  const content = await fs.readFile(urlsFilePath, "utf-8");
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"));
}

/**
 * Load URLs at module level (top-level await)
 */
const urls = await loadUrlList();

console.log(`Loaded ${urls.length} URLs from urls.txt`);

/**
 * E2E tests for generating Markdown files from LINE Developers documentation
 */
test.describe("Generate Markdown Files", () => {
  /**
   * Test each URL and save the generated Markdown
   */

  for (const url of urls) {
    const relativePath = urlToPath(url);

    test(`should generate markdown for ${relativePath}`, async ({
      page,
    }, testInfo) => {
      console.log(`Processing: ${url}`);

      // Navigate to the URL
      await page.goto(url, { waitUntil: "domcontentloaded" });

      // Wait for page content to load
      await page.waitForSelector(".markdown-content h1", { timeout: 15000 });

      // Wait for the copy button to appear
      const copyButton = page.locator("#copy-markdown-btn");
      await expect(copyButton).toBeVisible({ timeout: 15000 });

      // Click the copy button
      await copyButton.click();

      // Read markdown content from clipboard
      const markdownContent = await page.evaluate(async () => {
        return await navigator.clipboard.readText();
      });

      // Verify markdown content
      expect(markdownContent).toBeTruthy();
      expect(markdownContent.length).toBeGreaterThan(0);
      expect(markdownContent).toMatch(/^#/m);

      // Prepare output path (use TEMP_MARKDOWN_DIR if set for strict validation)
      const baseDir =
        process.env.TEMP_MARKDOWN_DIR || path.join(__dirname, "../../markdown");
      const outputPath = path.join(baseDir, relativePath);
      const outputDir = path.dirname(outputPath);

      // Create directory if it doesn't exist
      await fs.mkdir(outputDir, { recursive: true });

      // Save markdown file
      await fs.writeFile(outputPath, markdownContent, "utf-8");

      console.log(
        `✓ Generated ${markdownContent.length} characters -> ${relativePath}`,
      );

      // Attach to Playwright report if in CI
      if (process.env.CI) {
        await testInfo.attach(relativePath, {
          body: markdownContent,
          contentType: "text/markdown",
        });
      }
    });
  }
});
