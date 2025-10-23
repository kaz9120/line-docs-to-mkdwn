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
npm run test:e2e  # PlaywrightでE2Eテスト実行
```

### Markdown生成と検証
```bash
npm run generate:markdown         # URLリストから全Markdownファイルを生成
npm run validate:markdown         # Markdownファイルの存在チェック（高速）
npm run validate:markdown:strict  # 厳密モード：実際に再生成して差分チェック（低速）
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
   npm run check              # リント・フォーマット
   npm test                   # ユニットテスト
   npm run build              # ビルド確認
   npm run validate:markdown  # Markdownファイルの検証（urls.json変更時）
   ```
   - **すべてのチェックが通ることを必ず確認**
   - `urls.json` を変更した場合は、`npm run generate:markdown` で Markdown ファイルを生成

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
     - Chrome Web Storeへアップロードされ、自動的に公開される

2. **自動実行されるワークフロー**
   - `main-push.yml`: mainブランチへのマージ時に実行
     - ビルド、テスト、パッケージング
     - Gitタグとリリースの作成
     - Chrome Web Storeへ自動アップロードと公開
   - `refresh-chrome-token.yml`: 月次で自動実行
     - APIトークンの有効期限切れを防止

3. **Chrome Web Storeでの公開**
   - 自動的にChrome Web Storeへ公開される
   - [デベロッパーダッシュボード](https://chrome.google.com/webstore/devconsole)で確認可能
   - 公開後、数分以内にChrome Web Storeで利用可能になる

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

## Markdown変換結果の管理

このプロジェクトでは、LINE Developersドキュメントページの変換結果をGitHub上で管理しています。

### 概要

- 変換対象のURLは `urls.txt` で管理（1行1URL）
- 変換結果は `./markdown/` ディレクトリに保存
- URLからMarkdownファイルのパスは自動生成される
- E2Eテストを使用して自動生成
- GitHub ActionsのCIで最新性を検証

### URL管理ファイル (urls.txt)

変換対象のURLを1行1URLで列挙：

```
# LINE Developers ドキュメント URL リスト
# 各行に1つのURLを記載
# '#' で始まる行はコメントとして扱われます
# 空行は無視されます

# 基本機能
https://developers.line.biz/ja/docs/basics/channel-access-token/

# Messaging API
https://developers.line.biz/ja/docs/messaging-api/overview/
https://developers.line.biz/ja/docs/messaging-api/sending-messages/

# LINE Login
https://developers.line.biz/ja/docs/line-login/overview/
```

**記法:**
- 1行に1URL
- `#` で始まる行はコメント
- 空行は無視される
- コメントと空行でグループ化して見やすく管理できます

**パス変換:**
- URLは自動的にMarkdownファイルのパスに変換されます
- 例: `https://developers.line.biz/ja/docs/basics/channel-access-token/` → `docs/basics/channel-access-token.md`

### Markdownファイルの生成

新しいURLを追加した場合や、ドキュメントが更新された場合：

1. **URLを追加**
   ```bash
   # urls.txt に新しいURLを追加（1行1URL）
   ```

2. **Markdownを生成**
   ```bash
   npm run generate:markdown
   ```
   - ビルドを実行
   - PlaywrightでChrome拡張をロード
   - 各URLに**順番に**アクセスして変換（安定性優先）
   - `./markdown/` 配下に自動的にパスを生成して保存
   - 失敗した場合、自動的に2回までリトライ

   **注意**: 安定性を優先し、テストは直列実行されます。URLが多い場合は時間がかかります。

3. **変更をコミット**
   ```bash
   git add urls.txt markdown/
   git commit -m "feat: Add markdown for <page-name>"
   ```

### CI検証

プルリクエスト作成時、GitHub Actionsが自動的に：

- Markdownファイルの存在を確認
- ファイルが空でないかチェック
- 不足があればCI失敗

**重要**: Markdownファイルを更新し忘れた場合、CIが失敗します。`npm run generate:markdown` を実行してコミットに含めてください。

### 厳密モード検証

通常の検証はファイルの存在のみをチェックしますが、厳密モードでは実際に再生成して内容を比較します。

```bash
npm run validate:markdown:strict
```

#### 検証内容

1. **変換ロジックの更新検出**: 拡張機能のコードを変更した場合、既存のMarkdownファイルが古いことを検出
2. **LINE Developers側の更新検出**: ドキュメントページが更新された場合も検出可能
3. **フロントマター正規化**: `copy_date` を除外して比較するため、コピー日時の違いは無視

#### 実行例

```bash
$ npm run validate:markdown:strict

Validating markdown files (strict mode)...
Running strict validation (this may take a while)...

✓ docs/basics/channel-access-token.md (no changes)
⚠️  docs/messaging-api/overview.md
   Content has changed (23 lines differ)
   → Run 'npm run generate:markdown' to update

✓ docs/messaging-api/sending-messages.md (no changes)
✓ docs/line-login/overview.md (no changes)

Total URLs: 4
Valid files: 4
Outdated files: 1

⚠️  Some files are outdated!
```

#### 使い分け

- **通常モード (`validate:markdown`)**: CI/PRチェック、高速チェック
- **厳密モード (`validate:markdown:strict`)**: 定期的な手動実行、変換ロジック更新時

### ディレクトリ構造

```
line-docs-to-mkdwn/
├── urls.txt                  # URL管理ファイル（1行1URL）
└── markdown/                 # 変換結果の保存先（自動生成ファイルのみ）
    └── docs/
        ├── basics/
        │   └── channel-access-token.md
        ├── messaging-api/
        │   ├── overview.md
        │   └── sending-messages.md
        └── line-login/
            └── overview.md
```

### トラブルシューティング

#### CIで "Missing markdown files" エラー

```bash
# 不足しているファイルを生成
npm run generate:markdown

# 生成されたファイルをコミット
git add markdown/
git commit -m "docs: Update markdown files"
```

#### タイムアウトエラーが発生する場合

Markdown生成は安定性を優先し、以下の設定で実行されます：

- **直列実行**: ワーカー数1（並列実行なし）
- **タイムアウト**: テスト1件あたり60秒
- **リトライ**: 失敗時に最大2回まで自動リトライ
- **ナビゲーションタイムアウト**: ページ読み込みに30秒
- **アクションタイムアウト**: ボタンクリックなどに15秒

これらの設定は `playwright-generate.config.ts` で定義されています。

さらに調整が必要な場合は、以下の値を変更してください：

```typescript
// playwright-generate.config.ts
timeout: 90 * 1000,  // テストタイムアウトを90秒に延長
retries: 3,          // リトライ回数を3回に増加
```

#### 特定のURLのみ再生成したい場合

PlaywrightのE2Eテストでは、個別のテストを実行できます：

```bash
npm run build
npx playwright test --config=playwright-generate.config.ts -g "docs/basics/channel-access-token.md"
```

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