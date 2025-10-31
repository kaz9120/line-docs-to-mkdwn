---
url: https://developers.line.biz/ja/docs/line-login-sdks/unity-sdk/integrate-line-login/
copied_at: 2025-10-24T10:16:25.763Z
---
# UnityゲームにLINEログインを組み込む

[プロジェクトをセットアップ](https://developers.line.biz/ja/docs/line-login-sdks/unity-sdk/project-setup/)すると、既存のUnityゲームにLINE SDK for Unityをインポートでき、LINEログインを活用して、アプリのユーザーエクスペリエンスを向上できます。

## SDKを取得する

### GitHubからダウンロードする

最新のLINE SDK for Unityを取得するには、[GitHubのReleasesページ](https://github.com/line/line-sdk-unity/releases)から`.unitypackage`ファイルをダウンロードします。

### プロジェクトにインポートする

> [!WARNING]
> 注意
> LINE SDK for Unityをプロジェクトにインポートする前に、プロジェクトのバックアップを作成するか、バージョン管理システムに保存してください。

Unityプロジェクトを開いたまま、ダウンロードした`.unitypackage`ファイルをダブルクリックします。以下のように、パッケージ内のすべてのファイルをインポートします。

![Import Unity package](https://developers.line.biz/media/unity-sdk/importing.png)

## LineSDKプレハブをシーンに追加する

パッケージをインポートすると、［**Project**］パネルで、`Assets/LineSDK/`に［**LineSDK**］プレハブが表示されます。LINEログインを追加するシーンの［**Hierarchy**］パネルに、プレハブをドラッグしてください。

![Add LineSDK prefab](https://developers.line.biz/media/unity-sdk/adding-prefab.png)

次に、シーンのLineSDK GameObjectをクリックし、［**Channel ID**］にLINEログインのチャネルのチャネルIDを入力します。

![Set Channel ID](https://developers.line.biz/media/unity-sdk/setting-channel-id.png)

LINEログインのチャネルのIDを、[LINE Developersコンソール](https://developers.line.biz/console/)で確認します。チャネルを作成していない場合は、LINE Developersコンソールで[作成します](https://developers.line.biz/console/register/line-login/channel/)。チャネルを作るときは、[プロバイダー](https://developers.line.biz/ja/glossary/#provider)を選択または作成してください。

## プレイヤー設定を更新する

LINEログインを組み込む前、またはLINE APIをゲームで使用する前に、以下の手順に従ってプロジェクトのプレイヤー設定が正しいことを確認してください。

### Androidエクスポートの設定

1.  ［**File**］ > ［**Build Settings**］を選択します。
2.  ［**Player Settings**］をクリックします。
3.  ［**Company Name**］および［**Product Name**］に、LINE DevelopersコンソールのLINEログインのチャネルの［**LINEログイン設定**］タブにあるAndroidの［**パッケージ名**］と同じ値を入力します。
4.  ［![Android settingsタブ](https://developers.line.biz/media/unity-sdk/android-settings-tab.png)］ > ［**Other Settings**］を選択します。
5.  ［**Package Name**］に、LINE DevelopersコンソールのLINEログインのチャネルの［**LINEログイン設定**］タブにあるAndroidの［**パッケージ名**］と同じ値を入力します。
6.  ［**Minimum API Level**］を、［**API level 19**］以上に設定します。
7.  ［**Publishing Settings**］を選択して、［**Custom Gradle Template**］を有効にします。

### iOSエクスポートの設定

1.  ［**File**］ > ［**Build Settings**］を選択します。
2.  ［**Player Settings**］をクリックします。
3.  ［![iPhone, iPod Touch and iPad settingsタブ](https://developers.line.biz/media/unity-sdk/ios-settings-tab.png)］ > ［**Other Settings**］を選択します。
4.  ［**Bundle Identifier**］に、LINE DevelopersコンソールのLINEログインのチャネルの［**LINEログイン設定**］タブにある［**iOS bundle ID**］と同じ値を入力します。
5.  ［**Target minimum iOS Version**］を、`11.0`以上に設定します。

## LINEを使用するログイン方法を実装する

LineSDK (GameObject)が存在するシーンに、LINEを使用するログイン方法を実装できます。例：

```csharp
using Line.LineSDK;

public class MyController : MonoBehaviour {
    public void LoginButtonClicked() {
        var scopes = new string[] {"profile", "openid"};
        LineSDK.Instance.Login(scopes, result => {
            result.Match(
                value => {
                    Debug.Log("Login OK. User display name: " + value.UserProfile.DisplayName);
                },
                error => {
                    Debug.Log("Login failed, reason: " + error.Message);
                }
            );
        });
    }
}
```

現在、LINE SDK for Unityでは、iOSおよびAndroidのみがサポートされています。Unityエディターのプレイモードで実行すると、常にエラーが返されます。テストするには、シーンをiOSまたはAndroidデバイスにエクスポートしてください。

html pre.shiki code .suJrU, html code.shiki .suJrU{--shiki-default:#FF7B72}html pre.shiki code .sQhOw, html code.shiki .sQhOw{--shiki-default:#FFA657}html pre.shiki code .sZEs4, html code.shiki .sZEs4{--shiki-default:#E6EDF3}html pre.shiki code .sc3cj, html code.shiki .sc3cj{--shiki-default:#D2A8FF}html pre.shiki code .s9uIt, html code.shiki .s9uIt{--shiki-default:#A5D6FF}html .default .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}html .shiki span {color: var(--shiki-default);background: var(--shiki-default-bg);font-style: var(--shiki-default-font-style);font-weight: var(--shiki-default-font-weight);text-decoration: var(--shiki-default-text-decoration);}