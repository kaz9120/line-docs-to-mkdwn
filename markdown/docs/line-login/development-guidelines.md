---
url: https://developers.line.biz/ja/docs/line-login/development-guidelines/
copied_at: 2025-10-23T15:58:13.711Z
---
# LINEログイン開発ガイドライン

LINEログインを使ったウェブアプリを開発する際は、以下の開発ガイドラインに従ってください。

**禁止事項**

*   [LINEプラットフォームへの大量リクエストの禁止](#prohibiting-mass-requests-to-line-platform)

**必須事項**

*   [ユーザー退会時の連動アプリに対する権限取消](#deauthorize)

**推奨事項**

*   [ログ保存の推奨](#save-logs)

:::note warn
注意

:::

## 禁止事項

### LINEプラットフォームへの大量リクエストの禁止

負荷テストを目的に、大量の[認可リクエスト](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#making-an-authorization-request)や[LINEログインAPI](https://developers.line.biz/ja/reference/line-login/)のリクエストをLINEプラットフォームに対して送信しないでください。ウェブアプリの負荷テストを行う場合は、LINEプラットフォームへの大量のリクエストが発生しないテスト環境を用意してください。

:::note warn
注意

:::

## 必須事項

### ユーザー退会時の連動アプリに対する権限取消

LINEログインを組み込んだ連動アプリ（ウェブサイトやスマートフォンアプリなど）からユーザーが退会する場合、あるいはユーザーが連動アプリとLINEアプリの連携を解除した場合は、以下を必ず行ってください。

1.  ユーザーがその連動アプリに対して認可していた権限を、[連動アプリに認可した権限を取り消す](https://developers.line.biz/ja/reference/line-login/#deauthorize)エンドポイントを用いて、ユーザーの代わりに取り消してください。
2.  退会や連携解除を行ったことで何が起きるのかを、その機能のそば、もしくは会員登録時や連携時にユーザーが同意する規約などに記載してください。
    *   例：本サービスを退会すると、退会したことがLINEヤフー株式会社に通知され、本サービスとLINEの連携は解除されます。
    *   例：この操作により、LINEヤフー株式会社に通知が行われ、本サービスとLINEの連携が解除されます。

次のようなユースケースにおいて、権限の取消が必要となります。

![アカウントを連携してから解除するまでの流れ](https://developers.line.biz/media/line-login/development-guidelines/deauthorize-your-app-ja.png)

ユーザーがLINEログインを組み込んだアプリにLINEアカウントでログインし、チャネル同意画面で[認可を行う](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#authorization-process)と、LINEアプリの［**設定**］ > ［**アカウント**］ > ［**連動アプリ**］に対象アプリが表示されるようになります。ユーザーが連動アプリを退会した後も、認可した権限がそのままにならないよう、権限の取消を行ってください。

なお連動アプリに対して認可した権限をユーザー自身が取り消す方法については、『LINEログインドキュメント』の「[ユーザーによる連動アプリの管理について](https://developers.line.biz/ja/docs/line-login/managing-authorized-apps/)」を参照してください。

## 推奨事項

### ログ保存の推奨

問題が発生した際に、開発者自身が原因や影響範囲の調査を円滑に行えるよう、[認可リクエスト](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#making-an-authorization-request)や[LINEログインAPI](https://developers.line.biz/ja/reference/line-login/)のリクエストのログを一定期間保存することを推奨します。

#### 認可リクエストのログ

[認可リクエスト](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#making-an-authorization-request)を行った際は、以下の情報をログとして保存することを推奨します。

*   認可リクエストを行った時間
*   認可リクエストのパラメータ

具体的には、以下のような形式でログファイルなどに保存します。

| 認可リクエストを行った時間 | 認可リクエストのパラメータ |
| --- | --- |
| Mon, 16 Jul 2021 10:20:10 GMT | `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=xxxxxxxxxx...` |

#### 認可コードまたはエラーレスポンスのログ

[認可リクエスト](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#making-an-authorization-request)により[認可コード](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#receiving-the-authorization-code)または[エラーレスポンス](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#receiving-an-error-response)受信した際には、以下の情報をログとして保存することを推奨します。

*   認可コードまたはエラーレスポンスを受信した時間
*   リクエストメソッド
*   認可コードまたはエラーレスポンスのログ

具体的には、以下のような形式でログファイルなどに保存します。

| レスポンスを受信した時間 | リクエストメソッド | 認可コードまたはエラーレスポンスのログ |
| --- | --- | --- |
| Mon, 16 Jul 2021 10:20:20 GMT | GET | `/callback?code=Zfl2WjsWcn2XBBWApcty&state=n5B9b9FR2BWjloDzEskZMmGysITRTYpjLkM6oD5qfmA` |

#### LINEログインAPIリクエスト時のログ

[LINEログインAPI](https://developers.line.biz/ja/reference/line-login/)のリクエストを行った際は、以下の情報をログとして保存することを推奨します。

*   [レスポンスヘッダー](https://developers.line.biz/ja/reference/line-login/#response-headers)のリクエストID（`x-line-request-id`）
*   APIリクエストを行った時間
*   リクエストメソッド
*   APIエンドポイント
*   LINEプラットフォームからレスポンスされた[ステータスコード](https://developers.line.biz/ja/reference/line-login/#status-codes)

具体的には、以下のような形式でログファイルなどに保存します。

| リクエストID（`x-line-request-id`） | APIリクエストを行った時間 | リクエストメソッド | APIエンドポイント | ステータスコード |
| --- | --- | --- | --- | --- |
| 8d48c8577e739b9c | Mon, 16 Jul 2021 10:20:22 GMT | POST | `https://api.line.me/oauth2/v2.1/token` | 200 |

:::note info
追加でログに保存しておくと有用な情報

:::

:::note warn
ログの提供は行っておりません

:::