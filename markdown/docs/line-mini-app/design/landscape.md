---
url: https://developers.line.biz/ja/docs/line-mini-app/design/landscape/
copied_at: 2025-10-23T16:01:01.145Z
---
# LINEミニアプリのセーフエリア

ノッチがある端末でもLINEミニアプリのすべてを表示するために、CSSを使ってLINEミニアプリをセーフエリアに収めることを推奨します。 LINEミニアプリでは、ノーマルモードとランドスケープモードの両方をサポートします。ノーマルモードとランドスケープモードでは、必要なセーフエリアが異なります。

具体的には、LINEミニアプリのページのpaddingを、以下のように設定します。

*   [ノーマルモードの場合](#for-normal-mode)
*   [ランドスケープモードの場合](#for-landscape-mode)

## ノーマルモードの場合

*   下：34px

paddingの例：

text

`{   padding-bottom: 34px; }`

![](https://developers.line.biz/media/line-mini-app/mini_design_safearea_normal.png)

## ランドスケープモードの場合

*   左右：44px
*   下：21px

paddingの例：

text

`{   padding-right: 44px;   padding-bottom: 21px;   padding-left: 44px; }`

![](https://developers.line.biz/media/line-mini-app/mini_design_safearea_landscape.png)