# ハンズオン手順

> ℹ️ 基本編は、コードの修正を**自分のPCの VSCode** で行い、Issue・Pull Request・Review・Merge を **GitHub（ブラウザ）** で行います。
> 本教材では既定ブランチを `main` と表記します。画面上で `master` と表示される場合は、`main` を `master` に読み替えてください。

## 前提事項

- GitHub アカウントを持っていること
  - まだ持っていない場合は [GitHub アカウントを作成する](../docs/create-github-account.md) を参照してください。
- 開発環境（**Git / VSCode / GitHub認証**）が用意できていること
  - コードは自分のPCの VSCode で修正します。未導入の場合は、先に [環境構築（必要ツール・インストール・認証）](../onboarding/00-setup.md) を済ませてください（約30〜45分）。

| ツール | 役割 | 確認コマンド |
| --- | --- | --- |
| Git | 変更を記録し、GitHub と同期する | `git --version` |
| VSCode | コードを編集する | （起動できれば OK） |
| GitHub 認証 | clone / push を許可する | `gh auth status` |

## 開始前チェック

- GitHub にサインインしている
- 講師から案内されたリポジトリを開ける
- リポジトリの **Issues** タブと **Pull requests** タブが見える
- ターミナルで `git --version` が表示される
- VSCode が起動できる（`code .` または **File > Open Folder**）
- `gh auth status` などで GitHub の認証が済んでいる（clone / push できる）

うまくいかない場合は、そのまま進めず講師に相談してください。
このワークショップでは、間違えた操作も GitHub Flow を理解する材料として扱います。

## 今日直すもの

小さなテトリス風デモアプリ **Falling Blocks** のバグを修正します。

現状:

- ブロックが下に落ちる
- 底に着いても止まらない
- 盤面の外まで落ち続ける

修正対象:

```text
app/falling-blocks/game.js
```

## ローカルで見る

リポジトリのルートで以下を実行します。

```powershell
.\scripts\serve-local.ps1
```

ブラウザで以下を開きます。

```text
http://127.0.0.1:8000/app/falling-blocks/
```

スライド風のハンズオンサイトは http://127.0.0.1:8000/handson/ で確認できます。

## 進め方

各 Step では、操作したあとに「画面で何が確認できれば完了か」も確認します。

| Step | 内容 | 目安 |
| --- | --- | --- |
| 1 | Issue を作る（GitHub） | 5分 |
| 2 | clone して VSCode で開く（PC） | 5分 |
| 3 | Branch を作って `game.js` を修正する（PC） | 8分 |
| 4 | Commit / Push する（PC） | 4分 |
| 5 | Pull Request を作る（GitHub） | 5分 |
| 6 | Review する（GitHub） | 5分 |
| 7 | Merge して後片付けする（GitHub + PC） | 3分 |

## ハンズオン

- [基本編: VSCode で修正し、GitHub Flow を一周する](01-github-flow-web.md)
- [発展編: CLI で同じ流れを体験する](02-github-flow-cli-optional.md)
- [発展編: ローカル開発オンボーディング編](../onboarding/README.md)（コンフリクト解消・やり直しまで含む発展トラック）

## 完了条件

- Falling Blocks の底判定バグを説明できる
- 自分の Issue がある
- 自分の Pull Request がある
- Pull Request に Review コメントが1つ以上ある
- Pull Request が Merge されている
- 関連 Issue が Closed になっている、または閉じてよい状態になっている
- `app/falling-blocks/game.js` の `FLOOR_ROW` が修正されている
- 使い終わった作業 Branch が削除されている、または削除してよい状態になっている
