---
url: https://developers.line.biz/ja/docs/line-mini-app/develop/service-messages/
copied_at: 2025-10-23T16:01:10.092Z
---
# サービスメッセージを送信する

:::note info
認証済ミニアプリでのみ利用できます

:::

サービスメッセージは、LINEミニアプリ上でのユーザーの操作（アクション）に対する確認や応答として、ユーザーが知っておくべき情報をLINEミニアプリから通知する機能です。たとえば、ユーザーがLINEミニアプリ上でレストランや宿泊施設を予約した場合、「予約」という1つの操作に対して、予約完了や前日のリマインドといったサービスメッセージを最大5回まで送信できます。

:::note warn
サービスメッセージの送信条件

:::

LINEミニアプリから送られたサービスメッセージは、LINEミニアプリの種類にかかわらず、LINEミニアプリを提供する地域ごとに決められたトークルームに表示されます。

| 日本 | タイ | 台湾 |
| :-: | :-: | :-: |
| LINEミニアプリ お知らせ | LINE MINI App Notice | LINE MINI App 通知 |
| ![LINEミニアプリ お知らせ](https://developers.line.biz/media/line-mini-app/mini_service_notifier_jp.png) | ![LINE MINI App Notice](https://developers.line.biz/media/line-mini-app/mini_service_notifier_th.png) | ![LINE MINI App 通知](https://developers.line.biz/media/line-mini-app/mini_service_notifier_tw.png) |

## サービスメッセージを送信する際の流れ

サービスメッセージを送信するには、サービスメッセージテンプレートとサービス通知トークンが必要です。以下の手順に沿って、送信してください。

1.  LINE Developersコンソールで、LINEミニアプリチャネルに[サービスメッセージのテンプレートを追加します。](#service-message-templates)
2.  LINEミニアプリ上でのユーザーの操作（アクション）を元に[サービス通知トークンを発行してサービスメッセージを送信します。](#sending-service-messages-for-the-first-time)
3.  2で発行された新しいサービス通知トークンを利用して、リマインダーなど[後続のサービスメッセージを送信します。](#sending-subsequent-service-messages)

:::note warn
審査を通過する必要があります

:::

## サービスメッセージのテンプレートを追加する

LINEヤフー株式会社が提供しているテンプレートの中から、[サービスメッセージ](https://developers.line.biz/ja/reference/line-mini-app/#service-messages)で利用するテンプレートを選択して、LINEミニアプリチャネルに追加します。サービスメッセージのテンプレートは、LINEミニアプリチャネルごとに20個まで追加できます。

テンプレートはカテゴリ別に提供しており、[LINE Developersコンソール](https://developers.line.biz/console/)で確認できます。また、自分のLINEアカウントにテストメッセージを送信して、実際にプレビューを確認することもできます。サービスメッセージのテンプレートを追加する手順は、以下のとおりです。

1.  [LINE Developersコンソール](https://developers.line.biz/console/)で、テンプレートを追加するLINEミニアプリチャネルを選択し、［**サービスメッセージテンプレート**］タブをクリックします。

:::note warn
注意

:::

2.  ［**追加**］をクリックします。
3.  以下の項目を設定します。
    
    | 項目 | 説明 |
    | --- | --- |
    | テンプレートを選択する | サービスメッセージAPIで利用するテンプレートを選択します。 |
    | テンプレート詳細 | 選択したテンプレートの詳細が表示されます。[サービスメッセージを送るAPI](https://developers.line.biz/ja/reference/line-mini-app/#send-service-message)を実行するときに、［**API用テンプレート名**］に表示されている文字列（`{template name}_{BCP 47 language tag}`）を`templateName`に指定してください。 |
    | プレビュー | テストメッセージのプレビューが表示されます。テストメッセージは、［**テストメッセージを送信する**］の［**送信する**］をクリックすると、LINE DevelopersコンソールにログインしているLINEアカウントに送信されます。 |
    | テストメッセージを送信する | テンプレート変数と値のペアを指定するJSONオブジェクトを入力します。入力した内容をもとに［**プレビュー**］が更新されます。<ul><!--[--><li><!--[-->［<strong><!--[-->コピー<!--]--></strong>］：JSONオブジェクトをクリップボードにコピーします。<!--]--></li><li><!--[-->［<strong><!--[-->Reset<!--]--></strong>］：JSONオブジェクトの編集内容を破棄します。<!--]--></li><li><!--[-->［<strong><!--[-->送信する<!--]--></strong>］：LINE DevelopersコンソールにログインしているLINEアカウントに、テストメッセージが送信されます。<!--]--></li><!--]--></ul> |
    | 使用事例 | このテンプレートを送信する状況を正確に入力してください。 |
    
    :::note warn
    注意
    
    :::
    
4.  ［**追加**］をクリックします。  
    サービスメッセージテンプレートの一覧に戻ります。  
    追加したテンプレートの［**公開状況**］に審査の状況が表示されます。
    
    | 公開状況 | 説明 |
    | --- | --- |
    | 開発中 | 開発中（審査未申請）。LINEミニアプリチャネルのAdmin権限またはTester権限を持つ開発者に対して、開発用のチャネルから[サービスメッセージを送る](https://developers.line.biz/ja/reference/line-mini-app/#send-service-message)場合にのみ使用できます。 |
    | 公開中 | 審査通過済み。LINEミニアプリチャネルのユーザーに対して、本番用のチャネルから[サービスメッセージを送る](https://developers.line.biz/ja/reference/line-mini-app/#send-service-message)場合に使用できます。 |
    

### テンプレートの各要素について

サービスメッセージは、（A）タイトル、（B）詳細内容、（C）ボタン、（D）フッターで構成されています。テンプレートは使用例に応じて、これらのセクションを組み合わせて作成してください。また、サービスメッセージの目的に最も適したテンプレートを利用してください。

![](https://developers.line.biz/media/line-mini-app/mini_servicenotifier_layout.png)

| ラベル | セクション | 説明 |
| --- | --- | --- |
| A | タイトル | タイトルセクションは、以下の要素で構成されます。<ul><!--[--><li><!--[-->タイトル（A-1）<!--]--></li><li><!--[-->サブタイトル（A-2）<!--]--></li><!--]--></ul> |
| B | 詳細内容 | 詳細内容セクションには、テンプレートの種類に応じて次の2種類のレイアウトがあります。 <ul><!--[--><li><!--[-->「detailed」：1個のキーが必須です。キーの最大数は選択したテンプレートによって異なります。文字数については、「<a href="#maximum-number-of-characters" class=""><!--[--><!--[-->各要素の最大文字数<!--]--><!--]--></a>」を参照してください。BRLINEBREAKTAG<img src="/media/line-mini-app/mini_detail_detailed.png" alt="" class="border w-fix-280"><!--]--></li><li><!--[-->「simple」: 最大1個のキーを指定できます。文字数については、「<a href="#maximum-number-of-characters" class=""><!--[--><!--[-->各要素の最大文字数<!--]--><!--]--></a>」を参照してください。BRLINEBREAKTAG<img src="/media/line-mini-app/mini_detail_simple.png" alt="" class="border w-fix-280"><!--]--></li><!--]--></ul> |
| C | ボタン | 選択したテンプレートによって、使用できるボタンの数は異なります。また、URLを設定したボタンのみが表示されます。URLは、LINEミニアプリのページの[パーマネントリンク](https://developers.line.biz/ja/docs/line-mini-app/develop/permanent-links/)を指定してください。<ul><!--[--><li><!--[-->1個目のボタンは必須で、［<strong><!--[-->詳細はこちら<!--]--></strong>］として表示されます。<!--]--></li><li><!--[-->2個目以降のボタンは任意で、選択したテンプレートによってあらかじめ定義されています。<!--]--></li><!--]--></ul> |
| D | フッター | ［**チャネル基本設定**］タブの［**チャネルアイコン**］で設定したアイコンと、［**チャネル名**］で設定したチャネル名が表示されます。ユーザーがフッターをタップすると、そのLINEミニアプリのトップページが表示されます。 |

:::note warn
LINEミニアプリのステータスが「反映済み」以外の場合のフッター

:::

### 各要素の最大文字数

詳細内容セクションの「detailed」と「simple」は、それぞれキーの値に推奨文字数および最大文字数（ソフトリミット、ハードリミット）があります。

| 項目 | 推奨文字数 | ソフトリミット | ハードリミット |
| --- | --- | --- | --- |
| **detailed** | 10 | 36 | 50 |
| **simple** | 32 | 100 | 150 |

それぞれのキーの値は、推奨文字数以下にすることを推奨します。推奨文字数を超えると、表示可能な領域から溢れた文字が省略記号（`...`）に置き換えられたり、サービスメッセージが送信できなくなったりします。

| 文字数 | どう表示されるか |
| --- | --- |
| 推奨文字数以下 | テキストはすべて表示される |
| 推奨文字数より大きく、ソフトリミット以下 | 表示可能な領域から溢れた文字が省略記号（`...`）に置き換えられる場合がある |
| ソフトリミットより大きく、ハードリミット以下 | 表示可能な領域から溢れた文字が省略記号（`...`）に置き換えられる |
| ハードリミットより大きい | エラーとなり、サービスメッセージが送信できない |

キーの値の文字数はUTF-16の符号単位ではなく、[書記素クラスタ](https://unicode.org/reports/tr29/)単位でカウントします。テキストの文字数のカウントについて詳しくは、『Messaging APIドキュメント』の「[テキストの文字数のカウント](https://developers.line.biz/ja/docs/messaging-api/text-character-count/)」を参照してください。

## 最初のサービスメッセージを送信する

ユーザーが操作を行ったり何かを要求したりした後で、LINEミニアプリから初めてサービスメッセージを送信する場合の手順を説明します。

:::note warn
ステートレスチャネルアクセストークンの使用を推奨します

:::

以下はチャネルアクセストークンと[liff.getAccessToken()](https://developers.line.biz/ja/reference/liff/#get-access-token)で取得するアクセストークン（以降、LIFFのアクセストークン）を使って、サービス通知トークンを発行し、サービスメッセージを送信するまでのイメージ図です。このイメージ図では、チャネルアクセストークンに[ステートレスチャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/#stateless-channel-access-token)を使用しています。

![relationship of tokens](https://developers.line.biz/media/line-mini-app/mini-illust-01-ja.png)

1.  通知するときに、LINEミニアプリで[liff.getAccessToken()](https://developers.line.biz/ja/reference/liff/#get-access-token)を実行して、LIFFのアクセストークンを取得します。
2.  手順1で取得したLIFFのアクセストークンを、サーバーに送信します。
3.  [チャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/)を取得します。
4.  [サービス通知トークンを発行](https://developers.line.biz/ja/reference/line-mini-app/#issue-notification-token)します。  
    手順3で取得したチャネルアクセストークンと、手順1で取得したLIFFのアクセストークンを利用します。なお、ユーザーがLINEミニアプリを閉じると、有効期間内であってもLIFFのアクセストークンは無効化されます。
    
    java
    
    `final OkHttpClient notifierApiClient = new OkHttpClient().newBuilder().build(); final MediaType mediaType = MediaType.parse("application/json"); final RequestBody notificationTokenRequestBody = RequestBody.create(mediaType, "{'liffAccessToken': 'eyJhbGciOiJIUzI1NiJ9…​'"); final Request notificationTokenRequest = new Request.Builder()   .url(BASE_URL + "/notifier/token")  .method("POST", notificationTokenRequestBody)  .addHeader("Content-Type", "application/json")  .addHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9...")  .build(); final NotificationTokenResponse response = notifierApiClient.newCall(request).execute(); String notificationToken = notificationTokenResponse.getNotificationToken(); int tokenRemainingCount = notificationTokenResponse.getRemainingCount();`
    
5.  最初の[サービスメッセージを送信します](https://developers.line.biz/ja/reference/line-mini-app/#send-service-message)。  
    手順4で取得したサービス通知トークンを利用します。サービスメッセージの送信後は、[レスポンスに含まれるサービス通知トークンを保存](#save-service-notification-token)してください。  
    なお、使用するテンプレートにテンプレート変数がある場合は、`params`にキーと値のペアを指定してください。必須要素のテンプレート変数を指定しないと、エラーが返されます。  
    `params`の例：
    
    json
    
    `{   ...  "params": {    // params sample to be updated    "variable-name": "value",    "button_uri_1": "detailView?userId=1234&purchaseID=5678"  }  ... }`
    
    java
    
    `final RequestBody notificationRequestBody = RequestBody.create(mediaType,"{   'templateName': 'reservation_confirmation_en',  'notificationToken': '34c11a03-b726-49e3-8ce0-949387a9…​',  'params': {    'template-field-name': 'field-value',    'template-field-name': 'field-value',  }}"); final Request notificationRequest = new Request.Builder()   .url(BASE_URL + "/notifier/send?target=service")  .method("POST", notificationRequestBody)  .addHeader("Content-Type", "application/json")  .addHeader("Authorization", "Bearer W1TeHCgfH2Liwa...")  .build(); final NotificationResponse notificationResponse = notifierApiClient.newCall(request).execute(); notificationToken = notificationResponse.getNotificationToken(); tokenRemainingCount = notificationResponse.getRemainingCount();`
    

サービス通知トークンは、発行から1年間（31,536,000秒間）有効です。たとえば有効期間内であれば、ユーザーの「予約」という1つの操作に対して、LINEミニアプリから最大5回のサービスメッセージを送信できます。2回目以降のサービスメッセージ送信について詳しくは、「[後続のサービスメッセージを送信する](#sending-subsequent-service-messages)」を参照してください。

![AOA flow 2](https://developers.line.biz/media/line-mini-app/mini-illust-03-ja.png)

## 後続のサービスメッセージを送信する

同じ操作に対する後続のサービスメッセージを送信するときは、前回[サービスメッセージを送信](https://developers.line.biz/ja/reference/line-mini-app/#send-service-message)したときにレスポンスに含まれていたサービス通知トークンを使用します。後続のサービスメッセージを送信するときも、[レスポンスに含まれるサービス通知トークンを保存](#save-service-notification-token)してください。

後続のサービスメッセージを送信するために、最初のサービスメッセージを送信する際に使ったチャネルアクセストークンとLIFFのアクセストークンを再利用して、新たにサービス通知トークンを発行してはいけません。

java

`... JsonObject subsequentMessage = Json.createObjectBuilder()   .add("notificationToken", notificationToken)  .add("templateName", templateName)  .add("params", templateData)  .build(); ... if (tokenRemainingCount < 0) {   notificationRequestBody = RequestBody.create(mediaType, subsequentMessage.toString());  notificationRequest = new Request.Builder()        .url(BASE_URL + "/notifier/send?target=service")        .method("POST", notificationRequestBody)        .addHeader("Content-Type", mediaType.toString())        .addHeader("Authorization", "Bearer W1TeHCgfH2Liwa...")        .build();  notificationResponse =        notifierApiClient.newCall(notificationRequest).execute();  notificationToken = notificationResponse.getNotificationToken();  tokenRemainingCount = notificationResponse.getRemainingCount(); }`

## レスポンスに含まれるサービス通知トークンを保存する

サービスメッセージの送信後、レスポンスに含まれる更新されたサービス通知トークン（`notificationToken`）を必ず保存してください。このサービス通知トークンは、同じ操作（アクション）に対して、後続のサービスメッセージを送信するときに使用します。

サービス通知トークンの有効期間内であれば、レスポンスに含まれる`remainingCount`の数だけ、同じ操作に対する後続のサービスメッセージを送信できます。それぞれの操作は、レスポンスに含まれるセッションID（`sessionId`）で区別できます。

html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sjcI2, html code.shiki .sjcI2{--shiki-default:#FFA198;--shiki-default-font-style:italic}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}