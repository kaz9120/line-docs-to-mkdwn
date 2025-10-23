---
url: https://developers.line.biz/ja/docs/messaging-api/getting-user-ids/
copied_at: 2025-10-23T15:56:09.715Z
---
# ユーザーIDを取得する

Messaging APIで特定のユーザーに対してメッセージを送信するには、ユーザーIDでユーザーを指定する必要があります。このページでは、ユーザーIDの取得方法について解説します。

*   [ユーザーIDとは](#what-is-user-id)
    *   [ユーザーIDが発行される単位](#user-id-issuance-unit)
*   [ユーザーIDを取得する](#getting-user-ids)
    *   [開発者が自分自身のユーザーIDを取得する](#get-own-user-id)
    *   [WebhookからユーザーIDを取得する](#get-user-ids-in-webhook)
    *   [友だち全員のユーザーIDを取得する](#get-all-friends-user-ids)
    *   [グループトークや複数人トークのメンバーのユーザーIDを取得する](#get-member-user-ids)
*   [ユーザーIDが有効かを確認する](#checking-user-id-is-valid)

## ユーザーIDとは

ユーザーIDとは、ユーザーの一意な識別子です。ユーザーIDは、LINEで登録されているユーザーの表示名や、LINEでの友だち検索に利用するLINE IDとは異なります。ユーザーIDはLINEプラットフォームが発行する値で、`U8189cf6745fc0d808977bdb0b9f22995`のように、`U[0-9a-f]{32}`の正規表現にマッチする文字列です。

![](https://developers.line.biz/media/messaging-api/getting-user-ids/display-name-and-id-and-user-id-ja.png)

### ユーザーIDが発行される単位

ユーザーIDは、同じユーザーであってもプロバイダーごとに異なる値が発行されます。プロバイダーが同じであれば、チャネルの種類（LINEログインチャネルやMessaging APIチャネル）にかかわらず、同じユーザーIDが割り当てられます。

たとえば同じプロバイダーの配下に、Messaging APIチャネルと、LINEログインチャネルがあった場合、それぞれのチャネルで取得したAさんのユーザーIDは同一の値です。しかし、AさんのユーザーIDを異なるプロバイダーの配下にあるチャネルで取得した場合、AさんのユーザーIDはそれぞれのプロバイダーごとに異なる値となります。

![](https://developers.line.biz/media/messaging-api/getting-user-ids/user-id-for-each-provider-ja.png)

## ユーザーIDを取得する

ユーザーIDを取得する方法は4つあります。

1.  [開発者が自分自身のユーザーIDを取得する](#get-own-user-id)
2.  [WebhookからユーザーIDを取得する](#get-user-ids-in-webhook)
3.  [友だち全員のユーザーIDを取得する](#get-all-friends-user-ids)
4.  [グループトークや複数人トークのメンバーのユーザーIDを取得する](#get-member-user-ids)

### 開発者が自分自身のユーザーIDを取得する

開発者は自分自身のユーザーIDを[LINE Developersコンソール](https://developers.line.biz/console/)のチャネルの［**チャネル基本設定**］タブにある［**あなたのユーザーID**］で確認できます。詳しくは、『LINE Developersコンソールドキュメント』の「[チャネルの権限](https://developers.line.biz/ja/docs/line-developers-console/managing-roles/#roles-for-channel)」を参照してください。開発者が自分自身のユーザーIDを取得するためのAPIはありません。

### WebhookからユーザーIDを取得する

ユーザーが、LINE公式アカウントを友だち追加したり、LINE公式アカウントにメッセージを送ったりすると、[LINE Developersコンソール](https://developers.line.biz/console/)の［**Webhook URL**］で指定したURL（ボットサーバー）に対して、LINEプラットフォームからWebhookが送られます。ユーザーIDは、このWebhookに含まれています。

以下は、LINE公式アカウントを友だち追加したときに送られる[Webhookイベントオブジェクト](https://developers.line.biz/ja/reference/messaging-api/#webhook-event-objects)の例です。

json

`{   "destination": "xxxxxxxxxx",  "events": [    {      "type": "follow",      "timestamp": 1462629479859,      "source": {        // ユーザーIDはsourceオブジェクトのuserIdプロパティから取得できる        "type": "user",        "userId": "U8189cf6745fc0d808977bdb0b9f22995"      },      "replyToken": "nHuyWiB7yP5Zw52FIkcQobQuGDXCTA",      "mode": "active",      "webhookEventId": "01FZ74A0TDDPYRVKNK77XKC3ZR",      "deliveryContext": {        "isRedelivery": false      }    }  ] }`

ただし、ユーザーがプロフィール情報の取得に同意していない場合、WebhookにユーザーIDは含まれません。詳しくは、「[ユーザーのプロフィール情報取得の同意](https://developers.line.biz/ja/docs/messaging-api/user-consent/)」を参照してください。

### 友だち全員のユーザーIDを取得する

LINE公式アカウントと友だちになっているユーザー全員のユーザーIDは、[LINE公式アカウントを友だち追加したユーザーのリストを取得する](https://developers.line.biz/ja/reference/messaging-api/#get-follower-ids)エンドポイントで取得できます。

:::note warn
注意

:::

### グループトークや複数人トークのメンバーのユーザーIDを取得する

LINE公式アカウントが参加しているグループトークや複数人トークのメンバーのユーザーIDは、以下のエンドポイントで取得できます。

*   [グループトークのメンバーのユーザーIDを取得する](https://developers.line.biz/ja/reference/messaging-api/#get-group-member-user-ids)
*   [複数人トークのメンバーのユーザーIDを取得する](https://developers.line.biz/ja/reference/messaging-api/#get-room-member-user-ids)

:::note warn
注意

:::

## ユーザーIDが有効かを確認する

ユーザーIDを知っていても、そのユーザーIDが無効な場合はメッセージを送信できません。

ユーザーIDが有効かを確認するには、[プロフィール情報を取得する](https://developers.line.biz/ja/reference/messaging-api/#get-profile)エンドポイントを使用してください。ユーザーIDが有効な場合は、HTTPステータスコード`200`が返ります。`200`以外が返ってきた場合、そのユーザーIDは無効のため、メッセージは送信できません。

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}