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
 * Normalize markdown content by removing copy_date from frontmatter
 */
function normalizeMarkdown(content: string): string {
  // Match frontmatter block
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return content;
  }

  const frontmatter = match[1];
  const body = content.substring(match[0].length);

  // Remove copy_date line from frontmatter
  const normalizedFrontmatter = frontmatter
    .split("\n")
    .filter((line) => !line.trim().startsWith("copy_date:"))
    .join("\n");

  return `---\n${normalizedFrontmatter}\n---\n${body}`;
}

/**
 * Compare two normalized markdown contents
 */
function compareContents(
  content1: string,
  content2: string,
): {
  identical: boolean;
  linesDiffer: number;
} {
  const normalized1 = normalizeMarkdown(content1);
  const normalized2 = normalizeMarkdown(content2);

  if (normalized1 === normalized2) {
    return { identical: true, linesDiffer: 0 };
  }

  // Count differing lines
  const lines1 = normalized1.split("\n");
  const lines2 = normalized2.split("\n");
  const maxLines = Math.max(lines1.length, lines2.length);

  let differCount = 0;
  for (let i = 0; i < maxLines; i++) {
    if (lines1[i] !== lines2[i]) {
      differCount++;
    }
  }

  return { identical: false, linesDiffer: differCount };
}

/**
 * Validate that all markdown files exist
 */
async function validateMarkdownFiles(strictMode: boolean): Promise<void> {
  console.log(
    `Validating markdown files${strictMode ? " (strict mode)" : ""}...\n`,
  );

  const urls = await loadUrlList();
  let hasErrors = false;
  const missingFiles: string[] = [];
  const outdatedFiles: string[] = [];

  // In strict mode, generate files to temporary directory
  let tempDir: string | null = null;
  if (strictMode) {
    tempDir = path.join(__dirname, "../.temp-markdown-validation");
    console.log("Running strict validation (this may take a while)...");
    console.log(`Temporary directory: ${tempDir}\n`);

    // Clean up temp directory if exists
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch (_e) {
      // Ignore
    }

    // Create temp directory
    await fs.mkdir(tempDir, { recursive: true });

    // Run E2E tests to generate markdown in temp directory
    const { execSync } = await import("node:child_process");
    try {
      execSync(
        `TEMP_MARKDOWN_DIR="${tempDir}" npm run build && npx playwright test e2e/tests/generate-markdown.spec.ts`,
        {
          stdio: "inherit",
          cwd: path.join(__dirname, ".."),
        },
      );
    } catch (_error) {
      console.error("\n❌ Failed to generate markdown files for comparison");
      process.exit(1);
    }

    console.log("\n");
  }

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
        // In strict mode, compare with newly generated file
        if (strictMode && tempDir) {
          const tempPath = path.join(tempDir, relativePath);
          const tempExists = await fileExists(tempPath);

          if (tempExists) {
            const tempContent = await fs.readFile(tempPath, "utf-8");
            const comparison = compareContents(content, tempContent);

            if (!comparison.identical) {
              console.warn(`⚠️  ${relativePath}`);
              console.warn(
                `   Content has changed (${comparison.linesDiffer} lines differ)`,
              );
              console.warn("   → Run 'npm run generate:markdown' to update\n");
              outdatedFiles.push(relativePath);
            } else {
              console.log(`✓ ${relativePath} (no changes)`);
            }
          } else {
            console.error(`❌ Failed to generate: ${relativePath}`);
            hasErrors = true;
          }
        } else {
          console.log(`✓ ${relativePath}`);
        }
      }
    }
  }

  // Clean up temp directory
  if (tempDir) {
    try {
      await fs.rm(tempDir, { recursive: true, force: true });
    } catch (_e) {
      // Ignore cleanup errors
    }
  }

  console.log(`\nTotal URLs: ${urls.length}`);
  console.log(`Valid files: ${urls.length - missingFiles.length}`);
  console.log(`Missing/Invalid files: ${missingFiles.length}`);

  if (strictMode && outdatedFiles.length > 0) {
    console.log(`Outdated files: ${outdatedFiles.length}`);
  }

  if (hasErrors) {
    console.error("\n❌ Validation failed!");
    console.error("\nTo generate missing markdown files, run:");
    console.error("  npm run generate:markdown\n");
    process.exit(1);
  } else if (strictMode && outdatedFiles.length > 0) {
    console.warn("\n⚠️  Some files are outdated!");
    console.warn("\nTo update outdated markdown files, run:");
    console.warn("  npm run generate:markdown\n");
    process.exit(1);
  } else {
    console.log("\n✅ All markdown files are present and valid!");
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
const strictMode = args.includes("--strict");

// Run validation
validateMarkdownFiles(strictMode).catch((error) => {
  console.error("Error during validation:", error);
  process.exit(1);
});
