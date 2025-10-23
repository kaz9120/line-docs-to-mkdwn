---
url: https://developers.line.biz/ja/docs/line-login/managing-users-v2/
copied_at: 2025-10-23T15:58:53.245Z
---
# ユーザーを管理する（LINEログイン v2.0）

:::note alert
LINEログイン v2.0は非推奨です

:::

ここでは、[LINEログイン v2.0](https://developers.line.biz/ja/docs/line-login/overview/#versions)のエンドポイントを使って、LINEログインしたユーザーを管理する方法を説明します。

## ユーザープロフィールを取得する

[アクセストークン](https://developers.line.biz/ja/docs/line-login/managing-access-tokens/)で特定されるユーザーのプロフィール情報を取得できます。プロフィール情報には、ユーザーID、表示名、プロフィール画像、およびステータスメッセージが含まれます。

ユーザープロフィールの取得方法は、LINEログイン v2.0とLINEログイン v2.1で共通です。詳しくは、「[ユーザープロフィールを取得する](https://developers.line.biz/ja/docs/line-login/managing-users/#get-profile)」を参照してください。

## ユーザーをログアウトする

:::note warn
注意

:::

より良いユーザー体験のために、ユーザーがアプリからログアウトする操作を提供することをお勧めします。

ユーザーがアプリからログアウトする操作を行ったときに、ユーザーの[アクセストークン](https://developers.line.biz/ja/docs/line-login/managing-access-tokens/)を取り消し、アプリ内のすべてのユーザーデータを削除してください。

アクセストークンを取り消すリクエストの例：

sh

`curl -v -X POST https://api.line.me/v2/oauth/revoke \ -H 'Content-Type: application/x-www-form-urlencoded' \ --data-urlencode 'refresh_token={refresh token}'`

詳しくは、『LINEログイン v2.0 APIリファレンス』の「[アクセストークンを取り消す](https://developers.line.biz/ja/reference/line-login-v2/#revoke-access-token)」を参照してください。

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}