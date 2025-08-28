# Claude Code プロジェクト設定

## 開発コマンド

### リント・フォーマット
```bash
npm run lint      # Biomeでリント実行
npm run fmt       # Biomeでフォーマット実行  
npm run check     # リント + フォーマット実行
```

### テスト
```bash
npm test          # Vitestでユニットテスト実行
```

### ビルド
```bash
npm run build     # TypeScript + Viteでビルド
```

### 動作確認
Chrome拡張機能のため、通常のWebサーバーでは動作しません。
以下の手順でChromeに読み込んで確認：

1. `npm run build` でビルド実行
2. `chrome://extensions/` でデベロッパーモードを有効化
3. 「パッケージ化されていない拡張機能を読み込む」でプロジェクトルートを選択
4. LINE Developersサイトで動作確認

## プロジェクト概要

LINE Developersのドキュメントページ用Chrome拡張機能。
ページコンテンツをMarkdown形式に変換してクリップボードにコピーする機能を提供。

### ソースコード構成

#### エントリポイント
- `src/content.ts` - メインエントリポイント（ページ監視開始）

#### 機能モジュール
- `src/constants.ts` - 定数・設定値の集約
- `src/icons.ts` - SVGアイコン生成
- `src/dom-utils.ts` - DOM操作ユーティリティ
- `src/markdown-converter.ts` - HTML→Markdown変換ロジック
- `src/clipboard-manager.ts` - クリップボード操作
- `src/button-manager.ts` - ボタンUI管理
- `src/page-observer.ts` - ページ監視・イベント処理

#### 設定・型定義
- `src/types.d.ts` - TypeScript型定義
- `src/style.css` - 拡張機能のスタイル
- `manifest.json` - Chrome拡張機能設定
- `vite.config.ts` - Vite設定（IIFE形式でビルド）

### 技術仕様
- TypeScript
- Chrome Extensions Manifest V3
- Turndown（HTML→Markdown変換）
- GFM（GitHub Flavored Markdown）サポート
- Vitest + jsdom（テスト）
- Biome（リント・フォーマット）

### アーキテクチャ原則
- 関心の分離：各モジュールは単一責任を持つ
- 定数の一元管理：設定値は`constants.ts`で管理
- 型安全性：`any`型を避け、適切な型注釈を使用
- テスタビリティ：機能を独立したモジュールに分割

### 注意事項
- `npm test`、`npm run lint`、`npm run build`の全てが通ることを必ず確認する
- 新機能は適切なモジュールに実装し、必要に応じて新モジュールを作成
- コア機能の変更時は対応するテストケースも更新する
- Biomeのルール変更は不可