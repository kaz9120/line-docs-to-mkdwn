---
url: https://developers.line.biz/ja/docs/line-login/managing-access-tokens/
copied_at: 2025-10-23T15:58:34.283Z
---
# アクセストークンを管理する

LINEログインAPIで管理するアクセストークンは、LINEプラットフォームに保存されているユーザー情報（例：ユーザーID、表示名、プロフィール画像、およびステータスメッセージ）を利用することを、アプリが許可されていることを示します。

## ユーザーのアクセストークンを取得する

ユーザーの認証が終わると、LINEプラットフォームからアクセストークンが返されます。この時点で、ユーザー情報を利用することを、アプリが許可されていると考えることができます。

詳しくは、以下の記事を参照してください。

**LINEログイン：**

*   [ウェブアプリにLINEログインを組み込む](https://developers.line.biz/ja/docs/line-login/integrate-line-login/)
*   [iOSアプリにLINEログインを組み込む - Swift](https://developers.line.biz/ja/docs/line-login-sdks/ios-sdk/swift/integrate-line-login/)
*   [AndroidアプリにLINEログインを組み込む](https://developers.line.biz/ja/docs/line-login-sdks/android-sdk/integrate-line-login/)
*   [UnityゲームにLINEログインを組み込む](https://developers.line.biz/ja/docs/line-login-sdks/unity-sdk/integrate-line-login/)
*   [LINE SDK for Flutter](https://developers.line.biz/ja/docs/line-login-sdks/flutter-sdk/)

**LIFF SDK：**

*   [LIFFアプリを開発する](https://developers.line.biz/ja/docs/liff/developing-liff-apps/)

:::note warn
アクセストークンの有効期間

:::

### リフレッシュトークン

ユーザーの認証が終わったときに、アクセストークンと共にリフレッシュトークンが返されます。

アクセストークンの有効期限が切れたときは、リフレッシュトークンを使用して新しいアクセストークンを取​得できます。詳しくは、『LINEログイン v2.1 APIリファレンス』の「[アクセストークンを更新する](https://developers.line.biz/ja/reference/line-login/#refresh-access-token)」を参照してください。

:::note warn
リフレッシュトークンの有効期間

:::

## アクセストークンを検証する

アプリやほかのサーバーから受信したアクセストークンをサーバーで使用する場合は、アクセストークンを検証してください。

アクセストークンの検証方法は、「[アクセストークンを使用して新規ユーザーを登録する](https://developers.line.biz/ja/docs/line-login/secure-login-process/#using-access-tokens)」を参照してください。