---
url: https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/overview/
copied_at: 2025-10-23T16:02:30.505Z
---
# LINE通知メッセージの概要

:::note warn
オプション機能を利用するには手続きが必要です

:::

## LINE通知メッセージとは

LINE通知メッセージは、電話番号を指定することでユーザーにメッセージを送信できるサービスです。ユーザーがLINE公式アカウントを友だち追加していなくても、LINE公式アカウントからメッセージを送信できます。

LINE通知メッセージは日本、タイ、台湾のLINE公式アカウントでのみ利用できます。

LINE通知メッセージには、用意されたテンプレートやアイテムを組み合わせて簡単にメッセージを作成できる[LINE通知メッセージ（テンプレート）](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/template/)と、事前にUX審査を要する[LINE通知メッセージ（フレキシブル）](https://developers.line.biz/ja/reference/line-notification-messages/#flexible)の2種類があり、それぞれ使用するAPIが異なります。

以下は、LINE通知メッセージ（テンプレート）のサンプルです。

![LINE通知メッセージ（テンプレート）のサンプル](https://developers.line.biz/media/line-notification-message/line-notification-messages-sample-ja.png)

詳しくは、[LINE通知メッセージAPIの技術仕様](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/technical-specs/)や、[LINE通知メッセージAPIリファレンス](https://developers.line.biz/ja/reference/line-notification-messages/)を参照してください。

:::note info
LINE通知メッセージの利用用途について

:::

## LINE通知メッセージ以外のメッセージとの見た目の差異

LINE通知メッセージは、通常のメッセージと区別できるように、LINE公式アカウントのアイコンの右側に「重要なお知らせ」と表示されます。対象バージョンは、iOS版LINE、Android版LINE、iPad版LINEのバージョン15.9.0以降です。

![LINE通知メッセージはアイコンの右側に「重要なお知らせ」と表示される](https://developers.line.biz/media/line-notification-message/notification-messages-important-ja.jpg)

なおLINE通知メッセージを受信したLINEアプリの言語設定によって、表示されるテキストは異なります。

| LINEアプリの言語設定 | 表示されるテキスト |
| --- | --- |
| 日本語 | `重要なお知らせ` |
| タイ語 | `การแจ้งเตือนสำคัญ` |
| 中国語（簡体字・繁体字） | `重要通知` |
| その他 | `Important notification` |

LINEアプリの言語設定について詳しくは、ヘルプセンターの「[LINEアプリの言語設定を変更できますか？](https://help.line.me/line/?contentId=20007465&lang=ja)」を参照してください。

## 関連ページ

*   [LINE通知メッセージAPIの技術仕様](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/technical-specs/)
*   [LINE通知メッセージAPIリファレンス](https://developers.line.biz/ja/reference/line-notification-messages/)
*   [Webhookの配信完了イベント](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/message-sending-complete-webhook-event/)
*   [LINE通知メッセージ受信時のフロー](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/flow-when-receiving-message/)