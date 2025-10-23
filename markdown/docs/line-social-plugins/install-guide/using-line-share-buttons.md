---
url: https://developers.line.biz/ja/docs/line-social-plugins/install-guide/using-line-share-buttons/
copied_at: 2025-10-23T15:57:59.230Z
---
# 「LINEで送る」ボタンを設置する

## 概要

LINE Social Pluginsの「LINEで送る」ボタンは、簡単に作成してウェブサイトに設置できます。iOSまたはAndroidのネイティブアプリにこのボタンを設置する場合は、「送信先を選択」画面の利用をおすすめします。この画面の設置方法については、「[LINE URLスキームでLINEの機能を使う](https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/)」を参照してください。

「LINEで送る」ボタンの作成方法には、LINEヤフー株式会社が提供する公式デザインを使用する方法と、ご自身のオリジナルのデザインを使用する方法の2種類があります。

## LINE公式アイコンを使用

LINE公式デザインの「LINEで送る」ボタンは、以下の手順で作成します。言語を選択し、ボタンを設置するウェブサイトのURLを入力して、ボタンタイプを選択するだけで作成できます。

## カスタムアイコンを使用

カスタムアイコンでボタンを作成します。LINE Social Pluginsの利用ガイドラインに同意すると、リンクを確認できます。リンクをコピーして、ご自身のオリジナルのデザインの「LINEで送る」ボタンに適用してください。

LINE Social Plugins[ガイドライン](https://developers.line.biz/ja/docs/line-social-plugins/general/guidelines/)に同意します

:::note info
ヒント

:::

WebサイトでDOMツリーが構築されてコンテンツが作成されたら、`LineIt.loadButton()`を呼び出してLINEで送るボタンを有効にしてください。

sh

`<script type="text/javascript">LineIt.loadButton();</script>`

   
 

オリジナルのボタンを使用する場合は、以下の手順でシェア数（「LINEで送る」ボタンが使用された回数）を確認できます。

#### HTTPリクエスト

`GET https://api.line.me/social-plugin/metrics?url=https://line.me/en`

#### リクエストパラメーター

url

String

必須

シェア数の確認に必要なURL  
（例：`https://line.me/en`）

#### リクエスト例

sh

`curl -X GET 'https://api.line.me/social-plugin/metrics?url=https://line.me/en'`

#### レスポンス例

json

`{     "share": "4173", }`

#### ステータスコード

200

OK

リクエスト成功

400

Bad request

不正なパラメーターまたは値が含まれる

500

Internal Server Error

内部サーバーエラー

## ヘルプ・お問い合わせ

*   [よくある質問](https://developers.line.biz/ja/faq/tags/sp-share/)

html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}