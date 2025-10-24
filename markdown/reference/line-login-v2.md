---
url: https://developers.line.biz/ja/reference/line-login-v2/
copied_at: 2025-10-24T06:28:47.573Z
---
# LINEログイン v2.0 APIリファレンス

> [!CAUTION]
> LINEログイン v2.0は非推奨です
> このページは旧バージョンのLINEログイン v2.0のAPIリファレンスです。LINEログイン v2.0は[非推奨](https://developers.line.biz/ja/glossary/#deprecated)であり、時期は未定ですが[廃止](https://developers.line.biz/ja/glossary/#end-of-life)を予定しているため、現行バージョン（LINEログイン v2.1）の利用を推奨します。なお廃止時期の告知から、実際の廃止までは一定の猶予期間を置く予定です。LINEログイン v2.1のAPIリファレンスは、「[LINEログイン v2.1 APIリファレンス](https://developers.line.biz/ja/reference/line-login/)」を参照してください。

## 共通仕様

### レート制限

LINEログインのAPIに対して短時間に大量のリクエストを送信し、LINEプラットフォームの動作に影響を与えると判断された場合、一時的にリクエストを制限することがあります。負荷テストを含め、いかなる目的でも大量のリクエストを送信しないでください。

> [!TIP]
> レート制限のしきい値について
> LINEログインのAPIにおけるレート制限のしきい値は開示していません。

### ステータスコード

APIコールの後で、以下のHTTPステータスコードが返されます。ステータスコードの説明は、特に断りがない限り、[HTTP status code specification](https://datatracker.ietf.org/doc/html/rfc7231#section-6)に準拠しています。

| ステータスコード | 説明 |
| --- | --- |
| 200 OK | リクエストが成功しました。 |
| 400 Bad Request | リクエストに問題があります。リクエストパラメータとJSONの形式を確認してください。 |
| 401 Unauthorized | Authorizationヘッダーを正しく送信していることを確認してください。 |
| 403 Forbidden | APIを使用する権限がありません。ご契約中のプランやアカウントに付与されている権限を確認してください。 |
| 413 Payload Too Large | リクエストのサイズが上限の2MBを超えています。リクエストのサイズを2MB以下にしてリクエストしなおしてください。 |
| 429 Too Many Requests | 大量のリクエストで[レート制限](#rate-limits)を超過したため、一時的にリクエストを制限しています。 |
| 500 Internal Server Error | APIサーバーの一時的なエラーです。 |

## OAuth

### アクセストークンを発行する

アクセストークンを発行します。

LINEログインAPIで管理するアクセストークンは、LINEプラットフォームに保存されているユーザー情報（例：ユーザーID、表示名、プロフィール画像、およびステータスメッセージ）を利用することを、アプリが許可されていることを示します。

レスポンスに含まれるアクセストークンとリフレッシュトークンは、LINEログインAPIを呼び出す際に必要です。

> [!WARNING]
> 注意
> ここでは、LINEログイン v2.0のエンドポイントについて解説します。v2.1については、v2.1の「[アクセストークンを発行する](https://developers.line.biz/ja/reference/line-login/#issue-access-token)」を参照してください。

_リクエストの例_

#### HTTPリクエスト

`POST https://api.line.me/v2/oauth/accessToken`

#### リクエストヘッダー

Content-Type

必須

application/x-www-form-urlencoded

#### リクエストボディ

grant\_type

String

必須

`authorization_code`

code

String

必須

LINEプラットフォームから受け取った[認可コード](https://developers.line.biz/ja/docs/line-login/integrate-line-login-v2/#receiving-the-authorization-code)

redirect\_uri

String

必須

コールバックURL

client\_id

String

必須

チャネルID。[LINE Developersコンソール](https://developers.line.biz/console/)で確認できます。

client\_secret

String

必須

チャネルシークレット。[LINE Developersコンソール](https://developers.line.biz/console/)で確認できます。

#### レスポンス

ステータスコード`200`と以下の情報を含むJSONオブジェクトを返します。

access\_token

String

アクセストークン。有効期間は30日です。

expires\_in

Number

アクセストークンの有効期限が切れるまでの秒数

refresh\_token

String

新しいアクセストークンを取得するためのトークン（リフレッシュトークン）。アクセストークンの有効期限が切れてから最長10日間有効です。

詳しくは、「[アクセストークンを更新する](#refresh-access-token)」を参照してください。

scope

String

アクセストークンに付与されている権限

*   `P`：ユーザーのプロフィール情報にアクセスできます。

token\_type

String

`Bearer`

_レスポンスの例_

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}

### アクセストークンの有効性を検証する

アクセストークンの有効性を検証します。

アクセストークンを利用して、安全にユーザー登録およびログインを処理する方法については、『LINEログインドキュメント』の「[アクセストークンを検証する](https://developers.line.biz/ja/docs/line-login/managing-access-tokens-v2/#verify-access-token)」を参照してください。

> [!WARNING]
> 注意
> ここでは、LINEログイン v2.0のエンドポイントについて解説します。v2.1については、v2.1の「[アクセストークンの有効性を検証する](https://developers.line.biz/ja/reference/line-login/#verify-access-token)」を参照してください。

_リクエストの例_

#### HTTPリクエスト

`POST https://api.line.me/v2/oauth/verify`

#### リクエストヘッダー

Content-Type

必須

application/x-www-form-urlencoded

#### リクエストボディ

access\_token

String

アクセストークン

#### レスポンス

アクセストークンが有効である場合は、HTTPステータスコード `200 OK` と、以下の情報を含むJSONオブジェクトが返されます。

scope

String

アクセストークンに付与されている権限

*   `P`：ユーザーのプロフィール情報にアクセスできます。

client\_id

String

アクセストークンが発行されたチャネルID

expires\_in

Number

アクセストークンの有効期限が切れるまでの秒数

_レスポンスの例_

#### エラーレスポンス

アクセストークンの有効期限が切れている場合は、HTTPステータスコード `400 Bad Request` と、JSONオブジェクトが返されます。

_エラーレスポンスの例_

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}

### アクセストークンを更新する

リフレッシュトークンを使って新しいアクセストークンを取得できます。 ユーザーの認証が終わったときに、アクセストークンと共にリフレッシュトークンが返されます。

> [!WARNING]
> 注意
> *   ここでは、LINEログイン v2.0のエンドポイントについて解説します。v2.1については、v2.1の「[アクセストークンを更新する](https://developers.line.biz/ja/reference/line-login/#refresh-access-token)」を参照してください。
> *   Messaging APIで使用されるチャネルアクセストークンの更新には使用できません。

_リクエストの例_

#### HTTPリクエスト

`POST https://api.line.me/v2/oauth/accessToken`

#### リクエストヘッダー

Content-Type

必須

application/x-www-form-urlencoded

#### リクエストボディ

grant\_type

String

`refresh_token`

refresh\_token

String

再発行するアクセストークンに対応するリフレッシュトークン。アクセストークンの有効期限が切れてから最長10日間有効です。リフレッシュトークンの有効期限が切れた場合は、ユーザーに再度ログインを要求して新しいアクセストークンを生成する必要があります。

client\_id

String

チャネルID。[LINE Developersコンソール](https://developers.line.biz/console/)で確認できます。

client\_secret

String

チャネルシークレット。[LINE Developersコンソール](https://developers.line.biz/console/)で確認できます。

#### レスポンス

アクセストークンの更新が成功すると、新しいアクセストークンとリフレッシュトークンが返されます。

token\_type

String

`Bearer`

scope

String

アクセストークンに付与されている権限

*   `P`：ユーザーのプロフィール情報にアクセスできます。

access\_token

String

アクセストークン

expires\_in

Number

アクセストークンの有効期限が切れるまでの秒数

refresh\_token

String

新しいアクセストークンを取得するためのトークン（リフレッシュトークン）。アクセストークンの有効期限が切れてから最長10日間有効です。

_レスポンスの例_

#### エラーレスポンス

リフレッシュトークンの有効期限が切れている場合は、HTTPステータスコード `400 Bad Request` と、JSONオブジェクトが返されます。

_エラーレスポンスの例_

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}

### アクセストークンを取り消す

ユーザーのアクセストークンを無効にします。

> [!WARNING]
> 注意
> *   ここでは、LINEログイン v2.0のエンドポイントについて解説します。v2.1については、v2.1の「[アクセストークンを取り消す](https://developers.line.biz/ja/reference/line-login/#revoke-access-token)」を参照してください。
> *   Messaging APIで使用されるチャネルアクセストークンの無効化には使用できません。

_リクエストの例_

#### HTTP request

`POST https://api.line.me/v2/oauth/revoke`

#### Request headers

Content-Type

必須

application/x-www-form-urlencoded

#### Request body

Request body は form-urlencoded フォーマットになります。

refresh\_token

String

無効化するアクセストークンのリフレッシュトークン

#### Response

ステータスコード`200`と空のレスポンスボディを返します。

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

## プロフィール

### ユーザープロフィールを取得する

ユーザーのユーザーID、表示名、プロフィール画像、およびステータスメッセージを取得します。

_リクエストの例_

#### HTTPリクエスト

`GET https://api.line.me/v2/profile`

#### リクエストヘッダー

Authorization

必須

Bearer `{access token}`

#### レスポンス

userId

String

ユーザーID

displayName

String

ユーザーの表示名

pictureUrl

String

プロフィール画像のURL。スキームはhttpsです。ユーザーがプロフィール画像を設定していない場合はレスポンスに含まれません。

プロフィール画像のサムネイル：

プロフィール画像のURLに、以下のサフィックスを付加すると、プロフィール画像のサムネイルを取得できます。

| サフィックス | サムネイルサイズ |
| --- | --- |
| `/large` | 200 x 200 |
| `/small` | 51 x 51 |

例：`https://profile.line-scdn.net/abcdefghijklmn/large`

statusMessage

String

ユーザーのステータスメッセージ。ユーザーがステータスメッセージを設定していない場合はレスポンスに含まれません。

_レスポンスの例_

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}