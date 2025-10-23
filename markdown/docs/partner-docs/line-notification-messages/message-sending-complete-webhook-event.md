---
url: https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/message-sending-complete-webhook-event/
copied_at: 2025-10-23T16:02:36.508Z
---
# Webhookの配信完了イベント

:::note warn
オプション機能を利用するには手続きが必要です

:::

## Webhookの配信完了イベントの概要

LINE通知メッセージAPIをリクエストし、ユーザーに対してLINE通知メッセージの配信が完了した際に、専用のWebhookイベント（配信完了イベント）がLINEプラットフォームからボットサーバーのWebhook URLに送信されます。

*   [Webhookの配信完了イベントの仕様](#receive-delivery-event)
*   [Webhookの配信完了イベントに関する補足事項](#we-cant-receive-a-delivery-webhook-event)

### Webhookの配信完了イベントの仕様

| プロパティ名 | タイプ | 説明 |
| --- | --- | --- |
| type | String | `delivery` |
| mode | Object | 「[共通プロパティ](https://developers.line.biz/ja/reference/messaging-api/#common-properties)」を参照してください。 |
| timestamp | Number | 「[共通プロパティ](https://developers.line.biz/ja/reference/messaging-api/#common-properties)」を参照してください。 |
| webhookEventId | String | 「[共通プロパティ](https://developers.line.biz/ja/reference/messaging-api/#common-properties)」を参照してください。 |
| deliveryContext | Object | 「[共通プロパティ](https://developers.line.biz/ja/reference/messaging-api/#common-properties)」を参照してください。 |
| delivery | Object | ハッシュ化した電話番号の文字列もしくは、[`X-Line-Delivery-Tag`](https://developers.line.biz/ja/reference/line-notification-messages/#send-line-notification-message-template-request-headers)で指定した文字列を含むデリバリーオブジェクト |
| delivery.data | String | ハッシュ化した電話番号の文字列もしくは、[`X-Line-Delivery-Tag`](https://developers.line.biz/ja/reference/line-notification-messages/#send-line-notification-message-template-request-headers)で指定した文字列 |

_Webhookイベントの例_

:::note warn
Webhookの配信完了イベントの示す状態について

:::

:::note warn
Webhookイベントの署名検証

:::

## Webhookの配信完了イベントに関する補足事項

LINE通知メッセージAPIをリクエストし、HTTPステータスコード`200`でレスポンスが行われた場合でも、ユーザーの[LINE通知メッセージの受信設定](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/technical-specs/#how-to-consent-for-line-notification-messages)やSMS認証の状況によっては、LINE通知メッセージがユーザーに配信されなかったり、LINE通知メッセージの送信が保留されたりする場合があります。

LINE通知メッセージAPIをリクエストし、HTTPステータスコード`200`でレスポンスが行われてから24時間以内に[Webhookの配信完了イベント](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/message-sending-complete-webhook-event/)を受信しなかった場合は、以下のいずれかの理由により、LINE通知メッセージがユーザーに配信されなかったことを意味します。

*   [ユーザーがLINE公式アカウントをブロックしている](#user-blocked-your-account)
*   [ユーザーが必要な同意や認証を行わなかった](#user-didnt-action-taken)

### ユーザーがLINE公式アカウントをブロックしている

ユーザーがLINE通知メッセージ送信元のLINE公式アカウントをブロックしている場合でも、[LINE通知メッセージAPIのリクエスト](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/technical-specs/#about-pnp-api-block-response)は、HTTPステータスコード`200`でレスポンスされます。

### ユーザーが必要な同意や認証を行わなかった

LINE通知メッセージの受信設定が未設定であったり、SMS認証が必要な状況であるが、それらの設定や操作を行わなかった可能性があります。詳しくは[LINE通知メッセージAPIのリクエストが成功したがメッセージが配信されない場合について](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/technical-specs/#why-i-cant-receive-line-notification-messages)を参照してください。

html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}