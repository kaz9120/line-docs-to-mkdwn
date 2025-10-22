# Chrome Web Store 自動デプロイメントセットアップガイド

このガイドでは、Chrome Web Storeへの自動デプロイメントを有効にするために必要な認証情報の取得方法を説明します。

## 概要

mainブランチへのマージ時に、GitHub Actionsが自動的に：

1. 拡張機能をビルド
2. テストを実行
3. ZIPファイルを作成
4. GitタグとGitHubリリースを作成
5. Chrome Web Storeへアップロード

**⚠️ 重要**: このワークフローは**既存の拡張機能の更新**にのみ使用できます。初回公開は必ず手動で行う必要があります（ステップ6を参照）。

## 前提条件

- Chrome Web Storeデベロッパーアカウント（[登録](https://chrome.google.com/webstore/devconsole)）
- **⚠️ 重要**: 拡張機能が既にChrome Web Storeに公開されていること
  - **APIを使用する前に、必ず最初の1回は手動で公開する必要があります**
  - 手動公開時に、ストアリスティング、スクリーンショット、プライバシーポリシーを完全に設定する
  - APIは既存の拡張機能の更新にのみ使用可能（新規公開には使用できません）
- Googleアカウント（拡張機能の所有者アカウント）

## セットアップ手順

### ステップ1: Google Cloud Consoleでプロジェクトを作成

1. [Google Cloud Console](https://console.developers.google.com) にアクセス
2. 新しいプロジェクトを作成（例: "chrome-extension-automation"）
3. プロジェクトを選択

### ステップ2: Chrome Web Store APIを有効化

1. 検索バーで「Chrome Web Store API」を検索
2. 「有効にする」をクリック
3. ⚠️ **重要**: 有効化後、実際に使用可能になるまで最大1時間かかる場合があります

### ステップ3: OAuth同意画面の設定

1. 「OAuth同意画面」に移動
2. 「外部」を選択して「作成」をクリック
3. 必須フィールドを入力：
   - アプリ名: 任意（例: "LINE Docs to Markdown Automation"）
   - ユーザーサポートメール: あなたのメールアドレス
   - デベロッパー連絡先情報: あなたのメールアドレス
4. スコープ画面はスキップ（「保存して続行」）
5. テストユーザーに自分のメールアドレスを追加
6. 「保存して続行」をクリック
7. ⚠️ **重要**: 「アプリを公開」をクリックして公開状態にする

### ステップ4: OAuth 2.0クライアントIDの作成

1. 「認証情報」タブに移動
2. 「認証情報を作成」→「OAuth クライアント ID」を選択
3. アプリケーションの種類で **「デスクトップアプリ」を選択**
   - ⚠️ **注意**: 「Chrome拡張機能」タイプは選択しないこと
4. 名前を入力（例: "GitHub Actions Automation"）
5. 「作成」をクリック
6. **クライアントID**と**クライアントシークレット**をコピーして安全に保存

### ステップ5: リフレッシュトークンの取得

#### 方法A: chrome-webstore-upload-keysを使用（推奨）

ターミナルで以下を実行：

```bash
npx chrome-webstore-upload-keys
```

このツールが対話的にOAuthフローを処理し、リフレッシュトークンを自動生成します。

#### 方法B: OAuth 2.0 Playground（手動）

1. [OAuth 2.0 Playground](https://developers.google.com/oauthplayground) にアクセス
2. 右上の設定アイコン（⚙️）をクリック
3. 「Use your own OAuth credentials」にチェック
4. ステップ4で取得したクライアントIDとクライアントシークレットを入力
5. 左側の「Input your own scopes」フィールドに以下を入力：
   ```
   https://www.googleapis.com/auth/chromewebstore
   ```
6. 「Authorize APIs」をクリック
7. 拡張機能を所有するGoogleアカウントでサインイン
8. 権限を付与
9. 「Exchange authorization code for tokens」をクリック
10. **Refresh token**をコピーして安全に保存

### ステップ6: 拡張機能の初回手動公開（必須）

⚠️ **このステップは必須です。APIを使用する前に完了してください。**

1. [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard) にアクセス
2. 「新しいアイテム」をクリック
3. プロジェクトの `line-docs-to-mkdwn.zip` ファイルをアップロード
   - ローカルで `npm run build && npm run package` を実行してZIPファイルを生成
4. **ストアリスティング**を完全に記入：
   - 詳細な説明
   - カテゴリ
   - 言語
   - スクリーンショット（最低1枚、推奨5枚）
   - アイコン画像
5. **プライバシー**タブを記入：
   - プライバシーポリシーのURL
   - データ使用に関する開示
6. **配布**設定を確認
7. 「審査に提出」をクリックして初回公開
8. 審査完了を待つ（通常1〜3日）

### ステップ7: 拡張機能IDの取得

初回公開後、拡張機能IDを取得します：

1. [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard) にアクセス
2. 公開した拡張機能の詳細ページを開く
3. URLから32文字の拡張機能IDをコピー
   - 例: `https://chrome.google.com/webstore/detail/abcdefghijklmnopqrstuvwxyz123456`
   - この場合、IDは `abcdefghijklmnopqrstuvwxyz123456`
4. または、アイテムIDのセクションから直接コピー

### ステップ8: GitHub Secretsへの保存

1. GitHubリポジトリの「Settings」→「Secrets and variables」→「Actions」に移動
2. 「New repository secret」をクリックして、以下のシークレットを追加：

| シークレット名 | 値 | 説明 |
|---------------|-----|------|
| `CHROME_EXTENSION_ID` | 32文字のID | ステップ6で取得した拡張機能ID |
| `CHROME_CLIENT_ID` | クライアントID | ステップ4で取得したOAuth 2.0クライアントID |
| `CHROME_CLIENT_SECRET` | クライアントシークレット | ステップ4で取得したOAuth 2.0クライアントシークレット |
| `CHROME_REFRESH_TOKEN` | リフレッシュトークン | ステップ5で取得したリフレッシュトークン |

## デプロイメントの動作確認

すべてのシークレットが設定されたら、デプロイメントをテストできます。

### 自動デプロイメントのフロー

1. `package.json` のバージョンを更新（例: `1.5.2` → `1.5.3`）
2. 変更をコミットしてプルリクエストを作成
3. プルリクエストをマージ
4. `main-push.yml` ワークフローが自動的に：
   - ビルドとテストを実行
   - 拡張機能パッケージ（ZIP）を作成
   - Gitタグ `v1.5.3` を作成
   - GitHubリリースを作成
   - **環境変数の検証**（デバッグ用）
   - Chrome Web Storeへアップロード

### デバッグ機能

ワークフローには環境変数の検証とエラーハンドリング機能が組み込まれています。

**環境変数の検証ステップ**（"Validate Chrome Web Store secrets"）:
- 各Secretが正しく設定されているか自動確認
- 文字数チェック（値の長さが適切か）
- 拡張機能IDとClient IDの先頭文字を表示（マスキングされた形式）
- いずれかの変数が未設定の場合、ワークフローが停止

**エラーハンドリングステップ**（"Handle upload failure"）:
- アップロード失敗時に詳細なデバッグ情報を表示
- 403エラーの一般的な原因をリストアップ
- 推奨される対処方法を提示

GitHub Actionsのログでこれらのステップを確認することで、問題の原因を特定できます。

### 公開設定の変更

デフォルトでは、拡張機能は**下書き**としてアップロードされます（安全のため）。

**自動公開を有効にする場合:**

`.github/workflows/main-push.yml` を編集：

```yaml
# 変更前
publish: false  # 安全のため下書きとしてアップロード

# 変更後
publish: true  # 自動的に審査に提出
```

⚠️ **注意**: `publish: true` にすると、審査に自動的に提出されます。下書きとして確認してから手動で提出する方が安全です。

## トラブルシューティング

### エラー: 403 Forbidden

**まず最初に確認すること:**

1. **GitHub Actionsのログを確認**
   - 「Validate Chrome Web Store secrets」ステップの出力を確認
   - すべての環境変数が正しく読み込まれているか
   - 拡張機能IDの文字数が32文字であることを確認
   - 各変数の先頭文字が期待される値と一致しているか

2. **「Handle upload failure」ステップのデバッグ情報を確認**
   - 拡張機能IDが正しいか
   - ZIPファイルが正常に作成されているか

**原因:**
- **拡張機能IDの不一致**（GitHub Secretsの`CHROME_EXTENSION_ID`が間違っている）
- **リフレッシュトークン取得時に使用したGoogleアカウントが拡張機能の所有者でない**
- **OAuth認証情報がこの拡張機能に対して権限を持っていない**
- **拡張機能がまだChrome Web Storeに初回公開されていない**
- リフレッシュトークンが期限切れまたは無効化されている
- OAuth同意画面が「公開」状態になっていない
- Chrome Web Store APIが有効化されていない、または有効化後1時間経っていない
- ストアリスティングが不完全（スクリーンショット、説明、プライバシーポリシーが未設定）

**解決策:**

**優先度1: 拡張機能IDとアカウントの確認**
1. Chrome Web Store Developer Dashboardで拡張機能IDを再確認
   - GitHubのSecretsに設定されている`CHROME_EXTENSION_ID`と完全に一致するか
2. リフレッシュトークンを再生成
   - **必ず拡張機能の所有者アカウントでログインして生成する**
   ```bash
   npx chrome-webstore-upload-keys
   ```
   - 生成されたトークンをGitHub Secretsの`CHROME_REFRESH_TOKEN`に再設定

**優先度2: API設定の確認**
3. Chrome Web Store APIが有効化されて1時間以上経過しているか確認（ステップ2）
4. OAuth同意画面が「公開」状態になっているか確認（ステップ3）
5. OAuth 2.0クライアントが「デスクトップアプリ」タイプであることを確認（ステップ4）

**優先度3: 初回公開の確認**
6. 拡張機能がまだ公開されていない場合：
   - **ステップ6: 拡張機能の初回手動公開を完了してください**
   - Developer Dashboardでストアリスティングを完全に記入
   - 審査に提出して承認を待つ

### エラー: 401 Unauthorized

**原因:**
- リフレッシュトークンが期限切れ
- 間違ったOAuthクライアントタイプ
- Chrome Web Store APIが有効化されていない

**解決策:**
1. ステップ5でトークンを再生成
2. 「デスクトップアプリ」タイプを使用しているか確認
3. APIが有効化されて1時間以上経過しているか確認

### エラー: 400 Bad Request

**原因:**
- 無効なZIP構造
- ストアリスティングが不完全

**解決策:**
1. `npm run package` が正しく実行されるか確認
2. デベロッパーダッシュボードで説明、スクリーンショット、プライバシーポリシーが設定されているか確認

### エラー: Item already under review

**原因:**
別のバージョンが既に審査中

**解決策:**
1. デベロッパーダッシュボードで現在の審査ステータスを確認
2. 審査が完了するまで待つ
3. または `publish: false` に設定して下書きとしてアップロード

## セキュリティのベストプラクティス

- ✅ すべての認証情報をGitHub Secretsに保存（コードにコミットしない）
- ✅ リフレッシュトークンは6ヶ月間使用されないと失効する可能性があります
  - `refresh-chrome-token.yml` ワークフローが月次で自動実行されます
- ✅ 本番環境では `publish: false` を推奨（手動で最終確認）
- ✅ 定期的にアクセスログを確認

## 参考リンク

- [Chrome Web Store API V2 Documentation](https://developer.chrome.com/docs/webstore/api/)
- [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
- [Google Cloud Console](https://console.developers.google.com)
- [OAuth 2.0 Playground](https://developers.google.com/oauthplayground)

## サポート

問題が発生した場合は、以下を確認してください：

### 403 Forbiddenエラーのチェックリスト

1. ✅ **拡張機能が既にChrome Web Storeに初回公開されているか**（最重要）
   - APIは新規公開には使用できません
   - 必ず手動で一度公開してから、APIで更新を自動化してください
2. ✅ すべてのシークレットが正しく設定されているか
3. ✅ Chrome Web Store APIが有効化されているか（1時間待機）
4. ✅ OAuth同意画面が「公開」状態になっているか
5. ✅ リフレッシュトークン取得時に拡張機能の所有者アカウントでログインしたか
6. ✅ Developer Dashboardでストアリスティングが完全に記入されているか

### その他のエラー

それでも解決しない場合は、GitHub Actionsのログを確認してエラーメッセージを特定してください。
