---
url: https://developers.line.biz/ja/docs/line-login-sdks/android-sdk/handling-errors/
copied_at: 2025-10-23T15:59:32.279Z
---
# エラーを制御する

`LineLoginResult`オブジェクトの`getResponseCode()`メソッドは、以下のレスポンスコードのいずれかを返します。

| レスポンスコード | 説明 |
| --- | --- |
| SUCCESS | ログインに成功しました。 |
| CANCEL | ユーザーがログインを中断したため、ログインに失敗しました。 |
| AUTHENTICATION\_AGENT\_ERROR | ユーザーがアプリの利用条件の同意画面で［キャンセル］または［戻る］をタップしたため、ログインに失敗しました。 |
| SERVER\_ERROR | サーバー側のエラーにより、ログインに失敗しました。 |
| NETWORK\_ERROR | SDKがLINEプラットフォームへ接続できなかったため、ログインに失敗しました。 |
| INTERNAL\_ERROR | 原因不明のエラーにより、ログインに失敗しました。 |