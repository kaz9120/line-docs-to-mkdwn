---
url: https://developers.line.biz/ja/reference/line-notification-messages/
copied_at: 2025-10-24T10:17:14.168Z
---
# LINE通知メッセージAPIリファレンス

> [!WARNING]
> オプション機能を利用するには手続きが必要です
> 本ドキュメントに記載の機能は、所定の申請等を行った法人ユーザーのみがご利用いただけます。自社のLINE公式アカウントでご利用になりたいお客様は、担当営業までご連絡いただくか、[弊社パートナー](https://www.lycbiz.com/jp/partner/sales/)にお問い合わせください。

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

> [!CAUTION]
> リクエスト元IPアドレスの制限について
> LINE通知メッセージを送る場合、Messaging APIチャネルの［**セキュリティ設定**］タブで、LINEプラットフォームのAPIを呼び出せるサーバーのIPアドレスを登録しないでください。リクエスト元のIPアドレスを制限した状態でLINE通知メッセージを送ると、送信に失敗することがあります。設定方法について詳しくは、「[長期のチャネルアクセストークン利用時にAPIの呼び出し元を制限する（任意）](https://developers.line.biz/ja/docs/messaging-api/building-bot/#configure-security-settings)」を参照してください。

_リクエストの例_

#### HTTPリクエスト

`POST https://api.line.me/v2/bot/message/pnp/templated/push`

#### レート制限

2,000リクエスト/秒

#### リクエストヘッダー

> [!WARNING]
> サポートしていない機能
> LINE通知メッセージAPIでは、[リトライキー](https://developers.line.biz/ja/reference/messaging-api/#retry-api-request)（`X-Line-Retry-Key`）を使ったAPIリクエストの再試行はできません。

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

#### リクエストボディ

to

String

必須

メッセージの送信先。[E.164](https://developers.line.biz/ja/glossary/#e164)形式に正規化し[SHA256でハッシュ化した電話番号](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/technical-specs/#phone-number-hashed)を指定してください。

メッセージの送信条件について詳しくは、「[LINE通知メッセージが送信される条件](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/technical-specs/#conditions-for-sending-line-notification-messages)」を参照してください。

> [!WARNING]
> 注意
> *   [グループトークと複数人トーク](https://developers.line.biz/ja/docs/messaging-api/group-chats/#group-chat-types)は送信対象として指定できません。
> *   複数の電話番号を送信対象として指定することはできません。

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

#### レスポンス

ステータスコード`202`と空のJSONオブジェクトを返します。

_レスポンスの例_

#### エラーレスポンス

以下のHTTPステータスコードと、エラーレスポンスを返します。

| コード | 説明 |
| --- | --- |
| `400` | リクエストに問題があります。次のような理由が考えられます。<ul><li>メッセージの送信先が無効です。</li><li>無効なメッセージオブジェクトが指定されています。</li><li>このLINE公式アカウントでは指定したテンプレートは使用できません。</li></ul> |
| `403` | このエンドポイントを使う権限がありません。 |
| `422` | LINE通知メッセージ（テンプレート）の送信に失敗しました。以下のような理由が考えられます。<ul><li>メッセージ送信対象に指定した電話番号に紐づくLINEユーザーが存在しません。</li><li>メッセージ送信対象に指定した電話番号は、LINE通知メッセージのサービス対象国で発行されたものではありません。詳しくは、「<a href="/ja/docs/partner-docs/line-notification-messages/technical-specs/#conditions-for-sending-line-notification-messages" class="">LINE通知メッセージが送信される条件</a>」を参照してください。</li><li>メッセージ送信対象に指定した電話番号に紐づくLINEユーザーが<a href="/ja/docs/partner-docs/line-notification-messages/technical-specs/#how-to-consent-for-line-notification-messages" class="">LINE通知メッセージの受信を拒否</a>しています。</li><li>メッセージ送信対象に指定した電話番号に紐づくLINEユーザーは、<a href="https://guide.line.me/privacy-policy_update/2022/0001/?lang=ja-jp" target="_blank" class="" rel="nofollow">LINEのプライバシーポリシー（2022年3月改定）</a>に同意していません。</li></ul> |

詳しくは、『Messaging APIリファレンス』の「[ステータスコード](https://developers.line.biz/ja/reference/messaging-api/#status-codes)」および「[エラーレスポンス](https://developers.line.biz/ja/reference/messaging-api/#error-responses)」を参照してください。

_エラーレスポンスの例_

### 送信済みのLINE通知メッセージ（テンプレート）の数を取得する

「[LINE通知メッセージ（テンプレート）を送る](https://developers.line.biz/ja/reference/line-notification-messages/#send-line-notification-message-template)」エンドポイントを使って送信された、LINE通知メッセージ（テンプレート）の数を取得します。

詳しくは、『LINE通知メッセージドキュメント』の「[送信済みLINE通知メッセージの数を取得する](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/technical-specs/#get-number-of-sent-line-notification-messages)」を参照してください。

_リクエストの例_

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

#### エラーレスポンス

以下のHTTPステータスコードと、エラーレスポンスを返します。

| コード | 説明 |
| --- | --- |
| `400` | リクエストに問題があります。次のような理由が考えられます。<ul><li>無効な日付が指定されています。</li><li>日付が指定されていません。</li></ul> |

詳しくは、『Messaging APIリファレンス』の「[ステータスコード](https://developers.line.biz/ja/reference/messaging-api/#status-codes)」および「[エラーレスポンス](https://developers.line.biz/ja/reference/messaging-api/#error-responses)」を参照してください。

_エラーレスポンスの例_

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}

## LINE通知メッセージ（フレキシブル）

*   [LINE通知メッセージ（フレキシブル）を送る](#send-line-notification-message-flexible)
*   [送信済みのLINE通知メッセージ（フレキシブル）の数を取得する](#get-number-of-sent-line-notification-messages-flexible)

### LINE通知メッセージ（フレキシブル）を送る

ユーザーの電話番号を指定してLINE通知メッセージ（フレキシブル）を送るAPIです。

> [!TIP]
> 従来の「LINE通知メッセージ」は、名称が「LINE通知メッセージ（フレキシブル）」に変更されました
> LINE通知メッセージに、用意されたテンプレートやアイテムを組み合わせて簡単にメッセージを作成できる「[LINE通知メッセージ（テンプレート）](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/template/)」が新たに加わりました。
> 
> これに伴い、UX審査を要する従来の「LINE通知メッセージ」は、名称が「LINE通知メッセージ（フレキシブル）」に変更されました。
> 
> 詳しくは、2025年6月2日の『法人ユーザー向けお知らせ』、「[LINE通知メッセージ（テンプレート）の提供を開始しました](https://developers.line.biz/ja/docs/partner-docs/notice/#partner-news-20250602)」を参照してください。

> [!CAUTION]
> リクエスト元IPアドレスの制限について
> LINE通知メッセージを送る場合、Messaging APIチャネルの［**セキュリティ設定**］タブで、LINEプラットフォームのAPIを呼び出せるサーバーのIPアドレスを登録しないでください。リクエスト元のIPアドレスを制限した状態でLINE通知メッセージを送ると、送信に失敗することがあります。設定方法について詳しくは、「[長期のチャネルアクセストークン利用時にAPIの呼び出し元を制限する（任意）](https://developers.line.biz/ja/docs/messaging-api/building-bot/#configure-security-settings)」を参照してください。

_リクエストの例_

#### HTTPリクエスト

`POST https://api.line.me/bot/pnp/push`

#### レート制限

2,000リクエスト/秒

#### リクエストヘッダー

> [!WARNING]
> サポートしていない機能
> LINE通知メッセージAPIでは、[リトライキー](https://developers.line.biz/ja/reference/messaging-api/#retry-api-request)（`X-Line-Retry-Key`）を使ったAPIリクエストの再試行はできません。

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

#### リクエストボディ

to

String

必須

メッセージの送信先。[E.164](https://developers.line.biz/ja/glossary/#e164)形式に正規化し[SHA256でハッシュ化した電話番号](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/technical-specs/#phone-number-hashed)を指定してください。

メッセージの送信条件について詳しくは、「[LINE通知メッセージが送信される条件](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/technical-specs/#conditions-for-sending-line-notification-messages)」を参照してください。

> [!WARNING]
> 注意
> *   [グループトークと複数人トーク](https://developers.line.biz/ja/docs/messaging-api/group-chats/#group-chat-types)は送信対象として指定できません。
> *   複数の電話番号を送信対象として指定することはできません。

messages

[メッセージオブジェクト](https://developers.line.biz/ja/reference/messaging-api/#message-objects)の配列

必須

送信するメッセージ。最大件数：5

詳しくは、「[LINE通知メッセージAPIで送信可能なメッセージタイプ](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/technical-specs/#message-types-that-can-be-sent)」を参照してください。

#### レスポンス

ステータスコード`200`と空のJSONオブジェクトを返します。

_レスポンスの例_

#### エラーレスポンス

以下のHTTPステータスコードと、エラーレスポンスを返します。

| コード | 説明 |
| --- | --- |
| `400` | リクエストに問題があります。次のような理由が考えられます。<ul><li>メッセージの送信先が無効です。</li><li>無効なメッセージオブジェクトが指定されています。</li></ul> |
| `422` | LINE通知メッセージの送信に失敗しました。以下のような理由が考えられます。<ul><li>メッセージ送信対象に指定した電話番号に紐づくLINEユーザーが存在しません。</li><li>メッセージ送信対象に指定した電話番号は、LINE通知メッセージのサービス対象国で発行されたものではありません。詳しくは、「<a href="/ja/docs/partner-docs/line-notification-messages/technical-specs/#conditions-for-sending-line-notification-messages" class="">LINE通知メッセージが送信される条件</a>」を参照してください。</li><li>メッセージ送信対象に指定した電話番号に紐づくLINEユーザーが<a href="/ja/docs/partner-docs/line-notification-messages/technical-specs/#how-to-consent-for-line-notification-messages" class="">LINE通知メッセージの受信を拒否</a>しています。</li><li>メッセージ送信対象に指定した電話番号に紐づくLINEユーザーは、<a href="https://guide.line.me/privacy-policy_update/2022/0001/?lang=ja-jp" target="_blank" class="" rel="nofollow">LINEのプライバシーポリシー（2022年3月改定）</a>に同意していません。</li></ul> |

詳しくは、『Messaging APIリファレンス』の「[ステータスコード](https://developers.line.biz/ja/reference/messaging-api/#status-codes)」および「[エラーレスポンス](https://developers.line.biz/ja/reference/messaging-api/#error-responses)」を参照してください。

_エラーレスポンスの例_

### 送信済みのLINE通知メッセージ（フレキシブル）の数を取得する

「[LINE通知メッセージ（フレキシブル）を送る](https://developers.line.biz/ja/reference/line-notification-messages/#send-line-notification-message-flexible)」エンドポイントを使って送信された、LINE通知メッセージ（フレキシブル）の数を取得します。

詳しくは、『LINE通知メッセージドキュメント』の「[送信済みLINE通知メッセージの数を取得する](https://developers.line.biz/ja/docs/partner-docs/line-notification-messages/technical-specs/#get-number-of-sent-line-notification-messages)」を参照してください。

_リクエストの例_

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

#### エラーレスポンス

以下のHTTPステータスコードと、エラーレスポンスを返します。

| コード | 説明 |
| --- | --- |
| `400` | リクエストに問題があります。次のような理由が考えられます。<ul><li>無効な日付が指定されています。</li><li>日付が指定されていません。</li></ul> |

詳しくは、『Messaging APIリファレンス』の「[ステータスコード](https://developers.line.biz/ja/reference/messaging-api/#status-codes)」および「[エラーレスポンス](https://developers.line.biz/ja/reference/messaging-api/#error-responses)」を参照してください。

_エラーレスポンスの例_

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}