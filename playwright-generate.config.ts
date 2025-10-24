import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright configuration for Markdown generation
 * Optimized for parallel execution with retry safety
 */
export default defineConfig({
  testDir: "./e2e",

  /* Maximum time one test can run for */
  timeout: 60 * 1000, // 60 seconds per test

  /* Run tests in parallel for better performance */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,

  /* Retry failed tests multiple times for reliability */
  retries: 4,

  /* Let Playwright decide optimal worker count based on CPU cores */
  // workers: undefined (default behavior),

  /* Reporter to use - simplified for generation task */
  reporter: [["list"], ["json", { outputFile: "test-results/results.json" }]],

  /* Shared settings for all the projects below */
  use: {
    /* Collect trace when retrying the failed test */
    trace: "on-first-retry",

    /* Screenshot on failure */
    screenshot: "only-on-failure",

    /* Video on failure */
    video: "retain-on-failure",

    /* Clipboard permissions for testing copy functionality */
    permissions: ["clipboard-read", "clipboard-write"],

    /* Increased timeouts for navigation and actions */
    navigationTimeout: 30 * 1000, // 30 seconds for page.goto()
    actionTimeout: 15 * 1000, // 15 seconds for actions
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chromium",
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "test-results/",
});
