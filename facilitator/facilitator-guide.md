# 講師進行ガイド（台本・時間配分）

対象: Git / GitHub 初心者。
形態: 座学 + 講師デモ + 受講者ハンズオン。
所要: 基本編 約105〜120分（環境構築30〜45分を含む。事前準備済みなら約75分）。発展は任意で+20分。
狙い: **TemplateからのRepository作成からMerge後の履歴確認まで**を、1つの簡易アプリのバグ修正で体験してもらう。

> 📝 練習Templateの既定ブランチは `main` です。`master` と表示された場合は、別の空Repoではなく指定Templateから作ったか確認してください。

> 体験の一言要約: 自分の練習Repoを作り、Issueで目的を記録し、Branchで修正し、Pull Requestでペアと確認してMergeし、最後にlog / blameで履歴をたどる。

## 事前チェック

- [ ] 参加者が事前に環境構築（**Git / VSCode / GitHub認証**）を済ませている（[00. 環境構築](../onboarding/00-setup.md) を事前案内）
- [ ] ローカル構築が難しい参加者は Codespaces を使える
- [ ] 参加者のターミナルで `git --version` が表示される
- [ ] 参加者が VSCode を起動できる
- [ ] 参加者が clone / push できる（認証が通る）
- [ ] 練習Template [`Tachaan/github-basic-practice`](https://github.com/Tachaan/github-basic-practice) が Public / Template / default `main`
- [ ] Templateに意図的なFalling Blocksのバグ、Issue / PR Templateが入っている
- [ ] 参加者が GitHub にサインインできる
- [ ] Reviewペアを決め、互いのGitHub IDを確認している
- [ ] Public Repoを作れる。Privateで実施する場合はCollaborator招待を開始前に承認できる
- [ ] `app/falling-blocks/` が存在し、アプリを表示できる
- [ ] Issue / Pull Request テンプレートが表示される
- [ ] 講師デモ用の練習Repo・Issue・Pull Requestを用意している
- [ ] プロジェクター投影時はブラウザのズームを 125〜150% にして見やすくする

## タイムテーブル（基本編 約105〜120分）

> ℹ️ 環境構築を事前に済ませた場合は、環境構築30〜45分を省いて約75分で実施できます。

| 目安 | セクション | 要点 |
| --- | --- | --- |
| 5分 | はじめに | ゴールと「1つのRepoで最後まで進める」枠付け |
| 30〜45分 | 環境構築 | ローカルまたは Codespaces を選択 |
| 20分 | M1 / M2 基本 | GitとGitHub、用語、標準的な開発の流れ |
| 10分 | M3-1 Repo / Issue | Template、Collaborator、Markdown、Label、Assignee |
| 15分 | M3-2 Branch / Commit | clone / Codespaces、バグ確認、修正、Commit / Push |
| 12分 | M3-3 PR / Review | Closes、Reviewer指定、ペアReview |
| 8分 | M3-4 Merge / 履歴 | Merge、Issue Close、Branch削除、log / blame |
| 5分 | M4 まとめ | 体験した流れを言語化 |
| +20分（任意） | 発展 | コンフリクト・やり直し |

時間調整ルール:

- 10分以上遅れた場合は、発展セクションを省略し、log / blameは講師デモに切り替える
- ハンズオン時間が足りない場合は、講師が Review 役または Merge 確認を補助する
- 最低到達ラインは「自分の Branch で commit し、Pull Request を作る」こと
- 時間が余る場合は、コンフリクト・やり直し、2回目のCommit、Request changes → 再Reviewで深掘りする

## はじめに（必ず語る枠付け）

- GitHub は「コード置き場」だけではなく、**変更を相談して合意する場所**。
- GitHub Flow は、初心者でも覚えやすいチーム開発の基本形。
- 今日のゴールはコマンド暗記ではなく、**変更が main に入るまでの流れを理解すること**。
- 間違えた操作は責めずに、Branch や Pull Request がなぜ必要かを理解する材料として扱う。

台詞例:

> 今日は「GitHubの全部」を覚える日ではありません。自分の練習Repoを作り、小さなアプリのバグをIssue、Branch、Pull Request、Reviewで直します。最後に履歴をたどり、GitHub上の情報がどうつながるかまで確認します。

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

1. Templateから `github-basic-practice-<github-id>` を作る
2. Review相手をCollaboratorへ招待する
3. MarkdownでIssueを書き、`bug` Label・自分をAssignee・ペアを@メンションする
4. 自分のRepoをclone、またはCodespacesで開く
5. バグを再現し、`fix-falling-blocks-floor-<github-id>` Branchを作る
6. `app/falling-blocks/game.js` の `FLOOR_ROW` を修正してCommit / Pushする
7. `Closes #<issue-number>` とReviewerを指定してPull Requestを作る
8. PR URLを交換し、ペアのFiles changedへReviewを送る
9. Repo所有者がMergeし、Issue CloseとBranch削除を確認する
10. `git log` / `git blame` とGitHub上のIssue・PR・Commitリンクを確認する

講師の巡回ポイント:

- 自分のアカウントにPublic練習Repoを作り、既定Branchがmainか
- Collaborator招待を送れたか。詰まった場合はPublic URL共有へ切り替えたか
- IssueのMarkdown Preview、Label、Assignee、@メンションを確認したか
- clone / Codespacesで自分の練習Repoを開けているか
- 受講者が main で作業していないか（VSCode 左下の Branch 表示）
- 作業 Branch を push できているか（認証が通っているか）
- PR の base / compare が正しいか
- 変更ファイルが `app/falling-blocks/game.js` になっているか
- `FLOOR_ROW` が `ROWS - 1` になっているか
- Issue と PR が関連づいているか
- Review相手が別Repoの正しいPR URLを開いているか
- Merge後の`FLOOR_ROW`をblameすると本人のCommitが表示されるか

## 講師デモで必ず見せる画面

| 画面 | 見せること | 一言 |
| --- | --- | --- |
| Practice Template | Use this template → Create a new repository | 全員が同じ初期状態から、自分のRepoを作ります |
| Repo Settings | Collaborators → Add people | Review相手を共同作業へ招待します |
| Falling Blocks | ブロックが底で止まらず落ち続ける | まず現象をIssueにします |
| Issue | Markdown Preview、Label、Assignee、@メンション | 目的・担当・通知先を先に残します |
| clone & VSCode | Code → `git clone` → `code .` | 手元に持ってきて VSCode で開きます |
| Branch | `git switch -c` で作業 Branch に変わる | main を直接触らず、安全な作業場所を作ります |
| VSCode 編集 | `FLOOR_ROW` を `ROWS - 1` に直す | 直すのは1行だけです |
| Commit / Push | `git add` → `commit` → `push` | 修正を履歴に残し、GitHub に送ります |
| Pull Request | base / compare | base は取り込み先、compare は取り込みたい変更です |
| Files changed | `game.js` の差分 | レビューでは何が変わったかをここで見ます |
| Conversation | コメントと履歴 | 相談と合意の記録が残ります |
| Merge後 | main に修正が入るところ | レビュー済みの変更が基準ブランチに入ります |
| History / Blame | FLOOR_ROWの変更者とIssue・PRリンク | なぜ・誰が・いつ変えたかを後から追えます |

デモ中に操作を間違えた場合は隠さず、「だからBranchで分けて確認する」と本筋に戻します。

## ハンズオン中の進捗チェックポイント

| 目安 | 全体に確認すること |
| --- | --- |
| 開始5分 | 全員がTemplateを開き、自分の練習Repo名を入力できている |
| Repo作成後 | default main、Issues、Falling Blocksがある |
| Collaborator招待後 | ペアへ招待済み。遅い場合はPublic URL共有へ切り替え |
| Issue作成後 | Issue番号を控えている |
| clone後 | リポジトリを clone して VSCode で開けている |
| Branch作成後 | Branch表示が `main` ではなく作業Branchになっている |
| Push後 | 作業 Branch が GitHub に push され、`game.js` が変更されている |
| PR作成後 | base / compare が正しい |
| Review前 | Files changed に不要な変更が混ざっていない |
| Merge後 | IssueがClosed、Branch削除、log / blameで修正を発見 |

進捗確認のタイミング以外は、長い全体説明を増やしすぎず、個別サポートを中心にします。

## ペアレビューの回し方

- 講師がペアを指定し、互いのGitHub IDを交換させる。
- 参加者ごとにRepoが異なるため、互いのPull Request URLをチャットなどで交換する。
- Reviewer欄でペアを指定できる場合は指定する。
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
- `git blame` で相手の `FLOOR_ROW` の変更者を確認する
- 発展編の [CLI 手順](../handson/02-github-flow-cli-optional.md) を読み、Web UI と対応づける

## 基本編の範囲

- 基本編では GitHub Actions や Pages を必須にしない。
- Organization 管理や高度なセキュリティ機能は扱わない。
- 参加者ごとのPublic Template Repo + ペアCollaboratorを標準にする。
- fork / upstreamは最初の体験では扱わない。
- 共有Repo方式はRepo作成が難しい場合の代替に限定する。

実施方式に迷う場合は、[基本編で扱う範囲と実施パターン](../docs/basic-scope.md) を参照してください。

## 困ったとき

| 事象 | 対応 |
| --- | --- |
| Use this templateが見つからない | `Tachaan/github-basic-practice` を開いているか確認する |
| Collaborator招待が届かない | GitHub IDを確認し、Public RepoのPR URL共有でReviewを先に進める |
| 参加者が別の空Repoを作った | Templateから作り直し、default mainとFalling Blocksを確認する |
| Codespacesでアプリを開けない | `python -m http.server 8000` とPortsタブを確認する |
| Branch を作らず main を編集した | その変更はデモとして扱い、なぜ Branch が必要かを説明する |
| PR の向きが逆 | base が既定ブランチ、compare が作業 Branch であることを確認する |
| Review コメントの書き方がわからない | 「確認しました」「ここはこう見えました」のような短いコメントでよいと伝える |
| Merge ボタンが押せない | 権限、未解決レビュー、競合の有無を確認する |
| 参加者の進度に差が出る | 早い人に Review 役をお願いする |
| アカウント作成が終わっていない | [GitHub アカウントを作成する](../docs/create-github-account.md) を案内し、必要なら見学参加に切り替える |
| メール検証が終わっていない | 確認メールを開くよう案内する |
| UI表記が教材と違う | ボタン名ではなく、Issue/Branch/PRなどの目的で読み替える |
| 権限がなくMergeできない | 講師が権限設定を確認し、必要なら講師がMerge確認を代行する |
| ペアが相手のPRを見つけられない | 各自のRepoは別なので、Pull RequestのURLを直接交換する |

概念FAQ:

| 質問 | 短い回答 |
| --- | --- |
| Templateとforkは何が違いますか？ | Templateは独立した新規Repoの開始点、forkは元Repoとの関係を残した複製です |
| なぜIssueから始めるのですか？ | 変更の目的を後から追えるようにするためです |
| commitとPRは何が違いますか？ | commitは保存ポイント、PRは相談と確認の場所です |
| Branchを消して大丈夫ですか？ | Merge後なら変更はmainに入っているため、作業Branchは消しても大丈夫です |
| ActionsやPagesは使わないのですか？ | 今日はGitHub Flowの本筋に集中し、発展として紹介します |

## まとめで使う問い

- Branch を使うと何が安全になりますか？
- Templateから自分のRepoを作ると、何を自分で管理できますか？
- Label / Assignee / @メンションは何を伝えましたか？
- Pull Request は何のための場所でしたか？
- Review で何を確認しましたか？
- 実務で main に直接 push しない理由は何ですか？
- 今回のバグ修正を GitHub Flow に乗せると、何が見えるようになりましたか？
- `git log` / `git blame` で、どの情報を確認できましたか？
- 次に CLI で同じ流れをやるとしたら、どの操作がどのコマンドに対応しますか？

理解度チェック:

| 問い | 期待する答え |
| --- | --- |
| Closes #番号の役割は？ | PRとIssueを結び、Merge時にIssueを自動で閉じる |
| base と compare の違いは？ | baseは取り込み先、compareは取り込みたい変更が入ったBranch |
| Files changed で見るものは？ | 変更前後の差分と不要な変更の有無 |
| Review コメントの目的は？ | 間違い探しだけでなく、意図共有と合意形成 |

終了後チェック:

- [ ] 全員の Pull Request の状態を確認した
- [ ] 全員が自分の練習Repoを作り、default mainで進めた
- [ ] main に修正が入ったことを確認した
- [ ] log / blameで自分の変更を確認した
- [ ] 未MergeのPRや未CloseのIssueがあれば扱いを決めた
- [ ] 練習Repoを残す／Archive／削除、Collaborator解除の選択を案内した
- [ ] 次に学ぶ内容（CLI / Actions / Branch protection / Pages）を案内した

関連資料:

- [ワークショップ全体設計](../docs/workshop-plan.md)
- [GitHub と Git の基本](../docs/github-overview.md)
- [GitHub Flow](../docs/github-flow.md)
- [ハンズオン手順](../handson/README.md)
