---
url: https://developers.line.biz/ja/reference/line-mini-app/
copied_at: 2025-10-24T10:16:42.164Z
---
# LINEミニアプリ APIリファレンス

## サービスメッセージ

> [!TIP]
> 認証済ミニアプリでのみ利用できます
> この機能は、認証済ミニアプリでのみ利用できます。未認証ミニアプリの場合、開発用の内部チャネルではテストできますが、公開用の内部チャネルでは利用できません。

サービスメッセージAPIを使用すると、サービスからLINEミニアプリのユーザーに、サービスメッセージを送信できます。

サービスメッセージを送信するには、サービス通知トークンと[テンプレート](https://developers.line.biz/ja/docs/line-mini-app/develop/service-messages/#service-message-templates)が必要です。

*   [サービス通知トークンを発行する](#issue-notification-token)
*   [サービスメッセージを送信する](#send-service-message)

### サービス通知トークンを発行する

サービス通知トークンを発行します。サービス通知トークンを使用すると、紐づけられたユーザーに対してサービスメッセージを送信できます。

サービス通知トークンの特徴は以下のとおりです。

*   サービス通知トークンは、発行から1年間（31,536,000秒間）有効です。有効期限が切れるまでに、最大5回サービスメッセージを送信できます。
*   サービス通知トークンを使用すると、有効期限が切れておらず、残りの送信可能回数が0でない場合は、サービス通知トークンの値が更新されます。ユーザーに対して、後続のサービスメッセージを送信する場合は、更新後のサービス通知トークンを保存してください。

> [!CAUTION]
> 1つのアクセストークンで複数のサービス通知トークンを発行しないでください
> [`liff.getAccessToken()`](https://developers.line.biz/ja/reference/liff/#get-access-token)で取得したアクセストークン（LIFFのアクセストークン）を再利用して、複数のサービス通知トークンを発行することは許可されていません。
> 
> LIFFのアクセストークン1つにつき、発行できるサービス通知トークンは1つだけです。

> [!WARNING]
> 注意
> サービス通知トークンは、一人のユーザーに紐づいています。あるユーザーに紐づいたサービス通知トークンを利用して、ほかのユーザーにサービスメッセージを送信することはできません。

_リクエストの例_

#### HTTPリクエスト

`POST https://api.line.me/message/v3/notifier/token`

#### リクエストヘッダー

Content-Type

必須

application/json

Authorization

必須

Bearer `{channel access token}`  
詳しくは、「[チャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/)」を参照してください。

> [!WARNING]
> ステートレスチャネルアクセストークンの使用を推奨します
> LINEミニアプリチャネルでは、[長期のチャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/#long-lived-channel-access-token)および、[任意の有効期間を指定できるチャネルアクセストークン（チャネルアクセストークンv2.1）](https://developers.line.biz/ja/docs/basics/channel-access-token/#user-specified-expiration)は使用できません。
> 
> LINEミニアプリの開発では、[ステートレスチャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/#stateless-channel-access-token)または[短期のチャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/#short-lived-channel-access-token)を使用できます。このうち、ステートレスチャネルアクセストークンの使用を推奨します。ステートレスチャネルアクセストークンは、発行数に制限がないため、アプリケーション側でトークンのライフサイクルを管理する必要がありません。

#### リクエストボディ

liffAccessToken

String

必須

[`liff.getAccessToken()`](https://developers.line.biz/ja/reference/liff/#get-access-token)で取得したアクセストークン（LIFFのアクセストークン）

#### レスポンス

ステータスコード`200`と以下の情報を含むJSONオブジェクトを返します。

notificationToken

String

サービス通知トークン

expiresIn

Number

サービス通知トークンの有効期限が切れるまでの秒数。サービス通知トークンは、発行から1年間（31,536,000秒間）有効です。

remainingCount

Number

発行されたサービス通知トークンで、サービスメッセージを送信できる回数

sessionId

String

セッションID。詳しくは、「[サービスメッセージを送信する](https://developers.line.biz/ja/docs/line-mini-app/develop/service-messages/)」を参照してください。

_レスポンスの例_

#### エラーレスポンス

以下のいずれかのステータスコードとエラーメッセージを返します。

| ステータスコード | 説明 |
| --- | --- |
| 400 Bad request | 以下のいずれかです。<ul><li>リクエストボディに問題があります。</li><li><code>liffAccessToken</code>プロパティに指定したLIFFのアクセストークンを使用して、サービス通知トークンの発行が短時間に連続してリクエストされました。</li></ul> |
| 401 Unauthorized | 以下のいずれか、または両方です。<ul><li>有効なチャネルアクセストークンが指定されていません。</li><li>有効なLIFFのアクセストークンが指定されていません。</li><ul><li>ユーザーが<a href="/ja/docs/liff/developing-liff-apps/#behavior-when-closing-liff-app" class="">LIFFアプリを閉じる</a>と、有効期限が切れていなくてもアクセストークンは無効化されます。</li></ul></ul> |
| 403 Forbidden | このチャネルには、サービス通知トークンを発行する許可が与えられていません。 |
| 500 Internal Server Error | 内部サーバーのエラーです。 |

_エラーレスポンスの例_

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}

### サービスメッセージを送る

サービス通知トークンで指定されたユーザーに、サービスメッセージを送信します。

サービスメッセージを送信すると、有効期限が切れておらず、残りの送信可能回数が0でない場合は、サービス通知トークンの値が更新されます。ユーザーに対して、後続のサービスメッセージを送信する予定がある場合は、更新後のサービス通知トークンを保存してください。

_リクエストの例_

#### HTTPリクエスト

`POST https://api.line.me/message/v3/notifier/send`

#### リクエストヘッダー

Content-Type

必須

application/json

Authorization

必須

Bearer `{channel access token}`  
詳しくは、『LINEプラットフォームの基礎知識』の「[チャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/)」を参照してください。

> [!WARNING]
> ステートレスチャネルアクセストークンの使用を推奨します
> LINEミニアプリチャネルでは、[長期のチャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/#long-lived-channel-access-token)および、[任意の有効期間を指定できるチャネルアクセストークン（チャネルアクセストークンv2.1）](https://developers.line.biz/ja/docs/basics/channel-access-token/#user-specified-expiration)は使用できません。
> 
> LINEミニアプリの開発では、[ステートレスチャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/#stateless-channel-access-token)または[短期のチャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/#short-lived-channel-access-token)を使用できます。このうち、ステートレスチャネルアクセストークンの使用を推奨します。ステートレスチャネルアクセストークンは、発行数に制限がないため、アプリケーション側でトークンのライフサイクルを管理する必要がありません。

#### クエリパラメータ

target

必須

`service`

#### リクエストボディ

templateName

String

必須

サービスメッセージに使用する、事前登録済みテンプレートの名前。BCP 47言語タグを末尾に追加してください。  
フォーマット：`{template name}_{BCP 47 language tag}`  
最大文字数：30

> [!WARNING]
> 注意
> サービスメッセージでサポートしている言語と言語タグは、以下のとおりです。
> 
> *   アラビア語：`ar`
> *   中国語（簡体字）：`zh-CN`
> *   中国語（繁体字）：`zh-TW`
> *   英語：`en`
> *   フランス語：`fr`
> *   ドイツ語：`de`
> *   インドネシア語：`id`
> *   イタリア語：`it`
> *   日本語：`ja`
> *   韓国語：`ko`
> *   マレー語：`ms`
> *   ポルトガル語（ブラジル）：`pt-BR`
> *   ポルトガル語（ポルトガル）：`pt-PT`
> *   ロシア語：`ru`
> *   スペイン語（スペイン）：`es-ES`
> *   タイ語：`th`
> *   トルコ語：`tr`
> *   ベトナム語：`vi`

params

object

必須

テンプレート変数と値のペアを指定するJSONオブジェクト。  
テンプレートにテンプレート変数がない場合は、空のJSONオブジェクト（`{ }`）を指定します。  
テンプレート変数は、テンプレートごとに定義されています。必須の要素にテンプレート変数が含まれる場合は、必ずテンプレート変数と値のペアを指定してください。  
詳しくは、「[サービスメッセージのテンプレートを追加する](https://developers.line.biz/ja/docs/line-mini-app/develop/service-messages/#service-message-templates)」を参照してください。

notificationToken

String

必須

サービス通知トークン

#### レスポンス

ステータスコード`200`と以下の情報を含むJSONオブジェクトを返します。

notificationToken

String

更新後のサービス通知トークン。このサービス通知トークンを使用して、後続のサービスメッセージを送信します。

expiresIn

Number

更新後のサービス通知トークンの有効期限が切れるまでの秒数

remainingCount

Number

更新後のサービス通知トークンで、後続のサービスメッセージを送信できる回数

sessionId

String

セッションID。詳しくは、「[サービスメッセージを送信する](https://developers.line.biz/ja/docs/line-mini-app/develop/service-messages/)」を参照してください。

> [!WARNING]
> 注意
> `expiresIn`および`remainingCount`の値が`0`の場合は、サービスメッセージは送信されたが、サービス通知トークンが更新できなかったことを示します。

_レスポンスの例_

#### エラーレスポンス

以下のいずれかのステータスコードとエラーメッセージを返します。

| ステータスコード | 説明 |
| --- | --- |
| 400 Bad request | 以下のいずれかです。<ul><li>リクエストボディに問題があります。</li><li>サービスメッセージ送信対象のユーザーが存在しません。</li></ul> |
| 401 Unauthorized | 以下のいずれか、または両方です。<ul><li>有効なチャネルアクセストークンが指定されていません。</li><li>有効なサービス通知トークンが指定されていません。</li></ul> |
| 403 Forbidden | 以下のいずれかです。<ul><li>このチャネルには、サービスメッセージを送信する許可が与えられていません。</li><li>指定されたテンプレートが見つかりません。</li></ul> |
| 500 Internal Server Error | 内部サーバーのエラーです。 |

_エラーレスポンスの例_

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}

## 共通プロフィールのクイック入力

> [!TIP]
> 認証済ミニアプリでのみ利用できます
> 共通プロフィールのクイック入力を利用するには、LINEミニアプリが認証済みであり、かつ[利用申請](https://developers.line.biz/ja/docs/line-mini-app/quick-fill/overview/#step-one-quick-fill-application)が完了している必要があります。

クイック入力とは、LINEミニアプリ上で［**自動入力**］をタップすることで、必要なプロフィール情報が自動で入力される機能です。ユーザーがアカウントセンターで設定した共通プロフィールの情報が、LINEミニアプリで簡単に利用できます。詳しくは、「[共通プロフィールのクイック入力の概要](https://developers.line.biz/ja/docs/line-mini-app/quick-fill/overview/)」を参照してください。

### liff.$commonProfile.get()

ユーザーがアカウントセンターで設定している共通プロフィールの情報を取得します。

`liff.$commonProfile.get()`メソッドを実行すると、ユーザーがプロフィールの情報を確認するためのモーダルが表示されます。表示されたモーダルでプロフィールを確認後、ユーザーが［**自動で入力する**］をタップすると、共通プロフィールの情報を取得できます。

モーダルの表示例：

![](https://developers.line.biz/media/line-mini-app/quick-fill/quick-fill-modal-screen.png)

_例_

#### 構文

```javascript
liff.$commonProfile.get(scopes, options);
```

#### 引数

scopes

Array of strings

必須

取得したい共通プロフィールのスコープを指定します。

`scopes`に指定できる値については、「[取得できる共通プロフィールのスコープと戻り値](https://developers.line.biz/ja/docs/line-mini-app/quick-fill/overview/#common-profile-scope)」を参照してください。

options

Object

任意

共通プロフィールの情報を取得するときのオプション

options.formatOptions

Object

任意

情報の形式に関するオプション。`scopes`プロパティで指定した各スコープに対して、[`formatOptions`オブジェクト](#get-common-profile-format-options)を指定します。

キーには、オプションを設定したいスコープをキャメルケース形式で指定します。たとえば、スコープが`given-name`のとき、キーは`givenName`になります。

#### formatOptionsオブジェクト

excludeEmojis

Boolean

任意

文字列内の絵文字を削除するかどうか。デフォルトは`true`です。以下のスコープにのみ指定できます。

*   givenName
*   familyName

excludeNonJp

Boolean

任意

12桁以上の電話番号を排除するかどうか。デフォルトは`true`です。`true`の場合、電話番号が12桁以上のときは、空文字とエラー情報を返します。以下のスコープにのみ指定できます。

*   tel

digitsOnly

Boolean

任意

数字以外の郵便番号を排除するかどうか。デフォルトは`true`です。`true`の場合、郵便番号に数字以外が含まれているときは、空文字とエラー情報を返します。以下のスコープにのみ指定できます。

*   postalCode

_例_

#### 戻り値

`{ data: Partial<CommonProfile>, error: Partial<CommonProfileError>}`型の`Promise`オブジェクトが返されます。

`Promise`がresolveされると、`data`プロパティにユーザーの共通プロフィール情報を含む`Partial<CommonProfile>`型、`error`プロパティにエラー情報を含む`Partial<CommonProfileError>`型のオブジェクトが渡されます。

次のような場合、`data`が持つプロパティは`undefined`もしくは`null`になります。

*   `undefined`になるケース
    *   引数の`scopes`で対象の項目を指定していない場合
    *   引数の`scopes`で対象の項目を指定したが、ユーザーがその項目の権限を許可していない場合
*   `null`になるケース
    *   ユーザーが共通プロフィールで対象の項目に値を設定していない場合
    *   共通プロフィールで対象の項目を取得する時にエラーが発生した場合

指定したスコープに応じて取得できるプロパティの値については、「[取得できる共通プロフィールのスコープと戻り値](https://developers.line.biz/ja/docs/line-mini-app/quick-fill/overview/#common-profile-scope)」を参照してください。

_`Partial<CommonProfile>`型のオブジェクトの例_

_`Partial<CommonProfileError>`型のオブジェクトの例_

#### エラーレスポンス

`Promise`がrejectされたときは、[`LiffError`](https://developers.line.biz/ja/reference/liff/#liff-errors)が渡されます。

_プラグインを正しくインストールせずにAPIを呼んだ場合の例_

_LIFFブラウザ以外でAPIが呼ばれた場合の例_

### liff.$commonProfile.getDummy()

共通プロフィールのダミーデータを取得します。10種類のダミーデータが用意されており、`caseId`によって取得するダミーデータを指定できます。

`liff.$commonProfile.getDummy()`メソッドを実行すると、プロフィールの情報を確認するためのモーダルが表示されます。［**自動で入力する**］をタップすると、共通プロフィールのダミーデータを取得できます。

モーダルの表示例：

![](https://developers.line.biz/media/line-mini-app/quick-fill/quick-fill-dummy-modal-screen.png)

_例_

#### 構文

```javascript
liff.$commonProfile.getDummy(scopes, options, caseId);
```

#### 引数

scopes

Array of strings

必須

取得したい共通プロフィールのスコープを指定します。

`scopes`に指定できる値については、「[取得できる共通プロフィールのスコープと戻り値](https://developers.line.biz/ja/docs/line-mini-app/quick-fill/overview/#common-profile-scope)」を参照してください。

options

Object

任意

共通プロフィールの情報を取得するときのオプション

options.formatOptions

Object

任意

情報の形式に関するオプション。`scopes`プロパティで指定した各スコープに対して、[`formatOptions`オブジェクト](#get-common-profile-format-options)を指定します。

キーには、オプションを設定したいスコープをキャメルケース形式で指定します。たとえば、スコープが`given-name`のとき、キーは`givenName`になります。

caseId

number

必須

取得したいダミーデータのIDを指定します。IDが`1`から`10`までのダミーデータが用意されています。

`caseId`ごとのダミーデータについては、「[取得できる共通プロフィールのダミーデータ](https://developers.line.biz/ja/docs/line-mini-app/quick-fill/overview/#get-dummy-common-profile)」を参照してください。

#### 戻り値

`{ data: Partial<CommonProfile>, error: Partial<CommonProfileError>}`型の`Promise`オブジェクトが返されます。

`Promise`がresolveされると、`data`プロパティにダミーデータを含む`Partial<CommonProfile>`型、`error`プロパティにエラー情報を含む`Partial<CommonProfileError>`型のオブジェクトが渡されます。

次のような場合、`data`が持つプロパティは`undefined`もしくは`null`になります。

*   `undefined`になるケース
    *   引数の`scopes`で対象の項目を指定していない場合
*   `null`になるケース
    *   ダミーデータで対象の項目に値が設定されていない場合

指定したIDに応じて取得できるダミーデータについては、「[取得できる共通プロフィールのダミーデータ](https://developers.line.biz/ja/docs/line-mini-app/quick-fill/overview/#get-dummy-common-profile)」を参照してください。

_`Partial<CommonProfile>`型のオブジェクトの例_

_`Partial<CommonProfileError>`型のオブジェクトの例_

##### エラーレスポンス

`Promise`がrejectされたときは、[`LiffError`](https://developers.line.biz/ja/reference/liff/#liff-errors)が渡されます。

_プラグインを正しくインストールせずにAPIを呼んだ場合の例_

_LIFFブラウザ以外でAPIが呼ばれた場合の例_

### liff.$commonProfile.fill()

取得した共通プロフィールの情報をフォームに自動入力します。それぞれのプロフィール情報とフォームの紐づけには、`data-liff-autocomplete`属性を用います。

> [!TIP]
> スコープと一致しないフォームへの自動入力
> `liff.$commonProfile.fill()`による自動入力は、フォームの`data-liff-autocomplete`属性を用いて行います。このとき、フォームの`data-liff-autocomplete`属性に指定する値は、取得したプロフィール情報のスコープ（`family-name`、`tel`、`bday-year`など）と一致している必要があります。
> 
> たとえば、誕生年（`bday-year`）、誕生月（`bday-month`）、誕生日（`bday-day`）の情報をそれぞれ取得した後、`20110623`のような形式に加工した上でフォームに自動入力させたい場合は、`liff.$commonProfile.fill()`の代わりに、`document.getElementById().value`や`document.querySelector().value`を用いることができます。

_取得した姓、電話番号、性別をそのまま自動入力する例_

_取得した共通プロフィール情報の形式を一部変更して自動入力する場合_

#### 構文

```javascript
liff.$commonProfile.fill(profile);
```

#### 引数

profile

Partial<CommonProfile>

必須

フォームに自動入力させるプロフィール情報を、`Partial<CommonProfile>`型で指定します。

指定できるスコープについては、「[取得できる共通プロフィールのスコープと戻り値](https://developers.line.biz/ja/docs/line-mini-app/quick-fill/overview/#common-profile-scope)」を参照してください。

#### 戻り値

なし

html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}