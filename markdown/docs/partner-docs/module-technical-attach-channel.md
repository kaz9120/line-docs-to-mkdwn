---
url: https://developers.line.biz/ja/docs/partner-docs/module-technical-attach-channel/
copied_at: 2025-10-24T10:17:22.544Z
---
# モジュールチャネルを連携（アタッチ）する

> [!WARNING]
> オプション機能を利用するには手続きが必要です
> 本ドキュメントに記載の機能は、所定の申請等を行った法人ユーザーのみがご利用いただけます。モジュールを利用した拡張機能の公開を希望するお客様は、担当営業までご連絡いただくか、[LINEマーケットプレイス お問い合わせ](https://line-marketplace.com/jp/inquiry)よりお問い合わせください。

モジュールチャネルの機能を利用するには、以下の手順に従って、LINE公式アカウントの管理者からの認可と、モジュールチャネルの連携（アタッチ）が必要です。

## OAuth 2.0の認可の仕組みを利用してモジュールチャネルをアタッチする

OAuth 2.0の認可の仕組みのフローに従って、LINE公式アカウントの管理者から認可を得ることで、モジュールチャネルをアタッチできます。

## モジュールをアタッチするためのフロー

1つ目の画面と5つ目の画面は、モジュールチャネルの開発担当企業が準備してください。

![OAuth 2.0の認可の仕組みを使ったモジュールチャネルのアタッチするフロー](https://developers.line.biz/media/partner-docs/module-technical/flow-ja.png)

> [!WARNING]
> LINE公式アカウントに複数のモジュールチャネルをアタッチする際の制限
> 「Default Active」の機能が付与されたモジュールチャネルは、1つのLINE公式アカウントに複数アタッチすることはできません。

1.  [LINE公式アカウントの管理者に認可を要求する](#request-auth-from-line-oa-admin)
2.  [連携画面について](#about-linkage-screen)
3.  [認可コードまたはエラーコードを受け取る](#get-auth-code)
4.  [モジュールチャネルの提供者の操作で連携（アタッチ）する](#link-attach-by-operation-of-module-channel-provider)

### 1\. LINE公式アカウントの管理者に認可を要求する

LINE公式アカウントの管理者に、認証と認可のためのURL（認可URL`https://manager.line.biz/module/auth/v1/authorize`にクエリパラメータを付けたもの）にアクセスしてもらうことで、LINE公式アカウントへモジュールチャネルをアタッチするプロセスが開始されます。

**認証と認可のためのURLの例**

```text
https://manager.line.biz/module/auth/v1/authorize?response_type=code&client_id=1234567890&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=message%3Asend%20message%3Areceive&state={CSRF token}&region=JP&basic_search_id={LINE Official Account basic ID}&brand_type=premium
```

一般的には、モジュールチャネルの連携を開始するためのページに、このURLにアクセスするリンクを設置し、LINE公式アカウントの管理者にリンクをクリックしてもらいます。上記の例で提示されているフローでは、「【貴社サービス内】連携開始ページ」で、［**Attach Module**］ボタンをクリックしたときに、このURLにアクセスするように設定しています。

#### クエリパラメータ

response\_type

String

必須

`code`

redirect\_uri

String

必須

リダイレクトURL。モジュールチャネルの開発担当企業が、認可コードを受け取るためのURLです。認証と認可（連携画面での操作）の後に、LINE公式アカウントの管理者がこのURLにリダイレクトされます。

このURLは、モジュールチャネルの開発担当企業が用意してください。なお、このURLはあらかじめ[LINE Developersコンソール](https://developers.line.biz/console/)でモジュールチャネルに登録したリダイレクトURLと一致させてください。

> [!WARNING]
> redirect_uriにはURLエンコードした値を指定してください
> クエリパラメータのURLエンコードを忘れると、2つ目以降のクエリパラメータが認証URLに対するクエリパラメータとして認識され、リダイレクト先に渡されません。
> 
> 例えば、`redirect_uri`に`https://example.com/auth?param1=value1&param2=value2`を指定する場合、認証と認可のためのURLは`https://manager.line.biz/module/auth/v1/authorize?response_type=code&client_id=1234567890&redirect_uri=https%3A%2F%2Fexample.com%2Fauth%3Fparam1%3Dvalue1%26param2%3Dvalue2&scope=message%3Asend%20message%3Areceive&state={CSRF token}&region=JP&basic_search_id={LINE Official Account basic id}&brand_type=premium`とします。

client\_id

String

必須

モジュールチャネルのチャネルID。LINEプラットフォームが発行した、チャネル固有の識別子です。

scope

String

必須

LINE公式アカウントの管理者に許可を求める権限（スコープ）を指定します。複数のスコープを指定する場合は、URLエンコードされた空白文字（%20）で区切って指定してください。詳しくは、「[スコープ](#scopes)」を参照してください。

state

String

必須

[クロスサイトリクエストフォージェリ（CSRF）](https://datatracker.ietf.org/doc/html/rfc6749#section-10.12)防止用の固有な英数字の文字列。モジュールチャネルの開発担当企業のシステムでランダムにユニークな値を生成する必要があります。URLエンコードされた文字列は使用できません。

region

String

任意

モジュールチャネルをアタッチするLINE公式アカウントの地域。`JP`や`TW`を指定します。

basic\_search\_id

String

任意

LINE公式アカウントの[ベーシックID](https://help.linebiz.com/lineadshelp/s/article/L000001191?language=ja)。特定のLINE公式アカウントにのみモジュールチャネルへのアタッチを許可する場合に指定します。

brand\_type

String

任意

アタッチ可能な[LINE公式アカウントのアカウント種別](https://www.lycbiz.com/jp/service/line-official-account/account-type/)を制限する場合に指定します。

*   プレミアムアカウント: `premium`
*   認証済アカウント: `verified`
*   未認証アカウント: `unverified`

複数のアカウント種別を指定する場合には、URLエンコードされた空白文字（%20）で連結します。例えば、プレミアムアカウントおよび認証済アカウントのみアタッチ可能なように制限する場合は`brand_type=premium%20verified`とします。

code\_challenge

String

任意

認可コード横取り攻撃への対策としてOAuth 2.0の拡張仕様で定義されるPKCE（Proof Key for Code Exchange）を利用する場合に指定します。[RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636)に準拠しています。

code\_challenge\_method

String

任意

`S256`

認可コード横取り攻撃への対策としてOAuth 2.0の拡張仕様で定義されるPKCE（Proof Key for Code Exchange）を利用する場合に指定します。[RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636)に準拠しています。

#### スコープ

`scope`パラメータに指定できるスコープは以下のとおりです。複数のスコープを指定するには、URLエンコードされた空白文字（%20）で区切って指定します。

| スコープ | モジュールチャネルで利用できるAPI |
| --- | --- |
| 指定不要（デフォルト） | スコープ不要で利用できます。<ul><li><a href="/ja/reference/messaging-api/#issue-link-token" class="">連携トークンを発行する（/v2/bot/user/{userId}/linkToken）</a></li></ul> |
| `message%3Asend`<br/>(message:send) | <ul><li><a href="/ja/reference/messaging-api/#send-reply-message" class="">応答メッセージを送る（/v2/bot/message/reply）</a></li><li><a href="/ja/reference/messaging-api/#send-push-message" class="">プッシュメッセージを送る（/v2/bot/message/push）</a></li><li><a href="/ja/reference/messaging-api/#send-multicast-message" class="">マルチキャストメッセージを送る（/v2/bot/message/multicast）</a></li><li><a href="/ja/reference/messaging-api/#send-broadcast-message" class="">ブロードキャストメッセージを送る（/v2/bot/message/broadcast）</a></li><li><a href="/ja/reference/messaging-api/#send-narrowcast-message" class="">ナローキャストメッセージを送る（/v2/bot/message/narrowcast）</a> および関連API</li><li><a href="/ja/reference/messaging-api/#manage-audience-group" class="">オーディエンス管理（/v2/bot/audienceGroup/***）</a></li><li><a href="/ja/reference/messaging-api/#get-quota" class="">当月に送信できるメッセージ数の上限目安を取得する（/v2/bot/message/quota）</a></li><li><a href="/ja/reference/messaging-api/#get-consumption" class="">当月のメッセージ利用状況を取得する（/v2/bot/message/quota/consumption）</a></li><li><a href="/ja/reference/messaging-api/#display-a-loading-indicator" class="">ローディングのアニメーションを表示する（/v2/bot/chat/loading/start）</a></li></ul> |
| `message%3Areceive`<br/>(message:receive) | <ul><li>Messaging APIおよびModule Channel APIのWebhookイベントの受信</li><ul><li><a href="/ja/reference/messaging-api/#webhooks" class="">Webhook</a></li><li><a href="/ja/reference/messaging-api/#webhook-event-objects" class="">Webhookイベントオブジェクト</a></li></ul><li><a href="/ja/docs/partner-docs/module-technical-chat-control/#what-is-chat-control" class="">チャットの主導権（Chat Control）</a></li></ul> |
| `account%3Amanage`<br/>(account:manage) | <ul><li><a href="/ja/reference/messaging-api/#set-default-rich-menu" class="">デフォルトのリッチメニューを設定する（/v2/bot/user/all/richmenu/{richMenuId}）</a></li><li><a href="/ja/reference/messaging-api/#get-number-of-delivery-messages" class="">メッセージの送信数を取得する（/v2/bot/insight/message/delivery?date={date}）</a></li><li><a href="/ja/reference/messaging-api/#get-number-of-followers" class="">友だち数を取得する（/v2/bot/insight/followers?date={date}）</a></li><li><a href="/ja/reference/messaging-api/#get-demographic" class="">友だちの属性情報に基づく統計情報を取得する（/v2/bot/insight/demographic）</a></li><li><a href="/ja/reference/messaging-api/#get-message-event" class="">ユーザーの操作に基づく統計情報を取得する（/v2/bot/insight/message/event?requestId={requestId}）</a></li><li><a href="/ja/reference/messaging-api/#get-statistics-per-unit" class="">ユニットごとの統計情報を取得する（/v2/bot/insight/message/event/aggregation?customAggregationUnit={customAggregationUnit}&amp;from={from}&amp;to={to}）</a></li></ul> |
| `message%3Amark_as_read`<br/>(message:mark\_as\_read) | <ul><li><a href="/ja/reference/partner-docs/#mark-messages-from-users-as-read" class="">ユーザーからのメッセージに既読を付ける（/v2/bot/message/markAsRead）</a></li></ul> |
| `message%3Atemplated_pnp`<br/>(message:templated\_pnp) | <ul><li><a href="/ja/reference/line-notification-messages/#send-line-notification-message-template" class="">LINE通知メッセージ（テンプレート）を送る（/v2/bot/message/pnp/templated/push）</a></li><li><a href="/ja/reference/line-notification-messages/#get-number-of-sent-line-notification-messages-template" class="">送信済みのLINE通知メッセージ（テンプレート）の数を取得する（/v2/bot/message/delivery/pnp/templated）</a></li><li>LINE通知メッセージの配信が完了した際に送信されるWebhookイベントの受信（<a href="/ja/docs/partner-docs/line-notification-messages/message-sending-complete-webhook-event/" class="">Webhookの配信完了イベント</a>）</li></ul> |
| `profile%3Aread`<br/>(profile:read) | <ul><li><a href="/ja/reference/messaging-api/#get-profile" class="">プロフィール情報を取得する（/v2/bot/profile/{userId}）</a></li><li><a href="/ja/reference/messaging-api/#get-group-summary" class="">グループトークの概要を取得する（/v2/bot/group/{groupId}/summary）</a></li><li><a href="/ja/reference/messaging-api/#get-group-member-profile" class="">グループトークのメンバーのプロフィール情報を取得する（/v2/bot/group/{groupId}/member/{userId}）</a></li><li><a href="/ja/reference/messaging-api/#get-room-member-profile" class="">複数人トークのメンバーのプロフィールを取得する（/v2/bot/room/{roomId}/member/{userId}）</a></li><li><a href="/ja/reference/messaging-api/#get-members-group-count" class="">グループトークに参加しているユーザーの人数を取得する（/v2/bot/group/{groupId}/members/count）</a></li><li><a href="/ja/reference/messaging-api/#get-members-room-count" class="">複数人トークに参加しているユーザーの人数を取得する（/v2/bot/room/{roomId}/members/count）</a></li></ul> |
| `coupon%3Amanage`<br/>(coupon:manage) | <ul><li><a href="/ja/reference/messaging-api/#create-coupon" class="">クーポンを作成する（/v2/bot/coupon）</a></li><li><a href="/ja/reference/messaging-api/#discontinue-coupon" class="">クーポンを終了する（/v2/bot/coupon/{couponId}/close）</a></li><li><a href="/ja/reference/messaging-api/#get-coupons-list" class="">クーポンの一覧を取得する（/v2/bot/coupon）</a></li><li><a href="/ja/reference/messaging-api/#get-coupon" class="">クーポンの詳細を取得する（/v2/bot/coupon/{couponId}）</a></li><li>メッセージタイプに<a href="/ja/docs/messaging-api/message-types/#coupon-messages" class="">クーポンメッセージ</a>を指定してメッセージを送る</li></ul> |
| `crm%3Amanage`<br/>(crm:manage) | このスコープはChat Plugin機能（※）を利用するモジュールチャネルでのみ指定が可能です。それ以外の場合は指定しないでください。<br/>Chat Plugin機能を利用する場合は必須となります。Chat Plugin機能を利用するモジュールチャネルにおいて、このスコープを指定していなかった場合、今後Chat Pluginで提供される機能を利用することができない場合があります。 |

（※）Chat Plugin機能は、現在一部の法人ユーザーにのみ公開しています。

### 2\. 連携画面について

LINE公式アカウントの管理者が、認証と認可のためのURLにアクセスすると、LINE Official Account Managerの連携画面が表示されます。連携画面には、モジュールチャネル作成時に申請した内容が表示されます。設定内容は、[LINE Developersコンソール](https://developers.line.biz/console/)で確認できます。

![連携画面](https://developers.line.biz/media/partner-docs/attach-disp-ja.png)

### 3\. 認可コードまたはエラーコードを受け取る

LINE公式アカウントの管理者が認証と認可を終了すると、認証と認可のためのURLで指定したリダイレクトURL（`redirect_uri`）に、以下のクエリパラメータを通じて認可コードやエラーコードが渡されます。上記の例で提示されている[フロー](#attach-flow)では、「【OAM】確認および連携」で［**連携**］ボタンをクリックしたときに認可コードやエラーコードが渡されます。

#### 認可コードを受け取る

LINE公式アカウントの管理者による認証と認可が完了すると、以下のクエリパラメータが付与されたリダイレクトURL（`redirect_uri`）にリダイレクトされます。

##### クエリパラメータ

code

String

LINE公式アカウントに連携（アタッチ）するときに必要な認可コードです。認可コードには有効期間があります。また、認可コードは1回のみ使用できます。

state

String

CSRF対策用の文字列です。認証と認可のためのURLの`state`クエリパラメータで指定した文字列と同じものであることを確認してください。

#### エラーコードを受け取る

LINE公式アカウントの管理者が認可を拒否した場合、以下のクエリパラメータが付与されたリダイレクトURL（`redirect_uri`）にリダイレクトされます。

##### クエリパラメータ

error

String

エラーコードです。

error\_description

String

エラーの詳細です。

state

String

CSRF対策用の文字列です。認証と認可のためのURLの`state`クエリパラメータで指定した文字列と同じものであることを確認してください。

### 4\. モジュールチャネルの提供者の操作で連携（アタッチ）する

認可コードを取得し、`state`クエリパラメータで渡された文字列に問題がないことが確認できたら、モジュールチャネルをLINE公式アカウントにアタッチします。

詳しくは、『法人ユーザー向けオプションAPIリファレンス』の「[モジュールチャネルの提供者の操作で連携（アタッチ）する](https://developers.line.biz/ja/reference/partner-docs/#link-attach-by-operation-module-channel-provider)」を参照してください。