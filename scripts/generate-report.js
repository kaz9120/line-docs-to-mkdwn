#!/usr/bin/env node

/**
 * Generate HTML report for Playwright E2E test results
 * Reads JSON files from test-results/markdown-outputs/ and creates a visual HTML report
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.join(__dirname, "../test-results/markdown-outputs");
const REPORT_FILE = path.join(__dirname, "../test-report.html");

/**
 * Escape HTML special characters
 */
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Generate HTML template
 */
function generateHTML(results) {
  const rows = results
    .map(
      (result, index) => `
    <div class="result-card">
      <div class="result-header">
        <h2>Test ${index + 1}: ${escapeHtml(result.testName)}</h2>
        <span class="status ${result.status}">${result.status}</span>
      </div>

      <div class="result-meta">
        <div class="meta-item">
          <strong>URL:</strong>
          <a href="${escapeHtml(result.url)}" target="_blank">${escapeHtml(result.url)}</a>
        </div>
        <div class="meta-item">
          <strong>Timestamp:</strong> ${new Date(result.timestamp).toLocaleString()}
        </div>
        <div class="meta-item">
          <strong>Length:</strong> ${result.length.toLocaleString()} characters
        </div>
        <div class="meta-item">
          <strong>Duration:</strong> ${result.duration ? `${result.duration}ms` : "N/A"}
        </div>
      </div>

      <div class="markdown-preview">
        <div class="preview-header">
          <h3>Markdown Content</h3>
          <button class="copy-btn" onclick="copyToClipboard('markdown-${index}')">
            📋 Copy to Clipboard
          </button>
        </div>
        <pre id="markdown-${index}" class="markdown-content">${escapeHtml(result.markdown)}</pre>
      </div>
    </div>
  `,
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Markdown Copy Test Report</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      color: #24292e;
      background-color: #f6f8fa;
      padding: 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
    }

    header {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      margin-bottom: 20px;
    }

    h1 {
      font-size: 32px;
      margin-bottom: 10px;
      color: #0366d6;
    }

    .summary {
      display: flex;
      gap: 20px;
      margin-top: 20px;
    }

    .summary-item {
      padding: 15px;
      background: #f6f8fa;
      border-radius: 6px;
      flex: 1;
    }

    .summary-item strong {
      display: block;
      font-size: 24px;
      color: #0366d6;
      margin-bottom: 5px;
    }

    .result-card {
      background: white;
      border-radius: 8px;
      padding: 30px;
      margin-bottom: 20px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    .result-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 15px;
      border-bottom: 2px solid #e1e4e8;
    }

    .result-header h2 {
      font-size: 20px;
      color: #24292e;
    }

    .status {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: bold;
      text-transform: uppercase;
    }

    .status.passed {
      background: #28a745;
      color: white;
    }

    .status.failed {
      background: #d73a49;
      color: white;
    }

    .result-meta {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
      margin-bottom: 20px;
      padding: 15px;
      background: #f6f8fa;
      border-radius: 6px;
    }

    .meta-item {
      font-size: 14px;
    }

    .meta-item strong {
      color: #586069;
      margin-right: 5px;
    }

    .meta-item a {
      color: #0366d6;
      text-decoration: none;
      word-break: break-all;
    }

    .meta-item a:hover {
      text-decoration: underline;
    }

    .markdown-preview {
      margin-top: 20px;
    }

    .preview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .preview-header h3 {
      font-size: 16px;
      color: #586069;
    }

    .copy-btn {
      padding: 8px 16px;
      background: #0366d6;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.2s;
    }

    .copy-btn:hover {
      background: #0256c7;
    }

    .copy-btn:active {
      background: #024ea2;
    }

    .markdown-content {
      background: #f6f8fa;
      border: 1px solid #e1e4e8;
      border-radius: 6px;
      padding: 20px;
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
      font-size: 13px;
      line-height: 1.6;
      overflow-x: auto;
      white-space: pre-wrap;
      word-wrap: break-word;
      max-height: 500px;
      overflow-y: auto;
    }

    footer {
      text-align: center;
      margin-top: 40px;
      padding: 20px;
      color: #586069;
      font-size: 14px;
    }

    .toast {
      position: fixed;
      top: 20px;
      right: 20px;
      background: #28a745;
      color: white;
      padding: 15px 20px;
      border-radius: 6px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.2);
      display: none;
      z-index: 1000;
    }

    .toast.show {
      display: block;
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>📋 Markdown Copy Test Report</h1>
      <p>LINE Developers Documentation - Chrome Extension E2E Test Results</p>

      <div class="summary">
        <div class="summary-item">
          <strong>${results.length}</strong>
          <span>Total Tests</span>
        </div>
        <div class="summary-item">
          <strong>${results.filter((r) => r.status === "passed").length}</strong>
          <span>Passed</span>
        </div>
        <div class="summary-item">
          <strong>${results.reduce((sum, r) => sum + r.length, 0).toLocaleString()}</strong>
          <span>Total Characters</span>
        </div>
      </div>
    </header>

    <main>
      ${rows}
    </main>

    <footer>
      <p>Generated on ${new Date().toLocaleString()}</p>
      <p>LINE Docs to Markdown Chrome Extension - Playwright E2E Tests</p>
    </footer>
  </div>

  <div id="toast" class="toast">Copied to clipboard!</div>

  <script>
    async function copyToClipboard(elementId) {
      const element = document.getElementById(elementId);
      const text = element.textContent;

      try {
        await navigator.clipboard.writeText(text);
        showToast();
      } catch (err) {
        console.error('Failed to copy:', err);
        alert('Failed to copy to clipboard');
      }
    }

    function showToast() {
      const toast = document.getElementById('toast');
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 2000);
    }
  </script>
</body>
</html>`;
}

/**
 * Main function
 */
async function main() {
  try {
    console.log("🔍 Searching for test results...");

    // Check if output directory exists
    try {
      await fs.access(OUTPUT_DIR);
    } catch {
      console.error(`❌ Output directory not found: ${OUTPUT_DIR}`);
      console.log("💡 Run tests first: npm run test:e2e");
      process.exit(1);
    }

    // Read all JSON files
    const files = await fs.readdir(OUTPUT_DIR);
    const jsonFiles = files.filter((f) => f.endsWith(".json"));

    if (jsonFiles.length === 0) {
      console.error("❌ No JSON result files found");
      process.exit(1);
    }

    console.log(`📄 Found ${jsonFiles.length} result file(s)`);

    // Read and parse all results
    const results = [];
    for (const file of jsonFiles) {
      const filePath = path.join(OUTPUT_DIR, file);
      const content = await fs.readFile(filePath, "utf-8");
      const result = JSON.parse(content);
      results.push(result);
    }

    // Sort by timestamp
    results.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    console.log("🎨 Generating HTML report...");

    // Generate HTML
    const html = generateHTML(results);

    // Write to file
    await fs.writeFile(REPORT_FILE, html, "utf-8");

    console.log(`✅ Report generated successfully: ${REPORT_FILE}`);
    console.log(`📊 Total tests: ${results.length}`);
    console.log(
      `✅ Passed: ${results.filter((r) => r.status === "passed").length}`,
    );
    console.log(
      `❌ Failed: ${results.filter((r) => r.status === "failed").length}`,
    );
  } catch (error) {
    console.error("❌ Error generating report:", error);
    process.exit(1);
  }
}

main();
