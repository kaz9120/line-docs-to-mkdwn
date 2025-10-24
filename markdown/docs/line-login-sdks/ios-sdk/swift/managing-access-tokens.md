---
url: https://developers.line.biz/ja/docs/line-login-sdks/ios-sdk/swift/managing-access-tokens/
copied_at: 2025-10-24T06:28:59.482Z
---
# アクセストークンを管理する

このトピックでは、以下のアクセストークン管理タスクの実行方法について説明します。

*   [アクセストークンを更新する](#refresh-token)
*   [現在のアクセストークンを取得する](#get-current-token)
*   [アクセストークンを検証する](#verify-access-token)

> [!TIP]
> 安全にログインを処理する
> 安全にユーザー登録およびログインを処理する方法については、「[アプリとサーバーの間で安全なログインプロセスを構築する](https://developers.line.biz/ja/docs/line-login/secure-login-process/)」を参照してください。

## アクセストークンを更新する

認可が成功すると、ユーザーの有効なアクセストークンがLINE SDKによって保存され、そのアクセストークンを使って、APIリクエストが実行されます。アクセストークンの有効期限は以下のようにして取得できます。

swift

`if let token = AccessTokenStore.shared.current {     print("Token expires at:\(token.expiresAt)") }`

`API`タイプを介してAPIリクエストが実行されるとき、有効期限が切れたアクセストークンは自動的に更新されます。ただし、アクセストークンが失効してから長期間が経過していると、更新操作は失敗します。その場合はエラーが発生し、ユーザーを再ログインさせる必要があります。詳しくは、「[エラーを制御する](https://developers.line.biz/ja/docs/line-login-sdks/ios-sdk/swift/error-handling/)」を参照してください。

> [!WARNING]
> アクセストークンの自動更新について
> `API`タイプのメソッドのみが、アクセストークンを自動的に更新します。そのほかのタイプ（たとえば`API.Auth`タイプ）のメソッドでは、アクセストークンは自動的に更新されません。

開発者自身でアクセストークンを**更新しない**ことを推奨します。LINE SDKによってアクセストークンを自動的に管理させるほうが、将来のアップグレードを考えるとより簡単な方法です。ただし、必要に応じて、以下のようにしてアクセストークンを手動で更新できます。

swift

`API.Auth.refreshAccessToken { result in     switch result {    case .success(let token):        print("Token Refreshed: \(token)")    case .failure(let error):        print(error)    } }`

## 現在のアクセストークンを取得する

クライアントサーバーアプリケーションでは、アプリとサーバーの間でユーザー情報を送受信する際に、アクセストークンを使用してください。

アプリで取得したアクセストークンをサーバーに送信すると、サーバーでLINEログインAPIを呼び出すことができます。

LINEログインAPIについて詳しくは、『[LINEログイン v2.1 APIリファレンス](https://developers.line.biz/ja/reference/line-login/)』を参照してください。

アプリでLINE SDKが保存しているアクセストークンを取得するには、共有`AccessTokenStore`オブジェクトの`current`プロパティを以下のように利用します。

swift

`if let token = AccessTokenStore.shared.current {     print(token.value) }`

> [!WARNING]
> 注意
> サーバーにアクセストークンを送信するときは、トークンを暗号化し、暗号化したデータをSSLで送信することをお勧めします。サーバーで受信したアクセストークンと、LINEログインの呼び出しに使用するアクセストークンが一致すること、さらにLINEログインの呼び出しに使用するチャネルIDが自分のチャネルのIDと一致することも、検証する必要があります。

## アクセストークンを検証する

現在のアクセストークンの有効性を検証するには、`API.Auth.verifyAccessToken`メソッドを呼び出します。結果が含まれる`AccessTokenVerifyResult`オブジェクトが返されます。検証に成功すると、レスポンスとして`channelID`、`permissions`、および`expiresIn`のようなプロパティが返されます。それ以外の場合は、トークンは無効、失効、または期限切れであり、エラーが返されます。

swift

`API.Auth.verifyAccessToken { result in     switch result {    case .success(let value):        print(value.channelID) // Bound channel ID of the token.        print(value.permissions) // The permissions of this token.        print(value.expiresIn) // How long it is before the token expires.    case .failure(let error):        print(error)    } }`

html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}