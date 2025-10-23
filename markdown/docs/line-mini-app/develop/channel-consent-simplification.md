---
url: https://developers.line.biz/ja/docs/line-mini-app/develop/channel-consent-simplification/
copied_at: 2025-10-23T16:01:14.174Z
---
# チャネル同意のプロセスをスキップする

:::note info
認証済ミニアプリでのみ利用できます

:::

:::note warn
「チャネル同意の簡略化」機能で同意される権限について

:::

ユーザーは、`openid`スコープを有効化したLINEミニアプリに初めてアクセスする際に、「[チャネル同意画面](https://developers.line.biz/ja/docs/line-mini-app/develop/configure-console/#consent-screen-settings)」において、LINEミニアプリ内で[ユーザーID](https://developers.line.biz/ja/glossary/#user-id)が利用されることに同意する必要があります。

この同意のプロセスを簡略化するには、[LINE Developersコンソール](https://developers.line.biz/console/)のLINEミニアプリチャネルにおいて、「チャネル同意の簡略化」機能をオンにします。これにより、ユーザーは簡略化に対する同意を初回のみ行うだけで、別のLINEミニアプリに初めてアクセスする際は「チャネル同意画面」をスキップして、すぐにサービスの利用を開始できるようになります。

「チャネル同意の簡略化」設定をオンにすると、ユーザーがより簡単にLINEミニアプリにアクセスできるようになります。ユーザーの負担を軽減するために、「チャネル同意の簡略化」を有効化することをお勧めします。

:::note info
「チャネル同意の簡略化」の動作条件

:::

:::note warn
LINEミニアプリの設計によっては正しく動作しなくなる可能性があります

:::

#### 「チャネル同意の簡略化」設定のオン/オフ時の動作の違い

ユーザーが、LINEミニアプリに初めてアクセスした際に表示される「チャネル同意画面」で同意を実行しても、別のLINEミニアプリに初めてアクセスする際には「チャネル同意画面」が再び表示されます。

一方、「チャネル同意の簡略化」設定をオンに設定したLINEミニアプリにアクセスした際に表示される「簡略化同意画面」で同意を行った場合、別のLINEミニアプリに初めてアクセスした場合は「チャネル同意画面」が表示されず、「読み込み画面」が表示された後すぐにLINEミニアプリが開きます。

以下の表では、「チャネル同意の簡略化」設定のオン/オフによるLINEミニアプリにアクセスした際の動作の違いを説明しています。

| 「チャネル同意の<br/>簡略化」設定 | LINEミニアプリAに初めてアクセスした場合 | LINEミニアプリBに初めてアクセスした場合 |
| :-: | :-: | :-: |
| **オフ**の場合 | ![チャネル同意の簡略化設定オフの場合（アプリA）](https://developers.line.biz/media/line-mini-app/channel-consent-simplification-disabled-app-a-ja.png)<br/>「チャネル同意画面」が表示されます。 | ![チャネル同意の簡略化設定オフの場合（アプリB）](https://developers.line.biz/media/line-mini-app/channel-consent-simplification-disabled-app-b-ja.png)<br/>「チャネル同意画面」が表示されます。 |
| **オン**の場合 | ![チャネル同意の簡略化設定オンの場合（アプリA）](https://developers.line.biz/media/line-mini-app/channel-consent-simplification-enabled-app-a-ja.png)<br/>「簡略化同意画面」が表示されます。 | ![チャネル同意の簡略化設定オンの場合（アプリB）](https://developers.line.biz/media/line-mini-app/channel-consent-simplification-enabled-app-b-ja.png)<br/>「チャネル同意画面」がスキップされます。 |

「チャネル同意の簡略化」を有効化したLINEミニアプリにアクセスした場合の詳しいフローについては、「[「チャネル同意の簡略化」を有効化したLINEミニアプリにアクセスした際の動作](#detailed-workflow)」を参照してください。

## 「チャネル同意の簡略化」の設定方法

「チャネル同意の簡略化」は、以下の手順で設定します。

1.  [LINE Developersコンソール](https://developers.line.biz/console/)のLINEミニアプリチャネルで、［**ウェブアプリ設定**］タブの［**チャネル同意の簡略化**］のトグルボタンをオン（右）にする。:::note info
    「チャネル同意の簡略化」設定のデフォルトはオンです
    
    :::
    
      
    ![チャネル同意の簡略化設定のトグルボタン](https://developers.line.biz/media/line-mini-app/simplification-feature-setup-ja.png):::note warn
    「チャネル同意の簡略化」機能の設定条件
    
    :::
    
2.  有効化の確認ダイアログが表示されたら、**有効化**をクリックする。  
    ![確認ダイアログ](https://developers.line.biz/media/line-mini-app/simplification-dialog-ja.png):::note warn
    openidが自動的に有効化されます
    
    :::
    

## 「チャネル同意の簡略化」を有効化したLINEミニアプリにアクセスした際の動作

「チャネル同意の簡略化」設定を有効化したLINEミニアプリに初めてアクセスすると、「簡略化同意画面」が表示されます。

1.  「簡略化同意画面」で、［**同意する**］をクリックする。  
    ![簡略化同意画面](https://developers.line.biz/media/line-mini-app/simplification-process-01-ja.png)  
    「読み込み画面」が表示されます。  
    ［**同意する**］をクリックすると、別のLINEミニアプリでも[ユーザーID](https://developers.line.biz/ja/glossary/#user-id)が利用されることに同意したと見なされ、以降別のLINEミニアプリにアクセスした際には、「チャネル同意画面」がスキップされ、すぐにLINEミニアプリを開くことができるようになります。:::note info
    「今はしない」をクリックした場合に、再び「簡略化同意画面」が表示されるタイミング
    
    :::
    
2.  「読み込み画面」で、［**今すぐ利用する**］をクリックする。:::note info
    「読み込み画面」について
    
    :::
    
      
    ![LINEミニアプリの読み込み画面](https://developers.line.biz/media/line-mini-app/simplification-process-02-ja.png)  
    LINEミニアプリが表示されます。
3.  「アクセス許可要求画面」が表示されたら、［**許可する**］をクリックする。:::note info
    「アクセス許可要求画面」が表示されるタイミング
    
    :::
    
    :::note info
    任意のタイミングで「アクセス許可要求画面」を表示する
    
    :::
    
      
    各権限のアクセス許可要求にチェックを入れて、［**許可する**］をクリックすると、LINEミニアプリが開きます。  
    ![アクセス許可要求画面](https://developers.line.biz/media/line-mini-app/simplification-process-03-ja.png):::note warn
    友だち追加オプションによる友だち追加について
    
    :::
    

上記の手順を行ったユーザーは、初めてアクセスするLINEミニアプリでも「チャネル同意画面」がスキップされ、「読み込み画面」表示後、すぐにLINEミニアプリを開くことができるようになります。

![チャネル同意の簡略化設定オンの場合](https://developers.line.biz/media/line-mini-app/channel-consent-simplification-enabled-ja.png)

### LIFF間遷移で開いたLINEミニアプリでは「チャネル同意の簡略化」は適用されません

LIFFアプリやLINEミニアプリから、別のLINEミニアプリへ遷移した場合、「チャネル同意の簡略化」は適用されません。遷移先のLINEミニアプリが「チャネル同意の簡略化」を有効化していた場合でも、初回のアクセスであればLINEミニアプリごとの個別の「チャネル同意画面」が表示されます。

LIFF間遷移について詳しくは、「[LIFFアプリから別のLIFFアプリを開いた場合の動作について（LIFF間遷移）](https://developers.line.biz/ja/docs/liff/opening-liff-app/#move-liff-to-liff)」を参照してください。

html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}