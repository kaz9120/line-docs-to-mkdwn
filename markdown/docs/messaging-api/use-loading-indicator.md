---
url: https://developers.line.biz/ja/docs/messaging-api/use-loading-indicator/
copied_at: 2025-10-24T10:15:15.876Z
---
# ローディングのアニメーションを表示する

LINE公式アカウントがユーザーからのメッセージを受信したあと、メッセージの準備や予約の処理などで返答に少し時間がかかることがあります。そのような場合に、ユーザーにそのまま待機しておいて欲しいことをローディングのアニメーションで視覚的に伝えることができます。

![](https://developers.line.biz/media/messaging-api/loading-indicator/loading-indicator.png)

## ローディングのアニメーションを表示する

[ローディングのアニメーションを表示する](https://developers.line.biz/ja/reference/messaging-api/#display-a-loading-indicator)エンドポイントを使用すると、トークの画面にローディングのアニメーションを表示できます。アニメーションは指定した秒数（5秒〜60秒）が経過するか、表示中にLINE公式アカウントからメッセージが届くと自動的に消えます。

![](https://developers.line.biz/media/messaging-api/loading-indicator/loading-animation.gif)

表示先としてユーザーIDを指定することで、ユーザーとLINE公式アカウントの1対1のトークにアニメーションを表示できます。グループトークまたは複数人トークは指定できません。

ローディングのアニメーションは、ユーザーが対象のLINE公式アカウントとのトーク画面を表示しているときのみ表示されます。ユーザーがトーク画面を表示していないときに、ローディングのアニメーションを表示するリクエストを行っても、通知は行われません。また、その後にユーザーがトーク画面を開いてもアニメーションは表示されません。

ローディングのアニメーションが表示されている間に再び表示のリクエストを行うと、アニメーションはそのまま表示され続け、表示が消えるまでの時間は2回目のリクエストで指定した秒数に上書きされます。

### リクエストの例

以下は、ローディングのアニメーションを5秒間表示するリクエストの例です。

```sh
curl -v -X POST https://api.line.me/v2/bot/chat/loading/start \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer {channel access token}' \
-d '{
    "chatId": "U4af4980629...",
    "loadingSeconds": 5
}'
```

詳しくは、『Messaging APIリファレンス』の「[ローディングのアニメーションを表示する](https://developers.line.biz/ja/reference/messaging-api/#display-a-loading-indicator)」を参照してください。

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}