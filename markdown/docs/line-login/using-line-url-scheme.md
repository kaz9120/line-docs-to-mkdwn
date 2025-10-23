---
url: https://developers.line.biz/ja/docs/line-login/using-line-url-scheme/
copied_at: 2025-10-23T15:58:44.868Z
---
# LINE URLスキームでLINEの機能を使う

LINE URLスキームを使うと、スタンプショップやLIFFアプリを開いたり、カメラを起動したりできます。LINE URLスキームは、LINE公式アカウントでも利用できます。たとえば、[リッチメニュー](https://developers.line.biz/ja/docs/messaging-api/using-rich-menus/)にLINE URLスキームを開く[アクション](https://developers.line.biz/ja/reference/messaging-api/#uri-action)を設定しておくことで、メニューをタップしたユーザーに対してLINE内のコンテンツを表示できます。

## サポートされているLINE URLスキーム

サポートされているLINE URLスキームは、以下のとおりです。

| URLスキーム | 説明 |
| --- | --- |
| `https://line.me/R/`で始まるURLスキーム | LINEアプリの機能を使うためのURLスキーム |
| `https://liff.line.me/`で始まるURLスキーム | [LIFFアプリ](https://developers.line.biz/ja/docs/liff/overview/)を開くためのURLスキーム |
| `https://miniapp.line.me/`で始まるURLスキーム | [LINEミニアプリ](https://developers.line.biz/ja/docs/line-mini-app/discover/introduction/)を開くためのURLスキーム |

:::note alert
「line://」は非推奨です

:::

:::note warn
LINE以外のネイティブアプリを起動するURLスキームはLINEヤフー株式会社では提供していません

:::

## LINE URLスキームをクリックしたときの動作

ユーザーがLINE URLスキームを使ったURLにアクセスすると、LINEが自動的に起動してURLで指定されたコンテンツが表示されます。ユーザーがLINEをインストールしていない場合の動作は、LINE URLスキームごとに異なります。

| LINE URLスキーム | LINEをインストールしていない場合の動作 |
| --- | --- |
| `https://line.me/R/` | ウェブブラウザが開き、LINEのダウンロードを求めるページが開く。 |
| `line://`（非推奨） | 何も起きないか、エラーページが開く。 |

## 動作環境

LINE URLスキームは、iOS版LINEまたはAndroid版LINEをインストールしたスマートフォンで利用できます。

:::note warn
注意

:::

## LINEで利用できるURLスキーム

LINEで利用できるURLスキームは以下のとおりです。なお、指定の動作環境でのみサポートされているLINE URLスキームについては、それぞれの項目内に記載しています。

*   [カメラとカメラロールを開く](#opening-the-camera-and-camera-roll)
*   [位置情報を送る](#sending-the-location-screen)
*   [LINE公式アカウントをシェアする](#sharing-line-official-account)
*   [LINE公式アカウントのLINE VOOMやプロフィールを開く](#opening-line-voom-and-profile)
*   [LINE公式アカウントとのトーク画面を開く](#opening-chat-screen)
*   [テキストメッセージを送る](#sending-text-messages)
*   [プロフィール情報を開く](#opening-profile-information)
*   [その他の画面を開く](#opening-common-line-app-screens)
*   [設定画面を開く](#opening-line-app-settings-screens)
*   [スタンプショップを開く](#opening-the-sticker-shop)
*   [着せかえショップを開く](#opening-the-theme-shop)
*   [LIFFアプリを開く](#opening-a-liff-app)
*   [URLを外部ブラウザで開く](#opening-url-in-external-browser)

### カメラとカメラロールを開く

このLINE URLスキームを使うと、カメラまたはカメラロールを開くことができます。カメラロールは、ユーザーがトークに送信する画像を選択する画面です。

:::note warn
カメラまたはカメラロールを開く際の制限事項

:::

![](https://developers.line.biz/media/messaging-api/using-line-url-scheme/camera-screen.png)

![](https://developers.line.biz/media/messaging-api/using-line-url-scheme/camera-roll.png)

| LINE URLスキーム | 説明 |
| --- | --- |
| `https://line.me/R/nv/camera/` | カメラを開きます。前面カメラ（インカメラ）と背面カメラ（アウトカメラ）など複数のカメラが搭載されているスマートフォンの場合、使用するカメラを指定することはできません。 |
| `https://line.me/R/nv/cameraRoll/single` | カメラロールを開きます。トーク内で共有する画像を1つ選択できます。 |
| `https://line.me/R/nv/cameraRoll/multi` | カメラロールを開きます。トーク内で共有する画像を複数選択できます。 |

### 位置情報を送る

このLINE URLスキームを使うと、「位置情報」画面を開き、位置情報をLINE公式アカウントに送信できます。

:::note warn
「位置情報」画面を開く際の制限事項

:::

![](https://developers.line.biz/media/messaging-api/using-line-url-scheme/location.png)

| LINE URLスキーム | 説明 |
| --- | --- |
| `https://line.me/R/nv/location/` | 「位置情報」画面を開きます。ユーザーは、地図にピンを刺してシェアする位置情報を選択できます。 |

### LINE公式アカウントをシェアする

このLINE URLスキームを使うと、指定したLINE公式アカウントをユーザーやユーザーの友だちにおすすめして、LINE公式アカウントを友だち追加するように促すことができます。

![](https://developers.line.biz/media/messaging-api/using-line-url-scheme/bot-add-friend-ja.png)

| LINE URLスキーム | 説明 |
| --- | --- |
| https://line.me/R/ti/p/`{Percent-encoded LINE ID}` | 指定したLINE公式アカウントのプロフィールを開きます。LINE公式アカウントとすでに友だちだった場合は、1対1のトーク画面を開きます。 |
| https://line.me/R/nv/recommendOA/`{Percent-encoded LINE ID}` | 「送信先を選択」画面を開きます。友だち、グループトーク、または複数人トークを選択してLINE公式アカウントのリンクをシェアできます。 |

:::note warn
「Percent-encoded LINE ID」はパーセントエンコードしてください

:::

:::note info
LINE公式アカウントのLINE IDを確認するには？

:::

:::note info
パソコンのブラウザで開いた場合

:::

### LINE公式アカウントのLINE VOOMやプロフィールを開く

このLINE URLスキームを使うと、LINE公式アカウントのLINE VOOMやプロフィールを開くことができます。

![](https://developers.line.biz/media/messaging-api/using-line-url-scheme/bot-line-voom.png)

| LINE URLスキーム | 説明 |
| --- | --- |
| https://line.me/R/home/public/main?id=`{LINE ID without @}` | 指定したLINE公式アカウントのLINE VOOMを開きます。 |
| https://line.me/R/home/public/profile?id=`{LINE ID without @}` | 指定したLINE公式アカウントのプロフィールを開きます。 |
| https://line.me/R/home/public/post?id=`{LINE ID without @}`&postId=`{postId}` | 指定したLINE公式アカウントの特定のLINE VOOMの投稿を開きます。各投稿のIDは、[LINE VOOM Studio](https://voom-studio.line.biz/)で確認できます。 |

:::note warn
このURLスキームではLINE IDの先頭の@を含めないでください

:::

:::note info
LINE公式アカウントのLINE IDを確認するには？

:::

:::note info
LINE VOOMへの投稿とプロフィールのカスタマイズ

:::

### LINE公式アカウントとのトーク画面を開く

このLINE URLスキームを使うと、LINE公式アカウントとのトーク画面を開くことができます。

| LINE URLスキーム | 説明 |
| --- | --- |
| https://line.me/R/oaMessage/`{Percent-encoded LINE ID}` | LINE公式アカウントとのトーク画面を開きます。 |
| https://line.me/R/oaMessage/`{Percent-encoded LINE ID}`/?`{text_message}` | `{text_message}`に設定したテキストメッセージがメッセージ入力欄に入力された状態で、LINE公式アカウントとのトーク画面を開きます。 |

:::note warn
「Percent-encoded LINE ID」と「text_message」はパーセントエンコードしてください

:::

:::note info
LINE公式アカウントのLINE IDを確認するには？

:::

### テキストメッセージを送る

このLINE URLスキームを使うと、ユーザーの友だちまたはLINE公式アカウントに送信するテキストメッセージを設定できます。

| LINE URLスキーム | 説明 |
| --- | --- |
| https://line.me/R/share?text=`{text_message}` | 「送信先を選択」画面を開きます。ユーザーは、友だち、グループトーク、または複数人トークを選択して、`{text_message}`に設定されたテキストメッセージを送信できます。テキストはKeepメモやLINE VOOM、他のアプリにも送信できます。 |

:::note warn
「text_message」はパーセントエンコードしてください

:::

### プロフィール情報を開く

このLINE URLスキームを使うと、ユーザーの「プロフィール」画面を開きます。この画面では、表示名、ステータスメッセージ、およびLINE IDを設定できます。また、さまざまなLINEプロフィール情報を確認できます。

![](https://developers.line.biz/media/messaging-api/using-line-url-scheme/my-profile.png)

| LINE URLスキーム | 説明 |
| --- | --- |
| `https://line.me/R/nv/profile` | ユーザーの「プロフィール」画面を開きます。 |
| `https://line.me/R/nv/profileSetId` | ユーザーの「ID」画面を開きます。LINE IDが未設定の場合は、LINE IDを設定できます。 |

### その他の画面を開く

このLINE URLスキームを使うと、トークタブを含むLINEのさまざまな画面を開きます。

![](https://developers.line.biz/media/messaging-api/using-line-url-scheme/shopping-tab-ja.png)

| LINE URLスキーム | 説明 |
| --- | --- |
| `https://line.me/R/nv/chat` | トークタブを開きます。 |
| `https://line.me/R/nv/commerce` | ショッピングタブを開きます。 |
| `https://line.me/R/nv/wallet` | ウォレットタブを開きます。 |
| `https://line.me/R/nv/addFriends` | 「友だち追加」画面を開きます。 |
| `https://line.me/R/nv/officialAccounts` | 「LINE公式アカウント」画面を開きます。 |
| `https://line.me/R/nv/timeline` | LINE VOOMの「フォロー中」画面を開きます。 |

### 「設定」画面を開く

このLINE URLスキームを使うと、LINEのさまざまな設定画面を開きます。

![](https://developers.line.biz/media/messaging-api/using-line-url-scheme/settings.png)

| LINE URLスキーム | 説明 |
| --- | --- |
| `https://line.me/R/nv/settings` | 「設定」画面を開きます。 |
| `https://line.me/R/nv/settings/account` | 「アカウント」設定画面を開きます。ユーザーのLINEアカウント情報が表示されます。 |
| `https://line.me/R/nv/connectedApps` | 「アカウント」 > 「連動アプリ」設定画面を開きます。この画面では、認証済みアプリに付与されている権限を確認したり、アプリの連動を解除したりできます。 |
| `https://line.me/R/nv/connectedDevices` | 「アカウント」 >「ログイン中の端末」設定画面を開きます。 |
| `https://line.me/R/nv/settings/privacy` | 「プライバシー管理」の設定画面を開きます。 |
| `https://line.me/R/nv/things/deviceLink` | 「LINE Things」設定画面を開きます。LINEとデバイスを連携したり、連携済みのデバイスを確認したりする画面です。 |
| `https://line.me/R/nv/settings/sticker` | 「スタンプ」設定画面を開きます。 |
| `https://line.me/R/nv/stickerShop/mySticker` | 「スタンプ」 > 「マイスタンプ」設定画面を開きます。 |
| `https://line.me/R/nv/settings/themeSettingsMenu`（iOS）、`https://line.me/R/nv/settings/theme`（Android） | 「着せかえ」設定画面を開きます。<br/>iOSとAndroidでスキームが異なります。 |
| `https://line.me/R/nv/themeSettings` | 「着せかえ」 > 「マイ着せかえ」設定画面を開きます。 |
| `https://line.me/R/nv/notificationServiceDetail` | 「通知」 > 「連動アプリ」設定画面を開きます。この画面では、連動アプリの通知設定を設定できます。 |
| `https://line.me/R/nv/settings/chatSettings` | 「トーク」設定画面を開きます。 |
| `https://line.me/R/nv/suggestSettings` | 「トーク」 > 「サジェスト表示」設定画面を開きます。 |
| `https://line.me/R/nv/settings/callSettings` | 「通話」設定画面を開きます。 |
| `https://line.me/R/nv/settings/addressBookSync` | 「友だち」設定画面を開きます。 |
| `https://line.me/R/nv/settings/timelineSettings` | 「LINE VOOM」設定画面を開きます。 |

### スタンプショップを開く

このLINE URLスキームを使うと、公式スタンプやクリエイターズスタンプの購入を促すために、LINE内でスタンプショップを開くことができます。

![](https://developers.line.biz/media/messaging-api/using-line-url-scheme/sticker-shop-categories.png)

| LINE URLスキーム | 説明 |
| --- | --- |
| https://line.me/R/shop/sticker/detail/`{package_id}` | 指定されたスタンプの「スタンプ情報」画面を開きます。`{package_id}`には、[LINE STORE](https://store.line.me/)のスタンプページのURLに含まれる数字を指定します。 |
| https://line.me/R/shop/category/`{category_id}` | 「公式スタンプ」セクション内の指定されたカテゴリの人気ランキングが表示されます。`{category_id}`には、[LINE STORE](https://store.line.me/)の「公式スタンプ」セクション内のカテゴリページのURLに含まれる数字を指定します。 |
| https://line.me/R/shop/sticker/author/`{author_id}` | 指定された作成者のスタンプリストを開きます。`{author_id}`には、[LINE STORE](https://store.line.me/)のスタンプの作成者ページのURLに含まれる数字を指定します。 |
| `https://line.me/R/nv/stickerShop` | スタンプショップのホームタブを開きます。 |
| `https://line.me/R/shop/sticker/hot` | スタンプショップの人気タブを開きます。 |
| `https://line.me/R/shop/sticker/new` | スタンプショップの新着タブを開きます。 |
| `https://line.me/R/shop/sticker/event` | スタンプショップの無料タブを開きます。 |
| `https://line.me/R/shop/sticker/category` | スタンプショップのカテゴリータブを開きます。 |

:::note info
独自のスタンプセットを作成するには？

:::

### 着せかえショップを開く

このLINE URLスキームを使うと、公式着せかえやクリエイターズ着せかえの購入を促すために、LINE内で着せかえショップを開くことができます。

![](https://developers.line.biz/media/messaging-api/using-line-url-scheme/theme-shop.png)

| LINE URLスキーム | 説明 |
| --- | --- |
| https://line.me/R/shop/theme/detail?id=`{product_id}` | 指定された公式着せかえ、またはクリエイターズ着せかえの「着せかえ情報」画面を開きます。`{product_id}`には、[LINE STORE](https://store.line.me/)の、着せかえページのURLに含まれるIDを指定します。たとえば、「[マットホワイト](https://store.line.me/themeshop/product/0bac8fed-4c75-40c5-9982-e9ecc3b9d191/ja)`https://store.line.me/themeshop/product/0bac8fed-4c75-40c5-9982-e9ecc3b9d191/ja`」を開く場合、`0bac8fed-4c75-40c5-9982-e9ecc3b9d191`を指定します。 |

### LIFFアプリを開く

このLINE URLスキームを使うと、指定したLIFFアプリを開くことができます。LIFFアプリは、[LINE Front-end Framework（LIFF）](https://developers.line.biz/ja/docs/liff/overview/)を利用して動作するウェブアプリです。

![](https://developers.line.biz/media/messaging-api/using-line-url-scheme/liff-app.png)

| LINE URLスキーム | 説明 |
| --- | --- |
| https://liff.line.me/`{liffId}` | 指定したLIFF IDのLIFFアプリを開きます。このURLスキームを、LIFF URLと呼びます。 |
| https://liff.line.me/`{liffId}`/path\_A/path\_B/?key1=value1&key2=value2 | 指定したLIFF IDでLIFFアプリを開きます。`/path_A/path_B/?key1=value1&key2=value2`を追加情報として渡します。 |

LIFFアプリが開くまでの処理について詳しくは、『LIFFドキュメント』の「[LIFFアプリを開く](https://developers.line.biz/ja/docs/liff/opening-liff-app/)」を参照してください。

:::note warn
「https://line.me/R/app/{liffId}」および「line://app/{liffId}」は非推奨です

:::

### URLを外部ブラウザで開く

クエリパラメータを使うと、[LINE内ブラウザ](https://developers.line.biz/ja/glossary/#line-iab)の代わりに[外部ブラウザ](https://developers.line.biz/ja/glossary/#external-browser)でURLを開くことができます。

:::note warn
これらのクエリパラメータはLIFFアプリではサポートされません

:::

| クエリパラメータ付きのURL | 説明 |
| --- | --- |
| https://example.com/?`openExternalBrowser=1` | 対象のURLを外部ブラウザで開きます。 |
| https://example.com/?`openInAppBrowser=0` | 対象のURLをChromeカスタムタブで開きます。（Android版LINEのみ対応） |