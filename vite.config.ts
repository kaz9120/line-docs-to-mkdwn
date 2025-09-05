import { copyFileSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";

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
      name: "sync-extension-files",
      writeBundle() {
        // package.jsonからバージョンを取得
        const packageJsonPath = resolve(__dirname, "package.json");
        const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
        const version = packageJson.version;

        // manifest.jsonを読み込んでバージョンを更新
        const manifestJsonPath = resolve(__dirname, "manifest.json");
        const manifest = JSON.parse(readFileSync(manifestJsonPath, "utf-8"));
        manifest.version = version;

        // 更新されたmanifest.jsonをdistに書き込み
        const distManifestPath = resolve(__dirname, "dist/manifest.json");
        writeFileSync(distManifestPath, JSON.stringify(manifest, null, 2));

        // style.cssをdistにコピー
        copyFileSync(
          resolve(__dirname, "src/style.css"),
          resolve(__dirname, "dist/style.css"),
        );
      },
    },
  ],
});
