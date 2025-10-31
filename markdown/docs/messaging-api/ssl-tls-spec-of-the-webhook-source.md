---
url: https://developers.line.biz/ja/docs/messaging-api/ssl-tls-spec-of-the-webhook-source/
copied_at: 2025-10-24T10:15:21.094Z
---
# Webhook送信元のSSL/TLS仕様

Webhookの送信元であるLINEプラットフォームと、Webhook URL（ボットサーバー）との通信はHTTPSで行う必要があります。HTTPS通信するためのSSL/TLS証明書は、公的な認証局で発行されたSSL/TLS証明書を用意してください。SSL証明書は有償で購入する他、[Let's Encrypt](https://letsencrypt.org/)などの無償で発行したものも利用できます。

Webhookを受け取るボットサーバーは、以下の仕様に基づくHTTPSでの通信に対応してください。

*   [対応暗号スイート](#cipher-suites)
*   [SSL/TLSの対応プロトコルバージョン](#protocol-version)
*   [対応HTTPバージョン](#http-version)

## 対応暗号スイート

ステータスが[非推奨](https://developers.line.biz/ja/glossary/#deprecated)になっている暗号スイートは、互換性のために維持されていますが、近い将来に予告なく廃止される可能性があります。また暗号スイートによって、対応しているSSL/TLSのプロトコルバージョンやHTTPバージョンが異なります。

> [!TIP]
> 表は左右にスクロールできます
> 表を右にスクロールすると、それぞれの暗号スイートのステータスや、対応しているSSL/TLSのプロトコルバージョンやHTTPバージョンが確認できます。

| IANA | OpenSSL | Hex code | ステータス | SSL/TLSの対応プロトコルバージョン | 対応HTTPバージョン |
| --- | --- | --- | --- | --- | --- |
| TLS\_AES\_256\_GCM\_SHA384 | TLS\_AES\_256\_GCM\_SHA384 | 0x13, 0x02 |  | TLS 1.3 | <ul><li>HTTP/1.0</li><li>HTTP/1.1</li><li>HTTP/2</li></ul> |
| TLS\_CHACHA20\_POLY1305\_SHA256 | TLS\_CHACHA20\_POLY1305\_SHA256 | 0x13, 0x03 |  | TLS 1.3 | <ul><li>HTTP/1.0</li><li>HTTP/1.1</li><li>HTTP/2</li></ul> |
| TLS\_AES\_128\_GCM\_SHA256 | TLS\_AES\_128\_GCM\_SHA256 | 0x13, 0x01 |  | TLS 1.3 | <ul><li>HTTP/1.0</li><li>HTTP/1.1</li><li>HTTP/2</li></ul> |
| TLS\_ECDHE\_ECDSA\_WITH\_AES\_128\_GCM\_SHA256 | ECDHE-ECDSA-AES128-GCM-SHA256 | 0xc0, 0x2b |  | TLS 1.2 | <ul><li>HTTP/1.0</li><li>HTTP/1.1</li><li>HTTP/2</li></ul> |
| TLS\_ECDHE\_RSA\_WITH\_AES\_128\_GCM\_SHA256 | ECDHE-RSA-AES128-GCM-SHA256 | 0xc0,0x2f |  | TLS 1.2 | <ul><li>HTTP/1.0</li><li>HTTP/1.1</li><li>HTTP/2</li></ul> |
| TLS\_ECDHE\_ECDSA\_WITH\_AES\_256\_GCM\_SHA384 | ECDHE-ECDSA-AES256-GCM-SHA384 | 0xc0, 0x2c |  | TLS 1.2 | <ul><li>HTTP/1.0</li><li>HTTP/1.1</li><li>HTTP/2</li></ul> |
| TLS\_ECDHE\_RSA\_WITH\_AES\_256\_GCM\_SHA384 | ECDHE-RSA-AES256-GCM-SHA384 | 0xc0, 0x30 |  | TLS 1.2 | <ul><li>HTTP/1.0</li><li>HTTP/1.1</li><li>HTTP/2</li></ul> |
| TLS\_ECDHE\_ECDSA\_WITH\_CHACHA20\_POLY1305\_SHA256 | ECDHE-ECDSA-CHACHA20-POLY1305 | 0xcc, 0xa9 |  | TLS 1.2 | <ul><li>HTTP/1.0</li><li>HTTP/1.1</li><li>HTTP/2</li></ul> |
| TLS\_ECDHE\_RSA\_WITH\_CHACHA20\_POLY1305\_SHA256 | ECDHE-RSA-CHACHA20-POLY1305 | 0xcc, 0xa8 |  | TLS 1.2 | <ul><li>HTTP/1.0</li><li>HTTP/1.1</li><li>HTTP/2</li></ul> |
| TLS\_ECDHE\_RSA\_WITH\_AES\_128\_CBC\_SHA | ECDHE-RSA-AES128-SHA | 0xc0, 0x13 | 非推奨 | TLS 1.2 | <ul><li>HTTP/1.0</li><li>HTTP/1.1</li></ul> |
| TLS\_ECDHE\_RSA\_WITH\_AES\_256\_CBC\_SHA | ECDHE-RSA-AES256-SHA | 0xc0, 0x14 | 非推奨 | TLS 1.2 | <ul><li>HTTP/1.0</li><li>HTTP/1.1</li></ul> |
| TLS\_RSA\_WITH\_AES\_128\_GCM\_SHA256 | AES128-GCM-SHA256 | 0x00, 0x9c | 非推奨 | TLS 1.2 | <ul><li>HTTP/1.0</li><li>HTTP/1.1</li></ul> |
| TLS\_RSA\_WITH\_AES\_128\_CBC\_SHA | AES128-SHA | 0x00, 0x2f | 非推奨 | TLS 1.2 | <ul><li>HTTP/1.0</li><li>HTTP/1.1</li></ul> |
| TLS\_RSA\_WITH\_AES\_256\_CBC\_SHA | AES256-SHA | 0x00, 0x35 | 非推奨 | TLS 1.2 | <ul><li>HTTP/1.0</li><li>HTTP/1.1</li></ul> |

## SSL/TLSの対応プロトコルバージョン

暗号スイートによって、対応しているプロトコルバージョンが異なります。詳しくは、[対応暗号スイート](#cipher-suites)の「SSL/TLSの対応プロトコルバージョン」列を参照してください。

| プロトコルバージョン | 対応 |
| --- | --- |
| TLS 1.3 | ✅ |
| TLS 1.2 | ✅ |
| TLS 1.1以下 | ❌ |

## 対応HTTPバージョン

暗号スイートによって、対応しているHTTPバージョンが異なります。詳しくは、[対応暗号スイート](#cipher-suites)の「対応HTTPバージョン」列を参照してください。

| HTTPバージョン | 対応 |
| --- | --- |
| HTTP/2 | ✅ |
| HTTP/1.1 | ✅ |
| HTTP/1.0 | ✅ |