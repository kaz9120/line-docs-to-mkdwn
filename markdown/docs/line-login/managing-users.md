---
url: https://developers.line.biz/ja/docs/line-login/managing-users/
copied_at: 2025-10-24T06:28:41.425Z
---
# ユーザーを管理する

LINEログインしたユーザーを管理する方法を説明します。

## ユーザープロフィールを取得する

[アクセストークン](https://developers.line.biz/ja/docs/line-login/managing-access-tokens/)で特定されるユーザーのプロフィール情報を取得できます。プロフィール情報には、ユーザーID、表示名、プロフィール画像、およびステータスメッセージが含まれます。

> [!WARNING]
> アクセストークンのスコープを確認してください
> ユーザーのプロフィール情報を取得するには、`profile`のスコープを持つアクセストークンが必要です。詳しくは、「[認可を要求する](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#making-an-authorization-request)」と「[スコープ](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#scopes)」を参照してください。

リクエストの例：

sh

`curl -v -X GET https://api.line.me/v2/profile \ -H 'Authorization: Bearer {access token}'`

レスポンスの例：

json

`{   "userId":"U4af4980629...",  "displayName":"Brown",  "pictureUrl":"https://profile.line-scdn.net/abcdefghijklmn",  "statusMessage":"Hello, LINE!" }`

詳しくは、『LINEログイン v2.1 APIリファレンス』の「[ユーザープロフィールを取得する](https://developers.line.biz/ja/reference/line-login/#get-user-profile)」を参照してください。

> [!TIP]
> サービスでユーザーを識別するには
> ユーザーを識別するには、ユーザーが変更できない[ユーザーID](https://developers.line.biz/ja/glossary/#user-id)を使用してください。
> 
> ユーザーは、LINEに設定した表示名、プロフィール画像、およびステータスメッセージをいつでも変更できます。 これらの情報はユーザーを識別する目的では、利用できません。

> [!TIP]
> IDトークンを使ってユーザーを識別する
> アクセストークンと一緒に取得したIDトークンを使って、ユーザーのプロフィール情報とメールアドレスを取得できます。 詳しくは、『LINEログイン v2.1 APIリファレンス』の「[IDトークンを検証する](https://developers.line.biz/ja/reference/line-login/#verify-id-token)」を参照してください。

## ユーザーをログアウトする

より良いユーザー体験のために、ユーザーがアプリからログアウトする操作を提供することをお勧めします。

ユーザーがアプリからログアウトする操作を行ったときに、ユーザーの[アクセストークン](https://developers.line.biz/ja/docs/line-login/managing-access-tokens/)を取り消し、アプリ内のすべてのユーザーデータを削除してください。

アクセストークンを取り消すリクエストの例：

sh

`curl -v -X POST 'https://api.line.me/oauth2/v2.1/revoke' \ -H "Content-Type:application/x-www-form-urlencoded" \ -d "client_id={channel id}&client_secret={channel secret}&access_token={access token}"`

詳しくは、『LINEログイン v2.1 APIリファレンス』の「[アクセストークンを取り消す](https://developers.line.biz/ja/reference/line-login/#revoke-access-token)」を参照してください。

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}