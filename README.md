# LINE Docs to Markdown

LINE DevelopersのドキュメントページからMarkdownをコピーできるChrome拡張機能です。

## 機能

- LINE Developersドキュメントページに「Markdownコピー」ボタンを追加
- ページのコンテンツをMarkdown形式に変換してクリップボードにコピー
- カスタムブロック（Note、Warning等）の適切な変換
- 相対リンクの絶対URL化
- GitHub Flavored Markdown（GFM）サポート

## 使い方

1. Chrome拡張機能としてインストール
2. LINE Developersのドキュメントページ（`https://developers.line.biz/ja/docs/*`）を開く
3. ページタイトル横に表示される「Markdownコピー」ボタンをクリック
4. 変換されたMarkdownがクリップボードにコピーされる

## 開発

### 必要な環境

- Node.js 18+
- npm

### セットアップ

```bash
npm install
```

### 開発サーバー起動

```bash
npm run dev
```

### ビルド

```bash
npm run build
```

ビルドされたファイルは `dist/` フォルダに出力されます。

### リント・フォーマット

```bash
# リント
npm run lint

# フォーマット
npm run fmt

# リント + フォーマット
npm run check
```

### Chrome拡張機能としてインストール

1. `npm run build` でビルドを実行
2. Chrome拡張機能管理ページ（`chrome://extensions/`）を開く
3. 「デベロッパーモード」を有効にする
4. 「パッケージ化されていない拡張機能を読み込む」をクリック
5. プロジェクトルートフォルダを選択

## 技術スタック

- TypeScript
- Vite
- Turndown（HTML to Markdown変換）
- Turndown Plugin GFM
- Biome（リント・フォーマット）
- Chrome Extensions Manifest V3

## ライセンス

MIT
