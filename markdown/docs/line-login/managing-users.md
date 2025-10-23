---
url: https://developers.line.biz/ja/docs/line-login/managing-users/
copied_at: 2025-10-23T15:58:38.314Z
---
# ユーザーを管理する

LINEログインしたユーザーを管理する方法を説明します。

## ユーザープロフィールを取得する

[アクセストークン](https://developers.line.biz/ja/docs/line-login/managing-access-tokens/)で特定されるユーザーのプロフィール情報を取得できます。プロフィール情報には、ユーザーID、表示名、プロフィール画像、およびステータスメッセージが含まれます。

:::note warn
アクセストークンのスコープを確認してください

:::

リクエストの例：

sh

`curl -v -X GET https://api.line.me/v2/profile \ -H 'Authorization: Bearer {access token}'`

レスポンスの例：

json

`{   "userId":"U4af4980629...",  "displayName":"Brown",  "pictureUrl":"https://profile.line-scdn.net/abcdefghijklmn",  "statusMessage":"Hello, LINE!" }`

詳しくは、『LINEログイン v2.1 APIリファレンス』の「[ユーザープロフィールを取得する](https://developers.line.biz/ja/reference/line-login/#get-user-profile)」を参照してください。

:::note info
サービスでユーザーを識別するには

:::

:::note info
IDトークンを使ってユーザーを識別する

:::

## ユーザーをログアウトする

より良いユーザー体験のために、ユーザーがアプリからログアウトする操作を提供することをお勧めします。

ユーザーがアプリからログアウトする操作を行ったときに、ユーザーの[アクセストークン](https://developers.line.biz/ja/docs/line-login/managing-access-tokens/)を取り消し、アプリ内のすべてのユーザーデータを削除してください。

アクセストークンを取り消すリクエストの例：

sh

`curl -v -X POST 'https://api.line.me/oauth2/v2.1/revoke' \ -H "Content-Type:application/x-www-form-urlencoded" \ -d "client_id={channel id}&client_secret={channel secret}&access_token={access token}"`

詳しくは、『LINEログイン v2.1 APIリファレンス』の「[アクセストークンを取り消す](https://developers.line.biz/ja/reference/line-login/#revoke-access-token)」を参照してください。

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}