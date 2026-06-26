# 講師進行ガイド（台本・時間配分）

対象: Git / GitHub 初心者。
形態: 座学 + 講師デモ + 受講者ハンズオン。
所要: 約75分（短縮版・60〜80分で調整可）。環境構築は事前準備（約30〜45分・別途）。
狙い: **GitHub Flow を使ったチーム開発の最小サイクル**を、簡易アプリのバグ修正で体験してもらう。

> 📝 本教材では既定ブランチを `main` と表記します。画面上で `master` と表示されるリポジトリでは、`main` を `master` に読み替えて案内してください。

> 体験の一言要約: main に直接変更せず、Issue でバグを記録し、Branch で修正し、Commit で履歴を残し、Pull Request で相談し、Review 後に Merge する。

## 事前チェック

- [ ] 参加者が事前に環境構築（**Git / VSCode / GitHub認証**）を済ませている（[00. 環境構築](../onboarding/00-setup.md) を事前案内）
- [ ] 参加者のターミナルで `git --version` が表示される
- [ ] 参加者が VSCode を起動できる
- [ ] 参加者が clone / push できる（認証が通る）
- [ ] 参加者がアクセスするリポジトリURLを共有できる
- [ ] 参加者が GitHub にサインインできる
- [ ] Issues と Pull requests が有効になっている
- [ ] 参加者に書き込み権限を付与する、または fork 方式にする判断が済んでいる
- [ ] `app/falling-blocks/` が存在し、アプリを表示できる
- [ ] Issue / Pull Request テンプレートが表示される
- [ ] 講師デモ用の GitHub アカウントまたはデモ用 Branch を用意している
- [ ] 画面上の既定ブランチ名が `main` か `master` かを把握している
- [ ] プロジェクター投影時はブラウザのズームを 125〜150% にして見やすくする

## タイムテーブル（約75分）

> ℹ️ 環境構築（Git / VSCode / GitHub認証）は**事前準備（約30〜45分）**として済ませ、下の時間には含みません。座学（M1+M2）は要点に絞り、時間はハンズオン体験に寄せています。

| 時間 | セクション | 要点 |
| --- | --- | --- |
| 事前 | 環境構築（事前準備） | Git / VSCode / GitHub認証を用意（約30〜45分・別途） |
| 0:00-0:05 | はじめに | 今日のゴール、GitHub を使う理由 |
| 0:05-0:20 | M1 Git / GitHub の基本 | Git と GitHub、Repository、Issue、Branch、Commit、Pull Request、Review、Merge |
| 0:20-0:30 | M2 GitHub Flow | main → branch → commit → PR → review → merge を図で理解 |
| 0:30-0:38 | 講師デモ | Falling Blocks の底判定バグ修正を一度実演 |
| 0:38-1:05 | M3 ハンズオン | Issue(GitHub) → clone/VSCode修正 → Commit/Push → PR を作成 |
| 1:05-1:10 | ペアレビュー | 参加者同士で Review コメント |
| 1:10-1:15 | M4 まとめ | 実務での使い方、次の学習 |

時間調整ルール:

- 10分以上遅れた場合は、CLI や発展機能の紹介を短縮する
- ハンズオン時間が足りない場合は、講師が Review 役または Merge 確認を補助する
- 最低到達ラインは「自分の Branch で commit し、Pull Request を作る」こと
- 時間が余る場合は、CLI 版ハンズオン（`handson/02-github-flow-cli-optional.md`）や、2回目の Commit・Request changes → 再レビューなどの追加課題で深掘りする

## はじめに（必ず語る枠付け）

- GitHub は「コード置き場」だけではなく、**変更を相談して合意する場所**。
- GitHub Flow は、初心者でも覚えやすいチーム開発の基本形。
- 今日のゴールはコマンド暗記ではなく、**変更が main に入るまでの流れを理解すること**。
- 間違えた操作は責めずに、Branch や Pull Request がなぜ必要かを理解する材料として扱う。

台詞例:

> 今日は「GitHubの全部」を覚える日ではありません。小さなアプリのバグを題材に、Issueで目的を残し、Branchで安全に修正し、Pull Requestで相談してからmainに取り込む、という基本の流れを一度体験します。

## M1 Git / GitHub の基本

説明する用語:

- Repository: プロジェクトの置き場所
- main: チームにとっての基準となる状態
- Issue: 作業の目的や相談を記録する場所
- Branch: main から分かれた作業場所
- Commit: 変更の保存ポイント
- Pull Request: 変更を取り込む前に相談する場所
- Review: 差分を見てコメントする作業
- Merge: 変更を main に取り込む操作

説明のコツ:

- 最初から内部構造を深掘りしない。
- 「セーブポイント」「作業場所」「相談場所」のような比喩で説明する。
- Pull Request の Files changed タブで差分を見る。
- Conversation に説明・コメント・履歴が残ることを見せる。

## M2 GitHub Flow

必ず伝えるポイント:

- main に直接変更しない
- 1つの作業は1つの Branch で行う
- Pull Request は小さく作る
- Review は責める場ではなく、チームで確認する場
- Merge したら Branch は役目を終える
- 図で見ると、main から分かれた Branch が PR / Review を経て main に戻る流れ

## M3 ハンズオン

受講者の作業:

1. Falling Blocks のバグを Issue にする（GitHub）
2. リポジトリを clone して VSCode で開く（PC）
3. `fix-falling-blocks-floor-<github-id>` Branch を作る（PC）
4. VSCode で `app/falling-blocks/game.js` の `FLOOR_ROW` を修正する
5. Commit / Push する（PC）
6. Pull Request を作る（GitHub）
7. ペアの Pull Request に Review コメントする
8. Merge して後片付けする

講師の巡回ポイント:

- clone して VSCode でリポジトリを開けているか
- 受講者が main で作業していないか（VSCode 左下の Branch 表示）
- 作業 Branch を push できているか（認証が通っているか）
- PR の base / compare が正しいか
- 変更ファイルが `app/falling-blocks/game.js` になっているか
- `FLOOR_ROW` が `ROWS - 1` になっているか
- Issue と PR が関連づいているか

## 講師デモで必ず見せる画面

| 画面 | 見せること | 一言 |
| --- | --- | --- |
| Falling Blocks | ブロックが底で止まらず落ち続ける | まず現象をIssueにします |
| Issue | タイトルと本文 | 何のための修正かを先に残します |
| clone & VSCode | Code → `git clone` → `code .` | 手元に持ってきて VSCode で開きます |
| Branch | `git switch -c` で作業 Branch に変わる | main を直接触らず、安全な作業場所を作ります |
| VSCode 編集 | `FLOOR_ROW` を `ROWS - 1` に直す | 直すのは1行だけです |
| Commit / Push | `git add` → `commit` → `push` | 修正を履歴に残し、GitHub に送ります |
| Pull Request | base / compare | base は取り込み先、compare は取り込みたい変更です |
| Files changed | `game.js` の差分 | レビューでは何が変わったかをここで見ます |
| Conversation | コメントと履歴 | 相談と合意の記録が残ります |
| Merge後 | main に修正が入るところ | レビュー済みの変更が基準ブランチに入ります |

デモ中に操作を間違えた場合は隠さず、「だからBranchで分けて確認する」と本筋に戻します。

## ハンズオン中の進捗チェックポイント

| 目安 | 全体に確認すること |
| --- | --- |
| 開始5分 | 全員がリポジトリを開けている |
| Issue作成後 | Issue番号を控えている |
| clone後 | リポジトリを clone して VSCode で開けている |
| Branch作成後 | Branch表示が `main` ではなく作業Branchになっている |
| Push後 | 作業 Branch が GitHub に push され、`game.js` が変更されている |
| PR作成後 | base / compare が正しい |
| Review前 | Files changed に不要な変更が混ざっていない |

進捗確認のタイミング以外は、長い全体説明を増やしすぎず、個別サポートを中心にします。

## ペアレビューの回し方

- 講師がペアを指定する場合は、相手の Pull Request URL を共有する。
- 指定しない場合は、一覧で自分の次に表示されている Pull Request を見る。
- 人数が奇数の場合は、最後の3人を1組にする。
- コメントは短くてよい。「確認しました」「ファイル名が正しいです」から始める。
- 指摘がある場合も、責める表現ではなく「ここはこう見えました」と書く。

レビュー表現の例:

| 避けたい表現 | 言い換え |
| --- | --- |
| 間違っています | ここはこう見えました |
| 直してください | こうすると読みやすそうです |
| なぜこうしたんですか | どんな意図で追加しましたか？ |

早く終わった参加者にお願いできる追加ミッション:

- まだレビューが付いていない Pull Request にコメントする
- 自分の Pull Request の Files changed を開き、差分をペアに説明する
- `Closes #...` によって Issue が閉じたか確認する
- 発展編の [CLI 手順](../handson/02-github-flow-cli-optional.md) を読み、Web UI と対応づける

## 基本編の範囲

- 基本編では GitHub Actions や Pages を必須にしない。
- Organization 管理や高度なセキュリティ機能は扱わない。
- 少人数なら collaborator 方式がわかりやすい。
- 人数が多い場合は fork 方式も検討するが、初心者には説明が増える。

実施方式に迷う場合は、[基本編で扱う範囲と実施パターン](../docs/basic-scope.md) を参照してください。

## 困ったとき

| 事象 | 対応 |
| --- | --- |
| Branch を作らず main を編集した | その変更はデモとして扱い、なぜ Branch が必要かを説明する |
| PR の向きが逆 | base が既定ブランチ、compare が作業 Branch であることを確認する |
| Review コメントの書き方がわからない | 「確認しました」「ここはこう見えました」のような短いコメントでよいと伝える |
| Merge ボタンが押せない | 権限、未解決レビュー、競合の有無を確認する |
| 参加者の進度に差が出る | 早い人に Review 役をお願いする |
| アカウント作成が終わっていない | [GitHub アカウントを作成する](../docs/create-github-account.md) を案内し、必要なら見学参加に切り替える |
| メール検証が終わっていない | 確認メールを開くよう案内する |
| UI表記が教材と違う | ボタン名ではなく、Issue/Branch/PRなどの目的で読み替える |
| 権限がなくMergeできない | 講師が権限設定を確認し、必要なら講師がMerge確認を代行する |

概念FAQ:

| 質問 | 短い回答 |
| --- | --- |
| なぜIssueから始めるのですか？ | 変更の目的を後から追えるようにするためです |
| commitとPRは何が違いますか？ | commitは保存ポイント、PRは相談と確認の場所です |
| Branchを消して大丈夫ですか？ | Merge後なら変更はmainに入っているため、作業Branchは消しても大丈夫です |
| ActionsやPagesは使わないのですか？ | 今日はGitHub Flowの本筋に集中し、発展として紹介します |

## まとめで使う問い

- Branch を使うと何が安全になりますか？
- Pull Request は何のための場所でしたか？
- Review で何を確認しましたか？
- 実務で main に直接 push しない理由は何ですか？
- 今回のバグ修正を GitHub Flow に乗せると、何が見えるようになりましたか？
- 次に CLI で同じ流れをやるとしたら、どの操作がどのコマンドに対応しますか？

理解度チェック:

| 問い | 期待する答え |
| --- | --- |
| base と compare の違いは？ | baseは取り込み先、compareは取り込みたい変更が入ったBranch |
| Files changed で見るものは？ | 変更前後の差分と不要な変更の有無 |
| Review コメントの目的は？ | 間違い探しだけでなく、意図共有と合意形成 |

終了後チェック:

- [ ] 全員の Pull Request の状態を確認した
- [ ] main に修正が入ったことを確認した
- [ ] 未MergeのPRや未CloseのIssueがあれば扱いを決めた
- [ ] 次に学ぶ内容（CLI / Actions / Branch protection / Pages）を案内した

関連資料:

- [ワークショップ全体設計](../docs/workshop-plan.md)
- [GitHub と Git の基本](../docs/github-overview.md)
- [GitHub Flow](../docs/github-flow.md)
- [ハンズオン手順](../handson/README.md)
