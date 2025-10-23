---
url: https://developers.line.biz/ja/docs/line-mini-app/develop/payment/
copied_at: 2025-10-23T16:01:16.234Z
---
# 決済システムを利用する

ユーザーに決済システムを提供するために、LINEミニアプリにLINE Payや他の決済システムを利用できます。

:::note warn
日本国内におけるLINE Payのサービスを終了しました

:::

:::note info
ヒント

:::

## LINE Pay

### LINE Pay加盟店アカウントの準備

LINEミニアプリでLINE Payを利用するには、まずLINE Pay加盟店のアカウントが必要です。LINE Pay加盟店のアカウントがない場合は、[LINE Payの公式ホームページ](https://pay.line.me/portal/jp/main)から申し込んでください。

### LINE Payを利用するサービスの開発

加盟店のアカウントの申請が承認を受けたら、LINEミニアプリでLINE Payを利用するように実装します。LINE Payについて詳しくは、LINE Pay Developersの『[Online paymentドキュメント](https://developers-pay.line.me/online)』を参照してください。

LINE Payを利用する際は、以下のような流れで決済を処理します。

1.  LINEミニアプリでユーザーが決済を開始するときに、LINE Payの処理を開始します。  
    LINEミニアプリが表示する画面：  
    ![](https://developers.line.biz/media/line-mini-app/mini_linepay_flow01.png)
2.  ユーザーがLINE Payで決済内容を確認して、LINE Payの認証情報を入力します。  
    LINE Payが表示する画面：  
    ![](https://developers.line.biz/media/line-mini-app/mini_linepay_flow02.png)
3.  注文の確認ページを表示します。  
    LINEミニアプリが表示する画面：  
    ![](https://developers.line.biz/media/line-mini-app/mini_linepay_flow03.png)

### LINE Payテスト

決済に関するテストは、LINE Payが提供している[Sandbox](https://developers-pay.line.me/sandbox)を利用できます。

## 他の決済方法

LINEミニアプリで、LINE Pay以外の決済方法を提供するには、一般のウェブページで決済を提供して処理するのと同様に実装してください。なお、外部のドメインや外部のアプリで決済を完了した後、ユーザーがLINEミニアプリのページに戻るようにしてください。