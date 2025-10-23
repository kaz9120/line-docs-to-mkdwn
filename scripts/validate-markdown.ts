import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
  const urlsJsonPath = path.join(__dirname, "../urls.json");
  const content = await fs.readFile(urlsJsonPath, "utf-8");
  const urlsJson: UrlsJson = JSON.parse(content);
  return urlsJson.urls;
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

  const urlConfigs = await loadUrlList();
  let hasErrors = false;
  const missingFiles: string[] = [];

  for (const config of urlConfigs) {
    const markdownPath = path.join(__dirname, "../markdown", config.path);
    const exists = await fileExists(markdownPath);

    if (!exists) {
      console.error(`❌ Missing: ${config.path}`);
      console.error(`   URL: ${config.url}`);
      missingFiles.push(config.path);
      hasErrors = true;
    } else {
      // Check if file is not empty
      const content = await fs.readFile(markdownPath, "utf-8");
      if (content.trim().length === 0) {
        console.error(`❌ Empty file: ${config.path}`);
        missingFiles.push(config.path);
        hasErrors = true;
      } else {
        console.log(`✓ ${config.path}`);
      }
    }
  }

  console.log(`\nTotal URLs: ${urlConfigs.length}`);
  console.log(`Valid files: ${urlConfigs.length - missingFiles.length}`);
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
