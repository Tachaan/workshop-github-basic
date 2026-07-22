# ハンズオン手順

> ℹ️ 基本編は、Template から参加者ごとに練習Repoを作り、Repository作成 → Issue → Branch → Commit → Pull Request → Review → Merge → 履歴確認を1本のストーリーで進めます。
> コードの修正は**自分のPCの VSCode**、または **Codespaces** で行います。練習Repoの既定ブランチは `main` です。

## 前提事項

- GitHub アカウントを持っていること
  - まだ持っていない場合は [GitHub アカウントを作成する](../docs/create-github-account.md) を参照してください。
- 開発環境（**Git / VSCode / GitHub認証**）が用意できていること
  - コードは自分のPCの VSCode で修正します。未導入の場合は、[環境構築](../onboarding/00-setup.md) を済ませるか、Codespaces を選びます。
- Reviewするペアの GitHub ID が分かること

| ツール | 役割 | 確認コマンド |
| --- | --- | --- |
| Git | 変更を記録し、GitHub と同期する | `git --version` |
| VSCode | コードを編集する | （起動できれば OK） |
| GitHub 認証 | clone / push を許可する | `gh auth status` / `ssh -T git@github.com` / HTTPSブラウザ認証 |

## 開始前チェック

- GitHub にサインインしている
- 練習Template [`Tachaan/github-basic-practice`](https://github.com/Tachaan/github-basic-practice) を開ける
- 自分とReview相手の GitHub ID が分かる
- ターミナルで `git --version` が表示される
- VSCode が起動できる（`code .` または **File > Open Folder**）
- GitHub CLI / HTTPS / SSH のいずれかで認証できる（clone / push できる）

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

## Falling Blocks をローカルで見る

参加者は、自分の練習Repoにある `app/falling-blocks/index.html` をエクスプローラー / Finderでダブルクリックします。サーバは不要です。

Codespacesでは、Repoのルートで次を実行し、PortsタブのURLへ `/app/falling-blocks/` を付けて開きます。

```bash
python -m http.server 8000
```

## 進め方

各 Step では、操作したあとに「画面で何が確認できれば完了か」も確認します。

| Step | 内容 | 目安 |
| --- | --- | --- |
| 0 | Templateから自分の練習Repoを作り、ペアを招待する | 5分 |
| 1 | Issue を作る（GitHub） | 5分 |
| 2 | clone / CodespacesでRepoを開く | 4分 |
| 3 | Branch を作って `game.js` を修正する | 7分 |
| 4 | Commit / Push する（PC） | 4分 |
| 5 | Pull Request を作る（GitHub） | 5分 |
| 6 | ペアでReviewする（GitHub） | 7分 |
| 7 | Merge・動作・履歴を確認する | 8分 |

## ハンズオン

- [基本編: Template Repo 作成から履歴確認までを一周する](01-github-flow-web.md)
- [発展編: CLI で同じ流れを体験する](02-github-flow-cli-optional.md)
- [発展編: ローカル開発オンボーディング編](../onboarding/README.md)（コンフリクト解消・やり直しまで含む発展トラック）

## 完了条件

- Falling Blocks の底判定バグを説明できる
- Templateから作った自分の練習Repoがある
- 自分の Issue がある
- 自分の Pull Request がある
- Pull Request に Review コメントが1つ以上ある
- Pull Request が Merge されている
- 関連 Issue が Closed になっている、または閉じてよい状態になっている
- `app/falling-blocks/game.js` の `FLOOR_ROW` が修正されている
- 使い終わった作業 Branch が削除されている、または削除してよい状態になっている
- `git log` / `git blame` から自分の修正を見つけられる
