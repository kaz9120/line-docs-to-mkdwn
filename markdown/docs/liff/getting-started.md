---
url: https://developers.line.biz/ja/docs/liff/getting-started/
copied_at: 2025-10-23T16:00:05.346Z
---
# チャネルを作成する

LIFFアプリを開発するには、まず[LINE Developersコンソール](https://developers.line.biz/console/)でプロバイダーとチャネルを作成します。

## LINE Developersコンソールへログインする

プロバイダーとチャネルを作成するため、まずはLINE Developersコンソールへログインします。ログイン方法について詳しくは、「[LINE Developersコンソールへのログイン](https://developers.line.biz/ja/docs/line-developers-console/login-account/)」を参照してください。

## プロバイダーとチャネルを作成する

LINE Developersコンソールへログインできたら、プロバイダーとチャネルを作成します。

### 1\. プロバイダーを作成する

適当なプロバイダーがある場合は、「[2\. チャネルを作成する](#step-two-create-channel)」へ進みます。

1.  ホーム画面の［**新規プロバイダー作成**］をクリックします。:::note warn
    [新規プロバイダー作成]が見つからない場合
    
    :::
    
2.  ［**新規プロバイダー作成**］画面で任意の［**プロパイダー名**］を入力し、［**作成**］をクリックします。  
    **プロバイダー**は、LINEプラットフォームを通じてサービスを提供する個人、企業、またはそのほかの組織を意味する情報です。プロバイダー名には、あなたの名前や企業名を入力してください。  
    ![プロバイダー作成画面](https://developers.line.biz/media/liff/getting-started/create-provider-ja.png)

### 2\. チャネルを作成する

**チャネル**は、LINEプラットフォームが提供する機能を、プロバイダーが開発するサービスで利用するための通信路です。チャネルを作成するには、名前、説明文、およびアイコン画像が必要です。

LIFFアプリを追加できるチャネルタイプは以下の2つです。

| 種類 | 説明 |
| --- | --- |
| [LINEログイン](https://developers.line.biz/ja/docs/line-login/) | LIFFアプリを作成する場合や、次のステップで[LIFFスターターアプリを試してみる](https://developers.line.biz/ja/docs/liff/trying-liff-app/)場合、[Create LIFF AppでLIFFアプリの開発環境を構築する](https://developers.line.biz/ja/docs/liff/cli-tool-create-liff-app/)場合は、こちらのチャネルを作成してください。 |
| [LINEミニアプリ](https://developers.line.biz/ja/docs/line-mini-app/) | [LINEミニアプリ](https://developers.line.biz/ja/docs/line-mini-app/quickstart/)でLIFFのアプリを作成する場合は、こちらのチャネルを作成してください。 |

:::note info
LINEミニアプリとしての作成を推奨します

:::

ここでは、次のステップで[LIFFスターターアプリを試してみる](https://developers.line.biz/ja/docs/liff/trying-liff-app/)ことを想定して、LINEログインのチャネルを作成します。チャネルを作成するプロバイダーをクリックし、LINEログインのチャネルを作成してください。既に適当なLINEログインのチャネルが存在していた場合は、そのチャネルを選択しても構いません。チャネルの作成方法について詳しくは、「[チャネルを作成する](https://developers.line.biz/ja/docs/line-developers-console/overview/#creating-a-channel)」を参照してください。

:::note warn
チャネル名の制限について

:::

:::note warn
チャネルのアプリタイプについて

:::

:::note warn
LINEログインとLINEミニアプリ以外のチャネルにはLIFFアプリを追加できません

:::

#### チャネルとプロバイダーの連携に関する注意点

一度作成したチャネルを、後から他のプロバイダーに移動することはできません。

LINEログインチャネルとMessaging APIチャネルを連携するサービスを開発する場合は、これらのチャネルを同じプロバイダーの配下に作成してください。

開発者が提供するサービスを利用するLINEユーザーには、プロバイダーごとに異なるユーザーIDが割り当てられます。異なるプロバイダーに属するチャネル間では、ユーザーIDを利用して同一ユーザーであることを確認できません。

![](https://developers.line.biz/media/line-developers-console/different-user-ids.png)

:::note alert
チャネル作成時に特に注意が必要なケース

:::

## 次のステップ

これで、LIFFアプリを追加するチャネルが作成されました。続いて、以下のいずれかを行います。

*   [LIFFスターターアプリを試してみる](https://developers.line.biz/ja/docs/liff/trying-liff-app/)
*   [LIFFアプリを開発する](https://developers.line.biz/ja/docs/liff/developing-liff-apps/)