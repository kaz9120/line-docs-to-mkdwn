---
url: https://developers.line.biz/ja/docs/line-developers-console/best-practices-for-provider-and-channel-management/
copied_at: 2025-10-24T06:27:54.183Z
---
# プロバイダーとチャネル管理のベストプラクティス

このページでは、プロバイダーとチャネル管理のベストプラクティスを紹介します。

*   [登場人物](#characters)
*   [各プロバイダーや各チャネルのAdmin権限を複数の開発者に付与する](#grant-admin-roles-to-several-developers)
*   [プロバイダーをサービス提供者ごとに作成する](#create-provider-for-each-service-provider)
*   [連携したいチャネルを同じプロバイダーの配下に作成する](#create-channels-under-the-same-provider)
*   [サービスを提供する地域ごとにチャネルを作成する](#create-channels-by-region)
*   [［チャネル基本設定］タブの［メールアドレス］にメーリングリストのメールアドレスを登録する](#register-mailing-list-email-address)

## 登場人物

以下の仮想の組織、人物を例として説明します。

| 組織、人物 | 説明 |
| --- | --- |
| 飲料メーカーA | コーヒー飲料「ブラウンコーヒー」と紅茶飲料「コニー紅茶」を提供する飲料メーカー。LINEプラットフォームを利用したサービス開発を開発会社Cと開発会社Dに委託している。 |
| 飲料メーカーB | コーラ飲料「サリーコーラ」を提供する飲料メーカー。飲料メーカーAの米国法人。 |
| 開発会社C | LINEプラットフォームを利用したサービス開発を飲料メーカーAから委託されている開発会社。コーヒー飲料「ブラウンコーヒー」のキャンペーンサイトをLINEログインを利用して開発している。 |
| 開発会社D | LINEプラットフォームを利用したサービス開発を飲料メーカーAから委託されている開発会社。コーヒー飲料「ブラウンコーヒー」のLINEボットと紅茶飲料「コニー紅茶」のLINEボットをMessaging APIを利用して開発している。 |
| ブラウン | 飲料メーカーAの社員。 |
| コニー | 飲料メーカーAの社員。 |

また、飲料メーカーAは、プロバイダー「飲料メーカーA」とその配下のチャネルを管理しているものとします。プロバイダー「飲料メーカーA」配下のチャネルは以下のとおりです。

| チャネルの種類 | チャネル名 | 説明 |
| --- | --- | --- |
| LINEログイン | ブラウンコーヒー | コーヒー飲料「ブラウンコーヒー」のキャンペーンサイト用のチャネル。 |
| Messaging API | ブラウンコーヒー | コーヒー飲料「ブラウンコーヒー」のLINEボット用のチャネル。 |
| Messaging API | コニー紅茶 | 紅茶飲料「コニー紅茶」のLINEボット用のチャネル。 |

## 各プロバイダーや各チャネルのAdmin権限を複数の開発者に付与する

| dummy | dummy |
| --- | --- |
| 良い例 | 各プロバイダーや各チャネルのAdmin権限を複数の開発者に付与する。 |
| 悪い例 | 各プロバイダーや各チャネルのAdmin権限を1人の開発者だけに付与する。 |

プロバイダーやチャネルのAdmin権限を持つ唯一の開発者が、急な退職などにより不在になると、そのプロバイダーやチャネルにAdmin権限でアクセスできなくなります。その結果、プロバイダーやチャネルの運用を続けることが難しくなる可能性があります。このような不測の事態に備えるため、各プロバイダーや各チャネルのAdmin権限は複数の開発者に付与します。

たとえば、ブラウンとコニーがプロバイダー「飲料メーカーA」とLINEログインチャネル「ブラウンコーヒー」のAdmin権限を持っているとします。もしブラウンが急遽退職しても、コニーもAdmin権限を持っているため、プロバイダーやチャネルの運用を問題なく続けることができます。

![](https://developers.line.biz/media/line-developers-console/best-practices-for-provider-and-channel-management/grant-admin-role-to-several-developers-ja.png)

なお、プロバイダーとチャネルの権限は独立しています。プロバイダーのAdmin権限を付与しても、そのプロバイダーの配下のチャネルのAdmin権限を付与したことにはならないため注意してください。

権限について詳しくは、「[権限を管理する](https://developers.line.biz/ja/docs/line-developers-console/managing-roles/)」を参照してください。

> [!WARNING]
> 開発者をプロバイダーから削除する際の注意点
> [LINE Developersコンソール](https://developers.line.biz/console/)で開発者をプロバイダーから削除する際に、［**選択した開発者をこのプロバイダーに紐づいているチャネルからも削除する。**］をチェックし、［**OK**］をクリックすると、選択した開発者がプロバイダーの配下のチャネルからも削除されます。
> 
> ただし、選択した開発者がプロバイダーの配下のチャネルから削除された結果、そのチャネルのAdmin権限を持つ開発者が0人になる可能性があります。そのため、［**選択した開発者をこのプロバイダーに紐づいているチャネルからも削除する。**］をチェックする際は、チャネルのAdmin権限を持つ開発者が他にいることを確認してください。
> 
> ![](https://developers.line.biz/media/line-developers-console/best-practices-for-provider-and-channel-management/delete-developer-from-provider-ja.png)

## プロバイダーをサービス提供者ごとに作成する

| dummy | dummy |
| --- | --- |
| 良い例 | 飲料メーカーAのプロバイダーと飲料メーカーBのプロバイダーをそれぞれ作成する。 |
| 悪い例 | 飲料メーカーAと飲料メーカーBで1つのプロバイダーを作成する。 |

サービス提供者（LINEミニアプリではサービス事業主）とは、サービスを提供し、ユーザーの情報を取得する開発者個人、企業、または団体のことです。[LINE Developersコンソール](https://developers.line.biz/console/)では、サービス提供者をプロバイダーとして登録します。そのため、プロバイダーはサービス提供者ごとに作成します。

たとえば、飲料メーカーAの米国法人である飲料メーカーBが「サリーコーラ」のLINEボットを開発したいとします。この場合、飲料メーカーBはプロバイダー「飲料メーカーA」の配下にMessaging APIチャネルを作成するのではなく、飲料メーカーBのプロバイダーを作成し、その配下にMessaging APIチャネルを作成します。

![](https://developers.line.biz/media/line-developers-console/best-practices-for-provider-and-channel-management/create-provider-for-each-service-provider-1-ja.png)

また、LINEプラットフォームを利用したサービス開発を他社に委託する場合は、サービス提供の主体となる委託元のプロバイダーを作成します。

たとえば、飲料メーカーAは、LINEプラットフォームを利用したサービス開発を開発会社Cと開発会社Dにそれぞれ委託しています。この場合、サービス提供の主体は委託元である飲料メーカーAです。そのため、開発会社Cや開発会社Dのプロバイダーではなく、飲料メーカーAのプロバイダーを作成し、その配下にチャネルを作成します。

![](https://developers.line.biz/media/line-developers-console/best-practices-for-provider-and-channel-management/create-provider-for-each-service-provider-2-ja.png)

## 連携したいチャネルを同じプロバイダーの配下に作成する

| dummy | dummy |
| --- | --- |
| 良い例 | 連携したいチャネルを同じプロバイダーの配下に作成する。 |
| 悪い例 | 連携したいチャネルを別々のプロバイダーの配下に作成する。 |

複数のチャネルを連携するサービスを開発する場合は、連携したいチャネルを同じプロバイダーの配下に作成します。同じプロバイダーの配下に作成することで、各チャネルでは同じユーザーに対し、同じ[ユーザーID](https://developers.line.biz/ja/glossary/#user-id)が割り当てられます。チャネルを後から別のプロバイダーに移動させることはできないため、連携したいチャネルを別々のプロバイダーの配下に作成しないよう注意してください。

たとえば、ユーザーが「ブラウンコーヒー」のキャンペーンサイトにLINEログインする際に、[友だち追加オプション](https://developers.line.biz/ja/docs/line-login/link-a-bot/)を利用して「コニー紅茶」のLINEボットの友だち追加を促したい場合は、「ブラウンコーヒー」のLINEログインチャネルと「コニー紅茶」のMessaging APIチャネルをプロバイダー「飲料メーカーA」配下に作成します。

![](https://developers.line.biz/media/line-developers-console/best-practices-for-provider-and-channel-management/create-channels-under-the-same-provider-ja.png)

なお、複数のサービスでLINEプラットフォームを利用する際に、各サービスで取得したLINEユーザー情報を紐づけるには、プロバイダーページを公開した上で、利用条件を満たす必要があります。詳しくは、『法人ユーザー向けオプションドキュメント』の「[ユーザーID共通利用に関する注意事項](https://developers.line.biz/ja/docs/partner-docs/provider-page/#cautions-on-the-common-use-of-user-ids)」を参照してください。

## サービスを提供する地域ごとにチャネルを作成する

| dummy | dummy |
| --- | --- |
| 良い例 | サービスを提供する地域ごとにチャネルを作成する。 |
| 悪い例 | 1つのチャネルを使用して複数の地域にサービスを提供する。 |

複数の国・地域において同一ブランドのサービスを提供する場合は、1つのチャネルを共有するのではなく、地域ごとに個別のチャネルを作成します。

たとえば、飲料メーカーAが日本でコーヒー飲料「ブラウンコーヒー」のキャンペーンサイト運営していて、台湾とタイでも同商品のキャンペーンサイトを開設するとします。この場合は、プロバイダー「飲料メーカーA」配下に地域別にLINEログインチャネルを作成します。

![](https://developers.line.biz/media/line-developers-console/best-practices-for-provider-and-channel-management/create-channels-by-region-ja.png)

## ［チャネル基本設定］タブの［メールアドレス］にメーリングリストのメールアドレスを登録する

| dummy | dummy |
| --- | --- |
| 良い例 | ［**チャネル基本設定**］タブの［**メールアドレス**］にメーリングリストのメールアドレスを登録する。 |
| 悪い例 | ［**チャネル基本設定**］タブの［**メールアドレス**］に個人のメールアドレスを登録する。 |

各チャネルの［**チャネル基本設定**］タブにある［**メールアドレス**］に登録されたメールアドレスには、チャネルに関する重要なお知らせが届きます。そのため、この［**メールアドレス**］には、個人のメールアドレスではなくメーリングリストのメールアドレスを登録します。

たとえば、LINEログインチャネル「ブラウンコーヒー」の［**チャネル基本設定**］タブの［**メールアドレス**］に、ブラウンとコニーが所属する部署のメーリングリストのメールアドレスを登録します。これにより、ブラウンやコニーが不在の場合でも、チャネルに関する重要なお知らせを受け取ることができます。

なお、チャネルに関する重要なお知らせは、チャネルの権限を持つ開発者のメールアドレスや通知センターでも受け取ることができます。詳しくは、「[メールや通知センターでお知らせを受け取る](https://developers.line.biz/ja/docs/line-developers-console/notification/)」を参照してください。