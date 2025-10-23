---
url: https://developers.line.biz/ja/docs/liff/using-user-profile/
copied_at: 2025-10-23T16:00:21.329Z
---
# LIFFアプリおよびサーバーでユーザー情報を使用する

ユーザーが、LIFFブラウザでLIFFアプリを起動したり、外部ブラウザでLIFFアプリを起動して`liff.init`メソッドでログイン処理を行ったりすると、LIFFアプリはユーザーのプロフィール（ユーザーID、表示名、プロフィール画像、メールアドレス）を取得できます。

LIFFアプリで、これらのユーザー情報を正しく処理しないと、なりすましやその他の種類の攻撃に対して脆弱になります。

このページでは、LIFFアプリを開いたユーザーのユーザー情報を、LIFFアプリおよびサーバーで安全に使用する方法を説明します。

## ユーザー情報をサーバーで使用する

ユーザー情報をサーバーで使用する場合は、IDトークンまたはアクセストークンを、LIFFアプリからサーバーに送信してください。サーバーは、LIFFアプリが送信したトークンを、さらにLINEプラットフォームに送信することで、ユーザーのプロフィールを安全に取得できます。

*   [IDトークンを送信してユーザー情報を取得する](#sending-id-token)
*   [アクセストークンを送信してユーザー情報を取得する](#sending-access-token)

:::note alert
ユーザー情報をサーバーに送信しないでください

:::

:::note info
ヒント

:::

### IDトークンを送信してユーザー情報を取得する

[`liff.getIDToken()`](https://developers.line.biz/ja/reference/liff/#get-id-token)で取得したIDトークンをサーバーに送信した場合は、サーバーでIDトークンを検証する（[POST /oauth2/v2.1/verify](https://developers.line.biz/ja/reference/line-login/#verify-id-token)）ことで、ユーザーのプロフィール情報を安全に取得できます。

### アクセストークンを送信してユーザー情報を取得する

[`liff.getAccessToken()`](https://developers.line.biz/ja/reference/liff/#get-access-token)で取得したアクセストークンをサーバーに送信した場合は、サーバーでアクセストークンの有効性を検証し（[GET /oauth2/v2.1/verify](https://developers.line.biz/ja/reference/line-login/#verify-access-token)）、さらにチャネルIDとアクセストークンの有効期間を検証することで、ユーザーのプロフィール情報を安全に取得できます（[GET /v2/profile](https://developers.line.biz/ja/reference/line-login/#get-user-profile)）。

なお、ユーザーが[LIFFアプリを閉じる](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#behavior-when-closing-liff-app)と、有効期限が切れていなくてもアクセストークンは無効化されます。

## ユーザー情報をLIFFアプリで使用する

[`liff.getDecodedIDToken()`](https://developers.line.biz/ja/reference/liff/#get-decoded-id-token)または[`liff.getProfile()`](https://developers.line.biz/ja/reference/liff/#get-profile)で取得したユーザーのプロフィール情報を使用してください。

:::note alert
ユーザー情報をサーバーに送信しないでください

:::