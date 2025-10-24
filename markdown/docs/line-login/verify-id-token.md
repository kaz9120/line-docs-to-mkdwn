---
url: https://developers.line.biz/ja/docs/line-login/verify-id-token/
copied_at: 2025-10-24T06:28:40.201Z
---
# IDトークンからプロフィール情報を取得する

LINEプラットフォームは、[OpenID Connect](https://openid.net/developers/how-connect-works/)仕様に準拠するIDトークンを発行しているため、LINEプラットフォームからユーザーの[プロフィール情報](https://developers.line.biz/ja/glossary/#profile-information)（ユーザーID・表示名・プロフィール画像・メールアドレス）を安全に取得できます。

所定の申請等を行った法人ユーザーは、[LINE Profile+](https://developers.line.biz/ja/glossary/#line-profile-plus)に登録された情報（氏名・性別・誕生日・電話番号・住所）も取得できます。詳しくは、「[LINE Profile+に登録されている情報を取得する](https://developers.line.biz/ja/docs/partner-docs/line-profile-plus/#getting-profile-plus)」を参照してください。

*   [IDトークンを取得する](#get-an-id-token)
*   [IDトークンについて](#id-tokens)
    *   [ヘッダー](#header)
    *   [ペイロード](#payload)
    *   [署名](#signature)
*   [IDトークンからプロフィール情報を取得する](#get-profile-info-from-id-token)

## IDトークンを取得する

[アクセストークンを取得する](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#get-access-token)ときに、IDトークンも取得できます。

> [!TIP]
> LIFFアプリでIDトークンを取得することもできます
> [liff.getIDToken()](https://developers.line.biz/ja/reference/liff/#get-id-token)を利用してIDトークンを取得することもできます。

## IDトークンについて

IDトークンは、ユーザー情報を含むJSONウェブトークン（JWT）です。IDトークンは、ピリオド（.）で区切られた[ヘッダー](#header)、[ペイロード](#payload)、および[署名](#signature)から構成されます。各部分はBase64URLでエンコードされています。詳しくは、[JWTの仕様](https://datatracker.ietf.org/doc/html/rfc7519)を参照してください。

アプリのセキュリティを保つために、署名を使ってIDトークンを検証する必要があります。LINEプラットフォームから直接取得したIDトークンでない限り、サーバーでIDトークンを検証してください。

IDトークンを検証するには、検証のためのコードを書くか、[IDトークンを検証する](https://developers.line.biz/ja/reference/line-login/#verify-id-token)エンドポイントを利用してください。エンドポイントを使用してIDトークンを検証する方法について詳しくは、「[IDトークンからプロフィール情報を取得する](#get-profile-info-from-id-token)」を参照してください。

### ヘッダー

ヘッダーには以下の値が含まれます。

| プロパティ | タイプ | 説明 |
| --- | --- | --- |
| `alg` | String | IDトークンの署名アルゴリズム。ネイティブアプリやLINE SDK、LIFFアプリに対しては`ES256`（ECDSA using P-256 and SHA-256）が、ウェブログインに対しては`HS256`（HMAC using SHA-256）が返されます。 |
| `type` | String | ペイロードの形式。`JWT`が返されます。 |
| `kid` | String | 公開鍵ID。`alg`の値が `ES256`の場合のみヘッダーに含まれます。`kid`プロパティについて詳しくは、『[JSON Web Key (JWK)のドキュメント](https://datatracker.ietf.org/doc/html/rfc7517#section-4.5)』を参照してください。 |

以下はデコードしたヘッダー部分の例です。

`alg`が`HS256`の場合：

json

`{   "typ": "JWT",  "alg": "HS256" }`

`alg`が`ES256`の場合：

json

`{   "typ": "JWT",  "alg": "ES256",  "kid": "a2a459aec5b65fa..." }`

### ペイロード

ユーザー情報はペイロード部分に含まれます。なお取得できる情報はメインプロフィールのみです。ユーザーの[サブプロフィール](https://developers.line.biz/ja/glossary/#subprofile)は取得できません。

| プロパティ | タイプ | 説明 |
| --- | --- | --- |
| `iss` | String | `https://access.line.me`。IDトークンの生成URLです。 |
| `sub` | String | IDトークンの対象ユーザーID |
| `aud` | String | チャネルID |
| `exp` | Number | IDトークンの有効期限。UNIX時間（秒）で返されます。 |
| `iat` | Number | IDトークンの生成時間。UNIX時間（秒）で返されます。 |
| `auth_time` | Number | ユーザー認証時間。UNIX時間（秒）で返されます。認可リクエストに`max_age`の値を指定しなかった場合は含まれません。 |
| `nonce` | String | 認可URLに指定した`nonce`の値。認可リクエストに`nonce`の値を指定しなかった場合は含まれません。 |
| `amr` | Stringの配列 | ユーザーが使用した認証方法のリスト。特定の条件下ではペイロードに含まれません。<br/>以下のいずれかの値が含まれます。<ul><!--[--><li><!--[--><code><!--[-->pwd<!--]--></code>：メールアドレスとパスワードによるログイン<!--]--></li><li><!--[--><code><!--[-->lineautologin<!--]--></code>：LINEによる自動ログイン（LINE SDKを使用した場合も含む）<!--]--></li><li><!--[--><code><!--[-->lineqr<!--]--></code>：QRコードによるログイン<!--]--></li><li><!--[--><code><!--[-->linesso<!--]--></code>：シングルサインオンによるログイン<!--]--></li><li><!--[--><code><!--[-->mfa<!--]--></code>：2要素認証によるログイン<!--]--></li><!--]--></ul>ユーザー認証について詳しくは、「[ユーザーがユーザー認証を行う](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#authentication-process)」を参照してください。また、2要素認証について詳しくは、「[2要素認証を必須化する](https://developers.line.biz/ja/docs/line-login/overview/#two-factor-authentication)」を参照してください。 |
| `name` | String | ユーザーの表示名。認可リクエストに`profile`スコープを指定しなかった場合は含まれません。 |
| `picture` | String | ユーザープロフィールの画像URL。認可リクエストに`profile`スコープを指定しなかった場合は含まれません。 |
| `email` | String | ユーザーのメールアドレス。認可リクエストに`email`スコープを指定しなかった場合は含まれません。 |
|  |  |  |

以下はデコードしたペイロード部分の例です。

json

`{   "iss": "https://access.line.me",  "sub": "U1234567890abcdef1234567890abcdef",  "aud": "1234567890",  "exp": 1504169092,  "iat": 1504263657,  "nonce": "0987654asdf",  "amr": ["pwd"],  "name": "Taro Line",  "picture": "https://sample_line.me/aBcdefg123456" }`

### 署名

署名は、Base64URLでエンコードされているヘッダー、およびペイロードをピリオドで繋げた文字列をハッシュ化した値です。IDトークンの改ざんを防止するために使用します。

ハッシュ化のアルゴリズムは、ヘッダーに含まれる`alg`プロパティで示されます。IDトークンの検証のために必要な鍵は、署名をハッシュ化した際のアルゴリズムごとに異なります。

| アルゴリズム | 検証のための鍵 |
| --- | --- |
| `ES256`（ECDSA using P-256 and SHA-256） | 『[JSON Web Key（JWK）ドキュメントURL](https://api.line.me/oauth2/v2.1/certs)』の中で、ヘッダーの`kid`プロパティを含む要素 |
| `HS256`（HMAC using SHA-256） | [チャネルシークレット](https://developers.line.biz/ja/glossary/#channel-secret) |

IDトークンの検証について詳しくは、『OpenID Connect Core 1.0』の「[ID Token Validation](https://openid.net/specs/openid-connect-core-1_0.html#IDTokenValidation)」を参照してください。

OpenIDプロバイダの情報は、『[OpenID Provider Configuration Document](https://access.line.me/.well-known/openid-configuration)』を参照してください。

## IDトークンからプロフィール情報を取得する

IDトークンに含まれる情報を使用する場合、検証のためのコードを書くか、LINEログインの[IDトークンを検証する](https://developers.line.biz/ja/reference/line-login/#verify-id-token)エンドポイントを利用してIDトークンを検証してください。

IDトークンを検証するエンドポイントを利用する場合、アクセストークンと一緒に取得したIDトークンと、LINEログインのチャネルIDをエンドポイントに送信するだけで、IDトークンを検証し、ユーザーのプロフィール情報とメールアドレスを取得できます。

リクエストの例：

sh

`curl -v -X POST 'https://api.line.me/oauth2/v2.1/verify' \  -d 'id_token=eyJraWQiOiIxNmUwNGQ0ZTU2NzgzYTc5MmRjYjQ2ODRkOD...' \ -d 'client_id=1234567890'`

レスポンスの例：

json

`{   "iss": "https://access.line.me",  "sub": "U1234567890abcdef1234567890abcdef",  "aud": "1234567890",  "exp": 1504169092,  "iat": 1504263657,  "nonce": "0987654asdf",  "amr": ["pwd"],  "name": "Taro Line",  "picture": "https://sample_line.me/aBcdefg123456",  "email": "taro.line@example.com" }`

詳しくは、『LINEログイン v2.1 APIリファレンス』の「[IDトークンを検証する](https://developers.line.biz/ja/reference/line-login/#verify-id-token)」を参照してください。

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}