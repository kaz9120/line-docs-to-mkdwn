---
url: https://developers.line.biz/ja/docs/messaging-api/using-rich-menus/
copied_at: 2025-10-23T15:57:02.669Z
---
# リッチメニューを使う

このページでは、LINE公式アカウントを友だち追加しているすべてのユーザーに表示される「デフォルトのリッチメニュー」を、Messaging APIを使って設定する方法について説明します。

:::note info
LINE Official Account Managerでも設定できます

:::

*   [デフォルトのリッチメニューを設定する](#set-default-rich-menu)
    *   [1\. リッチメニューの画像を準備する](#prepare-a-rich-menu-image)
    *   [2\. リッチメニューを作成する](#create-a-rich-menu)
    *   [3\. リッチメニューに画像をアップロードして添付する](#upload-the-rich-menu-image)
    *   [4\. デフォルトのリッチメニューを設定する](#set-the-default-rich-menu)
*   [ユーザー単位のリッチメニューについて](#about-per-user-rich-menu)

## デフォルトのリッチメニューを設定する

Messaging APIを使ってデフォルトのリッチメニューを設定するには、以下の手順に従います。

1.  [リッチメニューの画像を準備する](#prepare-a-rich-menu-image)。
2.  タップ領域を指定して[リッチメニューを作成する](#create-a-rich-menu)。
3.  [リッチメニューに画像をアップロードして添付する](#upload-the-rich-menu-image)。
4.  [デフォルトのリッチメニューを設定する](#set-the-default-rich-menu)。

### 1\. リッチメニューの画像を準備する

まず、リッチメニューの画像を準備します。リッチメニューの画像は、タップ領域をどのように配置するかを考慮する必要があります。

ここでは、以下のリッチメニュー用のテンプレート画像（`richmenu-template-guide-04.png`）を使用します。任意のディレクトリに保存してください。

![このガイドで使用するリッチメニュー用のテンプレート画像](https://developers.line.biz/media/messaging-api/rich-menu/richmenu-template-guide-04.png)

この画像の場合、A、B、Cの3つのタップ領域を定義することが想定されています。

:::note info
リッチメニュー用のテンプレート画像について

:::

画像の要件について詳しくは、『Messaging APIリファレンス』の「[リッチメニューの画像の要件](https://developers.line.biz/ja/reference/messaging-api/#upload-rich-menu-image-requirements)」を参照してください。

### 2\. リッチメニューを作成する

手順1.で用意したリッチメニューの画像に合うリッチメニューを作成します。画像のA、B、Cにタップ領域が正しく設定されるようにします。

リッチメニューを作成するには、[リッチメニューオブジェクト](https://developers.line.biz/ja/reference/messaging-api/#rich-menu-object)を[リッチメニューを作成する](https://developers.line.biz/ja/reference/messaging-api/#create-rich-menu)エンドポイントのリクエストに指定します。以下のコマンドをターミナルで実行してください。A、B、Cのそれぞれのタップ領域で、異なるURLが開くように[URIアクション](https://developers.line.biz/ja/reference/messaging-api/#uri-action)を指定しています。

sh

`curl -v -X POST https://api.line.me/v2/bot/richmenu \ -H 'Authorization: Bearer {channel access token}' \ -H 'Content-Type: application/json' \ -d \ '{     "size": {        "width": 2500,        "height": 1686    },    "selected": false,    "name": "デフォルトのリッチメニューのテスト",    "chatBarText": "Tap to open",    "areas": [        {            "bounds": {                "x": 0,                "y": 0,                "width": 1666,                "height": 1686            },            "action": {                "type": "uri",                "label": "タップ領域A",                "uri": "https://developers.line.biz/ja/news/"            }        },        {            "bounds": {                "x": 1667,                "y": 0,                "width": 834,                "height": 843            },            "action": {                "type": "uri",                "label": "タップ領域B",                "uri": "https://lineapiusecase.com/"            }        },        {            "bounds": {                "x": 1667,                "y": 844,                "width": 834,                "height": 843            },            "action": {                "type": "uri",                "label": "タップ領域C",                "uri": "https://techblog.lycorp.co.jp/ja/"            }        }    ] }'`

:::note info
ヒント

:::

リッチメニューの作成に成功すると、リッチメニューのIDがレスポンスで返されます。リッチメニューのIDは、以降の手順で使用します。

json

`{   "richMenuId": "richmenu-88c05..." }`

### 3\. リッチメニューに画像をアップロードして添付する

手順2.で作成したリッチメニューに、手順1.で用意した[画像をアップロード](https://developers.line.biz/ja/reference/messaging-api/#upload-rich-menu-image)して添付します。ターミナル上で、以下の手順でコマンドを実行してください。

1.  手順1.で用意した画像があるディレクトリに移動する。
2.  以下のコマンドの`{richMenuId}`を手順2.で取得したリッチメニューのIDに置き換えて実行する。

sh

`curl -v -X POST https://api-data.line.me/v2/bot/richmenu/{richMenuId}/content \ -H "Authorization: Bearer {channel access token}" \ -H "Content-Type: image/png" \ -T richmenu-template-guide-04.png`

### 4\. デフォルトのリッチメニューを設定する

準備が完了したため、リッチメニューを表示するための設定を行います。ここでは、[デフォルトのリッチメニューを設定](https://developers.line.biz/ja/reference/messaging-api/#set-default-rich-menu)します。デフォルトのリッチメニューは、LINE公式アカウントを友だち追加し、ユーザー単位のリッチメニューがリンクされていないすべてのユーザーに表示されます。以下のコマンドをターミナルで実行してください。

sh

`curl -v -X POST https://api.line.me/v2/bot/user/all/richmenu/{richMenuId} \ -H "Authorization: Bearer {channel access token}"`

#### 4-1. リッチメニューの表示を確認する

設定したデフォルトのリッチメニューが表示されることを確認します。リッチメニューを設定したLINE公式アカウントのトーク画面を開きます。今回作成したリッチメニューは、閉じた状態で表示されるため［**Tap to open**］をタップして、リッチメニューを開きます。

![](https://developers.line.biz/media/messaging-api/rich-menu/default-rich-menu-example.png)

## ユーザー単位のリッチメニューについて

Messaging APIを使うと、ユーザーごとにリッチメニューをリンクできます。ユーザー単位のリッチメニューについて詳しくは、「[ユーザー単位のリッチメニューを使う](https://developers.line.biz/ja/docs/messaging-api/use-per-user-rich-menus/)」を参照してください。

html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}