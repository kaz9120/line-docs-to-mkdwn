---
url: https://developers.line.biz/ja/docs/line-login/integrate-line-login/
copied_at: 2025-10-23T15:58:23.503Z
---
# ウェブアプリにLINEログインを組み込む

このページでは、[OpenID Connect](https://openid.net/developers/how-connect-works/)プロトコルをサポートし、ユーザー情報をIDトークンで取得できる[LINEログイン](https://developers.line.biz/ja/docs/line-login/overview/)をウェブアプリに組み込む方法を説明します。

LINEログインを組み込めるアプリがない場合は、サンプルアプリを利用できます。「[LINEログインを始めよう](https://developers.line.biz/ja/docs/line-login/getting-started/)」を参照してください。

:::note warn
注意

:::

## ログインのフロー

ウェブアプリ向けのLINEログインの処理（ウェブログイン）は、[OAuth 2.0の認可コード付与のフロー](https://datatracker.ietf.org/doc/html/rfc6749)と[OpenID Connect](https://openid.net/developers/how-connect-works/)プロトコルに基づいています。ウェブログインのフローの概要は以下のとおりです。

フロー図で「Web app」が関係しているフローは、ウェブアプリで実装が必要です。

![Web login flow](https://developers.line.biz/media/line-login/web-login-flow.svg)

## チャネルを作成する

[「LINEログインチャネル」を作成](https://developers.line.biz/ja/docs/line-login/getting-started/#step-1-create-channel)し、ウェブアプリ用に設定します。

*   [コールバックURLを設定する](#setting-callback-url)
*   [メールアドレスの取得権限を申請する](#applying-for-email-permission)

### コールバックURLを設定する

コールバックURLは、ユーザーが認証と認可の操作を行ったあとで、ウェブアプリが認可コードと`state`を受け取るために使用されます。

[LINE Developersコンソール](https://developers.line.biz/console/)のチャネル設定の［**LINEログイン設定**］タブで、コールバックURLを設定してください。改行することで、1つのチャネルに複数のコールバックURLを指定できます。

![リダイレクト設定](https://developers.line.biz/media/line-login/integrate-login-web/redirect-settings-ja.png)

### メールアドレスの取得権限を申請する

LINEログイン v2.1を使用する場合は、LINEログインを使ってログインしたユーザーのメールアドレスを取得できます。

ウェブアプリでユーザーのメールアドレスを取得する場合は、あらかじめ、[LINE Developersコンソール](https://developers.line.biz/console/)からメールアドレス取得権限を申請してください。

1.  ［**チャネル基本設定**］タブの［**OpenID Connect**］で、 ［**申請**］をクリックします。  
    ![メールアドレス取得権限の申請](https://developers.line.biz/media/line-login/integrate-login-web/apply-email.png)
2.  申請条件に同意して、メールアドレスの取得と利用についてユーザーに提示する文面のスクリーンショットをアップロードします。  
    申請が受理されると［**メールアドレス取得権限**］に「申請済み」と表示されます。

## ユーザーに認証と認可を要求する

LINEプラットフォームとユーザーの間で、認証と認可のプロセスを開始させます。ユーザーがLINEログインボタンをクリックしたときに、以下の例のように認可URLに必須のクエリパラメータを付けてユーザーをリダイレクトしてください。

text

`https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1234567890&redirect_uri=https%3A%2F%2Fexample.com%2Fauth%3Fkey%3Dvalue&state=12345abcde&scope=profile%20openid&nonce=09876xyz`

認可URLに付与できるクエリパラメータは、以下のとおりです。

| パラメータ | タイプ | 必須 | 説明 |
| --- | --- | --- | --- |
| `response_type` | String | 必須 | `code` |
| `client_id` | String | 必須 | LINEログインチャネルのチャネルID。[LINE Developersコンソール](https://developers.line.biz/console/)で確認できます。 |
| `redirect_uri` | String | 必須 | [LINE Developersコンソール](https://developers.line.biz/console/)に登録したコールバックURLをURLエンコードした文字列。任意のクエリパラメータを付与できます。 |
| `state` | String | 必須 | [クロスサイトリクエストフォージェリ](https://wikipedia.org/wiki/Cross-site_request_forgery)防止用の固有な英数字の文字列。 **ログインセッションごとにウェブアプリでランダムに生成してください。** なお、URLエンコードされた文字列は使用できません。 |
| `scope` | String | 必須 | ユーザーに付与を依頼する権限。詳しくは、「[スコープ](#scopes)」を参照してください。 |
| `nonce` | String | 任意 | [リプレイアタック](https://en.wikipedia.org/wiki/Replay_attack)を防止するための文字列。この値はレスポンスで返される[IDトークン](https://developers.line.biz/ja/docs/line-login/verify-id-token/#id-tokens)に含まれます。 |
| `prompt` | String | 任意 | 
認証や認可のための画面を表示するかどうかの設定。以下のいずれかの値を設定できます。

<ul><!--[--><li><!--[--><code><!--[-->consent<!--]--></code>：ユーザーが要求された権限にすべて同意済みであっても、強制的に同意画面を表示します。<!--]--></li><li><!--[--><code><!--[-->none<!--]--></code>：<a href="#line-auto-login" class=""><!--[--><!--[-->自動ログイン<!--]--><!--]--></a>が可能な環境、かつログイン済みで対象チャネルに同意済みの場合に、<a href="#line-sso-login" class=""><!--[--><!--[-->シングルサインオン（SSO）<!--]--><!--]--></a>の認証画面をスキップします。<!--]--></li><li><!--[--><code><!--[-->login<!--]--></code>：ログイン済み、またはシングルサインオンによるログインセッションが残っている場合であっても、認証のための画面を表示します。なお、<code><!--[-->login<!--]--></code>を指定した場合は自動ログインは無効になります。また、レスポンスで返される<a href="/ja/docs/line-login/verify-id-token/#id-tokens" class=""><!--[--><!--[-->IDトークン<!--]--><!--]--></a>の<code><!--[-->amr<!--]--></code>で認証方法の判別が可能です。<!--]--></li><!--]--></ul> |
| `max_age` | Number | 任意 | ユーザー認証後に許容される最大経過時間（秒）。[OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)の「Authentication Request」セクションで定義されている`max_age`パラメータに相当します。 |
| `ui_locales` | String | 任意 | LINEログインで表示される画面の表示言語および文字種。[RFC 5646（BCP 47）](https://datatracker.ietf.org/doc/html/rfc5646)で定義されている言語タグを、優先順位が高い順に、スペース区切りのリストで設定します。[OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)の「Authentication Request」セクションで定義されている`ui_locales`パラメータに相当します。 |
| `bot_prompt` | String | 任意 | LINE公式アカウントを友だち追加するオプションをユーザーのログイン時に表示します。`normal`または`aggressive`を指定します。詳しくは、「[LINEログインしたときにLINE公式アカウントを友だち追加する（友だち追加オプション）](https://developers.line.biz/ja/docs/line-login/link-a-bot/)」を参照してください。 |
| `initial_amr_display` | String | 任意 | `lineqr`を指定すると、[メールアドレスログイン](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#mail-or-qrcode-login)の代わりに、[QRコードログイン](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#mail-or-qrcode-login)をデフォルト表示します。 |
| `switch_amr` | Boolean | 任意 | `false`を指定すると、ログインの方法を変更するための「メールアドレスでログイン」や「QRコードログイン」のボタンを非表示にします。デフォルト値は`true`です。 |
| `disable_auto_login` | Boolean | 任意 | `true`を指定すると、[自動ログイン](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#line-auto-login)を無効にします。デフォルト値は`false`です。<br/>この値が`true`のとき、SSOが利用できる場合は[シングルサインオン（SSO）によるログイン](#line-sso-login)が表示され、利用できない場合は[メールアドレスログイン](#mail-or-qrcode-login)が表示されます。 |
| `disable_ios_auto_login` | Boolean | 任意 | `true`を指定すると、iOSにおいて[自動ログイン](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#line-auto-login)を無効にします。デフォルト値は`false`です。後発で追加された`disable_auto_login`パラメータの利用を推奨します。 |
| `code_challenge` | String | 任意 | LINEログインをPKCE対応するために必要なパラメータ。一意の`code_verifier`をSHA256でハッシュ化したうえで、Base64URL形式にエンコードした値です。デフォルト値は`null`です（値を指定しない場合、リクエストはPKCE対応されません）。<br/>PKCEの実装方法について詳しくは、「[LINEログインにPKCEを実装する](https://developers.line.biz/ja/docs/line-login/integrate-pkce/#how-to-integrate-pkce)」を参照してください。 |
| `code_challenge_method` | String | 任意 | `S256`（ハッシュ関数`SHA256`を表します。）<br/>`code_verifier`の変換方式を指定します。LINEログインでは、セキュリティ上の観点から`S256`のみをサポートしています。<br/>PKCEの実装方法について詳しくは、「[LINEログインにPKCEを実装する](https://developers.line.biz/ja/docs/line-login/integrate-pkce/#how-to-integrate-pkce)」を参照してください。 |
| `response_mode` | String | 任意 | 

認可レスポンスのパラメータをウェブアプリにどのように返すかの設定。以下のいずれかの値を設定できます。デフォルト値は`query`です。

<ul><!--[--><li><!--[--><code><!--[-->query<!--]--></code>：認可レスポンスの各パラメータをコールバックURLのクエリパラメータとして返します。*1<!--]--></li><li><!--[--><code><!--[-->form_post<!--]--></code>：認可レスポンスの各パラメータをHTTP POSTリクエストのリクエストボディとして返します。*2<!--]--></li><li><!--[--><code><!--[-->query.jwt<!--]--></code>：認可レスポンスの各パラメータをJWTにまとめ、コールバックURLのクエリパラメータとして返します。<code><!--[-->jwt<!--]--></code>を設定した場合と同じです。*3<!--]--></li><li><!--[--><code><!--[-->form_post.jwt<!--]--></code>：認可レスポンスの各パラメータをJWTにまとめ、HTTP POSTリクエストのリクエストボディとして返します。*3<!--]--></li><li><!--[--><code><!--[-->jwt<!--]--></code>：認可レスポンスの各パラメータをJWTにまとめ、コールバックURLのクエリパラメータとして返します。<code><!--[-->query.jwt<!--]--></code>を設定した場合と同じです。*3<!--]--></li><!--]--></ul>\*1 [OAuth 2.0 Multiple Response Type Encoding Practices](https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html)の「[2.1. Response Modes](https://openid.net/specs/oauth-v2-multiple-response-types-1_0.html#ResponseModes)」セクションで定義されている`query`に相当します。<br/>\*2 [OAuth 2.0 Form Post Response Mode](https://openid.net/specs/oauth-v2-form-post-response-mode-1_0.html)の「[2\. Form Post Response Mode](https://openid.net/specs/oauth-v2-form-post-response-mode-1_0.html#FormPostResponseMode)」セクションで定義されている`form_post`に相当します。<br/>\*3 [Financial-grade API: JWT Secured Authorization Response Mode for OAuth 2.0 (JARM)](https://openid.net/specs/openid-financial-api-jarm.html)の「[4.3. Response Encoding](https://openid.net/specs/openid-financial-api-jarm.html#response-encoding)」セクションで定義されている`query.jwt`、`form_post.jwt`、`jwt`に相当します。 |
|  |  |  |  |

:::note info
ヒント

:::

:::note warn
LIFFブラウザ内での認可リクエストについて

:::

### スコープ

`scope`パラメータに指定できるスコープは以下のとおりです。複数のスコープを指定するには、URLエンコードされた空白文字（%20）で区切って指定します。

| スコープ | プロフィール情報 | [IDトークン](https://developers.line.biz/ja/docs/line-login/verify-id-token/#id-tokens)<br/>（ユーザーIDを含む） | [IDトークン](https://developers.line.biz/ja/docs/line-login/verify-id-token/#id-tokens)内の<br/>表示名 | [IDトークン](https://developers.line.biz/ja/docs/line-login/verify-id-token/#id-tokens)内の<br/>プロフィール画像のURL | [IDトークン](https://developers.line.biz/ja/docs/line-login/verify-id-token/#id-tokens)内の<br/>メールアドレス |
| --- | --- | --- | --- | --- | --- |
| `profile` | ✓ | \- | \- | \- | \- |
| `profile%20openid` | ✓ | ✓ | ✓ | ✓ | \- |
| `profile%20openid%20email` | ✓ | ✓ | ✓ | ✓ | ✓（※） |
| `openid` | \- | ✓ | \- | \- | \- |
| `openid%20email` | \- | ✓ | \- | \- | ✓（※） |

※`email`を指定してユーザーにメールアドレスの取得権限を要求するには、あらかじめ[メールアドレス取得権限を申請](#applying-for-email-permission)してください。

:::note info
その他の権限を利用したい

:::

### ユーザーがユーザー認証を行う

:::note info
ユーザー認証はユーザーとLINEプラットフォームの間で直接行われます

:::

認可URLにリダイレクトされたユーザーは、以下のいずれかの認証方法でログインできます。

| 認証方法 | 説明 |
| --- | --- |
| [自動ログイン](#line-auto-login) | ユーザーの操作なしでログイン。LINEログイン画面や確認画面は表示されません |
| [メールアドレスログイン](#mail-or-qrcode-login) | LINEログイン画面にメールアドレスとパスワードを入力してログイン |
| [QRコードログイン](#mail-or-qrcode-login) | LINEログイン画面に表示されたQRコードを、スマートフォン版LINEのQRコードリーダーでスキャンしてログイン |
| [シングルサインオン（SSO）によるログイン](#line-sso-login) | 「次のアカウントでログイン」と表示された確認画面でログインボタンをクリックしてログイン |

自動ログインが利用できる環境では、自動ログインが優先して動作します。自動ログインが利用できないとき、SSOが利用できる場合は[シングルサインオン（SSO）によるログイン](#line-sso-login)が表示され、利用できない場合は[メールアドレスログイン](#mail-or-qrcode-login)が表示されます。

:::note warn
自動ログインとSSOによるログインでは自動ログインの方が優先して動作します

:::

:::note warn
ログイン通知について

:::

:::note info
ユーザーが選択した認証方法

:::

#### 自動ログイン

ユーザーの操作なしでログインできます。LINEログイン画面や確認画面は表示されません。

自動ログインは、スマートフォン版LINEにログインしている状態で、以下のブラウザで認可URLにアクセスした場合に、自動的に行われます。

*   LINE内ブラウザ
*   LINEログインをする外部ブラウザ

以下のように、ログイン時に自動的にLINEアプリが起動し、ユーザーの操作なしでログインが完了します。

![](https://developers.line.biz/media/line-login/integrate-login-web/auto-ligin-animation.gif)

:::note warn
自動ログインはPC版LINEでは動作しません

:::

:::note warn
自動ログインに失敗する場合があります

:::

:::note info
Yahoo! JAPANアプリからの自動ログインについて

:::

#### メールアドレスログイン、QRコードログイン

ユーザーは以下のいずれかの認証方法でログインできます。

*   メールアドレスログイン
*   QRコードログイン

![LINEログイン画面](https://developers.line.biz/media/line-login/integrate-login-web/login-with-new-session.png)

これらのログイン方法は、スマートフォン版LINEにログインしていない状態で、外部ブラウザで認可URLを初めて開いた場合に使用できます。

#### シングルサインオン（SSO）によるログイン

ユーザーはログインボタンをクリックするだけでログインできます。

![確認画面](https://developers.line.biz/media/line-login/integrate-login-web/sso.png)

SSOは、過去にLINEログインをしたことがある外部ブラウザで認可URLにアクセスした場合に使用できます。

:::note warn
SSOはCookieを利用している機能です

:::

:::note warn
自動ログインとSSOによるログインでは自動ログインの方が優先して動作します

:::

### ユーザーが認可を行う

:::note info
認可はユーザーとLINEプラットフォームの間で直接行われます

:::

開発者が`scope`パラメータで指定した情報へのアクセス権を、ユーザーが認可します。

なお、ユーザーは権限の付与に同意せずにウェブアプリにアクセスする場合があります。認可URLで指定した権限の付与を、ユーザーに拒否される可能性も考慮してウェブアプリを開発してください。

**同意画面の例：**

![同意画面](https://developers.line.biz/media/line-login/integrate-login-web/consent-screen-ja.png)

:::note warn
同意画面が表示されない場合があります

:::

## ウェブアプリで認可レスポンスまたはエラーレスポンスを受け取る

ユーザーによる認証と認可のプロセスが終了すると、ユーザーはコールバックURLにリダイレクトされます。

ユーザーがアプリにアクセス権を付与したときは、認可コードを含む認可レスポンスが渡されます。アクセス権の付与を拒否したときは、エラーレスポンスが渡されます。

### 認可コードを受け取る

ユーザーの認証と認可が完了すると、コールバックURLにリダイレクトされます。認可コードを含む認可レスポンスの各パラメータの受け取り方は、認可リクエストの`response_mode`パラメータの値によって異なります。詳しくは、「[ユーザーに認証と認可を要求する](#making-an-authorization-request)」を参照してください。

認可レスポンスの各パラメータは以下のとおりです。

| パラメータ | タイプ | 説明 |
| --- | --- | --- |
| `code` | String | アクセストークンの取得に使用される認可コード。有効期間は10分です。また、認可コードは1回のみ利用可能です。 |
| `state` | String | [クロスサイトリクエストフォージェリ](https://wikipedia.org/wiki/Cross-site_request_forgery)防止用の固有な英数字の文字列。この値が認可URLに付与した`state`パラメータの値と一致することを検証してください。 |
| `friendship_status_changed` | Boolean | チャネルにリンクされているLINE公式アカウントとユーザーの関係が、ログイン時に変わった場合は`true`です。それ以外は`false`です。このパラメータは、[ユーザーに認証と認可を要求する](#making-an-authorization-request)ときに`bot_prompt`クエリパラメータを指定し、かつ、ユーザーがログインしたときにLINE公式アカウントを友だち追加するオプションが表示された場合にのみ返されます。詳しくは、「[LINEログインしたときにLINE公式アカウントを友だち追加する（友だち追加オプション）](https://developers.line.biz/ja/docs/line-login/link-a-bot/)」を参照してください。 |
| `liffClientId` | String | LINEログインチャネルのチャネルID。このパラメータは、LIFFアプリで[`liff.login()`](https://developers.line.biz/ja/reference/liff/#login)メソッドによるログイン処理を行った場合にのみ返されます。LIFFアプリの正常な動作を保証するため、このパラメータは変更しないでください。 |
| `liffRedirectUri` | String | ログイン後にLIFFアプリで表示するURL。[`liff.login()`](https://developers.line.biz/ja/reference/liff/#login)メソッドの`redirectUri`プロパティに指定した値です。このパラメータは、LIFFアプリで[`liff.login()`](https://developers.line.biz/ja/reference/liff/#login)メソッドによるログイン処理を行った場合にのみ返されます。LIFFアプリの正常な動作を保証するため、このパラメータは変更しないでください。 |
|  |  |  |

認可リクエストの`response_mode`パラメータに`query`を設定した場合のリダイレクト先URLの例：

text

`https://example.com/callback?code=abcd1234&state=0987poi&friendship_status_changed=true`

認可リクエストの`response_mode`パラメータに`query.jwt`や`jwt`を設定した場合のリダイレクト先URLの例：

text

`https://example.com/callback?response=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...`

### エラーレスポンスを受け取る

ユーザーがアプリへのアクセス権の付与を拒否した場合や、リクエストに失敗した場合（`client_id`クエリパラメータや`redirect_uri`クエリパラメータの値が不正である場合を除く）は、以下のクエリパラメータを含むコールバックURLにリダイレクトされます。

| パラメータ | タイプ | 必須 | 説明 |
| --- | --- | --- | --- |
| `error` | String | 必須 | [エラーコード](#error-codes)。 |
| `error_description` | String | 任意 | エラーの内容。 |
| `state` | String | 任意 | 認可URLに含めた`state`パラメータ。この値で、どのプロセスが拒否されたか特定できます。 |
|  |  |  |  |

リダイレクト先URLの例：

text

`https://example.com/callback?error=ACCESS_DENIED&error_description=The+resource+owner+denied+the+request.&state=0987poi`

#### エラーコード

| エラーコード | 説明 |
| --- | --- |
| `INVALID_REQUEST` | リクエストに問題があります。認可URLのクエリパラメータを確認してください。 |
| `ACCESS_DENIED` | ユーザーが同意画面でキャンセルし、アプリへのアクセス権の付与を拒否しました。 |
| `UNSUPPORTED_RESPONSE_TYPE` | `response_type`クエリパラメータの値に問題があります。LINEログインでは`code`のみをサポートしています。 |
| `INVALID_SCOPE` | 
`scope`クエリパラメータの値に問題があります。適切な値を指定しているかを確認してください。

<ul><!--[--><li><!--[--><code><!--[-->profile<!--]--></code>と<code><!--[-->openid<!--]--></code>のいずれかは必須です。<!--]--></li><li><!--[--><code><!--[-->email<!--]--></code>を指定する場合、<code><!--[-->openid<!--]--></code>も合わせて指定する必要があります。<!--]--></li><!--]--></ul> |
| `SERVER_ERROR` | LINEログインサーバーで予期しないエラーが発生しました。 |
| `LOGIN_REQUIRED` | `prompt`パラメータに`none`が指定されていますが、ユーザーの端末で自動ログインが動作しない、または未ログインの状態でした。 |
| `INTERACTION_REQUIRED` | `prompt`パラメータに`none`が指定されていますが、ユーザーの端末で自動ログインが動作しませんでした。 |

## ウェブアプリでアクセストークンを取得する

LINEプラットフォームから認可コードを受け取った際、同時に受け取った`state`パラメータと、[認証と認可を要求した](#making-an-authorization-request)ときに指定した`state`パラメータが一致すれば、アクセストークンを取得できます。

アクセストークンを取得する方法について詳しくは、『LINEログイン v2.1 APIリファレンス』の「[アクセストークンを発行する](https://developers.line.biz/ja/reference/line-login/#issue-access-token)」を参照してください。

リクエストの例：

sh

`curl -v -X POST https://api.line.me/oauth2/v2.1/token \ -H 'Content-Type: application/x-www-form-urlencoded' \ -d 'grant_type=authorization_code' \ -d 'code=1234567890abcde' \ --data-urlencode 'redirect_uri=https://example.com/auth?key=value' \ -d 'client_id=1234567890' \ -d 'client_secret=1234567890abcdefghij1234567890ab'`

### レスポンス

LINEプラットフォームがアプリからのリクエストを検証し、以下の表に示すアクセストークンなどのデータをアプリに返します。

:::note warn
注意

:::

| プロパティ | タイプ | 説明 |
| --- | --- | --- |
| `access_token` | String | アクセストークン。有効期間は30日です。 |
| `expires_in` | Number | アクセストークンの有効期限が切れるまでの秒数。 |
| `id_token` | String | ユーザー情報を含む[JSONウェブトークン（JWT）](https://datatracker.ietf.org/doc/html/rfc7519)。このプロパティは、スコープに`openid`を指定した場合にのみ返されます。詳しくは、「[IDトークンからプロフィール情報を取得する](https://developers.line.biz/ja/docs/line-login/verify-id-token/)」を参照してください。 |
| `refresh_token` | String | 新しいアクセストークンを取得するためのトークン。アクセストークンが発行されてから最長90日間有効です。 |
| `scope` | String | ユーザーが付与する権限。ただし、`email`スコープは権限が付与されていても`scope`プロパティの値としては返されません。 |
| `token_type` | String | `Bearer` |
|  |  |  |

以下は、JSONレスポンスの例です。

json

`{   "access_token": "bNl4YEFPI/hjFWhTqexp4MuEw5YPs...",  "expires_in": 2592000,  "id_token": "eyJhbGciOiJIUzI1NiJ9...",  "refresh_token": "Aa1FdeggRhTnPNNpxr8p",  "scope": "profile",  "token_type": "Bearer" }`

詳しくは、『LINEログイン v2.1 APIリファレンス』の「[アクセストークンを発行する](https://developers.line.biz/ja/reference/line-login/#issue-access-token)」を参照してください。

## IDトークンからプロフィール情報を取得する

LINEプラットフォームは、[OpenID Connect](https://openid.net/developers/how-connect-works/)仕様に準拠するIDトークンを発行しているため、LINEプラットフォームからユーザーの[プロフィール情報](https://developers.line.biz/ja/glossary/#profile-information)（ユーザーID・表示名・プロフィール画像・メールアドレス）を安全に取得できます。

詳しくは、「[IDトークンからプロフィール情報を取得する](https://developers.line.biz/ja/docs/line-login/verify-id-token/)」を参照してください。

## 次のステップ

取得したアクセストークンを使って、以下の操作を行えます。

*   [LINE公式アカウントとユーザーの友だち関係を取得する](https://developers.line.biz/ja/docs/line-login/link-a-bot/#use-line-login-api)
*   [アクセストークンを管理する](https://developers.line.biz/ja/docs/line-login/managing-access-tokens/)
*   [ユーザーを管理する](https://developers.line.biz/ja/docs/line-login/managing-users/)

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}