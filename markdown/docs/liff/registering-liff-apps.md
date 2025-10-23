---
url: https://developers.line.biz/ja/docs/liff/registering-liff-apps/
copied_at: 2025-10-23T16:00:14.697Z
---
# LIFFアプリをチャネルに追加する

LIFFアプリは、[LINE Developersコンソール](https://developers.line.biz/console/)でLINEログインのチャネルに追加すると、LINEまたは外部ブラウザで起動できるようになります。

:::note info
LINEミニアプリとしての作成を推奨します

:::

## 始める前に

以下の作業が完了していることを確認します。

*   [チャネルを作成する](https://developers.line.biz/ja/docs/liff/getting-started/)
*   「[LIFFスターターアプリを試してみる](https://developers.line.biz/ja/docs/liff/trying-liff-app/)」または「[LIFFアプリを開発する](https://developers.line.biz/ja/docs/liff/developing-liff-apps/)」の手順に従って、任意のサーバーにLIFFアプリをデプロイする

## LIFFアプリをチャネルに追加する

1つのチャネルごとに最大30件のLIFFアプリを追加できます。

1.  [LINE Developersコンソール](https://developers.line.biz/console/)で、LIFFアプリを追加するLINEログインのチャネルを選択し、［**LIFF**］タブをクリックします。
2.  ［**追加**］をクリックします。
3.  以下の項目を設定します。設定は後からでも変更できます。  
    **基本情報**
    
    | 項目 | 説明 | ユーザーに表示される画面 |
    | --- | --- | --- |
    | LIFFアプリ名 | LIFFアプリの名前。LIFFアプリ名には、「LINE」またはそれに類する文字列、不適切な文字列は含められません。 | <ul><!--[--><li><!--[--><a href="/ja/docs/liff/opening-liff-app/#messages-liff-to-liff" class=""><!--[--><!--[-->別のLIFFアプリを開いた場合に表示されるメッセージ<!--]--><!--]--></a><!--]--></li><li><!--[--><a href="/ja/docs/liff/overview/#multi-tab-view" class=""><!--[--><!--[-->マルチタブビュー<!--]--><!--]--></a><!--]--></li><!--]--></ul> |
    | サイズ | LIFFアプリの画面サイズ。次のサイズから選択してください。<ul><!--[--><li><!--[--><code><!--[-->Compact<!--]--></code><!--]--></li><li><!--[--><code><!--[-->Tall<!--]--></code><!--]--></li><li><!--[--><code><!--[-->Full<!--]--></code><!--]--></li><!--]--></ul><br/>![](https://developers.line.biz/media/liff/overview/viewTypes.png) | \- |
    | エンドポイントURL | LIFFアプリを実装したウェブアプリのURL（例：`https://example.com`）。LIFF URLを利用してLIFFアプリを起動した際に、このURLが利用されます。<br/>URLスキームは**https**である必要があります。なお、URLフラグメント（#URL-fragment）は指定できません。 | [LIFFブラウザ](https://developers.line.biz/ja/docs/liff/overview/#liff-browser)のヘッダー（ドメイン名のみ） |
    | Scope \*1 | LIFF SDKの一部のメソッドを利用するために必要なスコープ。<ul><!--[--><li><!--[--><code><!--[-->openid<!--]--></code>：<a href="/ja/reference/liff/#get-id-token" class=""><!--[--><!--[--><code><!--[-->liff.getIDToken()<!--]--></code><!--]--><!--]--></a>および<a href="/ja/reference/liff/#get-decoded-id-token" class=""><!--[--><!--[--><code><!--[-->liff.getDecodedIDToken()<!--]--></code><!--]--><!--]--></a>を使用するためのスコープ。<!--]--></li><li><!--[--><code><!--[-->email<!--]--></code>：<a href="/ja/reference/liff/#get-id-token" class=""><!--[--><!--[--><code><!--[-->liff.getIDToken()<!--]--></code><!--]--><!--]--></a>および<a href="/ja/reference/liff/#get-decoded-id-token" class=""><!--[--><!--[--><code><!--[-->liff.getDecodedIDToken()<!--]--></code><!--]--><!--]--></a>で、メールアドレスを取得するためのスコープ *2<!--]--></li><li><!--[--><code><!--[-->profile<!--]--></code>：<a href="/ja/reference/liff/#get-profile" class=""><!--[--><!--[--><code><!--[-->liff.getProfile()<!--]--></code><!--]--><!--]--></a>および<a href="/ja/reference/liff/#get-friendship" class=""><!--[--><!--[--><code><!--[-->liff.getFriendship()<!--]--></code><!--]--><!--]--></a>を使用するためのスコープ。<!--]--></li><li><!--[--><code><!--[-->chat_message.write<!--]--></code>：<a href="/ja/reference/liff/#send-messages" class=""><!--[--><!--[--><code><!--[-->liff.sendMessages()<!--]--></code><!--]--><!--]--></a>を使用するためのスコープ。アカウントの種類によっては、このオプションが［すべて表示］の下に表示されることがあります。 *3<!--]--></li><!--]--></ul> | LIFFアプリ起動時の権限の同意画面 |
    | 友だち追加オプション \*4 | [友だち追加オプション](https://developers.line.biz/ja/docs/line-login/link-a-bot/)の設定。<ul><!--[--><li><!--[--><code><!--[-->On (normal)<!--]--></code>：LIFFアプリの権限の同意画面に、LINE公式アカウントを友だち追加するオプションを追加します。<!--]--></li><li><!--[--><code><!--[-->On (aggressive)<!--]--></code>：LIFFアプリの権限の同意画面の後に、LINE公式アカウントを友だち追加するかどうか確認する画面を表示します。<!--]--></li><li><!--[--><code><!--[-->Off<!--]--></code>：LINE公式アカウントを友だち追加するオプションを表示しません。<!--]--></li><!--]--></ul> | LIFFアプリ起動時の権限の同意画面 |
    
      
    **オプション**
    
    | 項目 | 説明 |
    | --- | --- |
    | Scan QR | このチャネルに追加したLIFFアプリで[`liff.scanCodeV2()`](https://developers.line.biz/ja/reference/liff/#scan-code-v2)を利用する場合は、オンにします。 |
    | モジュールモード | LIFFアプリをモジュールモードで使用する場合は、オンにします。［**モジュールモード**］をオンにすると、アクションボタンを非表示にできます。このオプションはLIFFアプリの画面サイズで［**Full**］を選択している場合のみ表示されます。 |
    
      
    \*1 法人ユーザー、かつ利用申請をすることで表示されるスコープについては、法人ユーザー向けオプションドキュメントの「[LINE Profile+](https://developers.line.biz/ja/docs/partner-docs/line-profile-plus/)」を参照してください。  
    \*2 LINEログインのチャネルで、OpenID Connectのメール取得権限を申請した場合のみ表示されます。  
    \*3 LIFF間遷移後のLIFFアプリで`chat_message.write`スコープが無効になる場合があります。詳しくは、「[LIFF間遷移後の「chat\_message.write」スコープについて](https://developers.line.biz/ja/docs/liff/opening-liff-app/#about-chat-message-write-scope)」を参照してください。  
    \*4 LINEログインのチャネルでのみ表示されます。
4.  ［**追加**］をクリックします。  
    LIFFアプリを追加すると、LIFF IDとLIFF URLが作成されます。
    
    | 項目 | 説明 |
    | --- | --- |
    | LIFF ID | LIFFアプリIDです。<br/>例：`1234567890-AbcdEfgh` |
    | LIFF URL | LIFFアプリにアクセスするためのURLです。ユーザーがLIFF URLにアクセスすると、LINEヤフー株式会社が提供するLIFFサーバーを経由して、開発者が提供するLIFFアプリのサーバー（エンドポイントURL）にリダイレクトされます。<br/>例：`https://liff.line.me/1234567890-AbcdEfgh` |
    

## LIFFタブにおけるLIFFアプリの並び順

LINEログインチャネルの［**LIFF**］タブにおいて、LIFFアプリは以下の並び順で表示されます。

1.  2023年5月23日以降にLINEログインチャネルへ追加されたLIFFアプリが、追加日の降順で表示される
2.  2023年5月23日より前にLINEログインチャネルへ追加されたLIFFアプリが、順不同で表示される

![LIFFタブで表示されるLIFFアプリの例](https://developers.line.biz/media/liff/order-of-liff-apps-ja.png)

## その他の操作

LINE Developersコンソールの［LIFF］タブでは、以下の操作も実行できます。

*   LIFFアプリの設定を編集する
*   LIFFアプリをチャネルから削除する

## 次のステップ

LIFFアプリをチャネルに追加したら、LIFFアプリを開いてみましょう。

*   [LIFFアプリを開く](https://developers.line.biz/ja/docs/liff/opening-liff-app/)