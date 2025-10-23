---
url: https://developers.line.biz/ja/glossary/
copied_at: 2025-10-23T16:02:58.143Z
---
# LINEプラットフォーム用語集

### E.164

E.164は、国際的に一意な電話番号の形式についての勧告です。E.164の形式は最大15桁で、プラス記号と国番号からはじまります。たとえば、日本（国番号は`81`）の電話番号`09001234567`をE.164の形式に直すと、`+819001234567`になります。読みやすくするために、`-`を区切りとして使用しても構いません。

### IDトークン

アプリに権限を付与したユーザーの情報を含むJSONウェブトークン（JWT）。詳しくは、「[IDトークン](https://developers.line.biz/ja/docs/line-login/verify-id-token/#id-tokens)」を参照してください。

### LIFF URL

LIFFアプリにアクセスするためのURLです（例：`https://liff.line.me/1234567890-AbcdEfgh`）。LIFFアプリをチャネルに追加することで作成されます。詳しくは、『LIFFドキュメント』の「[LIFFアプリをチャネルに追加する](https://developers.line.biz/ja/docs/liff/registering-liff-apps/)」を参照してください。

### LIFFブラウザ

LIFFアプリ専用のブラウザ。ユーザーがLINEでLIFFのURLを開くと、LIFFブラウザでLIFFアプリが開きます。詳しくは、「[LIFFブラウザ](https://developers.line.biz/ja/docs/liff/overview/#liff-browser)」を参照してください。

### LINE API

LINEヤフー株式会社が外部の企業や開発者に向けて提供している、LINEヤフー株式会社のサービスとの連携が可能になるAPIの総称。

### LINE API Expert

積極的に[開発者コミュニティ](https://developers.line.biz/ja/community/)に参加し、LINE APIプロダクトの利用を推進する開発者を評価し、支援するためのプログラム。詳しくは、「[LINE API Experts](https://developers.line.biz/ja/community/#lae)」を参照してください。

### LINE Beacon

友だちになっているLINEユーザーがビーコンの圏内を出入りしたときに、Webhookを介してボットに通知を送信する機能。詳しくは、「[LINEでビーコンを使う](https://developers.line.biz/ja/docs/messaging-api/using-beacons/)」を参照してください。

### LINE Developersコンソール

LINE Developersサイトで利用できる管理ツール。[チャネル](https://developers.line.biz/ja/glossary/#channel)と[プロバイダー](https://developers.line.biz/ja/glossary/#provider)を作成して管理できます。

### LINE Messaging API SDK

ライブラリ、ツール、およびサンプルを含む開発キット。このSDKを使えば、Messaging APIを組み込んだボットアプリの開発を簡単に始めることができます。詳しくは、「[LINE Messaging API SDK](https://developers.line.biz/ja/docs/messaging-api/line-bot-sdk/)」を参照してください。

### LINE Official Account Manager

LINE公式アカウントを管理し設定するための管理ツール。このツールを使って、LINE VOOMに投稿したり、プロフィールを作成したりできます。

### LINE Profile+

LINEユーザーのプロフィール情報を管理するサービス。ユーザーがLINE Profile+に登録した住所や誕生日などの情報は、通常の[プロフィール情報](https://developers.line.biz/ja/glossary/#profile-information)とは異なり、所定の申請等を行った法人ユーザーのみが取得できます。詳しくは、『法人ユーザー向けオプションドキュメント』の「[LINE Profile+](https://developers.line.biz/ja/docs/partner-docs/line-profile-plus/)」を参照してください。

### LINE Simple Beacon

LINEボットの開発者向けの、ビーコンハードウェアの規格。詳しくは、「[LINE Simple Beacon](https://github.com/line/line-simple-beacon)」を参照してください。

### LINE VOOM

LINE内の動画プラットフォーム。

### LINE公式アカウント

Messaging APIのチャネルと紐づけられる、検索可能なLINEアカウント。詳しくは、『LINEヤフー for Business』の「[LINE公式アカウント](https://www.lycbiz.com/jp/service/line-official-account/)」を参照してください。

### LINE内ブラウザ

LINEのアプリ内専用のウェブブラウザ。LINE内ブラウザを使うとLINEアプリを閉じずにURLを開いてインターネット上のウェブアプリを閲覧することができます。

### LINEプラットフォーム

サードパーティの開発者がアプリにLINEサービスを組み込むためのプラットフォーム。

### LINEログインボタン

LINEログインを使ってユーザーがLINEにログインできるボタン。ウェブアプリやネイティブアプリに組み込むことができます。詳しくは、「[LINEログインボタンデザインガイドライン](https://developers.line.biz/ja/docs/line-login/login-button/)」を参照してください。

### MID

LINEのユーザーアカウント、グループトーク、または複数人トークを指定する固有のID文字列で、LINEログイン v1で使用していました。LINEログイン v2.0以降では、MIDではなくユーザーID、グループID、またはトークルームIDを使用します。

### Webhook URL

ボットサーバーのエンドポイントのURL。Webhookがトリガーされると、LINEプラットフォームからWebhook URLにリクエストが送信されます。Webhookイベントは、ユーザーがボットとやり取りするとトリガーされます。

### アクセストークン

[LINEログインAPI](https://developers.line.biz/ja/docs/line-login/overview/)にリクエストを送信するために使用されるトークン。アクセストークンは、ユーザーがLINEログインを使ってアプリにログインし、アプリから要求された権限を付与することに同意すると発行されます。

### アクティブ

サービスの[ライフサイクル](https://developers.line.biz/ja/glossary/#life-cycle)におけるステータスの1つで、サービスの現行のメジャーバージョンを指します。「アクティブ」期間中は、新機能の追加やバグフィックス、セキュリティの改善などが行われます。

### イメージマップメッセージ

画像を含むメッセージ。この画像内の複数の領域にリンクを設定できます。詳しくは、「[イメージマップメッセージ](https://developers.line.biz/ja/docs/messaging-api/message-types/#imagemap-messages)」を参照してください。

### 外部ブラウザ

Chrome、SafariやFirefoxなどLINEアプリ外で開くウェブブラウザ。

### 確認テンプレートメッセージ

アクションボタンが2つ含まれたテンプレートメッセージ。詳しくは、「[確認テンプレート](https://developers.line.biz/ja/docs/messaging-api/message-types/#confirm-template)」を参照してください。

### カスタムスタンプ

ユーザーが名前などを入力して使えるLINEスタンプ。パッケージごとに指定された最大文字数まで自由にテキストを入力できます。一度購入したスタンプは、何度でもテキストを入力し直すことができます。詳しくは、LINE Creators Marketにあるカスタムスタンプの[制作ガイドライン](https://creator.line.me/ja/guideline/customsticker/)を参照してください。

### 画像カルーセルテンプレートメッセージ

ユーザーがスクロールできる複数のカラムを含む、テンプレートメッセージです。各カラムには画像が含まれます。詳しくは、「[画像カルーセルテンプレート](https://developers.line.biz/ja/docs/messaging-api/message-types/#image-carousel-template)」を参照してください。

### カルーセルテンプレートメッセージ

ユーザーがスクロールできる複数のカラムを含む、テンプレートメッセージです。各カラムには、画像、タイトル、説明テキストに加えて、複数のアクションボタンが含まれます。詳しくは、「[カルーセルテンプレート](https://developers.line.biz/ja/docs/messaging-api/message-types/#carousel-template)」を参照してください。

### グループID

[グループトーク](https://developers.line.biz/ja/glossary/#group)を識別するための識別子。グループIDの値は`C[0-9a-f]{32}`の正規表現にマッチする文字列になります。

### グループトーク

複数人での継続的な利用を想定して設計されたトーク。グループトークには識別子としてグループIDが発行されます。詳しくは、「[グループトーク](https://developers.line.biz/ja/docs/messaging-api/group-chats/#group)」を参照してください。

### コールバックURL

ユーザーがLINEログインを使ってログインした後にリダイレクトされるURL。[LINE Developersコンソール](https://developers.line.biz/console/)でアプリのコールバックURLを設定できます。LINEログインの[認可リクエスト](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#making-an-authorization-request)の`redirect_uri`パラメータで、コールバックURLを使用します。

### サブプロフィール

既存のプロフィールとは分けて作れるプロフィールです。会社の同僚にはフォーマルなプロフィール、趣味の友だちにはカジュアルなプロフィールなど、友だちごとに表示するプロフィールを変えられます。詳しくは、『LINEみんなの使い方ガイド』の「[友だちに表示するプロフィールを使い分けることができる「サブプロフィール」の使い方](https://guide.line.me/ja/account-and-settings/subprofile.html)」を参照してください。

### ステータスメッセージ

ユーザーのLINEプロフィールに表示されるメッセージ。このメッセージを使って、考えや気持ちをLINEの友だちに伝えることができます。

### ターゲットリーチ

性別や年齢、地域で絞り込んだターゲティングメッセージの配信先となる友だちの母数です。LINEおよびその他のLINEサービスの利用頻度が高く、属性の高精度な推定が可能な友だちが含まれます。

### チャネル

LINEプラットフォームが提供する機能を、プロバイダーが開発するサービスで利用するための通信路。チャネルは、[LINE Developersコンソール](https://developers.line.biz/console/)で作成できます。

### チャネルID

チャネルの一意な識別子。この値は、[LINE Developersコンソール](https://developers.line.biz/console/)の［チャネル基本設定］ページで確認できます。

### チャネルアクセストークン

LINEプラットフォームへのリクエストにおいて、[チャネル](https://developers.line.biz/ja/glossary/#channel)の利用権限を持っているかを確認するために使用されるトークン。詳しくは、『LINEプラットフォームの基礎知識』の「[チャネルアクセストークン](https://developers.line.biz/ja/docs/basics/channel-access-token/)」を参照してください。

### チャネルシークレット

チャネルの署名キー。この値は、[LINE Developersコンソール](https://developers.line.biz/console/)の［チャネル基本設定］ページで確認できます。

### テンプレートメッセージ

事前定義されたレイアウトを持つメッセージ。このレイアウトをカスタマイズして使用します。テンプレートメッセージを使って、ユーザーはより簡単にLINE公式アカウントとやり取りできます。テンプレートメッセージのタイプには、ボタン、確認、カルーセル、および画像カルーセルがあります。詳しくは、「[テンプレートメッセージ](https://developers.line.biz/ja/docs/messaging-api/message-types/#template-messages)」を参照してください。

### トークルームID

[複数人トーク](https://developers.line.biz/ja/glossary/#room)を識別するための識別子。トークルームIDの値は`R[0-9a-f]{32}`の正規表現にマッチする文字列になります。

### 内部識別子

一意に識別するため、LINEプラットフォームが発行する識別子。ユーザーを識別するための内部識別子として、[ユーザーID](https://developers.line.biz/ja/glossary/#user-id)があります。ユーザーIDは、LINEに表示されるLINE IDとは異なります。なお、ユーザーIDは、ユーザー識別子、UIDとも呼ばれます。

### パーマネントリンク（LIFF）

[LIFF URL](https://developers.line.biz/ja/glossary/#liff-url)に、パスやクエリパラメータ、URLフラグメントといった追加情報を指定したURLです。[アクションボタン](https://developers.line.biz/ja/docs/liff/overview/#action-button)から現在開いているページをシェアすると、URLとしてパーマネントリンクが送られます。

### 廃止

サービスの[ライフサイクル](https://developers.line.biz/ja/glossary/#life-cycle)におけるステータスの1つです。「廃止」とは、特定のプロダクトやサービス、機能、バージョンなどが、そのライフサイクルにおいてこれ以上継続して使用できない期限を迎えたことを意味します。

### ビーコンバナー

ユーザーがビーコンの圏内に入ると、LINEの［友だち］画面または［トーク］画面に表示されるバナー。詳しくは、「[ビーコンバナー](https://developers.line.biz/ja/docs/messaging-api/using-beacons/#beacon-banner)」を参照してください。

### 非推奨

サービスの[ライフサイクル](https://developers.line.biz/ja/glossary/#life-cycle)におけるステータスの1つです。「非推奨」期間中は、新機能の追加やバグフィックス、セキュリティの改善は行われません。「非推奨」期間中のサービスの利用はお勧めしません。

### 複数人トーク

複数人での一時的な利用を想定して設計されたトーク。複数人トークには識別子としてトークルームIDが発行されます。LINEバージョン10.17.0以降、LINEの複数人トークは[グループトーク](https://developers.line.biz/ja/glossary/#group)に統合されました。詳しくは、「[複数人トーク](https://developers.line.biz/ja/docs/messaging-api/group-chats/#room)」を参照してください。

### プレミアムID

LINE公式アカウントのIDとして、希望する文字列を設定できる有料のオプション。LINE公式アカウントのLINE IDには、ベーシックIDとプレミアムIDの2種類があります。詳しくは、『LINEヤフー for Business』の「[料金プラン](https://www.lycbiz.com/jp/service/line-official-account/plan/)」を参照してください。

### プレミアムアカウント

所定の審査を通過したLINE公式アカウント。プレミアムアカウントになると、プロフィールやトークでアカウント名の横に緑色のアカウントバッジが表示されます。プレミアムアカウントと[プレミアムID](https://developers.line.biz/ja/glossary/#premium-id)は異なるものです。詳しくは、『LINEヤフー for Business』の「[LINE公式アカウント アカウント種別](https://www.lycbiz.com/jp/service/line-official-account/account-type/)」を参照してください。

### プロバイダー

[チャネル](https://developers.line.biz/ja/glossary/#channel)にアプリを提供する個人または組織。たとえば、個人や企業の名前をプロバイダーとして使用できます。プロバイダーは、[LINE Developersコンソール](https://developers.line.biz/console/)で作成できます。

### プロフィール情報

ユーザーがLINEアカウントに登録しているプロフィール情報。Messaging APIやLINEログイン、LIFF、そしてLINEミニアプリでは、表示名やプロフィール画像といったユーザーのプロフィール情報を取得できます。詳しくは、『LINEプラットフォームの基礎知識』の「[ユーザーのプロフィール情報を取得する](https://developers.line.biz/ja/docs/basics/user-profile/)」を参照してください。

### ボタンテンプレートメッセージ

画像、タイトル、説明テキストに加えて、複数のアクションボタンが含まれたテンプレートメッセージです。詳しくは、「[ボタンテンプレート](https://developers.line.biz/ja/docs/messaging-api/message-types/#buttons-template)」を参照してください。

### メッセージスタンプ

ユーザーが任意のテキストを入力して使えるLINEスタンプ。スタンプ1つ1つに最大100文字まで自由にテキストを入力できます。一度購入したスタンプは、何度でもテキストを入力し直すことができます。詳しくは、LINE Creators Marketにあるメッセージスタンプの[制作ガイドライン](https://creator.line.me/ja/guideline/messagesticker/)を参照してください。

### メンテナンス

サービスの[ライフサイクル](https://developers.line.biz/ja/glossary/#life-cycle)におけるステータスの1つです。「メンテナンス」期間中は、新機能は追加されませんが、現在のユーザーの利便性を維持するために、バグフィックスやセキュリティの改善が行われます。

### ユーザーID

[プロバイダー](https://developers.line.biz/ja/glossary/#provider)ごとにユーザーを識別するための識別子。1人のLINEユーザーは、プロバイダーごとに異なるユーザーIDを持ちます。LINEに表示されるLINE IDとは異なります。

### ライフサイクル

サービスのリリースから廃止までを4つのステータス（「[アクティブ](https://developers.line.biz/ja/glossary/#active)」、「[メンテナンス](https://developers.line.biz/ja/glossary/#maintaining)」、「[非推奨](https://developers.line.biz/ja/glossary/#deprecated)」、「[廃止](https://developers.line.biz/ja/glossary/#end-of-life)」）で表現したものです。

### リッチメニューエイリアス

リッチメニューを参照するための識別名。たとえば「リッチメニューの切替」を設定する場合、切替先のリッチメニューIDを直接指定するのではなく、そのリッチメニューIDと紐づくリッチメニューエイリアスを指定します。詳しくは、『Messaging APIドキュメント』の「[リッチメニューでタブ切り替えを行う](https://developers.line.biz/ja/docs/messaging-api/switch-rich-menus/)」を参照してください。