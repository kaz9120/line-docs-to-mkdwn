---
url: https://developers.line.biz/ja/docs/line-mini-app/develop/add-to-home-screen/
copied_at: 2025-10-23T16:01:21.034Z
---
# ユーザー端末のホーム画面にLINEミニアプリへのショートカットを追加する

:::note info
認証済ミニアプリでのみ利用できます

:::

ユーザー端末のホーム画面にLINEミニアプリへのショートカットを追加できます。

[アクションボタン](https://developers.line.biz/ja/docs/line-mini-app/discover/builtin-features/#action-button)から[マルチタブビュー](https://developers.line.biz/ja/docs/line-mini-app/discover/builtin-features/#multi-tab-view)を開き［**ホーム画面に追加**］をタップするか、[`liff.createShortcutOnHomeScreen()`](https://developers.line.biz/ja/reference/liff/#create-shortcut-on-home-screen)メソッドを使うと、ショートカット追加画面が表示されます。ユーザーは、画面上の指示に従うことで、端末のホーム画面にLINEミニアプリへのショートカットを追加できます。これにより、ユーザー端末のホーム画面からLINEミニアプリに直接アクセスできるようになります。

**Android端末での表示**

:::note warn
一部のAndroid端末において、追加済みのショートカットが削除される場合があります

:::

![](https://developers.line.biz/media/line-mini-app/develop/add-to-home-screen/add-shortcut-screen-android-ja.png)![](https://developers.line.biz/media/line-mini-app/develop/add-to-home-screen/shortcut-android.png)

**iOS端末での表示**

![](https://developers.line.biz/media/line-mini-app/develop/add-to-home-screen/add-shortcut-screen-ios-ja.png)![](https://developers.line.biz/media/line-mini-app/develop/add-to-home-screen/shortcut-ios-ja.png)

会員証やモバイルオーダーなど、ユーザーの利用頻度の高いサービスでこの機能を活用することで、ユーザー体験を向上させることができます。

## 動作条件

ユーザー端末のOSがiOSの場合、［**ホーム画面に追加**］や`liff.createShortcutOnHomeScreen()`メソッドが動作する条件は以下のとおりです。動作しない環境において［**ホーム画面に追加**］をタップしたり、`liff.createShortcutOnHomeScreen()`メソッドを実行したりすると、エラーページが表示されます。

| デフォルトのブラウザ | iOSのバージョン | 動作するかどうか |
| --- | --- | --- |
| Safari | すべてのバージョン | 動作する |
| Chrome | 16.4以降 | 動作する |
| Safari、Chrome以外のブラウザ | 16.4以降 | 動作は保証されない |
| Safari以外のブラウザ | 16.4未満 | 動作しない |

たとえば、iOS 16.4未満において、Chromeで`liff.createShortcutOnHomeScreen()`メソッドを実行した場合は、以下のエラーページが表示されます。

![](https://developers.line.biz/media/line-mini-app/develop/add-to-home-screen/add-shortcut-screen-ios-error-ja.png)