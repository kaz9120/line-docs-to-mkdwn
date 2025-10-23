---
url: https://developers.line.biz/ja/docs/partner-docs/module-technical-using-messaging-api/
copied_at: 2025-10-23T16:02:49.416Z
---
# モジュールチャネルからMessaging APIを利用する

:::note warn
オプション機能を利用するには手続きが必要です

:::

モジュールチャネルではMessaging APIチャネルと同様にMessaging APIを使ってメッセージを送信や、リッチメニューの切り替えが可能です。

*   [モジュールチャネルのチャネルアクセストークンでMessaging APIを利用する](#using-msg-api-with-module-channel-access-token)
*   [Webhookを受信する](#get-webhook)
*   [モジュールチャネルからLINE公式アカウントの情報を取得する](https://developers.line.biz/ja/docs/partner-docs/module-technical-using-messaging-api/#get-line-oa-info-from-module-channel)
*   [注意事項](#notes)

## モジュールチャネルのチャネルアクセストークンでMessaging APIを利用する

*   [モジュールチャネルで利用するユーザーID](#user-id-used-in-module-channel)
*   [モジュールチャネルのチャネルアクセストークン](#module-channel-access-token)
*   [Messaging APIのエンドポイントを呼び出す](#call-msg-api-endpoint)
*   [Messaging APIを利用する際のレート制限](#rate-limits)

### モジュールチャネルで利用するユーザーID

LINEマーケットプレイスで提供するモジュールチャネルでは、ユーザー個別の識別子である[ユーザーID](https://developers.line.biz/ja/glossary/#user-id)は、Lからはじまる68桁の文字列で構成されます。

この識別子は、同一ユーザーであっても、LINE公式アカウントごとに異なる値となります。

**Lから始まる68桁の識別子の例**

text

`LUb577ef3cbe786a8da85ff8e902a03fc6-U5fac33f633e72c192759f09afc41fa28`

### モジュールチャネルのチャネルアクセストークン

モジュールチャネルがActive Channelに切り替わったら、モジュールチャネルのチャネルアクセストークンを利用して、Messaging APIやModule Channel APIを呼び出すことができます。

モジュールチャネルでは、以下のチャネルアクセストークンを利用できます。

*   [短期のチャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/#short-lived-channel-access-token)
*   [任意の有効期間を指定できるチャネルアクセストークン（チャネルアクセストークンv2.1）](https://developers.line.biz/ja/docs/basics/channel-access-token/#user-specified-expiration)
*   [ステートレスチャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/#stateless-channel-access-token)

チャネルアクセストークンを発行する際に必要な情報は、[LINE Developersコンソール](https://developers.line.biz/console/)のモジュールチャネルの［**チャネル基本設定**］タブで確認できます。

:::note warn
長期のチャネルアクセストークンは使用できません

:::

### Messaging APIのエンドポイントを呼び出す

モジュールチャネルのチャネルアクセストークンを利用して、Messaging APIを呼び出すことができます。

ただし、スコープとリクエストヘッダーに注意してください。

#### スコープ

Messaging APIを利用するには、エンドポイントごとに決められたスコープを持つアクセストークンが必要です。

スコープは、モジュールチャネルをアタッチするときに指定し、LINE公式アカウントの管理者から利用の許可を得る必要があります。詳しくは、「[LINE公式アカウントの管理者に認可を要求する](https://developers.line.biz/ja/docs/partner-docs/module-technical-attach-channel/#request-auth-from-line-oa-admin)」を参照してください。

#### リクエストヘッダー

モジュールチャネルからMessaging APIのエンドポイントを呼び出すときは、`Authorization`ヘッダーにはモジュールチャネルのチャネルアクセストークンを指定します。また、モジュールチャネルは複数のLINE公式アカウントにアタッチすることを前提にしたサービスのため、後述の「ボットのユーザーIDを指定するヘッダー」を必ず指定してください。

Authorization

必須

`Bearer {channel access token}`

`{channel access token}`には、モジュールチャネルのチャネルアクセストークンを指定してください。

ボットのユーザーIDを指定するヘッダー

必須

モジュールチャネルにアタッチされたLINE公式アカウントのボットのユーザーID。

ボットのユーザーIDは、「[モジュールチャネルの提供者の操作で連携（アタッチ）する](https://developers.line.biz/ja/reference/partner-docs/#link-attach-by-operation-module-channel-provider)」のレスポンスや[Attachedイベント](https://developers.line.biz/ja/reference/partner-docs/#attached-event)で取得できます。

:::note warn
ヘッダーの詳細については参画される際に別途提供いたします

:::

以下は、モジュールチャネルからMessaging APIで[プッシュメッセージ](https://developers.line.biz/ja/reference/messaging-api/#send-push-message)を送信する場合の例です。

sh

`curl -v -X POST https://api.line.me/v2/bot/message/push \ -H 'Content-Type:application/json' \ -H 'Authorization: Bearer {channel access token}' \ -H 'ボットのユーザーIDを指定するヘッダー: xxxxxxxxxxxxxxxxxxxxxxxx'　\      // NEED THIS HEADER -d '{     "to": "LUb577ef3cbe...",    "messages":[        {            "type":"text",            "text":"Hello, world1"        }    ] }'`

### Messaging APIを利用する際のレート制限

モジュールチャネルからMessaging APIを利用する際のレート制限は、モジュールチャネル単位かつモジュールチャネルを連携しているLINE公式アカウントのボットごとに、各API機能（エンドポイント）に対して適用されます。

モジュールチャネルが複数のLINE公式アカウントのボットと連携していたとしても、`モジュールチャネル x LINE公式アカウントのボット x API機能`の組み合わせごとにレート制限が適用されます。

各エンドポイントのレート制限について詳しくは、『Messaging APIリファレンス』の「[レート制限](https://developers.line.biz/ja/reference/messaging-api/#rate-limits)」を参照してください。

### モジュールチャネルから送信したメッセージの統計情報を取得する

複数のユーザーに送信した[プッシュメッセージ](https://developers.line.biz/ja/reference/messaging-api/#send-push-message)や[マルチキャストメッセージ](https://developers.line.biz/ja/reference/messaging-api/#send-multicast-message)について、ユーザーがメッセージをどのように操作したかを示す統計情報を、ユニットごとに集計できます。

モジュールチャネルでの統計情報の集計は、LINE公式アカウントのボットとユニット名の組み合わせで集計されます。

たとえば、あるモジュールチャネルにおいて、ユニット名の「ユニットA」を付与したメッセージを、LINE公式アカウントAとLINE公式アカウントBから送信したとします。このとき、それぞれのLINE公式アカウントごとにユニット単位の統計情報が集計されます。

また、当月中（その月の1日～末日）に付与したユニット名の種類数も同様に、LINE公式アカウントのボットとユニット名の組み合わせで集計されます。

詳しくは、『Messaging APIドキュメント』の「[送信したメッセージの統計情報を取得する](https://developers.line.biz/ja/docs/messaging-api/unit-based-statistics-aggregation/)」を参照してください。

## Webhookを受信する

モジュールチャネルに登録したWebhook URLサーバーでWebhookイベントを受信した際は、`mode`プロパティと`destination`プロパティの値を確認してください。

:::note warn
注意

:::

*   [`mode`プロパティ](#mode-property)
*   [`destination`プロパティ](#destination-property)
*   [モジュールチャネル専用のWebhookイベントを受信する](#get-module-channel-specific-webhook-events)

### modeプロパティ

ユーザーが、LINE公式アカウントにメッセージを送信したり、友だち追加したりすると、LINE公式アカウントに紐づくすべてのチャネル（Primary ChannelおよびLINE公式アカウントにアタッチされたモジュールチャネル）に、Webhookイベントが同時に送信されます。

![Chat Control](https://developers.line.biz/media/partner-docs/module-technical/chat-control-ja.png)

Webhookイベントを処理する前に、モジュールチャネルが主導権（Chat Control）を持っていることを確認し、そのチャネルがエンドユーザーに対して応答すべきかどうかを確認してください。

主導権（Chat Control）を持っているかを確認するには、Webhookイベントの`mode`プロパティを利用します。

| `mode`プロパティの値 | 説明 |
| --- | --- |
| `active` | Webhookイベントを受信したチャネルは、アクティブです。<br/>このWebhookイベントを受信したWebhook URLサーバーから、返信メッセージやプッシュメッセージなどを送信できます。 |
| `standby` | Webhookイベントを受信したチャネルは、待機状態です。<br/>このWebhookイベントを受信したWebhook URLサーバーは、メッセージの送信を控えてください。<br/><br/>なお、待機状態のチャネルに届くWebhookイベントには、`replyToken`プロパティが含まれません。そのため、応答メッセージは利用できません。 |

LINE公式アカウントにアタッチされているチャネルのうち、`mode`プロパティが`active`に設定されているチャネルは1つだけです。それ以外のチャネルでは、`mode`プロパティが`standby`に設定されています。

以下は、`mode`プロパティの値が`active`場合と`standby`の場合に送信されるWebhookイベントの例です。

sh

`#Active Channelに送信されるWebhookイベントの例 {     "replyToken": "0f3779fba3b349968c5d07db31eab56f", // NOTICE THIS PROPERTY    "type": "message",    "mode": "active", // NOTICE THIS PROPERTY    "timestamp": 1462629479859,    "source": {        "type": "user",        "userId": "LUb577ef3cbe..."    },    "message": {        "id": "325708",        "type": "text",        "text": "Hello, world"    } } #Standby Channelに送信されるWebhookイベントの例 {     // replyToken PROPERTY DOES NOT EXIST    "type": "message",    "mode": "standby", // NOTICE THIS PROPERTY    "timestamp": 1462629479859,    "source": {        "type": "user",        "userId": "U4af4980629..."    },    "message": {        "id": "325708",        "type": "text",        "text": "Hello, world!"    } }`

### destinationプロパティ

モジュールチャネルは、下図のように複数のLINE公式アカウント（OA "X"、OA "Y"、OA "Z"、…）にアタッチされる可能性があります。

![同じサービスをアタッチ](https://developers.line.biz/media/partner-docs/module-technical/attach-same-service-ja.png)

そのため、WebhookがどのLINE公式アカウントから送信されたかを判別するために、`destination`プロパティを利用します。

destination

String

Webhookイベントの送信元のLINE公式アカウントのボットのユーザーID。

ボットのユーザーIDの値は、`U[0-9a-f]{32}`の正規表現にマッチする文字列です。

以下は、Webhookイベントの例です。

sh

`{   "destination": "U53387d54817...",  // CHECK THIS PROPERTY  "events": [...] }`

### モジュールチャネル専用のWebhookイベントを受信する

以下のWebhookイベントが、モジュールチャネルのWebhook URLサーバーに送信されます。

| イベントタイプ | 説明 |
| --- | --- |
| [Attachedイベント](https://developers.line.biz/ja/reference/partner-docs/#attached-event) | モジュールチャネルが、LINE公式アカウントにアタッチされたことを示すイベント |
| [Detachedイベント](https://developers.line.biz/ja/reference/partner-docs/#detached-event) | モジュールチャネルが、LINE公式アカウントからデタッチされたことを示すイベント |
| [Activatedイベント](https://developers.line.biz/ja/reference/partner-docs/#activated-event) | [Acquire Control API](https://developers.line.biz/ja/reference/partner-docs/#acquire-control-api)を呼び出して、モジュールチャネルがActive Channelに切り替わったことを示すイベント |
| [Deactivatedイベント](https://developers.line.biz/ja/reference/partner-docs/#deactivated-event) | [Acquire Control API](https://developers.line.biz/ja/reference/partner-docs/#acquire-control-api)または[Release Control API](https://developers.line.biz/ja/reference/partner-docs/#release-control-api)を呼び出して、モジュールチャネルがStandby Channelに切り替わったことを示すイベント |
| [botSuspendイベント](https://developers.line.biz/ja/reference/partner-docs/#botsuspend-event) | LINE公式アカウントが一時停止状態（Suspend）になったことを示すイベント |
| [botResumedイベント](https://developers.line.biz/ja/reference/partner-docs/#botresumed-event) | LINE公式アカウントが一時停止状態（Suspend）から復帰したことを示すイベント |

:::note info
主導権（Chat Control）の変化を検知するには

:::

:::note info
LINE公式アカウントの一時停止状態（Suspend）について

:::

## モジュールチャネルからLINE公式アカウントの情報を取得する

以下のAPIを使うことで、モジュールチャネルをアタッチしたLINE公式アカウントの情報を取得できます。

*   [ボットの情報を取得する](#get-bot-info)
*   [モジュールをアタッチしたボットのリストを取得する](#get-multiple-bot-info)

### ボットの情報を取得する

モジュールチャネルをアタッチしたLINE公式アカウントのボットの基本情報を取得します。詳しくは、『Messaging APIリファレンス』の「[ボットの情報を取得する](https://developers.line.biz/ja/reference/messaging-api/#get-bot-info)」を参照してください。

なお、リクエストヘッダーには、以下の内容を指定してください。

Authorization

Bearer `{channel access token}`

`{channel access token}`には、モジュールチャネルのチャネルアクセストークンを指定してください。

ボットのユーザーIDを指定するヘッダー

モジュールチャネルにアタッチされたLINE公式アカウントのボットのユーザーID。

ボットのユーザーIDは、「[モジュールチャネルの提供者の操作で連携（アタッチ）する](https://developers.line.biz/ja/reference/partner-docs/#link-attach-by-operation-module-channel-provider)」のレスポンスや[Attachedイベント](https://developers.line.biz/ja/reference/partner-docs/#attached-event)で取得できます。

:::note warn
ヘッダーの詳細については参画される際に別途提供いたします

:::

### モジュールをアタッチしたボットのリストを取得する

モジュールチャネルをアタッチした、複数のLINE公式アカウントのボットの基本情報をリストで取得します。詳しくは、『法人ユーザー向けオプションAPIリファレンス』の「[モジュールをアタッチしたボットのリストを取得する](https://developers.line.biz/ja/reference/partner-docs/#get-multiple-bot-info-api)」を参照してください。

## 注意事項

*   モジュールチャネルをデタッチした際、設定が反映されるまでにタイムラグが発生します。デタッチ後は、リクエストを送信しないようにご注意ください。
*   対象のアカウントにスコープを追加したい場合は、既にアタッチ済のLINE公式アカウントに対しても、追加でアタッチを行うことが可能です。

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}