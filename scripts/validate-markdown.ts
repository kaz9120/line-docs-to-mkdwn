import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
  const urlsFilePath = path.join(__dirname, "../urls.txt");
  const content = await fs.readFile(urlsFilePath, "utf-8");
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"));
}

/**
 * Check if a file exists
 */
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate that all markdown files exist
 */
async function validateMarkdownFiles(): Promise<void> {
  console.log("Validating markdown files...\n");

  const urls = await loadUrlList();
  let hasErrors = false;
  const missingFiles: string[] = [];

  for (const url of urls) {
    const relativePath = urlToPath(url);
    const markdownPath = path.join(__dirname, "../markdown", relativePath);
    const exists = await fileExists(markdownPath);

    if (!exists) {
      console.error(`❌ Missing: ${relativePath}`);
      console.error(`   URL: ${url}`);
      missingFiles.push(relativePath);
      hasErrors = true;
    } else {
      // Check if file is not empty
      const content = await fs.readFile(markdownPath, "utf-8");
      if (content.trim().length === 0) {
        console.error(`❌ Empty file: ${relativePath}`);
        missingFiles.push(relativePath);
        hasErrors = true;
      } else {
        console.log(`✓ ${relativePath}`);
      }
    }
  }

  console.log(`\nTotal URLs: ${urls.length}`);
  console.log(`Valid files: ${urls.length - missingFiles.length}`);
  console.log(`Missing/Invalid files: ${missingFiles.length}`);

  if (hasErrors) {
    console.error("\n❌ Validation failed!");
    console.error("\nTo generate missing markdown files, run:");
    console.error("  npm run generate:markdown\n");
    process.exit(1);
  } else {
    console.log("\n✅ All markdown files are present and valid!");
  }
}

// Run validation
validateMarkdownFiles().catch((error) => {
  console.error("Error during validation:", error);
  process.exit(1);
});
