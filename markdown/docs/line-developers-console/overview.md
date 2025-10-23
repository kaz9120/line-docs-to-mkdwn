---
url: https://developers.line.biz/ja/docs/line-developers-console/overview/
copied_at: 2025-10-23T15:55:37.083Z
---
# LINE Developersコンソールの概要

LINEヤフー株式会社では、**LINEプラットフォーム**を通じて以下のような機能を、サードパーティの開発者に提供しています。

*   LINEアカウントの認証情報を利用してユーザー認証をする機能（LINEログイン）
*   ユーザーとLINEのメッセージをやり取りする機能（Messaging API）

開発者は、**LINE Developersコンソール**などの管理ツールで、利用する機能に対応する**チャネル**を作成することで、LINEプラットフォームが提供する機能の利用を許諾されます。

[LINE Developersコンソールにログイン](https://developers.line.biz/console/)

LINE Developersコンソールでは、**開発者**、**プロバイダー**、および**チャネル**を管理できます。

![概要](https://developers.line.biz/media/line-developers-console/overview-01.png)

## 開発者

LINE Developersサイトでは、LINE Developersコンソールにアクセスする人のことを**開発者**と呼びます。

プロバイダーとチャネルに開発者を登録することで、開発者ごとに、LINE Developersコンソールで閲覧および編集できる情報を限定できます。

たとえば、開発者Aが作成したチャネルの権限を、ほかの開発者Bに付与できます。権限を付与する方法について詳しくは、「[権限を管理する](https://developers.line.biz/ja/docs/line-developers-console/managing-roles/)」を参照してください。

## プロバイダー

LINE Developersサイトでは、サービスを提供し、ユーザーの情報を取得する開発者個人、企業、または団体等を**サービス提供者**（LINEミニアプリでは**サービス事業主**）と呼びます。

LINE Developersコンソールでは、サービス提供者を**プロバイダー**として登録します。

### プロバイダーを作成する

1.  LINE Developerコンソールのホーム画面にあるプロバイダーページで、［**作成**］をクリックします。
2.  ［**新規プロバイダー作成**］画面で希望する［**プロパイダー名**］を入力し、［**作成**］をクリックして確認します。

:::note info
ヒント

:::

### プロバイダーを削除する

プロバイダーの権限に応じて表示される［**プロバイダー設定**］タブの［**削除**］ボタンをクリックすると、プロバイダーを削除できます。プロバイダー権限について詳しくは、「[プロバイダーの権限](https://developers.line.biz/ja/docs/line-developers-console/managing-roles/#roles-for-provider)」を参照してください。

### 作成できるプロバイダーの数について

作成できるプロバイダーの数には、以下の制限があります。

| プロバイダー作成時の制限 | 説明 |
| --- | --- |
| LINE Developersコンソールの制限 | 開発者ごとに、最大10個のプロバイダーを作成できます。11個目のプロバイダーは作成できません。 |

### 認証プロバイダーについて

認証プロバイダーになると、ユーザーが確認する同意画面に、認証プロバイダーバッジを表示できます。また[プロバイダーページ](https://developers.line.biz/ja/docs/partner-docs/provider-page/)を設定、公開できます。

![認証プロバイダーバッジ](https://developers.line.biz/media/line-developers-console/consent-screen-certified-provider.png)

認証プロバイダーバッジは、プロバイダーを作成したサービス提供者が本物であることをLINEヤフー株式会社が確認した証です。 LINEヤフー株式会社が確認する内容は以下のとおりです。

*   実在している組織であること
*   その組織に所属している人（またはその代理人）からの申請であること
*   プライバシーポリシーを定め、公開している組織であること

:::note warn
認証プロバイダーバッジを表示するには手続きが必要です

:::

:::note warn
注意

:::

## チャネル

**チャネル**は、LINEプラットフォームが提供する機能を、サービス提供者が利用するための通信路です。

LINEプラットフォームを利用するサービスを開発するには、チャネルを作成します。

![Channel](https://developers.line.biz/media/messaging-api/getting-started/channel.png)

なおLINEプラットフォームは、チャネルに関連付けられた認証情報を利用して、開発者がLINEプラットフォームを利用する権限を持っていることを確認しています。

:::note alert
ユーザー情報を保護するための禁止事項

:::

### チャネルを作成する

Messaging APIチャネルは、LINE公式アカウントを開設することで作成できます。詳しくは、『Messaging APIドキュメント』の「[Messaging APIを始めよう](https://developers.line.biz/ja/docs/messaging-api/getting-started/)」を参照してください。

それ以外のチャネルを作成するには、以下の手順に従ってください。

1.  プロバイダーページの［**チャネル設定**］タブから作成したいチャネルの種類を選択します。 LINE Developerコンソールで作成できるチャネルの種類は、以下のとおりです。
    
    | 種類 | 説明 |
    | --- | --- |
    | [LINEログイン](https://developers.line.biz/ja/docs/line-login/) | LINEアカウントの資格情報を使用して、開発したサービスのユーザーを認証できます。 |
    | ブロックチェーンサービス | ブロックチェーンサービスを利用したサービスを提供できます。 |
    | LINEミニアプリ | ネイティブアプリを開発することなく[LINEミニアプリ](https://developers.line.biz/ja/docs/line-mini-app/quickstart/)でサービスを提供できます。 |
    
2.  チャネル名と必須またはオプションの情報を入力し、［**作成**］をクリックします。:::note warn
    チャネル名の制限について
    
    :::
    
    :::note warn
    LINEログインのチャネルを利用する場合の注意
    
    :::
    

#### チャネルとプロバイダーの連携に関する注意点

一度作成したチャネルを、後から他のプロバイダーに移動することはできません。

[LINE Official Account Manager](https://manager.line.biz/)で作成した[LINE公式アカウントでMessaging APIを利用する](https://developers.line.biz/ja/docs/messaging-api/getting-started/#using-oa-manager)際は、初期設定時にチャネルを所属させるプロバイダーを新規作成するか、既存のプロバイダーを選択する必要があります。この場合も、後からチャネルを他のプロバイダーに移動することはできません。

Messaging APIのチャネルとLINEログインのチャネルを連携するサービスを開発する場合は、これらのチャネルを同じプロバイダーの配下に作成してください。

開発者が提供するサービスを利用するLINEユーザーには、プロバイダーごとに異なるユーザーIDが割り当てられます。異なるプロバイダーに属するチャネル間では、ユーザーIDを利用して同一ユーザーであることを確認できません。

![](https://developers.line.biz/media/line-developers-console/different-user-ids.png)

:::note alert
チャネル作成時に特に注意が必要なケース

:::

### チャネルを削除する

チャネルの権限に応じて表示される［**チャネル基本設定**］タブの［**削除**］ボタンをクリックすると、チャネルを削除できます。

チャネル権限について詳しくは、「[チャネルの権限](https://developers.line.biz/ja/docs/line-developers-console/managing-roles/#roles-for-channel)」を参照してください。

### 作成できるチャネルの数について

作成できるチャネルの数には、以下の制限および仕様があります。

| チャネル作成時の制限または仕様 | 説明 |
| --- | --- |
| LINE Developersコンソールの制限 | 開発者は1つのプロバイダーの配下に、自身がAdmin権限を持つチャネルを、チャネルタイプにかかわらず最大100個まで所有できます。 |
| LINE Official Account Managerの制限 | LINE Official Account Managerにログインしたアカウントごとに、LINE公式アカウントを最大100個まで所有できます。 |

:::note info
LINE Official Account Managerについて

:::