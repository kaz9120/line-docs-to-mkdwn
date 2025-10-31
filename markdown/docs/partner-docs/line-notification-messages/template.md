---
url: https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/template/
copied_at: 2025-10-24T10:17:19.900Z
---
# LINE通知メッセージ（テンプレート）

> [!WARNING]
> オプション機能を利用するには手続きが必要です
> 本ドキュメントに記載の機能は、所定の申請等を行った法人ユーザーのみがご利用いただけます。自社のLINE公式アカウントでご利用になりたいお客様は、担当営業までご連絡いただくか、[弊社パートナー](https://www.lycbiz.com/jp/partner/sales/)にお問い合わせください。

*   [LINE通知メッセージ（テンプレート）とは](#line-notification-messages-template-overview)
*   [テンプレート](#templates)
*   [アイテム](#items)
*   [ボタン](#buttons)

## LINE通知メッセージ（テンプレート）とは

LINE通知メッセージ（テンプレート）は、用意されたテンプレートやアイテムを組み合わせてメッセージを作成し、ユーザーの電話番号を指定して送信できる機能です。ユーザーがLINE公式アカウントを友だち追加していなくても、LINE公式アカウントからメッセージを送信できます。

LINE通知メッセージ（テンプレート）は日本、タイ、台湾のLINE公式アカウントでのみ利用できます。

[テンプレート](#templates)を選んだら、[アイテム](#items)と[ボタン](#buttons)を組み合わせ、それぞれに任意のテキストやURLを指定したJSONを作成し、「[LINE通知メッセージ（テンプレート）を送る](https://developers.line.biz/ja/reference/line-notification-messages/#send-line-notification-message-template)」エンドポイントを使うことで、LINE通知メッセージ（テンプレート）を送信できます。

使用できるテンプレート、アイテム、およびボタンの種類は日本、タイ、台湾ごとに異なり、送信元のLINE公式アカウントによって自動で決まります。メッセージのヘッダーとフッターは変更できません。

![LINE通知メッセージ（テンプレート）のサンプル](https://developers.line.biz/media/line-notification-message/notification-messages-template.png)

たとえば上記のメッセージは、次のようなJSONを作成することで送信できます。

```json
{
  "to": "{hashed_phone_number}",
  "templateKey": "shipment_completed_ja",
  "body": {
    "emphasizedItem": {
      "itemKey": "date_002_ja",
      "content": "2024年8月10日(土)"
    },
    "items": [
      {
        "itemKey": "time_range_001_ja",
        "content": "午前中"
      },
      {
        "itemKey": "number_001_ja",
        "content": "1234567"
      },
      {
        "itemKey": "price_001_ja",
        "content": "12,000円"
      },
      {
        "itemKey": "name_010_ja",
        "content": "スープセット（冷凍）"
      }
    ],
    "buttons": [
      {
        "buttonKey": "check_delivery_status_ja",
        "url": "https://example.com/CheckDeliveryStatus/"
      },
      {
        "buttonKey": "Check_Contact",
        "url": "https://example.com/ContactUs/"
      }
    ]
  }
}
```

送信したLINE通知メッセージ（テンプレート）の数は、LINE Developersコンソールにログインして、［**統計情報**］タブの［**電話番号を利用した送信メッセージ**］から確認できます。詳しくは、「[送信済みLINE通知メッセージの数を取得する](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/technical-specs/#get-number-of-sent-line-notification-messages)」を参照してください。

## テンプレート

テンプレートのキー（`Key`）を指定してLINE通知メッセージ（テンプレート）を送ることで、対象テンプレートのタイトル（`Title`）と概要（`Description`）がメッセージ上部に表示されます。

![](https://developers.line.biz/media/line-notification-message/notification-messages-template-templates.png)

*   [日本](#)
*   [台湾](#)
*   [タイ](#)

91件中 1〜10件目を表示

*   [Next](#)

|  | Key | Name | Title | Description |
| --- | --- | --- | --- | --- |
|  | 
[`order_item_completion_ja`](#)

 | 注文商品完成通知 | ご注文商品完成のお知らせ | 商品が完成いたしましたので、お知らせいたします。 |
|  | 

[`service_cancellationl_ja`](#)

 | 欠便通知 | 欠便のお知らせ | ご予約いただいた便の欠便をお知らせいたします。 |
|  | 

[`boarding_time_change_ja`](#)

 | 搭乗時間変更通知 | 搭乗時間変更のお知らせ | ご予約いただいた便の搭乗時間の変更をお知らせいたします。 |
|  | 

[`ride_time_change_ja`](#)

 | 乗車時間変更通知 | 乗車時間変更のお知らせ | ご予約いただいた便の乗車時間の変更をお知らせいたします。 |
|  | 

[`boarding_location_change_ja`](#)

 | 搭乗場所変更通知 | 搭乗場所変更のお知らせ | ご予約いただいた便の搭乗場所の変更をお知らせいたします。 |
|  | 

[`ride_location_change_ja`](#)

 | 乗車場所変更通知 | 乗車場所変更のお知らせ | ご予約いただいた便の乗車場所の変更をお知らせいたします。 |
|  | 

[`ride_reservation_reminder_previous_day_ja`](#)

 | 予約-前日リマインド通知（乗車） | ご乗車前日のお知らせ | 明日のご乗車の便について、お知らせいたします。 |
|  | 

[`ride_reservation_reminder_ja`](#)

 | 予約-リマインド通知（乗車） | ご乗車予約のリマインド | ご乗車が近づいてまいりましたので、ご案内いたします。 |
|  | 

[`boarding_reservation_reminder_previous_day_ja`](#)

 | 予約-前日リマインド通知（搭乗） | ご搭乗前日のお知らせ | 明日のご搭乗の便について、お知らせいたします。 |
|  | 

[`boarding_reservation_reminder_ja`](#)

 | 予約-リマインド通知（搭乗） | ご搭乗予約のリマインド | ご搭乗が近づいてまいりましたので、ご案内いたします。 |

*   [1](#)
*   [2](#)
*   [3](#)

*   [10](#)
*   [Next](#)

## アイテム

アイテムのキー（`Key`）を指定することで、テンプレート内に複数のアイテムを含めることができます。アイテムには、値として任意の文字列を設定できます。

![](https://developers.line.biz/media/line-notification-message/notification-messages-template-items.png)

*   [日本](#)
*   [台湾](#)
*   [タイ](#)

204件中 1〜10件目を表示

*   [Next](#)

|  | Key | Text |
| --- | --- | --- |
|  | 
[`name_013_ja`](#)

 | 受取店舗名 |
|  | 

[`name_014_ja`](#)

 | 受付店舗名 |
|  | 

[`name_015_ja`](#)

 | 利用店舗名 |
|  | 

[`name_016_ja`](#)

 | 講座名 |
|  | 

[`name_017_ja`](#)

 | 修理品名 |
|  | 

[`name_018_ja`](#)

 | 加盟店名 |
|  | 

[`name_019_ja`](#)

 | ご利用カード名 |
|  | 

[`name_020_ja`](#)

 | 書類名 |
|  | 

[`name_021_ja`](#)

 | 発送書類名 |
|  | 

[`name_022_ja`](#)

 | 配送担当店名 |

*   [1](#)
*   [2](#)
*   [3](#)

*   [21](#)
*   [Next](#)

## ボタン

ボタンのキー（`Key`）を指定することで、テンプレート内に複数のボタンを含めることができます。ボタンの遷移先として任意のURLを設定できます。

![](https://developers.line.biz/media/line-notification-message/notification-messages-template-buttons.png)

*   [日本](#)
*   [台湾](#)
*   [タイ](#)

8件中 1〜8件目を表示

|  | Key | Text |
| --- | --- | --- |
|  | 
[`check_details_ja`](#)

 | 詳細を確認する |
|  | 

[`check_delivery_status_ja`](#)

 | 配達状況を確認する |
|  | 

[`change_delivery_datetime_ja`](#)

 | 配達日時を変更する |
|  | 

[`contact_ja`](#)

 | お問い合わせ |
|  | 

[`check_how_to_update_ja`](#)

 | 更新方法を確認する |
|  | 

[`check_purchase_history_ja`](#)

 | 購入履歴を確認する |
|  | 

[`check_order_history_ja`](#)

 | 注文履歴を確認する |
|  | 

[`check_shop_location`](#)

 | お店の場所はこちら |

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}