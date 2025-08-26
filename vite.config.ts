import { resolve } from "node:path";
import { defineConfig } from "vite";
import { copyFileSync } from "node:fs";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        content: resolve(__dirname, "src/content.ts"),
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
      },
    },
    lib: {
      entry: resolve(__dirname, "src/content.ts"),
      formats: ["iife"],
      name: "ContentScript",
    },
  },
  define: {
    "process.env": {},
  },
  plugins: [
    {
      name: "copy-extension-files",
      writeBundle() {
        // manifest.jsonとstyle.cssをdistにコピー
        copyFileSync(
          resolve(__dirname, "manifest.json"),
          resolve(__dirname, "dist/manifest.json"),
        );
        copyFileSync(
          resolve(__dirname, "src/style.css"),
          resolve(__dirname, "dist/style.css"),
        );
      },
    },
  ],
});
