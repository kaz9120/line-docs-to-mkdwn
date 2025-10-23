---
url: https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages/
copied_at: 2025-10-23T16:01:08.091Z
---
# カスタムアクションボタンを実装する

LINEミニアプリでは、現在開いているページを友だちと共有できるアクションボタンが、（A）[ヘッダー](https://developers.line.biz/ja/docs/line-mini-app/discover/ui-components/#header)に用意されています。このアクションボタンはLINEによって実装されていてデフォルトで表示されますが、ボタンの動作やメッセージの内容は、カスタマイズできません。

一方、（B）ボディにカスタムアクションボタンを実装すると、メッセージの内容をカスタマイズしてLINEミニアプリをシェアできます。

![](https://developers.line.biz/media/line-mini-app/mini_concept.png)

## ガイドライン

カスタムアクションボタンを実装してカスタムシェアメッセージを送信する場合は、ユーザーがメッセージの内容を早くかつ正確に把握できるように、以下のガイドラインに従ってください。

:::note warn
注意

:::

:::note warn
LINEミニアプリのLIFF URLが変更されました

:::

### シェアターゲットピッカーの利用

ボディにカスタムアクションボタンを配置し、ボタンがタップされたときに、ターゲットピッカー（グループまたは友だちを選択する画面）を表示するように実装してください。ターゲットピッカーでユーザーが送信相手を選択すると、[Flex Message](https://developers.line.biz/ja/docs/messaging-api/using-flex-messages/)など、開発者が作成したメッセージを送信できます。

![target picker](https://developers.line.biz/media/liff/share-target-picker_tobe_ja.png)

シェアターゲットピッカーを利用する方法について詳しくは、「[ユーザーの友だちにメッセージを送信する（シェアターゲットピッカー）](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#share-target-picker)」を参照してください。

### カスタムシェアメッセージのフォーマット

カスタムシェアメッセージは、Flex Messageの[バブル](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#bubble)コンテナを使用して作成します。 Flex Messageの[カルーセル](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#carousel)コンテナは使用しないでください。

また、カスタムシェアメッセージには、[標準タイプ](#standard)と[画像リストタイプ](#image-list)があり、それぞれ以下のA～Fのセクションに分かれています。

![](https://developers.line.biz/media/line-mini-app/mini_design_flex_msg_common.png)

| ラベル | セクション | 必須 | 説明 |
| --- | --- | --- | --- |
| A | 画像 | 任意 | 全体をスクロールせずに表示できる大きさの画像を設定してください。 |
| B | タイトル | 必須 | メッセージの内容を要約してください。 |
| C | サブタイトル | ※ | メッセージの副題です。 |
| D | 詳細 | ※ | ラベルと説明を含めた項目を挿入してください。標準タイプと画像リストタイプで挿入できる項目の最大数が異なります。<ul><!--[--><li><!--[-->標準タイプ：最大10件<!--]--></li><li><!--[-->画像リストタイプ：最大5件<!--]--></li><!--]--></ul> |
| E | ボタン | 必須 | <ul><!--[--><li><!--[-->ボタンを3個まで挿入できます。<!--]--></li><li><!--[-->最低1つのボタンは、シェアする内容を詳しく説明するページ（詳細ページ）を表示するように設定してください。<!--]--></li><!--]--></ul> |
| F | フッター | 必須 | LINEミニアプリのアイコン、LINEミニアプリの名前、および画像（ ![>](https://vos.line-scdn.net/service-notifier/footer_go_btn.png)）を挿入してください。この画像は変更しないでください。この画像をタップしたときに、LINEミニアプリのトップページ（`https://miniapp.line.me/{your-liffId}`）を表示するようにURIアクションを指定してください。 |

※サブタイトル（C）または詳細（D）のいずれか一方を挿入する必要があります。両方を挿入することもできます。

#### 標準タイプのガイドライン

標準タイプのFlex Messageは、以下のガイドラインに従ってください。

JSONファイルの例は、「[ガイドラインに従ったJSONファイルの例](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages-standard/)」を参照してください。

:::note warn
注意

:::

![](https://developers.line.biz/media/line-mini-app/mini_design_flex_msg_standard.png)

##### 標準タイプ - 画像（A）

画像（A）は、ヒーローブロックに入れてください。

| ラベル | セクション | 要素 | 説明 |
| --- | --- | --- | --- |
| A | 画像 | [ヒーローブロック](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#block) > [画像](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#image) | <ul><!--[--><li><!--[--><code><!--[-->"url": "{画像のURL}"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"size": "full"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"aspectRatio": "{width}:{height}"<!--]--></code>BRLINEBREAKTAGただし、<code><!--[-->{height}<!--]--></code>には、<code><!--[-->{width} * 2<!--]--></code>以下の値を設定してください。<!--]--></li><li><!--[--><code><!--[-->"aspectMode": "cover"<!--]--></code><!--]--></li><!--]--></ul> |

json

`{     "type": "bubble",    "hero": { // ヒーローブロック        // 画像（A）        "type": "image",        "url": "https://example.com/hero-image.png",        "size": "full",        "aspectRatio": "20:13",        "aspectMode": "cover"    },    "body": {. . .} }`

##### 標準タイプ - ボディ

タイトル（B）、サブタイトル（C）、詳細（D）、ボタン（E）を入れるボディブロックは、以下のように指定してください。

| ラベル | セクション | 要素 | 説明 |
| --- | --- | --- | --- |
| \- | \- | [ボディブロック](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#block) > [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box) | <ul><!--[--><li><!--[--><code><!--[-->"layout": "vertical"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"spacing": "md"<!--]--></code><!--]--></li><!--]--></ul> |

json

`{     "type": "bubble",    "hero": { ... },    "body": { // ボディブロック        // ボックス        "type": "box",        "layout": "vertical",        "contents": [ ... ],        "spacing": "md"    } }`

##### 標準タイプ - タイトル（B）

| ラベル | セクション | 要素 | 説明 |
| --- | --- | --- | --- |
| B | タイトル | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box) | <ul><!--[--><li><!--[--><code><!--[-->"layout": "vertical"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"spacing": "none"<!--]--></code><!--]--></li><!--]--></ul> |
| B | タイトル | [テキスト](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#text) | <ul><!--[--><li><!--[--><code><!--[-->"text": "{タイトル}"<!--]--></code>BRLINEBREAKTAG最大行数：2行<!--]--></li><li><!--[--><code><!--[-->"size": "lg"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"color": "#000000"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"weight": "bold"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"wrap": true<!--]--></code><!--]--></li><!--]--></ul> |

json

`{     "type": "bubble",    "hero": { ... },    "body": {        "type": "box",        "layout": "vertical",        "contents": [            {   // タイトル（B） - ボックス                "type": "box",                "layout": "vertical",                "contents": [                    {   // テキスト                        "type": "text",                        "text": "Main title",                        "size": "lg",                        "color": "#000000",                        "weight": "bold",                        "wrap": true                    }                ],                "spacing": "none"            }        ],        "spacing": "md"    } }`

##### 標準タイプ - サブタイトル（C）

| ラベル | セクション | 要素 | 説明 |
| --- | --- | --- | --- |
| C | サブタイトル | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box) | <ul><!--[--><li><!--[--><code><!--[-->"layout": "vertical"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"spacing": "none"<!--]--></code><!--]--></li><!--]--></ul> |
| C | サブタイトル | [テキスト](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#text) | <ul><!--[--><li><!--[--><code><!--[-->"text": "{サブタイトル}"<!--]--></code>BRLINEBREAKTAG最大行数：2行<!--]--></li><li><!--[--><code><!--[-->"size": "sm"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"color": "#999999"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"wrap": true<!--]--></code><!--]--></li><!--]--></ul> |

json

`{     "type": "bubble",    "hero": { ... },    "body": {        "type": "box",        "layout": "vertical",        "contents": [            {   // タイトル（B） - ボックス                ...            },            {   // サブタイトル（C） - ボックス                "type": "box",                "layout": "vertical",                "contents": [                    {   // テキスト                        "type": "text",                        "text": "Sub-title",                        "size": "sm",                        "color": "#999999",                        "wrap": true                    }                ],                "spacing": "none"            }        ],        "spacing": "md"    } }`

##### 標準タイプ - 詳細（D）

| ラベル | セクション | 要素 | 説明 |
| --- | --- | --- | --- |
| D | 詳細 | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box) | <ul><!--[--><li><!--[--><code><!--[-->"layout": "vertical"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"spacing": "sm"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"margin": "lg"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"flex": 1<!--]--></code><!--]--></li><!--]--></ul> |
| D | 詳細 - アイテム | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box) | D-1～D-2を1組だけ入れるボックスです。<ul><!--[--><li><!--[--><code><!--[-->"layout": "horizontal"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"spacing": "sm"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"flex": 1<!--]--></code><!--]--></li><!--]--></ul> |
| D-1 | 詳細 - ラベル | [テキスト](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#text) | <ul><!--[--><li><!--[--><code><!--[-->"text": "{ラベル}"<!--]--></code>BRLINEBREAKTAG最大行数：1行<!--]--></li><li><!--[--><code><!--[-->"size": "sm"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"color": "#555555"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"wrap": false<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"flex": 20<!--]--></code><!--]--></li><!--]--></ul> |
| D-2 | 詳細 - 説明 | [テキスト](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#text) | <ul><!--[--><li><!--[--><code><!--[-->"text": "{説明}"<!--]--></code>BRLINEBREAKTAG最大行数：1行<!--]--></li><li><!--[--><code><!--[-->"size": "sm"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"color": "#111111"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"wrap": false<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"flex": 55<!--]--></code><!--]--></li><!--]--></ul> |

json

`{     "type": "bubble",    "hero": { ... },    "body": {        "type": "box",        "layout": "vertical",        "contents": [            {   // タイトル（B） - ボックス                ...            },            {   // サブタイトル（C） - ボックス                ...            },            {   // 詳細（D） - ボックス                "type": "box",                "layout": "vertical",                "contents": [                    {   // ラベル（D-1） - ボックス                        "type": "box",                        "layout": "horizontal",                        "contents": [                            {   // テキスト                                "type": "text",                                "text": "Label 1",                                "size": "sm",                                "color": "#555555",                                "wrap": false,                                "flex": 20                            },                            {   // 説明                                "type": "text",                                "text": "Description 1",                                "size": "sm",                                "color": "#111111",                                "wrap": false,                                "flex": 55                            }                        ],                        "flex": 1,                        "spacing": "sm"                    },                    {   // 説明（D-2） - ボックス                        "type": "box",                        "layout": "horizontal",                        "contents": [                            {   // テキスト                                "type": "text",                                "text": "Label 2",                                "size": "sm",                                "color": "#555555",                                "wrap": false,                                "flex": 20                            },                            {   // テキスト                                "type": "text",                                "text": "Description 2",                                "size": "sm",                                "color": "#111111",                                "wrap": false,                                "flex": 55                            }                        ],                        "flex": 1,                        "spacing": "sm"                    }                ],                "spacing": "sm",                "margin": "lg",                "flex": 1            }        ],        "spacing": "md"    } }`

##### 標準タイプ - ボタン (E)

| ラベル | セクション | 要素 | 説明 |
| --- | --- | --- | --- |
| E | ボタン | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box) | E-1～E-2を入れるボックスです。<ul><!--[--><li><!--[--><code><!--[-->"layout": "vertical"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"spacing": "xs"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"margin": "lg"<!--]--></code><!--]--></li><!--]--></ul> |
| E-1 | ボタン<br/>（linkスタイルのみを使用する場合） | [ボタン](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#button) | <ul><!--[--><li><!--[--><code><!--[-->"style": "link"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"height": "sm"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"color": "{文字の色}"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"action" : { ... }<!--]--></code>BRLINEBREAKTAGこのボタンをタップしたときに、LINEミニアプリのページを表示するようにURIアクションを指定してください。LINEミニアプリのトップページ以外のページを表示する場合は、<a href="/ja/docs/line-mini-app/develop/permanent-links/" class=""><!--[--><!--[-->パーマネントリンク<!--]--><!--]--></a>を指定してください。<!--]--></li><!--]--></ul> |
| E-2 | ボタン<br/>（primaryスタイルを使用する場合) | [ボタン](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#button) | <ul><!--[--><li><!--[-->一番上のボタンに<code><!--[-->"style": "primary"<!--]--></code>、それ以外のボタンに<code><!--[-->"style": "link"<!--]--></code>を指定してください。<code><!--[-->"secondary"<!--]--></code>は使用できません。<!--]--></li><li><!--[--><code><!--[-->"height": "md"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"color": "{文字の色または背景色}"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"action" : { ... }<!--]--></code>BRLINEBREAKTAGこのボタンをタップしたときに、LINEミニアプリのページを表示するようにURIアクションを指定してください。LINEミニアプリのトップページ以外のページを表示する場合は、<a href="/ja/docs/line-mini-app/develop/permanent-links/" class=""><!--[--><!--[-->パーマネントリンク<!--]--><!--]--></a>を指定してください。<!--]--></li><!--]--></ul> |

primaryスタイルを使用する場合：

json

`{     "type": "bubble",    "hero": { ... }    },    "body": {        "type": "box",        "layout": "vertical",        "contents": [            {   // タイトル（B） - ボックス                ...            },            {   // サブタイトル（C） - ボックス                ...            },            {   // 詳細（D） - ボックス                ...            },            {   // ボタン（E） - ボックス                "type": "box",                "layout": "vertical",                "contents": [                    {   // ボタン（primary）                        "type": "button",                        "action": {                            "type": "uri",                            "label": "View details",                            "uri": "https://miniapp.line.me/123456-abcedfg"                        },                        "style": "primary",                        "height": "md",                        "color": "#17c950"                    },                    {   // ボタン（link）                        "type": "button",                        "action": {                            "type": "uri",                            "label": "Share",                            "uri": "https://miniapp.line.me/123456-abcedfg/share"                        },                        "style": "link",                        "height": "md",                        "color": "#469fd6"                    }                ],                "spacing": "xs",                "margin": "lg"            }        ],        "spacing": "md"    } }`

##### 標準タイプ - フッター（F）

フッター（F）は、フッターブロックに入れてください。

| ラベル | セクション | 要素 | 説明 |
| --- | --- | --- | --- |
| \- | \- | [フッターブロック](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#block) > [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box) | <ul><!--[--><li><!--[--><code><!--[-->"layout": "vertical"<!--]--></code><!--]--></li><!--]--></ul> |
| \- | \- | [セパレータ](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#separator) | <ul><!--[--><li><!--[--><code><!--[-->"color": "#f0f0f0"<!--]--></code><!--]--></li><!--]--></ul> |
| F | フッター | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box) | F-1～F-3を入れるボックスです。<ul><!--[--><li><!--[--><code><!--[-->"layout": "horizontal"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"flex": 1<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"spacing": "md"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"margin": "md"<!--]--></code><!--]--></li><!--]--></ul> |
| F-1 | LINEミニアプリのアイコン | [画像](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#image) | <ul><!--[--><li><!--[--><code><!--[-->"url": "{画像のURL}"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"flex": 1<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"gravity": "center"<!--]--></code><!--]--></li><!--]--></ul> |
| F-2 | LINEミニアプリの名前 | [テキスト](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#text) | <ul><!--[--><li><!--[--><code><!--[-->"text": "{LINEミニアプリの名前}"<!--]--></code>BRLINEBREAKTAG最大行数：1行<!--]--></li><li><!--[--><code><!--[-->"flex": 19<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"size": "xs"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"color": "#999999"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"weight": "bold"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"gravity": "center"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"wrap": false<!--]--></code><!--]--></li><!--]--></ul> |
| F-3 | ![>](https://vos.line-scdn.net/service-notifier/footer_go_btn.png) | [画像](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#image) | <ul><!--[--><li><!--[--><code><!--[-->"url": "https://vos.line-scdn.net/service-notifier/footer_go_btn.png"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"flex": 1<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"gravity": "center"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"size": "xxs"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"action" : { ... }<!--]--></code>BRLINEBREAKTAGこの画像をタップしたときに、LINEミニアプリのトップページ（<code><!--[-->https://miniapp.line.me/{your-liffId}<!--]--></code>）を表示するようにURIアクションを指定してください。<!--]--></li><!--]--></ul> |

json

`{     "type": "bubble",    "hero": { ... },    "body": { ... },    "footer": { // フッターブロック        // ボックス        "type": "box",        "layout": "vertical",        "contents": [            {   // セパレータ                "type": "separator",                "color": "#f0f0f0"            },            {   // フッター（F） - ボックス                "type": "box",                "layout": "horizontal",                "contents": [                    {   // LINEミニアプリのアイコン（F-1）                        "type": "image",                        "url": "https://example.com/line-mini-app-icon.png",                        "flex": 1,                        "gravity": "center"                    },                    {   // LINEミニアプリの名前（F-2）                        "type": "text",                        "text": "Service name",                        "flex": 19,                        "size": "xs",                        "color": "#999999",                        "weight": "bold",                        "gravity": "center",                        "wrap": false                    },                    {   // >（F-3）                        "type": "image",                        "url": "https://vos.line-scdn.net/service-notifier/footer_go_btn.png",                        "flex": 1,                        "gravity": "center",                        "size": "xxs",                        "action": {                            "type": "uri",                            "label": "action",                            "uri": "https://miniapp.line.me/123456-abcedfg"                        }                    }                ],                "flex": 1,                "spacing": "md",                "margin": "md"            }        ]    } }`

#### 画像リストタイプのガイドライン

画像リストタイプのFlex Messageは、以下のガイドラインに従ってください。

JSONファイルの例は、「[ガイドラインに従ったJSONファイルの例](https://developers.line.biz/ja/docs/line-mini-app/develop/share-messages-standard/)」を参照してください。

:::note warn
注意

:::

![](https://developers.line.biz/media/line-mini-app/mini_design_flex_msg_list.png)

##### 画像リストタイプ - 画像（A）

画像（A）は、ヒーローブロックに入れてください。

| ラベル | セクション | 要素 | 説明 |
| --- | --- | --- | --- |
| A | 画像 | [ヒーローブロック](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#block) > [画像](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#image) | <ul><!--[--><li><!--[--><code><!--[-->"url": "{画像のURL}"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"size": "full"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"aspectRatio": "{width}:{height}"<!--]--></code>BRLINEBREAKTAGただし、<code><!--[-->{height}<!--]--></code>には、<code><!--[-->{width} * 2<!--]--></code>以下の値を設定してください。<!--]--></li><li><!--[--><code><!--[-->"aspectMode": "cover"<!--]--></code><!--]--></li><!--]--></ul> |

json

`{     "type": "bubble",    "hero": { // ヒーローブロック        // 画像（A）        "type": "image",        "url": "https://example.com/hero-image.png",        "size": "full",        "aspectRatio": "20:13",        "aspectMode": "cover"    },    "body": {. . .} }`

##### 画像リストタイプ - ボディ

タイトル（B）、サブタイトル（C）、詳細（D）、ボタン（E）を入れるボディブロックは以下のように指定してください。

| ラベル | セクション | 要素 | 説明 |
| --- | --- | --- | --- |
| \- | \- | [ボディブロック](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#block) > [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box) | <ul><!--[--><li><!--[--><code><!--[-->"layout": "vertical"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"spacing": "md"<!--]--></code><!--]--></li><!--]--></ul> |

json

`{     "type": "bubble",    "hero": { ... },    "body": { // ボディブロック        // ボックス        "type": "box",        "layout": "vertical",        "contents": [ ... ],        "spacing": "md"    } }`

##### 画像リストタイプ - タイトル（B）

| ラベル | セクション | 要素 | 説明 |
| --- | --- | --- | --- |
| B | タイトル | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box) | <ul><!--[--><li><!--[--><code><!--[-->"layout": "vertical"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"spacing": "none"<!--]--></code><!--]--></li><!--]--></ul> |
| B | タイトル | [テキスト](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#text) | <ul><!--[--><li><!--[--><code><!--[-->"text": "{タイトル}"<!--]--></code>BRLINEBREAKTAG最大行数：2行<!--]--></li><li><!--[--><code><!--[-->"size": "lg"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"color": "#000000"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"weight": "bold"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"wrap": true<!--]--></code><!--]--></li><!--]--></ul> |

json

`{     "type": "bubble",    "hero": { ... },    "body": {        "type": "box",        "layout": "vertical",        "contents": [            {   // タイトル（B） - ボックス                "type": "box",                "layout": "vertical",                "contents": [                    {   // テキスト                        "type": "text",                        "text": "Main title",                        "size": "lg",                        "color": "#000000",                        "weight": "bold",                        "wrap": true                    }                ],                "spacing": "none"            }        ],        "spacing": "md"    } }`

##### 画像リストタイプ - サブタイトル（C）

| ラベル | セクション | 要素 | 説明 |
| --- | --- | --- | --- |
| C | サブタイトル | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box) | <ul><!--[--><li><!--[--><code><!--[-->"layout": "vertical"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"spacing": "none"<!--]--></code><!--]--></li><!--]--></ul> |
| C | サブタイトル | [テキスト](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#text) | <ul><!--[--><li><!--[--><code><!--[-->"text": "{サブタイトル}"<!--]--></code>BRLINEBREAKTAG最大行数：2行<!--]--></li><li><!--[--><code><!--[-->"size": "sm"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"color": "#999999"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"wrap": true<!--]--></code><!--]--></li><!--]--></ul> |

json

`{     "type": "bubble",    "hero": { ... },    "body": {        "type": "box",        "layout": "vertical",        "contents": [            {   // タイトル（B） - ボックス                ...            },            {   // サブタイトル（C） - ボックス                "type": "box",                "layout": "vertical",                "contents": [                    {   // テキスト                        "type": "text",                        "text": "Sub-title",                        "size": "sm",                        "color": "#999999",                        "wrap": true                    }                ],                "spacing": "none"            }        ],        "spacing": "md"    } }`

##### 画像リストタイプ - 詳細（D）

| ラベル | セクション | 要素 | 説明 |
| --- | --- | --- | --- |
| D | 詳細 | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box) | <ul><!--[--><li><!--[--><code><!--[-->"layout": "vertical"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"spacing": "xl"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"margin": "lg"<!--]--></code><!--]--></li><!--]--></ul> |
| \- | 詳細 - アイテム | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box) | D-1～D-4を1組だけ入れるボックスです。<ul><!--[--><li><!--[--><code><!--[-->"layout": "horizontal"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"flex": 1<!--]--></code><!--]--></li><!--]--></ul> |
| D-1 | 詳細 - 画像 | [画像](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#image) | <ul><!--[--><li><!--[--><code><!--[-->"url": "{画像のURL}"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"flex": 3<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"size": "sm"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"aspectRatio": "1:1"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"aspectMode": "cover"<!--]--></code><!--]--></li><!--]--></ul> |
| \- | 詳細 - テキストエリア | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box) | D-2～D-4を入れるボックスです。<ul><!--[--><li><!--[--><code><!--[-->"layout": "vertical"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"flex": 8<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"spacing": "xs"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"margin": "md"<!--]--></code><!--]--></li><!--]--></ul> |
| D-2 | 詳細 - 標準テキスト | [テキスト](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#text) | <ul><!--[--><li><!--[--><code><!--[-->"text": "{標準テキスト}"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"size": "md"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"color": "#111111"<!--]--></code><!--]--></li><!--]--></ul> |
| D-3 | 詳細 - 強調テキスト | [テキスト](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#text) | <ul><!--[--><li><!--[--><code><!--[-->"text": "{強調テキスト}"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"size": "md"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"color": "#111111"<!--]--></code><!--]--></li><!--]--></ul> |
| D-4 | 詳細 - 画像＋テキスト | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box) | D-4の画像とテキストを入れるボックス：<ul><!--[--><li><!--[--><code><!--[-->"layout": "horizontal"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"flex": 1<!--]--></code><!--]--></li><!--]--></ul>D-4の[画像](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#image)：<ul><!--[--><li><!--[--><code><!--[-->"flex": 8<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"url": "{画像のURL}"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"gravity": "center"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"size": "xxs"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"aspectRatio": "1:1"<!--]--></code><!--]--></li><!--]--></ul>D-4の[テキスト](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#text)：<ul><!--[--><li><!--[--><code><!--[-->"flex": 85<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"margin": "xs"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"text": "{テキスト}"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"size": "sm"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"color": "{色}"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"gravity": "center"<!--]--></code><!--]--></li><!--]--></ul> |

json

`{     "type": "bubble",    "hero": { ... },    "body": {        "type": "box",        "layout": "vertical",        "contents": [            {   // タイトル（B） - ボックス                ...            },            {   // サブタイトル（C） - ボックス                ...            },            {   // 詳細（D） - ボックス                "type": "box",                "layout": "vertical",                "contents": [                    {   // アイテム                        "type": "box",                        "layout": "horizontal",                        "contents": [                            {   // 画像                                "type": "image",                                "url": "https://example.com/item-image01.png",                                "flex": 3,                                "size": "sm",                                "aspectRatio": "1:1",                                "aspectMode": "cover"                            },                            {   // テキストエリア                                "type": "box",                                "layout": "vertical",                                "contents": [                                    {   // 標準テキスト（D-2）                                        "type": "text",                                        "text": "General text",                                        "size": "md",                                        "color": "#111111"                                    },                                    {   // 強調テキスト（D-3）                                        "type": "text",                                        "text": "Text to emphasize",                                        "size": "md",                                        "color": "#111111"                                    },                                    {   // 画像＋テキスト（D-4）                                        "type": "box",                                        "layout": "horizontal",                                        "contents": [                                            {   // 画像                                                "type": "image",                                                "url": "https://example.com/item-image02.png",                                                "flex": 8,                                                "gravity": "center",                                                "size": "xxs",                                                "aspectRatio": "1:1"                                            },                                            {   // テキスト                                                "type": "text",                                                "text": "Image + text",                                                "flex": 85,                                                "gravity": "center",                                                "size": "sm",                                                "color": "#17c950",                                                "margin": "xs"                                            }                                        ],                                        "flex": 1                                    }                                ],                                "flex": 8,                                "spacing": "xs",                                "margin": "md"                            }                        ],                        "flex": 1                    }                ],                "spacing": "xl",                "margin": "lg"            }        ],        "spacing": "md"    } }`

##### 画像リストタイプ - ボタン (E)

| ラベル | セクション | 要素 | 説明 |
| --- | --- | --- | --- |
| E | ボタン | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box) | E-1～E-2を入れるボックスです。<ul><!--[--><li><!--[--><code><!--[-->"layout": "vertical"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"spacing": "xs"<!--]--></code><!--]--></li><!--]--></ul> |
| E-1 | ボタン<br/>（linkのみを使用する場合） | [ボタン](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#button) | <ul><!--[--><li><!--[--><code><!--[-->"style": "link"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"height": "sm"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"color": "{文字の色}"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"action" : { ... }<!--]--></code>BRLINEBREAKTAGこのボタンをタップしたときに、LINEミニアプリのページを表示するようにURIアクションを指定してください。LINEミニアプリのトップページ以外のページを表示する場合は、<a href="/ja/docs/line-mini-app/develop/permanent-links/" class=""><!--[--><!--[-->パーマネントリンク<!--]--><!--]--></a>を指定してください。<!--]--></li><!--]--></ul> |
| E-2 | ボタン<br/>（primaryを使用する場合) | [ボタン](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#button) | <ul><!--[--><li><!--[-->一番上のボタンに<code><!--[-->"style": "primary"<!--]--></code>、それ以外のボタンに<code><!--[-->"style": "link"<!--]--></code>を指定してください。<code><!--[-->"secondary"<!--]--></code>は使用できません。<!--]--></li><li><!--[--><code><!--[-->"height": "md"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"color": "{文字の色または背景色}"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"action" : { ... }<!--]--></code>BRLINEBREAKTAGこのボタンをタップしたときに、LINEミニアプリのページを表示するようにURIアクションを指定してください。LINEミニアプリのトップページ以外のページを表示する場合は、<a href="/ja/docs/line-mini-app/develop/permanent-links/" class=""><!--[--><!--[-->パーマネントリンク<!--]--><!--]--></a>を指定してください。<!--]--></li><!--]--></ul> |

primaryを使用する場合：

json

`{     "type": "bubble",    "hero": { ... }    },    "body": {        "type": "box",        "layout": "vertical",        "contents": [            {   // タイトル（B） - ボックス                ...            },            {   // サブタイトル（C） - ボックス                ...            },            {   // 詳細（D） - ボックス                ...            },            {   // ボタン（E） - ボックス                "type": "box",                "layout": "vertical",                "contents": [                    {   // ボタン（primary）                        "type": "button",                        "action": {                            "type": "uri",                            "label": "View details",                            "uri": "https://miniapp.line.me/123456-abcedfg"                        },                        "style": "primary",                        "height": "md",                        "color": "#17c950"                    },                    {   // ボタン（link）                        "type": "button",                        "action": {                            "type": "uri",                            "label": "Share",                            "uri": "https://miniapp.line.me/123456-abcedfg/share"                        },                        "style": "link",                        "height": "md",                        "color": "#469fd6"                    }                ],                "spacing": "xs"            }        ],        "spacing": "md"    } }`

##### 画像リストタイプ - フッター（F）

| ラベル | セクション | 要素 | 説明 |
| --- | --- | --- | --- |
| \- | \- | [フッターブロック](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#block) > [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box) | <ul><!--[--><li><!--[--><code><!--[-->"layout": "vertical"<!--]--></code><!--]--></li><!--]--></ul> |
| \- | \- | [セパレータ](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#separator) | <ul><!--[--><li><!--[--><code><!--[-->"color": "#f0f0f0"<!--]--></code><!--]--></li><!--]--></ul> |
| F | フッター | [ボックス](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#box) | F-1～F-3を入れるボックスです。<ul><!--[--><li><!--[--><code><!--[-->"layout": "horizontal"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"flex": 1<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"spacing": "md"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"margin": "md"<!--]--></code><!--]--></li><!--]--></ul> |
| F-1 | LINEミニアプリのアイコン | [画像](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#image) | <ul><!--[--><li><!--[--><code><!--[-->"url": "{画像のURL}"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"flex": 1<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"gravity": "center"<!--]--></code><!--]--></li><!--]--></ul> |
| F-2 | LINEミニアプリの名前 | [テキスト](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#text) | <ul><!--[--><li><!--[--><code><!--[-->"text": "{LINEミニアプリの名前}"<!--]--></code>BRLINEBREAKTAG最大行数：1行<!--]--></li><li><!--[--><code><!--[-->"flex": 19<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"size": "xs"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"color": "#999999"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"weight": "bold"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"gravity": "center"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"wrap": false<!--]--></code><!--]--></li><!--]--></ul> |
| F-3 | ![>](https://vos.line-scdn.net/service-notifier/footer_go_btn.png) | [画像](https://developers.line.biz/ja/docs/messaging-api/flex-message-elements/#image) | <ul><!--[--><li><!--[--><code><!--[-->"url": "https://vos.line-scdn.net/service-notifier/footer_go_btn.png"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"flex": 1<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"gravity": "center"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"size": "xxs"<!--]--></code><!--]--></li><li><!--[--><code><!--[-->"action" : { ... }<!--]--></code>BRLINEBREAKTAGこの画像をタップしたときに、LINEミニアプリのトップページ（<code><!--[-->https://miniapp.line.me/{your-liffId}<!--]--></code>）を表示するようにURIアクションを指定してください。<!--]--></li><!--]--></ul> |

json

`{     "type": "bubble",    "hero": { ... },    "body": { ... },    "footer": { // フッターブロック        // ボックス        "type": "box",        "layout": "vertical",        "contents": [            {   // セパレータ                "type": "separator",                "color": "#f0f0f0"            },            {   // フッター（F） - ボックス                "type": "box",                "layout": "horizontal",                "contents": [                    {   // LINEミニアプリのアイコン（F-1）                        "type": "image",                        "url": "https://example.com/line-mini-app-icon.png",                        "flex": 1,                        "gravity": "center"                    },                    {   // LINEミニアプリの名前（F-2）                        "type": "text",                        "text": "Service name",                        "flex": 19,                        "size": "xs",                        "color": "#999999",                        "weight": "bold",                        "gravity": "center",                        "wrap": false                    },                    {   // >（F-3）                        "type": "image",                        "url": "https://vos.line-scdn.net/service-notifier/footer_go_btn.png",                        "flex": 1,                        "gravity": "center",                        "size": "xxs",                        "action": {                            "type": "uri",                            "label": "action",                            "uri": "https://miniapp.line.me/123456-abcedfg"                        }                    }                ],                "flex": 1,                "spacing": "md",                "margin": "md"            }        ]    } }`

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html pre.shiki code .sjcI2, html code.shiki .sjcI2{--shiki-default:#FFA198;--shiki-default-font-style:italic}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}