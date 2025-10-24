---
url: https://developers.line.biz/ja/docs/line-mini-app/discover/builtin-features/
copied_at: 2025-10-24T10:17:03.412Z
---
# ビルトイン機能

LINEミニアプリには、以下のビルトイン機能が組み込まれています。

*   [アクションボタン](#action-button)
*   [マルチタブビュー](#multi-tab-view)
    *   [オプション](#multi-tab-view-option)
    *   [最近使用したサービス](#multi-tab-view-recent-service)
*   [チャネル同意画面](#consent-screen)

## アクションボタン

LINEミニアプリのすべてのページに表示される[ヘッダー](https://developers.line.biz/ja/docs/line-mini-app/discover/ui-components/#header)には、デフォルトでアクションボタンが表示されます。

![](https://developers.line.biz/media/line-mini-app/discover/mini-header-action-butoon-ja.png)

アクションボタンを押すと、[マルチタブビュー](#multi-tab-view)または[オプション](#multi-tab-view-option)のどちらかがLINEアプリのバージョンに応じて表示されます。LINEバージョン15.12.0以降ではマルチタブビューが表示され、LINEバージョン15.12.0未満ではオプションが表示されます。

> [!TIP]
> ヒント
> *   [カスタムアクションボタン](https://developers.line.biz/ja/docs/line-mini-app/discover/custom-features/#custom-action-button)を実装すれば、LINEミニアプリの好きな場所に、好きな形式のシェア機能を実装できます。
> *   LINEミニアプリを閉じずに複数のトークルームを行き来するための機能など、新しい機能を追加する予定です。
> *   LINEミニアプリでは、アクションボタンを非表示にすることはできません。LINEミニアプリチャネルに追加されているLIFFアプリでは、［**モジュールモード**］は設定できません。

## マルチタブビュー

マルチタブビューには、使用中のLINEミニアプリのオプションと最近使用したサービスが表示されます。

1.  [オプション](#multi-tab-view-option)
2.  [最近使用したサービス](#multi-tab-view-recent-service)

![](https://developers.line.biz/media/line-mini-app/discover/mini-multi-tab-view-ja.png)

### オプション

以下のオプションが、ユーザーのLINEアプリの設定言語で表示されます。

| 項目 | 説明 |
| --- | --- |
| **シェア** | 現在開いているページのLIFF URLまたはパーマネントリンクをLINEメッセージでシェアします。現在開いているページがLINEミニアプリのエンドポイントURLから始まらない場合、代わりにLINEミニアプリのLIFF URLをシェアします。メッセージには、以下の要素が含まれます。<ul><li>URL：現在開いているページのパーマネントリンク</li><li>タイトル：<a href="/console/" class="">LINE Developersコンソール</a>の［<strong>ウェブアプリ設定</strong>］タブの［<strong>LIFFアプリ名</strong>］に入力した名前</li><li>詳細：自動的に設定されたテキスト</li><li>画像：<a href="/console/" class="">LINE Developersコンソール</a>の［<strong>チャネル基本設定</strong>］タブの［<strong>チャネルアイコン</strong>］に設定した画像</li></ul> |
| **ホーム画面に追加** | 現在開いているページへのショートカット追加画面を表示します。現在開いているページがLINEミニアプリのエンドポイントURLから始まらない場合、エラーになります。LINEバージョン14.3.0以降の認証済ミニアプリでのみ利用できます。詳しくは、「[ユーザー端末のホーム画面にLINEミニアプリへのショートカットを追加する](https://developers.line.biz/ja/docs/line-mini-app/develop/add-to-home-screen/)」を参照してください。 |
| **ページを最小化** | LIFFブラウザを最小化します。認証済ミニアプリでのみ利用できます。詳しくは『LIFFドキュメント』の「[LIFFブラウザを最小化する](https://developers.line.biz/ja/docs/liff/minimizing-liff-browser/)」を参照してください。 |
| **サービス提供元の詳細** | [プロバイダーページ](https://developers.line.biz/ja/docs/partner-docs/provider-page/)を表示します。認証済ミニアプリでのみ利用できます。 |
| **更新** | 現在開いているページを再読み込みします。 |
| **権限設定** | 
権限設定画面を開きます。権限設定画面では、現在開いているLINEミニアプリのカメラやマイクへのアクセス権を確認、変更できます。LINEバージョン14.6.0以降で利用できます。

ユーザーが権限を変更しても、LINEミニアプリ側でページを再読み込みしない限り、変更の内容が反映されない場合があるため注意してください。

 |

> [!WARNING]
> 注意
> 現在開いているページをシェアするには、LINEミニアプリに対応するLINEバージョンでアクションボタンをタップする必要があります。ユーザーが使用しているLINEのバージョンが、LINEミニアプリの[対応バージョン](https://developers.line.biz/ja/docs/line-mini-app/discover/specifications/#supported-platforms-and-versions)未満の場合は、アクションボタンをタップしたページに関わらず、LINEミニアプリのトップページがシェアされます。

### 最近使用したサービス

最近使用したサービスにはユーザーが開いたLINEミニアプリとLIFFアプリが、利用履歴の新しい順に最大50件まで表示されます。ユーザーは利用履歴を使って、LINEミニアプリやLIFFアプリを再度開くことができます。

詳しくは、『LIFFドキュメント』の「[最近使用したサービス](https://developers.line.biz/ja/docs/liff/overview/#multi-tab-view-recent-service)」を参照してください。

## チャネル同意画面

チャネル同意画面は、ユーザーが初めてLINEミニアプリを利用するときに表示されます。チャネル同意画面では、LINEミニアプリごとにアクセス権限を付与するかどうかをユーザーに確認します。

LINEミニアプリが認証済ミニアプリの場合は、LINEミニアプリ名の横に認証バッジが表示されます。また、LINEミニアプリの提供者が認証プロバイダーでない場合は、「LINEヤフー株式会社は提供元を確認していません。」という注意書きが表示されます。

![](https://developers.line.biz/media/line-mini-app/mini-permission-request-ja.png)

すべてのLINEミニアプリはデフォルトで以下の権限を要求します。

*   ユーザーのプロフィール情報を取得する権限
*   トークへのメッセージを送信する権限

> [!WARNING]
> 注意
> チャネル同意画面では、LINEヤフー株式会社によって承認された権限のみを、ユーザーに要求できます。 [LINE Developersコンソール](https://developers.line.biz/console/)のLINEミニアプリチャネルの設定で、ユーザーに権限を要求する項目を指定できます。