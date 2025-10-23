---
url: https://developers.line.biz/ja/docs/line-mini-app/discover/console-guide/
copied_at: 2025-10-23T16:00:48.484Z
---
# LINEミニアプリ用LINE Developersコンソールガイド

[LINE Developersコンソール](https://developers.line.biz/console/)の基本的な仕組みや注意点を理解してから審査を依頼しましょう。

*   [LINEミニアプリ用LINE Developersコンソール](#line-developers-console-for-mini-app)
*   [LINEミニアプリ用LINE Developersコンソールの使用に関する注意事項](#precautions-for-using-line-developers-console-for-line-mini-app)
    *   [LINEミニアプリチャネルの基本的な仕組み](#basic-structure-of-a-line-mini-app-channel)
    *   [LIFF IDの確認とエンドポイントURLの設定](#confirm-liff-id-and-set-endpoint-url)
    *   [チャネルアクセストークンの発行について](#issuing-a-channel-access-token)
    *   [会社または事業者の所在国・地域の設定について](#configuring-country-or-region)
    *   [LINE Developersコンソールで設定した内容が反映されるタイミングについて](#timing-of-settings-reflection)
    *   [チャネル説明の入力について](#channel-description)
*   [3つのLINEミニアプリの動作差異について](#differences-in-the-behavior-of-the-3-line-mini-apps)

## LINEミニアプリ用LINE Developersコンソール

LINE Developersコンソールは、LINEミニアプリを開発・テストするための管理画面であると同時に、LINEミニアプリを認証審査に提出して認証済ミニアプリにするためのツールでもあります。現在、LINEミニアプリ用のLINE Developersコンソールは、サービスを提供する地域が日本の場合は、[LINEミニアプリポリシー](https://terms2.line.me/LINE_MINI_App?lang=ja)における「本サービスのご利用対象者」であれば、どなたでも利用できます。サービスを提供する地域が台湾およびタイの場合は、当社現地法人より承認を受けた方のみ利用できます。

## LINEミニアプリ用LINE Developersコンソールの使用に関する注意事項

LINEミニアプリチャネルで設定するLINEミニアプリと、LINEログインチャネルに追加するLIFFアプリは、以下の点が異なります。

:::note info
LINEミニアプリとしての作成を推奨します

:::

### LINEミニアプリチャネルの基本的な仕組み

LINEログインチャネルとは異なり、LINEミニアプリチャネルには以下のような構造上の特徴があります。

LINE DevelopersコンソールでLINEミニアプリのチャネルを作成すると、**開発用**、**審査用**、**本番用**の3つの内部チャネルが同時に作成されます。内部チャネルごとに、次のような特徴や目的があります。設定が反映されるタイミングについて詳しくは、「[LINE Developersコンソールで設定した内容が反映されるタイミングについて](#timing-of-settings-reflection)」を参照してください。

| 内部チャネル | 内部チャネルの用途 | チャネルステータス | 内部チャネルの詳細情報を確認できる管理者 | LINEミニアプリにアクセスできるユーザー |
| --- | --- | --- | --- | --- |
| **開発用** | 開発およびテスト用の内部チャネル | 常に「開発中」 | あなたが権限を割り当て、それを承認した管理者のみ<br/><ul><!--[--><li><!--[-->LINE DevelopersコンソールのLINEミニアプリチャネルの設定画面で確認できます<!--]--></li><!--]--></ul> | あなたが権限を割り当て、それを承認したテスターのみ |
| **審査用** | LINEヤフー株式会社がLINEミニアプリの審査に使用する内部チャネル | 常に「開発中」 | <ul><!--[--><li><!--[-->あなたが権限を割り当て、それを承認した管理者<ul><!--[--><li><!--[-->LINE DevelopersコンソールのLINEミニアプリチャネルの設定画面で確認できます<!--]--></li><!--]--></ul><!--]--></li><li><!--[-->LINEヤフー株式会社の審査担当者<!--]--></li><!--]--></ul> | LINEヤフー株式会社の審査担当者のみ |
| **本番用** | ユーザーに公開される内部チャネル | 常に「公開中」 | あなたが権限を割り当て、それを承認した管理者のみ<br/><ul><!--[--><li><!--[-->LINEミニアプリチャネルの右上にある［<strong><!--[-->公開済みデータ<!--]--></strong>］ボタンから本番用チャネルに関する情報を確認できます<!--]--></li><!--]--></ul> | エンドユーザー |

:::note warn
チャネルステータスは変更できません

:::

:::note info
LINEミニアプリのTester登録について

:::

### LIFF IDの確認とエンドポイントURLの設定

LINEミニアプリチャネルでは、内部チャネルごとにLINEミニアプリ（LIFFアプリ）が1つずつ追加されています。内部チャネルごとに異なる［**LIFF ID**］を確認し、［**エンドポイントURL**］を指定して、各エンドポイントURLにLIFFアプリをデプロイしてください。

*   審査を申請する場合は、事前に審査用のエンドポイントURLに審査対象のLIFFアプリをデプロイしてください。
*   LINEミニアプリを公開する場合は、事前に本番用のエンドポイントURLに本番用のLIFFアプリをデプロイしてください。

［**開発用**］と［**審査用**］の［**エンドポイントURL**］には、ベーシック認証のかかったURLを指定できます。詳しくは、「[公開前のLINEミニアプリにベーシック認証でアクセス制限をかける](https://developers.line.biz/ja/docs/line-mini-app/develop/develop-overview/#use-basic-authentication)」を参照してください。

:::note warn
内部チャネルごとにLIFF IDが異なります

:::

:::note warn
LINEログインチャネルの［LIFF］タブとLINEミニアプリチャネルの［ウェブアプリ設定］タブの差異

:::

:::note info
LINE Developersコンソールで設定した内容について

:::

:::note warn
LINEミニアプリのLIFF URLが変更されました

:::

### チャネルアクセストークンの発行について

LINEミニアプリチャネルでは、[ステートレスチャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/#stateless-channel-access-token)を使用してください。

なお、チャネルアクセストークンは、LINEミニアプリ（LIFFアプリ）が動作する内部チャネルごとに発行してください。チャネルIDとチャネルシークレットは、LINE Developersコンソールの［**チャネル基本設定**］タブで確認できます。

![チャネルIDとチャネルシークレット](https://developers.line.biz/media/line-mini-app/channel_id_secret.png)

:::note warn
チャネルアクセストークンは、内部チャネルごとに発行する必要があります。

:::

:::note warn
ステートレスチャネルアクセストークンの使用を推奨します

:::

### 会社または事業者の所在国・地域の設定について

LINEミニアプリチャネル作成時に、［**LINEミニアプリを提供する地域と、サービス事業主の所在国・地域が同一であることを表明し、保証します。**］チェックボックスの内容への同意が必要です。所在国・地域の名前はチャネル同意画面でエンドユーザーに表示されます。

![LINEミニアプリを提供する地域と、サービス事業主の所在国・地域が同一であることを表明し、保証します。](https://developers.line.biz/media/line-mini-app/configuring-country-or-region-ja.png)

:::note warn
作成済みのLINEミニアプリチャネルの［会社・事業者の所在国・地域］は編集できません。

:::

### LINE Developersコンソールで設定した内容が反映されるタイミングについて

LINEミニアプリチャネル作成時は、入力した設定内容が3つの内部チャネルにコピーされます。

LINEミニアプリが未認証ミニアプリの場合、LINE Developersコンソールで設定したときに、開発用チャネルの内容が本番用チャネルに反映されます。ただし、［**サービスメッセージテンプレート**］タブの内容や、［**ウェブアプリ設定**］タブの［**チャネル同意の簡略化**］については、認証審査に通過しない限り反映されません。

LINEミニアプリが認証済ミニアプリの場合、チャネル名やLIFFアプリのScope、友だち追加オプションなど、LINE Developersコンソールで設定を変更した場合、開発用の設定のみが変更されます。審査用、本番用には設定が反映されません。これは、開発用の内部チャネルで設定内容を自由に変更し、スムーズに開発を進めていただくための仕様です。

認証済ミニアプリにおいて、LINE Developersコンソールで変更した設定内容が、審査用、本番用に反映されるタイミングは、以下のとおりです。

| 内部チャネル | 設定が反映されるタイミング |
| --- | --- |
| 開発用 | LINE Developersコンソールで設定したときに反映されます。 |
| 審査用 | 審査開始時に、開発用LINEミニアプリの設定が反映（コピー）されます。 |
| 本番用 | 公開時に、開発用LINEミニアプリの設定が反映（コピー）されます。 |

### チャネル説明の入力について

［**チャネル基本設定**］タブの［**チャネル説明**］は、以下の2つの目的で使用されます。このため、正しいサービス内容を記載してください。

*   ユーザーがLINEミニアプリのサービス内容を把握するため
*   LINEヤフー株式会社による審査時に、LINEミニアプリのサービス内容を把握するため

![チャネル説明](https://developers.line.biz/media/line-mini-app/line-mini-app-channel-description-ja.png)

［**チャネル説明**］の入力例については、以下の表を参考にしてください。

|  | チャネル名 | チャネル説明 |
| --- | --- | --- |
| 悪い例 | LINE FRIENDSストア | LINE FRIENDSストアは、LINEキャラクターグッズのお店です。 |
| 良い例 | LINE FRIENDSストア | LINE FRIENDSストアにおいて、事前注文・決済ができ、店舗で商品を受け取れるモバイルオーダーサービスです。 |

## 3つのLINEミニアプリの動作差異について

開発用LINEミニアプリ、審査用LINEミニアプリ、本番用LINEミニアプリでは、一部の画面表示が異なります。

| LINEミニアプリ | ヘッダーのサブテキスト[（参考）](https://developers.line.biz/ja/docs/line-mini-app/discover/ui-components/#header) |
| --- | --- |
| 開発用のLINEミニアプリ | 表示中のページのドメインが**常に**表示されます。 |
| 審査用のLINEミニアプリ | 表示中のページのドメインが**常に**表示されます。 |
| 本番用のLINEミニアプリ | 未認証ミニアプリの場合、そのページのドメインが表示されます。認証済ミニアプリの場合、LINEミニアプリ名と認証バッジが表示されます。 |