---
url: https://developers.line.biz/ja/docs/line-mini-app/develop/configure-console/
copied_at: 2025-10-24T06:29:41.651Z
---
# LINE DevelopersコンソールでLINEミニアプリの設定を管理する

[LINE Developersコンソール](https://developers.line.biz/console/)に登録した一部の情報は、LINEミニアプリのユーザーに表示されます。

#### プロバイダー設定

LINEミニアプリチャネルが属するプロバイダーの設定のうち、ユーザーに表示される情報は以下のとおりです。

［**プロバイダー設定**］タブ：

| 項目 | 画面 |
| --- | --- |
| **プロバイダー名** | [チャネル同意画面](#consent-screen-settings) |

#### チャネル設定

LINEミニアプリチャネルの設定のうち、ユーザーに表示される情報は以下のとおりです。

［**チャネル基本設定**］タブ：

| 項目 | 表示される画面 |
| --- | --- |
| **チャネルアイコン** | <ul><!--[--><li><!--[--><a href="#built-in-share-settings" class=""><!--[--><!--[-->アクションボタン<!--]--><!--]--></a><!--]--></li><li><!--[--><a href="#multi-tab-view-settings" class=""><!--[--><!--[-->マルチタブビュー<!--]--><!--]--></a><!--]--></li><li><!--[--><a href="#consent-screen-settings" class=""><!--[--><!--[-->チャネル同意画面<!--]--><!--]--></a><!--]--></li><li><!--[--><a href="#footer-secition-of-service-message" class=""><!--[--><!--[-->サービスメッセージのフッターセクション<!--]--><!--]--></a><!--]--></li><li><!--[--><a href="#add-shortcut-screen" class=""><!--[--><!--[-->ショートカット追加画面<!--]--><!--]--></a><!--]--></li><!--]--></ul>※ LINEミニアプリのアイコンとしてユーザーに認識される画像です。 |
| **チャネル名** | <ul><!--[--><li><!--[--><a href="#built-in-share-settings" class=""><!--[--><!--[-->アクションボタン<!--]--><!--]--></a><!--]--></li><li><!--[--><a href="#multi-tab-view-settings" class=""><!--[--><!--[-->マルチタブビュー<!--]--><!--]--></a><!--]--></li><li><!--[--><a href="#consent-screen-settings" class=""><!--[--><!--[-->チャネル同意画面<!--]--><!--]--></a><!--]--></li><li><!--[--><a href="#footer-secition-of-service-message" class=""><!--[--><!--[-->サービスメッセージのフッターセクション<!--]--><!--]--></a><!--]--></li><li><!--[--><a href="#add-shortcut-screen" class=""><!--[--><!--[-->ショートカット追加画面<!--]--><!--]--></a><!--]--></li><!--]--></ul>※ LINEミニアプリ名としてユーザーに認識されるテキストです。［**チャネル名**］は、［**ウェブアプリ設定**］タブ > ［**LIFFアプリ名**］にコピーされます。 |
| **チャネル説明** | [チャネル同意画面](#consent-screen-settings) |
| **プライバシーポリシーURL** | [チャネル同意画面](#consent-screen-settings) |
| **多言語対応** | [チャネル同意画面](#consent-screen-settings) |

［**ウェブアプリ設定**］タブ：

| 項目 | 表示される画面 |
| --- | --- |
| **エンドポイントURL** | [ショートカット追加画面](#add-shortcut-screen) |

## アクションボタン

ユーザーが[アクションボタン](https://developers.line.biz/ja/docs/line-mini-app/discover/builtin-features/#action-button)からLINEミニアプリのページをシェアしたときに、[LINE Developersコンソール](https://developers.line.biz/console/)に登録した以下の情報が、送信先のトークルームに表示されます。

![アクションボタン](https://developers.line.biz/media/line-mini-app/mini_share_builtin_share.png)

| 情報 | 設定 |
| --- | --- |
| LINEミニアプリ名 | ［**チャネル基本設定**］タブ > ［**チャネル名**］ |
| LINEミニアプリのアイコン | ［**チャネル基本設定**］タブ > ［**チャネルアイコン**］ |

## マルチタブビュー

ユーザーが[アクションボタン](https://developers.line.biz/ja/docs/line-mini-app/discover/builtin-features/#action-button)を押したときに、[LINE Developersコンソール](https://developers.line.biz/console/)に登録した以下の情報が、[マルチタブビュー](https://developers.line.biz/ja/docs/line-mini-app/discover/builtin-features/#multi-tab-view)に表示されます。

![](https://developers.line.biz/media/line-mini-app/develop/mini-multi-tab-view-config-ja.png)

| 情報 | 設定 |
| --- | --- |
| LINEミニアプリ名 | ［**チャネル基本設定**］タブ > ［**チャネル名**］ |
| LINEミニアプリのアイコン | ［**チャネル基本設定**］タブ > ［**チャネルアイコン**］ |

## チャネル同意画面

[LINE Developersコンソール](https://developers.line.biz/console/)に登録した以下の情報が、[チャネル同意画面](https://developers.line.biz/ja/docs/line-mini-app/discover/builtin-features/#consent-screen)に表示されます。

![チャネル同意画面](https://developers.line.biz/media/line-mini-app/mini-permission-request-ja.png)

| 情報 | 設定 |
| --- | --- |
| LINEミニアプリのアイコン | ［**チャネル基本設定**］タブ > ［**チャネルアイコン**］ |
| LINEミニアプリ名 | ［**チャネル基本設定**］タブ > ［**チャネル名**］<br/>英語で入力してください。日本語など、ほかの言語でLINEミニアプリ名を入力するには、「[チャネル同意画面の多言語対応について](#localization)」を参照してください。 |
| プロバイダー名 | LINEミニアプリチャネルが属するプロバイダーの［**プロバイダー設定**］タブ > ［**プロバイダー名**］ |
| 説明 | ［**チャネル基本設定**］タブ > ［**チャネル説明**］<br/>英語で入力してください。日本語など、ほかの言語で説明を入力するには、「[チャネル同意画面の多言語対応について](#localization)」を参照してください。 |
| プライバシーポリシーページのURL | ［**チャネル基本設定**］タブ > ［**プライバシーポリシーURL**］ |

> [!WARNING]
> 説明に含めなければいけない情報
> LINEミニアプリの開発を外部委託した場合など、LINEミニアプリのサービス事業主と開発担当企業が異なる場合は、［**チャネル説明**］には以下の内容を明記してください。
> 
> *   サービス事業主名
> *   開発担当企業名
> *   LINEミニアプリを通じて取得されたユーザーの個人情報をほかの企業に提供する場合、実際の企業名

### チャネル同意画面の多言語対応について

チャネル同意画面のLINEミニアプリ名と説明は、ユーザーがLINEで設定した言語で表示されます。たとえば、ユーザーがLINEの言語を日本語に設定していた場合は、［**日本語**］に設定したチャネル名とチャネル説明が表示されます。

| 情報 | 設定 |
| --- | --- |
| LINEミニアプリ名 | ［**チャネル基本設定**］タブ > ［**多言語対応**］ > ［**チャネル名**］ |
| 説明 | ［**チャネル基本設定**］タブ > ［**多言語対応**］ > ［**チャネル説明**］ |

> [!WARNING]
> 注意
> *   LINEミニアプリでサービスを提供している国で使用されている主な言語に対応してください。
> *   ユーザーがLINEで設定した言語に対応する情報が［**多言語対応**］で設定されていない場合は、［**チャネル名**］と［**チャネル説明**］に設定した英語の情報が表示されます。

## サービスメッセージのフッターセクション

[LINE Developersコンソール](https://developers.line.biz/console/)に登録した以下の情報が、サービスメッセージのフッターセクションに表示されます。サービスメッセージについて詳しくは、「[サービスメッセージを送信する](https://developers.line.biz/ja/docs/line-mini-app/develop/service-messages/)」を参照してください。

![サービスメッセージ](https://developers.line.biz/media/line-mini-app/mini_service_notifier.png)

| 情報 | 設定 |
| --- | --- |
| LINEミニアプリ名 | ［**チャネル基本設定**］タブ > ［**チャネル名**］ |
| 画像 | ［**チャネル基本設定**］タブ > ［**チャネルアイコン**］ |

## ショートカット追加画面

[LINE Developersコンソール](https://developers.line.biz/console/)に登録した以下の情報が、ショートカット追加画面に表示されます。ショートカット追加画面について詳しくは、「[ユーザー端末のホーム画面にLINEミニアプリへのショートカットを追加する](https://developers.line.biz/ja/docs/line-mini-app/develop/add-to-home-screen/)」を参照してください。

![](https://developers.line.biz/media/line-mini-app/develop/add-to-home-screen/add-shortcut-screen-ios-ja.png)

| 情報 | 設定 |
| --- | --- |
| LINEミニアプリ名 | ［**チャネル基本設定**］タブ > ［**チャネル名**］ |
| LINEミニアプリのアイコン | ［**チャネル基本設定**］タブ > ［**チャネルアイコン**］ |
| LINEミニアプリのエンドポイントURL | ［**ウェブアプリ設定**］タブ > ［**エンドポイントURL**］ |