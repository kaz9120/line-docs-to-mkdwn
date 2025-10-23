---
url: https://developers.line.biz/ja/docs/line-mini-app/service/line-mini-app-oa/
copied_at: 2025-10-23T16:01:45.994Z
---
# LINE公式アカウントを活用する

LINEミニアプリのプロモーションにLINE公式アカウントを利用する方法をご紹介します。 LINE公式アカウントは、以下のURLにアクセスすると作成できます。URLは、国ごとに異なります。 また、[LINE Official Account Manager](https://manager.line.biz/)では、LINE公式アカウントにリッチメッセージを設定したり、リッチメニューを設定したりできます。

*   日本：[https://www.lycbiz.com/jp/](https://www.lycbiz.com/jp/)
*   台湾：[https://tw.linebiz.com/](https://tw.linebiz.com/)
*   タイ：[https://lineforbusiness.com/th/](https://lineforbusiness.com/th/)

![あなたのLINEミニアプリをLINE公式アカウントで宣伝](https://developers.line.biz/media/line-mini-app/mini_with_oa.png)

## リッチメッセージを送る

LINEミニアプリのプロモーションや新機能をお知らせするために、ユーザーにリッチメッセージを送りましょう。LINEミニアプリのことをユーザーに思い出してもらえます。

リッチメッセージでは必ずパーマネントリンクを使用する必要があります。詳しくは「[パーマネントリンクを作成する](https://developers.line.biz/ja/docs/line-mini-app/develop/permanent-links/)」を参照してください。

## リッチメニューにLINEミニアプリのショートカットを追加する

LINE公式アカウントのリッチメニューに、LINEミニアプリへのショートカットを追加してください。ユーザーがLINEミニアプリに辿り着くまでの時間を短縮できます。

リッチメニューでは必ずパーマネントリンクを使用する必要があります。詳しくは「[パーマネントリンクを作成する](https://developers.line.biz/ja/docs/line-mini-app/develop/permanent-links/)」を参照してください。

## LINEミニアプリをはじめて開いたときにLINE公式アカウントを友だち追加する（友だち追加オプション）

ユーザーがLINEミニアプリを初めて開いたときに、[チャネル同意画面](https://developers.line.biz/ja/docs/line-mini-app/discover/builtin-features/#consent-screen)にLINE公式アカウントを友だち追加するオプションを表示するように設定できます。これを、友だち追加オプションと呼びます。友だち追加オプションの設定は、LINE Developersコンソールで行います。

1.  [LINE Developersコンソール](https://developers.line.biz/console/)でLINEミニアプリチャネルの［**チャネル基本設定**］タブをクリックします。
2.  ［**リンクされたLINE公式アカウント**］の［**編集**］をクリックします。
3.  LINEミニアプリチャネルと連携させるLINE公式アカウントを選択します。
4.  LINEミニアプリチャネルの［**ウェブアプリ設定**］タブをクリックします。
5.  ［**友だち追加オプション**］の［**編集**］をクリックします。
6.  ［**On (normal)**］を選択します。

:::note warn
注意

:::

:::note info
認証プロバイダーは友だち追加するオプションをデフォルトでオンに設定できます

:::