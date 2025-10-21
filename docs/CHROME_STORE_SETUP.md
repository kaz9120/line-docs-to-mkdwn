# Chrome Web Store 自動デプロイメントセットアップガイド

このガイドでは、Chrome Web Storeへの自動デプロイメントを有効にするために必要な認証情報の取得方法を説明します。

## 概要

リリースタグ（`v*.*.*`）が作成されると、GitHub Actionsが自動的に：

1. 拡張機能をビルド
2. テストを実行
3. ZIPファイルを作成
4. Chrome Web Storeへアップロード

## 前提条件

- Chrome Web Storeデベロッパーアカウント（[登録](https://chrome.google.com/webstore/devconsole)）
- 拡張機能が既にChrome Web Storeに公開されていること（初回は手動公開が必要）
- Googleアカウント

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

### ステップ6: 拡張機能IDの取得

1. [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/developer/dashboard) にアクセス
2. 拡張機能の詳細ページを開く
3. URLから32文字の拡張機能IDをコピー
   - 例: `https://chrome.google.com/webstore/detail/abcdefghijklmnopqrstuvwxyz123456`
   - この場合、IDは `abcdefghijklmnopqrstuvwxyz123456`

### ステップ7: GitHub Secretsへの保存

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
   - Gitタグ `v1.5.3` を作成
   - GitHubリリースを作成
5. タグ作成により `release-to-chrome-store.yml` ワークフローが起動：
   - 拡張機能をビルド
   - Chrome Web Storeへアップロード

### 公開設定の変更

デフォルトでは、拡張機能は**下書き**としてアップロードされます（安全のため）。

**自動公開を有効にする場合:**

`.github/workflows/release-to-chrome-store.yml` を編集：

```yaml
# 変更前
publish: false  # 安全のため下書きとしてアップロード

# 変更後
publish: true  # 自動的に審査に提出
```

⚠️ **注意**: `publish: true` にすると、審査に自動的に提出されます。下書きとして確認してから手動で提出する方が安全です。

## トラブルシューティング

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

1. すべてのシークレットが正しく設定されているか
2. Chrome Web Store APIが有効化されているか（1時間待機）
3. OAuth同意画面が「公開」状態になっているか
4. 拡張機能が既にChrome Web Storeに公開されているか

それでも解決しない場合は、GitHub Actionsのログを確認してエラーメッセージを特定してください。
