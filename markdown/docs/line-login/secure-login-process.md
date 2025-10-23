---
url: https://developers.line.biz/ja/docs/line-login/secure-login-process/
copied_at: 2025-10-23T15:58:31.991Z
---
# アプリとサーバーの間で安全なログインプロセスを構築する

このページでは、安全なユーザー登録およびログインプロセスの概念を説明しています。[LINE SDK](https://developers.line.biz/ja/docs/line-login/overview/#native-app)を使用してネイティブアプリにLINEログインを実装する際に参考にしてください。

## 安全に送受信できる情報について

ユーザーがLINEログイン経由でアプリにログインすると、アプリとサーバーは、以下のような情報をLINEプラットフォームから取得して互いに送受信できます。

*   ❌ ユーザーのプロフィール情報
*   ❌ チャネルID

しかし、このような情報は、なりすましやその他の攻撃に対して脆弱です。たとえば、アプリが送信した情報を、サーバーが盲目的に信頼することは非常に危険です。代わりに、以下の情報をサーバーに送信してください。

*   ✅ アクセストークン
*   ✅ IDトークン

これらのトークンを使うと、サーバーは信頼できる情報をLINEプラットフォームから直接取得できます。

:::note info
このページの使いかた

:::

## アクセストークンを使用して新規ユーザーを登録する

新規ユーザーがLINEログインを使用してアプリにログインする場合は、LINEに登録されたプロフィール情報を使用して、サーバーのデータベースに新しいユーザーを登録できます。

このとき、以下のように、アプリからユーザーのプロフィール情報をサーバーに直接送信すると、攻撃に対して脆弱になります。

:::note warn
注意

:::

![](https://developers.line.biz/media/line-login/new-user-login-bad-ja.svg)

プロフィール情報の代わりに、アクセストークンをアプリからサーバーに送信します。 サーバーではアクセストークンを検証し、LINEプラットフォームからユーザーのプロフィール情報を直接取得してください。

図に示したAPIについて詳しくは、『LINEログイン v2.1 APIリファレンス』の以下の項目を参照してください。

*   [アクセストークンの有効性を検証する（GET /oauth2/v2.1/verify）](https://developers.line.biz/ja/reference/line-login/#verify-access-token)
*   [ユーザープロフィールを取得する（GET /v2/profile）](https://developers.line.biz/ja/reference/line-login/#get-user-profile)

:::note warn
アクセストークンの検証後、さらに確認が必要です

:::

## OpenIDを使用して新規ユーザーを登録する

アプリが[OpenID Connect](https://openid.net/developers/how-connect-works/)をサポートしている場合は、アクセストークンを確認する必要はありません。代わりに、アプリからIDトークンをサーバーに送信します。サーバーでは、LINEプラットフォームが提供するエンドポイントを使用してIDトークンを検証し、プロフィール情報を取得してください。

:::note info
nonce（number used once）

:::

図に示したAPIについて詳しくは、『LINEログインAPIリファレンス』の以下の項目を参照してください。

*   [IDトークンを検証する（POST /oauth2/v2.1/verify）](https://developers.line.biz/ja/reference/line-login/#verify-id-token)

なお、サーバーでIDトークンとnonceを正しく処理する方法について詳しくは、以下の項目を参照してください。

*   [IDトークンを使ってユーザーを識別する](https://developers.line.biz/ja/docs/line-login-sdks/ios-sdk/swift/managing-users/#get-id-token) (LINE SDK for iOS Swift)
*   [IDトークンを使ってユーザーを識別する](https://developers.line.biz/ja/docs/line-login-sdks/android-sdk/managing-users/#get-id-token) (LINE SDK for Android)

## 次のステップ

このページでは、安全なユーザー登録およびログインプロセスを設計する方法の概念を説明しました。LINE SDKを使用して、LINEログインをアプリに組み込む手順について詳しくは、以下の項目を参照してください。

*   LINE SDK for iOS Swift:
    *   [iOSアプリにLINEログインを組み込む](https://developers.line.biz/ja/docs/line-login-sdks/ios-sdk/swift/integrate-line-login/)
        *   [ユーザーを管理する](https://developers.line.biz/ja/docs/line-login-sdks/ios-sdk/swift/managing-users/)
        *   [アクセストークンを管理する](https://developers.line.biz/ja/docs/line-login-sdks/ios-sdk/swift/managing-access-tokens/)
*   LINE SDK for Android:
    *   [AndroidアプリにLINEログインを組み込む](https://developers.line.biz/ja/docs/line-login-sdks/android-sdk/integrate-line-login/)
        *   [ユーザーを管理する](https://developers.line.biz/ja/docs/line-login-sdks/android-sdk/managing-users/)
        *   [アクセストークンを管理する](https://developers.line.biz/ja/docs/line-login-sdks/android-sdk/managing-access-tokens/)