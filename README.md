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

4. **変更をプッシュ**
   ```bash
   git add .
   git commit -m "your commit message"
   git push origin feature/your-feature-name
   ```

5. **プルリクエストの作成**
   - GitHub WebUIからプルリクエストを作成
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
- アーティファクトの保存

### 定期実行
- 依存関係の脆弱性監査（週1回）

すべてのプルリクエストはCIチェックの通過が必須です。

## ライセンス

MIT
