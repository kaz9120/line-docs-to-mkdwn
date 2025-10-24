---
url: https://developers.line.biz/ja/reference/liff/
copied_at: 2025-10-24T06:29:10.295Z
---
# LIFF v2 APIリファレンス

## 共通仕様

### 動作環境

LIFF v2の動作環境については、『LIFFドキュメント』の「[概要](https://developers.line.biz/ja/docs/liff/overview/)」を参照してください。

なお、LIFFアプリをLIFFブラウザで開いた場合と、外部ブラウザで開いた場合では、使用できる機能が異なります。たとえば、`liff.scanCode()`は、外部ブラウザでは利用できません。詳しくは、各クライアントAPIの説明をご覧ください。

> [!WARNING]
> OpenChatでのLIFFアプリの利用はサポートされていません
> 現在のところ、OpenChatではLIFFアプリの利用は正式にサポートされていません。たとえば、LIFFアプリからプロフィール情報を取得できない場合があります。

### LIFF SDKのエラー

LIFF SDKのエラーはLiffErrorオブジェクトで返されます。

> [!WARNING]
> エラーを識別する際は、エラーコードとエラーメッセージの両方を参照してください
> エラーメッセージは予告なく変更されることがあるため、エラーをエラーメッセージの完全一致で識別すると、LIFFアプリが正常に動作しなくなる可能性があります。エラーを識別する際は、エラーメッセージが変更されてもLIFFアプリが正常に動作するよう、エラーコードとエラーメッセージの両方を参照してください。
> 
> なお、エラーコードによってエラーを一意に識別できるよう、将来的に改善する予定です。

_例_

#### LiffErrorオブジェクト

code

String

エラーコード

message

String

含まれないことがあります

エラーメッセージ

cause

Unknown

含まれないことがあります

エラーの原因

#### エラー内容

| エラーコード | 説明 |
| --- | --- |
| 400 | リクエストに問題があります。リクエストパラメータとJSONの形式を確認してください。 |
| 401 | Authorizationヘッダーを正しく送信していることを確認してください。 |
| 403 | APIを使用する権限がありません。ご契約中のプランやアカウントに付与されている権限を確認してください。 |
| 429 | リクエスト頻度をレート制限内に抑えてください。 |
| 500 | APIサーバーの一時的なエラーです。 |
| INIT\_FAILED | LIFF SDKの初期化時にエラーが発生しました。 |
| INVALID\_ARGUMENT | 無効な引数が指定されました。 |
| UNAUTHORIZED | <ul><!--[--><li><!--[-->ユーザーが認可しませんでした。<!--]--></li><li><!--[-->アクセストークンを指定せずにAPIが呼ばれました。<!--]--></li><li><!--[-->ログイン処理を行う前に、シェアターゲットピッカーを呼び出しました。<!--]--></li><!--]--></ul> |
| FORBIDDEN | <ul><!--[--><li><!--[-->必要な権限がありません。<!--]--></li><li><!--[-->サポートされていない環境で機能を利用しようとしました。<!--]--></li><!--]--></ul> |
| INVALID\_CONFIG | 無効な設定です。<ul><!--[--><li><!--[--><a aria-current="page" href="/ja/reference/liff/#initialize-liff-app" class="router-link-active router-link-exact-active"><!--[--><!--[--><code><!--[-->liff.init()<!--]--></code><!--]--><!--]--></a>を使ってLIFFアプリを初期化するには、liffIdを指定する必要があります。<!--]--></li><li><!--[--><a aria-current="page" href="/ja/reference/liff/#permanent-link-create-url" class="router-link-active router-link-exact-active"><!--[--><!--[--><code><!--[-->liff.permanentLink.createUrl()<!--]--></code><!--]--><!--]--></a>を実行したページのURLが、［<strong><!--[-->エンドポイントURL<!--]--></strong>］に指定したURLで始まりません。<!--]--></li><!--]--></ul> |
| INVALID\_ID\_TOKEN | IDトークンが正規のものであることを確認できませんでした。 |
| EXCEPTION\_IN\_SUBWINDOW | サブウィンドウで問題が発生しました。<ul><!--[--><li><!--[-->ターゲットピッカー（グループまたは友だちを選択する画面）を表示後、10分以上操作しなかった場合など<!--]--></li><!--]--></ul> |
| UNKNOWN | 不明なエラーです。 |

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

## LIFF SDKのプロパティ

### liff.id

[`liff.init()`](#initialize-liff-app)に渡したLIFFアプリID（`String`型）を保持するプロパティです。

`liff.init()`を実行するまでは、`null`です。

_例_

html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

### liff.ready

LIFFアプリ起動後、[`liff.init()`](#initialize-liff-app)の実行が初めて終了したときにresolveする`Promise`オブジェクトを保持するプロパティです。

`liff.ready`を利用すると、`liff.init()`の終了を待って、任意の処理を実行できます。

> [!TIP]
> LIFFアプリ初期化前でも実行できます
> `liff.ready`は、`liff.init()`によるLIFFアプリの初期化が終了する前でも実行できます。

_例_

> [!WARNING]
> 注意
> `liff.init()`実行中に何か問題が起きても、`liff.ready`はrejectしません。また、[`LiffError`オブジェクト](#liff-errors)を返すこともありません。

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

## 初期化

### liff.init()

LIFFアプリを初期化します。

このメソッドを実行すると、LIFF SDKの他のメソッドを実行できるようになります。LIFFアプリは、ページを開くたびに必ず初期化する必要があります。同じLIFFアプリ内での遷移であっても、新たにページを開く場合には`liff.init()`メソッドを実行してください。

LIFFアプリが正しく初期化されていない状態でLIFFの機能を使用した場合、それらの動作は保証対象外です。

`liff.init()`メソッドを実行するとき、LIFF SDKは現在のユーザーのアクセストークンやIDトークンをLINEプラットフォームから取得します。

*   LIFF SDKが取得したアクセストークンを利用するには、「[liff.getAccessToken()](#get-access-token)」を呼び出します。
*   LIFF SDKが取得したIDトークンのペイロードを利用するには、「[liff.getDecodedIDToken()](#get-decoded-id-token)」を呼び出します。

#### LIFFアプリ初期化時の注意事項

LIFFアプリを初期化する際の注意事項は以下のとおりです。注意事項を確認し、理解した上でLIFFアプリの開発を行ってください。

*   [`liff.init()`をエンドポイントURL以下の階層で実行する](#initializing-liff-app-notes-1)
*   [`liff.init()`を1次リダイレクト先URLと2次リダイレクト先URLで1回ずつ実行する](#initializing-liff-app-notes-2)
*   [URLを操作する処理は`liff.init()`が完了してから実行する](#initializing-liff-app-notes-3)
*   [1次リダイレクト先URLの取り扱いに注意する](#initializing-liff-app-notes-4)

##### `liff.init()`をエンドポイントURL以下の階層で実行する

`liff.init()`メソッドはエンドポイントURLと完全に一致、もしくはエンドポイントURLよりも下の階層においてのみ動作します。これら以外のURLに遷移して実行した場合、`liff.init()`メソッドの動作は保証されません。

以下の例では、エンドポイントURLが`https://example.com/path1/`の場合に、`liff.init()`メソッドを実行するURLで動作が保証されるかどうかを示しています。なお、動作が保証されないURLでは、[マルチタブビュー](https://developers.line.biz/ja/docs/liff/overview/#multi-tab-view)などのLIFFアプリの一部機能が正しく動作しない可能性があります。

| `liff.init()`を実行するURL | 動作の保証 |
| --- | --- |
| `https://example.com/` | ❌ |
| `https://example.com/path1/` | ✅ |
| `https://example.com/path1/language/` | ✅ |
| `https://example.com/path2/` | ❌ |

> [!WARNING]
> liff.init()メソッドの実行時に、コンソールに「liff.init() was called with a current URL that is not related to the endpoint URL.」という警告メッセージが表示される
> LIFF v2.27.2以降では、動作が保証されないURLで`liff.init()`メソッドを実行すると、コンソールに警告メッセージが表示されます。
> 
> たとえば、LIFFアプリのエンドポイントURLが`https://example.com/path1/path2/`で、`liff.init()`メソッドを実行するURLが`https://example.com/path1/`の場合、表示される警告メッセージは次のとおりです。
> 
> text
> 
> `liff.init() was called with a current URL that is not related to the endpoint URL. https://example.com/path1/ is not under https://example.com/path1/path2/`
> 
> 上記の警告メッセージが表示された場合、エンドポイントURLを`https://example.com/`や`https://example.com/path1/`に変更できないか検討してください。これらのURLに変更することで、`liff.init()`メソッドの動作が保証されます。

##### `liff.init()`を1次リダイレクト先URLと2次リダイレクト先URLで1回ずつ実行する

`liff.init()`メソッドは、1次リダイレクト先URLに付与される`liff.state`や`access_token=xxx`などの情報を元に初期化処理を行います。エンドポイントURLにクエリパラメータやパスが含まれている場合、正しくLIFFアプリを初期化するために、1次リダイレクト先URLと2次リダイレクト先URLで、1回ずつ`liff.init()`メソッドを実行してください。リダイレクトについて詳しくは、『LIFFドキュメント』の「[LIFF URLにアクセスしてからLIFFアプリが開くまでの動作について](https://developers.line.biz/ja/docs/liff/opening-liff-app/#redirect-flow)」を参照してください。

##### URLを操作する処理は`liff.init()`が完了してから実行する

URLを操作する処理は、`liff.init()`メソッドが返す`Promise`オブジェクトがresolveしてから実行してください。

javascript

`// Example using window.location.replace() liff   .init({    liffId: "1234567890-AbcdEfgh", // Use own liffId  })  .then(() => {    // Redirect to another page after the returned Promise object has been resolved    window.location.replace(location.href + "/entry/");  });`

`Promise`オブジェクトがresolveする前に、次のようなURLを操作する処理を実行すると、LIFFアプリを正常に開けない場合があります。

*   [`Document.location`](https://developer.mozilla.org/ja/docs/Web/API/Document/location)プロパティや[`Window.location`](https://developer.mozilla.org/ja/docs/Web/API/Window/location)プロパティを使ってURLを変更する
*   [History API](https://developer.mozilla.org/ja/docs/Web/API/History_API)の[`history.pushState()`](https://developer.mozilla.org/ja/docs/Web/API/History/pushState)メソッドや[`history.replaceState()`](https://developer.mozilla.org/ja/docs/Web/API/History/replaceState)メソッドを使ってURLを変更する
*   サーバー側でステータスコード`301`や`302`を返し、別のURLにリダイレクトする

##### 1次リダイレクト先URLの取り扱いに注意する

1次リダイレクト先URLに自動的に付与される`access_token=xxx`はユーザーのアクセストークン（機密情報）です。Google Analyticsなど外部のロギングツールに、1次リダイレクト先URLを送らないように注意してください。

なお、LIFF v2.11.0以降のバージョンでは、`liff.init()`メソッドがresolveされたタイミングでURLから機密情報が除外されます。そのため、以下のように`then()`メソッド内でページビューを送信することで、機密情報の漏洩を防ぐことができます。ロギングツールを利用する場合は、LIFFアプリをv2.11.0以降にバージョンアップすることをお勧めします。LIFF v2.11.0の更新内容について詳しくは、『LIFFドキュメント』の「[リリースノート](https://developers.line.biz/ja/docs/liff/release-notes/#liff-v2-11-0)」を参照してください。

javascript

`liff   .init({    liffId: "1234567890-AbcdEfgh", // Use own liffId  })  .then(() => {    ga("send", "pageview");  });`

> [!WARNING]
> LIFFアプリのクエリパラメータについて
> LIFF URLへのアクセス時やLIFF間遷移時などに、URLに `liff.*` のようなクエリパラメータが付与されることがあります。
> 
> 例：
> 
> *   `liff.state`（LIFF URLに指定した追加情報を示す）
> *   `liff.referrer`（LIFF間遷移前のURLを示す。詳しくは、「[LIFF間遷移前のURLを取得する](https://developers.line.biz/ja/docs/liff/opening-liff-app/#using-liff-referrer)」を参照してください。）
> 
> 上記は、LIFFアプリを正常に動作させるために、SDK側から付与されるクエリパラメータです。 LIFFアプリのURLに独自の処理を行う場合は、LIFFアプリの起動やLIFF間遷移などLIFFアプリの正常な動作を保証するため、`liff.init`がresolveされるまで`liff.*`のクエリパラメータを変更しないように設計してください。

> [!TIP]
> LIFFアプリを初期化する前でも実行できるメソッド
> 以下のプロパティおよびメソッドは、`liff.init()`メソッドを実行する前でも利用できます。  
> LIFFアプリを初期化する前にLIFFアプリを動作させている環境を取得したり、LIFFアプリ初期化に失敗した際にLIFFアプリを閉じたりできます。
> 
> *   [liff.ready](https://developers.line.biz/ja/reference/liff/#ready)
> *   [liff.getOS()](https://developers.line.biz/ja/reference/liff/#get-os)
> *   [liff.getAppLanguage()](https://developers.line.biz/ja/reference/liff/#get-app-language)
> *   [liff.getLanguage()](https://developers.line.biz/ja/reference/liff/#get-language)（非推奨）
> *   [liff.getVersion()](https://developers.line.biz/ja/reference/liff/#get-version)
> *   [liff.getLineVersion()](https://developers.line.biz/ja/reference/liff/#get-line-version)
> *   [liff.isInClient()](https://developers.line.biz/ja/reference/liff/#is-in-client)
> *   [liff.closeWindow()](https://developers.line.biz/ja/reference/liff/#close-window)
> *   [liff.use()](https://developers.line.biz/ja/reference/liff/#use)
> *   [liff.i18n.setLang()](https://developers.line.biz/ja/reference/liff/#i18n-set-lang)
> 
> `liff.closeWindow()`メソッドは、LIFF SDKバージョンが2.4.0以上の場合のみ、`liff.init()`によるLIFFアプリの初期化が終了する前でも実行できます。

_例_

#### 構文

javascript

`liff.init(config, successCallback, errorCallback);`

#### 引数

config

Object

必須

LIFFアプリの設定

config.liffId

String

必須

LIFFアプリID。LIFFアプリをチャネルに追加すると取得できます。詳しくは、「[LIFFアプリをチャネルに追加する](https://developers.line.biz/ja/docs/liff/registering-liff-apps/)」を参照してください。  
ここで指定したLIFFアプリIDは、[`liff.id`](#id)で取得できます。

config.withLoginOnExternalBrowser

Boolean

任意

外部ブラウザでのLIFFアプリ初期化時に`liff.login()`メソッドを自動で実行するかどうかを、以下のどちらかの値で指定します。デフォルト値は`false`です。

*   `true`：外部ブラウザで`liff.login()`メソッドを自動で実行します。
*   `false`：外部ブラウザで`liff.login()`メソッドを自動で実行しません。

successCallback

Function

任意

LIFFアプリの初期化に成功したときにデータオブジェクトを返すコールバック

> [!WARNING]
> 注意
> successCallbackは、戻り値の`Promise`オブジェクトのresolveと同じタイミングで処理されます。ただし、処理の順番は保証されません。

errorCallback

Function

任意

LIFFアプリの初期化に失敗したときにエラーオブジェクトを返すコールバック

> [!WARNING]
> 注意
> errorCallbackは、戻り値の`Promise`オブジェクトのrejectと同じタイミングで処理されます。ただし、処理の順番は保証されません。

#### 戻り値

`Promise`オブジェクトが返されます。

##### エラーレスポンス

`Promise`がrejectされたときは、[`LiffError`](#liff-errors)が渡されます。

html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}

## 動作環境の取得

### liff.getOS()

ユーザーがLIFFアプリを動作させている環境を取得します。

> [!TIP]
> LIFFアプリ初期化前でも実行できます
> このメソッドは、`liff.init()`によるLIFFアプリの初期化が終了する前でも実行できます。

#### 構文

javascript

`liff.getOS();`

#### 引数

なし

#### 戻り値

ユーザーがLIFFアプリを動作させている環境が、文字列で返されます。戻り値はユーザーエージェント文字列中のOS名に基づくため、返却される値はブラウザの種類（[LIFFブラウザ](https://developers.line.biz/ja/glossary/#liff-browser)、[LINE内ブラウザ](https://developers.line.biz/ja/glossary/#line-iab)、[外部ブラウザ](https://developers.line.biz/ja/glossary/#external-browser)）を問いません。

たとえば、ユーザーがiOSを使用している場合、使用しているブラウザがLIFFブラウザかSafariかは問わず、`ios` が返却されます。

| 戻り値 | 説明 |
| --- | --- |
| ios | iOSもしくはiPadOS |
| android | Android |
| web | 上記以外 |

LIFFアプリをサポートするOSやブラウザについては、[動作環境](https://developers.line.biz/ja/docs/liff/overview/#operating-environment)を参照してください。

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

### liff.getAppLanguage()

LIFFアプリが動作しているLINEアプリの言語設定を取得します。

> [!TIP]
> LIFFアプリ初期化前でも実行できます
> このメソッドは、`liff.init()`によるLIFFアプリの初期化が終了する前でも実行できます。

#### 使用条件

LIFF SDKのバージョンが2.24.0以上

#### 動作条件

`liff.getAppLanguage()`メソッドが正しく動作するには、以下の条件をすべて満たす必要があります。

*   LIFFアプリが[LIFFブラウザ](https://developers.line.biz/ja/glossary/#liff-browser)上で動作している。
*   LINEアプリのバージョンが14.11.0以上である。

なお、上記の条件を満たさない場合、`liff.getAppLanguage()`メソッドは[`liff.getLanguage()`](#get-language)メソッドと同じ挙動になります。

#### 構文

javascript

`liff.getAppLanguage();`

#### 引数

なし

#### 戻り値

LIFFアプリが動作しているLINEアプリの言語設定が[RFC 5646](https://datatracker.ietf.org/doc/html/rfc5646)に準拠した文字列で返されます。

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

### liff.getLanguage()

> [!WARNING]
> liff.getLanguage()メソッドは非推奨です
> `liff.getLanguage()`メソッドは非推奨になりました。LIFFアプリを動作させている環境の言語設定を取得するには、[`liff.getAppLanguage()`](#get-app-language)メソッドを使用してください。詳しくは、[2024年7月23日のニュース](https://developers.line.biz/ja/news/2024/07/23/release-liff-2-24-0/)を参照してください。

LIFFアプリを動作させている環境の言語設定を取得します。

> [!TIP]
> LIFFアプリ初期化前でも実行できます
> このメソッドは、`liff.init()`によるLIFFアプリの初期化が終了する前でも実行できます。

#### 構文

javascript

`liff.getLanguage();`

#### 引数

なし

#### 戻り値

LIFFアプリを動作させている環境の`navigator.language`で取得できる言語設定が、文字列で返されます。

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

### liff.getVersion()

LIFF SDKのバージョンを取得します。

> [!TIP]
> LIFFアプリ初期化前でも実行できます
> このメソッドは、`liff.init()`によるLIFFアプリの初期化が終了する前でも実行できます。

#### 構文

javascript

`liff.getVersion();`

#### 引数

なし

#### 戻り値

LIFF SDKのバージョンが、文字列で返されます。

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

### liff.getLineVersion()

ユーザーのLINEバージョンを取得します。

> [!TIP]
> LIFFアプリ初期化前でも実行できます
> このメソッドは、`liff.init()`によるLIFFアプリの初期化が終了する前でも実行できます。

#### 構文

javascript

`liff.getLineVersion();`

#### 引数

なし

#### 戻り値

ユーザーがLIFFブラウザでLIFFアプリを開くと、ユーザーのLINEバージョンが文字列で返されます。ユーザーが外部ブラウザでLIFFアプリを開くと、 `null`が返されます。

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

### liff.getContext()

LIFFアプリが起動された画面（1対1のトーク、グループトーク、複数人トーク、または外部ブラウザ）に関する情報を取得します。

> [!CAUTION]
> トークルームの内部識別子の提供は廃止されました
> LIFFアプリに対するトークルームの内部識別子（1対1トークID、グループID、トークルームID）の提供は廃止されました。詳しくは、2023年2月6日のニュース、「[2023年2月6日をもってLIFFアプリに対するトークルームの内部識別子の提供を廃止しました](https://developers.line.biz/ja/news/2023/02/06/liff-spec-change/)」を参照してください。

_例_

#### 構文

javascript

`liff.getContext();`

#### 引数

なし

#### 戻り値

各種APIを呼び出すために必要な情報を含むデータオブジェクトが返されます。

type

String

LIFFアプリが起動された画面の種類。以下のいずれかの値が含まれます。

*   `utou`：1対1のトーク。
*   `group`：グループトーク。
*   `room`：複数人トーク。
*   `external`：外部ブラウザ。
*   `none`：LINEの1対1のトーク、グループ、複数人トーク、外部ブラウザ以外から起動した場合。例：ウォレットタブ

LIFF間遷移後のLIFFアプリでも、このプロパティが返ります。

userId

String

ユーザーID。`type`プロパティが、`utou`、`room`、`group`、`none`または`external`の場合に含まれます。ただし、`type`プロパティが`external`の場合は、nullが返されることがあります。

liffId

String

LIFF ID。

viewType

String

LIFFアプリの画面サイズ。`type`プロパティが`external`以外の場合に、以下のいずれかの値が含まれます。

*   `compact`
*   `tall`
*   `full`

詳しくは、「[LIFFアプリをチャネルに追加する](https://developers.line.biz/ja/docs/liff/registering-liff-apps/)」を参照してください。

endpointUrl

String

LIFFアプリのエンドポイントURL。

accessTokenHash

String

SHA256でハッシュ化したアクセストークンの前半部分。アクセストークンの検証に使用されます。

availability

Object

LIFFアプリを起動した環境で、LIFFの機能が使用可能かどうかを[`availability`オブジェクト](#get-context-return-value-availability)として返します。

scope

Array of strings

LIFF SDKの一部のメソッドを利用するために必要なスコープの中で、どのスコープを持っているかを返します。

*   `openid`：[`liff.getIDToken()`](#get-id-token)および[`liff.getDecodedIDToken()`](#get-decoded-id-token)を使用するためのスコープ
*   `email`：[`liff.getIDToken()`](#get-id-token)および[`liff.getDecodedIDToken()`](#get-decoded-id-token)で、メールアドレスを取得するためのスコープ
*   `profile`：[`liff.getProfile()`](#get-profile)および[`liff.getFriendship()`](#get-friendship)を使用するためのスコープ
*   `chat_message.write`：[`liff.sendMessages()`](#send-messages)を使用するためのスコープ

スコープについて詳しくは、『LIFFドキュメント』の「[LIFFアプリをチャネルに追加する](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#registering-liff-app)」を参照してください。

> [!TIP]
> liff.getContext()メソッドとliff.permission.getGrantedAll()メソッドの違い
> `liff.getContext()`メソッドでは、LIFFアプリのスコープ（※）の一覧を取得します。
> 
> 一方、[`liff.permission.getGrantedAll()`](#permission-get-granted-all)メソッドでは、LIFFアプリのスコープのうち、ユーザーが権限の付与に同意したスコープの一覧を取得します。
> 
> ※ LINEログインチャネルの［**LIFF**］タブにある「Scope」セクションで指定したスコープ

menuColorSetting

Object

LIFFブラウザのヘッダー部分のカラー設定を[`menuColorSetting`オブジェクト](#get-context-return-value-menucolorsetting)として返します。

なお、ヘッダー部分のカラー設定の変更は、現在提供していません。

miniAppId

String

含まれないことがあります

LINEミニアプリのCustom Path機能で設定されている文字列が返されます。Custom Path機能について詳しくは、『LINEミニアプリドキュメント』の「[Custom Pathを設定する](https://developers.line.biz/ja/docs/line-mini-app/develop/custom-path/)」を参照してください。

miniDomainAllowed

Boolean

LINEミニアプリを`miniapp.line.me`ドメインで利用できるかどうかを返します。

permanentLinkPattern

String

LIFF URLの追加情報の処理方法。`concat`が返されます。

詳しくは、『LIFFドキュメント』の「[LIFFアプリを開く](https://developers.line.biz/ja/docs/liff/opening-liff-app/)」を参照してください。

utouId

String

廃止

このプロパティは廃止されました。詳しくは、2023年2月6日のニュース、「[2023年2月6日をもってLIFFアプリに対するトークルームの内部識別子の提供を廃止しました](https://developers.line.biz/ja/news/2023/02/06/liff-spec-change/)」を参照してください。

groupId

String

廃止

このプロパティは廃止されました。詳しくは、2023年2月6日のニュース、「[2023年2月6日をもってLIFFアプリに対するトークルームの内部識別子の提供を廃止しました](https://developers.line.biz/ja/news/2023/02/06/liff-spec-change/)」を参照してください。

roomId

String

廃止

このプロパティは廃止されました。詳しくは、2023年2月6日のニュース、「[2023年2月6日をもってLIFFアプリに対するトークルームの内部識別子の提供を廃止しました](https://developers.line.biz/ja/news/2023/02/06/liff-spec-change/)」を参照してください。

_例（LIFFブラウザの場合）_

_例（外部ブラウザの場合）_

#### availabilityオブジェクト

`availability`オブジェクトには、以下のプロパティが含まれます。

shareTargetPicker

Object

LIFFアプリを起動した環境で、[`liff.shareTargetPicker()`](#share-target-picker)が使用可能かどうかを[オブジェクト](#get-context-return-value-availability-common)で表します。

※`liff.shareTargetPicker()`の使用可否は、このプロパティではなく、[liff.isApiAvailable('shareTargetPicker')](#is-api-available)で確認することをお勧めします。

multipleLiffTransition

Object

LIFFアプリを起動した環境で、LIFFアプリを閉じずに[`liff.openWindow()`](#open-window)で[別のLIFFアプリへ遷移する](https://developers.line.biz/ja/docs/liff/opening-liff-app/#move-liff-to-liff)ことが可能かどうかを[オブジェクト](#get-context-return-value-availability-common)で表します。

※LIFF間遷移可否の情報は、このプロパティではなく、[liff.isApiAvailable('multipleLiffTransition')](https://developers.line.biz/ja/reference/liff/#is-api-available)で確認することをお勧めします。

subwindowOpen

Object

LIFFアプリを起動した環境で、サブウィンドウが使用可能かどうかを[オブジェクト](#get-context-return-value-availability-common)で表します。

scanCode

Object

LIFFアプリを起動した環境で、[`liff.scanCode()`](#scan-code)が使用可能かどうかを[オブジェクト](#get-context-return-value-availability-common)で表します。

scanCodeV2

Object

LIFFアプリを起動した環境で、[`liff.scanCodeV2()`](#scan-code-v2)が使用可能かどうかを[オブジェクト](#get-context-return-value-availability-common)で表します。

getAdvertisingId

Object

LIFFアプリを起動した環境で、`liff.getAid()`が使用可能かどうかを[オブジェクト](#get-context-return-value-availability-common)で表します。

なお、`liff.getAid()`は現在提供していません。

addToHomeScreen

String

LIFFアプリを起動した環境で、`liff.addToHomeScreen()`が使用可能かどうかを[オブジェクト](#get-context-return-value-availability-common)で表します。

なお、`liff.addToHomeScreen()`は現在提供していません。

bluetoothLeFunction

Object

LIFFアプリを起動した環境で、LINE ThingsのためのBluetooth® Low Energyが使用可能かどうかを[オブジェクト](#get-context-return-value-availability-common)で表します。

なお、この機能は現在提供していません。

skipChannelVerificationScreen

Object

LIFFアプリを起動した環境で、「チャネル同意の簡略化」機能を利用できるかどうかを[オブジェクト](#get-context-return-value-availability-common)で表します。詳しくは、『LINEミニアプリドキュメント』の「[同意画面のプロセスをスキップする](https://developers.line.biz/ja/docs/line-mini-app/develop/channel-consent-simplification/)」を参照してください。

addToHomeV2

Object

LIFFアプリを起動した環境で、[`liff.createShortcutOnHomeScreen()`](#create-shortcut-on-home-screen)が使用可能かどうかを[オブジェクト](#get-context-return-value-availability-common)で表します。

※`liff.createShortcutOnHomeScreen()`の使用可否は、このプロパティではなく、[liff.isApiAvailable('createShortcutOnHomeScreen')](#is-api-available)で確認することをお勧めします。

addToHomeHideDomain

Object

ショートカットを、ユーザー端末のホーム画面に追加する画面を表示する際に、エンドポイントURLを非表示にできるかどうかを[オブジェクト](#get-context-return-value-availability-common)で表します。

なお、この機能は現在提供していません。

addToHomeLineScheme

Object

[LINE URLスキーム](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/)を指定したショートカットが作成可能かどうかを[オブジェクト](#get-context-return-value-availability-common)で表します。

なお、この機能は現在提供していません。

_例_

#### availabilityオブジェクトの共通プロパティ

permission

Boolean

LIFFアプリを起動した環境で、`availability`オブジェクトのプロパティ名で指定された機能が、使用可能かどうかを表します。

*   `true`：機能は使用可能。
*   `false`：機能は使用不可。

minVer

String

含まれないことがあります

該当する機能がサポートされているLINEの最小バージョン

maxVer

String

含まれないことがあります

該当する機能がサポートされているLINEの最大バージョン

unsupportedFromVer

String

含まれないことがあります

該当する機能がサポート対象外となったLINEのバージョン

minOsVer

String

含まれないことがあります

該当する機能がサポートされているOSの最小バージョン

maxOsVer

String

含まれないことがあります

該当する機能がサポートされているOSの最大バージョン

unsupportedFromOsVer

String

含まれないことがあります

該当する機能がサポート対象外となったOSのバージョン

#### menuColorSettingオブジェクト

`menuColorSetting`オブジェクトには、以下のプロパティが含まれます。

adaptableColorSchemes

Array of strings

常に`light`を返します。

lightModeColor

Object

`adaptableColorSchemes`が`light`だった場合の、カラー設定を[オブジェクト](#get-context-return-value-menucolorsetting-common)で表します。

darkModeColor

Object

`adaptableColorSchemes`が`dark`だった場合の、ヘッダーのカラー設定を[オブジェクト](#get-context-return-value-menucolorsetting-common)で表します。

なお、このヘッダーのカラー設定は現在提供していません。

_例_

#### menuColorSettingオブジェクトの共通プロパティ

iconColor

String

ヘッダーのアイコンの色を`#RRGGBB`のような16進数カラーコードで表します。

statusBarColor

String

常に`white`を返します。

titleTextColor

String

ヘッダーのタイトルテキストの色を`#RRGGBB`のような16進数カラーコードで表します。

titleSubtextColor

String

ヘッダーのサブタイトルテキストの色を`#RRGGBB`のような16進数カラーコードで表します。

titleButtonColor

String

ヘッダーのボタンの色を`#RRGGBB`のような16進数カラーコードで表します。

titleBackgroundColor

String

ヘッダーの背景色を`#RRGGBB`のような16進数カラーコードで表します。

progressBarColor

String

ヘッダーのプログレスバーの色を`#RRGGBB`のような16進数カラーコードで表します。

progressBackgroundColor

String

ヘッダーのプログレスバーの背景色を`#RRGGBB`のような16進数カラーコードで表します。

html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}

### liff.isInClient()

LIFFアプリをLIFFブラウザで動作させているかどうかを取得します。

> [!TIP]
> LIFFアプリ初期化前でも実行できます
> このメソッドは、`liff.init()`によるLIFFアプリの初期化が終了する前でも実行できます。

#### 構文

javascript

`liff.isInClient();`

#### 引数

なし

#### 戻り値

*   `true`：[LIFFブラウザ](https://developers.line.biz/ja/glossary/#liff-browser)で動作させている
*   `false`：[外部ブラウザ](https://developers.line.biz/ja/glossary/#external-browser)または[LINE内ブラウザ](https://developers.line.biz/ja/glossary/#line-iab)で動作させている

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

### liff.isLoggedIn()

ユーザーがログインしているかどうかを取得します。

_例_

#### 構文

javascript

`liff.isLoggedIn();`

#### 引数

なし

#### 戻り値

*   `true`：ログインしている
*   `false`：ログインしていない

html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

### liff.isApiAvailable()

指定したAPIが、LIFFアプリを起動した環境で使用可能かどうかを確認します。たとえば、APIが対応しているLINEバージョンであることや、APIを呼び出すために特別な同意が必要な場合は同意していることを確認します。

_例_

#### 構文

javascript

`liff.isApiAvailable(apiName);`

#### 引数

apiName

String

必須

LIFFのクライアントAPIの名前。以下のAPI名を指定できます。

*   [shareTargetPicker](#share-target-picker)
*   [createShortcutOnHomeScreen](#create-shortcut-on-home-screen)
*   [multipleLiffTransition](https://developers.line.biz/ja/docs/liff/opening-liff-app/#move-liff-to-liff)

> [!WARNING]
> multipleLiffTransitionについて
> `multipleLiffTransition`は、LIFFアプリを閉じずに別のLIFFアプリを開くこと（LIFF間遷移）が可能かどうか、という状態を表すプロパティで、APIの名前ではありません。詳しくは、『LIFFドキュメント』の「[LIFFアプリから別のLIFFアプリを開いた場合の動作について（LIFF間遷移）](https://developers.line.biz/ja/docs/liff/opening-liff-app/#move-liff-to-liff)」を参照してください。

#### 戻り値

指定したAPIが、現在の環境で使用可能かどうかが返されます。使用可能の場合は`true`が返されます。使用不可能の場合は`false`が返されます。`false`が返される例は以下のとおりです。

*   APIが対応していないLINEバージョンでLIFFアプリを起動した場合
*   外部ブラウザで利用できないAPIにもかかわらず、外部ブラウザでLIFFアプリを起動した場合
*   使用するために特別な同意が必要なAPIにもかかわらず、同意していない場合
*   使用するためにログインが必要なAPIにもかかわらず、ログインしていない場合
*   使用するためにアクセストークンが必要なAPIにもかかわらず、アクセストークンの有効期限が切れている場合

html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

## 認証

### liff.login()

[外部ブラウザ](https://developers.line.biz/ja/glossary/#external-browser)および[LINE内ブラウザ](https://developers.line.biz/ja/glossary/#line-iab)上で、ログイン処理を行います。

> [!WARNING]
> 注意
> LIFFブラウザの場合、`liff.init()`実行時に自動でログイン処理が実行されるため、`liff.login()`は利用できません。

> [!WARNING]
> LIFFブラウザ内での認可リクエストについて
> LIFFブラウザ内でLINEログインによる認可リクエストを行った際の動作は保証されません。また、LIFFアプリを外部ブラウザやLINE内ブラウザで開く場合には、必ず本メソッドでログイン処理を行い、[LINEログインによる認可リクエスト](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#making-an-authorization-request)は行わないでください。

_例_

#### 構文

javascript

`liff.login(loginConfig);`

#### 引数

loginConfig

Object

任意

ログインの設定

loginConfig.redirectUri

String

任意

ログイン後にLIFFアプリで表示するURL。デフォルト値は［**エンドポイントURL**］に設定したURLです。［**エンドポイントURL**］の設定方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリをチャネルに追加する](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#registering-liff-app)」を参照してください。

`redirectUri`に指定したURLが［**エンドポイントURL**］に設定したURLで始まらない場合、ログイン処理に失敗し、エラー画面が表示されます。

![](https://developers.line.biz/media/liff/liff_login_error_screen.png)

たとえば、［**エンドポイントURL**］が`https://example.com/path1/path2?query1=value1`の場合、ログイン処理の成否は以下のとおりです。なお、クエリパラメータやURLフラグメントはログイン処理の成否に影響しません。

| redirectUri | ログイン処理 |
| --- | --- |
| <ul><!--[--><li><!--[-->https://example.com/path1/path2?query1=value1<!--]--></li><li><!--[-->https://example.com/path1/path2?query2=value2<!--]--></li><li><!--[-->https://example.com/path1/path2#URL-fragment<!--]--></li><li><!--[-->https://example.com/path1/path2<!--]--></li><li><!--[-->https://example.com/path1/path2/<!--]--></li><li><!--[-->https://example.com/path1/path2/path3<!--]--></li><!--]--></ul> | ✅ 成功 |
| <ul><!--[--><li><!--[-->https://example.com/path1<!--]--></li><li><!--[-->https://example.com/<!--]--></li><li><!--[-->https://example.com/path2/path1<!--]--></li><!--]--></ul> | ❌ 失敗 |

#### 戻り値

なし

html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

### liff.logout()

ログアウトします。

_例_

#### 構文

javascript

`liff.logout();`

#### 引数

なし

#### 戻り値

なし

html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

### liff.getAccessToken()

LIFF SDKが取得した「現在のユーザーのアクセストークン」を取得します。

LIFFアプリからサーバーにユーザー情報を送信するときに、このAPIで取得したアクセストークンを利用できます。サーバーでユーザー情報を使用する方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリおよびサーバーでユーザー情報を使用する](https://developers.line.biz/ja/docs/liff/using-user-profile/)」を参照してください。

> [!WARNING]
> アクセストークンの有効期間
> アクセストークンの有効期間は、発行後12時間です。なお、ユーザーが[LIFFアプリを閉じる](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#behavior-when-closing-liff-app)と、有効期限が切れていなくてもアクセストークンは無効化されます。

> [!TIP]
> LIFF SDKがアクセストークンを取得するタイミング
> *   LIFFブラウザでLIFFアプリを起動した場合は、[`liff.init()`](#initialize-liff-app)を呼び出したときに、LIFF SDKがアクセストークンを取得します。
> *   外部ブラウザでLIFFアプリを起動した場合は、以下の手順を行ったのちに、LIFF SDKがアクセストークンを取得します。
>     1.  LIFFアプリで、[`liff.login()`](#login)を呼び出す。
>     2.  ユーザーがログインする。
>     3.  LIFFアプリで、再度[`liff.init()`](#initialize-liff-app)を呼び出す。

_例_

#### 構文

javascript

`liff.getAccessToken();`

#### 引数

なし

#### 戻り値

現在のユーザーのアクセストークンを文字列で返します。

html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

### liff.getIDToken()

LIFF SDKが取得した「現在のユーザーのIDトークン」を取得します。IDトークンは、ユーザー情報を含むJSONウェブトークン（JWT）です。

LIFFアプリからサーバーにユーザー情報を送信するときに、このAPIで取得したIDトークンを利用できます。サーバーでユーザー情報を使用する方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリおよびサーバーでユーザー情報を使用する](https://developers.line.biz/ja/docs/liff/using-user-profile/)」を参照してください。

> [!WARNING]
> スコープを選択してください
> [LIFFアプリをチャネルに追加する](https://developers.line.biz/ja/docs/liff/registering-liff-apps/)ときに、`openid`スコープを選択してください。スコープを選択しなかった場合やユーザーが認可しなかった場合は、IDトークンを取得できません。スコープの選択は、LIFFアプリ追加後も[LINE Developersコンソール](https://developers.line.biz/console/)のLIFFタブで変更できます。

> [!TIP]
> LIFF SDKがIDトークンを取得するタイミング
> *   LIFFブラウザでLIFFアプリを起動した場合は、[`liff.init()`](#initialize-liff-app)を呼び出したときに、LIFF SDKがIDトークンを取得します。
> *   外部ブラウザでLIFFアプリを起動した場合は、以下の手順を行ったのちに、LIFF SDKがIDトークンを取得します。
>     1.  LIFFアプリで、[`liff.login()`](#login)を呼び出す。
>     2.  ユーザーがログインする。
>     3.  LIFFアプリで、再度[`liff.init()`](#initialize-liff-app)を呼び出す。

> [!TIP]
> メールアドレスを取得できます
> [LIFFアプリをチャネルに追加する](https://developers.line.biz/ja/docs/liff/registering-liff-apps/)ときに、`email`スコープを選択し、ユーザーが認可すると、メールアドレスも取得できます。スコープの選択は、LIFFアプリ追加後も[LINE Developersコンソール](https://developers.line.biz/console/)のLIFFタブで変更できます。

_例_

#### 構文

javascript

`liff.getIDToken();`

#### 引数

なし

#### 戻り値

IDトークンが返されます。

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

### liff.getDecodedIDToken()

LIFF SDKが取得したIDトークンの「ペイロード」を取得します。ペイロードには、ユーザーの表示名、プロフィール画像のURL、メールアドレスなどの情報が含まれます。

LIFFアプリでユーザーの表示名などを利用する場合に、このメソッドを利用してください。

なお取得できる情報はメインプロフィールのみです。ユーザーの[サブプロフィール](https://developers.line.biz/ja/glossary/#subprofile)は取得できません。

> [!CAUTION]
> ユーザー情報をサーバーに送信しないでください
> このメソッドで取得したユーザー情報をサーバーに送信しないでください。サーバーでユーザー情報を使用する方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリおよびサーバーでユーザー情報を使用する](https://developers.line.biz/ja/docs/liff/using-user-profile/)」を参照してください。

> [!WARNING]
> スコープを選択してください
> [LIFFアプリをチャネルに追加する](https://developers.line.biz/ja/docs/liff/registering-liff-apps/)ときに、`openid`スコープを選択してください。スコープを選択しなかった場合やユーザーが認可しなかった場合は、IDトークンを取得できません。スコープの選択は、LIFFアプリ追加後も[LINE Developersコンソール](https://developers.line.biz/console/)のLIFFタブで変更できます。

> [!TIP]
> LIFF SDKがIDトークンを取得するタイミング
> *   LIFFブラウザでLIFFアプリを起動した場合は、[`liff.init()`](#initialize-liff-app)を呼び出したときに、LIFF SDKがIDトークンを取得します。
> *   外部ブラウザでLIFFアプリを起動した場合は、以下の手順を行ったのちに、LIFF SDKがIDトークンを取得します。
>     1.  LIFFアプリで、[`liff.login()`](#login)を呼び出す。
>     2.  ユーザーがログインする。
>     3.  LIFFアプリで、再度[`liff.init()`](#initialize-liff-app)を呼び出す。

> [!TIP]
> メールアドレスを取得できます
> [LIFFアプリをチャネルに追加する](https://developers.line.biz/ja/docs/liff/registering-liff-apps/)ときに、`email`スコープを選択し、ユーザーが認可すると、メールアドレスも取得できます。スコープの選択は、LIFFアプリ追加後も[LINE Developersコンソール](https://developers.line.biz/console/)のLIFFタブで変更できます。

_例_

#### 構文

javascript

`liff.getDecodedIDToken();`

#### 引数

なし

#### 戻り値

IDトークンのペイロードが返されます。

IDトークンのペイロードについて詳しくは、「[IDトークンからプロフィール情報を取得する](https://developers.line.biz/ja/docs/line-login/verify-id-token/)」の「ペイロード」を参照してください。

_例_

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}

### liff.permission.getGrantedAll()

ユーザーが権限の付与に同意したスコープの一覧を取得します。

このメソッドで取得できるスコープは次のとおりです。

*   [`profile`](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#registering-liff-app)
*   [`chat_message.write`](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#registering-liff-app)
*   [`openid`](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#registering-liff-app)
*   [`email`](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#registering-liff-app)

> [!TIP]
> liff.getContext()メソッドとliff.permission.getGrantedAll()メソッドの違い
> [`liff.getContext()`](#get-context)メソッドでは、LIFFアプリのスコープ（※）の一覧を取得します。
> 
> 一方、`liff.permission.getGrantedAll()`メソッドでは、LIFFアプリのスコープのうち、ユーザーが権限の付与に同意したスコープの一覧を取得します。
> 
> ※ LINEログインチャネルの［**LIFF**］タブにある「Scope」セクションで指定したスコープ

_例_

#### 構文

javascript

`liff.permission.getGrantedAll();`

#### 引数

なし

#### 戻り値

`Promise`がresolveされると、ユーザーが権限の付与に同意したスコープの配列が渡されます。

##### エラーレスポンス

`Promise`がrejectされたときは、[`LiffError`](#liff-errors)が渡されます。

### liff.permission.query()

ユーザーが指定した権限の付与に同意しているかどうかを確認します。

_例_

#### 構文

javascript

`liff.permission.query(permission);`

#### 引数

permission

String

必須

確認対象の権限。以下のいずれかのスコープを指定します。

*   [`profile`](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#registering-liff-app)
*   [`chat_message.write`](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#registering-liff-app)
*   [`openid`](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#registering-liff-app)
*   [`email`](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#registering-liff-app)

#### 戻り値

`Promise`オブジェクトが返されます。

`Promise`がresolveされると、以下のプロパティを持つオブジェクトが渡されます。

state

String

以下のいずれかの値が含まれます。

*   `granted`: 権限付与にユーザーが同意済み。
*   `prompt`: 権限付与にユーザーが未同意。
*   `unavailable`: 指定したスコープをチャネルが持たないため、利用不可。

### liff.permission.requestAll()

LINEミニアプリが要求する権限の「アクセス許可要求画面」を表示します。

![アクセス許可要求画面](https://developers.line.biz/media/line-mini-app/verification-screen-ja.png)

> [!WARNING]
> liff.permission.requestAll()の動作環境
> `liff.permission.requestAll()`は[LINEミニアプリ](https://developers.line.biz/ja/docs/line-mini-app/)でのみ動作します。
> 
> このメソッドを実行するには、あらかじめ[LINE Developersコンソール](https://developers.line.biz/console/)で、［**チャネル同意の簡略化**］をオンにする必要があります。チャネル同意の簡略化の設定方法について詳しくは、『LINEミニアプリドキュメント』の「[「チャネル同意の簡略化」の設定方法](https://developers.line.biz/ja/docs/line-mini-app/develop/channel-consent-simplification/#simplification-feature-setup)」を参照してください。

> [!WARNING]
> ユーザーが未同意の権限があるかどうか確認してから実行してください
> 権限付与にユーザーがすべて同意済みの場合、`liff.permission.requestAll()`を実行すると、`Promise`がrejectされ、[`LiffError`](https://developers.line.biz/ja/reference/liff/#liff-errors)が渡されます。そのため、[`liff.permission.query()`](https://developers.line.biz/ja/reference/liff/#permission-query)を使って、ユーザーが未同意の権限があるかどうかを確認してください。未同意の権限がある場合にのみ、`liff.permission.requestAll()`を実行するようにしてください。

_例_

#### 構文

javascript

`liff.permission.requestAll();`

#### 引数

なし

#### 戻り値

`Promise`オブジェクトが返されます。

##### エラーレスポンス

［**チャネル同意の簡略化**］がオンになっていない場合や、権限付与にユーザーがすべて同意済みの場合は、`Promise`がrejectされ、[`LiffError`](#liff-errors)が渡されます。

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}

## プロフィール

### liff.getProfile()

現在のユーザーの[プロフィール情報](https://developers.line.biz/ja/glossary/#profile-information)を取得します。

なお取得できる情報はメインプロフィールのみです。ユーザーの[サブプロフィール](https://developers.line.biz/ja/glossary/#subprofile)は取得できません。

> [!CAUTION]
> ユーザー情報をサーバーに送信しないでください
> このメソッドで取得したユーザー情報をサーバーに送信しないでください。サーバーでユーザー情報を使用する方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリおよびサーバーでユーザー情報を使用する](https://developers.line.biz/ja/docs/liff/using-user-profile/)」を参照してください。

> [!WARNING]
> スコープを選択してください
> [LIFFアプリをチャネルに追加する](https://developers.line.biz/ja/docs/liff/registering-liff-apps/)ときに、`profile`スコープを選択してください。スコープを選択しなかった場合やユーザーが認可しなかった場合は、プロフィール情報を取得できません。スコープの選択は、LIFFアプリ追加後も[LINE Developersコンソール](https://developers.line.biz/console/)のLIFFタブで変更できます。

_例_

#### 構文

javascript

`liff.getProfile();`

#### 引数

なし

#### 戻り値

`Promise`オブジェクトが返されます。

`Promise`がresolveされると、ユーザーのプロフィール情報を含むオブジェクトが渡されます。

userId

String

ユーザーID

displayName

String

表示名

pictureUrl

String

画像のURL。ユーザーが設定していない場合は返されません。

statusMessage

String

ステータスメッセージ。ユーザーが設定していない場合は返されません。

##### エラーレスポンス

`Promise`がrejectされたときは、[`LiffError`](#liff-errors)が渡されます。

_例_

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}

### liff.getFriendship()

ユーザーとLINE公式アカウントの友だち関係を取得します。

ただし、LIFFアプリが追加されているLINEログインのチャネルに、LINE公式アカウントがリンクされている場合に、そのLINE公式アカウントとの友だち関係のみを取得できます。LINEログインのチャネルに、LINE公式アカウントをリンクする方法については、『LINEログインドキュメント』の「[LINEログインしたときにLINE公式アカウントを友だち追加する（友だち追加オプション）](https://developers.line.biz/ja/docs/line-login/link-a-bot/)」を参照してください。

> [!WARNING]
> スコープを選択してください
> [LIFFアプリをチャネルに追加する](https://developers.line.biz/ja/docs/liff/registering-liff-apps/)ときに、`profile`スコープを選択してください。スコープを選択しなかった場合やユーザーが認可しなかった場合は、友だち関係を取得できません。スコープの選択は、LIFFアプリ追加後も[LINE Developersコンソール](https://developers.line.biz/console/)のLIFFタブで変更できます。

_例_

#### 構文

javascript

`liff.getFriendship();`

#### 引数

なし

#### 戻り値

`Promise`オブジェクトが返されます。

友だち関係を取得できると、`Promise`がresolveされ、友だち関係に関する情報が渡されます。

friendFlag

Boolean

*   `true`：ユーザーがLINE公式アカウントを友だち追加済みで、ブロックしていない。
*   `false`：それ以外の場合。

##### エラーレスポンス

`Promise`がrejectされたときは、[`LiffError`](#liff-errors)が渡されます。

_例_

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}

## ウィンドウ

### liff.openWindow()

指定したURLをLINE内ブラウザまたは外部ブラウザで開きます。

> [!WARNING]
> liff.openWindow()の動作環境
> `liff.openWindow()`の外部ブラウザでの利用は、保証対象外です。

> [!WARNING]
> iOS版LINEかつLIFF v2.16.1以前でliff.openWindow()を実行すると、URLフラグメントの末尾に意図しないクエリパラメータが追加されたURLが開かれます
> iOS版LINEかつLIFF v2.16.1以前で、`url`プロパティにクエリパラメータ（`?key=value`）が含まれず、かつURLフラグメント（`#URL-fragment`）が含まれていると、URLフラグメントの末尾に意図しないクエリパラメータが追加されたURLが開かれます。
> 
> 以下は、`liff.openWindow()`実行時に開かれるURLの例です。
> 
> | LIFF SDKバージョン | `url`プロパティ | 開かれるURL |
> | --- | --- | --- |
> | v2.16.1 | `https://example.com#URL-fragment` | `https://example.com#URL-fragment?is_liff_external_open_window=false` |
> | v2.17.0 | `https://example.com#URL-fragment` | `https://example.com#URL-fragment` |

_例_

#### 構文

javascript

`liff.openWindow(params);`

#### 引数

params

Object

必須

パラメータオブジェクト

params.url

String

必須

URL。完全なURLで指定します。

params.external

Boolean

任意

指定したURLを外部ブラウザで開くかどうかを、以下のどちらかの値で指定します。デフォルト値は`false`です。

*   `true`：外部ブラウザで開きます。
*   `false`：LINE内ブラウザで開きます。

#### 戻り値

なし

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

### liff.closeWindow()

LIFFアプリを閉じます。

LIFFアプリを閉じたときの挙動は、LINEアプリのバージョンやLIFFアプリの設定によって異なります。詳しくは、『LIFFドキュメント』の「[LIFFアプリを閉じたときの挙動](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#behavior-when-closing-liff-app)」を参照してください。

> [!TIP]
> LIFFアプリ初期化前でも実行できます
> このメソッドは、LIFF SDKバージョンが2.4.0以上の場合のみ、`liff.init()`によるLIFFアプリの初期化が終了する前でも実行できます。

> [!WARNING]
> 注意
> `liff.closeWindow()`の外部ブラウザでの動作は、保証対象外です。

_例_

#### 構文

javascript

`liff.closeWindow();`

#### 引数

なし

#### 戻り値

なし

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

## メッセージ

### liff.sendMessages()

ユーザーの代わりに、LIFFアプリが開かれているトークルームにメッセージを送信します。

この機能を利用するには、以下の条件を満たす必要があります。

*   1対1のトーク、[グループトーク](https://developers.line.biz/ja/glossary/#group)、または[複数人トーク](https://developers.line.biz/ja/glossary/#room)から起動したLIFFアプリの[LIFFブラウザ](https://developers.line.biz/ja/glossary/#liff-browser)内である
*   [`chat_message.write`スコープ](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#registering-liff-app)が有効である
*   LIFFアプリが「[最近使用したサービス](https://developers.line.biz/ja/docs/liff/overview/#multi-tab-view-recent-service)」から再読み込みされていない

条件を満たしていない場合、`liff.sendMessages()`メソッドが利用できず、エラーコード`403`の`user doesn't grant required permissions yet`エラーが発生します。以下は、エラーが発生する場合の例です。

*   [Keepメモ](https://help.line.me/line/smartphone/pc?lang=ja&contentId=20017696)の機能を利用してLIFFアプリにアクセスした場合。
*   ウェブサイトのリダイレクト処理などにより[LIFFアプリを開く](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/#opening-a-liff-app)ためのURLスキームにアクセスした場合。
*   LIFF間遷移後のLIFFアプリで`chat_message.write`スコープが無効になった場合。詳しくは、『LIFFドキュメント』の「[LIFF間遷移後の「chat\_message.write」スコープについて](https://developers.line.biz/ja/docs/liff/opening-liff-app/#about-chat-message-write-scope)」を参照してください。
*   ユーザーが`chat_message.write`スコープを認可しなかった場合。

なお、LIFFアプリが起動された画面に関する情報は、[`liff.getContext()`](#get-context)メソッドで取得できます。

_例_

#### 構文

javascript

`liff.sendMessages(messages);`

#### 引数

messages

Array of objects

必須

[メッセージオブジェクト](https://developers.line.biz/ja/reference/messaging-api/#message-objects)  
最大件数：5  
Messaging APIの以下のタイプのメッセージを送信できます。

*   [テキストメッセージ](https://developers.line.biz/ja/docs/messaging-api/message-types/#text-messages)。ただし、`emojis`プロパティおよび`quoteToken`プロパティは利用できません。
*   [スタンプメッセージ](https://developers.line.biz/ja/docs/messaging-api/message-types/#sticker-messages)。ただし、`quoteToken`プロパティは利用できません。
*   [画像メッセージ](https://developers.line.biz/ja/docs/messaging-api/message-types/#image-messages)。
*   [動画メッセージ](https://developers.line.biz/ja/docs/messaging-api/message-types/#video-messages)。ただし、`trackingId`プロパティは利用できません。
*   [音声メッセージ](https://developers.line.biz/ja/docs/messaging-api/message-types/#audio-messages)。
*   [位置情報メッセージ](https://developers.line.biz/ja/docs/messaging-api/message-types/#location-messages)。
*   [テンプレートメッセージ](https://developers.line.biz/ja/docs/messaging-api/message-types/#template-messages)。ただし、設定できるアクションは[URIアクション](https://developers.line.biz/ja/docs/messaging-api/actions/#uri-action)のみです。
*   [Flex Message](https://developers.line.biz/ja/docs/messaging-api/message-types/#flex-messages)。ただし、設定できるアクションは[URIアクション](https://developers.line.biz/ja/docs/messaging-api/actions/#uri-action)のみです。

`liff.sendMessages()`メソッドによってユーザーからテンプレートメッセージまたはFlex Messageが送信された場合、LINEプラットフォームからWebhookは送信されません。それ以外の[メッセージタイプ](https://developers.line.biz/ja/docs/messaging-api/message-types/)であれば、Webhookは送信されます。`liff.sendMessages()`メソッドで画像、動画、および音声のメッセージが送信されると、結果として送信されるWebhookイベントの`contentProvider.type`プロパティの値は`external`になります。詳しくは、『Messaging APIリファレンス』の「[メッセージイベント](https://developers.line.biz/ja/reference/messaging-api/#message-event)」を参照してください。

#### 戻り値

`Promise`オブジェクトが返されます。

*   メッセージの送信が成功すると、`Promise`がresolveされます。値は渡されません。
*   メッセージの送信が失敗すると、`Promise`がrejectされ、[`LiffError`](#liff-errors)が渡されます。

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

### liff.shareTargetPicker()

ターゲットピッカー（グループまたは友だちを選択する画面）を表示し、ターゲットピッカーで選択した相手に、開発者が作成したメッセージを送信します。このメッセージは、ユーザーが送信したかのように、グループまたは友だちに表示されます。

#### liff.shareTargetPicker()メソッドの使用条件

`liff.shareTargetPicker()`メソッドを使用するには、以下の条件をすべて満たす必要があります。

*   ユーザーがログインしている。
*   [LINE Developersコンソール](https://developers.line.biz/console/)でシェアターゲットピッカーがオンになっている。詳しくは、『LIFFドキュメント』の「[シェアターゲットピッカーを利用するには](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#using-share-target-picker)」を参照してください。

> [!WARNING]
> スマートフォンの外部ブラウザでliff.shareTargetPicker()メソッドを実行した際に、メールアドレスログインの画面が表示されることがあります
> [外部ブラウザ](https://developers.line.biz/ja/glossary/#external-browser)でターゲットピッカーを表示するには、[シングルサインオン（SSO）によるログイン](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#line-sso-login)セッションが必要です。
> 
> [自動ログイン](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#line-auto-login)によるログイン処理では、SSOによるログインセッションが発行されないため、`liff.shareTargetPicker()`メソッドの実行時にターゲットピッカーが表示されず、代わりに[メールアドレスログイン](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#mail-or-qrcode-login)の画面が表示されることがあります。
> 
> メールアドレスとパスワードを入力してログインすると、SSOによるログインセッションが発行され、ターゲットピッカーが表示されるようになります。

> [!WARNING]
> ユーザーがシェアターゲットピッカーでメッセージを送信した人数は、取得できません
> ユーザーのプライバシーを保護するため、シェアターゲットピッカーで、何人にメッセージが送信されたかの情報は取得できません。また、提供も行なっておりません。

_例_

#### 構文

javascript

`liff.shareTargetPicker(messages, options);`

#### 引数

messages

Array of objects

必須

[メッセージオブジェクト](https://developers.line.biz/ja/reference/messaging-api/#message-objects)  
最大件数：5  
Messaging APIの以下のタイプのメッセージを送信できます。

*   [テキストメッセージ](https://developers.line.biz/ja/docs/messaging-api/message-types/#text-messages)。ただし、`emojis`プロパティおよび`quoteToken`プロパティは利用できません。
*   [画像メッセージ](https://developers.line.biz/ja/docs/messaging-api/message-types/#image-messages)。
*   [動画メッセージ](https://developers.line.biz/ja/docs/messaging-api/message-types/#video-messages)。ただし、`trackingId`プロパティは利用できません。
*   [音声メッセージ](https://developers.line.biz/ja/docs/messaging-api/message-types/#audio-messages)。
*   [位置情報メッセージ](https://developers.line.biz/ja/docs/messaging-api/message-types/#location-messages)。
*   [テンプレートメッセージ](https://developers.line.biz/ja/docs/messaging-api/message-types/#template-messages)。ただし、設定できるアクションは[URIアクション](https://developers.line.biz/ja/docs/messaging-api/actions/#uri-action)のみです。
*   [Flex Message](https://developers.line.biz/ja/docs/messaging-api/message-types/#flex-messages)。ただし、設定できるアクションは[URIアクション](https://developers.line.biz/ja/docs/messaging-api/actions/#uri-action)のみです。

options

Object

任意

シェアターゲットピッカーのオプション

options.isMultiple

Boolean

任意

ユーザーがターゲットピッカーで選択するメッセージ送信先として、複数の送信先を選択可能にするかどうかを、以下のどちらかの値で指定します。デフォルト値は`true`です。

*   `true`：ユーザーはグループ、友だち、トークの中から、複数の送信先を選択できます。
*   `false`：ユーザーは友だちの中から、1人のみを送信先として選択できます。

> [!WARNING]
> isMultipleにfalseを設定しても、1人の友だちのみにメッセージが送信されることは保証できません
> `isMultiple`プロパティに`false`を設定しても、シェアターゲットピッカーを複数回呼び出すことや、シェア後のメッセージをユーザー側で再度シェアすることで、複数のユーザーへのメッセージ送信が可能です。厳密にユーザーから1人の友だちに対して、一度しかメッセージを送信できないようにする場合には、LIFFアプリ実装時に制限をかける必要があります。
> 
> URLを含むメッセージを送信し、URLへのアクセスを制限する場合の例を紹介します。
> 
> 1.  URLにユニークなトークンを付与し、メッセージを送信します。
> 2.  メッセージ内のURLへアクセスされた際にサーバー側でトークンを検証し、複数のユーザーからのアクセスを制限します。

#### 戻り値

`Promise`オブジェクトが返されます。

*   正しくメッセージが送信されると、`Promise`がresolveされ、以下のプロパティを持つオブジェクトが渡されます。
    
    status
    
    String
    
    常に`success`です。
    
*   メッセージを送信する前に、ユーザーがキャンセルしてターゲットピッカーを閉じると、`Promise`がresolveされますが、オブジェクトは渡されません。
*   ターゲットピッカーが表示される前に問題が発生した場合は、`Promise`がrejectされ、`LiffError`が渡されます。LiffErrorオブジェクトについては、「[LIFF SDKのエラー](#liff-errors)」を参照してください。

> [!WARNING]
> 注意
> `Promise`がresolveした場合とrejectした場合のコールバック関数内で、`alert()`を実行すると一部端末で正しく動作しません。

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

## カメラ

### liff.scanCodeV2()

二次元コードリーダーを起動し、読み取った文字列を取得します。二次元コードリーダーを起動するには、あらかじめ[LINE Developersコンソール](https://developers.line.biz/console/)で、 **Scan QR** をオンにする必要があります。

> [!WARNING]
> liff.scanCodeV2()の動作環境
> `liff.scanCodeV2()`は以下の環境で動作します。
> 
> *   iOS：iOS14.3以降
> *   Android：すべてのバージョン
> *   外部ブラウザ：[WebRTC API](https://developer.mozilla.org/ja/docs/Web/API/WebRTC_API) をサポートするウェブブラウザ
> 
> | OS | バージョン | LIFFブラウザ | 外部ブラウザ |
> | --- | --- | --- | --- |
> | iOS | 11〜14.2 | ❌ | ✅ ※1 |
> | 14.3以降 | ✅ ※2 | ✅ ※1 |
> | Android | すべてのバージョン | ✅ ※2 | ✅ ※1 |
> | PC | すべてのバージョン | ❌ | ✅ ※1 |
> 
> ※1 [WebRTC API](https://developer.mozilla.org/ja/docs/Web/API/WebRTC_API)をサポートするウェブブラウザのみ利用できます。
> 
> ※2 LIFFブラウザの画面サイズが`Full`の場合のみ利用できます。詳しくは、『LIFFドキュメント』の「[LIFFブラウザの画面サイズ](https://developers.line.biz/ja/docs/liff/overview/#screen-size)」を参照してください。

> [!WARNING]
> 二次元コードリーダーを起動するには［Scan QR］をオンにしてください
> [LIFFアプリをチャネルに追加する](https://developers.line.biz/ja/docs/liff/registering-liff-apps/)ときに、［**Scan QR**］をオンにしてください。［**Scan QR**］の設定は、LIFFアプリ追加後も[LINE Developersコンソール](https://developers.line.biz/console/)のLIFFタブで変更できます。

> [!WARNING]
> liff.scanCodeV2()の動作仕様
> `liff.scanCodeV2()`は、内部で[jsQR](https://github.com/cozmo/jsQR)という外部ライブラリを使用しています。そのため、`liff.scanCodeV2()`メソッド実行時に起動する二次元コードリーダーは、[jsQR](https://github.com/cozmo/jsQR)の動作仕様に依存します。なお、使用ライブラリは予告なく更新、変更される可能性があります。

_例_

#### 構文

javascript

`liff.scanCodeV2();`

#### 引数

なし

#### 戻り値

`Promise`オブジェクトが返されます。

二次元コードリーダーで文字列が読み取れると、`Promise`がresolveされ、読み取った文字列を含むオブジェクトが渡されます。

value

String

二次元コードリーダーで読み取った文字列

##### エラーレスポンス

`Promise`が`reject`されたときは、[`LiffError`](#liff-errors)が渡されます。

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

### liff.scanCode()

> [!WARNING]
> liff.scanCode()メソッドは非推奨です
> 従来の`liff.scanCode()`メソッドは[非推奨](https://developers.line.biz/ja/glossary/#deprecated)になります。二次元コードリーダーを実装する場合は、[`liff.scanCodeV2()`](#scan-code-v2)メソッドを使用することをお勧めします。

  

LINEの二次元コードリーダーを起動し、読み取った文字列を取得します。二次元コードリーダーを起動するには、あらかじめ[LINE Developersコンソール](https://developers.line.biz/console/)で、 **Scan QR** をオンにする必要があります。

> [!WARNING]
> iOS版LINEでは使用できません
> `liff.scanCode()`は以下の環境で動作します。
> 
> | OS | バージョン | LIFFブラウザ | 外部ブラウザ |
> | --- | --- | --- | --- |
> | iOS | すべてのバージョン | ❌ | ❌ |
> | Android | すべてのバージョン | ✅ | ❌ |
> | PC | すべてのバージョン | ❌ | ❌ |
> 
> 技術的な問題があり、iOS版LINEでは、`liff.scanCode`は`undefined`になります。サンプルコードのように、関数の存在を確認してから、使用してください。iOS版LINEや外部ブラウザでも二次元コードリーダーをお使いになりたい場合は、「[`liff.scanCodeV2()`](https://developers.line.biz/ja/reference/liff/#scan-code-v2)」を参照してください。

> [!WARNING]
> 二次元コードリーダーを起動するには［Scan QR］をオンにしてください
> *   [LIFFアプリをチャネルに追加する](https://developers.line.biz/ja/docs/liff/registering-liff-apps/)ときに、［**Scan QR**］をオンにしてください。［**Scan QR**］の設定は、LIFFアプリ追加後も[LINE Developersコンソール](https://developers.line.biz/console/)のLIFFタブで変更できます。
> *   `liff.scanCode()`は、外部ブラウザでは利用できません。

_例_

#### 構文

javascript

`liff.scanCode();`

#### 引数

なし

#### 戻り値

`Promise`オブジェクトが返されます。

LINEの二次元コードリーダーで文字列が読み取れると、`Promise`がresolveされ、読み取った文字列を含むオブジェクトが渡されます。

value

String

二次元コードリーダーで読み取った文字列

html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

## パーマネントリンク

### liff.permanentLink.createUrlBy()

LIFFアプリの任意のページのパーマネントリンクを取得します。

パーマネントリンクの形式：

text

`https://liff.line.me/{liffId}/{path}?{query}#{URL fragment}`

_例_

#### 構文

javascript

`liff.permanentLink.createUrlBy(url);`

#### 引数

url

String

必須

パーマネントリンクを取得するURL。任意のクエリパラメータやURLフラグメントを追加できます。

#### 戻り値

`Promise`オブジェクトが返されます。

`Promise`がresolveされると、パーマネントリンクの文字列が渡されます。

##### エラーレスポンス

パーマネントリンクを取得するURLが、[LINE Developersコンソール](https://developers.line.biz/console/)の［**エンドポイントURL**］に指定したURLで始まらない場合、`Promise`がrejectされ、[`LiffError`](#liff-errors)が渡されます。

たとえば、パーマネントリンクを取得するURL（例：`https://example.com/`）が、［**エンドポイントURL**］（例：`https://example.com/path1?q1=v1`）より上の階層の場合、`Promise`がrejectされます。

html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

### liff.permanentLink.createUrl()

> [!WARNING]
> liff.permanentLink.createUrl()は次回メジャーバージョン以降に非推奨になる可能性があります
> 技術的な問題があり、`liff.permanentLink.createUrl()`は、次回メジャーバージョン以降に非推奨になる可能性があります。現在のページのパーマネントリンクを取得するには、[`liff.permanentLink.createUrlBy()`](#permanent-link-create-url-by)を使用することをお勧めします。

現在のページのパーマネントリンクを取得します。

パーマネントリンクの形式：

text

`https://liff.line.me/{liffId}/{path}?{query}#{URL fragment}`

_例_

#### 構文

javascript

`liff.permanentLink.createUrl();`

#### 引数

なし

#### 戻り値

現在のページのパーマネントリンクが、文字列で返されます。

現在のページのURLがLINE Developersコンソールの［**エンドポイントURL**］に指定したURLで始まらない場合、`LiffError`例外が発生します。

html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

### liff.permanentLink.setExtraQueryParam()

> [!WARNING]
> liff.permanentLink.setExtraQueryParam()は次回メジャーバージョン以降に非推奨になる可能性があります
> 技術的な問題があり、`liff.permanentLink.setExtraQueryParam()`は、次回メジャーバージョン以降に非推奨になる可能性があります。現在のページのパーマネントリンクに、任意のクエリパラメータを追加するには、[`liff.permanentLink.createUrlBy()`](#permanent-link-create-url-by)を使用することをお勧めします。

現在のページのパーマネントリンクに、任意のクエリパラメータを追加できます。

`liff.permanentLink.setExtraQueryParam()`を実行するたびに、前回追加したクエリパラメータは破棄されます。

> [!TIP]
> 追加したクエリパラメータの削除について
> *   追加したクエリパラメータを削除するには、`liff.permanentLink.setExtraQueryParam("")`を実行します。
> *   追加したクエリパラメータは、ユーザーが別のページに移動すると破棄されます。

_例_

#### 構文

javascript

`liff.permanentLink.setExtraQueryParam(extraString);`

#### 引数

extraString

String

必須

追加するクエリパラメータ

#### 戻り値

なし

html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

## LIFFプラグイン

### liff.use()

[プラガブルSDK](https://developers.line.biz/ja/docs/liff/pluggable-sdk/)のLIFF APIや、[LIFFプラグイン](https://developers.line.biz/ja/docs/liff/liff-plugin/)を有効化し、初期化処理を実行します。

_プラガブルSDKのLIFF APIの例_

_LIFFプラグインの例_

#### 構文

javascript

`liff.use(module, option);`

#### 引数

module

Object

必須

プラガブルSDKのLIFF APIのモジュールやLIFFプラグイン。

LIFF APIのモジュールを渡す場合、インスタンス化する必要があります。詳しくは、『LIFFドキュメント』の「[プラガブルSDKの使用方法](https://developers.line.biz/ja/docs/liff/pluggable-sdk/#how-to-use)」を参照してください。

LIFFプラグインを渡す場合、LIFFプラグインがクラスのときは、インスタンス化する必要があります。詳しくは、『LIFFドキュメント』の「[LIFFプラグインを使用する](https://developers.line.biz/ja/docs/liff/liff-plugin/#use-liff-plugin)」を参照してください。

option

Any value

任意

`module`プロパティで指定した、LIFFプラグインに渡す値。LIFFプラグインの[`install()`](https://developers.line.biz/ja/docs/liff/liff-plugin/#install)メソッドの第2引数として渡されます。詳しくは、『LIFFドキュメント』の「[option](https://developers.line.biz/ja/docs/liff/liff-plugin/#option)」を参照してください。

#### 戻り値

`liff`オブジェクトが返されます。

html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}

## 多言語化

### liff.i18n.setLang()

LIFF SDKが表示する文言の言語を指定します。

_例_

#### 構文

javascript

`liff.i18n.setLang(language);`

#### 引数

language

String

必須

[RFC 5646（BCP 47）](https://datatracker.ietf.org/doc/html/rfc5646)で定義されている言語タグ。指定した言語タグの翻訳がない場合は、`en`がフォールバックとして使用されます。

#### 戻り値

`Promise`オブジェクトが返されます。

##### エラーレスポンス

`Promise`がrejectされたときは、[`LiffError`](#liff-errors)が渡されます。

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

## その他

### liff.createShortcutOnHomeScreen()

> [!TIP]
> 認証済ミニアプリでのみ利用できます
> この機能は、認証済ミニアプリでのみ利用できます。未認証ミニアプリの場合、開発用の内部チャネルではテストできますが、公開用の内部チャネルでは利用できません。

[LINEミニアプリ](https://developers.line.biz/ja/docs/line-mini-app/)へのショートカットを、ユーザー端末のホーム画面に追加する画面を表示します。

![](https://developers.line.biz/media/line-mini-app/develop/add-to-home-screen/add-shortcut-screen-ios-ja.png)

詳しくは、『LINEミニアプリドキュメント』の「[ユーザー端末のホーム画面にLINEミニアプリへのショートカットを追加する](https://developers.line.biz/ja/docs/line-mini-app/develop/add-to-home-screen/)」を参照してください。

> [!WARNING]
> liff.createShortcutOnHomeScreen()メソッドを実行するタイミング
> `liff.createShortcutOnHomeScreen()`メソッドは、ユーザー体験を損なわないよう、LINEミニアプリ上でのユーザー操作（例：タップ）に対する応答として実行してください。

_例_

#### 使用条件

`liff.createShortcutOnHomeScreen()`メソッドを使用するには、以下の条件をすべて満たす必要があります。

*   LINEミニアプリである。
*   LINEミニアプリのLIFF SDKのバージョンがv2.23.0以上である。
*   ユーザー端末のLINEアプリのバージョンが13.20.0以上である。

#### 動作条件

ユーザー端末のOSがiOSの場合、`liff.createShortcutOnHomeScreen()`メソッドが動作する条件は以下のとおりです。動作しない環境においてこのメソッドを実行すると、エラーページが表示されます。

| デフォルトのブラウザ | iOSのバージョン | 動作するかどうか |
| --- | --- | --- |
| Safari | すべてのバージョン | 動作する |
| Chrome | 16.4以降 | 動作する |
| Safari、Chrome以外のブラウザ | 16.4以降 | 動作は保証されない |
| Safari以外のブラウザ | 16.4未満 | 動作しない |

たとえば、iOS 16.4未満において、Chromeで`liff.createShortcutOnHomeScreen()`メソッドを実行した場合は、以下のエラーページが表示されます。

![](https://developers.line.biz/media/line-mini-app/develop/add-to-home-screen/add-shortcut-screen-ios-error-ja.png)

#### 構文

javascript

`liff.createShortcutOnHomeScreen(params);`

#### 引数

params

Object

必須

パラメータオブジェクト

params.url

String

必須

URL。以下のURLを指定できます。

*   [LIFF URL](https://developers.line.biz/ja/glossary/#liff-url)
*   [パーマネントリンク](https://developers.line.biz/ja/glossary/#permanent-link-liff)
*   LINEミニアプリのエンドポイントURL
*   LINEミニアプリのエンドポイントURLから始まるURL

#### 戻り値

`Promise`オブジェクトが返されます。

ショートカット追加画面が表示されると、`Promise`がresolveされます。値は渡されません。

なお、ユーザーが端末のホーム画面にLINEミニアプリへのショートカットを実際に追加したかどうかは確認できません。

##### エラーレスポンス

`Promise`が`reject`されたときは、[`LiffError`](#liff-errors)が渡されます。

html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}