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

## 開発フロー（GitHub Flow）

このプロジェクトはGitHub Flowを採用しています。**mainブランチに直接pushすることは禁止**されています。

### 開発手順

1. **フィーチャーブランチの作成**
   ```bash
   git checkout -b feature/description-of-change
   ```
   - ブランチ名は `feature/`, `fix/`, `docs/` などのプレフィックスを推奨

2. **変更の実装**
   - 必要なコード変更を実装

3. **品質チェック（必須）**
   ```bash
   npm run check     # リント・フォーマット
   npm test          # ユニットテスト
   npm run build     # ビルド確認
   ```
   - **すべてのチェックが通ることを必ず確認**

4. **セキュリティチェックとバージョン更新（必須）**
   ```bash
   # セキュリティ脆弱性のチェックと修正
   npm audit         # 脆弱性の確認
   npm audit fix     # 脆弱性の修正（修正可能な場合）

   # バージョン番号の更新（package.jsonを編集）
   # - 新機能追加: マイナーバージョンをインクリメント（例: 1.3.0 → 1.4.0）
   # - バグ修正: パッチバージョンをインクリメント（例: 1.3.2 → 1.3.3）
   # - 破壊的変更: メジャーバージョンをインクリメント（例: 1.3.0 → 2.0.0）
   ```
   - **npm audit fixで変更があった場合は必ずコミットに含める**
   - **変更内容に応じてバージョン番号を適切に更新**

5. **変更のコミット・プッシュ**
   ```bash
   git add .
   git commit -m "適切なコミットメッセージ"
   git push origin feature/description-of-change
   ```

6. **プルリクエストの作成（ghコマンド使用）**
   ```bash
   gh pr create --title "プルリクエストのタイトル" --body "変更内容の説明"
   ```

7. **レビュー・マージ**
   - レビュアー（kaz9120）がレビューを実施
   - 承認後、mainブランチにマージ

### 注意事項
- mainブランチへの直接pushは技術的に防止されています
- プルリクエスト作成には必ずghコマンドを使用してください
- 品質チェックが通らない場合は修正してから再度プッシュしてください

## リリースフロー（自動化）

このプロジェクトでは、Chrome Web Storeへのデプロイメントが自動化されています。

### リリース手順

1. **バージョン更新とマージ**
   - 開発フローに従ってプルリクエストを作成
   - `package.json` のバージョンを適切に更新
   - プルリクエストがマージされると自動的に：
     - リリースタグ（`v*.*.*`）が作成される
     - GitHubリリースが作成される
     - Chrome Web Storeへアップロードされる

2. **自動実行されるワークフロー**
   - `main-push.yml`: mainブランチへのマージ時に実行
     - ビルド、テスト、パッケージング
     - Gitタグとリリースの作成
   - `release-to-chrome-store.yml`: タグ作成時に実行
     - Chrome Web Storeへ自動アップロード
   - `refresh-chrome-token.yml`: 月次で自動実行
     - APIトークンの有効期限切れを防止

3. **Chrome Web Storeでの公開**
   - デフォルトでは下書きとしてアップロード
   - [デベロッパーダッシュボード](https://chrome.google.com/webstore/devconsole)で確認
   - 準備ができたら手動で「審査に提出」をクリック

### 初回セットアップ

Chrome Web Storeへの自動デプロイメントを有効にするには、認証情報の設定が必要です。

詳細な手順は [`docs/CHROME_STORE_SETUP.md`](docs/CHROME_STORE_SETUP.md) を参照してください。

必要なGitHub Secrets:
- `CHROME_EXTENSION_ID`: 拡張機能ID
- `CHROME_CLIENT_ID`: OAuth 2.0クライアントID
- `CHROME_CLIENT_SECRET`: OAuth 2.0クライアントシークレット
- `CHROME_REFRESH_TOKEN`: リフレッシュトークン

### トラブルシューティング

リリースに関する問題が発生した場合：

1. GitHub Actionsのログを確認
2. すべてのシークレットが正しく設定されているか確認
3. Chrome Web Store APIが有効化されているか確認
4. `docs/CHROME_STORE_SETUP.md` のトラブルシューティングセクションを参照

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