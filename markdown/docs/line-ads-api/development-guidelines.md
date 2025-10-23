---
url: https://developers.line.biz/ja/docs/line-ads-api/development-guidelines/
copied_at: 2025-10-23T16:02:53.728Z
---
# LINE広告API開発ガイドライン

LINE広告APIを使って開発する際は、以下の開発ガイドラインに従ってください。

*   [LINEプラットフォームへの大量リクエストの禁止](#prohibiting-mass-requests-to-line-platform)
*   [存在しないIDへのリクエストの禁止](#prohibiting-requests-for-non-existent-ids)
*   [ログ保存の推奨](#save-logs)
    *   [LINE Ads APIに対するリクエストのログ](#line-ads-api-logs)

## LINEプラットフォームへの大量リクエストの禁止

負荷テストや動作テストを目的に、LINEプラットフォームへ、大量のリクエストを送信しないでください。

なお、いかなる目的でもレート制限を超えてリクエストを送信しないでください。レート制限について詳しくは、[ダッシュボードAPIのドキュメント](https://ads.line.me/public-docs/certificated-ad-tech-general-partner)（英語）、および[オーディエンスAPIのドキュメント](https://ads.line.me/public-docs/data-general-partner)（英語）を参照してください。

:::note warn
注意

:::

## 存在しないIDへのリクエストの禁止

リクエストを送信するときは、存在しないID（`Ad account ID`、`Ad ID`など）を指定しないでください。

## ログ保存の推奨

問題が発生した際に、開発者自身が原因や影響範囲の調査を円滑に行えるよう、APIに対するリクエストのログを一定期間保存することを推奨します。

### LINE Ads APIに対するリクエストのログ

LINE広告APIに対するリクエストを行った際は、以下の情報をログとして保存することを推奨します。

*   APIリクエストを行った時間
*   リクエストメソッド
*   APIエンドポイント
*   LINEプラットフォームからレスポンスされたステータスコード

具体的には、以下のような形式でログファイルなどに保存します。

| APIリクエストを行った時間 | リクエストメソッド | APIエンドポイント | ステータスコード |
| --- | --- | --- | --- |
| Mon, 05 Jul 2022 08:14:35 GMT | GET | `https://ads.line.me/api/v3/codes/ssps` | 200 |