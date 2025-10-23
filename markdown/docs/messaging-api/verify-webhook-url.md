---
url: https://developers.line.biz/ja/docs/messaging-api/verify-webhook-url/
copied_at: 2025-10-23T15:56:54.062Z
---
# Webhook URLを検証する

Messaging APIのWebhookを利用する場合、LINEプラットフォームからWebhook URL（ボットサーバー）へ疎通できることを、以下のいずれかの方法で検証してください。

*   [検証方法1. Webhook URL検証用のエンドポイントで検証する](#verify-method-01)
*   [検証方法2. LINE DevelopersコンソールからWebhook URLの［検証］ボタンで検証する](#verify-method-02)

:::note info
疎通確認のリクエストにはステータスコード200を返してください

:::

Webhook URLを検証した結果、ボットサーバーがWebhookを受信できていない場合は、[Webhookの受信に失敗する原因を調査](#investigate-webhook-reception-failure)してください。

## 検証方法1. Webhook URL検証用のエンドポイントで検証する

Webhook URL検証用のエンドポイントで検証してください。

*   [Webhookエンドポイントを検証する](https://developers.line.biz/ja/reference/messaging-api/#test-webhook-endpoint)

## 検証方法2. LINE DevelopersコンソールからWebhook URLの［検証］ボタンで検証する

[LINE Developersコンソール](https://developers.line.biz/console/)からWebhook URLの［**検証**］ボタンで検証してください。

![send target](https://developers.line.biz/media/news/webhook-url.png)

## Webhookの受信に失敗する原因を調査する

Webhook URLを検証した結果、ボットサーバーがWebhookを受信できていない場合は、以下の方法で原因を調査してください。

*   Webhook URL検証用のエンドポイントから返ってきた[レスポンス](https://developers.line.biz/ja/reference/messaging-api/#test-webhook-endpoint-response)や[エラーレスポンス](https://developers.line.biz/ja/reference/messaging-api/#test-webhook-endpoint-error-response)を確認する
*   [Webhookのエラーの原因と統計情報を確認する](https://developers.line.biz/ja/docs/messaging-api/check-webhook-error-statistics/)
*   [Webhook送信元のSSL/TLS仕様](https://developers.line.biz/ja/docs/messaging-api/ssl-tls-spec-of-the-webhook-source/)を確認する

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}