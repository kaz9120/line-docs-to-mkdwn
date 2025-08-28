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

### 動作確認・デバッグ

Chrome拡張機能は通常のWebサーバーでは動作しないため、以下の手順で確認：

1. `npm run build` でビルドを実行
2. Chrome拡張機能管理ページ（`chrome://extensions/`）を開く
3. 「デベロッパーモード」を有効にする
4. 「パッケージ化されていない拡張機能を読み込む」をクリック
5. プロジェクトルートフォルダを選択
6. LINE Developersのドキュメントページで動作確認

**注意**: コード変更後は必ず`npm run build`を実行し、拡張機能の更新ボタンをクリックしてください。

## アーキテクチャ

### モジュール構成
- **関心の分離**: 機能別にモジュールを分割し、単一責任の原則を適用
- **型安全性**: TypeScriptによる厳密な型チェック
- **設定の一元管理**: 定数・設定値は`constants.ts`で管理
- **テスタビリティ**: 各機能を独立したモジュールに分割

### 主要モジュール
- `page-observer.ts` - ページ変更監視とライフサイクル管理
- `button-manager.ts` - UI要素の作成と状態管理
- `markdown-converter.ts` - HTML→Markdown変換処理
- `clipboard-manager.ts` - クリップボード操作と結果管理

## 技術スタック

- TypeScript
- Vite
- Turndown（HTML to Markdown変換）
- Turndown Plugin GFM
- Biome（リント・フォーマット）
- Chrome Extensions Manifest V3

## ライセンス

MIT
