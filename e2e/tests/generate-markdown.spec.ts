import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { expect, test } from "../fixtures/extension";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Interface for URL configuration
 */
interface UrlConfig {
  url: string;
  path: string;
}

interface UrlsJson {
  urls: UrlConfig[];
}

/**
 * Load URL list from urls.json
 */
async function loadUrlList(): Promise<UrlConfig[]> {
  const urlsJsonPath = path.join(__dirname, "../../urls.json");
  const content = await fs.readFile(urlsJsonPath, "utf-8");
  const urlsJson: UrlsJson = JSON.parse(content);
  return urlsJson.urls;
}

/**
 * Load URL configurations at module level (top-level await)
 */
const urlConfigs = await loadUrlList();

console.log(`Loaded ${urlConfigs.length} URLs from urls.json`);

/**
 * E2E tests for generating Markdown files from LINE Developers documentation
 */
test.describe("Generate Markdown Files", () => {
  /**
   * Test each URL and save the generated Markdown
   */

  for (const config of urlConfigs) {
    test(`should generate markdown for ${config.path}`, async ({
      page,
    }, testInfo) => {
      const { url, path: relativePath } = config;

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

      // Prepare output path
      const outputPath = path.join(__dirname, "../../markdown", relativePath);
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
