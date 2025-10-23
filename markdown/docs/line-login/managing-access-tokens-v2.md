---
url: https://developers.line.biz/ja/docs/line-login/managing-access-tokens-v2/
copied_at: 2025-10-23T15:58:51.279Z
---
# アクセストークンを管理する（LINEログイン v2.0）

:::note alert
LINEログイン v2.0は非推奨です

:::

LINEログインAPIで管理するアクセストークンは、LINEプラットフォームに保存されているユーザー情報（例：ユーザーID、表示名、プロフィール画像、およびステータスメッセージ）を利用することを、アプリが許可されていることを示します。

ここでは、[LINEログイン v2.0](https://developers.line.biz/ja/docs/line-login/overview/#versions)のエンドポイントを使ってアクセストークンを管理する方法について説明します。

## ユーザーのアクセストークンを取得する

ユーザーの認証が終わると、LINEプラットフォームからアクセストークンが返されます。

この時点で、ユーザー情報を利用することを、アプリが許可されていると考えることができます。

詳しくは、以下の記事を参照してください。

**LINEログイン：**

*   [ウェブアプリにLINEログイン v2.0を組み込む](https://developers.line.biz/ja/docs/line-login/integrate-line-login-v2/)

:::note warn
アクセストークンの有効期間

:::

### リフレッシュトークン

ユーザーの認証が終わったときに、アクセストークンと共にリフレッシュトークンが返されます。

アクセストークンの有効期限が切れたときは、リフレッシュトークンを使用して新しいアクセストークンを取​得できます。詳しくは、『LINEログイン v2.0 APIリファレンス』の「[アクセストークンを更新する](https://developers.line.biz/ja/reference/line-login-v2/#refresh-access-token)」を参照してください。

:::note warn
リフレッシュトークンの有効期間

:::

## アクセストークンを検証する

アプリやほかのサーバーから受信したアクセストークンをサーバーで使用する場合は、アクセストークンを検証してください。

アクセストークンの検証方法は、『LINEログイン v2.0 APIリファレンス』の「[アクセストークンを検証する](https://developers.line.biz/ja/reference/line-login-v2/#verify-access-token)」を参照してください。

:::note warn
アクセストークンの検証後、さらに確認が必要です

:::