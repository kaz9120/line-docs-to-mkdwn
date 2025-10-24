---
url: https://developers.line.biz/ja/docs/line-login-sdks/android-sdk/integrate-line-login/
copied_at: 2025-10-24T10:16:18.149Z
---
# AndroidアプリにLINEログインを組み込む

このトピックでは、[LINEログイン](https://developers.line.biz/ja/docs/line-login/overview/)の実装方法として、既存のAndroidアプリにLINE SDK for Androidを組み込む方法について説明します。LINEログインの機能を簡単に確認するには、LINEログインのAndroid向けのLINEログインサンプルアプリを利用できます。詳しくは、「[サンプルアプリを試してみる](https://developers.line.biz/ja/docs/line-login-sdks/android-sdk/try-line-login/)」を参照してください。

## 前提条件

LINE SDK for Androidをビルドして使用するには、以下が必要です。

*   [プロバイダー](https://developers.line.biz/ja/glossary/#provider)およびLINEログインのチャネルを作成する。どちらもLINE Developersコンソールで[作成できます](https://developers.line.biz/console/register/line-login/channel/)。
*   `minSdkVersion`を24以降（Android 7.0以降）に設定する。

> [!TIP]
> minSdkVersionを24未満（Android 7.0未満）に設定する
> `minSdkVersion`を24未満（Android 7.0未満）に設定したい場合は、以前のバージョンのLINE SDK for Androidを利用してください。詳しくは、「[Releases](https://github.com/line/line-sdk-android/releases)」を参照してください。

> [!WARNING]
> リソース名のコンフリクト
> SDK内のリソースとコンフリクトする可能性があるため、`linesdk_`で始まるリソースIDは使用しないでください。

## 以前のバージョンからのアップグレードについて

LINE SDK v4.x以前と最新バージョンの主な違いは以下のとおりです。

*   ログインを開始するときに、[スコープ](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#scopes)を指定して、アプリが取得するユーザー情報の種類を明らかにする必要があります。
*   ログイン時に`OPENID_CONNECT`スコープを指定すると、ユーザー情報を安全に検証するための[IDトークン](https://developers.line.biz/ja/docs/line-login-sdks/android-sdk/managing-users/#get-id-token)を取得できます。

## LINE SDKに依存性を追加する

LINE SDK for Androidを組み込むには、必要なライブラリをプロジェクトにインポートし、以下の手順に従ってプロジェクトのAndroidマニフェストファイルを設定します。

### ライブラリをプロジェクトにインポートする

モジュールレベルの`build.gradle`ファイルに、LINE SDKの依存性を追加します。

[![Maven Central](https://img.shields.io/maven-central/v/com.linecorp.linesdk/linesdk.svg?label=Maven%20Central)](https://search.maven.org/search?q=g:%22com.linecorp.linesdk%22%20AND%20a:%22linesdk%22)

```groovy
repositories {
   ...
   mavenCentral()
}

dependencies {
    ...
    implementation 'com.linecorp.linesdk:linesdk:latest.release'
    ...
}
```

### Androidのコンパイルオプションを追加する

Java 1.8のサポートを有効にします。前述の`build.gradle`ファイルに以下の行を追加します。

```text
android {
...
  compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
...
}
```

## Androidマニフェストファイルを設定する

アプリがインターネットに接続する必要があることを明示するために、`AndroidManifest.xml`ファイルに`INTERNET`権限を追加します。

```xml
<uses-permission android:name="android.permission.INTERNET"/>
```

> [!WARNING]
> 注意
> ログイン呼び出しを行うアクティビティの起動モードが`singleInstance`に設定されていると、`onActivityResult`コールバックを正しく受け取れない場合があります。

## アプリをチャネルにリンクする

アプリをLINEログインのチャネルにリンクするために、[LINE Developersコンソール](https://developers.line.biz/console/)のチャネル設定にある［LINEログイン設定］タブの［ネイティブアプリ］を有効にして、以下の項目を入力します。

*   **パッケージ名**：必須。Google Playストアを起動するためのアプリケーションのパッケージ名です。
*   **パッケージの署名**：省略可能。複数の署名を指定するには、改行で区切ります。
*   **Android URLスキーム**：省略可能。アプリを起動するためのカスタムURLスキームです。

![Androidパッケージ名、パッケージの署名、URLスキーム設定](https://developers.line.biz/media/line-login/integrate-login-android/android-app-settings.png)

### パッケージの署名を設定する

パッケージの署名は、アプリとLINEアプリ間の認証処理を強化するために重要です。パッケージの署名には、デバッグパッケージ署名と、リリースパッケージ署名があります。これらは、SHA-1形式のキーハッシュに関連しています。

#### デバッグパッケージ署名

デバッグパッケージ署名は、アプリの実行またはデバッグ時に、Android Studioによって自動生成されるデバッグ証明書から生成されます。

```bash
# macOSの場合
keytool -exportcert -alias androiddebugkey -keystore ~/.android/debug.keystore -storepass android -keypass android | openssl sha1

# Windowsの場合
keytool -exportcert -alias androiddebugkey -keystore %USERPROFILE%\.android\debug.keystore -storepass android -keypass android | openssl sha1
```

#### リリースパッケージ署名

リリースパッケージ署名は、ストアにアプリをリリースする際に使用するリリース証明書から生成されます。`<RELEASE_KEY_ALIAS>`と`<RELEASE_KEY_PATH>`は、実際の値に置き換えてください。

```bash
keytool -exportcert -alias <RELEASE_KEY_ALIAS> -keystore <RELEASE_KEY_PATH> | openssl sha1
```

#### Google Play Consoleを使用してリリースキーハッシュを取得する

[Play アプリ署名](https://developer.android.com/studio/publish/app-signing?hl=ja#app-signing-google-play)を使用している場合は、ターミナルでリリースキーハッシュを生成するのではなく、Google Play Consoleから取得したSHA-1証明書フィンガープリントを使用してください。詳しくは、『Play Console ヘルプ』の「[Play アプリ署名を使用する](https://support.google.com/googleplay/android-developer/answer/9842756?hl=ja)」を参照してください。

Google Play Consoleで、［**設定**］ > ［**アプリ署名**］に移動し、SHA-1証明書フィンガープリントの値をコピーします。

## LINEログインボタンを追加する

ユーザーがAndroidアプリにログインできるようにするために、LINEロゴがついたログインボタンを作成できます。ユーザーはこのボタンを使ってログインできます。

ログインを実行するには2つの方法があります。

*   [LINE SDKに組み込まれているログインボタンを使う](#use-button)
*   [カスタマイズしたログインボタンを使う](#use-code)

### LINE SDKに組み込まれているログインボタンを使う

LINE SDKには定義済みのログインボタンが備わっています。ユーザーが簡単にアプリにログインできるように、以下の手順に従って、アプリのユーザーインターフェイスにログインボタンを追加できます。

1.  レイアウトXMLファイルにログインボタンを追加します。
    ```xml
    <com.linecorp.linesdk.widget.LoginButton
        android:id="@+id/line_login_btn"
        android:layout_width="match_parent"
        android:layout_height="wrap_content" />
    ```
    
2.  アクティビティまたはフラグメント内のビューに必要なパラメータを設定し、リスナーを割り当てます。
    ```java
    import java.util.Arrays;
    
    // A delegate for delegating the login result to the internal login handler.
    private LoginDelegate loginDelegate = LoginDelegate.Factory.create();
    
    LoginButton loginButton = rootView.findViewById(R.id.line_login_btn);
    
    // if the button is inside a Fragment, this function should be called.
    loginButton.setFragment(this);
    
    loginButton.setChannelId(channelIdEditText.getText().toString());
    
    // configure whether login process should be done by Line App, or inside WebView.
    loginButton.enableLineAppAuthentication(true);
    
    // set up required scopes and nonce.
    loginButton.setAuthenticationParams(new LineAuthenticationParams.Builder()
            .scopes(Arrays.asList(Scope.PROFILE))
            // .nonce("<a randomly-generated string>") // nonce can be used to improve security
            .build()
    );
    loginButton.setLoginDelegate(loginDelegate);
    loginButton.addLoginListener(new LoginListener() {
        @Override
        public void onLoginSuccess(@NonNull LineLoginResult result) {
            Toast.makeText(getContext(), "Login success", Toast.LENGTH_SHORT).show();
        }
    
        @Override
        public void onLoginFailure(@Nullable LineLoginResult result) {
            Toast.makeText(getContext(), "Login failure", Toast.LENGTH_SHORT).show();
        }
    });
    ```
    

### カスタマイズしたログインボタンを使う

デフォルトのログインボタンを使う代わりに、コードを使ってユーザーインターフェイスとログインプロセスをカスタマイズすることもできます。

#### 画像をダウンロードしてプロジェクトに追加する

LINEログインボタンの画像セットには、iOS、Android、デスクトップアプリ用の画像が含まれます。Android向けの画像セットには、複数の画面密度とさまざまな状態のボタンの画像が用意されています。ここでは、Androidフォルダー内の「通常時」と「押下時」のログインボタン画像を使用した例を紹介します。

1.  [LINEログインのボタン画像](https://vos.line-scdn.net/line-developers/docs/media/line-login/login-button/LINE_Login_Button_Image.zip)をダウンロードし、抽出します。
2.  各画面密度にあわせて、「通常時」と「押下時」のログインボタンを`drawable`フォルダーに追加します。

#### 画像を設定する

画像を使用する前に、ログインボタンのテキストを追加する必要があります。各言語で推奨されるテキストについては、「[LINEログインボタンデザインガイドライン](https://developers.line.biz/ja/docs/line-login/login-button/)」を参照してください。また、LINEアイコンを歪みなく引き伸ばせるようにするために、画像内で引き伸ばせる部分を定義する必要があります。

1.  各画像に対して[9-patchファイル](https://developer.android.com/guide/topics/resources/drawable-resource#NinePatch#NinePatch)を作成し、ログインボタンテキストの伸縮する部分を定義します。
2.  アプリのログイン画面に、望ましいログインボタンテキストと共に、クリックできるテキストビューとしてボタンを追加します。
3.  ドローアブルフォルダーにselector XMLファイルを追加して、テキストビューの状態に対応する画像を定義します。

## ログインアクティビティを開始する

ユーザーがログインボタンをタップすると、アプリは`getLoginIntent()`を呼び出してログインインテントを取得し、ログインアクティビティを開始します。このメソッドに、コンテキストとチャネルIDを渡す必要があります。ユーザーがデバイスにLINEをインストール済みの場合、LINEが開き、ユーザーのLINE認証情報の入力なしでログインが実行されます。ユーザーがデバイスにLINEをインストールしていない場合、ブラウザでLINEログイン画面が開きます。ユーザーは、この画面にLINE認証情報（メールアドレスとパスワード）を入力します。

1.  ボタンのタップを待機するon-clickリスナーを設定します。
2.  `onClick`のコールバックで`LineLoginApi`の`getLoginIntent()`メソッドを呼び出して、ログインインテントを取得してログインアクティビティを開始します。
3.  `startActivityForResult()`を呼び出してログインインテントとリクエストコードをパラメータとして渡し、認証プロセスを開始します。リクエストコードとは、リクエストを識別するための整数です。

以下は、ユーザーがログインボタンをタップしたときにログインアクティビティを開始する方法の例です。

```java
private static final int REQUEST_CODE = 1;
...

final TextView loginButton = (TextView) findViewById(R.id.login_button);
loginButton.setOnClickListener(new View.OnClickListener() {

    public void onClick(View view) {
        try{
            // App-to-app login
            Intent loginIntent = LineLoginApi.getLoginIntent(
                view.getContext(),
                Constants.CHANNEL_ID,
                new LineAuthenticationParams.Builder()
                        .scopes(Arrays.asList(Scope.PROFILE))
                        // .nonce("<a randomly-generated string>") // nonce can be used to improve security
                        .build());
            startActivityForResult(loginIntent, REQUEST_CODE);

        }
        catch(Exception e) {
            Log.e("ERROR", e.toString());
        }
    }
});
```

> [!WARNING]
> 注意
> アプリ連携ログインではなく、ブラウザでLINEログイン画面を開いてユーザーをログインさせたい場合は、`getLoginIntentWithoutLineAppAuth()`メソッドを使います。

## ログイン結果を処理する

ユーザーのログインが完了すると、ログイン結果がアクティビティの`onActivityResult()`メソッドに返されます。アプリはログイン結果を処理するために、このメソッドをオーバーライドする必要があります。

`LineLoginResult`オブジェクトの`getResponseCode()`メソッドを使用して、LINEログインが成功したかどうかを判定します。ログインに成功した場合、`getResponseCode()`が`SUCCESS`を返します。それ以外の値が返った場合は、ログインに失敗したことを意味します。発生したエラーの種類を判別するには、「[エラーを制御する](https://developers.line.biz/ja/docs/line-login-sdks/android-sdk/handling-errors/)」を参照してください。

アプリによるログイン結果の処理方法については、以下を参考にしてください。

```java
public void onActivityResult(int requestCode, int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    if (requestCode != REQUEST_CODE) {
        Log.e("ERROR", "Unsupported Request");
        return;
    }

    LineLoginResult result = LineLoginApi.getLoginResultFromIntent(data);

    switch (result.getResponseCode()) {

        case SUCCESS:
            // Login successful
            String accessToken = result.getLineCredential().getAccessToken().getTokenString();

            Intent transitionIntent = new Intent(this, PostLoginActivity.class);
            transitionIntent.putExtra("line_profile", result.getLineProfile());
            transitionIntent.putExtra("line_credential", result.getLineCredential());
            startActivity(transitionIntent);
            break;

        case CANCEL:
            // Login canceled by user
            Log.e("ERROR", "LINE Login Canceled by user.");
            break;

        default:
            // Login canceled due to other error
            Log.e("ERROR", "Login FAILED!");
            Log.e("ERROR", result.getErrorData().toString());
    }
}
```

### アクセストークンを取得する

ログイン結果には、ユーザーのアクセストークンが入った`LineCredential()`オブジェクトが含まれています。上の例に示すとおり、以下のコードを使用してアクセストークンを取得できます。

```java
String accessToken = result.getLineCredential().getAccessToken().getTokenString();
```

### ログイン直後にユーザープロフィールを取得する

ユーザーがログインすると、LINE SDKによって自動的にユーザーのプロフィール情報が取得されます。ユーザーのプロフィール情報には、表示名、ユーザーID、ステータスメッセージ、およびプロフィールメディアのURLが含まれます。`LineLoginResult`オブジェクトの`getLineProfile()`メソッドを呼び出して、この情報にアクセスします。以下のコードは、上の例から引用したものです。ログイン結果からユーザーのプロフィール情報を取得し、インテントに渡す方法を説明しています。

```java
transitionIntent.putExtra("display_name", result.getLineProfile().getDisplayName());
transitionIntent.putExtra("status_message", result.getLineProfile().getStatusMessage());
transitionIntent.putExtra("user_id", result.getLineProfile().getUserId());
transitionIntent.putExtra("picture_url", result.getLineProfile().getPictureUrl().toString());
```

ユーザーIDは各プロバイダーに対してのみ一意です。1人のLINEユーザーは、プロバイダーごとに異なるユーザーIDを持ちます。ユーザーIDでは、異なるプロバイダーを横断してユーザーを識別できません。

### ユーザー情報をバックエンドサーバーで利用する

> [!CAUTION]
> ユーザーのなりすまし
> バックエンドサーバーでは、`LineProfile`オブジェクトから取得できるユーザーIDなどの情報は、**利用しないでください**。悪意のあるクライアントは、任意のユーザーになりすますために、任意のユーザーIDや不正な情報をバックエンドサーバーに送信できます。
> 
> ユーザーIDなどの情報を送信する代わりにアクセストークンを送信し、バックエンドサーバーではアクセストークンからユーザーIDなどの情報を取得します。

通常、バックエンドサーバーでユーザーを識別するために、ユーザーIDや表示名のような、ユーザーのLINEアカウントに登録されている情報を使用します。そのような情報をアプリからバックエンドサーバーに送信する際は、情報を平文で送信するのではなく、アプリで取得したアクセストークンを送信してください。信頼できる情報を安全に送受信するために、アクセストークンを利用してください。バックエンドサーバーでアクセストークンの正当性を検証したり、ユーザー情報をLINEプラットフォームのサーバーから取得したりできます。

アクセストークンの取得方法について詳しくは、「[アクセストークンを取得する](#get-access-token)」を参照してください。

バックエンドサーバーで利用するAPIについては、以下を参照してください。

*   [アクセストークンの有効性を検証する](https://developers.line.biz/ja/reference/line-login/#verify-access-token)
*   [ユーザープロフィールを取得する](https://developers.line.biz/ja/reference/line-login/#get-user-profile)

## LineApiClientインターフェイスを使用する

`LineApiClient`インターフェイスのメソッドを呼び出して、SDKを使用します。これを行うには、`lineApiClient`のスタティック変数を作成して初期化する必要があります。

1.  さまざまなメソッドを呼び出すオブジェクトのスタティック変数を作成します。
    ```java
    private static LineApiClient lineApiClient;
    ```
    
2.  アクティビティの`onCreate()`メソッドで、`lineApiClient`変数を以下のとおりに初期化します。初期化にはチャネルIDとコンテキストが必要です。
    ```java
    LineApiClientBuilder apiClientBuilder = new LineApiClientBuilder(getApplicationContext(), "your channel id here");
    lineApiClient = apiClientBuilder.build();
    ```
    

> [!WARNING]
> 注意
> LINE SDK for Androidのメソッドの実行にはネットワーク通信が伴うため、メインスレッドで呼び出すと`NetworkOnMainThreadExceptions`が発生します。`AsyncTask`クラスを使ってメソッドを呼び出すことで、この問題を回避できます。

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}