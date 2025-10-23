---
url: https://developers.line.biz/ja/docs/messaging-api/using-quick-reply/
copied_at: 2025-10-23T15:56:17.817Z
---
# クイックリプライを使う

クイックリプライは、ユーザーが返信するためのボタンを、メッセージと一緒に表示するための機能です。ユーザーは、トーク画面の下部に表示される返信ボタンをタップするだけで、LINE公式アカウントに返信できます。クイックリプライ機能は、LINE公式アカウントがメンバーになっている1対1のトーク、グループトーク、複数人トークで利用できます。また、どのメッセージタイプでも、1つのメッセージにクイックリプライボタンを13個まで設定できます。

:::note warn
注意

:::

![クイックリプライのサンプル](https://developers.line.biz/media/messaging-api/using-quick-reply/quickReplySample.png)

## クイックリプライの構成要素

クイックリプライボタンは、[アクション](#action)、[アイコン](#icon)、[ラベル](#label)の要素から構成されます。詳しくは、『Messaging APIリファレンス』の「[クイックリプライ](https://developers.line.biz/ja/reference/messaging-api/#quick-reply)」を参照してください。

### アクション

クイックリプライボタンをタップすると実行されるアクションです。詳しくは、「[アクション](https://developers.line.biz/ja/docs/messaging-api/actions/)」を参照してください。

クイックリプライ機能専用のアクションとして、以下のアクションが用意されています。

*   [カメラアクション](https://developers.line.biz/ja/reference/messaging-api/#camera-action)
*   [カメラロールアクション](https://developers.line.biz/ja/reference/messaging-api/#camera-roll-action)
*   [位置情報アクション](https://developers.line.biz/ja/reference/messaging-api/#location-action)

他のメッセージタイプと共通の以下のアクションも、クイックリプライボタンに利用できます。

*   [ポストバックアクション](https://developers.line.biz/ja/reference/messaging-api/#postback-action)
*   [メッセージアクション](https://developers.line.biz/ja/reference/messaging-api/#message-action)
*   [URIアクション](https://developers.line.biz/ja/reference/messaging-api/#uri-action)
*   [日時選択アクション](https://developers.line.biz/ja/reference/messaging-api/#datetime-picker-action)
*   [クリップボードアクション](https://developers.line.biz/ja/reference/messaging-api/#clipboard-action)

:::note info
リッチメニュー切替アクションは利用できません

:::

### アイコン

クイックリプライボタンにはアイコンを表示できます。

任意のアイコン画像を設定しない場合は、以下のように表示されます。

*   カメラアクション、カメラロールアクション、位置情報アクション：デフォルトのアイコンが表示されます。
*   上記以外のアクション：アイコン表示が省略されます。

### ラベル

クイックリプライボタンに表示される文字列です。

## クイックリプライボタンを設定する

レストラン検索ボットを開発しているとします。このボットは、ユーザーが希望する料理の種類またはユーザーの現在地からお勧めのレストランを検索します。それではユーザーが返信するためのメッセージを作成してみましょう。

1.  ユーザーに要望を確認するテキストメッセージを作成します。
2.  `quickReply`プロパティに`items`オブジェクトを指定します。`items`オブジェクトに3つのクイックリプライボタンの配列を含めます。
3.  第1と第2のクイックリプライボタンには、料理の種類を表すアイコンとラベル、およびメッセージアクションを設定します。ユーザーがどちらかのボタンをタップすると、料理の種類がユーザーのメッセージとして返信されます。
4.  第3のクイックリプライボタンには、位置情報の送信を促すラベルと位置情報アクションを設定します。デフォルトのアイコンを使用するため、`imageUrl`プロパティは指定しません。

以下はクイックリプライボタンが設定されたメッセージの例です。番号がついている行は、上記リストの手順の番号を示しています。

sh

`{   "type": "text", // 1  "text": "Select your favorite food category or send me your location!",  "quickReply": { // 2    "items": [      {        "type": "action", // 3        "imageUrl": "https://example.com/sushi.png",        "action": {          "type": "message",          "label": "Sushi",          "text": "Sushi"        }      },      {        "type": "action",        "imageUrl": "https://example.com/tempura.png",        "action": {          "type": "message",          "label": "Tempura",          "text": "Tempura"        }      },      {        "type": "action", // 4        "action": {          "type": "location",          "label": "Send location"        }      }    ]  } }`

上記で指定したメッセージは、トーク上で次のようなクイックリプライボタンとして表示されます。

![クイックリプライのサンプル2](https://developers.line.biz/media/messaging-api/using-quick-reply/quickReplySample2.png)

## クイックリプライボタンが非表示になるタイミング

クイックリプライボタンは、次の場合に非表示になります。

*   ユーザーがいずれかのクイックリプライボタンをタップした場合。（ただし、カメラアクション、カメラロールアクション、日時選択アクション、位置情報アクションを除く。これらのアクションが設定されているボタンの場合は、期待される情報をユーザーが送信するまで、ボタンは表示されたままになります。）
*   トークルーム内で、LINE公式アカウント、ユーザー、または他のユーザーが新しいメッセージを送信した場合。（新しいメッセージを削除すると、クイックリプライボタンは再表示されます。）

なお、クイックリプライボタンをタップした後に、選択した結果がトークに自動的に投稿されないタイプのアクションがあります。ユーザーが選択した内容を後から確認できるように、できるだけトークルームにメッセージとして残るように実装してください。

## 関連ページ

*   [メッセージタイプ](https://developers.line.biz/ja/docs/messaging-api/message-types/)
*   [アクション](https://developers.line.biz/ja/docs/messaging-api/actions/)
*   『Messaging APIリファレンス』の「[メッセージオブジェクト](https://developers.line.biz/ja/reference/messaging-api/#message-objects)」セクション

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}