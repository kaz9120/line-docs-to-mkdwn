---
url: https://developers.line.biz/ja/docs/basics/line-api-status/
copied_at: 2025-10-23T15:55:18.698Z
---
# LINEプラットフォームの稼働状況を確認する（LINE API Status）

LINEヤフー株式会社では、LINEプラットフォームの稼働状況や障害状況を確認できる[LINE API Status](https://api.line-status.info/)を提供しています。

*   [LINE API Statusとは](#status-01)
    *   [ATOMやRSSのフィードの提供](#status-subscribe)
    *   [安定稼働時の表示](#status-02)
    *   [障害発生時の表示](#status-03)
*   [LINE API Statusの対象となるサービス](#status-04)
*   [LINE API Statusへのアクセス](#status-05)

## LINE API Statusとは

LINE API Statusは、LINEプラットフォームの稼働状況や障害状況を確認できるサイトです。稼働状況や障害状況の情報は英語で提供されます。

:::note warn
LINE API Statusの情報について

:::

*   [LINE API Status](https://api.line-status.info/)  
    ![](https://developers.line.biz/media/basics/line-api-status.png)

### ATOMやRSSのフィードの提供

LINE API StatusではATOMやRSSのフィードを提供しています。LINE API Statusで［**SUBSCRIBE TO UPDATES**］をクリックすると、ATOMやRSSのフィードを取得できます。

![](https://developers.line.biz/media/news/line_api_status_rss_feed.png)

### 安定稼働時の表示

何も障害が起きていない安定稼働時は、`All Systems Operational`と表示されます。

![](https://developers.line.biz/media/news/line_api_status_operational.png)

### 障害発生時の表示

障害が起きている場合は、次のように対象のサービスや発生事象が表示されます。

![](https://developers.line.biz/media/news/line_api_status_outage.png)

また障害状況は、[LINE Developersサイト](https://developers.line.biz/ja/)においても次のようにポップアップで表示されます。

![](https://developers.line.biz/media/news/line_api_status_outage_popup.png)

## LINE API Statusの対象となるサービス

LINE API Statusの対象となるサービスは以下のとおりです。

*   Messaging API
    *   API
    *   Webhook
*   LINE Developers
    *   LINE Developersサイト
    *   LINE Developersコンソール
*   LIFF
*   LINEログイン

現時点では、LINEアプリや上記以外のサービスはLINE API Statusの対象外です。

## LINE API Statusへのアクセス

LINE API Statusは、LINE Developersサイトのヘッダーの［**その他**］や、フッターからアクセスできます。

![](https://developers.line.biz/media/basics/line-api-status-from-header-ja.png)

![](https://developers.line.biz/media/basics/line-api-status-from-footer-ja.png)