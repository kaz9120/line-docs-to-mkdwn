# Claude Code プロジェクト設定

## 開発コマンド

### リント・フォーマット
```bash
npm run lint      # Biomeでリント実行
npm run fmt       # Biomeでフォーマット実行  
npm run check     # リント + フォーマット実行
```

### ビルド・開発
```bash
npm run build     # TypeScript + Viteでビルド
npm run dev       # 開発サーバー起動
npm run preview   # ビルド結果をプレビュー
```

## プロジェクト概要

LINE Developersのドキュメントページ用Chrome拡張機能。
ページコンテンツをMarkdown形式に変換してクリップボードにコピーする機能を提供。

### 主要ファイル
- `src/content.ts` - メインのコンテンツスクリプト
- `src/types.d.ts` - TypeScript型定義
- `src/style.css` - 拡張機能のスタイル
- `manifest.json` - Chrome拡張機能設定
- `vite.config.ts` - Vite設定（IIFE形式でビルド）

### 技術仕様
- TypeScript
- Chrome Extensions Manifest V3
- Turndown（HTML→Markdown変換）
- GFM（GitHub Flavored Markdown）サポート
- Biome（リント・フォーマット）

### 注意事項
- `npm run lint`と`npm run build`の両方が通ることを必ず確認する
- `any`型の使用は避け、適切な型注釈を使用する
- Biomeのルール変更は不可