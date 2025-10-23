---
url: https://developers.line.biz/ja/reference/line-notification-messages/
copied_at: 2025-10-23T16:02:07.546Z
---
# LINE通知メッセージAPIリファレンス

:::note warn
オプション機能を利用するには手続きが必要です

:::

*   [共通仕様](#line-notification-messages-common-specifications)
    *   [ステータスコード](#line-notification-messages-status-codes)
    *   [レスポンスヘッダー](#line-notification-messages-response-headers)
*   [LINE通知メッセージ（テンプレート）](#template)
    *   [LINE通知メッセージ（テンプレート）を送る](#send-line-notification-message-template)
    *   [送信済みのLINE通知メッセージ（テンプレート）の数を取得する](#get-number-of-sent-line-notification-messages-template)
*   [LINE通知メッセージ（フレキシブル）](#flexible)
    *   [LINE通知メッセージ（フレキシブル）を送る](#send-line-notification-message-flexible)
    *   [送信済みのLINE通知メッセージ（フレキシブル）の数を取得する](#get-number-of-sent-line-notification-messages-flexible)

## 共通仕様

### ステータスコード

『Messaging APIリファレンス』の「[ステータスコード](https://developers.line.biz/ja/reference/messaging-api/#status-codes)」を参照してください。

### レスポンスヘッダー

LINE通知メッセージAPIのレスポンスには、以下のHTTPヘッダーが含まれます。

| レスポンスヘッダー | 説明 |
| --- | --- |
| x-line-request-id | リクエストID。各リクエストごとに発行されるIDです。 |

## LINE通知メッセージ（テンプレート）

*   [LINE通知メッセージ（テンプレート）を送る](#send-line-notification-message-template)
*   [送信済みのLINE通知メッセージ（テンプレート）の数を取得する](#get-number-of-sent-line-notification-messages-template)

### LINE通知メッセージ（テンプレート）を送る

ユーザーの電話番号を指定してLINE通知メッセージ（テンプレート）を送るAPIです。

詳しくは、『LINE通知メッセージドキュメント』の「[LINE通知メッセージ（テンプレート）](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/template/)」を参照してください。

:::note alert
リクエスト元IPアドレスの制限について

:::

_リクエストの例_

Shell

[](#)

sh

`curl -v -X POST https://api.line.me/v2/bot/message/pnp/templated/push \ -H 'Authorization: Bearer {channel_access_token}' \ -H 'Content-Type:application/json' \ -H 'X-Line-Delivery-Tag:15034552939884E28681A7D668CEA94C147C716C0EC9DFE8B80B44EF3B57F6BD0602366BC3menu01' \ -d '{     "to": "c9fb9ae95bff879cbcdfc9edf6716640bc40841f3b7352140daa1431af4c319e",    "templateKey": "shipment_completed_ja",    "body": {        "emphasizedItem": {            "itemKey": "date_002_ja",            "content": "2024年8月10日(土)"        },        "items": [            {                "itemKey": "time_range_001_ja",                "content": "午前中"            },            {                "itemKey": "number_001_ja",                "content": "1234567"            },            {                "itemKey": "price_001_ja",                "content": "12,000円"            },            {                "itemKey": "name_010_ja",                "content": "スープセット（冷凍）"            }        ],        "buttons": [            {                "buttonKey": "check_delivery_status_ja",                "url": "https://example.com/CheckDeliveryStatus/"            },            {                "buttonKey": "Check_Contact",                "url": "https://example.com/ContactUs/"            }        ]    } }'`

#### HTTPリクエスト

`POST https://api.line.me/v2/bot/message/pnp/templated/push`

#### レート制限

2,000リクエスト/秒

#### リクエストヘッダー

:::note warn
サポートしていない機能

:::

Content-Type

必須

application/json

Authorization

必須

Bearer `{channel access token}`

X-Line-Delivery-Tag

任意

Webhookを介して、[配信完了イベント](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/message-sending-complete-webhook-event/#receive-delivery-event)の`delivery.data`プロパティで返される文字列。詳しくは、「[メッセージの送信通知を受信する](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/technical-specs/#receive-delivery-event)」を参照してください。  
最小文字数：16  
最大文字数：100

_X-Line-Delivery-Tagの例_

Shell

[](#)

sh

`15034552939884E28681A7D668CEA94C147C716C0EC9DFE8B80B44EF3B57F6BD0602366BC3menu01`

#### リクエストボディ

to

String

必須

メッセージの送信先。[E.164](https://developers.line.biz/ja/glossary/#e164)形式に正規化し[SHA256でハッシュ化した電話番号](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/technical-specs/#phone-number-hashed)を指定してください。

メッセージの送信条件について詳しくは、「[LINE通知メッセージが送信される条件](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/technical-specs/#conditions-for-sending-line-notification-messages)」を参照してください。

:::note warn
注意

:::

templateKey

String

必須

使用するテンプレートの`Key`を指定します。

使用できる`Key`は、「[テンプレート](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/template/#templates)」を参照してください。

body

Object

任意

送信するテンプレートのボディオブジェクト。3つのオブジェクトでメッセージに含める内容を指定します。1つのメッセージ内で、同じアイテムを重複して指定することはできません。

*   `emphasizedItem`：強調したい[アイテム](#send-line-notification-message-template-items)
*   `items`：[アイテム](#send-line-notification-message-template-items)の配列
*   `buttons`：[ボタン](#send-line-notification-message-template-buttons)の配列

body.emphasizedItem

Object

任意

メッセージで強調する[アイテム](#send-line-notification-message-template-items)を指定します。  
最大オブジェクト数：1

body.items

Array of objects

任意

メッセージに含める[アイテム](#send-line-notification-message-template-items)の配列を指定します。  
最小オブジェクト数：0  
最大オブジェクト数：15

body.buttons

Array of objects

任意

メッセージに含める[ボタン](#send-line-notification-message-template-buttons)の配列を指定します。  
最小オブジェクト数：0  
最大オブジェクト数：2

##### アイテム

itemKey

String

必須

使用するアイテムの`Key`を指定します。

使用できる`Key`は、「[アイテム](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/template/#items)」を参照してください。

content

String

必須

アイテムの値として表示する文字列を指定します。  
最大文字数：`body.emphasizedItem`の場合は15、`body.items`の場合は300

_アイテムの例_

JSON

[](#)

json

`{   "itemKey": "time_range_001_ja",  "content": "午前中" }`

##### ボタン

buttonKey

String

必須

使用するボタンの`Key`を指定します。

使用できる`Key`は、「[ボタン](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/template/#buttons)」を参照してください。

url

String

必須

ボタンを押すと遷移するURLを指定します。  
最大文字数：1000

_ボタンの例_

JSON

[](#)

json

`{   "buttonKey": "Check_Contact",  "url": "https://example.com/ContactUs/" }`

#### レスポンス

ステータスコード`202`と空のJSONオブジェクトを返します。

_レスポンスの例_

JSON

[](#)

json

`{}`

#### エラーレスポンス

以下のHTTPステータスコードと、エラーレスポンスを返します。

| コード | 説明 |
| --- | --- |
| `400` | リクエストに問題があります。次のような理由が考えられます。<ul><!--[--><li><!--[-->メッセージの送信先が無効です。<!--]--></li><li><!--[-->無効なメッセージオブジェクトが指定されています。<!--]--></li><li><!--[-->このLINE公式アカウントでは指定したテンプレートは使用できません。<!--]--></li><!--]--></ul> |
| `403` | このエンドポイントを使う権限がありません。 |
| `422` | LINE通知メッセージ（テンプレート）の送信に失敗しました。以下のような理由が考えられます。<ul><!--[--><li><!--[-->メッセージ送信対象に指定した電話番号に紐づくLINEユーザーが存在しません。<!--]--></li><li><!--[-->メッセージ送信対象に指定した電話番号は、LINE通知メッセージのサービス対象国で発行されたものではありません。詳しくは、「<a href="/ja/docs/partner-docs/line-notification-messages/technical-specs/#conditions-for-sending-line-notification-messages" class=""><!--[--><!--[-->LINE通知メッセージが送信される条件<!--]--><!--]--></a>」を参照してください。<!--]--></li><li><!--[-->メッセージ送信対象に指定した電話番号に紐づくLINEユーザーが<a href="/ja/docs/partner-docs/line-notification-messages/technical-specs/#how-to-consent-for-line-notification-messages" class=""><!--[--><!--[-->LINE通知メッセージの受信を拒否<!--]--><!--]--></a>しています。<!--]--></li><li><!--[-->メッセージ送信対象に指定した電話番号に紐づくLINEユーザーは、<a href="https://guide.line.me/privacy-policy_update/2022/0001/?lang=ja-jp" target="_blank" class="" rel="nofollow"><!--[--><!--[-->LINEのプライバシーポリシー（2022年3月改定）<!--]--><!--]--></a>に同意していません。<!--]--></li><!--]--></ul> |

詳しくは、『Messaging APIリファレンス』の「[ステータスコード](https://developers.line.biz/ja/reference/messaging-api/#status-codes)」および「[エラーレスポンス](https://developers.line.biz/ja/reference/messaging-api/#error-responses)」を参照してください。

_エラーレスポンスの例_

JSON

[](#)

json

`// 存在しない、または使用する権限がないテンプレートを指定した場合（400 Bad Request） {   "message": "Invalid templateKey: reserve_004",  "details": [    {      "message": "The specified template doesn't exist, or you don't have the permission",      "property": "templateKey"    }  ] } // 存在しないアイテムを指定した場合（400 Bad Request） {   "message": "The request body has 1 invalid key(s).",  "details": [    {      "message": "The specified item key does not exist: datetime_000",      "property": "body.items[0].itemKey"    }  ] } // 同じアイテムを重複して指定した場合（400 Bad Request） {   "message": "The request body has 1 error(s)",  "details": [    {      "message": "Duplicate itemKey in items or between emphasizedItem and items are not allowed: date_002_ja",      "property": "body.emphasizedItem.itemKey"    }  ] } // メッセージの送信先が無効な場合（400 Bad Request） {   "message": "The request body has 1 error(s)",  "details": [    {      "message": "The value must be a valid SHA-256 digest.",      "property": "to"    }  ] } // LINE通知メッセージ（テンプレート）を送信する権限がない場合（403 Forbidden） {   "message": "Access to this API is not available for your account" } // LINE通知メッセージの送信に失敗した場合（422 Unprocessable Entity） {   "message": "Failed to send messages" }`

### 送信済みのLINE通知メッセージ（テンプレート）の数を取得する

「[LINE通知メッセージ（テンプレート）を送る](https://developers.line.biz/ja/reference/line-notification-messages/#send-line-notification-message-template)」エンドポイントを使って送信された、LINE通知メッセージ（テンプレート）の数を取得します。

詳しくは、『LINE通知メッセージドキュメント』の「[送信済みLINE通知メッセージの数を取得する](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/technical-specs/#get-number-of-sent-line-notification-messages)」を参照してください。

_リクエストの例_

Shell

[](#)

sh

`curl -v -X GET 'https://api.line.me/v2/bot/message/delivery/pnp/templated?date=20240916' \ -H 'Authorization: Bearer {channel_access_token}'`

#### HTTPリクエスト

`GET https://api.line.me/v2/bot/message/delivery/pnp/templated`

#### レート制限

2,000リクエスト/秒

#### リクエストヘッダー

Authorization

必須

Bearer `{channel access token}`

#### クエリパラメータ

date

必須

メッセージが送信された日付

*   フォーマット：`yyyyMMdd`（例：`20240916`）
*   タイムゾーン：UTC+9

#### レスポンス

ステータスコード`200`と以下の情報を含むJSONオブジェクトを返します。

status

String

集計処理の状態。以下のいずれかの値です。

*   `ready`：メッセージ数を取得できます。
*   `unready`：`date`に指定した日付のメッセージ数の集計がまだ完了していません。しばらくしてからリクエストを再実行してください。通常、集計処理は翌日中に完了します。
*   `out_of_service`：`date`に指定した日付が、集計システムの稼働開始日（2018年3月31日）より前です。

success

Number

含まれないことがあります

`date`に指定した日付に、LINE通知メッセージAPIを使って送信されたメッセージの数。`status`の値が`ready`の場合にのみ、レスポンスに含まれます。

_レスポンスの例_

JSON

[](#)

json

`{   "status": "ready",  "success": 3 }`

#### エラーレスポンス

以下のHTTPステータスコードと、エラーレスポンスを返します。

| コード | 説明 |
| --- | --- |
| `400` | リクエストに問題があります。次のような理由が考えられます。<ul><!--[--><li><!--[-->無効な日付が指定されています。<!--]--></li><li><!--[-->日付が指定されていません。<!--]--></li><!--]--></ul> |

詳しくは、『Messaging APIリファレンス』の「[ステータスコード](https://developers.line.biz/ja/reference/messaging-api/#status-codes)」および「[エラーレスポンス](https://developers.line.biz/ja/reference/messaging-api/#error-responses)」を参照してください。

_エラーレスポンスの例_

JSON

[](#)

json

`// 無効な日付を指定した場合（400 Bad Request） {   "message": "The value for the 'date' parameter is invalid" }`

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}

## LINE通知メッセージ（フレキシブル）

*   [LINE通知メッセージ（フレキシブル）を送る](#send-line-notification-message-flexible)
*   [送信済みのLINE通知メッセージ（フレキシブル）の数を取得する](#get-number-of-sent-line-notification-messages-flexible)

### LINE通知メッセージ（フレキシブル）を送る

ユーザーの電話番号を指定してLINE通知メッセージ（フレキシブル）を送るAPIです。

:::note info
従来の「LINE通知メッセージ」は、名称が「LINE通知メッセージ（フレキシブル）」に変更されました

:::

:::note alert
リクエスト元IPアドレスの制限について

:::

_リクエストの例_

Shell

[](#)

sh

`curl -v -X POST https://api.line.me/bot/pnp/push \ -H 'Authorization: Bearer {channel_access_token}' \ -H 'Content-Type:application/json' \ -d '{     "to": "{hashed_phone_number}",    "messages":[        {            "type":"text",            "text":"Hello, world1"        },        {            "type":"text",            "text":"Hello, world2"        }    ] }' #リクエストの例(X-Line-Delivery-Tagあり) curl -v -X POST https://api.line.me/bot/pnp/push \ -H 'Authorization: Bearer {channel_access_token}' \ -H 'Content-Type:application/json' \ -H 'X-Line-Delivery-Tag:{delivery_tag}' \ -d '{     "to": "{hashed_phone_number}",    "messages":[        {            "type":"text",            "text":"Hello, world1"        },        {            "type":"text",            "text":"Hello, world2"        }    ] }'`

#### HTTPリクエスト

`POST https://api.line.me/bot/pnp/push`

#### レート制限

2,000リクエスト/秒

#### リクエストヘッダー

:::note warn
サポートしていない機能

:::

Content-Type

必須

application/json

Authorization

必須

Bearer `{channel access token}`

X-Line-Delivery-Tag

任意

Webhookを介して、[配信完了イベント](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/message-sending-complete-webhook-event/#receive-delivery-event)の`delivery.data`プロパティで返される文字列。詳しくは、「[メッセージの送信通知を受信する](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/technical-specs/#receive-delivery-event)」を参照してください。  
最小文字数：16  
最大文字数：100

_X-Line-Delivery-Tagの例_

Shell

[](#)

sh

`15034552939884E28681A7D668CEA94C147C716C0EC9DFE8B80B44EF3B57F6BD0602366BC3menu01`

#### リクエストボディ

to

String

必須

メッセージの送信先。[E.164](https://developers.line.biz/ja/glossary/#e164)形式に正規化し[SHA256でハッシュ化した電話番号](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/technical-specs/#phone-number-hashed)を指定してください。

メッセージの送信条件について詳しくは、「[LINE通知メッセージが送信される条件](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/technical-specs/#conditions-for-sending-line-notification-messages)」を参照してください。

:::note warn
注意

:::

messages

[メッセージオブジェクト](https://developers.line.biz/ja/reference/messaging-api/#message-objects)の配列

必須

送信するメッセージ。最大件数：5

詳しくは、「[LINE通知メッセージAPIで送信可能なメッセージタイプ](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/technical-specs/#message-types-that-can-be-sent)」を参照してください。

#### レスポンス

ステータスコード`200`と空のJSONオブジェクトを返します。

_レスポンスの例_

JSON

[](#)

json

`{}`

#### エラーレスポンス

以下のHTTPステータスコードと、エラーレスポンスを返します。

| コード | 説明 |
| --- | --- |
| `400` | リクエストに問題があります。次のような理由が考えられます。<ul><!--[--><li><!--[-->メッセージの送信先が無効です。<!--]--></li><li><!--[-->無効なメッセージオブジェクトが指定されています。<!--]--></li><!--]--></ul> |
| `422` | LINE通知メッセージの送信に失敗しました。以下のような理由が考えられます。<ul><!--[--><li><!--[-->メッセージ送信対象に指定した電話番号に紐づくLINEユーザーが存在しません。<!--]--></li><li><!--[-->メッセージ送信対象に指定した電話番号は、LINE通知メッセージのサービス対象国で発行されたものではありません。詳しくは、「<a href="/ja/docs/partner-docs/line-notification-messages/technical-specs/#conditions-for-sending-line-notification-messages" class=""><!--[--><!--[-->LINE通知メッセージが送信される条件<!--]--><!--]--></a>」を参照してください。<!--]--></li><li><!--[-->メッセージ送信対象に指定した電話番号に紐づくLINEユーザーが<a href="/ja/docs/partner-docs/line-notification-messages/technical-specs/#how-to-consent-for-line-notification-messages" class=""><!--[--><!--[-->LINE通知メッセージの受信を拒否<!--]--><!--]--></a>しています。<!--]--></li><li><!--[-->メッセージ送信対象に指定した電話番号に紐づくLINEユーザーは、<a href="https://guide.line.me/privacy-policy_update/2022/0001/?lang=ja-jp" target="_blank" class="" rel="nofollow"><!--[--><!--[-->LINEのプライバシーポリシー（2022年3月改定）<!--]--><!--]--></a>に同意していません。<!--]--></li><!--]--></ul> |

詳しくは、『Messaging APIリファレンス』の「[ステータスコード](https://developers.line.biz/ja/reference/messaging-api/#status-codes)」および「[エラーレスポンス](https://developers.line.biz/ja/reference/messaging-api/#error-responses)」を参照してください。

_エラーレスポンスの例_

JSON

[](#)

json

`// メッセージの送信先が無効な場合（400 Bad Request） {   "message": "The request body has 1 error(s)",  "details": [    {      "message": "The value must be a valid SHA-256 digest.",      "property": "to"    }  ] } // LINE通知メッセージの送信に失敗した場合（422 Unprocessable Entity） {   "message": "Failed to send messages" }`

### 送信済みのLINE通知メッセージ（フレキシブル）の数を取得する

「[LINE通知メッセージ（フレキシブル）を送る](https://developers.line.biz/ja/reference/line-notification-messages/#send-line-notification-message-flexible)」エンドポイントを使って送信された、LINE通知メッセージ（フレキシブル）の数を取得します。

詳しくは、『LINE通知メッセージドキュメント』の「[送信済みLINE通知メッセージの数を取得する](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/technical-specs/#get-number-of-sent-line-notification-messages)」を参照してください。

_リクエストの例_

Shell

[](#)

sh

`curl -v -X GET 'https://api.line.me/v2/bot/message/delivery/pnp?date=20211231' \ -H 'Authorization: Bearer {channel_access_token}'`

#### HTTPリクエスト

`GET https://api.line.me/v2/bot/message/delivery/pnp`

#### レート制限

2,000リクエスト/秒

#### リクエストヘッダー

Authorization

必須

Bearer `{channel access token}`

#### クエリパラメータ

date

必須

メッセージが送信された日付

*   フォーマット：`yyyyMMdd`（例：`20211231`）
*   タイムゾーン：UTC+9

#### レスポンス

ステータスコード`200`と以下の情報を含むJSONオブジェクトを返します。

status

String

集計処理の状態。以下のいずれかの値です。

*   `ready`：メッセージ数を取得できます。
*   `unready`：`date`に指定した日付のメッセージ数の集計がまだ完了していません。しばらくしてからリクエストを再実行してください。通常、集計処理は翌日中に完了します。
*   `out_of_service`：`date`に指定した日付が、集計システムの稼働開始日（2018年3月31日）より前です。

success

Number

含まれないことがあります

`date`に指定した日付に、LINE通知メッセージAPIを使って送信されたメッセージの数。`status`の値が`ready`の場合にのみ、レスポンスに含まれます。

_レスポンスの例_

JSON

[](#)

json

`{   "status": "ready",  "success": 3 }`

#### エラーレスポンス

以下のHTTPステータスコードと、エラーレスポンスを返します。

| コード | 説明 |
| --- | --- |
| `400` | リクエストに問題があります。次のような理由が考えられます。<ul><!--[--><li><!--[-->無効な日付が指定されています。<!--]--></li><li><!--[-->日付が指定されていません。<!--]--></li><!--]--></ul> |

詳しくは、『Messaging APIリファレンス』の「[ステータスコード](https://developers.line.biz/ja/reference/messaging-api/#status-codes)」および「[エラーレスポンス](https://developers.line.biz/ja/reference/messaging-api/#error-responses)」を参照してください。

_エラーレスポンスの例_

JSON

[](#)

json

`// 無効な日付を指定した場合（400 Bad Request） {   "message": "The value for the 'date' parameter is invalid" }`

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}