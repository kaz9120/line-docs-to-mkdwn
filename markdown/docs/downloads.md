---
url: https://developers.line.biz/ja/docs/downloads/
copied_at: 2025-10-24T06:29:10.505Z
---
# LINE APIのSDK

> [!TIP]
> ソースコードのダウンロードは必須ではありません
> アプリでLINE SDKを使用する際は、このページに掲載されているソースコードのダウンロードは必須ではありません。各ドキュメントの説明に従って操作すると、ソースコードをダウンロードしなくてもSDKを使用できます。
> 
> なお、ソースコードが必要な場合は、以下のリンクからダウンロードできます。

## LINE Messaging API SDK

LINE Messaging API SDKには、ライブラリ、ツール、およびサンプルが含まれています。SDKを使えば、Messaging APIを組み込んだボットアプリの開発を簡単に始めることができます。[公式SDK](#official-sdks)と[コミュニティSDK](#community-sdks)の両方とも、オープンソースとして提供されておりさまざまなプログラミング言語で利用できます。

### 公式SDK

公式SDKは以下の言語をサポートしています。

*   [Java](https://github.com/line/line-bot-sdk-java)（[リリースノート](https://github.com/line/line-bot-sdk-java/releases)）
*   [PHP](https://github.com/line/line-bot-sdk-php)（[リリースノート](https://github.com/line/line-bot-sdk-php/releases)）
*   [Python](https://github.com/line/line-bot-sdk-python)（[リリースノート](https://github.com/line/line-bot-sdk-python/releases)）
*   [Node.js](https://github.com/line/line-bot-sdk-nodejs)（[リリースノート](https://github.com/line/line-bot-sdk-nodejs/releases)）
*   [Go](https://github.com/line/line-bot-sdk-go)（[リリースノート](https://github.com/line/line-bot-sdk-go/releases)）
*   [Ruby](https://github.com/line/line-bot-sdk-ruby)（[リリースノート](https://github.com/line/line-bot-sdk-ruby/releases)）

#### アーカイブ

以下の言語の公式SDKは、更新を終了しました。各SDKは引き続き使用できますが、今後は新機能の追加やバグフィックス、セキュリティの改善などの変更は一切行われません。

*   [Perl](https://github.com/line/line-bot-sdk-perl)（[リリースノート](https://github.com/line/line-bot-sdk-perl/releases)）

### LINE OpenAPI

LINE OpenAPIは、Messaging APIやLIFFのサーバーAPIなど、LINEプラットフォームが提供しているAPIのインタフェースを、OpenAPIの仕様に従って定義したものです。LINE OpenAPIを用いることで、SDKが提供されていないプログラミング言語でも、[OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator)や[Swagger Codegen](https://github.com/swagger-api/swagger-codegen)などのコードジェネレーターにより、LINEプラットフォームが提供している機能を利用しやすくなります。

*   [LINE OpenAPI](https://github.com/line/line-openapi)

### コミュニティSDKとライブラリ

サードパーティの開発者が開発するSDKとライブラリです。一般的なオープンソースライセンスが適用されます。LINEヤフー株式会社はコミュニティSDKに対して限定的なレビューを行いますが、これらのSDKの公式サポートや動作保証は提供しません。各SDKの適用ライセンスと免責事項を参照してください。

| ライブラリ | 言語/<br/>技術 | 概要 | 公開者 | ライセンス | GitHubスター数 |
| --- | --- | --- | --- | --- | --- |
| [fireliff-cli](https://github.com/micksatana/fireliff-cli) | N/A | LIFF用のCLI | [intocode](https://github.com/intocode-dev) | MIT | [![GitHub stars](https://img.shields.io/github/stars/intocode-io/fireliff-cli.svg)](https://github.com/kenakamu/LINEChannelConnector) |
| [LINEChannelConnector](https://github.com/kenakamu/LINEChannelConnector) | N/A | BotBuilder用のコネクター | [kenakamu](https://github.com/kenakamu) | MIT | [![GitHub stars](https://img.shields.io/github/stars/kenakamu/LINEChannelConnector.svg)](https://github.com/kenakamu/LINEChannelConnector) |
| [line\_bot\_framework](https://github.com/shidec/line_bot_framework) | PHP | ボット開発フレームワーク | [shidec](https://github.com/shidec) | MIT | [![GitHub stars](https://img.shields.io/github/stars/shidec/line_bot_framework.svg)](https://github.com/shidec/line_bot_framework) |
| [line-chatbot-boilerplate](https://github.com/mgilangjanuar/line-chatbot-boilerplate) | Python | ボット開発テンプレート | [mgilangjanuar](https://github.com/mgilangjanuar) | MIT | [![GitHub stars](https://img.shields.io/github/stars/mgilangjanuar/line-chatbot-boilerplate.svg)](https://github.com/mgilangjanuar/line-chatbot-boilerplate) |
| [LINESimulator](https://github.com/kenakamu/linesimulator) | N/A | ボット開発デバッグ用のLINEシミュレーター | [kenakamu](https://github.com/kenakamu) | MIT | [![GitHub stars](https://img.shields.io/github/stars/kenakamu/linesimulator.svg)](https://github.com/kenakamu/linesimulator) |
| [line-richmenus-manager](https://github.com/kenakamu/line-richmenus-manager) | N/A | リッチメニューの作成・管理のためのGUIツール | [kenakamu](https://github.com/kenakamu) | MIT | [![GitHub stars](https://img.shields.io/github/stars/kenakamu/line-richmenus-manager.svg)](https://github.com/kenakamu/line-richmenus-manager) |
| [linebot](https://github.com/boybundit/linebot) | Node.js | Node.js向けLINE Messaging API SDK | [boybundit](https://github.com/boybundit) | MIT | [![GitHub stars](https://img.shields.io/github/stars/boybundit/linebot.svg)](https://github.com/boybundit/linebot) |
| [botbuilder-linebot-connector](https://github.com/Wolke/botbuilder-linebot-connector) | Node.js | LINE Messaging API向けMicrosoft Bot Framework v3コネクター | [Wolke](https://github.com/Wolke) | MIT | [![GitHub stars](https://img.shields.io/github/stars/Wolke/botbuilder-linebot-connector.svg)](https://github.com/Wolke/botbuilder-linebot-connector) |
| [bottender](https://github.com/Yoctol/bottender) | Node.js | 複数のプラットフォームで動作するボットを短時間で作成できるフレームワーク | [Yoctol](https://github.com/Yoctol) | MIT | [![GitHub stars](https://img.shields.io/github/stars/Yoctol/bottender.svg)](https://github.com/Yoctol/bottender) |
| [messaging-api-line](https://github.com/bottenderjs/messaging-apis/tree/master/packages/messaging-api-line) | Node.js | Node.js向けLINE Messaging API SDK | [Yoctol](https://github.com/Yoctol) | MIT | [![GitHub stars](https://img.shields.io/github/stars/Yoctol/messaging-apis.svg)](https://github.com/bottenderjs/messaging-apis/tree/master/packages/messaging-api-line) |
| [line-bot-sdk-dotnet](https://github.com/dlemstra/line-bot-sdk-dotnet) | C# | .NET Standard向けLINE Messaging API SDK | [dlemstra](https://github.com/dlemstra) | Apache-2.0 | [![GitHub stars](https://img.shields.io/github/stars/dlemstra/line-bot-sdk-dotnet.svg)](https://github.com/dlemstra/line-bot-sdk-dotnet) |
| [LineMessagingApi](https://github.com/pierre3/LineMessagingApi) | C# | C#向けLINE Messaging API SDK | [pierre3](https://github.com/pierre3) | MIT | [![GitHub stars](https://img.shields.io/github/stars/pierre3/LineMessagingApi.svg)](https://github.com/pierre3/LineMessagingApi) |
| [line-bot-sdk](https://github.com/moleike/line-bot-sdk) | Haskell | Haskell向けLINE Messaging API SDK | [moleike](https://github.com/moleike) | BSD | [![GitHub stars](https://img.shields.io/github/stars/moleike/line-bot-sdk.svg)](https://github.com/moleike/line-bot-sdk) |

## LIFF SDK

LINE Front-end Framework（LIFF）で動作するアプリには、次の方法でLIFF SDKを組み込めます。

LIFF v2 SDKは[CDNパスを指定する](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#specify-cdn-path)か、[npmパッケージを利用する](https://developers.line.biz/ja/docs/liff/developing-liff-apps/#use-npm-package)方法でLIFFアプリに組み込むことができます。

## LINE SDK for iOS Swift

[LINE SDK for iOS Swiftのオープンソースリポジトリ](https://github.com/line/line-sdk-ios-swift/releases)からSDKのソースコードをダウンロードできます。

## LINE SDK for Android

[LINE SDK for Androidのオープンソースリポジトリ](https://github.com/line/line-sdk-android/releases)からSDKのソースコードおよびAARファイルをダウンロードできます。

## LINE SDK for Unity

[LINE SDK for Unityのオープンソースリポジトリ](https://github.com/line/line-sdk-unity/releases)からSDKのソースコードをダウンロードできます。

## LINE SDK for Flutter

[LINE SDK for Flutterのオープンソースリポジトリ](https://github.com/line/flutter_line_sdk/releases)からSDKのソースコードをダウンロードできます。