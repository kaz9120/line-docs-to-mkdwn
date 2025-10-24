---
url: https://developers.line.biz/ja/docs/messaging-api/using-flex-messages/
copied_at: 2025-10-24T06:28:19.125Z
---
# Flex Messageを送信する

Flex Messageは、通常のLINEメッセージに比べ、より豊かでインタラクティブなレイアウトが可能なメッセージです。通常のLINEメッセージでは、テキスト、画像、動画など1種類のソースしか配信されません。しかし、Flex Messageでは、[CSS Flexible Box（CSS Flexbox）](https://www.w3.org/TR/css-flexbox-1/)の仕様に基づいて、レイアウトを自由にカスタマイズできます。

Flex Messageの構成要素は、コンテナ、ブロック、コンポーネントです。各Flex Messageは、メッセージバブルを含むコンテナという単一の最上位構造を持ちます。コンテナには複数のメッセージバブルを含めることができます。バブルはブロックで構成され、ブロックはコンポーネントで構成されています。

Flex Messageでは、テキストの書字方向を左から右（左横書き）、または右から左（右横書き）に指定できます。

> [!WARNING]
> Flex Messageの制限事項
> 受信端末の環境によって、同じFlex Messageでも描画結果が異なる可能性があります。描画に影響を与える要素には、OS、LINEのバージョン、端末の解像度、言語設定、フォントなどがあります。

![Flex Messageのサンプル](https://developers.line.biz/media/messaging-api/using-flex-messages/bubbleSamples-Update1.png)

他のメッセージタイプと同様に、Flex MessageはJSON形式で記述します。Flex Messageについて詳しくは、以下のページを参照してください。

*   [Flex Messageの要素](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/)
*   [Flex Messageのレイアウト](https://developers.line.biz/ja/docs/messaging-api/flex-message-layout/)
*   [Flex Message](https://developers.line.biz/ja/reference/messaging-api/#flex-message)（Messaging APIリファレンス）

## 動作環境

Flex Messageは、すべてのバージョンのLINEでサポートされます。なお、以下の機能は、LINEの特定のバージョンのみサポートしています。

| 機能 | iOS版LINE<br/>Android版LINE | PC版LINE<br/>（macOS版、Windows版） |
| --- | :-: | :-: |
| <ul><!--[--><li><!--[--><a href="/ja/reference/messaging-api/#box" class=""><!--[--><!--[-->ボックス<!--]--><!--]--></a>の<code><!--[-->maxWidth<!--]--></code>プロパティ<!--]--></li><li><!--[--><a href="/ja/reference/messaging-api/#box" class=""><!--[--><!--[-->ボックス<!--]--><!--]--></a>の<code><!--[-->maxHeight<!--]--></code>プロパティ<!--]--></li><li><!--[--><a href="/ja/reference/messaging-api/#f-text" class=""><!--[--><!--[-->テキスト<!--]--><!--]--></a>の<code><!--[-->lineSpacing<!--]--></code>プロパティ<!--]--></li><li><!--[--><a href="/ja/reference/messaging-api/#f-video" class=""><!--[--><!--[-->動画<!--]--><!--]--></a> ※1<!--]--></li><!--]--></ul> | 11.22.0以上 | 7.7.0以上 |
| <ul><!--[--><li><!--[--><a href="/ja/reference/messaging-api/#bubble" class=""><!--[--><!--[-->バブル<!--]--><!--]--></a>の<code><!--[-->size<!--]--></code>プロパティの<code><!--[-->deca<!--]--></code>と<code><!--[-->hecto<!--]--></code> ※2<!--]--></li><li><!--[--><a href="/ja/reference/messaging-api/#button" class=""><!--[--><!--[-->ボタン<!--]--><!--]--></a>、<a href="/ja/reference/messaging-api/#f-text" class=""><!--[--><!--[-->テキスト<!--]--><!--]--></a>、および<a href="/ja/reference/messaging-api/#icon" class=""><!--[--><!--[-->アイコン<!--]--><!--]--></a>の<code><!--[-->scaling<!--]--></code>プロパティ<!--]--></li><!--]--></ul> | 13.6.0以上 | 7.17.0以上 |

※1 動画をサポートしていないLINEのバージョンにおいてもコンテンツを適切に表示するには、`altContent`プロパティを指定します。このプロパティで指定した画像が動画の代わりに表示されます。

※2 LINEのバージョンが`deca`と`hecto`をサポートするバージョンに満たない場合、バブルのサイズは`kilo`として表示されます。

## Flex Message Simulator

[Flex Message Simulator](https://developers.line.biz/flex-simulator/)を使うと、メッセージを実際に送信しなくても、描画された状態を確認できます。

![Flex Message Simulator](https://developers.line.biz/media/messaging-api/using-flex-messages/flex-message-simulator-ja.png)

Flex Message Simulatorについて詳しくは、[チュートリアル](https://developers.line.biz/ja/docs/messaging-api/using-flex-message-simulator/)を参照してください。

## 「Hello, World!」メッセージを送る

Flex Messageを始めるにあたり、「Hello, World！」をFlex Messageとして送信してみましょう。まず、[Flex MessageをJSONで定義](#preparing-json-data)し、[Messaging APIを呼び出し](#sending-messages-with-the-messaging-api)てメッセージを送信します。

![Hello, World!](https://developers.line.biz/media/messaging-api/using-flex-messages/helloWorld.png)

### JSONでFlex Messageを定義する

Messaging APIを呼び出してFlex Messageを送信する前に、Flex MessageをJSONで定義します。以下は、JSONでFlex Messageを定義する方法で、"Hello, World!"というメッセージを作ります。このFlex Messageにはメッセージバブルが1つあればよいので、[バブルコンテナ](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#bubble)を使用します。

json

`{   "type": "bubble", // 1  "body": {    // 2    "type": "box", // 3    "layout": "horizontal", // 4    "contents": [      // 5      {        "type": "text", // 6        "text": "Hello,"      },      {        "type": "text", // 6        "text": "World!"      }    ]  } }`

1～6の説明は以下のとおりです。

| dummy | dummy |
| --- | --- |
| 1 | 単体のメッセージバブルのコンテナを作成します。このように、コンテナの種類を`"bubble"`にします。 |
| 2 | バブルの内容を保持するバブルを指定します。メッセージの表示に必要なブロックは、[ボディ](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#block)1点です。 |
| 3 | ボディに、[ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box)を設定します。 |
| 4 | ボディの方向を水平に設定します。ボックス内の子コンポーネントが水平に配置されます。 |
| 5 | ボックス内に配置するコンポーネントを指定します。 |
| 6 | 「Hello,」と「World!」の2つのテキストを挿入します。 |

### Messaging APIで送信する

Flex Messsageは、「[メッセージを送信する](https://developers.line.biz/ja/docs/messaging-api/sending-messages/)」のいずれの方法でも送信できます。メッセージリクエストのリクエストボディで、`message.contents`プロパティに[Flex Message](https://developers.line.biz/ja/reference/messaging-api/#flex-message)オブジェクトの定義を設定します。

以下は、プッシュメッセージを送信するリクエストの例です。

sh

`curl -v -X POST https://api.line.me/v2/bot/message/push \ -H 'Content-Type: application/json' \ -H 'Authorization: Bearer {channel access token}' \ -d '{   "to": "U4af4980629...",  "messages": [    {      "type": "flex",      "altText": "This is a Flex Message",      "contents": {        "type": "bubble",        "body": {          "type": "box",          "layout": "horizontal",          "contents": [            {              "type": "text",              "text": "Hello,"            },            {              "type": "text",              "text": "World!"            }          ]        }      }    }  ] }'`

## 関連ページ

*   [Flex Messageの要素](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/)
*   [Flex Messageのレイアウト](https://developers.line.biz/ja/docs/messaging-api/flex-message-layout/)
*   [Flex Message](https://developers.line.biz/ja/reference/messaging-api/#flex-message)（APIリファレンス）
*   [Flex Message Simulator](https://developers.line.biz/flex-simulator/)

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}