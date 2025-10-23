---
url: https://developers.line.biz/ja/docs/messaging-api/getting-started/
copied_at: 2025-10-23T15:55:57.100Z
---
# Messaging APIを始めよう

Messaging APIを使うには、チャネルが必要です。チャネルを作成するには、[LINE公式アカウント](https://developers.line.biz/ja/glossary/#line-official-account)を作成し、LINE公式アカウントでMessaging APIの利用を有効にします。

このページでは、以下に示す2つの手順でMessaging APIチャネルを作成する方法について説明します。

1.  [LINE公式アカウントを作成する](#create-oa)
2.  [LINE公式アカウントでMessaging APIを有効にする](#using-oa-manager)

既存のLINE公式アカウントでMessaging APIを有効にするには、手順2を参照してください。

:::note info
チャネルとは

:::

## 1\. LINE公式アカウントを作成する

Messaging APIを利用するには、まずLINE公式アカウントを作成する必要があります。LINE公式アカウントは、以下の手順で作成できます。

### 1-1. ビジネスIDに登録する

LINE公式アカウントを作成するには、[ビジネスID](https://account.line.biz/signup?redirectUri=https://entry.line.biz/form/entry/unverified)に登録する必要があります。ビジネスIDには、LINEアカウントまたはメールアドレスを用いて登録できます。

![](https://developers.line.biz/media/messaging-api/getting-started/sign-up-business-id-ja.png)

### 1-2. 作成フォームに必要事項を記入する

ビジネスIDへの登録が完了すると、LINE公式アカウントの[作成フォーム](https://entry.line.biz/form/entry/unverified)が表示されます。このフォームに必要事項を記入します。記入が完了すると、LINE公式アカウントが作成されます。

![](https://developers.line.biz/media/messaging-api/getting-started/oa-entry-form-ja.png)

### 1-3. LINE公式アカウントを確認する

以上の手順により、LINE公式アカウントが作成されます。作成されたLINE公式アカウントは、[LINE Official Account Manager](https://manager.line.biz/)で確認できます。

![](https://developers.line.biz/media/messaging-api/getting-started/oa-manager-list-ja.png)

LINE公式アカウントが作成されたことを確認したら、手順2に進んでください。

## 2\. LINE公式アカウントでMessaging APIを有効にする

LINE公式アカウントをMessaging APIと連携するには、[LINE Official Account Manager](https://manager.line.biz/)でMessaging APIの利用を有効にします。これによりチャネルが作成されます。

### 2-1. Messaging APIの利用を有効にする

[LINE Official Account Manager](https://manager.line.biz/)でMessaging APIの利用を有効にすると、Messaging APIのチャネルが作成されます。詳しくは、『LINEヤフー for Business』の「[Messaging API](https://www.lycbiz.com/jp/manual/OfficialAccountManager/account-settings_messaging_api/)」を参照してください。

[LINE Official Account Manager](https://manager.line.biz/)にログインするときに使っているアカウントで、[LINE Developersコンソール](https://developers.line.biz/console/)にログインしたことがない場合は、操作の途中で、開発者情報を登録する画面が表示されます。名前とメールアドレスを入力して開発者アカウントを作成します。

![](https://developers.line.biz/media/messaging-api/getting-started/developer-registration-ja.png)

続いて、LINE公式アカウントを管理するプロバイダーを選択する画面が表示されます。ほかのLINEログインのチャネルなどと連携する予定がある場合は、そのチャネルと同じプロバイダーを選択してください。

:::note warn
プロバイダー選択時の注意

:::

:::note alert
プロバイダー選択時に特に注意が必要なケース

:::

### 2-2. LINE Developersコンソールにログインする

作成したMessaging APIのチャネルの設定は、LINE Developersコンソールで行います。[LINE Official Account Manager](https://manager.line.biz/)にログインするときに使っているアカウントで、[LINE Developersコンソール](https://developers.line.biz/console/)にログインします。

![](https://developers.line.biz/media/messaging-api/getting-started/login-dialog-ja.png)

### 2-3. チャネルを確認する

[手順2-1](#step-one-enable-use-of-messaging-api)で選択したプロバイダーを選択し、チャネルが作成されたことを確認します。

![](https://developers.line.biz/media/messaging-api/getting-started/console-home-ja.png)

## 【廃止】LINE Developersコンソールでチャネルを作成する

LINE DevelopersコンソールからはMessaging APIチャネルを直接作成できなくなりました。詳しくは、2024年9月4日のニュース、「[2024年9月4日をもってLINE DevelopersコンソールからMessaging APIチャネルを直接作成することはできなくなりました](https://developers.line.biz/ja/news/2024/09/04/no-longer-possible-to-create-messaging-api-channels-from-console/)」を参照してください。

## 次のステップ

以上でチャネルが作成され、Messaging APIを利用する準備ができました。続いて次のページで、ボットを作成するためにチャネルを設定していきます。

*   [ボットを作成する](https://developers.line.biz/ja/docs/messaging-api/building-bot/)