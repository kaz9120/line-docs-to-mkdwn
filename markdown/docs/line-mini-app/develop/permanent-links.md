---
url: https://developers.line.biz/ja/docs/line-mini-app/develop/permanent-links/
copied_at: 2025-10-23T16:01:18.749Z
---
# パーマネントリンクを作成する

ユーザーがLINEミニアプリにアクセスするために、LIFF URLだけでなく、パーマネントリンクも使用できます。ただし、LINEミニアプリのページをシェアするときは、LIFF URLではなく、パーマネントリンクを使用してください。

[ヘッダー](https://developers.line.biz/ja/docs/line-mini-app/discover/ui-components/#header)に表示されるアクションボタンから、LINEミニアプリのページをシェアした場合は、自動的にそのページのパーマネントリンクが作成されます。

それ以外の状況では、以下の計算式に従ってパーマネントリンクを作成してください。

`LIFF URL + (LINEミニアプリページのURL - エンドポイントURL) = パーマネントリンク`

例：

| 項目 | 設定 |
| --- | --- |
| LIFF URL（※） | `https://miniapp.line.me/123456-abcedfg` |
| LINEミニアプリページのURL | `https://example.com/shop?search=shoes#item10` |
| エンドポイントURL（※） | `https://example.com` |

※[LINE Developersコンソール](https://developers.line.biz/console/)の［**ウェブアプリ設定**］タブで確認できます。

この場合、LINEミニアプリページのURLに対応するパーマネントリンクは、以下のとおりです。

text

`https://miniapp.line.me/123456-abcedfg/shop?search=shoes#item10`

:::note info
ヒント

:::

:::note warn
LINEミニアプリのLIFF URLが変更されました

:::

## LINEアプリのバージョンによるドメイン名の違い

ヘッダーに表示される[アクションボタン](https://developers.line.biz/ja/docs/line-mini-app/discover/builtin-features/#action-button)からLINEミニアプリをシェアする場合、LINEアプリのバージョンによって作成されるパーマネントリンクのドメイン名が異なります。

| LINEアプリのバージョン | 作成されるURLの例 |
| --- | --- |
| 13.20以降 | `https://miniapp.line.me/{liffId}` |
| 13.20未満 | `https://liff.line.me/{liffId}` |

## LINEをインストールしていない場合の動作

ユーザーがLINEをインストールしている場合は、ユーザーがパーマネントリンクをクリックすると、LINEが自動的に起動してLINEミニアプリのページが表示されます。ユーザーがLINEをインストールしていない場合は、ウェブブラウザが開き、LINEでLINEミニアプリを開くように案内されます。この案内からは、ウェブブラウザ上でLIFFのエンドポイントURLのページを開くこともできます。