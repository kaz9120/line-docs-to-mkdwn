---
url: https://developers.line.biz/ja/docs/liff/developing-liff-apps/
copied_at: 2025-10-23T16:00:12.711Z
---
# LIFFアプリを開発する

LIFFアプリは、HTMLやJavaScriptで構成されるウェブアプリです。ここでは、LIFFアプリを開発する手順とLIFFアプリ特有の処理について説明します。

*   [LIFFアプリのタイトルを設定する](#setting-title)
*   [LIFFアプリにLIFF SDKを組み込む](#integrating-sdk)
    *   [CDNパスを指定する](#specify-cdn-path)
    *   [npmパッケージを利用する](#use-npm-package)
*   [LIFFアプリを初期化する](#initializing-liff-app)
    *   [LIFFアプリ初期化時の注意事項](#initializing-liff-app-notes)
    *   [外部ブラウザでLINEログインを利用する場合](#to-use-line-login-in-external-browser)
*   [LIFF APIを呼び出す](#calling-liff-api)
    *   [LIFFアプリが動作している環境を取得する](#getting-environment)
    *   [ログイン処理を行う](#login-with-line-login)
    *   [URLを開く](#opening-url)
    *   [二次元コードリーダーを表示する](#opening-two-dimensional-code-reader)
    *   [LIFFアプリが起動された画面を取得する](#getting-context)
    *   [ユーザーのプロフィールを取得する](#getting-user-profile)
    *   [ユーザーとLINE公式アカウントの友だち関係を取得する](#get-friendship-status)
    *   [LIFFアプリの任意のページのパーマネントリンクを取得する](#get-permanent-link)
    *   [現在のトークルームにメッセージを送信する](#sending-messages)
    *   [ユーザーの友だちにメッセージを送信する（シェアターゲットピッカー）](#share-target-picker)
    *   [LIFFアプリを閉じる](#closing-liff-app)
*   [OGPタグを設定する](#setting-ogp-tags)
*   [LIFFアプリではない外部のサイトに遷移した場合](#transition-to-external-site)
*   [LIFFアプリを閉じたときの挙動](#behavior-when-closing-liff-app)
    *   [LINEアプリのバージョンが15.12.0以降の場合](#closing-liff-app-after-15-12-0)
    *   [LINEアプリのバージョンが15.12.0より前の場合](#closing-liff-app-before-15-12-0)
*   [次のステップ](#steps-after-developing-liff-app)

## LIFFアプリのタイトルを設定する

LIFFアプリのタイトルは、LIFFアプリのヘッダーに表示されます。LIFFアプリのHTMLソースの`<title>`要素に、LIFFアプリのタイトルを指定します。

html

`<!DOCTYPE html> <html lang="ja">   <head>    <meta name="viewport" content="width=device-width, initial-scale=1.0">    <title>タイトル</title>`

## LIFFアプリにLIFF SDKを組み込む

LIFFアプリには、以下の2種類の方法でLIFF SDKを組み込めます。

*   [CDNパスを指定する](#specify-cdn-path)
*   [npmパッケージを利用する](#use-npm-package)

### CDNパスを指定する

LIFF SDKで提供する機能を利用するには、LIFFアプリのHTMLソースの`<script>`要素の`src`属性に、LIFF SDKのCDNパスを指定します。LIFFでは、以下の2種類のCDNパスを用意しています。目的に合ったCDNパスを指定してください。

| CDNパス | 説明 |
| --- | --- |
| CDNエッジパス | メジャーバージョンのみを含むCDNパスです。常に最新の機能を使用する場合は、このCDNパスを使用します。メジャーバージョンがアップデートされたときのみURLを更新する必要があります。<br/>例：https://static.line-scdn.net/liff/edge/**2**/sdk.js |
| CDN固定パス | パッチバージョンまで含むCDNパスです。特定のバージョンの機能を使用する場合は、このCDNパスを使用します。LIFFアプリを更新しない限り、指定したパッチバージョンを使い続けることができます。LIFFの新機能や、セキュリティ改善、バグ修正を反映したいときのみURLを更新してください。自動的に更新されないため、LIFF SDKのアップデートの影響を受けません。<br/>例：https://static.line-scdn.net/liff/edge/**versions/2.22.3**/sdk.js |

:::note warn
どのバージョンを使うべきか

:::

CDN固定パスを指定する例：

html

`<script charset="utf-8" src="https://static.line-scdn.net/liff/edge/versions/2.22.3/sdk.js"></script>`

:::note warn
LIFF SDKはUTF-8で書かれています

:::

### npmパッケージを利用する

LIFFでは、npmパッケージも公開しています。npmを利用して、LIFF SDKをインストールすることもできます。

:::note warn
SDKバージョンを管理してください

:::

:::note warn
webpack v5を使ったプロジェクトでLIFF v2.16.0以前のnpm版を使用すると、ビルド時にエラーが発生します

:::

LIFF SDKをnpmでインストールし、アプリに組み込むための手順は、以下のとおりです。

1.  以下のコマンドをターミナルで実行し、npmでLIFF SDKをインストールしてください。
    
    bash
    
    `$ npm install --save @line/liff`
    
      
    あるいは、以下のコマンドをターミナルで実行し、YarnでLIFF SDKをインストールすることもできます。
    
    bash
    
    `$ yarn add @line/liff`
    
2.  SDKをアプリに組み込む  
    JavaScriptまたはTypeScriptファイルに以下のコードを組み込んでください。
    
    js
    
    `import liff from "@line/liff"; liff.init({   liffId: "1234567890-AbcdEfgh", // Use own liffId });`
    
      
    TypeScriptの型の定義は`@line/liff`パッケージに含まれています。:::note warn
    window.liff を宣言および編集しないでください
    
    :::
    

関連ページ：[https://www.npmjs.com/package/@line/liff](https://www.npmjs.com/package/@line/liff)

:::note info
LIFF SDKのファイルサイズを削減する

:::

## LIFFアプリを初期化する

[`liff.init()`](https://developers.line.biz/ja/reference/liff/#initialize-liff-app)メソッドを実行すると、LIFFアプリが初期化され、LIFFアプリからLIFF SDKの他のメソッドを実行できるようになります。

LIFFアプリは、ページを開くたびに必ず初期化する必要があります。同じLIFFアプリ内での遷移であっても、新たにページを開く場合には`liff.init()`メソッドを実行してください。

LIFFアプリが正しく初期化されていない状態でLIFFの機能を使用した場合、それらの動作は保証対象外です。

ユーザーがLINEアプリ上で[LIFF URL](https://developers.line.biz/ja/glossary/#liff-url)にアクセスしてから、LIFFアプリが初期化されるまでの流れは以下のとおりです。

詳しくは、「[LIFF URLにアクセスしてからLIFFアプリが開くまでの動作について](https://developers.line.biz/ja/docs/liff/opening-liff-app/#redirect-flow)」を参照してください。

:::note warn
LIFFアプリのクエリパラメータについて

:::

:::note info
LIFFアプリを初期化する前でも実行できるメソッド

:::

:::note info
外部ブラウザでのLIFFアプリ初期化時にliff.login()メソッドを自動で実行するには

:::

`liffId`に指定するLIFFアプリIDは、LIFFアプリをチャネルに追加すると取得できます。詳しくは、「[LIFFアプリをチャネルに追加する](https://developers.line.biz/ja/docs/liff/registering-liff-apps/)」を参照してください。

javascript

`liff   .init({    liffId: "1234567890-AbcdEfgh", // Use own liffId  })  .then(() => {    // start to use LIFF's api  })  .catch((err) => {    console.log(err);  });`

なお、`liff.ready`で、LIFFアプリ起動後、`liff.init()`の実行が初めて終了したときにresolveする`Promise`オブジェクトを取得できます。

詳しくは、『LIFF v2 APIリファレンス』の「[liff.init()](https://developers.line.biz/ja/reference/liff/#initialize-liff-app)」および「[liff.ready](https://developers.line.biz/ja/reference/liff/#ready)」を参照してください。

### LIFFアプリ初期化時の注意事項

LIFFアプリを初期化する際の注意事項は以下のとおりです。注意事項を確認し、理解した上でLIFFアプリの開発を行ってください。

*   [`liff.init()`をエンドポイントURL以下の階層で実行する](#initializing-liff-app-notes-1)
*   [`liff.init()`を1次リダイレクト先URLと2次リダイレクト先URLで1回ずつ実行する](#initializing-liff-app-notes-2)
*   [URLを操作する処理は`liff.init()`が完了してから実行する](#initializing-liff-app-notes-3)
*   [1次リダイレクト先URLの取り扱いに注意する](#initializing-liff-app-notes-4)

#### liff.init()をエンドポイントURL以下の階層で実行する

`liff.init()`メソッドはエンドポイントURLと完全に一致、もしくはエンドポイントURLよりも下の階層においてのみ動作します。これら以外のURLに遷移して実行した場合、`liff.init()`メソッドの動作は保証されません。

以下の例では、エンドポイントURLが`https://example.com/path1/`の場合に、`liff.init()`メソッドを実行するURLで動作が保証されるかどうかを示しています。なお、動作が保証されないURLでは、[マルチタブビュー](https://developers.line.biz/ja/docs/liff/overview/#multi-tab-view)などのLIFFアプリの一部機能が正しく動作しない可能性があります。

| `liff.init()`を実行するURL | 動作の保証 |
| --- | --- |
| `https://example.com/` | ❌ |
| `https://example.com/path1/` | ✅ |
| `https://example.com/path1/language/` | ✅ |
| `https://example.com/path2/` | ❌ |

:::note warn
liff.init()メソッドの実行時に、コンソールに「liff.init() was called with a current URL that is not related to the endpoint URL.」という警告メッセージが表示される

:::

#### liff.init()を1次リダイレクト先URLと2次リダイレクト先URLで1回ずつ実行する

`liff.init()`メソッドは、1次リダイレクト先URLに付与される`liff.state`や`access_token=xxx`などの情報を元に初期化処理を行います。エンドポイントURLにクエリパラメータやパスが含まれている場合、正しくLIFFアプリを初期化するために、1次リダイレクト先URLと2次リダイレクト先URLで、1回ずつ`liff.init()`メソッドを実行してください。リダイレクトについて詳しくは、「[LIFF URLにアクセスしてからLIFFアプリが開くまでの動作について](https://developers.line.biz/ja/docs/liff/opening-liff-app/#redirect-flow)」を参照してください。

#### URLを操作する処理はliff.init()が完了してから実行する

URLを操作する処理は、`liff.init()`メソッドが返す`Promise`オブジェクトがresolveしてから実行してください。

javascript

`// Example using window.location.replace() liff   .init({    liffId: "1234567890-AbcdEfgh", // Use own liffId  })  .then(() => {    // Redirect to another page after the returned Promise object has been resolved    window.location.replace(location.href + "/entry/");  });`

`Promise`オブジェクトがresolveする前に、次のようなURLを操作する処理を実行すると、LIFFアプリを正常に開けない場合があります。

*   [`Document.location`](https://developer.mozilla.org/ja/docs/Web/API/Document/location)プロパティや[`Window.location`](https://developer.mozilla.org/ja/docs/Web/API/Window/location)プロパティを使ってURLを変更する
*   [History API](https://developer.mozilla.org/ja/docs/Web/API/History_API)の[`history.pushState()`](https://developer.mozilla.org/ja/docs/Web/API/History/pushState)メソッドや[`history.replaceState()`](https://developer.mozilla.org/ja/docs/Web/API/History/replaceState)メソッドを使ってURLを変更する
*   サーバー側でステータスコード`301`や`302`を返し、別のURLにリダイレクトする

#### 1次リダイレクト先URLの取り扱いに注意する

1次リダイレクト先URLに自動的に付与される`access_token=xxx`はユーザーのアクセストークン（機密情報）です。Google Analyticsなど外部のロギングツールに、1次リダイレクト先URLを送らないように注意してください。

なお、LIFF v2.11.0以降のバージョンでは、`liff.init()`メソッドがresolveされたタイミングでURLから機密情報が除外されます。そのため、以下のように`then()`メソッド内でページビューを送信することで、機密情報の漏洩を防ぐことができます。ロギングツールを利用する場合は、LIFFアプリをv2.11.0以降にバージョンアップすることをお勧めします。LIFF v2.11.0の更新内容について詳しくは、「[リリースノート](https://developers.line.biz/ja/docs/liff/release-notes/#liff-v2-11-0)」を参照してください。

javascript

`liff   .init({    liffId: "1234567890-AbcdEfgh", // Use own liffId  })  .then(() => {    ga("send", "pageview");  });`

### 外部ブラウザでLINEログインを利用する場合

外部ブラウザでLINEログインを利用する場合は、以下のとおり`liff.init()`メソッドを2回実行します。

1.  LIFF SDKロード後に、`liff.init()`メソッドを実行します。
2.  `liff.login()`メソッドを実行し、認証ページおよび認可画面の処理が終了すると、LIFFアプリ（`redirectUri`）にリダイレクトされます。そこで、改めて`liff.init()`メソッドを実行します。  
    `liff.init()`メソッドの処理中にエラーが発生した場合、またはログイン時にユーザーが認可をキャンセルした場合は、`errorCallback`が実行されます。

![フロー図](https://developers.line.biz/media/liff/initializing-liff-app-flow.png)

:::note warn
LIFFブラウザ内での認可リクエストについて

:::

## LIFF APIを呼び出す

LIFF SDKの組み込みとLIFFの初期化を行うことで、LIFFアプリの機能を使用できます。

*   [LIFFアプリが動作している環境を取得する](#getting-environment)
*   [ログイン処理を行う](#login-with-line-login)
*   [URLを開く](#opening-url)
*   [二次元コードリーダーを表示する](#opening-two-dimensional-code-reader)
*   [LIFFアプリが起動された画面を取得する](#getting-context)
*   [ユーザーのプロフィールを取得する](#getting-user-profile)
*   [ユーザーとLINE公式アカウントの友だち関係を取得する](#get-friendship-status)
*   [現在のページのパーマネントリンクを取得する](#get-permanent-link)
*   [現在のトークルームにメッセージを送信する](#sending-messages)
*   [ユーザーの友だちにメッセージを送信する（シェアターゲットピッカー）](#share-target-picker)
*   [LIFFアプリを閉じる](#closing-liff-app)

### LIFFアプリが動作している環境を取得する

`liff.isInClient()`メソッドや`liff.getOS()`メソッドなどを実行して、LIFFアプリが動作している環境を取得します。

javascript

`// print the environment in which the LIFF app is running console.log(liff.getAppLanguage()); console.log(liff.getVersion()); console.log(liff.isInClient()); console.log(liff.isLoggedIn()); console.log(liff.getOS()); console.log(liff.getLineVersion());`

詳しくは、『LIFF APIリファレンス』の各メソッドを参照してください。

*   [liff.getAppLanguage()](https://developers.line.biz/ja/reference/liff/#get-app-language)
*   [liff.getVersion()](https://developers.line.biz/ja/reference/liff/#get-version)
*   [liff.isInClient()](https://developers.line.biz/ja/reference/liff/#is-in-client)
*   [liff.isLoggedIn()](https://developers.line.biz/ja/reference/liff/#is-logged-in)
*   [liff.getOS()](https://developers.line.biz/ja/reference/liff/#get-os)
*   [liff.getLineVersion()](https://developers.line.biz/ja/reference/liff/#get-line-version)

### ログイン処理を行う

[外部ブラウザ](https://developers.line.biz/ja/glossary/#external-browser)および[LINE内ブラウザ](https://developers.line.biz/ja/glossary/#line-iab)の場合、`liff.login()`メソッドを実行して、ログイン処理を行います。

:::note warn
注意

:::

:::note info
liff.init()メソッド実行時にwithLoginOnExternalBrowserプロパティをtrueにした場合

:::

javascript

`// login call, only when external browser or LINE's in-app browser is used if (!liff.isLoggedIn()) {   liff.login(); }`

また、`liff.logout()`メソッドを実行して、ログアウトすることもできます。

javascript

`// logout call only when external browse or LINE's in-app browser is used if (liff.isLoggedIn()) {   liff.logout();  window.location.reload(); }`

詳しくは、『LIFF v2 APIリファレンス』の「[liff.login()](https://developers.line.biz/ja/reference/liff/#login)」および「[liff.logout()](https://developers.line.biz/ja/reference/liff/#logout)」を参照してください。

### URLを開く

`liff.openWindow()`メソッドを実行して、指定したURLをLINE内ブラウザまたは外部ブラウザで開きます。

以下のコードは`https://line.me`を外部ブラウザで開きます。

javascript

`// openWindow call liff.openWindow({   url: "https://line.me",  external: true, });`

詳しくは、『LIFF v2 APIリファレンス』の「[liff.openWindow()](https://developers.line.biz/ja/reference/liff/#open-window)」を参照してください。

### 二次元コードリーダーを表示する

`liff.scanCodeV2()`メソッドを実行して、二次元コードリーダーを起動し、ユーザーが読み取った文字列を取得します。

javascript

`// scanCodeV2 call liff   .scanCodeV2()  .then((result) => {    // e.g. result = { value: 'Hello LIFF app!' }  })  .catch((err) => {    console.log(err);  });`

詳しくは、『LIFF APIリファレンス』の「[liff.scanCodeV2()](https://developers.line.biz/ja/reference/liff/#scan-code-v2)」を参照してください。

:::note warn
liff.scanCode()メソッドは非推奨です

:::

:::note warn
liff.scanCode2()メソッドの動作環境

:::

:::note warn
二次元コードリーダーを起動するには［Scan QR］をオンにしてください

:::

### LIFFアプリが起動された画面を取得する

`liff.getContext()`メソッドを実行して、LIFFアプリが起動された画面（1対1のトーク、グループトーク、複数人トーク、または外部ブラウザ）に関する情報を取得します。

javascript

`const context = liff.getContext(); console.log(context); // {"type": "utou", "userId": "U70e153189a29f1188b045366285346bc", "viewType": "full", "accessTokenHash": "ArIXhlwQMAZyW7SDHm7L2g", "availability": {"shareTargetPicker": {"permission": true, "minVer": "10.3.0"}, "multipleLiffTransition": {"permission": true, "minVer": "10.18.0"}}}`

詳しくは、『LIFF v2 APIリファレンス』の「[liff.getContext()](https://developers.line.biz/ja/reference/liff/#get-context)」を参照してください。

### ユーザーのプロフィールを取得する

LIFFアプリでIDトークンを取得して、ユーザーのプロフィールを取得する方法は2つあります。目的に合わせて正しく使い分けてください。

*   [サーバーに送信するために取得する](#getting-tokens)
*   [LIFFアプリで使用するために取得する](#getting-decoded-id-token)

:::note warn
スコープを選択してください

:::

:::note info
メールアドレスを取得できます

:::

#### サーバーに送信するために取得する

LIFFアプリからサーバーにユーザー情報を送信する場合は、以下の方法で取得したアクセストークンまたはIDトークンを送信します。サーバーでユーザー情報を使用する方法について詳しくは、「[LIFFアプリおよびサーバーでユーザー情報を使用する](https://developers.line.biz/ja/docs/liff/using-user-profile/)」を参照してください。

*   `liff.getAccessToken()`メソッドを実行して、現在のユーザーのアクセストークンを取得します。なお、ユーザーがLIFFアプリを閉じると、有効期限が切れていなくてもアクセストークンは無効化されます。
    
    javascript
    
    `// get access token if (!liff.isLoggedIn() && !liff.isInClient()) {   window.alert(    'To get an access token, you need to be logged in. Tap the "login" button below and try again.',  ); } else {   const accessToken = liff.getAccessToken();  console.log(accessToken); }`
    
      
    詳しくは、『LIFF v2 APIリファレンス』の「[liff.getAccessToken()](https://developers.line.biz/ja/reference/liff/#get-access-token)」を参照してください。
*   `liff.getIDToken()`メソッドを実行して、「現在のユーザーの生のIDトークン」を取得します。
    
    javascript
    
    `liff.init(() => {   const idToken = liff.getIDToken();  console.log(idToken); // print raw idToken object });`
    
      
    詳しくは、『LIFF v2 APIリファレンス』の「[liff.getIDToken()](https://developers.line.biz/ja/reference/liff/#get-id-token)」を参照してください。

#### LIFFアプリで使用するために取得する

`liff.getDecodedIDToken()`メソッドを実行して、現在のユーザーのプロフィール情報およびメールアドレスを取得します。

LIFFアプリでユーザーの表示名などを利用する場合に、このAPIを利用してください。

:::note alert
ユーザー情報をサーバーに送信しないでください

:::

javascript

`liff.init(() => {   const idToken = liff.getDecodedIDToken();  console.log(idToken); // print decoded idToken object });`

詳しくは、『LIFF v2 APIリファレンス』の「[liff.getDecodedIDToken()](https://developers.line.biz/ja/reference/liff/#get-decoded-id-token)」を参照してください。

### ユーザーとLINE公式アカウントの友だち関係を取得する

ユーザーと、LIFFアプリが追加されているLINEログインのチャネルにリンクされているLINE公式アカウントの友だち関係を取得します。

LINEログインのチャネルにLINE公式アカウントをリンクする方法については、『LINEログインドキュメント』の「[LINEログインしたときにLINE公式アカウントを友だち追加する（友だち追加オプション）](https://developers.line.biz/ja/docs/line-login/link-a-bot/)」を参照してください。

javascript

`liff.getFriendship().then((data) => {   if (data.friendFlag) {    // something you want to do  } });`

詳しくは、『LIFF v2 APIリファレンス』の「[liff.getFriendship()](https://developers.line.biz/ja/reference/liff/#get-friendship)」を参照してください。

:::note warn
スコープを選択してください

:::

### LIFFアプリの任意のページのパーマネントリンクを取得する

`liff.permanentLink.createUrlBy()`メソッドを実行して、LIFFアプリの任意のページのパーマネントリンクを取得できます。

javascript

`// For example, if the endpoint URL of the LIFF app is https://example.com/path1?q1=v1 and its LIFF ID is 1234567890-AbcdEfgh liff.permanentLink   .createUrlBy("https://example.com/path1?q1=v1")  .then((permanentLink) => {    // https://liff.line.me/1234567890-AbcdEfgh    console.log(permanentLink);  }); liff.permanentLink   .createUrlBy("https://example.com/path1/path2?q1=v1&q2=v2")  .then((permanentLink) => {    // https://liff.line.me/1234567890-AbcdEfgh/path2?q=2=v2    console.log(permanentLink);  });`

詳しくは、『LIFF v2 APIリファレンス』の「[liff.permanentLink.createUrlBy()](https://developers.line.biz/ja/reference/liff/#permanent-link-create-url-by)」を参照してください。

### 現在のトークルームにメッセージを送信する

`liff.sendMessages()`メソッドを実行して、ユーザーの代わりに、LIFFアプリが開かれているトークルームにメッセージを送信します。1回のリクエストでメッセージオブジェクトを最大5つまで送信できます。

以下のコードは、LIFFアプリが表示されているトークルームに、ユーザーのメッセージとして「Hello, World!」を送信します。

javascript

`liff   .sendMessages([    {      type: "text",      text: "Hello, World!",    },  ])  .then(() => {    console.log("message sent");  })  .catch((err) => {    console.log("error", err);  });`

詳しくは、『LIFF APIリファレンス』の「[liff.sendMessages()](https://developers.line.biz/ja/reference/liff/#send-messages)」を参照してください。

### ユーザーの友だちにメッセージを送信する（シェアターゲットピッカー）

`liff.shareTargetPicker()`メソッドを実行して、ターゲットピッカー（グループまたは友だちを選択する画面）を表示し、ターゲットピッカーで選択した相手に、開発者が作成したメッセージを送信します。このメッセージは、ユーザーが送信したかのように、グループまたは友だちに表示されます。

![target picker](https://developers.line.biz/media/liff/share-target-picker_tobe_ja.png)

#### シェアターゲットピッカーを利用するには

シェアターゲットピッカーを利用するには、以下の手順に従って「情報利用に関する同意について」に同意する必要があります。この同意は、チャネルごとに必要です。

1.  [LINE Developersコンソール](https://developers.line.biz/console/)で、LIFFアプリを追加するLINEログインのチャネルを選択します。
2.  ［**LIFF**］タブの［**シェアターゲットピッカー**］をクリックすると、「情報利用に関する同意について」が表示されます。
3.  表示された内容をよく読み、［**上記の事項に同意する**］をチェックし、［**有効化**］をクリックします。

#### シェアターゲットピッカーのサンプルコード

以下のコードは、ターゲットピッカーを表示し、選択したグループまたは友だちに、ユーザーのメッセージとして「Hello, World!」を送信します。あらかじめ、`liff.isApiAvailable()`メソッドを実行すると、LIFFアプリを起動した環境でターゲットピッカーが使用可能であることを確認できます。

javascript

`if (liff.isApiAvailable("shareTargetPicker")) {   liff.shareTargetPicker([    {      type: "text",      text: "Hello, World!",    },  ]); }`

詳しくは、『LIFF v2 APIリファレンス』の「[liff.isApiAvailable()](https://developers.line.biz/ja/reference/liff/#is-api-available)」および「[liff.shareTargetPicker()](https://developers.line.biz/ja/reference/liff/#share-target-picker)」を参照してください。

### LIFFアプリを閉じる

`liff.closeWindow()`メソッドを実行して、開いているLIFFアプリを閉じます。

javascript

`// closeWindow call if (!liff.isInClient()) {   window.alert(    "This button is unavailable as LIFF is currently being opened in an external browser.",  ); } else {   liff.closeWindow(); }`

詳しくは、『LIFF v2 APIリファレンス』の「[liff.closeWindow()](https://developers.line.biz/ja/reference/liff/#close-window)」を参照してください。

:::note warn
注意

:::

## OGPタグを設定する

LIFFアプリの各ページにOGPタグを設定すると、たとえばLINEのトークルームでLIFFアプリのURL（`https://liff.line.me/{liffId}`）をシェアしたときに、任意のタイトルや説明文、サムネイル画像を表示できます。

LIFFで対応しているOGPタグは以下のとおりです。OGPタグについて詳しくは、「[The Open Graph protocol](https://ogp.me/)」を参照してください。

html

``<html lang="ja" prefix="og: http://ogp.me/ns#"> <meta property="og:title" content="タイトル"> <meta property="og:type" content="`website`、`blog`、または`article`"> <meta property="og:description" content="ページの簡単な説明"> <meta property="og:url" content="ページのURL"> <meta property="og:site_name" content="サイト全体を表す名前"> <meta property="og:image" content="サムネイル画像のURL">``

:::note warn
注意

:::

## LIFFアプリではない外部のサイトに遷移した場合

LIFFブラウザでは、LIFFアプリからLIFFアプリでない外部サイトを開いた場合、「外部サイトに遷移した」ということを示すポップアップが表示されます。

![外部サイトに遷移した時のポップアップ](https://developers.line.biz/media/news/2022/liff-opening-external-site-ja.jpg)

ポップアップは、同じウィンドウで外部サイトを開いた場合にのみ表示されます。別のウィンドウで外部サイトを開いた場合は、ポップアップは表示されません。

:::note warn
LIFFアプリのエンドポイントURLより上の階層への遷移

:::

## LIFFアプリを閉じたときの挙動

LIFFブラウザで開かれているLIFFアプリを、ユーザーの操作や[`liff.closeWindow()`](https://developers.line.biz/ja/reference/liff/#close-window)で閉じたときの挙動は、LINEアプリのバージョンやLIFFアプリの設定によって異なります。

### LINEアプリのバージョンが15.12.0以降の場合

LINEアプリのバージョンが15.12.0以降の場合、LIFFアプリがマルチタブビューの[「最近使用したサービス」に表示される条件](https://developers.line.biz/ja/docs/liff/overview/#multi-tab-view-condition)を満たしているかどうかでLIFFアプリを閉じたときの挙動が変わります。

| dummy | dummy |
| --- | --- |
| 条件を満たしている場合 | LIFFアプリを閉じた場合も、12時間以内であればLIFFアプリが再開できます。アクセストークンやブラウザの閲覧履歴、画面のスクロール位置は保持されます。 |
| 条件を満たしていない場合 | LIFFアプリを閉じると同時にLIFFアプリが終了します。このため、LIFFアプリを閉じるとアクセストークンは無効化されます。 |

詳しくは、「[最近使用したサービス](https://developers.line.biz/ja/docs/liff/overview/#multi-tab-view-recent-service)」を参照してください。

### LINEアプリのバージョンが15.12.0より前の場合

LINEアプリのバージョンが15.12.0より前の場合、LIFFアプリを閉じると同時にLIFFアプリが終了します。このため、LIFFアプリを閉じるとアクセストークンは無効化されます。

## 次のステップ

LIFFアプリを開発したら、任意のサーバーにデプロイしてください。デプロイ後は、以下の操作を行います。

1.  [LIFFアプリをチャネルに追加する](https://developers.line.biz/ja/docs/liff/registering-liff-apps/)
2.  [LIFFアプリを開く](https://developers.line.biz/ja/docs/liff/opening-liff-app/)

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}