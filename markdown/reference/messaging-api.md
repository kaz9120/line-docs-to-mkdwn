---
url: https://developers.line.biz/ja/reference/messaging-api/
copied_at: 2025-10-23T15:55:48.252Z
---
# Messaging APIリファレンス

全てを表示

## 共通仕様

Messaging APIにおけるエンドポイントのドメイン名、リクエストが成功・失敗した際のレスポンス、レート制限などの共通仕様です。

*   [ドメイン名](#domain-name)
*   [レート制限](#rate-limits)
*   [ステータスコード](#status-codes)
*   [レスポンスヘッダー](#response-headers)
*   [エラーレスポンス](#error-responses)
*   [その他の共通仕様](#other-common-specifications)

表示

## Webhook

友だち追加やユーザーからのメッセージ送信のようなイベントが発生すると、LINEプラットフォームからWebhook URL（ボットサーバー）にHTTPS POSTリクエストが送信されます。

Webhook URLはチャネルごとに[LINE Developersコンソール](https://developers.line.biz/console/)で設定します。

表示

## Webhookイベントオブジェクト

LINEプラットフォームで生成されるイベントを含むJSONオブジェクトです。

表示

## Webhook設定

チャネルのWebhookエンドポイントを設定、検証、取得します。

エンドポイント一覧

[

```
PUT 
```

](#set-webhook-endpoint-url)[

```
GET 
```

](#get-webhook-endpoint-information)[

```
POST
```

](#test-webhook-endpoint)

表示

## コンテンツ取得

ユーザーがLINE公式アカウントに対して送信したコンテンツを、[Webhook](https://developers.line.biz/ja/reference/messaging-api/#webhooks)で受信したメッセージIDを使うことで取得できます。

エンドポイント一覧

[

```
GET
```

](#get-content)[

```
GET
```

](#verify-video-or-audio-preparation-status)[

```
GET
```

](#get-image-or-video-preview)

表示

## チャネルアクセストークン

アプリからMessaging APIを呼び出す際に必要となるチャネルアクセストークンを発行、取得、取り消しします。詳しくは、『LINEプラットフォームの基礎知識』の「[チャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/)」を参照してください。

エンドポイント一覧

[

```
POST
```

](#issue-channel-access-token-v2-1)[

```
GET 
```

](#verify-channel-access-token-v2-1)[

```
GET 
```

](#get-all-valid-channel-access-token-key-ids-v2-1)[

```
POST
```

](#revoke-channel-access-token-v2-1)[

```
POST
```

](#issue-stateless-channel-access-token)[

```
POST
```

](#issue-shortlived-channel-access-token)[

```
POST
```

](#verify-channel-access-token)[

```
POST
```

](#revoke-longlived-or-shortlived-channel-access-token)

表示

## メッセージ

メッセージを送ったり、送信済みメッセージについての情報を取得したりできます。

エンドポイント一覧

[

```
POST
```

](#send-reply-message)[

```
POST
```

](#send-push-message)[

```
POST
```

](#send-multicast-message)[

```
POST
```

](#send-narrowcast-message)[

```
GET 
```

](#get-narrowcast-progress-status)[

```
POST
```

](#send-broadcast-message)[

```
POST
```

](#display-a-loading-indicator)[

```
GET 
```

](#get-quota)[

```
GET 
```

](#get-consumption)[

```
GET 
```

](#get-number-of-reply-messages)[

```
GET 
```

](#get-number-of-push-messages)[

```
GET 
```

](#get-number-of-multicast-messages)[

```
GET 
```

](#get-number-of-broadcast-messages)[

```
POST
```

](#validate-message-objects-of-reply-message)[

```
POST
```

](#validate-message-objects-of-push-message)[

```
POST
```

](#validate-message-objects-of-multicast-message)[

```
POST
```

](#validate-message-objects-of-narrowcast-message)[

```
POST
```

](#validate-message-objects-of-broadcast-message)

表示

## オーディエンス管理

オーディエンスを作成、更新、有効化、削除できます。オーディエンスは、ナローキャストメッセージを配信する際に指定します。

エンドポイント一覧

[

```
POST  
```

](#create-upload-audience-group)[

```
POST  
```

](#create-upload-audience-group-by-file)[

```
PUT   
```

](#update-upload-audience-group)[

```
PUT   
```

](#update-upload-audience-group-by-file)[

```
POST  
```

](#create-click-audience-group)[

```
POST  
```

](#create-imp-audience-group)[

```
PUT   
```

](#set-description-audience-group)[

```
DELETE
```

](#delete-audience-group)[

```
GET   
```

](#get-audience-group)[

```
GET   
```

](#get-audience-groups)[

```
GET   
```

](#get-shared-audience)[

```
GET   
```

](#get-shared-audience-list)

表示

## 分析

LINE公式アカウントから送信したメッセージの数や友だち数、統計情報などを取得できます。

エンドポイント一覧

[

```
GET
```

](#get-number-of-delivery-messages)[

```
GET
```

](#get-number-of-followers)[

```
GET
```

](#get-demographic)[

```
GET
```

](#get-message-event)[

```
GET
```

](#get-statistics-per-unit)[

```
GET
```

](#get-the-number-of-unit-name-types-assigned-during-this-month)[

```
GET
```

](#get-a-list-of-unit-names-assigned-during-this-month)

表示

## クーポン

LINE公式アカウントからユーザーに送信するクーポンを管理できます。

エンドポイント一覧

[

```
POST
```

](#create-coupon)[

```
PUT 
```

](#discontinue-coupon)[

```
GET 
```

](#get-coupons-list)[

```
GET 
```

](#get-coupon)

表示

## ユーザー

LINE公式アカウントを友だち追加したユーザーの情報を取得できます。

:::note warn
自分のユーザーIDを取得する

:::

エンドポイント一覧

[

```
GET
```

](#get-profile)[

```
GET
```

](#get-follower-ids)

表示

## メンバーシップ

LINE公式アカウントのメンバーシップの情報を取得できます。詳しくは、『Messaging APIドキュメント』の「[メンバーシップ機能を使う](https://developers.line.biz/ja/docs/messaging-api/use-membership-features/)」を参照してください。

エンドポイント一覧

[

```
GET
```

](#get-a-users-membership-subscription-status)[

```
GET
```

](#get-membership-user-ids)[

```
GET
```

](#get-membership-plans)

表示

## ボット

LINE公式アカウントのボットの基本情報を取得できます。

エンドポイント一覧

[

```
GET
```

](#get-bot-info)

表示

## グループトーク

LINE公式アカウントが参加しているグループトークの情報や、グループトークのメンバーの情報を取得できます。

エンドポイント一覧

[

```
GET 
```

](#get-group-summary)[

```
GET 
```

](#get-members-group-count)[

```
GET 
```

](#get-group-member-user-ids)[

```
GET 
```

](#get-group-member-profile)[

```
POST
```

](#leave-group)

表示

## 複数人トーク

LINE公式アカウントが参加している複数人トークの情報や、複数人トークのメンバーの情報を取得できます。

エンドポイント一覧

[

```
GET 
```

](#get-members-room-count)[

```
GET 
```

](#get-room-member-user-ids)[

```
GET 
```

](#get-room-member-profile)[

```
POST
```

](#leave-room)

表示

## リッチメニュー

LINE公式アカウントのトーク画面に表示される、カスタマイズ可能なメニューです。詳しくは、「[リッチメニューを使う](https://developers.line.biz/ja/docs/messaging-api/using-rich-menus/)」を参照してください。

エンドポイント一覧

[

```
POST  
```

](#create-rich-menu)[

```
POST  
```

](#validate-rich-menu-object)[

```
POST  
```

](#upload-rich-menu-image)[

```
GET   
```

](#download-rich-menu-image)[

```
GET   
```

](#get-rich-menu-list)[

```
GET   
```

](#get-rich-menu)[

```
DELETE
```

](#delete-rich-menu)[

```
POST  
```

](#set-default-rich-menu)[

```
GET   
```

](#get-default-rich-menu-id)[

```
DELETE
```

](#clear-default-rich-menu)

表示

## ユーザー単位のリッチメニュー

ユーザーIDとリッチメニューのIDを指定することで、リッチメニューをユーザー単位で設定できます。詳しくは、『Messaging APIドキュメント』の「[ユーザー単位のリッチメニューを使う](https://developers.line.biz/ja/docs/messaging-api/use-per-user-rich-menus/)」を参照してください。

エンドポイント一覧

[

```
POST  
```

](#link-rich-menu-to-user)[

```
POST  
```

](#link-rich-menu-to-users)[

```
GET   
```

](#get-rich-menu-id-of-user)[

```
DELETE
```

](#unlink-rich-menu-from-user)[

```
POST  
```

](#unlink-rich-menu-from-users)[

```
POST  
```

](#batch-control-rich-menus-of-users)[

```
GET   
```

](#get-batch-control-rich-menus-progress-status)[

```
POST  
```

](#validate-batch-control-rich-menus-request)

表示

## リッチメニューエイリアス

[リッチメニューエイリアス](https://developers.line.biz/ja/glossary/#rich-menu-alias)と[リッチメニュー切替アクション](#richmenu-switch-action)を使うことで、タブ切り替えが可能なリッチメニューをユーザーに提供できます。詳しくは、『Messaging APIドキュメント』の「[リッチメニューでタブ切り替えを行う](https://developers.line.biz/ja/docs/messaging-api/switch-rich-menus/)」を参照してください。

エンドポイント一覧

[

```
POST  
```

](#create-rich-menu-alias)[

```
DELETE
```

](#delete-rich-menu-alias)[

```
POST  
```

](#update-rich-menu-alias)[

```
GET   
```

](#get-rich-menu-alias-by-id)[

```
GET   
```

](#get-rich-menu-alias-list)

表示

## アカウント連携

プロバイダー（企業や開発者）が提供するサービスのアカウントと、LINEユーザーのアカウントを連携できます。

エンドポイント一覧

[

```
POST
```

](#issue-link-token)

表示

## メッセージオブジェクト

送信するメッセージの内容を表すJSONオブジェクトです。

:::note info
メッセージオブジェクトが有効かを検証する

:::

表示

## アクションオブジェクト

ユーザーがメッセージ内のボタンまたは画像をタップしたときに、ボットが実行できるアクションのタイプです。

*   [ポストバックアクション](#postback-action)
*   [メッセージアクション](#message-action)
*   [URIアクション](#uri-action)
*   [日時選択アクション](#datetime-picker-action)
*   [カメラアクション](#camera-action)
*   [カメラロールアクション](#camera-roll-action)
*   [位置情報アクション](#location-action)
*   [リッチメニュー切替アクション](#richmenu-switch-action)
*   [クリップボードアクション](#clipboard-action)

表示

## リッチメニューの構造

リッチメニューは以下のどちらかのオブジェクトで表されます。

*   リッチメニューIDを含まない[リッチメニューオブジェクト](#rich-menu-object)。[リッチメニューの作成時](#create-rich-menu)にこのオブジェクトを使用します。
*   リッチメニューIDを含む[リッチメニューレスポンスオブジェクト](#rich-menu-response-object)。[リッチメニューの取得時](#get-rich-menu)または[リッチメニューの配列の取得時](#get-rich-menu-list)にこのオブジェクトが返されます。

これらのオブジェクトは[領域オブジェクト](#area-object)と[アクションオブジェクト](#action-objects)から構成されます。

表示