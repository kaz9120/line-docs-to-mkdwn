---
url: https://developers.line.biz/ja/reference/line-login/
copied_at: 2025-10-24T06:28:29.376Z
---
# LINEログイン v2.1 APIリファレンス

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

### レスポンスヘッダー

LINEログインAPIのレスポンスには、以下のHTTPヘッダーが含まれます。

| レスポンスヘッダー | 説明 |
| --- | --- |
| x-line-request-id | リクエストID。各リクエストごとに発行されるIDです。 |

## OAuth

### アクセストークンを発行する

```
POST
```

アクセストークンを発行します。

LINEログインAPIで管理するアクセストークンは、LINEプラットフォームに保存されているユーザー情報（例：ユーザーID、表示名、プロフィール画像、およびステータスメッセージ）を利用することを、アプリが許可されていることを示します。

レスポンスに含まれるアクセストークンとリフレッシュトークンは、LINEログインAPIを呼び出す際に必要です。

> [!WARNING]
> 注意
> *   ここでは、LINEログイン v2.1のエンドポイントについて解説します。v2.0については、v2.0の「[アクセストークンを発行する](https://developers.line.biz/ja/reference/line-login-v2/#issue-access-token)」を参照してください。
> *   LINEログイン機能に追加または変更があったときに、レスポンスやIDトークンのJSONオブジェクトの構造が変更される場合があります。この変更には、プロパティの追加、順序の変更、データの要素間の空白や改行の有無、データ長の変化が含まれます。将来、従来と異なる構造のペイロードを受信しても不具合が発生しないように、サーバーを実装してください。

_リクエストの例_

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

LINEプラットフォームから受け取った[認可コード](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#receiving-the-authorization-code)

redirect\_uri

String

必須

[認可リクエスト](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#making-an-authorization-request)時に指定した`redirect_uri`と同じ値

client\_id

String

必須

チャネルID。[LINE Developersコンソール](https://developers.line.biz/console/)で確認できます。

client\_secret

String

必須

チャネルシークレット。[LINE Developersコンソール](https://developers.line.biz/console/)で確認できます。

code\_verifier

String

任意

半角英数字および記号からなる43〜128文字のランダムな文字列（例：`wJKN8qz5t8SSI9lMFhBB6qwNkQBkuPZoCxzRhwLRUo1`）。  
LINEログインがPKCEを実装している場合、本パラメータを加えることで、LINEプラットフォーム側で`code_verifier`の有効性を検証したうえでアクセストークンを返却します。  
PKCEの実装方法について詳しくは、『LINEログインドキュメント』の「[LINEログインにPKCEを実装する](https://developers.line.biz/ja/docs/line-login/integrate-pkce/#how-to-integrate-pkce)」を参照してください。

#### レスポンス

ステータスコード`200`と以下の情報を含むJSONオブジェクトを返します。

access\_token

String

アクセストークン。有効期間は30日です。

expires\_in

Number

アクセストークンの有効期限が切れるまでの秒数

id\_token

String

ユーザー情報を含む[JSONウェブトークン（JWT）](https://datatracker.ietf.org/doc/html/rfc7519)。このプロパティは、スコープに`openid`を指定した場合にのみ返されます。IDトークンについて詳しくは、「[IDトークンからプロフィール情報を取得する](https://developers.line.biz/ja/docs/line-login/verify-id-token/)」を参照してください。

refresh\_token

String

新しいアクセストークンを取得するためのトークン（リフレッシュトークン）。アクセストークンが発行されてから90日間有効です。

詳しくは、「[アクセストークンを更新する](#refresh-access-token)」を参照してください。

scope

String

アクセストークンに付与されている権限。スコープについて詳しくは、「[スコープ](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#scopes)」を参照してください。

注意：`email`スコープは権限が付与されていても`scope`プロパティの値としては返されません。

token\_type

String

`Bearer`

_レスポンスの例_

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}

### アクセストークンの有効性を検証する

アクセストークンの有効性を検証します。

アクセストークンを利用して、安全にユーザー登録およびログインを処理する方法については、『LINEログインドキュメント』の「[アプリとサーバーの間で安全なログインプロセスを構築する](https://developers.line.biz/ja/docs/line-login/secure-login-process/)」を参照してください。

> [!WARNING]
> 注意
> ここでは、LINEログイン v2.1のエンドポイントについて解説します。v2.0については、v2.0の「[アクセストークンの有効性を検証する](https://developers.line.biz/ja/reference/line-login-v2/#verify-access-token)」を参照してください。

_リクエストの例_

#### HTTPリクエスト

`GET https://api.line.me/oauth2/v2.1/verify`

#### クエリパラメータ

access\_token

必須

アクセストークン

#### レスポンス

アクセストークンが有効である場合は、HTTPステータスコード `200 OK` と、以下の情報を含むJSONオブジェクトが返されます。

scope

String

アクセストークンに付与されている権限。スコープについて詳しくは、「[スコープ](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#scopes)」を参照してください。

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

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}

### アクセストークンを更新する

リフレッシュトークンを使って新しいアクセストークンを取得できます。

ユーザーの認証が終わったときに、アクセストークンと共にリフレッシュトークンが返されます。

> [!WARNING]
> 注意
> *   ここでは、LINEログイン v2.1のエンドポイントについて解説します。v2.0については、v2.0の「[アクセストークンを更新する](https://developers.line.biz/ja/reference/line-login-v2/#refresh-access-token)」を参照してください。
> *   Messaging APIで使用されるチャネルアクセストークンの更新には使用できません。

_リクエストの例_

#### HTTPリクエスト

`POST https://api.line.me/oauth2/v2.1/token`

#### リクエストヘッダー

Content-Type

必須

application/x-www-form-urlencoded

#### リクエストボディ

grant\_type

String

必須

`refresh_token`

refresh\_token

String

必須

再発行するアクセストークンに対応するリフレッシュトークン。アクセストークンが発行されてから最長90日間有効です。リフレッシュトークンの有効期限が切れた場合は、ユーザーに再度ログインを要求して新しいアクセストークンを生成する必要があります。

client\_id

String

必須

チャネルID。[LINE Developersコンソール](https://developers.line.biz/console/)で確認できます。

client\_secret

String

説明を参照

チャネルシークレット。[LINE Developersコンソール](https://developers.line.biz/console/)で確認できます。

*   アプリタイプが［**ウェブアプリ**］のみのチャネルでは必須です。
*   アプリタイプが［**ネイティブアプリ**］かつ［**ウェブアプリ**］のチャネルでは無視されます。
*   アプリタイプが［**ネイティブアプリ**］のみのチャネルでは無視されます。

#### レスポンス

アクセストークンの更新が成功すると、新しいアクセストークンとリフレッシュトークンが返されます。

access\_token

String

アクセストークン。有効期間は30日です。

token\_type

String

`Bearer`

refresh\_token

String

リクエスト時に`refresh_token`プロパティで指定したリフレッシュトークン。新しいアクセストークンを取得しても、リフレッシュトークンの有効期間は延長されません。

expires\_in

Number

アクセストークンの有効期間。APIが呼び出された時点から期限切れまでの残り秒数で表されます。

scope

String

アクセストークンに付与されている権限。スコープについて詳しくは、「[スコープ](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#scopes)」を参照してください。

_レスポンスの例_

#### エラーレスポンス

リフレッシュトークンの有効期限が切れている場合は、HTTPステータスコード `400 Bad Request` と、JSONオブジェクトが返されます。

_エラーレスポンスの例_

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}

### アクセストークンを取り消す

ユーザーのアクセストークンを無効にします。

> [!WARNING]
> 注意
> *   ここでは、LINEログイン v2.1のエンドポイントについて解説します。v2.0については、v2.0の「[アクセストークンを取り消す](https://developers.line.biz/ja/reference/line-login-v2/#revoke-access-token)」を参照してください。
> *   Messaging APIで使用されるチャネルアクセストークンの無効化には使用できません。

_リクエストの例_

#### HTTPリクエスト

`POST https://api.line.me/oauth2/v2.1/revoke`

#### リクエストヘッダー

Content-Type

必須

application/x-www-form-urlencoded

#### リクエストボディ

access\_token

String

必須

アクセストークン

client\_id

String

必須

チャネルID。[LINE Developersコンソール](https://developers.line.biz/console/)で確認できます。

client\_secret

String

説明を参照

チャネルシークレット。[LINE Developersコンソール](https://developers.line.biz/console/)で確認できます。

*   アプリタイプが［**ウェブアプリ**］のみのチャネルでは必須です。
*   アプリタイプが［**ネイティブアプリ**］かつ［**ウェブアプリ**］のチャネルでは無視されます。
*   アプリタイプが［**ネイティブアプリ**］のみのチャネルでは無視されます。

#### レスポンス

ステータスコード`200`と空のレスポンスボディを返します。

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

### 連動アプリに認可した権限を取り消す

ユーザーが連動アプリに対して認可した権限を、ユーザーの代わりに取り消します。詳しくは、[LINEログイン開発ガイドライン](https://developers.line.biz/ja/docs/line-login/development-guidelines/)の必須事項である「[ユーザー退会時の連動アプリに対する権限取消](https://developers.line.biz/ja/docs/line-login/development-guidelines/#deauthorize)」を参照してください。

なお、LIFFアプリやLINEミニアプリもこのエンドポイントで権限を取り消すことができます。

連動アプリに対して認可した権限をユーザー自身が取り消す方法については、『LINEログインドキュメント』の「[ユーザーによる連動アプリの管理について](https://developers.line.biz/ja/docs/line-login/managing-authorized-apps/)」を参照してください。

_リクエストの例_

#### HTTPリクエスト

`POST https://api.line.me/user/v1/deauthorize`

#### リクエストヘッダー

Authorization

必須

Bearer `{channel access token}`

利用できるチャネルアクセストークンの種類は、以下のとおりです。

*   [任意の有効期間を指定できるチャネルアクセストークン（チャネルアクセストークンv2.1）](https://developers.line.biz/ja/docs/basics/channel-access-token/#user-specified-expiration)
*   [ステートレスチャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/#stateless-channel-access-token)

チャネルアクセストークンの発行方法について詳しくは、『LINEプラットフォームの基礎知識』の「[チャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/)」を参照してください。

#### リクエストボディ

userAccessToken

String

必須

対象ユーザーのアクセストークン

#### レスポンス

ステータスコード`204`と空のレスポンスボディを返します。

#### エラーレスポンス

以下のHTTPステータスコードと、エラーレスポンスを返します。

| コード | 説明 |
| --- | --- |
| `400` | 対象ユーザーのアクセストークンが無効です。次のような理由が考えられます。<ul><!--[--><li><!--[-->ユーザーがアプリに対する権限を既に取り消している。<!--]--></li><li><!--[-->ユーザーに代わって、既にAPIでアプリに対する権限を取り消している。<!--]--></li><!--]--></ul> |

_エラーレスポンスの例_

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}

### IDトークンを検証する

IDトークンは、ユーザー情報を含むJSONウェブトークン（JWT）です。受信した[IDトークン](https://developers.line.biz/ja/docs/line-login/verify-id-token/#id-tokens)は、なりすましを狙った攻撃者が発行している可能性があります。受信したIDトークンが正規のものであることを確認し、ユーザーのプロフィール情報とメールアドレスを取得します。

_リクエストの例_

#### HTTPリクエスト

`POST https://api.line.me/oauth2/v2.1/verify`

#### リクエストヘッダー

Content-Type

必須

application/x-www-form-urlencoded

#### リクエストボディ

id\_token

String

必須

IDトークン

client\_id

String

必須

期待されるチャネルID。LINEプラットフォームが発行した、チャネル固有の識別子。[LINE Developersコンソール](https://developers.line.biz/console/)で確認できます。

nonce

String

任意

期待されるnonceの値。認可リクエストに指定したnonceの値を指定します。認可リクエストでnonceの値を指定しなかった場合は省略します。

user\_id

String

任意

期待されるユーザーID。ユーザーIDを取得する方法は、「[ユーザープロフィールを取得する](https://developers.line.biz/ja/reference/line-login/#get-user-profile)」を参照してください。

#### レスポンス

IDトークンの検証に成功した場合は、IDトークンのペイロード部分が返されます。

iss

String

IDトークンの生成URL

sub

String

IDトークンの対象ユーザーID

aud

String

チャネルID

exp

Number

IDトークンの有効期限。UNIX時間（秒）で返されます。

iat

Number

IDトークンの生成時間。UNIX時間（秒）で返されます。

auth\_time

Number

ユーザー認証時間。UNIX時間（秒）で返されます。認可リクエストにmax\_ageの値を指定しなかった場合は含まれません。

nonce

String

認可URLに指定したnonceの値。認可リクエストにnonceの値を指定しなかった場合は含まれません。

amr

Array of strings

ユーザーが使用した認証方法のリスト。特定の条件下ではペイロードに含まれません。

以下のいずれかの値が含まれます。

*   `pwd`：メールアドレスとパスワードによるログイン
*   `lineautologin`：LINEによる自動ログイン（LINE SDKを使用した場合も含む）
*   `lineqr`：QRコードによるログイン
*   `linesso`：シングルサインオンによるログイン
*   `mfa`：2要素認証によるログイン

name

String

ユーザーの表示名。認可リクエストに`profile`スコープを指定しなかった場合は含まれません。

picture

String

ユーザープロフィールの画像URL。認可リクエストに`profile`スコープを指定しなかった場合は含まれません。

email

String

ユーザーのメールアドレス。認可リクエストに`email`スコープを指定しなかった場合は含まれません。

_レスポンスの例_

#### エラーレスポンス

IDトークンの検証に失敗した場合は、JSONオブジェクトが返されます。

| error\_description | 説明 |
| --- | --- |
| Invalid IdToken. | IDトークンの形式が正しくないか、署名が無効です。 |
| Invalid IdToken Issuer. | IDトークンが "[https://access.line.me](https://access.line.me)" 以外のサイトで生成されました。 |
| IdToken expired. | IDトークンの有効期限が切れました。 |
| Invalid IdToken Audience. | IDトークンのAudienceが、リクエストで指定したclient\_idと異なります。 |
| Invalid IdToken Nonce. | IDトークンのNonceが、リクエストで指定したnonceと異なります。 |
| Invalid IdToken Subject Identifier. | IDトークンのSubjectIdentifierは、リクエストで指定したuser\_idと異なります。 |

_エラーレスポンスの例_

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}

### ユーザー情報を取得する

ユーザーのユーザーID、表示名、プロフィール画像を取得します。「[ユーザープロフィールを取得する](#get-user-profile)」エンドポイントとは、アクセストークンに必要なスコープが異なります。

なお取得できる情報はメインプロフィールのみです。ユーザーの[サブプロフィール](https://developers.line.biz/ja/glossary/#subprofile)は取得できません。

> [!WARNING]
> 注意
> `openid`のスコープを持つアクセストークンが必要です。詳しくは、『LINEログインドキュメント』の「[ユーザーに認証と認可を要求する](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#making-an-authorization-request)」と「[スコープ](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#scopes)」を参照してください。

_リクエストの例_

#### HTTPリクエスト

`GET https://api.line.me/oauth2/v2.1/userinfo`

`POST https://api.line.me/oauth2/v2.1/userinfo`

#### リクエストヘッダー

Authorization

必須

Bearer `{access token}`

#### レスポンス

sub

String

ユーザーID

name

String

ユーザーの表示名。認可リクエストに`profile`スコープを指定しなかった場合は含まれません。

picture

String

ユーザープロフィールの画像URL。認可リクエストに`profile`スコープを指定しなかった場合は含まれません。

_レスポンスの例_

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}

## プロフィール

### ユーザープロフィールを取得する

ユーザーのユーザーID、表示名、プロフィール画像、およびステータスメッセージを取得します。「[ユーザー情報を取得する](#userinfo)」エンドポイントとは、アクセストークンに必要なスコープが異なります。

なお取得できる情報はメインプロフィールのみです。ユーザーの[サブプロフィール](https://developers.line.biz/ja/glossary/#subprofile)は取得できません。

> [!WARNING]
> 注意
> `profile`のスコープを持つアクセストークンが必要です。詳しくは、『LINEログインドキュメント』の「[ユーザーに認証と認可を要求する](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#making-an-authorization-request)」と「[スコープ](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#scopes)」を参照してください。

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

## 友だち関係

### LINE公式アカウントとの友だち関係を取得する

LINEログインのチャネルにリンクされているLINE公式アカウントと、ユーザーの友だち関係を取得します。

友だち追加オプションの使用方法について詳しくは、『LINEログインドキュメント』の「[LINEログインしたときにLINE公式アカウントを友だち追加する（友だち追加オプション）](https://developers.line.biz/ja/docs/line-login/link-a-bot/)」を参照してください。

_リクエストの例_

#### HTTPリクエスト

`GET https://api.line.me/friendship/v1/status`

#### リクエストヘッダー

Authorization

必須

Bearer `{access token}`

> [!WARNING]
> 注意
> `profile`のスコープを持つアクセストークンが必要です。詳しくは、『LINEログインドキュメント』の「[ユーザーに認証と認可を要求する](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#making-an-authorization-request)」と「[スコープ](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#scopes)」を参照してください。

#### レスポンス

friendFlag

Boolean

*   `true`：ユーザーがLINE公式アカウントを友だち追加済みで、ブロックしていない。
*   `false`：それ以外の場合。

_レスポンスの例_

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}