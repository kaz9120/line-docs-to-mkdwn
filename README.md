# LINE Docs to Markdown

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/bnbonjnlgejplgblndeagjjmmdbfbaag)](https://chromewebstore.google.com/detail/line-docs-to-markdown/bnbonjnlgejplgblndeagjjmmdbfbaag)

LINE Developersのドキュメントページのコンテンツを、ワンクリックでMarkdown形式に変換してクリップボードにコピーできるChrome拡張機能です。

## 概要

この拡張機能を使用すると、LINE Developersの公式ドキュメント（`https://developers.line.biz/ja/docs/*`）を簡単にMarkdown形式で取得できます。ドキュメントの引用や参照、個人的なメモ作成などに便利です。

開発の経緯については[こちらのブログ記事](https://zenn.dev/moshjp/articles/ec8ad908e9002f)をご覧ください。

## インストール

[Chrome Web Store](https://chromewebstore.google.com/detail/line-docs-to-markdown/bnbonjnlgejplgblndeagjjmmdbfbaag)からインストールできます。

## 機能

- LINE Developersドキュメントページに「Markdownコピー」ボタンを追加
- ページのコンテンツをMarkdown形式に変換してクリップボードにコピー
- カスタムブロック（Note、Warning等）の適切な変換
- 相対リンクの絶対URL化
- GitHub Flavored Markdown（GFM）サポート

## 使い方

1. [Chrome Web Store](https://chromewebstore.google.com/detail/line-docs-to-markdown/bnbonjnlgejplgblndeagjjmmdbfbaag)から拡張機能をインストール
2. LINE Developersのドキュメントページ（`https://developers.line.biz/ja/docs/*`）を開く
3. ページタイトル横に表示される「Markdownコピー」ボタンをクリック
4. 変換されたMarkdownがクリップボードにコピーされます

## 開発

### 開発フロー

このプロジェクトはGitHub Flowを採用しています：

1. **フィーチャーブランチの作成**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **変更の実装**
   - コードの修正・追加を行う

3. **品質チェック**
   ```bash
   npm run check  # リント・フォーマット
   npm test       # テスト実行
   npm run build  # ビルド確認
   ```

4. **セキュリティチェックとバージョン更新**
   ```bash
   npm audit         # 脆弱性の確認
   npm audit fix     # 脆弱性の修正（修正可能な場合）
   # package.jsonのバージョン番号を更新
   # - 新機能追加: マイナーバージョンをインクリメント
   # - バグ修正: パッチバージョンをインクリメント
   # - 破壊的変更: メジャーバージョンをインクリメント
   ```

5. **変更をプッシュ**
   ```bash
   git add .
   git commit -m "your commit message"
   git push origin feature/your-feature-name
   ```

6. **プルリクエストの作成**
   ```bash
   gh pr create --title "プルリクエストのタイトル" --body "変更内容の説明"
   ```
   - レビュー完了後、mainブランチにマージ

**注意**: mainブランチに直接pushすることはできません。

### 必要な環境

- Node.js 22+
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

### テスト

```bash
# テスト実行
npm test

# テストUI
npm run test:ui

# カバレッジ付きテスト
npm run test:coverage
```

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
- Vitest + jsdom（テスト）
- GitHub Actions（CI/CD）
- Chrome Extensions Manifest V3

## CI/CD

プロジェクトではGitHub Actionsを使用した自動化を導入しています：

### プルリクエスト時
- コード品質チェック（リント・フォーマット）
- ユニットテスト実行
- ビルド検証
- テストカバレッジ生成

### mainブランチマージ時
- 本番環境相当のビルド
- Chrome拡張機能パッケージの作成
- GitタグとGitHubリリースの自動作成
- Chrome Web Storeへの自動アップロード（既存の拡張機能の更新のみ）
- アーティファクトの保存

### 定期実行
- 依存関係の脆弱性監査（週1回）
- Chrome Web Store APIトークンのリフレッシュ（月1回）

すべてのプルリクエストはCIチェックの通過が必須です。

**⚠️ Chrome Web Store自動デプロイメント**: 初回公開は必ず手動で行う必要があります。設定方法の詳細は[`docs/CHROME_STORE_SETUP.md`](docs/CHROME_STORE_SETUP.md)を参照してください。

## 変更履歴

変更履歴は[GitHubのリリースページ](https://github.com/kaz9120/line-docs-to-mkdwn/releases)をご覧ください。

## ライセンス

MIT
