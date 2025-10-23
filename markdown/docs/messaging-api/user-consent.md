---
url: https://developers.line.biz/ja/docs/messaging-api/user-consent/
copied_at: 2025-10-23T15:57:47.263Z
---
# ユーザーのプロフィール情報取得の同意

[LINE公式アカウント](https://developers.line.biz/ja/glossary/#line-official-account)がユーザーの[プロフィール情報](https://developers.line.biz/ja/glossary/#profile-information)を取得するには、ユーザーがプロフィール情報の取得に同意している必要があります。

## iOS版LINEまたはAndroid版LINEを使用しているユーザーの場合

iOS版LINEまたはAndroid版LINEを使用しているユーザーは、LINEの利用開始時にプロフィール情報の取得に同意しています。たとえば以下のようなユーザーが該当します。

*   iOS版LINEまたはAndroid版LINEでLINEアカウントを作成して、使用している
*   もともとPC版LINEでLINEアカウントを作成したが、そのアカウントでiOS版LINEまたはAndroid版LINEも使用している

## iOS版LINEまたはAndroid版LINEを使用していないユーザーの場合

iOS版LINEまたはAndroid版LINEを使用していないユーザーは、プロフィール情報の取得に同意することができません。たとえば、過去にPC版LINEでLINEアカウントを作成し、以降もPC版LINEだけを使用しているユーザーが該当します。なお、このようなユーザーもLINE公式アカウントを友だち追加したり、トークに招待したりできます。

:::note warn
注意

:::

なおユーザーがプロフィール情報の取得に同意していない場合、以下のWebhookイベントオブジェクトや、エンドポイントからのレスポンスに、そのユーザーのプロフィール情報は含まれません。また、Webhookの[メンバーシップイベント](https://developers.line.biz/ja/reference/messaging-api/#membership-event)は送信されません。

*   [Webhookイベントオブジェクト](https://developers.line.biz/ja/reference/messaging-api/#webhook-event-objects)の[送信元ユーザー](https://developers.line.biz/ja/reference/messaging-api/#source-user)
*   [テキストメッセージオブジェクト](https://developers.line.biz/ja/reference/messaging-api/#wh-text)の`mention`オブジェクト
*   [LINE公式アカウントを友だち追加したユーザーのリストを取得する](https://developers.line.biz/ja/reference/messaging-api/#get-follower-ids)エンドポイント
*   [メンバーシップに加入しているユーザーの一覧を取得する](https://developers.line.biz/ja/reference/messaging-api/#get-membership-user-ids)エンドポイント
*   [グループトークのメンバーのユーザーIDを取得する](https://developers.line.biz/ja/reference/messaging-api/#get-group-member-user-ids)エンドポイント
*   [複数人トークのメンバーのユーザーIDを取得する](https://developers.line.biz/ja/reference/messaging-api/#get-room-member-user-ids)エンドポイント

:::note info
ユーザーのプロフィール情報が取得できない

:::