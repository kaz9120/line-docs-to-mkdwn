---
url: https://developers.line.biz/ja/docs/liff/release-notes/
copied_at: 2025-10-23T16:00:36.721Z
---
# リリースノート

## LIFFのバージョンとリリース日程

LIFF v2.2.0以降、LIFFのバージョンナンバーは[セマンティック バージョニング](https://semver.org/)（SemVer）で定められたルールに従います。詳しくは、「[バージョニングポリシー](https://developers.line.biz/ja/docs/liff/versioning-policy/)」を参照してください。

:::note info
CDNパス

:::

### 現在のバージョン

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を使用する場合は、常にLIFF v2の最新機能を利用できます。

[LIFF v2.27.2：2025年9月8日](#liff-v2-27-2)

### バージョンリスト

CDN固定パス（例：`https://static.line-scdn.net/liff/edge/versions/2.27.2/sdk.js`）を使用する場合は、LIFFの特定のバージョンの機能を利用できます。

*   [LIFFのバージョンとリリース日程](#liffのバージョンとリリース日程)
    *   [現在のバージョン](#現在のバージョン)
    *   [バージョンリスト](#version-list)
*   [LIFF v2.27.2をリリースしました](#liff-v2-27-2)
*   [LIFF v2.27.1をリリースしました](#liff-v2-27-1)
*   [LIFF v2.27.0をリリースしました](#liff-v2-27-0)
*   [LIFF v2.26.1をリリースしました](#liff-v2-26-1)
*   [LIFF v2.26.0をリリースしました](#liff-v2-26-0)
*   [LIFF v2.25.1をリリースしました](#liff-v2-25-1)
*   [LIFF v2.25.0をリリースしました](#liff-v2-25-0)
*   [LIFF v2.24.0をリリースしました](#liff-v2-24-0)
*   [LIFF v2.23.2をリリースしました](#liff-v2-23-2)
*   [LIFF v2.23.1をリリースしました](#liff-v2-23-1)
*   [LIFF v2.23.0をリリースしました](#liff-v2-23-0)
*   [LIFF v2.22.4をリリースしました](#liff-v2-22-4)
*   [LIFF v2.22.3をリリースしました](#liff-v2-22-3)
*   [LIFF v2.22.2をリリースしました](#liff-v2-22-2)
*   [LIFF v2.22.1をリリースしました](#liff-v2-22-1)
*   [LIFF v2.22.0をリリースしました](#liff-v2-22-0)
*   [LIFF v2.21.4をリリースしました](#liff-v2-21-4)
*   [LIFF v2.21.3をリリースしました](#liff-v2-21-3)
*   [LIFF v2.21.2をリリースしました](#liff-v2-21-2)
*   [LIFF v2.21.1をリリースしました](#liff-v2-21-1)
*   [LIFF v2.21.0をリリースしました](#liff-v2-21-0)
*   [LIFF v2.20.3をリリースしました](#liff-v2-20-3)
*   [LIFF v2.20.2をリリースしました](#liff-v2-20-2)
*   [LIFF v2.20.1をリリースしました](#liff-v2-20-1)
*   [LIFF v2.19.1をリリースしました](#liff-v2-19-1)
*   [LIFF v2.19.0をリリースしました](#liff-v2-19-0)
*   [LIFF v2.18.2をリリースしました](#liff-v2-18-2)
*   [LIFF v2.18.1をリリースしました](#liff-v2-18-1)
    *   [TypeScriptでビルド時にエラーが出る不具合を修正しました](#liff-sdk-typescript-2021-12-21)
*   [LIFF v2.18.0をリリースしました](#liff-v2-18-0)
    *   [LIFFアプリの任意のページのパーマネントリンクを取得できるようになりました](#liff-permanent-link-create-url-by-2021-12-09)
*   [LIFF v2.17.0をリリースしました](#liff-v2-17-0)
    *   [iOS版LINEでliff.openWindow()メソッドを実行すると、URLフラグメントの末尾に意図しないクエリパラメータが追加されたURLが開かれる不具合を修正しました](#liff-open-window-2021-11-11)
*   [LIFF v2.16.1をリリースしました](#liff-v2-16-1)
    *   [LIFF v2.14.0以降のCDN版のファイルサイズが肥大化する不具合を修正しました](#liff-sdk-file-size-2021-10-26)
    *   [webpack v5を使ったプロジェクトのビルド時にエラーが発生する不具合を修正しました](#webpack-v5-2021-10-26)
    *   [LIFF v2.16.1へのアップデート方法](#how-to-update-to-liff-v2-16-1-2021-10-16)
*   [LIFF v2.16.0をリリースしました](#liff-v2-16-0)
    *   [シェアターゲットピッカーに、送信先を複数にするか1人にするかを制御するオプションが追加されました](#liff-share-target-pecker-2021-10-06)
*   [2021年10月1日をもってLIFF v1を廃止しました](#liff-v1-discontinued)
    *   [対象バージョン](#対象バージョン)
    *   [廃止日](#廃止日)
    *   [影響](#影響)
*   [LIFF v2.15.0をリリースしました](#liff-v2-15-0)
    *   [二次元コードリーダー機能が追加されました](#liff-scan-code-v2-2021-09-30)
    *   [外部ブラウザでLIFFアプリ初期化時にliff.login()メソッドが自動で実行されるオプションが追加されました](#liff-init-auto-login-2021-09-30)
*   [2021年10月1日をもってLIFF v1を廃止します](#liff-v1-discontinue)
    *   [対象バージョン](#対象バージョン-1)
    *   [廃止日](#廃止日-1)
    *   [影響](#影響-1)
*   [LIFF v2.14.0をリリースしました](#liff-v2-14-0)
*   [LIFF v2.13.0をリリースしました](#liff-v2-13-0)
    *   [LINEミニアプリの同意画面をスキップできる「チャネル同意の簡略化」機能に対応しました](#channel-consent-simplification-2021-8-12)
    *   [npmパッケージ版LIFF SDKの一部不具合を修正しました](#npm-bug-fix-2021-8-12)
*   [LIFF v2.12.0をリリースしました](#liff-v2-12-0)
*   [LIFF v2.11.1をリリースしました](#liff-v2-11-1)
    *   [LIFFアプリ初期化後にURLフラグメントがURLエンコードされる不具合を修正しました](#Fixed-a-bug-that-caused-url-fragment-is-encoded)
*   [LIFF v2.11.0をリリースしました](#liff-v2-11-0)
    *   [liff.init()後に一次リダイレクト先URLから機密情報が除外されるようになりました](#exclude-credential-information)
*   [LIFF v2.10.0をリリースしました](#liff-v2-10-0)
    *   [外部ブラウザでLIFFアプリ初期化時に古いコンテキストトークンが参照される不具合を修正しました](#Fixed-a-bug-that-caused-old-context-tokens-to-be-called)
*   [LIFF v2.9.1をリリースしました](#liff-v2-9-1)
    *   [LIFF SDKのnpmパッケージ利用時の不具合を修正しました](#fixed-bug-that-occurs-when-using-liff-sdk-npm-package)
*   [LIFF v2.9.0をリリースしました](#liff-v2-9-0)
*   [LIFF v2.8.1をリリースしました](#liff-v2-8-1)
*   [LIFF v2.8.0をリリースしました](#liff-v2-8-0)
    *   [liff.init()が2次リダイレクト先URLにリダイレクトする前にresolveされる不具合を修正しました](#liff-resolve-fix)
    *   [URLエンコードされたクエリパラメータが意図せずデコードされる不具合を修正しました](#liff-decode-fix)
*   [LIFF v2.7.1をリリースしました](#liff-v2-7-1)
    *   [LIFF v2.7.0を使ったLIFFアプリが外部ブラウザで起動できない場合がある不具合を修正しました](#bug-fix-v-2-7-0)
*   [LIFF v2.7.0をリリースしました](#liff-v2-7-0)
    *   [RequireJSからnpmパッケージ版LIFF SDKを参照できるようになりました](#require-js)
    *   [liff.getDecodedIDToken()メソッドで取得したIDトークンのnameプロパティが文字化けする不具合を修正しました](#get-decoded-id-token)
*   [LIFF v2.6.0をリリースしました](#liff-v2-6-0)
*   [LIFF v2.5.0をリリースしました](#liff-v2-5-0)
    *   [liff.init()のパフォーマンスの向上](#improve-liff-init-performance)
    *   [セキュリティの強化を実施しました](#security-enhancement)
*   [LIFF v2.3.3をリリースしました](#liff-v2-3-3)
    *   [エンドポイントURLの末尾が/の場合に意図しないURLへリダイレクトされる不具合を修正しました](#liff-url-including-path-bug-fix)
*   [LIFF v2.4.1をリリースしました](#liff-v2-4-1)
    *   [LIFFアプリを閉じずに別のLIFFアプリを開く機能の不具合を修正しました](#liff-transition-bug-fix)
    *   [liff.isApiAvailable()でLIFF間遷移可能な状態か確認できるようになりました](#liff-transition-state)
    *   [liff.init()が二回呼びだされた際の動作を修正しました](#call-init-twice-fix)
*   [LIFF v2.3.2をリリースしました](#liff-v2-3-2)
    *   [LIFFエンドポイントURLに含まれるURLフラグメントがliff.permanentLink.createUrl()で正しく処理されない不具合を修正しました](#liff-create-url-error-fix-endpoint-v-2-3-2)
    *   [LIFFエンドポイントURLに含まれるクエリパラメータがliff.permanentLink.createUrl()で正しく処理されない不具合を修正しました](#liff-create-url-error-fix-query-parameter-v-2-3-2)
    *   [LIFFエンドポイントURLに含まれるパスがliff.permanentLink.createUrl()で正しく処理されない不具合を修正しました](#liff-create-url-redirect-url-fix-2-3-2)
    *   [2次リダイレクト先URLにフラグメントが含まれない不具合を修正しました](#liff-url-fragment-error-fix-v-2-3-2)
    *   [LIFF URLが意図しないURLへリダイレクトされる不具合を修正しました](#bug-fix-redirect-2-3-2)
*   [LIFF v2.2.1をリリースしました](#liff-v2-2-1)
*   [LIFF v2.1.14をリリースしました](#liff-v2-1-14)
*   [LIFF v2.4.0をリリースしました](#liff-v2-4-0)
    *   [LIFFアプリの初期化前でもliff.closeWindow()メソッドが実行できるようになりました](#liff-close-window)
    *   [LIFFアプリを閉じずに別のLIFFアプリを開くことができるようになりました](#liff-transition)
    *   [LIFF URLが意図しないURLへリダイレクトされる不具合を修正しました](#bug-fix-redirect)
    *   [liff.permanentLink.createUrl()の不具合を修正しました](#liff-create-url-error-fix)
    *   [2次リダイレクト先URLにフラグメントが含まれない不具合を修正しました](#liff-url-fragment-error-fix)
*   [LIFF v2.3.1をリリースしました](#liff-v2-3-1)
    *   [LIFF SDKのnpmパッケージのドキュメントの不具合を修正しました](#liff-npm-docs-fix)
    *   [LIFF SDKのnpmパッケージの利用手順を移動しました](#liff-npm-docs-move)
*   [LIFFのヘッダーに機能を追加しました](#liffのヘッダーに機能を追加しました)
    *   [LIFFアプリのアイコンが非表示になりました](#remove-liff-app-icon-07-15)
    *   [シェアボタンが表示されるようになりました](#liff-share-button-07-15)
*   [LIFF SDKをnpmパッケージとして公開しました](#liff-sdkをnpmパッケージとして公開しました)
*   [LIFF v2.3.0をリリースしました](#liff-v2-3-0)
    *   [LIFFのエンドポイントURLでパスおよびクエリパラメータを利用できるようになりました](#liff-v2-3-0-endpoint-url)
    *   [liff.permanentLink.createUrl()メソッドで例外が発生する条件を追加しました](#liff-v2-3-0-permanentLink)
    *   [liff.shareTargetPicker()の送信結果を取得できるようになりました](#liff-v2-3-0-shareTargetPicker)
    *   [liff.sendMessages()で返されるエラーコードを追加しました](#liff-v2-3-0-sendMessage)
*   [LIFF v2.2.0：LiffErrorのコードを追加しました](#liff-v2-2-0)
*   [LIFF v2.1.13：LIFF v2にliff.getLineVersion()およびliff.idが追加されました](#liff-v2-1-13)
*   [LIFF v2にliff.isApiAvailable()が追加されました](#liff-v2にliffisapiavailableが追加されました)
    *   [ターゲットピッカーの使用可否の確認](#ターゲットピッカーの使用可否の確認)
*   [LIFF v2にliff.shareTargetPicker()およびliff.readyが追加されました](#liff-v2にliffsharetargetpickerおよびliffreadyが追加されました)
    *   [liff.shareTargetPicker()](#liffsharetargetpicker)
    *   [liff.ready](#liffready)
*   [LIFF v1 廃止対象APIと廃止スケジュール変更のお知らせ](#liff-v1-廃止対象apiと廃止スケジュール変更のお知らせ)
*   [Messaging APIのチャネルにはLIFFアプリを追加できなくなりました](#messaging-apiのチャネルにはliffアプリを追加できなくなりました)
*   [2020年3月31日にLIFF v1のサーバーAPIの提供を終了します](#_2020年3月31日にliff-v1のサーバーapiの提供を終了します)
    *   [LIFF v2を利用してください](#liff-v2を利用してください)
*   [提供を一時停止しているLIFF SDKのAPIを使用している場合はコードを修正してください](#提供を一時停止しているliff-sdkのapiを使用している場合はコードを修正してください)
*   [LIFFの一部機能の提供の一時停止について](#liffの一部機能の提供の一時停止について)
    *   [一時停止バージョン](#一時停止バージョン)
*   [Messaging APIのチャネルにはLIFFアプリを追加できなくなります](#messaging-apiのチャネルにはliffアプリを追加できなくなります)
    *   [仕様変更時期](#仕様変更時期)
    *   [影響](#影響-2)
    *   [LINEログインチャネルへの移行](#lineログインチャネルへの移行)
*   [LIFF v2がリリースされました](#liff-v2)
    *   [外部ブラウザでLIFFアプリが動作します](#外部ブラウザでliffアプリが動作します)
    *   [ユーザーのプロフィール情報とメールアドレスを取得できます](#ユーザーのプロフィール情報とメールアドレスを取得できます)
    *   [QRコードを読み取れます](#qrコードを読み取れます)
    *   [LIFFアプリの動作環境を細かく取得できます](#liffアプリの動作環境を細かく取得できます)
*   [LINE Front-end Frameworkの同意画面が改善されました](#line-front-end-frameworkの同意画面が改善されました)
*   [LIFF SDKでアクセストークンを取得できるようになりました](#liff-sdkでアクセストークンを取得できるようになりました)
*   [LIFFのサーバーAPIが新しくなりました](#liffのサーバーapiが新しくなりました)
*   [LIFFアプリをLINE Developersコンソールで追加できるようになりました](#liffアプリをline-developersコンソールで追加できるようになりました)
*   [LIFFアプリ数の上限が変更されました](#liffアプリ数の上限が変更されました)
*   [LINE Front-end Frameworkがリリースされました](#line-front-end-frameworkがリリースされました)
*   [liff.init()メソッドを実行したページのURLがエンドポイントURLで始まらない場合、ブラウザのコンソールに警告メッセージを表示するようにしました](#liff-init-20250908)
    *   [LIFF v2.27.2へのアップデート方法](#how-to-update-to-liff-v2-27-2-20250908)
    *   [LIFF v2.27.1へのアップデート方法](#how-to-update-to-liff-v2-27-1-20250724)
    *   [ユーザーが権限の付与に同意したスコープの一覧を取得できるようになりました](#liff-permission-get-granted-all-20250625)
    *   [LIFF v2.27.0へのアップデート方法](#how-to-update-to-liff-v2-27-0-20250625)
    *   [LIFF URLにアクセスした際に、LIFFアプリが意図しない2次リダイレクト先URLに遷移する不具合を修正しました](#secondary-redirect-url-20250526)
    *   [liff.init()メソッドが機密情報を除外する際に、ブラウザのセッション履歴のPOSTリクエストがGETリクエストに置き換わる不具合を修正しました](#liff-init-20250526)
    *   [LIFF v2.26.1へのアップデート方法](#how-to-update-to-liff-v2-26-1-20250526)
    *   [外部ブラウザにおいて未ログイン状態で特定のメソッドを実行した際に、返されるエラーメッセージが正しくない不具合を修正しました](#error-message-20250422)
    *   [LIFF v2.26.0へのアップデート方法](#how-to-update-to-liff-v2-26-0-20250422)
    *   [LIFF v2.25.1へのアップデート方法](#how-to-update-to-liff-v2-25-1-20241213)
    *   [liff.permanentLink.createUrlBy()メソッドが生成するURLを変更しました](#create-url-by-20240723)
    *   [LIFF v2.25.0へのアップデート方法](#how-to-update-to-liff-v2-25-0-20241112)
    *   [LIFFアプリが動作しているLINEアプリの言語設定を取得するliff.getAppLanguage()メソッドを追加しました](#liff-get-app-language-20240723)
    *   [LIFF v2.24.0へのアップデート方法](#how-to-update-to-liff-v2-24-0-20240723)
    *   [LIFF SDKの読み込み失敗時の原因をログやLiffErrorで確認できるようになりました](#cause-20240215)
    *   [LIFFアプリの初期化時にURLフラグメントの一部パラメータが意図せず削除されてしまう不具合を修正しました](#url-fragment-20240215)
    *   [LIFF v2.23.2へのアップデート方法](#how-to-update-to-liff-v2-23-1-20240215)
    *   [liff.scanCodeV2()メソッドの読み取り精度を改善しました](#scan-code-v2-20240115)
    *   [LIFF v2.23.1へのアップデート方法](#how-to-update-to-liff-v2-23-1-20240115)
    *   [LIFF v2.23.0へのアップデート方法](#how-to-update-to-liff-v2-23-0-20231130)
    *   [グループ内再編に伴い、LIFF SDKとオープンソースプロジェクトの社名とコピーライトを変更しました](#company-name-and-copyright-20231002)
    *   [liff.permission.requestAll()メソッドの実行が失敗した際に、エラーが正しく渡されない場合がある不具合を修正しました](#liff-permission-request-all-20231002)
    *   [LIFF v2.22.4へのアップデート方法](#how-to-update-to-liff-v2-22-4-20231002)
    *   [LIFF v2.22.3へのアップデート方法](#how-to-update-to-liff-v2-22-3-20230824)
    *   [Androidの外部ブラウザにおける自動ログインの処理を改善しました](#auto-login-20230627)
    *   [LIFF SDKのnpmパッケージを非ブラウザ環境でインポートできるようになりました](#non-browser-20230627)
    *   [Androidの外部ブラウザにおいて、liff.login()メソッドのredirectUriプロパティにクエリパラメータのないURLを指定して実行すると、ログイン後に誤ったURLが開かれる不具合を修正しました](#liff-login-20230627)
    *   [LIFF v2.22.2へのアップデート方法](#how-to-update-to-liff-v2-22-2-20230627)
    *   [プラガブルSDKのLIFF APIのモジュールについて、TypeScriptの型定義を修正しました](#pluggable-sdk-20230524)
    *   [LIFF v2.22.1へのアップデート方法](#how-to-update-to-liff-v2-22-1-20230524)
    *   [LIFF SDKのファイルサイズを最大約34%削減できるプラガブルSDK機能を追加しました](#pluggable-sdk-20230329)
    *   [LIFF SDKのnpmパッケージを正式にリリースしました](#npm-package-20221213)
    *   [LIFF v2.21.4へのアップデート方法](#how-to-update-to-liff-v2-21-4-20221213)
    *   [LIFF SDKのnpmパッケージをES moduleとしてインポートするとエラーが発生する不具合を修正しました](#npm-package-20221110)
    *   [LIFF v2.21.3へのアップデート方法](#how-to-update-to-liff-v2-21-3-20221110)
    *   [LIFF SDKの表示する文言が多言語に対応しました](#i18n-20220804)
    *   [LIFF SDKが表示する文言の言語を指定できるようになりました](#liff-i18n-setLang-20220804)
    *   [liff.init()メソッドが無効なLIFF IDで成功する場合がある不具合を修正しました](#liff-init-20220804)
    *   [liff.getProfile()メソッドで取得できるプロフィール情報のTypeScriptの型定義を利用できるようになりました](#liff-get-profile-20220804)
    *   [Androidの外部ブラウザで自動ログインが正しく行われない不具合の暫定対応として、自動ログイン後にアラートを表示するようにしました](#android-external-browser-20220706)
    *   [LIFF v2.20.3へのアップデート方法](#how-to-update-to-liff-v2-20-3-20220706)
    *   [外部ブラウザにおいて、未ログイン状態でliff.scanCodeV2()メソッドを実行した際に、エラーを返すようにしました](#liff-scan-code-v2-20220524)
    *   [LIFF SDKを拡張できるLIFFプラグイン機能を追加しました](#liff-plugin-20220418)
    *   [iOS版およびiPadOS版LINEバージョン12.0.0でLINEのアップデートを促すアラートを表示するようにしました](#liff-send-messages-2022-02-14)
    *   [liff.scanCodeV2()メソッドでUTF-8エンコーディングの二次元コードを読み取ると、結果が文字化けする不具合を修正しました](#scan-code-v2-2022-02-14)
    *   [liff.permanentLink.createUrlBy()メソッドにパーセントエンコードされたパスを含むURLを渡すと、正しいパーマネントリンクを取得できない不具合を修正しました](#permanent-link-create-url-by-2022-02-14)
    *   [LIFF v2.18.2へのアップデート方法](#how-to-update-to-liff-v2-18-2-2022-02-14)

div.table-of-contents > ul > li:first-child, div.table-of-contents > ul > li > ul { display: none; }

2025/09/08

## LIFF v2.27.2をリリースしました

LIFF v2.27.2をリリースしました。

LIFF v2.27.2では、以下の改善を行いました。

### liff.init()メソッドを実行したページのURLがエンドポイントURLで始まらない場合、ブラウザのコンソールに警告メッセージを表示するようにしました

[`liff.init()`](https://developers.line.biz/ja/reference/liff/#initialize-liff-app)メソッドは、エンドポイントURL（※）と一致、もしくはエンドポイントURLよりも下の階層でのみ正しく動作します。そのため、これら以外のURLで`liff.init()`メソッドを実行した場合、[マルチタブビュー](https://developers.line.biz/ja/docs/liff/overview/#multi-tab-view)などのLIFFアプリの一部機能が正しく動作しない可能性があります。

開発者がこの問題に気付きやすいよう、`liff.init()`メソッドを実行したページのURLがエンドポイントURLで始まらない場合に、コンソールに警告メッセージを表示するようにしました。

たとえば、LIFFアプリのエンドポイントURLが`https://example.com/path1/path2/`で、`liff.init()`メソッドを実行するURLが`https://example.com/path1/`の場合、次のような警告メッセージが表示されます。

text

`liff.init() was called with a current URL that is not related to the endpoint URL. https://example.com/path1/ is not under https://example.com/path1/path2/`

上記の警告メッセージが表示された場合、エンドポイントURLを`https://example.com/`や`https://example.com/path1/`に変更できないか検討してください。これらのURLに変更することで、`liff.init()`メソッドの動作が保証されます。

※ LINE Developersコンソールの［**エンドポイントURL**］に指定したURL。

### LIFF v2.27.2へのアップデート方法

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.27.2にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.27.2`もしくは`yarn add @line/liff@2.27.2`を実行するとv2.27.2にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2025/07/24

## LIFF v2.27.1をリリースしました

LIFF v2.27.1をリリースしました。

LIFF v2.27.1では、LIFF SDK内部の挙動を変更しました。機能の変更はありません。

### LIFF v2.27.1へのアップデート方法

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.27.1にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.27.1`もしくは`yarn add @line/liff@2.27.1`を実行するとv2.27.1にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2025/06/25

## LIFF v2.27.0をリリースしました

LIFF v2.27.0をリリースしました。

LIFF v2.27.0では、以下の機能を追加しました。

### ユーザーが権限の付与に同意したスコープの一覧を取得できるようになりました

LIFF SDKに[`liff.permission.getGrantedAll()`](https://developers.line.biz/ja/reference/liff/#permission-get-granted-all)メソッドが追加されました。`liff.permission.getGrantedAll()`メソッドを使うと、ユーザーが権限の付与に同意したスコープを一括で取得できます。

javascript

`liff.permission.getGrantedAll().then((scopes) => {   // ["profile", "chat_message.write", "openid", "email"]  console.log(scopes); });`

このメソッドで取得できるスコープは次のとおりです。

*   [`profile`](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#registering-liff-app)
*   [`chat_message.write`](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#registering-liff-app)
*   [`openid`](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#registering-liff-app)
*   [`email`](https://developers.line.biz/ja/docs/liff/registering-liff-apps/#registering-liff-app)

:::note info
liff.getContext()メソッドとliff.permission.getGrantedAll()メソッドの違い

:::

詳しくは、『LIFF APIリファレンス』の「[liff.permission.getGrantedAll()](https://developers.line.biz/ja/reference/liff/#permission-get-granted-all)」を参照してください。

### LIFF v2.27.0へのアップデート方法

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.27.0にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.27.0`もしくは`yarn add @line/liff@2.27.0`を実行するとv2.27.0にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}

2025/05/26

## LIFF v2.26.1をリリースしました

LIFF v2.26.1をリリースしました。

LIFF v2.26.1では、以下の不具合を修正しました。

### LIFF URLにアクセスした際に、LIFFアプリが意図しない2次リダイレクト先URLに遷移する不具合を修正しました

LIFFアプリでは、[LIFF URL](https://developers.line.biz/ja/glossary/#liff-url)にアクセスすると、1次リダイレクト先URLに遷移した後、2次リダイレクト先URLに遷移します。この2次リダイレクト先URLのパスの末尾にスラッシュ（`/`）を付与する条件に不具合があり、意図しない2次リダイレクト先URLに遷移する場合がありました。

#### 2次リダイレクト先URLのパスの末尾にスラッシュ（/）を付与する条件

LIFF v2.26.0以前では、次のいずれかの条件を満たす場合に2次リダイレクト先URLの末尾にスラッシュ（`/`）を付与していました。

*   エンドポイントURLがスラッシュ（`/`）で終わる
*   `liff.state`がスラッシュ（`/`）で終わる

たとえば、LIFFアプリのエンドポイントURLが`https://example.com/?key=value/`で、アクセスするLIFF URLが`https://liff.line.me/1234567890-AbcdEfgh/foo/bar`の場合、正しい2次リダイレクト先URLは`https://example.com/foo/bar?key=value/`となります。

しかし、ここでは「エンドポイントURLがスラッシュ（`/`）で終わる」という条件を満たすため、実際はパスの末尾にスラッシュ（`/`）を付与した`https://example.com/foo/bar/?key=value/`に遷移していました。

| 正しい2次リダイレクト先URL | 実際の2次リダイレクト先URL |
| --- | --- |
| https://example.com/foo/bar?key=value/ | https://example.com/foo/bar**/**?key=value/ |

LIFF v2.26.1では、次のいずれかの条件を満たす場合に2次リダイレクト先URLの末尾にスラッシュ（`/`）を付与するよう修正しました。これにより、正しい2次リダイレクト先URLに遷移するようになりました。

*   エンドポイントURLのパスがスラッシュ（`/`）で終わる
*   `liff.state`のパスがスラッシュ（`/`）で終わる

LIFF URLにアクセスした際の動作について詳しくは、『LIFFドキュメント』の「[LIFF URLにアクセスしてからLIFFアプリが開くまでの動作について](https://developers.line.biz/ja/docs/liff/opening-liff-app/#redirect-flow)」を参照してください。

### liff.init()メソッドが機密情報を除外する際に、ブラウザのセッション履歴のPOSTリクエストがGETリクエストに置き換わる不具合を修正しました

LIFFアプリでは、[`liff.init()`](https://developers.line.biz/ja/reference/liff/#initialize-liff-app)メソッドがresolveされたタイミングで、URLからアクセストークンなどの機密情報が除外されます。このとき、一部の環境において、ブラウザのセッション履歴のPOSTリクエストがGETリクエストに置き換わる不具合がありました。

LIFF v2.26.1では、正しい履歴が保持されるよう不具合を修正しました。

#### ブラウザのセッション履歴のPOSTリクエストがGETリクエストに置き換わる例

たとえば、次の流れでLIFFアプリを操作するとします。

1.  LIFFアプリを開く
2.  POSTリクエストで`/path1`に遷移する
3.  GETリクエストで`/path2`に遷移する
4.  ブラウザの戻るボタンをクリックする

このとき、LIFFアプリはPOSTリクエストで`/path1`に遷移することが期待されますが、一部の環境ではGETリクエストで`/path1`に遷移していました。

### LIFF v2.26.1へのアップデート方法

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.26.1にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.26.1`もしくは`yarn add @line/liff@2.26.1`を実行するとv2.26.1にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2025/04/22

## LIFF v2.26.0をリリースしました

LIFF v2.26.0をリリースしました。

LIFF v2.26.0では、以下の不具合を修正しました。

### 外部ブラウザにおいて未ログイン状態で特定のメソッドを実行した際に、返されるエラーメッセージが正しくない不具合を修正しました

[外部ブラウザ](https://developers.line.biz/ja/glossary/#external-browser)において、ユーザーが未ログインの状態で以下のメソッドを実行した際に、返されるエラーメッセージが正しくない不具合がありました。

*   [`liff.getProfile()`](https://developers.line.biz/ja/reference/liff/#get-profile)メソッド
*   [`liff.getFriendship()`](https://developers.line.biz/ja/reference/liff/#get-friendship)メソッド
*   [`liff.sendMessages()`](https://developers.line.biz/ja/reference/liff/#send-messages)メソッド

LIFF v2.26.0では、正しいエラーメッセージが返されるよう不具合を修正しました。

| 修正前のエラーメッセージ | 修正後のエラーメッセージ |
| --- | --- |
| `LiffId is not found.` | `Need access_token for api call, Please login first` |

### LIFF v2.26.0へのアップデート方法

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.26.0にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.26.0`もしくは`yarn add @line/liff@2.26.0`を実行するとv2.26.0にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2024/12/13

## LIFF v2.25.1をリリースしました

LIFF v2.25.1をリリースしました。

LIFF v2.25.1では、LIFF SDK内部の挙動を変更しました。機能の変更はありません。

### LIFF v2.25.1へのアップデート方法

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.25.1にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.25.1`もしくは`yarn add @line/liff@2.25.1`を実行するとv2.25.1にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2024/11/12

## LIFF v2.25.0をリリースしました

LIFF v2.25.0をリリースしました。

LIFF v2.25.0では、以下の変更を行いました。

### liff.permanentLink.createUrlBy()メソッドが生成するURLを変更しました

[2024年11月11日](https://developers.line.biz/ja/news/2024/11/11/liff-server-update/)にお知らせしたとおり、LIFFのサーバー側において、URLの処理を[RFC 3986](https://datatracker.ietf.org/doc/html/rfc3986)に準拠するための変更を行いました。これに伴い、[`liff.permanentLink.createUrlBy()`](https://developers.line.biz/ja/reference/liff/#permanent-link-create-url-by)メソッドが生成するURLのクエリにおいて、文字やコードの生成結果が以下のように変更されました。

| 文字やコード | 変更前 | 変更後（現在） |
| --- | --- | --- |
| `+` | `+` | `%2B` |
| `*` | `*` | `%2A` |
| `%7E` | `%7E` | `~` |
| `%20` | `+` | `%20` |
| `;` ※ | 削除される | `%3B` |

※ `;`の処理結果は、`;`がクエリの末尾にある場合にのみ適用されます。

詳しくは、「[2024年11月11日に、LINEアプリとLIFF SDKの特定のバージョンにおいて、LIFFの一部機能で生成されるURLの結果が変わりました](https://developers.line.biz/ja/news/2024/11/11/liff-server-update/)」を参照してください。

### LIFF v2.25.0へのアップデート方法

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.25.0にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.25.0`もしくは`yarn add @line/liff@2.25.0`を実行するとv2.25.0にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2024/7/23

## LIFF v2.24.0をリリースしました

LIFF v2.24.0をリリースしました。

LIFF v2.24.0では、以下の機能追加を行いました。

### LIFFアプリが動作しているLINEアプリの言語設定を取得するliff.getAppLanguage()メソッドを追加しました

LIFFアプリが動作しているLINEアプリの言語設定を取得する[`liff.getAppLanguage()`](https://developers.line.biz/ja/reference/liff/#get-app-language)メソッドを追加しました。

LIFF SDKには類似するメソッドとして、[`liff.getLanguage()`](https://developers.line.biz/ja/reference/liff/#get-language)があります。`liff.getLanguage()`メソッドを使うと、LIFFアプリが動作している環境の言語設定を取得できますが、一部のiOS環境において、LINEアプリの言語設定ではなく、OSの言語設定が反映されてしまうという不具合があります。

そのため、`liff.getAppLanguage()`メソッドの追加に伴い、`liff.getLanguage()`メソッドは非推奨となりました。今後は、`liff.getAppLanguage()`メソッドを使用してください。

LINEアプリの言語設定について詳しくは、ヘルプセンターの「[LINEアプリの言語設定を変更できますか？](https://help.line.me/line/?contentId=20007465&lang=ja)」を参照してください。

### LIFF v2.24.0へのアップデート方法

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.24.0にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.24.0`もしくは`yarn add @line/liff@2.24.0`を実行するとv2.24.0にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2024/2/15

## LIFF v2.23.2をリリースしました

LIFF v2.23.2をリリースしました。

LIFF v2.23.2では、以下の改善と不具合修正を行いました。

### LIFF SDKの読み込み失敗時の原因をログやLiffErrorで確認できるようになりました

LIFF SDKの読み込みに失敗した際に、その原因をコンソールのログや[`LiffError`](https://developers.line.biz/ja/reference/liff/#liff-errors)オブジェクトの`cause`プロパティで確認できるようになりました。

### LIFFアプリの初期化時にURLフラグメントの一部パラメータが意図せず削除されてしまう不具合を修正しました

LIFFアプリでは、セキュリティの観点から、[`liff.init()`](https://developers.line.biz/ja/reference/liff/#initialize-liff-app)メソッドがresolveされたタイミングで、[1次リダイレクト先URL](https://developers.line.biz/ja/docs/liff/opening-liff-app/#redirect-flow)のURLフラグメントから、以下の文字列をキーとするパラメータが削除されます。

*   `access_token`
*   `client_id`
*   `context_token`
*   `feature_token`
*   `id_token`

その際、上記の削除対象の文字列で終わる文字列（例：`prefix_access_token`）をキーとするパラメータも、URLフラグメントから意図せず削除されてしまう不具合がありました。LIFF v2.23.2では、上記の文字列をキーとするパラメータのみ削除されるよう、不具合を修正しました。

### LIFF v2.23.2へのアップデート方法

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.23.2にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.23.2`もしくは`yarn add @line/liff@2.23.2`を実行するとv2.23.2にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2024/1/15

## LIFF v2.23.1をリリースしました

:::note warn
2024年1月23日追記

:::

LIFF v2.23.1をリリースしました。

LIFF v2.23.1では、以下の改善を行いました。また、セキュリティ強化のため、LIFF SDK内部の挙動を変更しました。

### liff.scanCodeV2()メソッドの読み取り精度を改善しました

[`liff.scanCodeV2()`](https://developers.line.biz/ja/reference/liff/#scan-code-v2)メソッドにおける二次元コードの読み取り精度を改善しました。なお、読み取り精度は端末のカメラ性能に依存するため、ユーザーの端末によっては顕著な改善が見られない可能性があります。

この改善はすべてのLIFFアプリに自動的に適用されるため、LIFF SDKのアップデートやコードの改修など、LIFFアプリ側の対応は不要です。

### LIFF v2.23.1へのアップデート方法

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.23.1にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.23.1`もしくは`yarn add @line/liff@2.23.1`を実行するとv2.23.1にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2023/11/30

## LIFF v2.23.0をリリースしました

LIFF v2.23.0をリリースしました。

LIFF v2.23.0では、LIFF SDK内部の挙動を変更しました。機能の変更はありません。

### LIFF v2.23.0へのアップデート方法

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.23.0にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.23.0`もしくは`yarn add @line/liff@2.23.0`を実行するとv2.23.0にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2023/10/2

## LIFF v2.22.4をリリースしました

LIFF v2.22.4をリリースしました。

LIFF v2.22.4では、LIFF SDK内部の挙動を変更しました。また、以下の変更と不具合修正を行いました。

### グループ内再編に伴い、LIFF SDKとオープンソースプロジェクトの社名とコピーライトを変更しました

[2023年10月2日のニュース](https://developers.line.biz/ja/news/2023/10/02/merger-announcement/)でお知らせしたとおり、グループ内再編により、LINE株式会社はLINEヤフー株式会社になりました。これに伴い、LIFF SDKと以下のオープンソースプロジェクトにおいて、社名とコピーライトを変更しました。

*   [LIFFスターターアプリ](https://github.com/line/line-liff-v2-starter)
*   [LIFFプレイグラウンド](https://github.com/line/liff-playground)
*   [Create LIFF App](https://github.com/line/create-liff-app)
*   [LIFF Inspector](https://github.com/line/liff-inspector)
*   [LIFF Mock](https://github.com/line/liff-mock)

### liff.permission.requestAll()メソッドの実行が失敗した際に、エラーが正しく渡されない場合がある不具合を修正しました

[`liff.permission.requestAll()`](https://developers.line.biz/ja/reference/liff/#permission-request-all)メソッドの実行が失敗した際に、エラーが正しく渡されない場合がある不具合がありました。LIFF v2.22.4では、エラーが正しく渡されるよう不具合を修正しました。

### LIFF v2.22.4へのアップデート方法

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.22.4にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.22.4`もしくは`yarn add @line/liff@2.22.4`を実行するとv2.22.4にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2023/8/24

## LIFF v2.22.3をリリースしました

LIFF v2.22.3をリリースしました。

LIFF v2.22.3では、LIFF SDK内部の挙動を変更しました。機能の変更はありません。

### LIFF v2.22.3へのアップデート方法

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.22.3にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.22.3`もしくは`yarn add @line/liff@2.22.3`を実行するとv2.22.3にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2023/6/27

## LIFF v2.22.2をリリースしました

LIFF v2.22.2をリリースしました。

LIFF v2.22.2では、以下の改善や不具合修正を行いました。

### Androidの外部ブラウザにおける自動ログインの処理を改善しました

[2022年7月6日](https://developers.line.biz/ja/news/2022/07/06/release-liff-2-20-3/#android-external-browser-20220706)にお知らせしたとおり、LIFF v2.20.3より、Androidの[外部ブラウザ](https://developers.line.biz/ja/glossary/#external-browser)で[自動ログイン](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#line-auto-login)が正しく行われない不具合の暫定対応として、自動ログイン後にアラートを表示するようにしました。

Android版LINEバージョン13.10.0において、外部ブラウザにおける自動ログインの処理が改善されるため、暫定対応が不要となりました。これに伴い、LIFF v2.22.2以降では、自動ログイン後に表示されていたアラートが表示されなくなります。

なお、LIFFアプリのLIFF SDKのバージョンがv2.22.2以降であっても、Android版LINEのバージョンが13.10.0未満の場合は、引き続きアラートが表示されます。

|  | LIFF v2.20.3〜v2.22.1 | LIFF v2.22.2以降 |
| --- | --- | --- |
| Android版LINEバージョン13.10.0未満 | アラートを表示する | アラートを表示する |
| Android版LINEバージョン13.10.0以降 | アラートを表示する | アラートを表示しない |

### LIFF SDKのnpmパッケージを非ブラウザ環境でインポートできるようになりました

LIFF SDKのnpmパッケージをNode.jsといった非ブラウザ環境でインポートできるようになりました。

### Androidの外部ブラウザにおいて、liff.login()メソッドのredirectUriプロパティにクエリパラメータのないURLを指定して実行すると、ログイン後に誤ったURLが開かれる不具合を修正しました

Androidの外部ブラウザにおいて、[`liff.login()`](https://developers.line.biz/ja/reference/liff/#login)メソッドの`redirectUri`プロパティにクエリパラメータのないURLを指定して実行すると、ログイン後に誤ったURLが開かれる不具合がありました。

LIFF v2.22.2では、ログイン後に正しいURLが開かれるよう、不具合を修正しました。

<table><tbody><tr><th class="lefthead"><code>redirectUri</code>プロパティに指定したURLの例</th><td><code>https://example.com/path</code></td></tr><tr><th class="lefthead">ログイン後に開かれる誤ったURLの例</th><td><code>https://example.com/path&amp;liffIsEscapedFromApp=true</code></td></tr><tr><th class="lefthead">ログイン後に開かれる正しいURLの例</th><td><code>https://example.com/path?liffIsEscapedFromApp=true</code></td></tr></tbody></table>

### LIFF v2.22.2へのアップデート方法

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.22.2にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.22.2`もしくは`yarn add @line/liff@2.22.2`を実行するとv2.22.2にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2023/5/24

## LIFF v2.22.1をリリースしました

LIFF v2.22.1をリリースしました。

LIFF v2.22.1では、LIFF SDKのリファクタリングを行いました。また、以下の修正を行いました。

### プラガブルSDKのLIFF APIのモジュールについて、TypeScriptの型定義を修正しました

[プラガブルSDK](https://developers.line.biz/ja/docs/liff/pluggable-sdk/)のLIFF APIのモジュールについて、TypeScriptの型定義を修正しました。

TypeScriptの型定義を修正したLIFF APIのモジュールおよび修正内容は以下のとおりです。

| LIFF APIのモジュール | 修正内容 |
| --- | --- |
| `@line/liff/get-id-token` | `getIdToken`を`getIDToken`に修正しました。 |
| `@line/liff/get-decoded-id-token` | `getDecodedIdToken`を`getDecodedIDToken`に修正しました。 |

### LIFF v2.22.1へのアップデート方法

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.22.1にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.22.1`もしくは`yarn add @line/liff@2.22.1`を実行するとv2.22.1にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2023/3/29

## LIFF v2.22.0をリリースしました

LIFF v2.22.0をリリースしました。

LIFF v2.22.0では、以下の機能を追加しました。

### LIFF SDKのファイルサイズを最大約34%削減できるプラガブルSDK機能を追加しました

LIFF SDKのnpmパッケージにおいて、LIFF SDKに含めるLIFF APIを選択できる、プラガブルSDK機能を追加しました。

LIFFアプリで利用するLIFF APIのみをLIFF SDKに含めることで、LIFF SDKのファイルサイズを最大約34%削減できます。その結果、LIFFアプリの表示速度を向上させることができます。

#### プラガブルSDKの利用方法

まず、`liff`オブジェクトを`@line/liff/core`からインポートします。従来の`liff`オブジェクトのインポート元である`@line/liff`と異なる点に注意してください。

js

`import liff from "@line/liff/core";`

この`liff`オブジェクトは従来の`liff`オブジェクトとは異なり、以下のプロパティとメソッドのみが含まれています。

*   [`liff.id`](https://developers.line.biz/ja/reference/liff/#id)プロパティ
*   [`liff.ready`](https://developers.line.biz/ja/reference/liff/#ready)プロパティ
*   [`liff.init()`](https://developers.line.biz/ja/reference/liff/#initialize-liff-app)メソッド
*   [`liff.getVersion()`](https://developers.line.biz/ja/reference/liff/#get-version)メソッド
*   [`liff.use()`](https://developers.line.biz/ja/reference/liff/#use)メソッド

上記以外のLIFF APIを利用するには、対応するモジュールをインポートします。以下の例では、[`liff.getOS()`](https://developers.line.biz/ja/reference/liff/#get-os)メソッドと[`liff.getLanguage()`](https://developers.line.biz/ja/reference/liff/#get-language)メソッドに対応するモジュールをインポートしています。

js

`import liff from "@line/liff/core"; import GetOS from "@line/liff/get-os"; import GetLanguage from "@line/liff/get-language";`

そして、インポートしたLIFF APIのモジュールを`liff.use()`メソッドに渡し、LIFF APIを有効化します。LIFF APIのモジュールはクラスで定義されているため、`liff.use()`メソッドにインスタンスを渡す必要があります。

LIFF APIを有効化すると、LIFF APIを利用できるようになります。

js

`import liff from "@line/liff/core"; import GetOS from "@line/liff/get-os"; import GetLanguage from "@line/liff/get-language"; liff.use(new GetOS()); liff.use(new GetLanguage()); liff.init({   liffId: "123456-abcedfg", }); liff.getOS(); liff.getLanguage();`

プラガブルSDKについて詳しくは、『LIFFドキュメント』の「[プラガブルSDK](https://developers.line.biz/ja/docs/liff/pluggable-sdk/)」を参照してください。

:::note info
従来のLIFF SDKを利用する

:::

html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}

2022/12/13

## LIFF v2.21.4をリリースしました

LIFF v2.21.4をリリースしました。

### LIFF SDKのnpmパッケージを正式にリリースしました

[2020年7月](https://developers.line.biz/ja/news/2020/07/01/published-liff-npm-package/)より試験的に公開していた、LIFF SDKのnpmパッケージを正式にリリースしました。

LIFF SDKのバージョンがv2.21.4未満のnpmパッケージについても、今までと同様に利用できます。利用方法の変更はありません。

LIFF SDKのnpmパッケージについて詳しくは、『LIFFドキュメント』の「[npmパッケージを利用する](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#use-npm-package)」を参照してください。

### LIFF v2.21.4へのアップデート方法

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.21.4にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.21.4`もしくは`yarn add @line/liff@2.21.4`を実行するとv2.21.4にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2022/11/10

## LIFF v2.21.3をリリースしました

LIFF v2.21.3をリリースしました。

LIFF v2.21.3では、以下の不具合を修正しました。

### LIFF SDKのnpmパッケージをES moduleとしてインポートするとエラーが発生する不具合を修正しました

LIFF SDKのnpmパッケージをES moduleとしてインポートすると、`Uncaught ReferenceError: require is not defined` のエラーが発生する不具合がありました。

LIFF v2.21.3では、上記の場合でもエラーが発生しないよう不具合を修正しました。

### LIFF v2.21.3へのアップデート方法

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.21.3にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.21.3`もしくは`yarn add @line/liff@2.21.3`を実行するとv2.21.3にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2022/10/12

## LIFF v2.21.2をリリースしました

LIFF v2.21.2をリリースしました。

LIFF v2.21.2では、LIFF SDKの安定性を向上させるためのリファクタリングを行いました。機能の変更はありません。

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.21.2にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.21.2`もしくは`yarn add @line/liff@2.21.2`を実行するとv2.21.2にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2022/9/5

## LIFF v2.21.1をリリースしました

LIFF v2.21.1をリリースしました。

LIFF v2.21.1では、LIFF SDKのリファクタリングを行いました。機能の変更はありません。

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.21.1にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.21.1`もしくは`yarn add @line/liff@2.21.1`を実行するとv2.21.1にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2022/8/4

## LIFF v2.21.0をリリースしました

LIFF v2.21.0をリリースしました。

LIFF v2.21.0では、以下の機能追加や改善を行いました。

*   [LIFF SDKの表示する文言が多言語に対応しました](#i18n-20220804)
*   [LIFF SDKが表示する文言の言語を指定できるようになりました](#liff-i18n-setLang-20220804)
*   [`liff.init()`メソッドが無効なLIFF IDで成功する場合がある不具合を修正しました](#liff-init-20220804)
*   [`liff.getProfile()`メソッドで取得できるプロフィール情報のTypeScriptの型定義を利用できるようになりました](#liff-get-profile-20220804)

### LIFF SDKの表示する文言が多言語に対応しました

LIFF SDKの表示する文言が多言語に対応しました。これにより、LIFF SDKの表示する各文言が、[`navigator.language`](https://developer.mozilla.org/ja/docs/Web/API/Navigator/language)で取得したユーザーの言語で表示されるようになります。

ただし、現時点では、翻訳が適用されていないため、いずれの文言も英語で表示されます。今後、段階的に翻訳が適用される予定です。

### LIFF SDKが表示する文言の言語を指定できるようになりました

LIFF SDKが表示する文言の言語を指定する、[`liff.i18n.setLang()`](https://developers.line.biz/ja/reference/liff/#i18n-set-lang)メソッドが追加されました。`liff.i18n.setLang()`メソッドを使うと、ユーザーの言語に関わらず、指定した言語でLIFF SDKの文言を表示できます。

js

`liff.i18n.setLang("en");`

なお、翻訳が適用されていない文言は、このメソッドの影響を受けません。

詳しくは、『LIFF APIリファレンス』の「[liff.i18n.setLang()](https://developers.line.biz/ja/reference/liff/#i18n-set-lang)」を参照してください。

### liff.init()メソッドが無効なLIFF IDで成功する場合がある不具合を修正しました

[`liff.init()`](https://developers.line.biz/ja/reference/liff/#initialize-liff-app)メソッドが無効なLIFF IDで成功する場合がある不具合がありました。LIFF v2.21.0では、`liff.init()`メソッドが無効なLIFF LIFF IDで失敗するように修正しました。

### liff.getProfile()メソッドで取得できるプロフィール情報のTypeScriptの型定義を利用できるようになりました

LIFF SDKのnpmパッケージにおいて、[`liff.getProfile()`](https://developers.line.biz/ja/reference/liff/#get-profile)メソッドで取得できる[プロフィール情報](https://developers.line.biz/ja/glossary/#profile-information)のTypeScriptの型定義を利用できるようになりました。`@liff/get-profile`パッケージから`Profile`型をインポートできます。

ts

`import { Profile } from "@liff/get-profile";`

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}

2022/7/6

## LIFF v2.20.3をリリースしました

LIFF v2.20.3をリリースしました。

LIFF v2.20.3では、以下の不具合を修正しました。

### Androidの外部ブラウザで自動ログインが正しく行われない不具合の暫定対応として、自動ログイン後にアラートを表示するようにしました

Androidの[外部ブラウザ](https://developers.line.biz/ja/glossary/#external-browser)で[自動ログイン](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#line-auto-login)が正しく行われない場合がありました。その暫定対応として、Androidの外部ブラウザにおいて、自動ログイン後に以下のアラートを表示するようにしました。

text

`Login successfully!`

なお、今後のLIFF SDKのアップデートでアラートの表示を改善する予定です。

### LIFF v2.20.3へのアップデート方法

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.20.3にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.20.3`もしくは`yarn add @line/liff@2.20.3`を実行するとv2.20.3にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2022/6/8

## LIFF v2.20.2をリリースしました

LIFF v2.20.2をリリースしました。

LIFF v2.20.2では、内部的な機能改善を行いました。

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.20.2にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.20.2`もしくは`yarn add @line/liff@2.20.2`を実行するとv2.20.2にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2022/5/24

## LIFF v2.20.1をリリースしました

:::note warn
2022年5月25日追記

:::

LIFF v2.20.1をリリースしました。

LIFF v2.20.1では以下の改善を行いました。

### 外部ブラウザにおいて、未ログイン状態でliff.scanCodeV2()メソッドを実行した際に、エラーを返すようにしました

[`liff.scanCodeV2()`](https://developers.line.biz/ja/reference/liff/#scan-code-v2)メソッドを実行するには、ユーザーのログインが必要です。

LIFF v2.19.1以前では、[外部ブラウザ](https://developers.line.biz/ja/glossary/#external-browser)において、未ログイン状態で`liff.scanCodeV2()`メソッドを実行すると、サブウィンドウが開かれ、空白ページが表示されていました。また、`Promise`はpendingのままとなっていました。

LIFF v2.20.1では、上記の場合に、サブウィンドウが開かれなくなりました。また、`Promise`がrejectされ、[`LiffError`](https://developers.line.biz/ja/reference/liff/#liff-errors)が渡されるようになりました。

`liff.scanCodeV2()`メソッドについて詳しくは、『LIFF APIリファレンス』の「[liff.scanCodeV2()](https://developers.line.biz/ja/reference/liff/#scan-code-v2)」を参照してください。

:::note warn
LIFF v2.20.0は非推奨です

:::

2022/4/18

## LIFF v2.19.1をリリースしました

:::note warn
2022年4月25日追記

:::

LIFF v2.19.1をリリースしました。

LIFF v2.19.1では以下の機能追加を行いました。

### LIFF SDKを拡張できるLIFFプラグイン機能を追加しました

昨年11月に開催された、LINE DEVELOPER DAY 2021のセッション「[すべてのLIFFアプリ開発者の開発体験を向上させるために](https://linedevday.linecorp.com/2021/ja/sessions/142/)」でご紹介した、LIFFプラグイン機能を追加しました。

LIFFプラグインとは、LIFF SDKを拡張できる機能です。LIFFプラグインを使うと、LIFF SDKに独自のAPIを追加したり、LIFF APIの挙動を変更したりできます。

また、近日公開予定としておりました、以下のLIFFプラグインをご利用いただけるようになりました。

*   [LIFF Inspector](#liff-inspector-20220418)
*   [LIFF Mock](#liff-mock-20220418)

#### LIFF Inspector

LIFF Inspectorは、LIFFアプリをデバッグするためのLIFFプラグインです。LIFF Inspectorを使うと、LIFFアプリを実行している端末とは別のPC上の[Chrome DevTools](https://developer.chrome.com/docs/devtools/)を使って、LIFFアプリをデバッグできます。

#### LIFF Mock

LIFF Mockは、LIFFアプリのテストを簡単にするためのLIFFプラグインです。LIFF Mockを使うと、LIFF SDKにモックモードを追加できます。モックモードでは、LIFFアプリがLIFFサーバーから独立し、LIFF APIがモックデータを返すため、単体テストや負荷テストをより簡単に行うことができます。

LIFFプラグインについて詳しくは、『LIFFドキュメント』の「[LIFFプラグイン](https://developers.line.biz/ja/docs/liff/liff-plugin/)」を参照してください。

2022/3/22

## LIFF v2.19.0をリリースしました

LIFF v2.19.0をリリースしました。

LIFF v2.19.0では、内部的な機能改善を行いました。

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.19.0にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.19.0`もしくは`yarn add @line/liff@2.19.0`を実行するとv2.19.0にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2022/2/14

## LIFF v2.18.2をリリースしました

LIFF v2.18.2をリリースしました。

LIFF v2.18.2では以下の改善を行いました。

*   [iOS版およびiPadOS版LINEバージョン12.0.0でLINEのアップデートを促すアラートを表示するようにしました](#liff-send-messages-2022-02-14)
*   [liff.scanCodeV2()メソッドでUTF-8エンコーディングの二次元コードを読み取ると、結果が文字化けする不具合を修正しました](#scan-code-v2-2022-02-14)
*   [liff.permanentLink.createUrlBy()メソッドにパーセントエンコードされたパスを含むURLを渡すと、正しいパーマネントリンクを取得できない不具合を修正しました](#permanent-link-create-url-by-2022-02-14)

### iOS版およびiPadOS版LINEバージョン12.0.0でLINEのアップデートを促すアラートを表示するようにしました

[2022年1月14日](https://developers.line.biz/ja/news/2022/01/14/liff-outage/)にお知らせしたとおり、iOS版およびiPadOS版LINEバージョン12.0.0において、特定の条件下で[`liff.sendMessages()`](https://developers.line.biz/ja/reference/liff/#send-messages)メソッドが正常に動作せず、ステータスコード`403`のエラーが発生する不具合がありました。この不具合は、ユーザーが利用しているLINEのバージョンを12.0.1以降にアップデートすることで解消します。

ユーザーに修正バージョンのLINEへのアップデートを促すため、iOS版およびiPadOS版LINEバージョン12.0.0において、`liff.sendMessages()`メソッド実行時にステータスコード`403`のエラーが発生した場合、アラートを表示するようにしました。

表示されるアラートは以下のとおりです。

![LINEアプリをLINE 12.0.1以降にアップデートしてください。Please update your LINE app to LINE 12.0.1 or later.](https://developers.line.biz/media/news/liff-send-messages-v2-18-2.png)

### liff.scanCodeV2()メソッドでUTF-8エンコーディングの二次元コードを読み取ると、結果が文字化けする不具合を修正しました

[`liff.scanCodeV2()`](https://developers.line.biz/ja/reference/liff/#scan-code-v2)メソッドでUTF-8エンコーディングの二次元コードを読み取ると、結果が文字化けする不具合を修正しました。

この不具合の修正は、すべてのLIFFアプリに自動的に適用されるため、LIFF SDKのアップデートやコードの改修など、LIFFアプリ側の対応は不要です。

### liff.permanentLink.createUrlBy()メソッドにパーセントエンコードされたパスを含むURLを渡すと、正しいパーマネントリンクを取得できない不具合を修正しました

[`liff.permanentLink.createUrlBy()`](https://developers.line.biz/ja/reference/liff/#permanent-link-create-url-by)メソッドに[パーセントエンコード](https://ja.wikipedia.org/wiki/%E3%83%91%E3%83%BC%E3%82%BB%E3%83%B3%E3%83%88%E3%82%A8%E3%83%B3%E3%82%B3%E3%83%BC%E3%83%87%E3%82%A3%E3%83%B3%E3%82%B0)されたパスを含むURLを渡すと、不正なパーマネントリンクが返ったり、ステータスコード`500`のエラーが発生したりする不具合を修正しました。

この不具合の修正は、すべてのLIFFアプリに自動的に適用されるため、LIFF SDKのアップデートやコードの改修など、LIFFアプリ側の対応は不要です。

### LIFF v2.18.2へのアップデート方法

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.18.2にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.18.2`もしくは`yarn add @line/liff@2.18.2`を実行するとv2.18.2にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2021/12/21

## LIFF v2.18.1をリリースしました

LIFF v2.18.1では以下の不具合を修正しています。

### TypeScriptでビルド時にエラーが出る不具合を修正しました

LIFF v2.18.0において、[メッセージオブジェクト](https://developers.line.biz/ja/reference/messaging-api/#message-objects)の中に[URIアクション](https://developers.line.biz/ja/docs/messaging-api/actions/#uri-action)が含まれたコードを、TypeScriptでビルドした時にエラーとなる不具合を修正しました。

#### 対象メソッド

*   [`liff.sendMessages()`](https://developers.line.biz/ja/reference/liff/#send-messages)
*   [`liff.shareTargetPicker()`](https://developers.line.biz/ja/reference/liff/#share-target-picker)

2021/12/9

## LIFF v2.18.0をリリースしました

LIFF v2.18.0では以下の機能追加を行いました。

### LIFFアプリの任意のページのパーマネントリンクを取得できるようになりました

LIFFアプリの任意のページのパーマネントリンクを取得する[`liff.permanentLink.createUrlBy()`](https://developers.line.biz/ja/reference/liff/#permanent-link-create-url-by)メソッドが追加されました。

従来の[`liff.permanentLink.createUrl()`](https://developers.line.biz/ja/reference/liff/#permanent-link-create-url)メソッドでは、現在のページ以外のパーマネントリンクを取得できませんでした。`liff.permanentLink.createUrlBy()`メソッドでは、現在のページに加えて、LIFFアプリの任意のページのパーマネントリンクを取得できるようになりました。

また、従来の`liff.permanentLink.createUrl()`メソッドでは、任意のクエリパラメータを追加したパーマネントリンクを取得するには、あらかじめ[`liff.permanentLink.setExtraQueryParam()`](https://developers.line.biz/ja/reference/liff/#permanent-linke-set-extra-query-param)メソッドを実行する必要がありました。`liff.permanentLink.createUrlBy()`メソッドでは、メソッド実行時に追加したいクエリパラメータを指定できます。また、`liff.permanentLink.createUrlBy()`メソッドは、`liff.permanentLink.setExtraQueryParam()`メソッドの影響を受けません。

#### liff.permanentLink.createUrl()メソッドとliff.permanentLink.createUrlBy()メソッドの違い

|  | `liff.permanentLink.createUrl()` | `liff.permanentLink.createUrlBy()` |
| --- | --- | --- |
| パーマネントリンクを取得できるLIFFアプリのページ | 現在のページ | 任意のページ |
| パーマネントリンクへの任意のクエリパラメータの追加方法 | あらかじめ`liff.permanentLink.setExtraQueryParam()`メソッドを実行する | `liff.permanentLink.createUrlBy()`メソッド実行時に指定する |
| 戻り値 | 文字列 | `Promise`オブジェクト |

#### liff.permanentLink.createUrlBy()メソッドのサンプルコード

javascript

`// For example, if the endpoint URL of the LIFF app is https://example.com/path1?q1=v1 // and its LIFF ID is 1234567890-AbcdEfgh liff.permanentLink   .createUrlBy("https://example.com/path1?q1=v1")  .then((permanentLink) => {    // https://liff.line.me/1234567890-AbcdEfgh    console.log(permanentLink);  }); liff.permanentLink   .createUrlBy("https://example.com/path1/path2?q1=v1&q2=v2")  .then((permanentLink) => {    // https://liff.line.me/1234567890-AbcdEfgh/path2?q=2=v2    console.log(permanentLink);  });`

:::note warn
liff.permanentLink.createUrl()メソッドは次回メジャーバージョン以降に非推奨になる可能性があります

:::

詳しくは、『LIFF APIリファレンス』の「[liff.permanentLink.createUrlBy()](https://developers.line.biz/ja/reference/liff/#permanent-link-create-url-by)」を参照してください。

2021/11/11

## LIFF v2.17.0をリリースしました

LIFF v2.17.0では以下の不具合を修正しました。

### iOS版LINEでliff.openWindow()メソッドを実行すると、URLフラグメントの末尾に意図しないクエリパラメータが追加されたURLが開かれる不具合を修正しました

iOS版LINEで[`liff.openWindow()`](https://developers.line.biz/ja/reference/liff/#open-window)メソッドを実行するとき、`url`プロパティにクエリパラメータが含まれず、かつURLフラグメントが含まれていると、URLフラグメントの末尾に意図しないクエリパラメータが追加されたURLが開かれる不具合がありました。

LIFF v2.17.0では、上記の場合でも正しいURLを開くように不具合を修正しました。

#### liff.openWindow()メソッド実行時に開かれるURLの例

| LIFF SDKバージョン | `url`プロパティ | 開かれるURL |
| --- | --- | --- |
| v2.16.1 | `https://example.com#URL-fragment` | `https://example.com#URL-fragment?is_liff_external_open_window=false` |
| v2.17.0 | `https://example.com#URL-fragment` | `https://example.com#URL-fragment` |

`liff.openWindow()`メソッドについて詳しくは、『LIFF APIリファレンス』の「[liff.openWindow()](https://developers.line.biz/ja/reference/liff/#open-window)」を参照してください。

2021/10/26

## LIFF v2.16.1をリリースしました

LIFF v2.16.1では以下の不具合を修正しています。

### LIFF v2.14.0以降のCDN版のファイルサイズが肥大化する不具合を修正しました

[LIFF v2.14.0](https://developers.line.biz/ja/docs/liff/release-notes/#liff-v2-14-0)で行われた内部的なソースコードの変更により、LIFF v2.14.0以降のCDN版のファイルサイズが肥大化する不具合がありました。LIFF v2.16.1では、ファイルサイズの肥大化が起こらないよう、不具合を修正しました。

### webpack v5を使ったプロジェクトのビルド時にエラーが発生する不具合を修正しました

[webpack v5から、Node.jsのポリフィルが削除されました。](https://webpack.js.org/blog/2020-10-10-webpack-5-release/#automatic-nodejs-polyfills-removed)その影響により、webpack v5を使ったプロジェクトでLIFF v2.16.0以前のnpm版を使用すると、ビルド時にエラーが発生し、以下のようなメッセージが表示されます。

text

`Module not found: Error: Can't resolve 'crypto' in 'node_modules/js-crypto-env/dist'  BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default. This is no longer the case. Verify if you need this module and configure a polyfill for it.  If you want to include a polyfill, you need to: - add a fallback 'resolve.fallback: { "crypto": require.resolve("crypto-browserify") }' - install 'crypto-browserify' If you don't want to include a polyfill, you can use an empty module like this: resolve.fallback: { "crypto": false }`

これは、LIFF v2.16.0以前では、LIFF SDK内部においてNode.jsのポリフィルに依存した実装をしているためです。LIFF v2.16.1では、Node.jsのポリフィルに依存しない実装に変更されたため、上記のエラーが発生しなくなりました。

#### webpack v5を使ったプロジェクトでLIFF v2.16.0以前のnpm版を使う場合

LIFF SDKのバージョンを維持したまま不具合を修正するには、Node.jsのポリフィルのインストールと、`webpack.config.js`の設定が必要です。

まず、Node.jsのポリフィルをインストールします。`crypto-browserify` と `stream-browserify` をインストールしてください。

bash

`# npmの場合 $ npm install crypto-browserify stream-browserify # Yarnの場合 $ yarn add crypto-browserify stream-browserify`

次に、`webpack.config.js`の`resolve.fallback`を以下のようにします。

js

`module.exports = {   resolve: {    fallback: {      crypto: require.resolve("crypto-browserify"),      stream: require.resolve("stream-browserify"),    },  }, };`

  

### LIFF v2.16.1へのアップデート方法

CDNエッジパス（`https://static.line-scdn.net/liff/edge/2/sdk.js`）を利用している場合は、自動でv2.16.1にアップデートされています。

npmパッケージを利用している場合は、`npm install @line/liff@2.16.1`もしくは`yarn add @line/liff@2.16.1`を実行するとv2.16.1にアップデートされます。

LIFF SDKの組み込み方法について詳しくは、「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2021/10/12

## LIFF v2.16.0をリリースしました

LIFF v2.16.0では以下の機能追加を行いました。

### シェアターゲットピッカーに、送信先を複数にするか1人にするかを制御するオプションが追加されました

`liff.shareTargetPicker()`メソッドに`isMultiple`プロパティが追加されました。`isMultiple`プロパティを設定することで、ユーザーがターゲットピッカーで選択できるメッセージ送信先として、複数の送信先を選択可能にするかどうかを制御できるようになりました。

`isMultiple`プロパティに`true`を指定した場合は、ユーザーはターゲットピッカーで複数の送信先を選択可能です。`false`を指定した場合は、送信先として友だち1人だけを選択可能です。デフォルトでは`true`が指定されます。

| `isMultiple`の値 | 選択可能な送信先 | 選択可能な件数 |
| --- | --- | --- |
| `true` | グループ、友だち、トーク | 複数の送信先を選択可能 |
| `false` | 友だち | 1人だけ選択可能 |

:::note warn
isMultipleにfalseを設定しても、1人の友だちのみにメッセージが送信されることは保証できません

:::

:::note warn
ユーザーがシェアターゲットピッカーでメッセージを送信した人数は、取得できません

:::

**`liff.shareTargetPicker()`メソッドに`isMultiple`プロパティを追加したサンプルコード：**

js

``if (liff.isApiAvailable("shareTargetPicker")) {   liff    .shareTargetPicker(      [        {          type: "text",          text: "Hello, World!",        },      ],      {        isMultiple: true,      },    )    .then(function (res) {      if (res) {        // succeeded in sending a message through TargetPicker        console.log(`[${res.status}] Message sent!`);      } else {        const [majorVer, minorVer] = (liff.getLineVersion() || "").split(".");        if (parseInt(majorVer) == 10 && parseInt(minorVer) < 11) {          // LINE 10.3.0 - 10.10.0          // Old LINE will access here regardless of user's action          console.log(            "TargetPicker was opened at least. Whether succeeded to send message is unclear",          );        } else {          // LINE 10.11.0 -          // sending message canceled          console.log("TargetPicker was closed!");        }      }    })    .catch(function (error) {      // something went wrong before sending a message      console.log("something wrong happen");    }); }``

詳しくは、『LIFF APIリファレンス』の「[liff.shareTargetPicker()](https://developers.line.biz/ja/reference/liff/#share-target-picker)」を参照してください。

2021/10/01

## 2021年10月1日をもってLIFF v1を廃止しました

[2021年9月17日](https://developers.line.biz/ja/news/2021/09/17/liff-v1-discontinue/)にお知らせしたとおり、LIFF v1を2021年10月1日に[廃止](https://developers.line.biz/ja/glossary/#end-of-life)いたしました。

なお、[サーバーAPI](https://developers.line.biz/ja/reference/liff-server/)につきましては、LIFF v1とは異なるスケジュールで管理されているため、今回の廃止対象ではありません。

### 対象バージョン

LIFF v1

:::note alert
LIFF v1をお使いの場合はLIFF v2へ移行してください

:::

### 廃止日

2021年10月1日

### 影響

今後、LIFF v1 SDKのURL（`https://d.line-scdn.net/liff/1.0/sdk.js`）の参照、および[LIFF v1 API](https://developers.line.biz/ja/reference/liff-v1/)の利用が順次できなくなります。

2021/09/30

## LIFF v2.15.0をリリースしました

LIFF v2.15.0では以下の機能追加を行いました。

*   [二次元コードリーダー機能が追加されました](#liff-scan-code-v2-2021-09-30)
*   [外部ブラウザでLIFFアプリ初期化時に`liff.login()`メソッドが自動で実行されるオプションが追加されました](#liff-init-auto-login-2021-09-30)

### 二次元コードリーダー機能が追加されました

LIFFアプリ上で二次元コードリーダーを起動する[`liff.scanCodeV2()`](https://developers.line.biz/ja/reference/liff/#scan-code-v2)メソッドが追加されました。

従来の[`liff.scanCode()`](https://developers.line.biz/ja/reference/liff/#scan-code)は技術的な問題があり、iOS版LINEバージョン9.19.0以降や外部ブラウザでは使用できませんでしたが、[`liff.scanCodeV2()`](https://developers.line.biz/ja/reference/liff/#scan-code-v2)では最新のiOS版LINEや外部ブラウザでも二次元コードリーダーを起動できるようになりました。

:::note warn
liff.scanCodeV2()の動作仕様

:::

:::note warn
liff.scanCode()メソッドは非推奨です

:::

#### liff.scanCodeV2()による二次元コードリーダーの実装

`liff.scanCodeV2()`を使った二次元コードリーダーの実装方法は、従来の`liff.scanCode()`と同様です。[LINE Developersコンソール](https://developers.line.biz/console/)のLIFFタブで［**Scan QR**］をオンにした上で、以下のように`liff.scanCodeV2()`を実装してください。

  

###### `liff.scanCodeV2()`のサンプルコード：

javascript

`liff.scanCodeV2().then((result) => {   // result = { value: "" } });`

:::note warn
LINEミニアプリによる二次元コードリーダーのサポートは2021年10月7日を予定しています

:::

#### liff.scanCodeV2()メソッドの動作環境

`liff.scanCodeV2()`メソッドの動作環境と、表示される二次元コードリーダーは以下のとおりです。

*   [動作環境](#operating-environments-of-scan-code-v2)
*   [二次元コードリーダー](#two-dimensional-code-reader)

##### 動作環境

従来の[`liff.scanCode()`](https://developers.line.biz/ja/reference/liff/#scan-code)メソッドは技術的な問題があり、iOS版LINEバージョン9.19.0以降または外部ブラウザでは利用できませんでした。今回追加された[`liff.scanCodeV2()`](https://developers.line.biz/ja/reference/liff/#scan-code-v2)メソッドは最新のiOS版LINEや外部ブラウザでも利用できるようになりました。

| OS | バージョン | LINEアプリのバージョン | 外部ブラウザ |
| --- | --- | --- | --- |
| 9.18.0以前 | 9.19.0〜11.6.x | 11.7.0以降 |
| iOS | 11〜14.2 | ❌ | ❌ | ❌ | ✅ ※1 |
| 14.3以降 | ❌ | ❌ | ✅ ※2 | ✅ ※1 |
| Android | すべてのバージョン | ❌ | ❌ | ✅ ※2 | ✅ ※1 |
| PC | すべてのバージョン | ❌ | ❌ | ❌ | ✅ ※1 |

※1 [WebRTC API](https://developer.mozilla.org/ja/docs/Web/API/WebRTC_API)をサポートするブラウザのみ利用できます。

※2 LIFFブラウザの画面サイズが`Full`の場合のみ利用できます。詳しくは、『LIFFドキュメント』の「[LIFFブラウザの画面サイズ](https://developers.line.biz/ja/docs/liff/overview/#screen-size)」を参照してください。

##### 二次元コードリーダー

`liff.scanCode()`メソッドの場合、AndroidとiOSでは表示される二次元コードリーダーが異なりましたが、`liff.scanCodeV2()`メソッドの場合、OSの違いによらず以下の画面に統一されます。

![二次元コードリーダー](https://developers.line.biz/media/liff/two_dimensional_code_reader_ja.png)

二次元コードリーダーを起動すると、`Full`サイズのLIFFアプリの画面下部から`Tall`サイズのサブウィンドウが表示されます。また、画面右下の ![二次元コード選択](https://developers.line.biz/media/liff/two-dimensional-code-file-selection.png) アイコンをクリックすると、読み取り対象の二次元コードを写真から選ぶことができます。

  

`liff.scanCodeV2()`を使った二次元コードリーダーの実装について詳しくは、『LIFFドキュメント』の「[二次元コードリーダーを表示する](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#opening-two-dimensional-code-reader)」を参照してください。

### 外部ブラウザでLIFFアプリ初期化時にliff.login()メソッドが自動で実行されるオプションが追加されました

`liff.init()`メソッドに`withLoginOnExternalBrowser`プロパティが追加されました。通常、[外部ブラウザ](https://developers.line.biz/ja/glossary/#external-browser)でLIFFアプリにアクセスする場合、`liff.login()`メソッドで明示的にログイン処理を行う必要があります。今回追加された`withLoginOnExternalBrowser`プロパティに`true`を指定することで、LIFFアプリ初期化時（`liff.init()`メソッド実行時）に`liff.login()`メソッドを自動で実行することができるようになりました。

![ログイン](https://developers.line.biz/media/liff/liff_autologin_ja.png)

**`liff.init()`メソッドに`withLoginOnExternalBrowser`プロパティを追加したサンプルコード：**

js

`liff.init({   liffId: "123456-abcdef",  withLoginOnExternalBrowser: true, // Enable automatic login process }).then(() =>   // Start to use liff's api });`

詳しくは、『LIFF APIリファレンス』の「[liff.init()](https://developers.line.biz/ja/reference/liff/#initialize-liff-app)」を参照してください。

2021/09/17

## 2021年10月1日をもってLIFF v1を廃止します

[2021年4月5日](https://developers.line.biz/ja/news/2021/04/05/liff-v1-deprecated/)にお知らせしたとおり、LIFF v1は[非推奨](https://developers.line.biz/ja/glossary/#deprecated)期間を終了し、2021年10月1日に[廃止](https://developers.line.biz/ja/glossary/#end-of-life)いたします。

### 対象バージョン

LIFF v1

:::note alert
LIFF v1をお使いの場合はLIFF v2へ移行してください

:::

### 廃止日

2021年10月1日

### 影響

2021年10月1日以降、LIFF v1 SDKのURL（`https://d.line-scdn.net/liff/1.0/sdk.js`）の参照、および[LIFF v1 API](https://developers.line.biz/ja/reference/liff-v1/)の利用が順次できなくなります。

2021/09/14

## LIFF v2.14.0をリリースしました

今回のバージョンアップでは、SDK内部のリファクタリングのみで、機能の変更はありません。

2021/08/12

## LIFF v2.13.0をリリースしました

LIFF v2.13.0では以下の機能追加と不具合の修正を行いました。

*   [LINEミニアプリの同意画面をスキップできる「チャネル同意の簡略化」機能に対応しました](#channel-consent-simplification-2021-8-12)
*   [npmパッケージ版LIFF SDKの一部不具合を修正しました](#npm-bug-fix-2021-8-12)

### LINEミニアプリの同意画面をスキップできる「チャネル同意の簡略化」機能に対応しました

[本日（2021年8月12日）リリース](https://developers.line.biz/ja/news/2021/08/12/channel-consent-simplification/)された「チャネル同意の簡略化」機能を利用する場合、対象のLINEミニアプリのLIFF SDKをv2.13.0にバージョンアップする必要があります。

「チャネル同意の簡略化」機能を使用すると、ユーザーが初めてLINEミニアプリにアクセスした際に表示される「同意画面」をスキップできるようになります。

LIFF SDKのバージョン以外の利用条件や、動作、設定方法など詳しくは、『LINEミニアプリドキュメント』の「[同意画面のプロセスをスキップする](https://developers.line.biz/ja/docs/line-mini-app/develop/channel-consent-simplification/)」を参照してください。

### npmパッケージ版LIFF SDKの一部不具合を修正しました

npmパッケージ版内部の一部不具合を修正しました。

npmパッケージを利用している場合は、`npm install @line/liff@2.13.0`もしくは`yarn add @line/liff@2.13.0`を実行してv2.13.0にバージョンアップすることをお勧めします。

LIFF SDKの組み込み方法について詳しくは、「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2021/07/12

## LIFF v2.12.0をリリースしました

LIFF v2.12.0では、SDK内部の挙動の変更のみで、機能の変更はありません。

2021/06/24

## LIFF v2.11.1をリリースしました

LIFF v2.11.1では以下の不具合を修正しています。

### LIFFアプリ初期化後にURLフラグメントがURLエンコードされる不具合を修正しました

[LIFF v2.11.0](#liff-v2-11-0)では、URLフラグメント（例：`#url-fragment`）を含むLIFF URLにアクセスした際に、LIFFアプリ初期化後（[`liff.init()`](https://developers.line.biz/ja/reference/liff/#initialize-liff-app)実行後）にURLフラグメントがURLエンコードされる不具合がありました。

LIFF v2.11.1では、`liff.init()`後もURLフラグメントがURLエンコードされないように不具合を修正しました。

#### liff.init()後のURLフラグメントの例

以下の例では、LIFF v2.11.0は`liff.init()`後に、URLフラグメント（`#url/fragment`）内のスラッシュ（`/`）がURLエンコード（`%2F`）されています。

| LIFFバージョン | LIFF URL | `liff.init()`後のURL |
| --- | --- | --- |
| v2.11.0 | https://liff.line.me/{liffId}**#url****/****fragment** | https://liff.line.me/{liffId}**#url****%2F****fragment** |
| v2.11.1 | https://liff.line.me/{liffId}**#url****/****fragment** | https://liff.line.me/{liffId}**#url****/****fragment** |

:::note warn
LIFF v2.11.1へのアップデートをおすすめします

:::

LIFF SDKの組み込み方法について詳しくは、「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2021/06/14

## LIFF v2.11.0をリリースしました

LIFF v2.11.0では、セキュリティ上の観点から以下の修正を行いました。

### liff.init()後に一次リダイレクト先URLから機密情報が除外されるようになりました

セキュリティ上の観点から、`liff.init()`がresolveされたタイミングで、一次リダイレクト先URLからアクセストークンなどの機密情報を含むURLフラグメントが除外されるようになりました。そのため、メソッドチェーンの`then()`メソッド内の処理では、機密情報を含まない一次リダイレクト先URLが現在のURLとして扱われます。

#### リダイレクトの例

LIFF URLが`https://liff.line.me/{liffId}/path`で、エンドポイントURLが`https://example.com`だった場合、以下のようにリダイレクトされます。

![機密情報が除外されるタイミング](https://developers.line.biz/media/news/remove_credential_information-ja.png)

| 番号 | 項目 | URL |
| --- | --- | --- |
| ① | LIFF URL | https://liff.line.me/{liffId}/path |
| ② | 一次リダイレクト先URL | https://example.com/?liff.state=path<br/>**#access\_token=xxx&context\_token=xxx&<br/>feature\_token=xxx&id\_token=xxx&client\_id=xxx** |
| ③ | `liff.init()`後のURL | https://example.com/?liff.state=path |
| ④ | 二次リダイレクト先URL | https://example.com/path |

#### liff.init()時のサンプルコード

`liff.init().then()`メソッド内では、機密情報が除外されます。

js

`console.log(window.location.href); // https://example.com/?liff.state=path#access_token=xxx&context_token=xxx&feature_token=xxx&id_token=xxx&client_id=xxx liff.init({ liffId: myLiffId }).then(() => {   console.log(window.location.href);  // https://example.com/?liff.state=path });`

:::note warn
Google Analyticsなど外部のロギングツールの利用について

:::

LIFF SDKの組み込み方法について詳しくは、「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2021/05/17

## LIFF v2.10.0をリリースしました

LIFF v2.10.0では、以下の不具合が修正されました。機能に変更はありません。

### 外部ブラウザでLIFFアプリ初期化時に古いコンテキストトークンが参照される不具合を修正しました

[外部ブラウザ](https://developers.line.biz/ja/glossary/#external-browser)で、LIFF v2.9.1以前のLIFFアプリにログインした際、以前のセッションでLIFFアプリ初期化時（`liff.init()`実行時）にlocalStorageに保存された古いコンテキストトークンを参照してしまい、予期しない動作になる不具合を修正しました。

:::note info
コンテキストトークンとは

:::

#### アクセストークンの有効期限を確認するタイミングの見直し

LIFFアプリの初期化時（`liff.init()`実行時）には、以前のセッションで生成したアクセストークンの有効期限を確認し、期限が切れている場合はコンテキストトークンを破棄する処理が実行されます。しかしLIFF v2.9.1以前のバージョンでは、有効期限の確認処理がLIFFアプリ初期化処理の末尾の段階で実行されるため、破棄されていない古いコンテキストトークンを参照して初期化処理が進行してしまい、予期しない動作になる場合がありました。

LIFF v2.10.0では、アクセストークンの有効期限を確認する処理の順序を、LIFFアプリの初期化処理の初めの方に変更したことにより、古いコンテキストトークンを破棄したうえで初期化処理を行えるようになりました。

:::note warn
liff.getContext()メソッドで取得する情報が最新であることは保証されません

:::

#### バージョンごとのコンテキストトークン破棄のタイミング

以下は、LIFF v2.9.1以前とLIFF v2.10.0のアクセストークンの有効期限の確認と、コンテキストトークン破棄のタイミングの比較です。

| LIFFのバージョン | コンテキストトークンがlocalStorageに保存される流れ |
| --- | --- |
| v2.9.1以前 | ![以前のコンテキストトークン破棄のタイミング](https://developers.line.biz/media/news/context_token_v2-9-1.png) |
| v2.10.0 | ![v2.10.0以降のコンテキストトークン破棄のタイミング](https://developers.line.biz/media/news/context_token_v2-10-0.png) |

:::note warn
LIFFブラウザおよびLINE内ブラウザの場合

:::

コンテキストトークンが保有する情報について詳しくは、『LIFF APIリファレンス』の「[liff.getContext()](https://developers.line.biz/ja/reference/liff/#get-context)」を参照してください。

2021/04/27

## LIFF v2.9.1をリリースしました

LIFF v2.9.1では、以下の不具合が修正されました。機能に変更はありません。

### LIFF SDKのnpmパッケージ利用時の不具合を修正しました

LIFF SDKのnpmパッケージをTypeScriptで利用しようとすると、コンパイル時にエラーが発生する不具合を修正しました。LIFF v2.9.1ではTypeScript利用時でも問題なくコンパイルされます。

なお、今回の修正はnpm版とCDN版両方のLIFF SDKに適用されます。

LIFF SDKのnpmパッケージに関して詳しくは、「[npmパッケージを利用する](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#use-npm-package)」を参照してください。

:::note info
コンパイル時のエラーの対処方法

:::

2021/04/13

## LIFF v2.9.0をリリースしました

LIFF v2.9.0では、SDK内部の挙動の変更のみで、機能の変更はありません。

2021/03/16

## LIFF v2.8.1をリリースしました

今回のバージョンアップでは、SDK内部のリファクタリングのみで、機能の変更はありません。

2021/02/15

## LIFF v2.8.0をリリースしました

LIFF v2.8.0では以下の不具合を修正しています。

*   [liff.init()が2次リダイレクト先URLにリダイレクトする前にresolveされる不具合を修正しました](#liff-resolve-fix)
*   [URLエンコードされたクエリパラメータが意図せずデコードされる不具合を修正しました](#liff-decode-fix)

機能の変更および追加はありません。

### liff.init()が2次リダイレクト先URLにリダイレクトする前にresolveされる不具合を修正しました

LIFF v2.7.1以前のバージョンでは、2次リダイレクト先URLにリダイレクトする前に、`liff.init()`がresolveされる不具合がありました。この不具合により、`then()`メソッドの処理が、2次リダイレクト先URLへのリダイレクト前後に重複して実行されることがありました。

以下のコード例では、2次リダイレクト先URLへのリダイレクト前後に、`liff.init()`が一度ずつresolveされるため、「`liff.init() is resolved.`」というアラートが二度表示されます。

**liff.init()がresolveされたらアラートを表示するコード例：**

javascript

`liff.init(myLiffId).then(() => {   // This process is executed after liff.init() is resolved.  window.alert("liff.init() is resolved."); });`

LIFF v2.8.0では、2次リダイレクト先URLにリダイレクトされた時点で初めて`liff.init()`がresolveされるため、`then()`メソッドの処理が重複して実行される不具合は修正されています。上記のコード例では、一度のみアラートが表示されます。

| LIFFのバージョン | `liff.init()`がresolveされるタイミング |
| --- | --- |
| v2.7.1以前 | ![resolve-timing-v2-7-0](https://developers.line.biz/media/news/resolve_timing_v2-7-0.png) |
| v2.8.0 | ![resolve-timing-v2-8-0](https://developers.line.biz/media/news/resolve_timing_v2-8-0.png) |

### URLエンコードされたクエリパラメータが意図せずデコードされる不具合を修正しました

LIFF v2.7.1以前のバージョンでは、開発者がLIFF URLにURLエンコードしたクエリパラメータ（例：`?t=http%3A%2F%2Fexample.com`）を付与した場合、リダイレクト時にクエリパラメータ部分がデコード（例：`?t=http://example.com`）されていました。そのため、2次リダイレクト先URLが開発者の意図しないURLになる場合がありました。

LIFF v2.8.0では、クエリパラメータはデコードされず、URLエンコードされたままリダイレクトされるように修正されています。

**LIFF URL「`https://liff.line.me/{liffId}?t=http%3A%2F%2Fexample.com`」を開いた時のリダイレクトの流れ：**

| LIFFのバージョン | 1次リダイレクト先URL | 2次リダイレクト先URL |
| --- | --- | --- |
| v2.7.1以前 | https://endpoint.example.jp/?liff.state=<br/>**?t=http%3A%2F%2Fexample.com** | https://endpoint.example.jp/<br/>**?t=http:****//example.com** |
| v2.8.0 | https://endpoint.example.jp/?liff.state=<br/>**%3Ft%3Dhttp%253A%252F%252Fexample.com** | https://endpoint.example.jp/<br/>**?t=http%3A%2F%2Fexample.com** |

:::note info
クエリパラメータを含むLIFF URLの場合

:::

LIFFアプリのリダイレクトについて詳しくは、『LIFFドキュメント』の「[LIFF URLにアクセスしてからLIFFアプリが開くまでの動作について](https://developers.line.biz/ja/docs/liff/opening-liff-app/#redirect-flow)」を参照してください。

2021/01/20

## LIFF v2.7.1をリリースしました

LIFF v2.7.1では、以下の変更が適用されました。

### LIFF v2.7.0を使ったLIFFアプリが外部ブラウザで起動できない場合がある不具合を修正しました

[LIFF v2.7.0](https://developers.line.biz/ja/docs/liff/release-notes/#liff-v2-7-0)を使ったLIFFアプリを[外部ブラウザ](https://developers.line.biz/ja/glossary/#external-browser)で開くと、起動に失敗する場合がある不具合を修正しました。LIFF v2.7.1では、外部ブラウザでも正しくLIFFアプリが起動します。

:::note warn
すでにLIFF v2.7.0をご利用の場合

:::

LIFF SDKの組み込み方法の種類について詳しくは、「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

2021/01/14

## LIFF v2.7.0をリリースしました

LIFF v2.7.0では、以下の変更が適用されました。

*   [RequireJSからnpmパッケージ版LIFF SDKを参照できるようになりました](#require-js)
*   [liff.getDecodedIDToken()メソッドで取得したIDトークンのnameプロパティが文字化けする不具合を修正しました](#get-decoded-id-token)

### RequireJSからnpmパッケージ版LIFF SDKを参照できるようになりました

[RequireJS](https://requirejs.org/)からnpmパッケージ版LIFF SDKを参照できるようになりました。

npmパッケージ版のLIFF SDKの組み込み方法は、『LIFFドキュメント』の「[LIFFアプリにLIFF SDKを組み込む](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)」を参照してください。

### liff.getDecodedIDToken()メソッドで取得したIDトークンのnameプロパティが文字化けする不具合を修正しました

LIFF v2.6.0以前のバージョンでは、`liff.getDecodedIDToken()`メソッドでデコード済みのIDトークンを取得した際に、ユーザー名に日本語など、アスキー文字以外のユニコード文字が含まれている場合、`name`プロパティの値が文字化けする不具合がありました。

LIFF v2.7.0では不具合を修正し、日本語などユニコード文字で書かれたユーザー名も正しく取得できるようになりました。

**ユーザー名が`コニー`のユーザーのIDトークンを取得した場合：**

![user profile of conny](https://developers.line.biz/media/news/conny.png)

| LIFF v2.6.0以前 | LIFF v2.7.0 |
| :-: | :-: |
| 
`{<br/>"iss": "[https://access.line.me](https://access.line.me)",<br/>"sub": "U272cada9c6f4c0c933b0713bc2f90f68",<br/>"aud": "1234567890",<br/>"exp": 1513142487,<br/>"iat": 1513138887,<br/>"name": "**ã³ãã¼**", //文字化けします。<br/>"picture": "[https://profile.line-scdn.net/](https://profile.line-scdn.net/)..."<br/>}`





 | 

`{<br/>"iss": "[https://access.line.me](https://access.line.me)",<br/>"sub": "U272cada9c6f4c0c933b0713bc2f90f68",<br/>"aud": "1234567890",<br/>"exp": 1513142487,<br/>"iat": 1513138887,<br/>"name": "**コニー**", //正しく取得できます。<br/>"picture": "[https://profile.line-scdn.net/](https://profile.line-scdn.net/)..."<br/>}`





 |

`liff.getDecodedIDToken()`メソッドについて詳しくは、『LIFF APIリファレンス』の「[`liff.getDecodedIDToken()`](https://developers.line.biz/ja/reference/liff/#get-decoded-id-token)」を参照してください。

2020/12/01

## LIFF v2.6.0をリリースしました

LIFF v2.6.0では、SDK内部の挙動の変更のみで、機能の変更はありません。

2020/10/29

## LIFF v2.5.0をリリースしました

LIFF v2.5.0では、以下の変更が適用されました。

*   [liff.init()のパフォーマンスの向上](#improve-liff-init-performance)
*   [セキュリティの強化を実施しました](#security-enhancement)

機能の変更はありません。

### liff.init()のパフォーマンスの向上

`liff.init()`を実行してからLIFFアプリの初期化が完了するまでの速度が改善されました。LIFFアプリを開く際の待ち時間が減少するため、より快適なユーザー体験を提供できます。

`liff.init()`について詳しくは、『LIFF APIリファレンス』の「[`liff.init()`](https://developers.line.biz/ja/reference/liff/#initialize-liff-app)」を参照してください。

### セキュリティの強化を実施しました

未知の攻撃に対する予防策として、セキュリティ強化を実施しました。

:::note info
アップデートの必要性について

:::

2020/09/28

## LIFF v2.3.3をリリースしました

LIFF v2.3.3では以下の不具合を修正しています。

*   [エンドポイントURLの末尾が/の場合に意図しないURLへリダイレクトされる不具合を修正しました](#liff-url-including-path-bug-fix)

機能の変更はありません。

### エンドポイントURLの末尾が/の場合に意図しないURLへリダイレクトされる不具合を修正しました

以下の条件の時、LIFF URLにアクセスするとパス区切りが二重（`//`）になり、意図しないURLへリダイレクトされる不具合がありました。

*   ［**エンドポイントURL**］に指定したURL中にパスが含まれており、かつ末尾が`/`になっている（例：`https://example.com/campaign/`）
*   ［**LIFF URLの追加情報の処理方法**］が［**連結**］に設定されている
*   LIFF URLにパス（`/path`）が含まれている（例：`https://liff.line.me/{liffId}/path`）

LIFF v2.3.3では、上記の条件の場合でも正しいURLへリダイレクトされるように不具合を修正しています。

| 項目 | LIFF URL | 1次リダイレクト先 | 2次リダイレクト先 |
| --- | --- | --- | --- |
| 変更前 | https://liff.line.me/{liffId}/path | https://example.com/campaign**/**?liff.state={urlEncode(/path)} | https://example.com/campaign**//**path |
| 変更後 | https://liff.line.me/{liffId}/path | https://example.com/campaign?liff.state={urlEncode(path)} | https://example.com/campaign**/**path |

:::note warn
他のバージョンへの影響

:::

LIFF URLへのアクセス時の動作について詳しくは、LIFFドキュメントの「[LIFF URLにアクセスしてからLIFFアプリが開くまでの動作について](https://developers.line.biz/ja/docs/liff/opening-liff-app/#redirect-flow)」を参照してください。

2020/09/24

## LIFF v2.4.1をリリースしました

LIFF v2.4.1では、以下の変更が適用されました。

*   [LIFFアプリを閉じずに別のLIFFアプリを開く機能の不具合を修正しました](#liff-transition-bug-fix)
*   [liff.isApiAvailable()でLIFF間遷移可能な状態か確認できるようになりました](#liff-transition-state)
*   [liff.init()が二回呼びだされた際の動作を修正しました](#call-init-twice-fix)

### LIFFアプリを閉じずに別のLIFFアプリを開く機能の不具合を修正しました

[LIFF v2.4.0のリリースノートでお知らせ](#liff-transition)した、LIFFアプリを閉じずに別のLIFFアプリを開く機能に不具合があり、条件を満たしていても正しく動作しないことがわかりました。

LIFF v2.4.1では、動作条件を下記に変更したうえで、不具合を修正しています。

| 項目 | 変更前 | 変更後 |
| --- | --- | --- |
| LIFF SDK | 2.4.0 | 2.4.1 |
| LINE | 10.16.0 | 10.18.0 |

:::note warn
LIFF v2.4.0の利用は非推奨です

:::

詳しくは、『LIFFドキュメント』の「[LIFFアプリから別のLIFFアプリを開いた場合の動作について](https://developers.line.biz/ja/docs/liff/opening-liff-app/#move-liff-to-liff)」を参照してください。

### liff.isApiAvailable()でLIFF間遷移可能な状態か確認できるようになりました

APIの使用可否を確認する[`liff.isApiAvailable()`](https://developers.line.biz/ja/reference/liff/#is-api-available)で、LIFF間遷移可否の確認ができるようになりました。

別のLIFFアプリを開く前に、`liff.isApiAvailable('multipleLiffTransition')`を実行することで、LIFF間遷移が可能な状態か確認することができます。別のLIFFアプリを開く際に、エラーが発生することを避けることができます。

js

`if (liff.isApiAvailable('multipleLiffTransition')) {   window.location.href = "https://line.me/{liffId}", // URL for another LIFF app }`

:::note info
liff.getContext()を使ってLIFF間遷移の情報を取得する

:::

詳しくは、『LIFF APIリファレンス』の「[liff.isApiAvailable()](https://developers.line.biz/ja/reference/liff/#is-api-available)」および「[liff.getContext()](https://developers.line.biz/ja/reference/liff/#get-context)」を参照してください。

### liff.init()が二回呼びだされた際の動作を修正しました

[`liff.init()`](https://developers.line.biz/ja/reference/liff/#initialize-liff-app)によるLIFFアプリの初期化が成功する条件下において`liff.init()`を2回以上実行すると、rejectされた`Promise`オブジェクトがエラーメッセージと共に返却されていました。

LIFF v2.4.1では、`liff.init()`が成功する条件下において`liff.init()`を2回以上実行すると、resolveされた`Promise`オブジェクトが返却され、警告メッセージが出力されるよう修正されました。

LIFFアプリの初期化について詳しくは『LIFFドキュメント』の「[LIFFアプリを初期化する](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#initializing-liff-app)」を参照してください。

2020/09/14

## LIFF v2.3.2をリリースしました

LIFF v2.3.2では、以下の変更が適用されました。

*   [LIFFエンドポイントURLに含まれるURLフラグメントがliff.permanentLink.createUrl()で正しく処理されない不具合を修正しました](#liff-create-url-error-fix-endpoint-v-2-3-2)
*   [LIFFエンドポイントURLに含まれるクエリパラメータがliff.permanentLink.createUrl()で正しく処理されない不具合を修正しました](#liff-create-url-error-fix-query-parameter-v-2-3-2)
*   [LIFFエンドポイントURLに含まれるパスがliff.permanentLink.createUrl()で正しく処理されない不具合を修正しました](#liff-create-url-redirect-url-fix-2-3-2)
*   [2次リダイレクト先URLにフラグメントが含まれない不具合を修正しました](#liff-url-fragment-error-fix-v-2-3-2)
*   [LIFF URLが意図しないURLへリダイレクトされる不具合を修正しました](#bug-fix-redirect-2-3-2)

### LIFFエンドポイントURLに含まれるURLフラグメントがliff.permanentLink.createUrl()で正しく処理されない不具合を修正しました

LIFFのエンドポイントURLにURLフラグメント（`#URL-fragment`）が含まれていた場合、[`liff.permanentLink.createUrl()`](https://developers.line.biz/ja/reference/liff/#permanent-link-create-url)を実行した際、［**LIFF URLの追加情報の処理方法**］が「**置換（後方互換性モード）**」に設定されているにも関わらずパーマネントリンクにURLフラグメントが含まれる不具合がありました。

:::note info
問題が発生する条件

:::

たとえば、［**エンドポイントURL**］が`https://example.com/path#section`に設定されていて、`liff.permanentLink.createUrl()`を実行すると`https://liff.line.me/{liffId}/path?liff.state=#section`がパーマネントリンクとして返されていました。LIFF v2.3.2では、`https://liff.line.me/{liffId}`が正しく返されるよう修正されています。

### LIFFエンドポイントURLに含まれるクエリパラメータがliff.permanentLink.createUrl()で正しく処理されない不具合を修正しました

LIFFのエンドポイントURLにクエリパラメータ（`?key=value`）が含まれていて、同じクエリパラメータが含まれるLIFF URLで`liff.permanentLink.createUrl()`を実行するとクエリパラメータ部分が無限増殖したパーマネントリンクが返される不具合がありました。

:::note info
問題が発生する条件

:::

たとえば、［**エンドポイントURL**］が`https://example.com/path1/?q1=v1&q2=v2`に設定されていて、`https://liff.line.me/{liffid}/?q1=v1&q2=v2`で`liff.permanentLink.createUrl()`を実行すると、`https://liff.line.me/{liffid}/?q1=v1&q1=v1&q2=v2&q2=v2`のようにクエリパラメータ部分が無限増殖したパーマネントリンクが返されていました。

LIFF v2.3.2では、`https://liff.line.me/{liffid}/?q1=v1&q2=v2`が正しく返されるよう修正されています。

### LIFFエンドポイントURLに含まれるパスがliff.permanentLink.createUrl()で正しく処理されない不具合を修正しました

LIFFのエンドポイントURLにパスが含まれていて、パスの末尾にスラッシュ（`/`）が使用されていた場合、`liff.permanentLink.createUrl()`を実行して取得したパーマネントリンクをクリックすると以下のようにパスの末尾のスラッシュ（`/`）がリダイレクト先に含まれない不具合がありました。

:::note info
問題が発生する条件

:::

たとえば、［**エンドポイントURL**］が`https://example.com/path/?id=xxxxxxx`に設定されていて、`liff.permanentLink.createUrl()`を実行して取得したパーマネントリンクにアクセスするとパスの末尾のスラッシュ（`/`）がリダイレクト先に含まれず、`https://example.com/path?id=xxxxxxx`に遷移されていました。

LIFF v2.3.2では、`https://example.com/path/?id=xxxxxxx`へ正しく遷移されるよう修正されています。

### 2次リダイレクト先URLにフラグメントが含まれない不具合を修正しました

LIFFのエンドポイントURLやLIFF URLにURLフラグメントが含まれていた場合、［**LIFF URLの追加情報の処理方法**］の設定に関わらず、2次リダイレクト先URLにフラグメントが含まれない不具合を修正しました。

2次リダイレクト先URLや［**LIFF URLの追加情報の処理方法**］の設定による2次リダイレクト先URLへの影響について詳しくは、LIFFドキュメントの「[LIFF URLにアクセスしてからLIFFアプリが開くまでの動作について](https://developers.line.biz/ja/docs/liff/opening-liff-app/#redirect-flow)」を参照してください。

### LIFF URLが意図しないURLへリダイレクトされる不具合を修正しました

LIFF URLに指定した追加情報（例：`path/?key=value`）は、1次リダイレクト先URLでは`liff.state`クエリパラメータに含まれます。`liff.state`クエリパラメータに追加情報が含まれる場合に、以下のように意図しない2次リダイレクト先URLに遷移する不具合がありました。

:::note info
問題が発生する条件

:::

たとえば、［**エンドポイントURL**］が`https://example.com`に設定されており、`liff.state`クエリパラメータが`path`だった場合、ドメイン名とパスが`/`で分離されず、`https://example.compath`にリダイレクトされていました。  
LIFF v2.3.2では、`https://example.com/path`に正しくリダイレクトされるよう修正されています。

:::note warn
意図しないリダイレクトによる脆弱性について

:::

LIFF URLへのアクセス時の動作について詳しくは、LIFFドキュメントの「[LIFF URLにアクセスしてからLIFFアプリが開くまでの動作について](https://developers.line.biz/ja/docs/liff/opening-liff-app/#redirect-flow)」を参照してください。

2020/09/14

## LIFF v2.2.1をリリースしました

LIFF v2.2.1では、以下の変更が適用されました。

LIFF URLに指定した追加情報（例：`path/?key=value`）は、1次リダイレクト先URLでは`liff.state`クエリパラメータに含まれます。`liff.state`クエリパラメータに追加情報が含まれる場合に、以下のように意図しない2次リダイレクト先URLに遷移する不具合がありました。

:::note info
問題が発生する条件

:::

たとえば、［**エンドポイントURL**］が`https://example.com`に設定されており、`liff.state`クエリパラメータが`path`だった場合、ドメイン名とパスが`/`で分離されず、`https://example.compath`にリダイレクトされていました。  
LIFF v2.2.1では、`https://example.com/path`に正しくリダイレクトされるよう修正されています。

:::note warn
意図しないリダイレクトによる脆弱性について

:::

LIFF URLへのアクセス時の動作について詳しくは、LIFFドキュメントの「[LIFF URLにアクセスしてからLIFFアプリが開くまでの動作について](https://developers.line.biz/ja/docs/liff/opening-liff-app/#redirect-flow)」を参照してください。

2020/09/14

## LIFF v2.1.14をリリースしました

LIFF v2.1.14では、以下の変更が適用されました。

LIFF URLに指定した追加情報（例：`path/?key=value`）は、1次リダイレクト先URLでは`liff.state`クエリパラメータに含まれます。`liff.state`クエリパラメータに追加情報が含まれる場合に、以下のように意図しない2次リダイレクト先URLに遷移する不具合がありました。

:::note info
問題が発生する条件

:::

たとえば、［**エンドポイントURL**］が`https://example.com`に設定されており、`liff.state`クエリパラメータが`path`だった場合、ドメイン名とパスが`/`で分離されず、`https://example.compath`にリダイレクトされていました。  
LIFF v2.1.14では、`https://example.com/path`に正しくリダイレクトされるよう修正されています。

:::note warn
意図しないリダイレクトによる脆弱性について

:::

LIFF URLへのアクセス時の動作について詳しくは、LIFFドキュメントの「[LIFF URLにアクセスしてからLIFFアプリが開くまでの動作について](https://developers.line.biz/ja/docs/liff/opening-liff-app/#redirect-flow)」を参照してください。

2020/08/31

## LIFF v2.4.0をリリースしました

:::note warn
2020年9月24日追記

:::

LIFF v2.4.0では、以下の変更が適用されました。

*   [LIFFアプリの初期化前でも`liff.closeWindow()`メソッドが実行できるようになりました](#liff-close-window)
*   [LIFFアプリを閉じずに別のLIFFアプリを開くことができるようになりました](#liff-transition)
*   [LIFF URLが意図しないURLへリダイレクトされる不具合を修正しました](#bug-fix-redirect)
*   [liff.permanentLink.createUrl()の不具合を修正しました](#liff-create-url-error-fix)
*   [2次リダイレクト先URLにフラグメントが含まれない不具合を修正しました](#liff-url-fragment-error-fix)

### LIFFアプリの初期化前でもliff.closeWindow()メソッドが実行できるようになりました

`liff.init()`メソッドでLIFFアプリを初期化する前に、`liff.closeWindow()`メソッドを実行できるようになりました。

:::note warn
LIFFアプリ初期化前にliff.closeWindow()メソッドを実行できる条件

:::

以下のように、ネットワークエラーや、ユーザーのLINEバージョンなどによってLIFFアプリの初期化に失敗した場合に、`liff.closeWindow()`メソッドでLIFFアプリを閉じることができます。

js

`liff   .init({    liffId: "123456-abcedfg", // Use own liffId  })  .then(() => {    // Start to use liff's api  })  .catch((err) => {    // Error happens during initialization    console.log(err.code, err.message);    liff.closeWindow();  });`

詳しくは、『LIFF APIリファレンス』の「[liff.closeWindow()](https://developers.line.biz/ja/reference/liff/#close-window)」を参照してください。

### LIFFアプリを閉じずに別のLIFFアプリを開くことができるようになりました

画面サイズが`Full`表示のLIFFアプリ内で、別のLIFFアプリへのリンクをクリックすると、LIFFブラウザを開いたまま別のアプリを表示することができます。  
ブラウザが閉じないため、LIFFブラウザの戻るボタンで遷移元のLIFFアプリに戻ることができます。

:::note warn
LIFFアプリを閉じずに別のLIFFアプリに遷移できる条件（2020年9月24日追記）

:::

![LIFF-apps-transition](https://developers.line.biz/media/liff/liff_transition.png)

詳しくは、『LIFFドキュメント』の「[LIFFアプリから別のLIFFアプリを開いた場合の動作について](https://developers.line.biz/ja/docs/liff/opening-liff-app/#move-liff-to-liff)」を参照してください。

### LIFF URLが意図しないURLへリダイレクトされる不具合を修正しました

LIFF URLに指定した追加情報（例：`path/?key=value`）は、1次リダイレクト先URLでは`liff.state`クエリパラメータに含まれます。`liff.state`クエリパラメータに追加情報が含まれる場合に、以下のように意図しない2次リダイレクト先URLに遷移する不具合がありました。

:::note info
問題が発生する条件

:::

たとえば、［**エンドポイントURL**］が`https://example.com`に設定されており、`liff.state`クエリパラメータが`path`だった場合、ドメイン名とパスが`/`で分離されず、`https://example.compath`にリダイレクトされていました。  
LIFF v2.4.0では、`https://example.com/path`に正しくリダイレクトされるよう修正されています。

LIFF URLへのアクセス時の動作について詳しくは、LIFFドキュメントの「[LIFF URLにアクセスしてからLIFFアプリが開くまでの動作について](https://developers.line.biz/ja/docs/liff/opening-liff-app/#redirect-flow)」を参照してください。

### liff.permanentLink.createUrl()の不具合を修正しました

LIFFのエンドポイントURLにクエリパラメータ（`?key=value`）やURLフラグメント（`#URL-fragment`）などが含まれていた場合、[`liff.permanentLink.createUrl()`](https://developers.line.biz/ja/reference/liff/#permanent-link-create-url)を実行した際、場合により追加情報部分がパーマネントリンクに正しく反映されない不具合を修正しました。

### 2次リダイレクト先URLにフラグメントが含まれない不具合を修正しました

LIFFのエンドポイントURLやLIFF URLにURLフラグメントが含まれていた場合、［**LIFF URLの追加情報の処理方法**］の設定に関わらず、2次リダイレクト先URLにフラグメントが含まれない不具合を修正しました。

2次リダイレクト先URLや［**LIFF URLの追加情報の処理方法**］の設定による2次リダイレクト先URLへの影響について詳しくは、LIFFドキュメントの「[LIFF URLにアクセスしてからLIFFアプリが開くまでの動作について](https://developers.line.biz/ja/docs/liff/opening-liff-app/#redirect-flow)」を参照してください。

2020/07/16

## LIFF v2.3.1をリリースしました

LIFF v2.3.1では、以下の変更が適用されました。

*   [LIFF SDKのnpmパッケージのドキュメントの不具合を修正しました](#liff-npm-docs-fix)
*   [LIFF SDKのnpmパッケージの利用手順を移動しました](#liff-npm-docs-move)

機能の変更はありません。

### LIFF SDKのnpmパッケージのドキュメントの不具合を修正しました

試験的に公開していたLIFF SDKのnpmパッケージに関する[npm公式サイト上のドキュメント](https://www.npmjs.com/package/@line/liff)の不具合を修正しました。

### LIFF SDKのnpmパッケージの利用手順を移動しました

LIFF SDKのnpmパッケージのインストールおよびLIFFアプリへの組み込みの手順を[npm公式サイト](https://www.npmjs.com/package/@line/liff)からLINE Developersサイトに移動しました。詳しくは、「LIFFアプリを開発する」の「[npmパッケージを利用する](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#use-npm-package)」を参照してください。

2020/07/15

## LIFFのヘッダーに機能を追加しました

[2020年7月6日にお知らせ](https://developers.line.biz/ja/news/2020/07/06/liff-header-design-improvement/)したとおり、LIFFのヘッダーに機能を追加しました。

![LIFF header design to be improved](https://developers.line.biz/media/news/liff-header-design-improvement.png)

*   [LIFFアプリのアイコンが非表示になりました](#remove-liff-app-icon-07-15)
*   [シェアボタンが表示されるようになりました](#liff-share-button-07-15)

### LIFFアプリのアイコンが非表示になりました

LIFFアプリの左上に表示されていたアイコンが非表示になりました。

### シェアボタンが表示されるようになりました

[画面サイズ](https://developers.line.biz/ja/docs/liff/overview/#screen-size)を`Full`に設定しているLIFFアプリでは、ヘッダーにシェアボタンが表示されるようになりました。ユーザーがシェアボタンをタップすると、以下のオプションが表示されます。

| 項目 | 説明 |
| --- | --- |
| シェア | 現在開いているページのURLを、LINEメッセージでシェアします。 |
| 更新 | 現在開いているページを再読み込みします。 |

なお、LINE DevelopersコンソールでLIFFアプリの［**モジュールモード**］をオンにすると、シェアボタンを非表示にできます。

:::note warn
動作環境

:::

2020/07/01

## LIFF SDKをnpmパッケージとして公開しました

これまで、LIFFアプリにLIFF SDKを組み込むには、[CDNパスを指定する](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#integrating-sdk)必要がありました。

2020年7月1日より、LIFF SDKのnpmパッケージを試験的に公開しました。今後は、npmおよびYarnを利用して、LIFF SDKをインストールできます。

LIFF SDKのnpmパッケージについて詳しくは、[https://www.npmjs.com/package/@line/liff](https://www.npmjs.com/package/@line/liff)を参照してください。

また、npmパッケージとして利用できるLIFF SDKのバージョンはv2.3.0以降です。今後のLIFF SDKのバージョンアップの内容については、このページでお知らせします。

:::note warn
注意

:::

2020/06/29

## LIFF v2.3.0をリリースしました

LIFF v2.3.0では、以下の機能が追加されました。

*   [LIFFのエンドポイントURLでパスおよびクエリパラメータを利用できるようになりました](#liff-v2-3-0-endpoint-url)
*   [liff.permanentLink.createUrl()メソッドで例外が発生する条件を追加しました](#liff-v2-3-0-permanentLink)
*   [liff.shareTargetPicker()の送信結果を取得できるようになりました](#liff-v2-3-0-shareTargetPicker)
*   [liff.sendMessages()で返されるエラーコードを追加しました](#liff-v2-3-0-sendMessage)

### LIFFのエンドポイントURLでパスおよびクエリパラメータを利用できるようになりました

[LINE Developersコンソール](https://developers.line.biz/console/)の［**エンドポイントURL**］に入力したパス（`/path`）およびクエリパラメータ（`?key=value`）を、LIFFアプリで利用できるようになりました。

LIFFアプリの［**LIFF URLの追加情報の処理方法**］を「**連結**」に設定した場合、LIFFアプリにアクセスすると、パスやクエリパラメータを含む［**エンドポイントURL**］と、［**LIFF URL**］に指定した追加情報を組み合わせたURLにリダイレクトします。

詳しくは、『LIFFドキュメント』の「[LIFF アプリを開く](https://developers.line.biz/ja/docs/liff/opening-liff-app/)」を参照してください。

### liff.permanentLink.createUrl()メソッドで例外が発生する条件を追加しました

`liff.permanentLink.createUrl()`メソッドを実行したとき、現在のページのURLが［**エンドポイントURL**］に指定したURLで始まらない場合に、例外が発生します。

特に［**LIFF URLの追加情報の処理方法**］が「**置換（後方互換性モード）**」のときは、［**エンドポイントURL**］に指定したパスやクエリパラメータ（`/2020campaign/?key=value`）が、2次リダイレクト先に含まれないことがあります。その場合、`liff.permanentLink.createUrl()`メソッドが上記の条件を満たすため、パーマネントリンクを取得できません。

詳しくは、『LIFF v2 APIリファレンス』の「[`liff.permanentLink.createUrl()`](https://developers.line.biz/ja/reference/liff/#permanent-link-create-url)」を参照してください。

### liff.shareTargetPicker()の送信結果を取得できるようになりました

仕様変更前は、ターゲットピッカーを表示できたかどうかをLIFFアプリが確認できましたが、その後、メッセージを送信できたかどうかは確認できませんでした。

仕様変更後は、メッセージを送信できたかどうかを確認できるため、ユーザーの状況に合わせて、LIFFアプリの挙動を変更するように実装できます。

:::note warn
注意

:::

詳しくは、『LIFF v2 APIリファレンス』の「[`liff.shareTargetPicker()`](https://developers.line.biz/ja/reference/liff/#share-target-picker)」を参照してください。

### liff.sendMessages()で返されるエラーコードを追加しました

`liff.sendMessages()`に不正なパラメータを渡した場合、`LiffError`のエラーコードで`400`が返されていました。仕様変更後は、`400`の代わりに`INVALID_ARGUMENT`が返されます。

なお、エラーコードによって処理を分岐していない場合は、仕様変更の影響を受けません。

詳しくは、[2020年6月29日のニュース](https://developers.line.biz/ja/news/2020/06/29/release-liff-2.3/#sendMessage)を参照してください。

2020/06/15

## LIFF v2.2.0：LiffErrorのコードを追加しました

以下のメソッドで`Promise`がrejectされたときに渡される`LiffError`のコードがより詳細になり、問題の原因がわかりやすくなりました。

詳しくは、以下のメソッドの「エラーレスポンス」を参照してください。

*   [liff.init()](https://developers.line.biz/ja/reference/liff/#initialize-liff-app)
*   [liff.getProfile()](https://developers.line.biz/ja/reference/liff/#get-profile)
*   [liff.getFriendship()](https://developers.line.biz/ja/reference/liff/#get-friendship)

2020/04/30

## LIFF v2.1.13：LIFF v2にliff.getLineVersion()およびliff.idが追加されました

LIFF v2に、`liff.getLineVersion()`メソッドおよび`liff.id`プロパティが追加されました。

`liff.getLineVersion()`を使用すると、ユーザーのLINEバージョンを取得できます。

ユーザーがLIFFブラウザでLIFFアプリを開くと、ユーザーのLINEバージョンが文字列で返されます。ユーザーが外部ブラウザでLIFFアプリを開くと、 `null`が返されます。

`liff.id`は、 `liff.init()`に渡したLIFFアプリID（`String`型）を保持するプロパティです。

詳しくは、『LIFF v2 APIリファレンス』の「[liff.getLineVersion()](https://developers.line.biz/ja/reference/liff/#get-line-version)」および「[liff.id](https://developers.line.biz/ja/reference/liff/#id)」を参照してください。

2020/04/03

## LIFF v2にliff.isApiAvailable()が追加されました

LIFF v2に、`liff.isApiAvailable()`が追加されました。指定したAPIが、LIFFアプリを起動した環境で使用可能かどうかを確認できます。

:::note warn
注意

:::

### ターゲットピッカーの使用可否の確認

`liff.isApiAvailable()`を事前に実行することで、ターゲットピッカーが使用不可能な環境で`liff.shareTargetPicker()`を実行した際、ユーザーの画面にエラーメッセージが表示されることを避けられます。

javascript

`if (liff.isApiAvailable("shareTargetPicker")) {   liff    .shareTargetPicker([      {        type: "text",        text: "Hello, World!",      },    ])    .then(alert("ShareTargetPicker was launched"))    .catch(function (res) {      alert("Failed to launch ShareTargetPicker");    }); }`

詳しくは、『LIFF v2 APIリファレンス』の「[liff.isApiAvailable()](https://developers.line.biz/ja/reference/liff/#is-api-available)」を参照してください。

2020/03/03

## LIFF v2にliff.shareTargetPicker()およびliff.readyが追加されました

LIFF v2に、`liff.shareTargetPicker()`および`liff.ready`が追加されました。

### liff.shareTargetPicker()

ターゲットピッカー（グループまたは友だちを選択する画面）を表示し、ターゲットピッカーで選択した相手に、開発者が作成したメッセージを送信するメソッドが追加されました。このメッセージは、ユーザーが送信したかのように、グループまたは友だちに表示されます。

![target picker](https://developers.line.biz/media/news/share-target-picker.png)

詳しくは、『LIFFドキュメント』の「[ユーザーの友だちにメッセージを送信する](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#share-target-picker)」を参照してください。

:::note warn
ターゲットピッカーの動作環境について

:::

### liff.ready

LIFFアプリ起動後、[`liff.init()`](https://developers.line.biz/ja/reference/liff/#initialize-liff-app)の実行が初めて終了したときにresolveする`Promise`オブジェクトを利用できるようになりました。`liff.ready`を利用すると、`liff.init()`の終了を待って、任意の処理を実行できます。

詳しくは、『LIFF v2 APIリファレンス』の「[liff.ready](https://developers.line.biz/ja/reference/liff/#ready)」を参照してください。

2020/02/07

## LIFF v1 廃止対象APIと廃止スケジュール変更のお知らせ

[LINE Front-end Framework（LIFF） v1のサーバーAPIを2020年3月31日に廃止する告知](https://developers.line.biz/ja/news/2020/01/21/liff-server-api-deprecation/)をしましたが、影響範囲を考慮し提供を継続します。

LIFF v1全体の廃止時期については、決まり次第改めてお知らせしますが、早めの移行を推奨します。

| 機能 | 変更前のスケジュール | 変更後のスケジュール |
| --- | --- | --- |
| [LIFF v1 クライアントAPI](https://developers.line.biz/ja/reference/liff-v1/#client-api) | 廃止予定 | 廃止予定（変更ありません） |
| [LIFF v1 サーバーAPI](https://developers.line.biz/ja/reference/liff-v1/#server-api) | 2020年3月31日廃止 | **提供を継続** |

:::note warn
LIFF v1の廃止予定は変わりません

:::

2020/02/05

## Messaging APIのチャネルにはLIFFアプリを追加できなくなりました

[2019年11月11日に告知](https://developers.line.biz/ja/news/2019/11/11/liff-cannot-be-used-with-messaging-api-channels/)したとおり、LIFF v2の機能拡張に伴いMessaging APIのチャネルにはLIFFアプリを追加できなくなりました。

すでにMessaging APIチャネルに追加したLIFFアプリに関する制限や、LINEログインチャネルへの移行方法に関しては上記のニュース記事をご参照ください。

2020/01/21

## 2020年3月31日にLIFF v1のサーバーAPIの提供を終了します

2020年3月31日に、**LINE Front-end Framework（LIFF） v1のサーバーAPI**の提供を終了します。提供終了日に、以下の機能を削除する予定です。

*   [サーバーAPI](https://developers.line.biz/ja/reference/liff-server/)
    *   [LIFFアプリをチャネルに追加する](https://developers.line.biz/ja/reference/liff-server/#add-liff-app)
    *   [LIFFアプリの設定を更新する](https://developers.line.biz/ja/reference/liff-server/#update-liff-app)
    *   [すべてのLIFFアプリを取得する](https://developers.line.biz/ja/reference/liff-server/#get-all-liff-apps)
    *   [LIFFアプリをチャネルから削除する](https://developers.line.biz/ja/reference/liff-server/#delete-liff-app)

:::note warn
最新バージョンのLIFFを使用してください

:::

### LIFF v2を利用してください

提供を終了するサーバーAPIの機能は、すべて[LINE Developersコンソール](https://developers.line.biz/console/)で利用できます。LIFFアプリをチャネルに追加する操作について詳しくは、以下の項目を参照してください。

*   [LIFFアプリをチャネルに追加する](https://developers.line.biz/ja/docs/liff/registering-liff-apps/)

そのほかの機能も、同様の操作で利用できます。

LINEは今後もお客様への一層のサービス向上に取組んでまいります。何卒ご理解を賜りますよう、よろしくお願い申し上げます。

2020/01/14

## 提供を一時停止しているLIFF SDKのAPIを使用している場合はコードを修正してください

[2019年11月29日に告知](https://developers.line.biz/ja/news/2019/11/29/liff-functions-suspended/)したとおり、iOS版のLINE 9.19.0以降では、以下のAPIは、技術的な問題があり提供を一時停止しています。

*   liff.scanCode()
*   liff.bluetooth.\*

さらに本日から、**iOS版のLINE 9.19.0以降を使用するエンドユーザーが**LIFFアプリを利用した場合は、それぞれのAPIは以下のように動作します。

| API | 動作 |
| --- | --- |
| liff.scanCode() | APIが`undefined`になる |
| liff.bluetooth.\* | `liff.initPlugins(['bluetooth'])`を呼び出したときに、Bluetoothプラグインの初期化に失敗し、`FORBIDDEN`エラーが返される |

`liff.scanCode()`を利用する場合は、上記のケースも考慮し、関数の存在を確認することをお勧めします。

修正前：

text

`liff.scanCode().then(result => {   // result = { value: "" } });`

修正後：

text

`if (liff.scanCode) {     liff.scanCode().then(result => {       // result = { value: "" }     }); }`

詳しくは、『[LIFF v2 APIリファレンス](https://developers.line.biz/ja/reference/liff/)』を参照してください。

LINEは今後もお客様への一層のサービス向上に取組んでまいります。何卒ご理解を賜りますよう、よろしくお願い申し上げます。

2019/11/29

## LIFFの一部機能の提供の一時停止について

以下の機能は、技術的な問題があり提供を一時停止することになりました。今後の対応が決まり次第、改めてお知らせします。

*   `liff.scanCode()`
*   `liff.bluetooth.*`

### 一時停止バージョン

| LINE | 一時停止バージョン |
| --- | --- |
| iOS版LINE | 9.19.0以降は、上記の機能の提供を一時停止します |
| Android版LINE | 対応方法を検討しています |

ご利用のユーザー様にはご不便をおかけいたしますが、何卒ご理解いただきますようお願い申し上げます。

2019/11/11

## Messaging APIのチャネルにはLIFFアプリを追加できなくなります

LIFF v2では、LINEログインを中核とした機能拡張を予定しています。そのため、LINEログインチャネルにLIFFアプリを追加することを推奨します。それに伴い、現在サポートしているMessaging APIチャネルにLIFFアプリを追加できなくなる仕様変更が予定されています。

### 仕様変更時期

2020年2月上旬

### 影響

| チャネル種別 | 影響 |
| --- | --- |
| LINEログインチャネル | 仕様変更の影響を受けません。 |
| Messaging APIチャネル | 仕様変更以降は、Messaging APIチャネルにはLIFFアプリを**追加できません**。仕様変更時点でMessaging APIチャネルに追加済みのLIFFアプリは、引き続き使用できます。 |

:::note warn
Messaging APIチャネルにLIFFアプリを追加しないでください

:::

### LINEログインチャネルへの移行

Messaging APIチャネルに追加したLIFFアプリを継続して使用するには、LINEログインチャネルにLIFFアプリを追加し直してください。

LIFFアプリを追加し直すと、LIFFアプリIDが再発行されるため、以下の点に注意してください。

*   LIFF v2を利用している場合は、`liff.init()`に指定するLIFFアプリIDを変更してください。
*   LIFFを起動するためのLIFF URL（例：line://app/1234567890-AbcdEfgh）が変更されます。

:::note warn
Messaging APIチャネルに追加したLIFFアプリは削除してください

:::

2019/10/16

## LIFF v2がリリースされました

LINE Front-end Framework（LIFF） v2は、LINEが提供するウェブアプリのプラットフォームです。

:::note warn
最新バージョンのLIFFを使用してください

:::

### 外部ブラウザでLIFFアプリが動作します

LIFF v1では、LIFFアプリはLIFFブラウザでのみ動作していました。LIFF v2からは、外部ブラウザでも動作します。これにより、一般のウェブアプリと同じ開発環境で、LIFFアプリを開発できるようになりました。

### ユーザーのプロフィール情報とメールアドレスを取得できます

LINEログイン v2.1との互換性が向上したため、ユーザーIDやメールアドレスをLINEプラットフォームから取得できます。LIFFアプリではこれらを利用して、ユーザー情報を活用した機能を提供したり、メールを送信したりできます。

なお、外部ブラウザで動作しているときでも、LINEログインの処理（ウェブログイン）が利用できます。したがって、外部ブラウザで動作しているときも同様の情報を利用できます。

### QRコードを読み取れます

LINEのQRコードリーダーを起動し、ユーザーが読み取った文字列を取得できます。

### LIFFアプリの動作環境を細かく取得できます

LIFFアプリを動作させている環境の情報を細かく取得できます。取得できる情報は以下のとおりです。

*   LIFFアプリが動作しているOS（iOS、Android、外部ブラウザ）
*   LIFFブラウザで起動しているかどうか（true、false）
*   言語設定

詳しくは、「[LINE Front-end Framework](https://developers.line.biz/ja/docs/liff/overview/)」を参照してください。

2019/04/23

## LINE Front-end Frameworkの同意画面が改善されました

LINE Front-end Framework（LIFF）で、ユーザーがLIFFアプリを起動したときに表示される同意画面が改善されました。この改善は、すべてのLIFFアプリに自動的に適用されるため、追加の開発作業は不要です。

新画面（イメージ）

![New consent screen](https://developers.line.biz/media/news/liff-consent-screen-changed-01.png)

なお、ユーザーに「トークへのメッセージ送信」の認可を求めるLIFFアプリでは、同意画面でユーザーが許可しない場合があります。この場合は、次にユーザーがLIFFアプリを起動したときに同意画面が再表示されます。

2019/02/07

## LIFF SDKでアクセストークンを取得できるようになりました

LIFF SDKに`liff.getAccessToken()`メソッドが追加されました。

アクセストークンを使って[Social API](https://developers.line.biz/ja/docs/social-api/overview/)にリクエストを送信し、LINEプラットフォームのユーザーデータにアクセスできます。

詳しくは、「[ユーザーのアクセストークンを取得する](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#getting-tokens)」を参照してください。

2018/11/16

## LIFFのサーバーAPIが新しくなりました

LIFFアプリに以下のプロパティを設定できるようになりました。

*   `description`プロパティ
*   `features.ble`プロパティ

また、LIFFアプリを更新するAPIが変更され、プロパティを部分的に変更できるようになりました。

詳しくは、以下のセクションを参照してください。

*   [LIFFアプリを追加する](https://developers.line.biz/ja/reference/liff-server/#add-liff-app)
*   [LIFFアプリを更新する](https://developers.line.biz/ja/reference/liff-server/#update-liff-app)

2018/10/30

## LIFFアプリをLINE Developersコンソールで追加できるようになりました

LIFFアプリを[LINE Developersコンソール](https://developers.line.biz/console/)で追加できるようになりました。今までと同様に、LIFFサーバーAPIでもLIFFアプリを追加できます。

詳しくは、「[LIFFアプリを追加する](https://developers.line.biz/ja/docs/liff/registering-liff-apps/)」を参照してください。

2018/07/19

## LIFFアプリ数の上限が変更されました

LINE Front-end Frameworkで、1つのチャネルあたり最大30件のLIFFアプリを追加できるようになりました。以前の最大登録数は10件でした。

詳しくは、『LIFF APIリファレンス』の「[LIFFアプリを追加する](https://developers.line.biz/ja/reference/liff-server/#add-liff-app)」を参照してください。

2018/06/06

## LINE Front-end Frameworkがリリースされました

LINE Front-end Framework（LIFF）は、LINE内で動作するウェブアプリのプラットフォームです。

LIFFに登録したウェブアプリ（LIFFアプリ）をLINE内で起動すると、LINEのユーザーIDなどをLINEプラットフォームから取得できます。LIFFアプリではこれらを利用して、ユーザー情報を活用した機能を提供したり、ユーザーの代わりにメッセージを送信したりできます。

詳しくは、「[LINE Front-end Framework](https://developers.line.biz/ja/docs/liff/overview/)」を参照してください。

html pre.shiki code .sH3jZ, html code.shiki .sH3jZ{--shiki-default:#8B949E}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html pre.shiki code .sFSAA, html code.shiki .sFSAA{--shiki-default:#79C0FF}html pre.shiki code .sPWt5, html code.shiki .sPWt5{--shiki-default:#7EE787}