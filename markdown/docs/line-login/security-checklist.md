---
url: https://developers.line.biz/ja/docs/line-login/security-checklist/
copied_at: 2025-10-23T15:58:15.944Z
---
# LINEログインのセキュリティチェックリスト

LINEログインを組み込んだアプリの実装にあたっては、第三者からの攻撃を想定し、セキュリティの不備がないようにログイン機能を実装する必要があります。

このページでは、LINEログインをアプリに組み込む時に、セキュリティの不備が無いようにするためのチェックリストを公開しています。開発したアプリをリリースする前に、チェックリストの内容を確認してください。

また、LINE DEVELOPER DAY 2020のセッション「[具体例で学ぶ、LINE Loginを利用した安心・安全な認証・認可機能の実装方法](https://linedevday.linecorp.com/2020/ja/sessions/7159/)」も併せて確認することをおすすめします。

:::note info
チェックリストの目的を理解した上で、安全なシステムを構築してください

:::

*   [認可URLに付与するクエリパラメータのチェックリスト](#check-authorization-request)
*   [コールバックURLに渡されたクエリパラメータのチェックリスト](#check-receiving-the-authorization-code)
*   [アクセストークンを発行する際のチェックリスト](#check-issue-access-token)
*   [IDトークンやアクセストークンを使用する際のチェックリスト](#check-using-id-tokens-access-token)
*   [バックエンドサーバーに、IDトークンやアクセストークンを送信して処理する際のチェックリスト](#check-using-id-tokens-access-token-backend)

## 認可URLに付与するクエリパラメータのチェックリスト

認証と認可のプロセスを開始する際に利用する、認可URLに付与するクエリパラメータについてのチェックリストです。認可URLのクエリパラメータについて詳しくは、「[ユーザーに認証と認可を要求する](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#making-an-authorization-request)」を参照してください。

:::note info
［コールバックURL］について

:::

| チェック内容 | 関連ページ |
| --- | --- |
| `redirect_uri`に指定したURLのURLスキーマには、特別な理由がない限りhttpsを使用しているか。 | <ul><!--[--><li><!--[--><a href="https://datatracker.ietf.org/doc/html/rfc6749#section-3.1.2.1" target="_blank" class="" rel="nofollow"><!--[--><!--[-->RFC6749 3.1.2.1.<!--]--><!--]--></a><!--]--></li><!--]--></ul> |
| `redirect_uri`として有効なURLとは、以下に示すいずれかのURLであることを理解しているか。<ul><!--[--><li><!--[-->［<strong><!--[-->コールバックURL<!--]--></strong>］に登録しているURLに完全一致するURL<!--]--></li><li><!--[-->［<strong><!--[-->コールバックURL<!--]--></strong>］に登録しているURLに、任意のクエリパラメータを追加したURL<!--]--></li><!--]--></ul> | <ul><!--[--><li><!--[--><a href="https://datatracker.ietf.org/doc/html/rfc6749#section-3.1.2" target="_blank" class="" rel="nofollow"><!--[--><!--[-->RFC6749 3.1.2.<!--]--><!--]--></a><!--]--></li><li><!--[--><a href="/ja/docs/line-login/integrate-line-login/#making-an-authorization-request" class=""><!--[--><!--[-->ユーザーに認証と認可を要求する<!--]--><!--]--></a><!--]--></li><!--]--></ul> |
| ［**コールバックURL**］に登録しているURLで受け取るクエリパラメータに、「任意のURLを受け取ってリダイレクトするようなクエリパラメータ」が存在しないか。あるいはそのようなパラメータが存在する場合、オープンリダイレクトの脆弱性（Open Redirector）が存在しないことを確認したか。 | <ul><!--[--><li><!--[--><a href="https://datatracker.ietf.org/doc/html/rfc6749#section-10.15" target="_blank" class="" rel="nofollow"><!--[--><!--[-->RFC6749 10.15<!--]--><!--]--></a><!--]--></li><!--]--></ul> |
| `state`に指定した値を、SecureRandomなどの暗号学的に安全かつ第三者が予測できない方法で、ランダムかつユニークになるように生成しているか。 | <ul><!--[--><li><!--[--><a href="https://datatracker.ietf.org/doc/html/rfc6749#section-10.12" target="_blank" class="" rel="nofollow"><!--[--><!--[-->RFC6749 10.12.<!--]--><!--]--></a><!--]--></li><li><!--[--><a href="/ja/docs/line-login/integrate-line-login/#making-an-authorization-request" class=""><!--[--><!--[-->ユーザーに認証と認可を要求する<!--]--><!--]--></a><!--]--></li><!--]--></ul> |
| `state`に指定した値を、以下に示すような、第三者がアクセス不能な場所に保存しているか。<ul><!--[--><li><!--[-->サーバーのセッション情報<!--]--></li><li><!--[-->同一オリジンポリシー（Same-origin policy）などで保護されたcookie<!--]--></li><!--]--></ul> | <ul><!--[--><li><!--[--><a href="https://datatracker.ietf.org/doc/html/rfc6749#section-10.12" target="_blank" class="" rel="nofollow"><!--[--><!--[-->RFC6749 10.12.<!--]--><!--]--></a><!--]--></li><!--]--></ul> |
| 同一ユーザーがログインを試行する場合も、ログインをする度に`state`に異なる値を指定しているか。 | <ul><!--[--><li><!--[--><a href="https://datatracker.ietf.org/doc/html/rfc6749#section-10.12" target="_blank" class="" rel="nofollow"><!--[--><!--[-->RFC6749 10.12.<!--]--><!--]--></a><!--]--></li><!--]--></ul> |

## コールバックURLに渡されたクエリパラメータのチェックリスト

コールバックURLに渡されたクエリパラメータについてのチェックリストです。コールバックURLに渡されるクエリパラメータについて詳しくは、「[ウェブアプリで認可レスポンスまたはエラーレスポンスを受け取る](https://developers.line.biz/ja/docs/line-login/integrate-line-login/#receiving-the-authorization-code-or-error-response-with-a-web-app)」を参照してください。

| チェック内容 | 関連ページ |
| --- | --- |
| `state`の値が、認可URLで指定した`state`と一致していることを確認しているか。 | <ul><!--[--><li><!--[--><a href="https://datatracker.ietf.org/doc/html/rfc6749#section-10.12" target="_blank" class="" rel="nofollow"><!--[--><!--[-->RFC6749 10.12.<!--]--><!--]--></a><!--]--></li><li><!--[--><a href="/ja/docs/line-login/integrate-line-login/#receiving-the-authorization-code-or-error-response-with-a-web-app" class=""><!--[--><!--[-->ウェブアプリで認可レスポンスまたはエラーレスポンスを受け取る<!--]--><!--]--></a><!--]--></li><!--]--></ul> |

## アクセストークンを発行する際のチェックリスト

[LINEログインAPI](https://developers.line.biz/ja/reference/line-login/)を利用してアクセストークンを発行する際のチェックリストです。アクセストークンの発行について詳しくは、「[アクセストークンを発行する](https://developers.line.biz/ja/reference/line-login/#issue-access-token)」および「[アクセストークンを管理する](https://developers.line.biz/ja/docs/line-login/managing-access-tokens/)」を参照してください。

| チェック内容 | 関連ページ |
| --- | --- |
| `client_secret`で指定するチャネルシークレットが秘密情報であることを理解し、かつ第三者に知られないようになっているか。 | <ul><!--[--><li><!--[--><a href="https://openid.net/specs/openid-connect-core-1_0.html#rfc.section.16.19" target="_blank" class="" rel="nofollow"><!--[--><!--[-->OpenID Connect 1.0 16.19<!--]--><!--]--></a><!--]--></li><!--]--></ul> |

## IDトークンやアクセストークンを使用する際のチェックリスト

LINEプラットフォームが発行した、IDトークンやアクセストークンを使用する際のチェックリストです。IDトークンやアクセストークンの発行について詳しくは、「[IDトークンからプロフィール情報を取得する](https://developers.line.biz/ja/docs/line-login/verify-id-token/)」および「[アクセストークンを管理する](https://developers.line.biz/ja/docs/line-login/managing-access-tokens/)」を参照してください。

| チェック内容 | 関連ページ |
| --- | --- |
| IDトークンやアクセストークンを検証しているか。 | <ul><!--[--><li><!--[--><a href="/ja/reference/line-login/#verify-access-token" class=""><!--[--><!--[-->アクセストークンの有効性を検証する<!--]--><!--]--></a><!--]--></li><li><!--[--><a href="/ja/reference/line-login/#verify-id-token" class=""><!--[--><!--[-->IDトークンを検証する<!--]--><!--]--></a><!--]--></li><!--]--></ul> |
| アクセストークンの検証に成功後、`client_id`プロパティと`expires_in`プロパティの値が以下の条件を満たすことを確認しているか。<ul><!--[--><li><!--[--><code><!--[-->client_id<!--]--></code>：ログイン機能を提供しているLINEログインチャネルのチャネルIDと同じ値<!--]--></li><li><!--[--><code><!--[-->expires_in<!--]--></code>：正の値<!--]--></li><!--]--></ul> | <ul><!--[--><li><!--[--><a href="/ja/docs/line-login/secure-login-process/#using-access-tokens" class=""><!--[--><!--[-->アクセストークンを使用して新規ユーザーを登録する<!--]--><!--]--></a><!--]--></li><!--]--></ul> |

## バックエンドサーバーに、IDトークンやアクセストークンを送信して処理する際のチェックリスト

LINEプラットフォームから取得したユーザー情報を用いて、ユーザー登録やログインをする際のチェックリストです。安全なユーザー登録およびログインプロセスの概念について詳しくは、「[アプリとサーバーの間で安全なログインプロセスを構築する](https://developers.line.biz/ja/docs/line-login/secure-login-process/)」を参照してください。

| チェック内容 | 関連ページ |
| --- | --- |
| クライアントからバックエンドサーバーに対して、ユーザーIDなどの情報ではなく、生のIDトークンやアクセストークンを送信しているか。<br/>※ バックエンドサーバーでIDトークンやアクセストークンを検証するAPIを利用することで、ユーザーIDなどの情報を取得できます。 | <ul><!--[--><li><!--[--><a href="/ja/docs/line-login/secure-login-process/#using-access-tokens" class=""><!--[--><!--[-->アクセストークンを使用して新規ユーザーを登録する<!--]--><!--]--></a><!--]--></li><li><!--[--><a href="/ja/reference/line-login/#verify-access-token" class=""><!--[--><!--[-->アクセストークンの有効性を検証する<!--]--><!--]--></a><!--]--></li><li><!--[--><a href="/ja/reference/line-login/#verify-id-token" class=""><!--[--><!--[-->IDトークンを検証する<!--]--><!--]--></a><!--]--></li><!--]--></ul> |
| クライアントからバックエンドサーバーに送信されたIDトークンやアクセストークンを検証しているか。 | <ul><!--[--><li><!--[--><a href="/ja/docs/line-login/secure-login-process/#using-access-tokens" class=""><!--[--><!--[-->アクセストークンを使用して新規ユーザーを登録する<!--]--><!--]--></a><!--]--></li><!--]--></ul> |