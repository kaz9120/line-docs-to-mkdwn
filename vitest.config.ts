import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/__tests__/setup.ts"],
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: ["node_modules/**", "dist/**", "src/__tests__/**", "e2e/**"],
    },
    exclude: ["node_modules/**", "dist/**", "e2e/**"],
    globals: true,
  },
});
