---
url: https://developers.line.biz/ja/docs/messaging-api/use-membership-features/
copied_at: 2025-10-23T15:56:34.793Z
---
# メンバーシップ機能を使う

[メンバーシップ](https://www.lycbiz.com/jp/service/line-official-account/Membership/)とは、LINE公式アカウント上で利用できる月額課金制の会員機能です。ユーザーはLINE公式アカウントのメンバーシッププランに加入することで、メンバー限定の特典が受けられます。

## メンバーシップの情報を取得するエンドポイント

Messaging APIでは、以下のエンドポイントでメンバーシップの情報を取得できます。

*   [ユーザーのメンバーシップ加入状況を取得する](#get-a-users-membership-subscription-status)
*   [メンバーシップに加入しているユーザーの一覧を取得する](#get-membership-user-ids)
*   [提供中のメンバーシッププランを取得する](#get-membership-plans)

:::note info
メンバーシップをはじめるには

:::

### ユーザーのメンバーシップ加入状況を取得する

このエンドポイントでは、ユーザーのIDを指定して、そのユーザーが加入しているメンバーシップの情報を取得できます。詳しくは、『Messaging APIリファレンス』の「[ユーザーのメンバーシップ加入状況を取得する](https://developers.line.biz/ja/reference/messaging-api/#get-a-users-membership-subscription-status)」を参照してください。

### メンバーシップに加入しているユーザーの一覧を取得する

このエンドポイントでは、LINE公式アカウントのメンバーシップに加入しているユーザーのユーザーIDの一覧を取得できます。詳しくは、『Messaging APIリファレンス』の「[メンバーシップに加入しているユーザーの一覧を取得する](https://developers.line.biz/ja/reference/messaging-api/#get-membership-user-ids)」を参照してください。

### 提供中のメンバーシッププランを取得する

このエンドポイントでは、対象のLINE公式アカウントで提供中のメンバーシッププランを取得できます。詳しくは、『Messaging APIリファレンス』の「[提供中のメンバーシッププランを取得する](https://developers.line.biz/ja/reference/messaging-api/#get-membership-plans)」を参照してください。

## Webhookのメンバーシップイベント

ユーザーがLINE公式アカウントのメンバーシップに加入や継続課金、またはメンバーシップを退会した際に、Webhookのメンバーシップイベントが送信されます。詳しくは、『Messaging APIリファレンス』の「[メンバーシップイベント](https://developers.line.biz/ja/reference/messaging-api/#membership-event)」を参照してください。