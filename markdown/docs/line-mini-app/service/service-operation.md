---
url: https://developers.line.biz/ja/docs/line-mini-app/service/service-operation/
copied_at: 2025-10-23T16:01:38.621Z
---
# サービス事業主のためのノウハウ

サービスのプロダクトデザイナー、運用担当者、マーケティング担当者は、このガイドを読んで準備しておくことを強くお勧めします。

*   [LINEミニアプリをリンクで共有するには](#sharing-line-mini-app-link)
*   [サービスメッセージの条件](#conditions-for-service-messages)
    *   [サービスメッセージで許可されている通知](#allowed-by-service-messages)
    *   [サービスメッセージで禁止されている通知](#disallowed-by-service-messages)
    *   [メッセージ数の制限](#message-count-limit)
    *   [サービスメッセージのテンプレート](#service-message-templates)

## LINEミニアプリをリンクで共有するには

LINEミニアプリやそのページを共有するには、[パーマネントリンクを作成する](https://developers.line.biz/ja/docs/line-mini-app/develop/permanent-links/)必要があります。特に、以下のような方法でLINEミニアプリを共有することを検討している場合は、必ずパーマネントリンクを使用してください。

*   ウェブページ、メール、ソーシャルメディアなど、LINE以外でリンクを共有する場合
*   [LINE公式アカウントのリッチメッセージやリッチメニューで共有する場合](https://developers.line.biz/ja/docs/line-mini-app/service/line-mini-app-oa/)
*   [カスタムアクションボタンを実装する場合](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/)
*   [サービスメッセージ](https://developers.line.biz/ja/docs/line-mini-app/develop/service-messages/)を用いて共有する場合
*   LINEミニアプリの[POPテンプレート](https://creativelab-tips.line.me/ja/line-miniapp/creative/)にQRコードを載せて使う場合

## サービスメッセージの条件

[サービスメッセージ](https://developers.line.biz/ja/docs/line-mini-app/develop/service-messages/)は、LINEミニアプリ上でのユーザーの操作（アクション）に対する確認や応答としてのみ送信できます。

### サービスメッセージで許可されている通知

サービスメッセージで許可される通知は以下のとおりです。

| タイプ | 事例 |
| --- | --- |
| アクションの確認通知 | <ul><!--[--><li><!--[-->レストランや宿泊施設の予約の確認通知<!--]--></li><li><!--[-->購入したチケットや商品の確認通知<!--]--></li><!--]--></ul> |
| アクションの結果通知 | <ul><!--[--><li><!--[-->チェックイン完了通知<!--]--></li><li><!--[-->注文品の発送完了通知<!--]--></li><!--]--></ul> |
| リマインダー通知 | <ul><!--[--><li><!--[-->レストランや宿泊施設の予約リマインダー通知<!--]--></li><li><!--[-->チケットを購入した観劇や映画、コンサートの予約リマインダー通知<!--]--></li><!--]--></ul> |

### サービスメッセージで禁止されている通知

サービスメッセージで禁止されている通知は以下の通りです。

*   券売機でチケットを購入した際の購入完了通知やリマインド通知など、LINEミニアプリ上のユーザー操作に対する確認や応答ではない通知
*   値下げ、ショッピング特典、新商品、割引クーポン、プロモーションなどの情報を含む広告やイベントの通知

許可されていない内容を含むサービスメッセージを送信した場合、サービスメッセージAPIの利用が一定期間禁止されます。また規約に繰り返し違反した場合、LINEミニアプリがLINEから削除されることがあります。

### メッセージ数の制限

*   ユーザーのアクションに対して、メッセージを5件まで送信できます。この制限は、アクションの確認通知、アクションの結果通知、リマインダー通知の各ユースケースに適用されます。
*   メッセージ数の制限は、使用状況に応じて変更されることがあります。制限が変更されると、[審査](https://developers.line.biz/ja/docs/line-mini-app/submit/submission-guide/)の際にLINEヤフー株式会社から通知されます。

### サービスメッセージのテンプレート

*   LINEミニアプリチャネルに、[サービスメッセージのテンプレートを追加](https://developers.line.biz/ja/docs/line-mini-app/develop/service-messages/#service-message-templates)してください。
*   サービスメッセージのテンプレートは、LINEミニアプリチャネルごとに20個まで登録できます。