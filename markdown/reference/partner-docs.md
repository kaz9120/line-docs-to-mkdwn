---
url: https://developers.line.biz/ja/reference/partner-docs/
copied_at: 2025-10-24T06:29:49.272Z
---
# 法人ユーザー向けオプションAPIリファレンス

> [!WARNING]
> オプション機能を利用するには手続きが必要です
> 本ドキュメントに記載の機能は、所定の申請等を行った法人ユーザーのみがご利用いただけます。自社のLINE公式アカウントでご利用になりたいお客様は、担当営業までご連絡いただくか、[弊社パートナー](https://www.lycbiz.com/jp/partner/sales/)にお問い合わせください。

*   [共通仕様](#partner-api-common-specifications)
    *   [ステータスコード](#partner-api-status-codes)
    *   [レスポンスヘッダー](#partner-api-response-headers)
*   [ミッションスタンプAPI](#mission-stickers)
    *   [ユーザーにミッションスタンプを提供する](#send-mission-stickers-v3)
*   [既読API](#mark-as-read)
    *   [ユーザーからのメッセージに既読を付ける](#mark-messages-from-users-as-read)
*   [モジュール](#module)
    *   [モジュールチャネルの提供者の操作で連携（アタッチ）する](#link-attach-by-operation-module-channel-provider)
    *   [モジュールチャネルの管理者の操作でモジュールチャネルを連携解除（デタッチ）する](#unlink-detach-module-channel-by-operation-mc-admin)
    *   [Acquire Control API](#acquire-control-api)
    *   [Release Control API](#release-control-api)
    *   [モジュールチャネル専用のWebhookイベントオブジェクト](#module-webhook-event-object)
    *   [モジュールをアタッチしたボットのリストを取得する](#get-multiple-bot-info-api)

## 共通仕様

### ステータスコード

『Messaging APIリファレンス』の「[ステータスコード](https://developers.line.biz/ja/reference/messaging-api/#status-codes)」を参照してください。

### レスポンスヘッダー

法人ユーザー向けオプションAPIのレスポンスには、以下のHTTPヘッダーが含まれます。

| レスポンスヘッダー | 説明 |
| --- | --- |
| x-line-request-id | リクエストID。各リクエストごとに発行されるIDです。 |

## ミッションスタンプAPI

ミッションスタンプは、ミッションの達成を条件としてユーザーに提供するスタンプです。スタンプをインセンティブに、ユーザーに「ID情報の連携」や「会員登録」、「アンケート回答」などを促すことができます。

### ユーザーにミッションスタンプを提供する

ミッションを達成したユーザーに、ミッションスタンプのダウンロード権限を付与します。

_リクエストの例_

#### HTTPリクエスト

`POST https://api.line.me/shop/v3/mission`

#### リクエストヘッダー

Content-Type

必須

application/json

Authorization

必須

Bearer `{channel access token}`

#### リクエストボディ

to

String

必須

ダウンロード権限を付与するユーザーのユーザーID

productType

String

必須

`STICKER`

productId

String

必須

スタンプセットのパッケージID

sendPresentMessage

Boolean

必須

`false`

#### レスポンス

ステータスコード`200`と空のレスポンスボディを返します。

#### エラーレスポンス

エラー発生時は、エラーに応じたHTTPステータスコードと、以下のJSONデータを含むレスポンスボディが返されます。

message

String

エラー情報を含むメッセージ。詳しくは、以下の「[エラーメッセージ](#send-mission-stickers-v3-error-messages)」を参照してください。

#### エラーメッセージ

主なエラーのHTTPステータスコードと、JSONデータの`message`プロパティに含まれるエラーメッセージは以下のとおりです。

| コード | メッセージ | 説明 |
| --- | --- | --- |
| `400` | invalid request | `to`に指定した送信先のユーザーIDが無効です。 |
| `400` | illegal argument | `productId`に指定したスタンプセットがミッションスタンプとして設定されていません。 |
| `400` | not\_sales\_period | `productId`に指定したスタンプセットが有効期間外です。 |
| `400` | not sale for country | `to`に指定した送信先のユーザーの国では、`productId`に指定したスタンプセットが利用できません。 |
| `400` | not sale for device | `to`に指定した送信先のユーザーが利用している端末は、`productId`に指定したスタンプセットに対応していません。 |
| `400` | not sale for version | `to`に指定した送信先のユーザーが利用しているLINEアプリのバージョンは、`productId`に指定したスタンプセットに対応していません。 |
| `403` | not allowed to use the API | チャネルに、ミッションスタンプAPIの利用権限が付与されていません。 |
| `404` | not found | `productId`に指定したスタンプセットが存在しません。 |

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

## 既読API

### ユーザーからのメッセージに既読を付ける

特定のユーザーから送信されたすべてのメッセージに「既読」を表示できます。

_リクエストの例_

#### HTTPリクエスト

`POST https://api.line.me/v2/bot/message/markAsRead`

#### レート制限

2,000リクエスト/秒

#### リクエストヘッダー

Content-Type

必須

application/json

Authorization

必須

Bearer `{channel access token}`

#### リクエストボディ

chat.userId

String

必須

対象のユーザーID。

#### レスポンス

ステータスコード`200`と空のJSONオブジェクトを返します。

_レスポンスの例_

#### エラーレスポンス

以下のHTTPステータスコードと、エラーレスポンスを返します。

| コード | 説明 |
| --- | --- |
| `400` | 無効なユーザーIDが指定されています。 |

詳しくは、『Messaging APIリファレンス』の「[ステータスコード](https://developers.line.biz/ja/reference/messaging-api/#status-codes)」および「[エラーレスポンス](https://developers.line.biz/ja/reference/messaging-api/#error-responses)」を参照してください。

_エラーレスポンスの例_

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}

## モジュール

### モジュールチャネルの提供者の操作で連携（アタッチ）する

モジュールチャネルをLINE公式アカウントにアタッチします。アタッチするためには、LINE公式アカウントの管理者に認可を要求し、認可コードを取得する必要があります。モジュールの認可フローについて詳しくは、『モジュールドキュメント』の「[モジュールチャネルを連携（アタッチ）する](https://developers.line.biz/ja/docs/partner-docs/module-technical-attach-channel/)」を参照してください。

このAPIを利用する際には、`Authorization`ヘッダーもしくはリクエストボディのどちらかを使って、モジュールチャネルのチャネルIDとチャネルシークレットを指定する必要があります。

_リクエストの例_

#### HTTPリクエスト

`POST https://manager.line.biz/module/auth/v1/token`

#### リクエストヘッダー

Content-Type

必須

`application/x-www-form-urlencoded`

Authorization

任意

`Basic {base64({Channel ID}:{Channel Secret})}`

`{base64({Channel ID}:{Channel Secret})}`には、「モジュールチャネルのチャネルID」と「モジュールチャネルのチャネルシークレット」を`:`で連結し、Base64でエンコードした文字列を指定してください。モジュールチャネルのチャネルIDとチャネルシークレットは、[LINE Developersコンソール](https://developers.line.biz/console/)で確認できます。

リクエストボディ内で`client_id`および`client_secret`を指定する代わりに、このヘッダを使ってモジュールチャネルのチャネルIDとチャネルシークレットを指定できます。

#### リクエストボディ

grant\_type

String

必須

`authorization_code`

code

String

必須

LINEプラットフォームから渡された[認可コード](https://developers.line.biz/ja/docs/partner-docs/module-technical-attach-channel/#receive-authorization-code)を指定します。

redirect\_uri

String

必須

[認証と認可のためのURL](https://developers.line.biz/ja/docs/partner-docs/module-technical-attach-channel/#request-auth-from-line-oa-admin-query-parameters)で指定した`redirect_uri`を指定します。

code\_verifier

String

任意

認可コード横取り攻撃への対策としてOAuth 2.0の拡張仕様で定義されるPKCE（Proof Key for Code Exchange）を利用した場合に指定します。

[RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636)に準拠しています。

client\_id

String

任意

`Authorization`ヘッダーを使用する代わりに、このパラメータを使ってモジュールチャネルのチャネルIDを指定できます。 モジュールチャネルのチャネルIDは、[LINE Developersコンソール](https://developers.line.biz/console/)で確認できます。

client\_secret

String

任意

`Authorization`ヘッダーを使用する代わりに、このパラメータを使ってモジュールチャネルのチャネルシークレットを指定できます。モジュールチャネルのチャネルシークレットは、[LINE Developersコンソール](https://developers.line.biz/console/)で確認できます。

region

String

任意

[認証と認可のためのURL](https://developers.line.biz/ja/docs/partner-docs/module-technical-attach-channel/#request-auth-from-line-oa-admin-query-parameters)で`region`に値を指定した場合、同じ値を指定してください。

basic\_search\_id

String

任意

認証と認可のためのURLで`basic_search_id`に値を指定した場合、同じ値を指定してください。

scope

String

任意

認証と認可のためのURLで`scope`に値を指定した場合、同じ値を指定してください。

brand\_type

String

任意

認証と認可のためのURLで`brand_type`に値を指定した場合、同じ値を指定してください。

#### レスポンス

成功時は、ステータスコード`200`と以下の情報を含むJSONオブジェクトを返します。

bot\_id

String

LINE公式アカウントのボットのユーザーID。

ボットのユーザーIDは、[Messaging API](https://developers.line.biz/ja/reference/messaging-api/)や[Acquire Control API](https://developers.line.biz/ja/reference/partner-docs/#acquire-control-api)を呼び出す際に利用します。

> [!WARNING]
> 注意
> ボットのユーザーIDは、[LINE Developersコンソール](https://developers.line.biz/console/)で、Messaging APIチャネルの［**チャネル基本設定**］タブに表示される［**あなたのユーザーID**］ではありません。

scope

String

LINE公式アカウントの管理者によって許可された権限（スコープ）。

_レスポンスの例_

#### エラーレスポンス

以下のHTTPステータスコードを返します。

*   `400 Bad Request`
*   `403 Forbidden`

### モジュールチャネルの管理者の操作でモジュールチャネルを連携解除（デタッチ）する

LINE公式アカウントからモジュールチャネルをデタッチします。

_リクエストの例_

#### HTTPリクエスト

`POST https://api.line.me/v2/bot/channel/detach`

#### レート制限

2,000リクエスト/秒

#### リクエストヘッダー

Content-Type

必須

`application/json`

Authorization

必須

`Bearer {channel access token}`

`{channel access token}`には、モジュールチャネルのチャネルアクセストークンを指定してください。

#### リクエストボディ

botId

String

必須

モジュールチャネルにアタッチされたLINE公式アカウントのボットのユーザーID。

ボットのユーザーIDは、「[モジュールチャネルの提供者の操作で連携（アタッチ）する](#link-attach-by-operation-module-channel-provider)」のレスポンスや[Attachedイベント](#attached-event)で取得できます。

#### レスポンス

成功時は、ステータスコード`200`を返します。

#### エラーレスポンス

以下のHTTPステータスコードと、エラーレスポンスを返します。

| コード | 説明 |
| --- | --- |
| `400` | モジュールチャネルを連携解除（デタッチ）できませんでした。次のような理由が考えられます。<ul><!--[--><li><!--[-->無効なボットのユーザーIDが指定されている。<!--]--></li><li><!--[-->存在しないボットが指定されている。<!--]--></li><li><!--[-->モジュールチャネルが連携（アタッチ）されていない。<!--]--></li><li><!--[-->モジュールチャネルではないチャネルのチャネルアクセストークンが指定されている。<!--]--></li><!--]--></ul> |

詳しくは、『Messaging APIリファレンス』の「[ステータスコード](https://developers.line.biz/ja/reference/messaging-api/#status-codes)」および「[エラーレスポンス](https://developers.line.biz/ja/reference/messaging-api/#error-responses)」を参照してください。

_エラーレスポンスの例_

### Acquire Control API

Standby Channelが主導権（Chat Control）を取得する場合は、Acquire Control APIを呼び出します。

それまでActive Channelだったチャネルは、自動的にStandby Channelに切り替わります。

> [!CAUTION]
> 警告
> 現在提供しているモジュールの仕組みにおいては、本APIを呼び出す必要はありません。そのため本APIの実装は任意となります。
> 
> 本APIは現状、想定外の問題等によりチャットの主導権が切り替わった際にのみ利用します。

_リクエストの例_

#### HTTPリクエスト

`POST https://api.line.me/v2/bot/chat/{chatId}/control/acquire`

#### レート制限

2,000リクエスト/秒

#### リクエストヘッダー

Content-Type

必須

`application/json`

Authorization

必須

`Bearer {channel access token}`

`{channel access token}`には、モジュールチャネルのチャネルアクセストークンを指定してください。

ボットのユーザーIDを指定するヘッダー

必須

モジュールチャネルにアタッチされたLINE公式アカウントのボットのユーザーID。

ボットのユーザーIDは、「[モジュールチャネルの提供者の操作で連携（アタッチ）する](#link-attach-by-operation-module-channel-provider)」のレスポンスや[Attachedイベント](#attached-event)で取得できます。

> [!WARNING]
> ヘッダーの詳細については参画される際に別途提供いたします
> 本ヘッダーの名前（パラメーター名）は、実際に[LINEマーケットプレイス](https://line-marketplace.com/jp/inquiry)に参画するお客様に限定して公開しています。

#### パスパラメータ

chatId

必須

`userId`、`roomId`、または`groupId`

#### リクエストボディ

expired

Boolean

任意

*   `True`：制限時間（ttl）を経過すると、主導権（Chat Control）がPrimary Channelに戻ります。（デフォルト）
*   `False`：制限時間がなく、主導権（Chat Control）は時間経過では変わりません。

ttl

Number

任意

主導権（Chat Control）がPrimary Channelに戻るまでの時間（モジュールチャネルがActive Channelでいられる時間）。秒で指定します。最大値は1年間（3600 \* 24 \* 365）。デフォルト値は`3600`（1時間）です。

※`expired`の値が`false`の場合は、無視されます。

#### レスポンス

成功時は、ステータスコード`200`を返します。

#### エラーレスポンス

以下のHTTPステータスコードと、エラーレスポンスを返します。

| コード | 説明 |
| --- | --- |
| `400` | `chatId`パラメータに、不正なIDが指定されています。 |
| `404` | 主導権（Chat Control）を取得できませんでした。次のような理由が考えられます。<ul><!--[--><li><!--[-->モジュールと連携しているLINE公式アカウントを友だち追加していないユーザーが指定されている。<!--]--></li><li><!--[-->モジュールと連携しているLINE公式アカウントが参加していないグループが指定されている。<!--]--></li><li><!--[-->モジュールと連携しているLINE公式アカウントが参加していない複数人トークが指定されている。<!--]--></li><!--]--></ul> |
| `423` | 別のチャネルが、一定期間内（数秒程度）に主導権（Chat Control）を取得していた場合。 |

詳しくは、『Messaging APIリファレンス』の「[ステータスコード](https://developers.line.biz/ja/reference/messaging-api/#status-codes)」および「[エラーレスポンス](https://developers.line.biz/ja/reference/messaging-api/#error-responses)」を参照してください。

_エラーレスポンスの例_

### Release Control API

Active Channelが持っている主導権（Chat Control）を、Primary Channelに返却する場合は、Release Control APIを呼び出します。

> [!CAUTION]
> 警告
> 現在提供しているモジュールの仕組みにおいては、本APIを呼び出す必要はありません。そのため本APIの実装は任意となります。
> 
> 本APIは現状、想定外の問題等によりチャットの主導権が切り替わった際にのみ利用します。

_リクエストの例_

#### HTTPリクエスト

`POST https://api.line.me/v2/bot/chat/{chatId}/control/release`

#### レート制限

2,000リクエスト/秒

#### リクエストヘッダー

Content-Type

必須

`application/json`

Authorization

必須

`Bearer {channel access token}`

`{channel access token}`には、モジュールチャネルのチャネルアクセストークンを指定してください。

ボットのユーザーIDを指定するヘッダー

必須

モジュールチャネルにアタッチされたLINE公式アカウントのボットのユーザーID。

ボットのユーザーIDは、「[モジュールチャネルの提供者の操作で連携（アタッチ）する](#link-attach-by-operation-module-channel-provider)」のレスポンスや[Attachedイベント](#attached-event)で取得できます。

> [!WARNING]
> ヘッダーの詳細については参画される際に別途提供いたします
> 本ヘッダーの名前（パラメーター名）は、実際に[LINEマーケットプレイス](https://line-marketplace.com/jp/inquiry)に参画するお客様に限定して公開しています。

#### パスパラメータ

chatId

必須

`userId`、`roomId`、または`groupId`

#### レスポンス

成功時は、ステータスコード`200`を返します。

#### エラーレスポンス

以下のHTTPステータスコードと、エラーレスポンスを返します。

| コード | 説明 |
| --- | --- |
| `400` | `chatId`パラメータに、不正なIDが指定されています。 |

詳しくは、『Messaging APIリファレンス』の「[ステータスコード](https://developers.line.biz/ja/reference/messaging-api/#status-codes)」および「[エラーレスポンス](https://developers.line.biz/ja/reference/messaging-api/#error-responses)」を参照してください。

_エラーレスポンスの例_

### モジュールチャネル専用のWebhookイベントオブジェクト

#### Attachedイベント

モジュールチャネルが、LINE公式アカウントにアタッチされたことを示すイベントです。モジュールチャネルのWebhook URLサーバーに送信されます。

timestampなど

「[共通プロパティ](https://developers.line.biz/ja/reference/messaging-api/#common-properties)」を参照してください。

ただし、`mode`は`active`固定です。

type

String

`module`

module.type

String

`attached`

module.botId

String

アタッチされたLINE公式アカウントのボットのユーザーID

module.scopes

Array of strings

LINE公式アカウントの管理者によって許可されたスコープを示す文字列の配列です。

_Attachedイベントの例_

#### Detachedイベント

モジュールチャネルが、LINE公式アカウントからデタッチされたことを示すイベントです。モジュールチャネルのWebhook URLサーバーに送信されます。

> [!WARNING]
> LINE公式アカウントを削除する操作をしたときにはDetachされません
> LINE Official Account ManagerでLINE公式アカウントを削除する操作をしたときは、モジュールチャネルはデタッチされません。
> 
> 削除する操作をしてから3か月が経過し、LINE公式アカウントの分析データを含むすべての情報が完全に削除されると、自動的にデタッチされます。

timestampなど

「[共通プロパティ](https://developers.line.biz/ja/reference/messaging-api/#common-properties)」を参照してください。

ただし、`mode`は`active`固定です。

type

String

`module`

module.type

String

`detached`

module.botId

String

連携解除されたLINE公式アカウントのボットのユーザーID

module.reason

String

連携解除された理由

`bot_deleted`：LINE公式アカウントの分析データを含むすべての情報が完全に削除されました。

_Detachedイベントの例_

#### Activatedイベント

Acquire Control APIを呼び出して、モジュールチャネルがActive Channelに切り替わったことを示すイベントです。モジュールチャネルのWebhook URLサーバーに送信されます。

> [!WARNING]
> 注意
> Acquire Control APIで指定した有効期間が過ぎて、主導権（Chat Control）が切り替わった場合は、Activatedイベントは送信されません。

timestamp、sourceなど

「[共通プロパティ](https://developers.line.biz/ja/reference/messaging-api/#common-properties)」を参照してください。

ただし、`mode`は`active`固定です。

type

String

`activated`

chatControl.expireAt

Number

“active”が維持される期限。

_Activatedイベントの例_

#### Deactivatedイベント

Acquire Control APIまたはRelease Control APIを呼び出して、モジュールチャネルがStandby Channelに切り替わったことを示すイベントです。モジュールチャネルのWebhook URLサーバーに送信されます。

> [!WARNING]
> 注意
> Acquire Control APIで指定した有効期間が過ぎて、主導権（Chat Control）が切り替わった場合は、Deactivatedイベントは送信されません。

timestamp、sourceなど

「[共通プロパティ](https://developers.line.biz/ja/reference/messaging-api/#common-properties)」を参照してください。

ただし、`mode`は`active`固定です。

type

String

`deactivated`

_Deactivatedイベントの例_

#### botSuspendイベント

LINE公式アカウントが一時停止状態（Suspend）になったことを示すイベントです。モジュールチャネルのWebhook URLサーバーに送信されます。

このイベントを受信したときは、以下のような処理を行うことを推奨します。

*   モジュールチャネルの管理画面に「LINE公式アカウントが利用できない状態になっているため、この管理画面は利用できません」といったメッセージを表示し、管理画面の利用を停止する。
*   いったん一時停止状態になっても、一時停止状態から復帰する可能性（botResumeイベントを受信する可能性）があります。すべての情報を保持しておくことを推奨します。

> [!WARNING]
> 注意
> Primary ChannelにはbotSuspendイベントは送信されません。
> 
> botSuspendイベントを受信したあとでDetachedイベントを受信した場合は、LINE公式アカウントがモジュールチャネルの利用を停止し、契約を解除したことを示します。

timestampなど

「[共通プロパティ](https://developers.line.biz/ja/reference/messaging-api/#common-properties)」を参照してください。

ただし、`mode`は`active`固定です。

type

String

`botSuspended`

_botSuspendイベントの例_

#### botResumedイベント

LINE公式アカウントが一時停止状態から復帰したことを示すイベントです。モジュールチャネルのWebhook URLサーバーに送信されます。

このイベントを受信したときは、モジュールチャネルの管理画面で「LINE公式アカウントが利用できない状態になっているため、この管理画面は利用できません」といったメッセージを非表示にし、管理画面の利用を再開することを推奨します。

> [!WARNING]
> 注意
> Primary ChannelにはbotResumedイベントは送信されません。

timestampなど

「[共通プロパティ](https://developers.line.biz/ja/reference/messaging-api/#common-properties)」を参照してください。

ただし、`mode`は`active`固定です。

type

String

`botResumed`

_botResumedイベントの例_

### モジュールをアタッチしたボットのリストを取得する

モジュールチャネルをアタッチした、複数のLINE公式アカウントのボットの基本情報をリストで取得します。

_リクエストの例_

#### HTTPリクエスト

`GET https://api.line.me/v2/bot/list?limit={limit}&start={continuationToken}`

#### レート制限

2,000リクエスト/秒

#### リクエストヘッダー

Authorization

必須

`Bearer {channel access token}`

`{channel access token}`には、モジュールチャネルのチャネルアクセストークンを指定してください。

#### クエリパラメータ

limit

任意

基本情報を取得するボットの最大個数を指定します。デフォルト値は`100`です。  
最大値：`100`

start

任意

継続トークンの値。レスポンスで返されるJSONオブジェクトの`next`プロパティに含まれます。1回のリクエストでボットの基本情報をすべて取得できない場合は、このパラメータを指定して残りの配列を取得します。

#### レスポンス

成功時は、ステータスコード`200`と以下の情報を含むJSONオブジェクトを返します。

bots

Array

ボットの基本情報を表すBot list Item objectの配列。

bots\[\].userId

String

ボットのユーザーID

bots\[\].basicId

String

ボットのベーシックID

bots\[\].premiumId

String

含まれないことがあります

ボットの[プレミアムID](https://developers.line.biz/ja/glossary/#premium-id)。プレミアムIDが未設定の場合、この値は含まれません。

bots\[\].displayName

String

ボットの表示名

bots\[\].pictureUrl

String

含まれないことがあります

プロフィール画像のURL。「https://」から始まる画像URLです。ボットにプロフィール画像を設定していない場合は、レスポンスに含まれません。

next

String

含まれないことがあります

継続トークン。ボットの基本情報の、次の配列を取得するために使用します。このプロパティは、取得しきれなかったボットの基本情報が存在する場合にのみ返されます。

継続トークンの有効期間は24時間（86,400秒間）です。

_レスポンスの例_

#### エラーレスポンス

以下のHTTPステータスコードと、エラーレスポンスを返します。

| コード | 説明 |
| --- | --- |
| `400` | 無効な継続トークンが指定されています。 |

詳しくは、『Messaging APIリファレンス』の「[ステータスコード](https://developers.line.biz/ja/reference/messaging-api/#status-codes)」および「[エラーレスポンス](https://developers.line.biz/ja/reference/messaging-api/#error-responses)」を参照してください。

_エラーレスポンスの例_

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}