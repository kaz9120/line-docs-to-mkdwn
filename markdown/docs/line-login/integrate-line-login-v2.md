---
url: https://developers.line.biz/ja/docs/line-login/managing-access-tokens-v2/
copied_at: 2025-10-24T10:16:07.626Z
---
# アクセストークンを管理する（LINEログイン v2.0）

> [!CAUTION]
> LINEログイン v2.0は非推奨です
> このページは旧バージョンのLINEログイン v2.0に関するドキュメントです。LINEログイン v2.0は[非推奨](https://developers.line.biz/ja/glossary/#deprecated)であり、時期は未定ですが[廃止](https://developers.line.biz/ja/glossary/#end-of-life)を予定しているため、現行バージョン（LINEログイン v2.1）の利用を推奨します。なお廃止時期の告知から、実際の廃止までは一定の猶予期間を置く予定です。詳しくは、「[LINEログインのバージョンについて](https://developers.line.biz/ja/docs/line-login/overview/#versions)」を参照してください。

LINEログインAPIで管理するアクセストークンは、LINEプラットフォームに保存されているユーザー情報（例：ユーザーID、表示名、プロフィール画像、およびステータスメッセージ）を利用することを、アプリが許可されていることを示します。

ここでは、[LINEログイン v2.0](https://developers.line.biz/ja/docs/line-login/overview/#versions)のエンドポイントを使ってアクセストークンを管理する方法について説明します。

## ユーザーのアクセストークンを取得する

ユーザーの認証が終わると、LINEプラットフォームからアクセストークンが返されます。

この時点で、ユーザー情報を利用することを、アプリが許可されていると考えることができます。

詳しくは、以下の記事を参照してください。

**LINEログイン：**

*   [ウェブアプリにLINEログイン v2.0を組み込む](https://developers.line.biz/ja/docs/line-login/integrate-line-login-v2/)

> [!WARNING]
> アクセストークンの有効期間
> アクセストークンは発行後30日間有効です。アクセストークンを含むレスポンスの`expires_in`プロパティに、有効期間（秒）が含まれます。

### リフレッシュトークン

ユーザーの認証が終わったときに、アクセストークンと共にリフレッシュトークンが返されます。

アクセストークンの有効期限が切れたときは、リフレッシュトークンを使用して新しいアクセストークンを取​得できます。詳しくは、『LINEログイン v2.0 APIリファレンス』の「[アクセストークンを更新する](https://developers.line.biz/ja/reference/line-login-v2/#refresh-access-token)」を参照してください。

> [!WARNING]
> リフレッシュトークンの有効期間
> リフレッシュトークンは、アクセストークンが発行されてから最長90日間有効です。リフレッシュトークンの有効期限が切れた場合は、ユーザーに再度ログインを要求して新しいアクセストークンを生成する必要があります。

## アクセストークンを検証する

アプリやほかのサーバーから受信したアクセストークンをサーバーで使用する場合は、アクセストークンを検証してください。

アクセストークンの検証方法は、『LINEログイン v2.0 APIリファレンス』の「[アクセストークンを検証する](https://developers.line.biz/ja/reference/line-login-v2/#verify-access-token)」を参照してください。

> [!WARNING]
> アクセストークンの検証後、さらに確認が必要です
> LINEログインAPIによるアクセストークンの検証に成功すると、レスポンスには`client_id`プロパティ（チャネルID）と`expires_in`プロパティ（アクセストークンの有効期間）が含まれます。アクセストークンを使用する前に、各プロパティが以下の条件を満たすことを確認してください。
> 
> | プロパティ | 条件 |
> | --- | --- |
> | `client_id` | アプリにリンクされているLINEログインチャネルのチャネルIDと同じ |
> | `expires_in` | 正の値 |
> |  |  |