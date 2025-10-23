---
url: https://developers.line.biz/ja/docs/line-login-sdks/ios-sdk/swift/managing-users/
copied_at: 2025-10-23T15:59:08.436Z
---
# ユーザーを管理する

このトピックでは、以下のユーザー管理タスクの実行方法について説明します。

*   [ユーザープロフィールを取得する](#get-profile)
*   [IDトークンを使ってユーザーを識別する](#get-id-token)
*   [ユーザーをログアウトする](#logout)

:::note info
安全にログインを処理する

:::

## ユーザープロフィールを取得する

`.profile`スコープを指定してログインリクエストを送信すると、ユーザーのLINEプロフィールを取得できます。ユーザープロフィールには、ユーザーID、表示名、プロフィールメディア（画像または動画）、およびステータスメッセージが含まれます。

`API.getProfile`メソッドを以下のように呼び出します。

swift

`API.getProfile { result in     switch result {    case .success(let profile):        print("User ID: \(profile.userID)")        print("User Display Name: \(profile.displayName)")        print("User Status Message: \(profile.statusMessage)")        print("User Icon: \(String(describing: profile.pictureURL))")    case .failure(let error):        print(error)    } }`

`API.getProfile`メソッドでは、ログイン時の値が取得されますが、ユーザーはLINEに設定した表示名、プロフィールメディア、およびステータスメッセージをいつでも変更できます。ユーザーを識別するには、変更できない`userID`プロパティの値を使用します。

## IDトークンを使ってユーザーを識別する

[OpenID Connect](https://openid.net/developers/how-connect-works/) 1.0仕様は、OAuth 2.0プロトコル上に付与されるアイデンティティレイヤーです。OpenID Connectを使えば、LINEプラットフォームと安全に情報を交換できます。現在は、OpenID Connect仕様に準拠するIDトークンを発行する方式で、LINEプラットフォームからユーザープロフィールとメールアドレスを取得できます。

### メールアドレス取得権限を申請する

LINEログインを使ってログインするユーザーに、メールアドレスを取得する権限をアプリに付与するよう要求できます。これを行うには、[LINE Developersコンソール](https://developers.line.biz/console/)で権限を申請します。詳しくは、『LINEログインドキュメント』の「[メールアドレス取得権限を申請する](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#applying-for-email-permission)」を参照してください。

### OpenIDとメールアドレスのスコープを指定したログイン

メールアドレス取得権限を付加したチャネルでは、以下のように、`.openID`スコープと`.email`スコープを指定してユーザーにログインさせ、IDトークンからユーザーのメールアドレスを取得できます。

swift

`LoginManager.shared.login(permissions: [.openID, .email], in: self) {     result in    switch result {    case .success(let loginResult):        if let email = loginResult.accessToken.IDToken?.payload.email {            print("User Email: \(email)")        }    case .failure(let error):        print(error)    } }`

IDトークンは署名付きの[JSONウェブトークン](https://datatracker.ietf.org/doc/html/rfc7519)です。不正なデータを防ぐため、LINE SDKによってIDトークンの署名と有効期間が検証されます。

### IDトークンをバックエンドサーバーで利用する

:::note alert
ユーザーのなりすまし

:::

#### 生のIDトークンを送信する

`.openID`権限を指定してLINEログインする場合は、`IDTokenNonce`パラメータに任意の値を指定できます：

swift

`var parameters = LoginManager.Parameters() parameters.IDTokenNonce = "<a randomly-generated string>" LoginManager.shared.login(permissions: [.profile, .openID], parameters: parameters) {     result in    // ... }`

`IDTokenNonce`を省略した場合は、LINE SDKによって自動的に値が指定されますが、ランダムに生成した`nonce`を`IDTokenNonce`に指定することをお勧めします。ここで指定した`nonce`は、LINEログインAPIを使用して[IDトークンを検証する](#verify-id-token-on-server)ときに使用します。`nonce`を利用してIDトークンを検証することは、[リプレイアタック](https://en.wikipedia.org/wiki/Replay_attack)の防止に役に立ちます。

`.openID`権限を指定したLINEログインに成功すると、以下のコードで、IDトークンの元になった生のIDトークンを取得できます。

swift

``LoginManager.shared.login(permissions: [.profile, .openID], parameters: parameters) {     result in    switch result {    case .success(let loginResult):        if let idToken = loginResult.accessToken.IDTokenRaw {            // Send `idToken` to your server.        } else {            // Something went wrong. You should fail the login.        }     case .failure(let error):        print(error)``

[IDトークンを検証する](#verify-id-token-on-server)ために、このコードで取得した`idToken`をバックエンドサーバーに送信してください。

#### バックエンドサーバーでIDトークンを検証する

バックエンドサーバーで生のIDトークンを受信したら、受信したIDトークンと対応する`nonce`を、LINEプラットフォームが提供するIDトークン検証用のエンドポイントに送信して検証してください。IDトークンが有効な場合は、IDトークンクレームを含むJSON形式のオブジェクトが返されます。

バックエンドサーバーで利用するAPIについては、以下を参照してください。

*   [IDトークンを検証する](https://developers.line.biz/ja/reference/line-login/#verify-id-token)（LINEログイン v2.1 APIリファレンス）

### ユーザーデータを慎重に扱う

ユーザーの機密情報をプレーンテキストでアプリやサーバーに保存したり、セキュリティで保護されていないHTTP通信で転送したりしないでください。アクセストークン、ユーザーID、ユーザー名など、IDトークンに含まれるデータは機密情報に該当します。LINE SDKではユーザーのアクセストークンが保存されます。必要に応じて、認可後に以下のコードでアクセストークンを取得できます。

swift

`if let token = AccessTokenStore.shared.current {     print(token.value) }`

IDトークンはログイン時にのみ発行されます。IDトークンを更新するには、ユーザーに再ログインさせる必要があります。ただし、ログインリクエストに`.profile`スコープを指定する場合は、`API.getProfile`メソッドを呼び出してユーザーのプロフィール情報を取得できます。

## ユーザーをログアウトする

アプリからユーザーをログアウトさせることができます。より良いユーザー体験のために、ユーザーがアプリからログアウトする手段を提供することをお勧めします。

アクセストークンを無効化してユーザーをアプリからログアウトするには、`logout`メソッドを呼び出します。アクセストークンを無効にすると、ユーザーはアプリからログアウトされます。ログアウトした後に再度ログインするには、ユーザーは再度ログインプロセスを行う必要があります。

swift

`LoginManager.shared.logout { result in     switch result {    case .success:        print("Logout from LINE")    case .failure(let error):        print(error)    } }`

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}