export const basicContent = `
  <main class="markdown-content">
    <div>
      <h1>見出し1</h1>
      <p>これは段落のテストです。</p>
      <h2>見出し2</h2>
      <ul>
        <li>リスト項目1</li>
        <li>リスト項目2</li>
      </ul>
    </div>
  </main>
`;

export const linkContent = `
  <main class="markdown-content">
    <div>
      <p><a href="/docs/messaging-api">相対リンク</a></p>
      <p><a href="https://example.com">絶対リンク</a></p>
    </div>
  </main>
`;

export const imageContent = `
  <main class="markdown-content">
    <div>
      <img src="/images/test.png" alt="テスト画像" />
      <img src="https://example.com/image.jpg" alt="外部画像" />
    </div>
  </main>
`;

export const tableContent = `
  <main class="markdown-content">
    <div>
      <table>
        <thead>
          <tr>
            <th>項目</th>
            <th>説明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>項目1</td>
            <td>説明1</td>
          </tr>
          <tr>
            <td>
              項目2
              <ul>
                <li>リスト項目1</li>
                <li>リスト項目2</li>
              </ul>
            </td>
            <td>説明2</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
`;

export const customBlockContent = `
  <main class="markdown-content">
    <div>
      <div class="custom-block info">
        <div class="custom-block-title">情報</div>
        <div class="custom-block-content">これは情報ブロックです。</div>
      </div>
      <div class="custom-block warning">
        <div class="custom-block-title">警告</div>
        <div class="custom-block-content">これは警告ブロックです。</div>
      </div>
      <div class="custom-block danger">
        <div class="custom-block-title">危険</div>
        <div class="custom-block-content">これは危険ブロックです。</div>
      </div>
    </div>
  </main>
`;

export const contentWithAnchorAndButton = `
  <main class="markdown-content">
    <div>
      <h2>見出し<a class="header-anchor" href="#heading">¶</a></h2>
      <p>コンテンツ</p>
      <div id="copy-markdown-btn">コピーボタン</div>
    </div>
  </main>
`;

export const complexContent = `
  <main class="markdown-content">
    <div>
      <h1 id="page-title">メインタイトル</h1>
      <p>導入文章です。</p>

      <h2>機能一覧<a class="header-anchor" href="#features">¶</a></h2>
      <ul>
        <li><a href="/docs/feature1">機能1</a></li>
        <li><a href="https://external.com">外部リンク</a></li>
      </ul>

      <div class="custom-block tip">
        <div class="custom-block-title">ヒント</div>
        <div class="custom-block-content">
          <p>これは<strong>重要</strong>な情報です。</p>
          <img src="/images/tip.png" alt="ヒント画像" />
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>API</th>
            <th>説明</th>
            <th>パラメーター</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>sendMessage</td>
            <td>メッセージを送信</td>
            <td>
              <ul>
                <li>text: string</li>
                <li>userId: string</li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>

      <div id="copy-markdown-btn">コピーボタン</div>
    </div>
  </main>
`;

export const tableWithBreakTags = `
  <main class="markdown-content">
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>方法1<br>Messaging APIの<br>「<a href="/ja/reference/messaging-api/#get-profile">プロフィール情報を取得する</a>」</th>
            <th>方法2<br>LINEログインの<br>「<a href="/ja/reference/line-login/#userinfo">ユーザー情報を取得する</a>」</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ユーザーID</td>
            <td>✅（<code>userId</code>）</td>
            <td>✅（<code>sub</code>）</td>
          </tr>
          <tr>
            <td>表示名</td>
            <td>✅（<code>displayName</code>）</td>
            <td>✅（<code>name</code>）</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
`;

export const complexTableContent = `
  <main class="markdown-content">
    <div>
      <table class="parameter-table">
        <thead>
          <tr>
            <th>機能</th>
            <th style="text-align: center;">iOS版LINE<br>Android版LINE</th>
            <th style="text-align: center;">PC版LINE<br>（macOS版、Windows版）</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ul>
                <li><a href="/ja/reference/messaging-api/#box" class="">ボックス</a>の<code>maxWidth</code>プロパティ</li>
                <li><a href="/ja/reference/messaging-api/#box" class="">ボックス</a>の<code>maxHeight</code>プロパティ</li>
              </ul>
            </td>
            <td style="text-align: center;">11.22.0以上</td>
            <td style="text-align: center;">7.7.0以上</td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
`;

export const emptyContent = `
  <main class="markdown-content">
    <div>
    </div>
  </main>
`;

export const noContent = null;

export const codeBlockContent = `
  <main class="markdown-content">
    <div>
      <p>次のコマンドを実行します。</p>
      <div class="relative" code="$ npm install -g @line/liff-cli
" meta="" style="">
        <span class="code-language-label absolute top-2 right-2 text-ldsgray-600 text-xs">bash</span>
        <pre class="language-bash shiki shiki-themes github-dark-default">
          <code>
            <span class="line"><span>$</span><span> npm</span><span> install</span><span> -g</span><span> @line/liff-cli</span></span>
          </code>
        </pre>
      </div>
      <p>コマンドを実行すると、LIFF CLIがインストールされます。</p>
    </div>
  </main>
`;

export const vueCommentsContent = `
  <main class="markdown-content">
    <div>
      <table>
        <thead>
          <tr>
            <th>オプション</th>
            <th>説明</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>-v</code>、<code>--view-type</code></td>
            <td>
              LIFFアプリの画面サイズ。以下のいずれかの値を指定します。
              <ul><!--[--><li><!--[--><code><!--[-->full<!--]--></code><!--]--></li><li><!--[--><code><!--[-->tall<!--]--></code><!--]--></li><li><!--[--><code><!--[-->compact<!--]--></code><!--]--></li><!--]--></ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
`;
