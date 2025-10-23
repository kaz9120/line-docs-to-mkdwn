---
url: https://developers.line.biz/ja/reference/liff-server/
copied_at: 2025-10-23T15:59:57.851Z
---
# サーバーAPI

:::note info
LIFF SDKとはバージョン番号が異なります

:::

## サーバーAPI

### チャネルアクセストークンを準備する

LIFFのサーバーAPIは、LINEログインチャネル上のLIFFアプリを操作するためのAPIです。このため、サーバーAPIを利用するには、LINEログインチャネルのチャネルアクセストークンが必要です。利用できるチャネルアクセストークンの種類は、[短期のチャネルアクセストークン](https://developers.line.biz/ja/reference/messaging-api/#issue-shortlived-channel-access-token)または[ステートレスチャネルアクセストークン](https://developers.line.biz/ja/reference/messaging-api/#issue-stateless-channel-access-token)です。

### LIFFアプリをチャネルに追加する

LIFFアプリをチャネルに追加します。チャネルごとに、最大30件のLIFFアプリを追加できます。

:::note info
LINEミニアプリとしての作成を推奨します

:::

_例_

#### HTTPリクエスト

`POST https://api.line.me/liff/v1/apps`

#### リクエストヘッダー

Authorization

必須

Bearer `{channel access token}`  
詳しくは、「[チャネルアクセストークンを準備する](#preparing-channel-access-token)」を参照してください。

Content-Type

必須

application/json

#### リクエストボディ

view.type

String

必須

LIFFアプリの画面サイズ。以下のいずれかの値を指定します。

*   `full`
*   `tall`
*   `compact`

詳しくは、「[LIFFアプリの画面サイズ](https://developers.line.biz/ja/docs/liff/overview/#screen-size)」を参照してください。

view.url

String

必須

エンドポイントURL。LIFFアプリを実装したウェブアプリのURLです（例：`https://example.com`）。LIFF URLを利用してLIFFアプリを起動した際に、このURLが利用されます。

URLスキームは**https**である必要があります。なお、URLフラグメント（#URL-fragment）は指定できません。

view.moduleMode

Boolean

任意

LIFFアプリをモジュールモードで使用する場合は、`true`。モジュールモードの場合は、ヘッダーのアクションボタンが非表示になります。

description

String

任意

LIFFアプリの名前。

LIFFアプリ名には、「LINE」またはそれに類する文字列、不適切な文字列は含められません。

features.qrCode

Boolean

任意

LIFFアプリで二次元コードリーダーを使用する場合は`true`を指定します。使用しない場合は`false`を指定します。デフォルト値は`false`です。

permanentLinkPattern

String

任意

LIFF URLの追加情報の処理方法。`concat`を指定してください。

詳しくは、『LIFFドキュメント』の「[LIFFアプリを開く](https://developers.line.biz/ja/docs/liff/opening-liff-app/)」を参照してください。

scope

Array of strings

任意

LIFF SDKの一部のメソッドを使用するために必要なスコープの配列。

*   `openid`
*   `email`
*   `profile`
*   `chat_message.write`

デフォルト値は `["profile", "chat_message.write"]`です。各スコープについて詳しくは、『LIFFドキュメント』の「[LIFFアプリをチャネルに追加する](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#registering-liff-app)」を参照してください。

botPrompt

String

任意

[友だち追加オプション](https://developers.line.biz/ja/docs/line-login/link-a-bot/)の設定を、以下のいずれかの値で指定します。

*   `normal`：チャネル同意画面に、LINE公式アカウントを友だち追加するオプションを表示する。
*   `aggressive`：チャネル同意画面の後に、LINE公式アカウントを友だち追加するかどうかを確認する画面を表示する。
*   `none`：LINE公式アカウントを友だち追加するオプションを表示しない。

デフォルト値は`none`です。

#### レスポンス

ステータスコード`200`と以下のプロパティを含むJSONオブジェクトを返します。

liffId

String

LIFFアプリID

_例_

#### エラーレスポンス

以下のいずれかのステータスコードを返します。

| ステータスコード | 説明 |
| --- | --- |
| 400 | 以下のどちらかです。<ul><!--[--><li><!--[-->リクエストに無効な値が含まれています。<!--]--></li><li><!--[-->チャネルに追加できるLIFFアプリ数の上限に達しています。<!--]--></li><!--]--></ul> |
| 401 | 認証に失敗しました。 |

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}

### LIFFアプリの設定を更新する

LIFFアプリの設定を、部分的に更新します。

_例_

#### HTTPリクエスト

`PUT https://api.line.me/liff/v1/apps/{liffId}`

#### リクエストヘッダー

Authorization

必須

Bearer `{channel access token}`  
詳しくは、「[チャネルアクセストークンを準備する](#preparing-channel-access-token)」を参照してください。

Content-Type

必須

application/json

#### パスパラメータ

liffId

必須

更新するLIFFアプリのID

#### リクエストボディ

view.type

String

任意

LIFFアプリの画面サイズ。以下のいずれかの値を指定します。

*   `full`
*   `tall`
*   `compact`

詳しくは、「[LIFFアプリの画面サイズ](https://developers.line.biz/ja/docs/liff/overview/#screen-size)」を参照してください。

view.url

String

任意

エンドポイントURL。LIFFアプリを実装したウェブアプリのURLです（例：`https://example.com`）。LIFF URLを利用してLIFFアプリを起動した際に、このURLが利用されます。

URLスキームは**https**である必要があります。なお、URLフラグメント（#URL-fragment）は指定できません。

view.moduleMode

Boolean

任意

LIFFアプリをモジュールモードで使用する場合は、`true`。モジュールモードの場合は、ヘッダーのアクションボタンが非表示になります。

description

String

任意

LIFFアプリの名前。

LIFFアプリ名には、「LINE」またはそれに類する文字列、不適切な文字列は含められません。

features.qrCode

Boolean

任意

LIFFアプリで二次元コードリーダーを使用する場合は`true`を指定します。使用しない場合は`false`を指定します。

permanentLinkPattern

String

任意

LIFF URLの追加情報の処理方法。`concat`を指定してください。

詳しくは、『LIFFドキュメント』の「[LIFFアプリを開く](https://developers.line.biz/ja/docs/liff/opening-liff-app/)」を参照してください。

scope

Array of strings

任意

LIFF SDKの一部のメソッドを使用するために必要なスコープの配列。

*   `openid`
*   `email`
*   `profile`
*   `chat_message.write`

各スコープについて詳しくは、『LIFFドキュメント』の「[LIFFアプリをチャネルに追加する](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#registering-liff-app)」を参照してください。

botPrompt

String

任意

[友だち追加オプション](https://developers.line.biz/ja/docs/line-login/link-a-bot/)の設定を、以下のいずれかの値で指定します。

*   `normal`：チャネル同意画面に、LINE公式アカウントを友だち追加するオプションを表示する。
*   `aggressive`：チャネル同意画面の後に、LINE公式アカウントを友だち追加するかどうかを確認する画面を表示する。
*   `none`：LINE公式アカウントを友だち追加するオプションを表示しない。

:::note warn
注意

:::

#### レスポンス

ステータスコード`200`を返します。

#### エラーレスポンス

以下のいずれかのステータスコードを返します。

| ステータスコード | 説明 |
| --- | --- |
| 400 | リクエストに無効な値が含まれています。 |
| 401 | 認証に失敗しました。 |
| 404 | 以下のどちらかです。<ul><!--[--><li><!--[-->指定したLIFFアプリは存在しません。<!--]--></li><li><!--[-->指定したLIFFアプリは別のチャネルに追加されています。<!--]--></li><!--]--></ul> |

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

### すべてのLIFFアプリを取得する

チャネルに追加されているすべてのLIFFアプリの情報を取得します。

_例_

#### HTTPリクエスト

`GET https://api.line.me/liff/v1/apps`

#### リクエストヘッダー

Authorization

必須

Bearer `{channel access token}`  
詳しくは、「[チャネルアクセストークンを準備する](#preparing-channel-access-token)」を参照してください。

#### レスポンス

ステータスコード`200`と以下のプロパティを含むJSONオブジェクトを返します。

apps

Array of objects

LIFFアプリオブジェクトの配列

apps\[\].liffId

String

LIFFアプリID

apps.view.type

String

LIFFアプリの画面サイズ。以下のいずれかの値が含まれます。

*   `full`
*   `tall`
*   `compact`

詳しくは、「[LIFFアプリの画面サイズ](https://developers.line.biz/ja/docs/liff/overview/#screen-size)」を参照してください。

apps.view.url

String

エンドポイントURL。LIFFアプリを実装したウェブアプリのURLです（例：`https://example.com`）。LIFF URLを利用してLIFFアプリを起動した際に、このURLが利用されます。

apps.view.moduleMode

Boolean

LIFFアプリをモジュールモードで使用する場合は、`true`。モジュールモードの場合は、ヘッダーのアクションボタンが非表示になります。

apps\[\].description

String

LIFFアプリの名前

apps.features.ble

Boolean

LINE ThingsのためにBluetooth® Low Energyに対応している場合は`true`。対応しない場合は`false`。

apps.features.qrCode

Boolean

LIFFアプリで二次元コードリーダーを起動できる場合は`true`。起動できない場合は`false`。

apps\[\].permanentLinkPattern

String

LIFF URLの追加情報の処理方法。`concat`が返されます。

詳しくは、『LIFFドキュメント』の「[LIFFアプリを開く](https://developers.line.biz/ja/docs/liff/opening-liff-app/)」を参照してください。

apps\[\].scope

Array of strings

LIFFアプリのスコープ。

*   `openid`
*   `email`
*   `profile`
*   `chat_message.write`

各スコープについて詳しくは、『LIFFドキュメント』の「[LIFFアプリをチャネルに追加する](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#registering-liff-app)」を参照してください。

apps\[\].botPrompt

String

[友だち追加オプション](https://developers.line.biz/ja/docs/line-login/link-a-bot/)の設定。

*   `normal`：チャネル同意画面に、LINE公式アカウントを友だち追加するオプションを表示する。
*   `aggressive`：チャネル同意画面の後に、LINE公式アカウントを友だち追加するかどうかを確認する画面を表示する。
*   `none`：LINE公式アカウントを友だち追加するオプションを表示しない。

_例_

#### エラーレスポンス

以下のいずれかのステータスコードを返します。

| ステータスコード | 説明 |
| --- | --- |
| 401 | 認証に失敗しました。 |
| 404 | チャネルにLIFFアプリがありません。 |

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}

### LIFFアプリをチャネルから削除する

LIFFアプリをチャネルから削除します。

_例_

#### HTTPリクエスト

`DELETE https://api.line.me/liff/v1/apps/{liffId}`

#### リクエストヘッダー

Authorization

必須

Bearer `{channel access token}`  
詳しくは、「[チャネルアクセストークンを準備する](#preparing-channel-access-token)」を参照してください。

#### パスパラメータ

liffId

必須

削除するLIFFアプリのID

#### レスポンス

ステータスコード`200`を返します。

#### エラーレスポンス

以下のいずれかのステータスコードを返します。

| ステータスコード | 説明 |
| --- | --- |
| 401 | 認証に失敗しました。 |
| 404 | 以下のどちらかです。<ul><!--[--><li><!--[-->指定したLIFFアプリは存在しません。<!--]--></li><li><!--[-->指定したLIFFアプリは別のチャネルに追加されています。<!--]--></li><!--]--></ul> |

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}