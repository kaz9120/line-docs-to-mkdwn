---
url: https://developers.line.biz/ja/docs/partner-docs/line-profile-plus/
copied_at: 2025-10-23T16:02:26.294Z
---
# LINE Profile+

:::note warn
オプション機能を利用するには手続きが必要です

:::

LINE Profile+は、LINEユーザーのプロフィール情報を管理するサービスです。ユーザーがLINE Profile+に登録した情報は、通常の[プロフィール情報](https://developers.line.biz/ja/glossary/#profile-information)とは異なり、所定の申請等を行った法人ユーザーのみが取得できます。

*   [プロフィール情報とLINE Profile+の違い](#differences-between-profile-and-line-profile-plus)
*   [LINE Profile+に登録されている情報を取得する](#getting-profile-plus)
    *   [LIFFアプリおよびLINEミニアプリで取得する場合](#liff-mini)
    *   [LINEログインで取得する場合](#line-login)
*   [LINE Profile+のスコープの種類](#scope)
*   [IDトークンに含まれるLINE Profile+の情報](#id-token)
    *   [ペイロード](#payload)
    *   [ペイロードの例](#payload-example)

## プロフィール情報とLINE Profile+の違い

LINEのプロフィール情報とLINE Profile+の違いについて詳しくは、『LINEプラットフォームの基礎知識』の「[ユーザーのプロフィール情報を取得する](https://developers.line.biz/ja/docs/basics/user-profile/)」を参照してください。

*   [ユーザーのプロフィール情報とは](https://developers.line.biz/ja/docs/basics/user-profile/#what-is-profile)
*   [LINE Profile+](https://developers.line.biz/ja/docs/basics/user-profile/#what-is-line-profile-plus)

## LINE Profile+に登録されている情報を取得する

LIFFアプリおよびLINEミニアプリを利用するか、ご自身のウェブアプリにLINEログインを組み込むことで、LINE Profile+に登録されている情報を取得できます。

それぞれ以下の手順で、取得したい情報のスコープを指定し、LINE Profile+の情報を含むIDトークンのペイロードを取得します。

| 手順 | [LIFFアプリおよびLINEミニアプリで取得する場合](#liff-mini) | [LINEログインで取得する場合](#line-login) |
| --- | --- | --- |
| 1\. スコープを指定する | [LINE Developersコンソールでスコープを指定する](#liff-specify-scope) | [認可URLにスコープを指定する](#line-login-specify-scope) |
| 2\. IDトークンのペイロードを取得する | [liff.getDecodedIDToken()でIDトークンのペイロードを取得する](#liff-get-id-token) | [アクセストークン発行時に取得したIDトークンを検証してIDトークンのペイロードを取得する](#line-login-get-id-token) |
| 3\. LINE Profile+の情報を取得する | [IDトークンのペイロードからLINE Profile+の情報を取得する](#liff-get-profile-plus) | [IDトークンのペイロードからLINE Profile+の情報を取得する](#line-login-get-profile-plus) |

### LIFFアプリおよびLINEミニアプリで取得する場合

LIFFアプリおよびLINEミニアプリでLINE Profile+の情報を取得する場合は、事前に[LINE Developersコンソール](https://developers.line.biz/console/)で取得したい情報の[スコープ](#scope)を指定してから、IDトークンのペイロードを取得すると、ログイン中のユーザーのLINE Profile+の情報を取得できます。

#### 1\. LINE Developersコンソールでスコープを指定する

事前に取得したい情報のスコープを指定します。[LINE Developersコンソール](https://developers.line.biz/console/)で対象のチャネルを選択し、LINEログインチャネルの場合は［**LIFF**］タブ、LINEミニアプリチャネルの場合は［**ウェブアプリ設定**］タブの［**Scope**］セクションで使用したいスコープにチェックを入れます。

LINE Profile+で取得できるスコープの種類について詳しくは、「[LINE Profile+のスコープの種類](#scope)」を参照してください。

![profile plus scope](https://developers.line.biz/media/partner-docs/profile_plus_scopes.png)

:::note warn
openidを同時に指定してください

:::

#### 2\. liff.getDecodedIDToken()でIDトークンのペイロードを取得する

LIFF SDKの[`liff.getDecodedIDToken()`](https://developers.line.biz/ja/reference/liff/#get-decoded-id-token)メソッドを実行すると、LIFFアプリおよびLINEミニアプリにログイン中のユーザーのLINE Profile+の情報を含むデコードされたIDトークンのペイロードを取得できます。

IDトークンのペイロードを取得するコードの例：

javascript

`liff.init(() => {   const idToken = liff.getDecodedIDToken();  console.log(idToken); // print decoded idToken object });`

#### 3\. IDトークンのペイロードからLINE Profile+の情報を取得する

手順2で取得したIDトークンのペイロードに含まれたLINE Profile+の情報を確認します。

LINE Profile+の情報の例：

json

`"given_name": "ライン", "middle_name": "L", "family_name": "太郎", "gender": "male", "birthdate": "1990-01-01", "phone_number": "+81901111....", "address": {     "postal_code": "1028282",    "region": "東京都",    "locality": "千代田区紀尾井町",    "street_address": "1番3号",    "country": "JP" }`

IDトークンに含まれるLINE Profile+の情報について詳しくは、「[IDトークンに含まれるLINE Profile+の情報](#id-token)」を参照してください。

### LINEログインで取得する場合

ウェブアプリにLINEログイン v2.1を組み込んで、[IDトークン](https://developers.line.biz/ja/docs/line-login/verify-id-token/#id-tokens)を利用することで、LINE Profile+に登録されている情報を取得できます。

このページでは、LINE Profile+を利用するための追加情報のみを説明しています。LINEログイン v2.1を組み込む方法について詳しくは、「[ウェブアプリにLINEログインを組み込む](https://developers.line.biz/ja/docs/line-login/integrate-line-login/)」を参照してください。

:::note warn
注意

:::

#### 1\. 認可URLにスコープを指定する

認可URLの`scope`パラメータに専用のスコープを指定します。

LINE Profile+で取得できるスコープの種類について詳しくは、「[LINE Profile+のスコープの種類](#scope)」を参照してください。

クエリパラメータにLINE Profile+のスコープを指定した認可URLの例：

sh

`https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1234567890&redirect_uri=https%3A%2F%2Fexample.com%2Fauth%3Fkey%3Dvalue&state=123abc&scope=openid%20profile%20real_name%20gender%20birthdate%20phone%20address&bot_prompt=normal&nonce=0987654asd`

:::note warn
openidを同時に指定してください

:::

ユーザーが認可URLにアクセスしてからの動作については、「[ユーザーがユーザー認証を行う](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#authentication-process)」を参照してください。

#### 2\. アクセストークン発行時に取得したIDトークンを検証してIDトークンのペイロードを取得する

LINE Profile+に登録されている情報は、[IDトークン](https://developers.line.biz/ja/docs/line-login/verify-id-token/#id-tokens)に含まれます。IDトークンは、[アクセストークンを発行](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#get-access-token)したときにレスポンスに含まれます。

リクエストの例：

sh

`curl -v -X POST https://api.line.me/oauth2/v2.1/token \ -H 'Content-Type: application/x-www-form-urlencoded' \ -d 'grant_type=authorization_code' \ -d 'code=b5fd32eacc791df' \ --data-urlencode 'redirect_uri=https://example.com/auth?key=value' \ -d 'client_id=12345' \ -d 'client_secret=d6524edacc8742aeedf98f'`

[アクセストークンの発行](https://developers.line.biz/ja/reference/line-login/#issue-access-token)で取得したIDトークンはBase64形式でエンコード（例：eyJhbGciOiJIUzI1NiJ9...）されています。[IDトークンの検証](https://developers.line.biz/ja/reference/line-login/#verify-id-token)を実行することで、JSON形式にデコードされたIDトークンのペイロードを取得できます。

リクエストの例：

sh

`curl -v -X POST 'https://api.line.me/oauth2/v2.1/verify' \  -d 'id_token=eyJraWQiOiIxNmUwNGQ0ZTU2NzgzYTc5MmRjYjQ2ODRkOD...' \ -d 'client_id=1234567890'`

#### 3\. IDトークンのペイロードからLINE Profile+の情報を取得する

手順2で取得したIDトークンのペイロードに含まれたLINE Profile+の情報を確認します。

LINE Profile+の情報の例：

json

`"given_name": "ライン", "middle_name": "L", "family_name": "太郎", "gender": "male", "birthdate": "1990-01-01", "phone_number": "+81901111....", "address": {     "postal_code": "1028282",    "region": "東京都",    "locality": "千代田区紀尾井町",    "street_address": "1番3号",    "country": "JP" }`

IDトークンに含まれるLINE Profile+の情報について詳しくは、「[IDトークンに含まれるLINE Profile+の情報](#id-token)」を参照してください。

## LINE Profile+のスコープの種類

LINE Profile+で取得できる情報のスコープの種類は以下のとおりです。

*   `real_name`：ユーザーが登録した「氏名」を取得する権限
*   `gender`：ユーザーが登録した「性別」を取得する権限
*   `birthdate`： ユーザーが登録した「誕生日」を取得する権限
*   `phone`：ユーザーが登録した「電話番号」を取得する権限
*   `address`：ユーザーが登録した「住所」を取得する権限

:::note warn
注意

:::

## IDトークンに含まれるLINE Profile+の情報

LIFFアプリおよびLINEミニアプリやLINEログインで取得したIDトークンには、LINE Profile+の指定したスコープの情報がペイロードに含まれています。

#### ペイロード

LINE Profile+を利用しているときは、IDトークンに以下のプロパティが追加されます。

| プロパティ | タイプ | 説明 | 認可が必要なスコープ |
| --- | --- | --- | --- |
| `given_name` | String | 氏名の「名」 | `real_name` |
| `given_name_pronunciation` | String | 氏名の「名」のカナ。カタカナです。 | `real_name` |
| `middle_name` | String | ミドルネーム | `real_name` |
| `family_name` | String | 氏名の「姓」 | `real_name` |
| `family_name_pronunciation` | String | 氏名の「姓」のカナ。カタカナです。 | `real_name` |
| `gender` | String | "male"、"female"、もしくはユーザーが独自に入力した値 | `gender` |
| `birthdate` | String | 誕生日。形式は、[RFC3339プロトコル](https://www.ietf.org/rfc/rfc3339.txt)で定義されています。 | `birthdate` |
| `phone_number` | String | 電話番号。形式は、[E.164](https://developers.line.biz/ja/glossary/#e164)で定義されています。 | `phone` |
| `address` | Object | [住所オブジェクト](#address-object) | `address` |
|  |  |  |  |

##### 住所オブジェクト

LINE Profile+には、最大10件の住所を登録できます。IDトークンには、最近更新または利用された住所を1件のみ取得できます。

| フィールド | タイプ | 説明 |
| --- | --- | --- |
| `postal_code` | String | 郵便番号。ハイフンなしの半角数字です。オプション項目のため空の場合もあります。 |
| `region` | String | 都道府県 |
| `locality` | String | 市区町村 |
| `street_address` | String | 「番地」および「その他」に入力した値。「番地」と「その他」は改行コード（`\n`）で区切られます。オプション項目のため空の場合もあります。 |
| `country` | String | 国名。表記はISO 3166-1 alpha-2です。 |

#### ペイロードの例

json

`{   "iss": "https://access.line.me",  "sub": "U272cada9c6f4c0c933b0713bc2f90f68",  "aud": "1234567890",  "exp": 1513142487,  "iat": 1513138887,  "name": "LINE taro",  "picture": "https://profile.line-scdn.net/0h8pWWElvzZ19qLk3ywQYYCFZraTIdAGEXEhx9ak56MDxDHiUIVEEsPBspMG1EGSEPAk4uP01t0m5G",  "given_name": "ライン",  "middle_name": "L",  "family_name": "太郎",  "gender": "male",  "birthdate": "1990-01-01",  "phone_number": "+81901111....",  "address": {    "postal_code": "1028282",    "region": "東京都",    "locality": "千代田区紀尾井町",    "street_address": "1番3号",    "country": "JP"  } }`

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}