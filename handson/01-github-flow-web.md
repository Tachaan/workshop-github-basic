# 基本編: VSCode で修正し、GitHub Flow を一周する

> 所要: 約40分（開発環境が用意できている前提）。環境構築から始める場合は別途 30〜45分みておきます。
> 流れ: Issue → clone → VSCode で修正 → Commit / Push → Pull Request → Review → Merge を一周します。
> **コードの修正は自分のPCの VSCode** で行い、**Issue・Pull Request・Review・Merge は GitHub（ブラウザ）** で行います。
> 本教材では既定ブランチを `main` と表記します。画面で `master` と表示される場合は、`main` を `master` に読み替えてください。
>
> 📷 **スクショの入れ方**: 本文中に `> 📷 スクショ:` で「撮るとよい場所」を示しています。用意した画像を `handson/images/` に置き、該当の2行を `![説明](images/ファイル名.png)` に置き換えると差し込めます。一覧は [handson/images/README.md](images/README.md) を参照してください。

---

## 0. このハンズオンでやること

Falling Blocks というミニアプリには、**ブロックが底で止まらず落ち続ける** バグがあります。
このバグを、GitHub Flow に沿って修正します。

今回は次の流れで進めます。

1. GitHub で **Issue**（やることの記録）を作る
2. リポジトリを自分のPCに **clone** し、**VSCode** で開く
3. 作業用の **Branch** を作り、VSCode で **1行だけ修正**する
4. **Commit / Push** で変更を GitHub に送る
5. **Pull Request** を作り、**Review** を受けて **Merge** する

### 0-1. 修正対象

| 項目 | 値 |
| --- | --- |
| アプリ | Falling Blocks（`app/falling-blocks/`） |
| 直すファイル | `app/falling-blocks/game.js` |
| 直す行 | `const FLOOR_ROW = ...` の1行 |
| 直す内容 | 底の行の定義を正しくする |

### 0-2. 今の不具合

- ブロックが盤面の底で止まらない。
- ブロックが盤面の外まで落ち続ける。
- 「底に着いた」と判定されない。

### 0-3. どこで何をするか

操作する場所が **GitHub（ブラウザ）** と **自分のPC（VSCode / ターミナル）** に分かれます。今いる場所を意識すると迷いません。

| 場所 | 何をするか | 使うStep |
| --- | --- | --- |
| GitHub: **Issues** タブ | やることを記録する | Step 1 |
| GitHub: **Code** タブ | clone 用 URL を取得する | Step 2 |
| 自分のPC: **ターミナル** | clone / branch / commit / push を実行する | Step 2, 3, 5 |
| 自分のPC: **VSCode** | `game.js` を編集する | Step 3, 4 |
| GitHub: **Pull requests** タブ | Pull Request・Review・Merge を行う | Step 6, 7, 9 |

### 0-4. GitHub Flow の対応

| GitHub Flow | このハンズオン | 場所 |
| --- | --- | --- |
| ブランチを作成 | Branch を作る | PC（ターミナル） |
| 変更を加える | VSCode で `game.js` を修正する | PC（VSCode） |
| 変更をコミット | Commit / Push する | PC（ターミナル） |
| プルリクエストを作成 | Pull Request を作る | GitHub |
| レビューを受ける | Review を受ける / する | GitHub |
| マージ | Merge する | GitHub |
| ブランチを削除 | Branch を削除する | GitHub + PC |

GitHub Flow そのものの解説は [GitHub Flow とは](../docs/github-flow.md) を参照してください。

### 0-5. 進め方のコツ

- 一気に進めず、各ステップの「完了条件」を確認しながら進めます。
- どのStepも「今 GitHub にいるのか、自分のPCにいるのか」を意識します。
- わからなくなったら、無理に進めず講師に相談します。

---

## 事前準備: 開発環境を用意する（最初に必ず）

今回はコードを **自分のPCの VSCode** で修正します。次のツールが必要です。
**まだ入っていなくても大丈夫**——下のリンク先の手順でそろえられます。

| ツール | 役割 | 確認コマンド |
| --- | --- | --- |
| Git | 変更を記録し、GitHub と同期する | `git --version` |
| VSCode | コードを編集する | （起動できれば OK） |
| ターミナル | git コマンドを実行する（OS標準で OK） | — |
| GitHub 認証 | clone / push を許可する | `gh auth status` |

詳しい導入手順（Windows / Mac、インストール、認証）は次のページにまとまっています。

- 📦 [環境構築（必要ツール・インストール・認証）](../onboarding/00-setup.md)

> 🔑 ここまで（Git・VSCode・認証）が用意できていれば、Step 2 以降の clone / 編集 / push がスムーズに進みます。
> この場で詰まったら、無理に進めず講師に相談してください。

---

## 1. Issue を作る

Issue は「何を直すのか」「なぜ直すのか」を残す場所です。
いきなりファイルを編集せず、まず作業の目的を見える形にします。

このステップでやることは、画面の **緑色のボタンを2回押す** ことです。

```text
①Issuesタブを押す → ②New issue を押す → ③Title と本文を入力 → ④Submit new issue を押す
```

### 1-1. Issues タブを押して一覧を開く

1. 講師から案内されたリポジトリのページをブラウザで開く
2. 画面の **いちばん上** にある横並びメニューを見る
3. その中の **Issues** を押す
   - `Code` のすぐ右隣にあります
   - 丸の中に点があるアイコンが目印です
   - 右側に数字（未対応の Issue 数）が付くことがあります

画面の見え方（上部メニュー。`↑` の位置を押す）:

```text
< > Code    Issues    Pull requests    Actions    Settings
            ‾‾‾‾‾‾
            ↑ ここを押す
```

> 📷 **スクショ**: `handson/images/01-issues-tab.png`
> 撮る内容: リポジトリ上部の横並びメニュー。**Issues** タブを赤枠で強調。

### 1-2. New issue（緑のボタン）を押す

1. Issue 一覧の画面が開く
2. 画面の **右上** にある緑色の **New issue** ボタンを押す
3. テンプレート選択画面が出たら、**Workshop task** の行にある **Get started** を押す
   - テンプレートが出ず、そのまま入力画面になることもあります。その場合はそのまま次へ進みます。

画面の見え方（Issue 一覧の右上。`↑` の位置を押す）:

```text
┌──────────────────────────────────────────────────┐
│ Filters ▾   Q is:issue is:open       [ New issue ] │  ← 緑のボタン
└──────────────────────────────────────────────────┘
                                        ‾‾‾‾‾‾‾‾‾‾‾
                                        ↑ ここを押す
```

> 📷 **スクショ**: `handson/images/02-new-issue-button.png`
> 撮る内容: Issue 一覧画面の右上。緑の **New issue** ボタンを赤枠で強調。

### 1-3. Title（タイトル）を入力する

入力画面の **いちばん上** にある横長の1行入力欄が **Title** 欄です。

1. **Title** 欄を1回クリックする
2. 次の文字をそのまま入力する

```text
Fix Falling Blocks floor detection
```

タイトルは「何を直すか」が一目で分かるようにします。
`Bug fix` だけだと、あとから見た人が内容を判断できません。

画面の見え方（入力画面を上から順に。①→②→③の順に操作する）:

```text
┌──────────────────────────────────────────────────┐
│ Add a title                                        │
│ [ Fix Falling Blocks floor detection             ] │ ← ①Title 欄に入力
├──────────────────────────────────────────────────┤
│ Add a description       Write | Preview            │
│ ┌────────────────────────────────────────────────┐ │
│ │ （ここに本文を貼り付ける）                       │ │ ← ②本文欄に貼り付け
│ │                                                │ │
│ └────────────────────────────────────────────────┘ │
│                               [ Submit new issue ] │ ← ③緑のボタンを押す
└──────────────────────────────────────────────────┘
```

### 1-4. 本文を貼り付けて入力する

Title 欄の下にある **大きい入力欄**（`Add a description` や `Leave a comment` と書かれた箱）に本文を書きます。

1. 大きい本文欄を1回クリックする
2. 次のテキストをすべてコピーして貼り付ける
3. 貼り付けたあと、`<github-id>` を自分の GitHub ID に置き換える

```markdown
## Goal / 目的

Falling Blocks の「ブロックが底で止まらず落ち続ける」バグを直す。

## Current behavior / 現在の動き

- ブロックは盤面の上から落ちてくる。
- ブロックが盤面の底で止まらない。
- ブロックが盤面の外まで落ち続ける。

## Expected behavior / 期待する動き

- ブロックが盤面の底（いちばん下の行）で止まる。
- 「底で止まった」と分かる表示が出る。

## File / ファイル

`app/falling-blocks/game.js`

## Branch / ブランチ

`fix-falling-blocks-floor-<github-id>`

## Done when / 完了条件

- [ ] FLOOR_ROW が盤面のいちばん下の行を指している
- [ ] Pull Request を作成した
- [ ] Pull Request のレビューを受けた
- [ ] Pull Request を Merge した
- [ ] 関連する Issue が閉じた
```

`<github-id>` の置き換え例:

```text
変更前: fix-falling-blocks-floor-<github-id>
変更後: fix-falling-blocks-floor-octocat
```

> 📝 本文欄の上の **Preview** を押すと、貼り付けた本文の見た目を確認できます。**Write** を押すと入力に戻ります。

各項目の意味:

| 項目 | 何を書くか | なぜ必要か |
| --- | --- | --- |
| Goal / 目的 | 何を直したいか | 作業の目的を共有するため |
| Current behavior / 現在の動き | 今どう困っているか | バグの状態を説明するため |
| Expected behavior / 期待する動き | どうなれば正しいか | 修正後のゴールを決めるため |
| File / ファイル | どのファイルを見るか | 作業対象を迷わないようにするため |
| Branch / ブランチ | どのBranchで作業するか | mainに直接変更しないため |
| Done when / 完了条件 | 何が終われば完了か | 作業の終わりを判断するため |

> 📝 テンプレートが自動で入っていて英語の説明が表示される場合は、英語部分を消して上のテキストを貼り付けるか、`<github-id>` だけ置き換えれば大丈夫です。

> 📷 **スクショ**: `handson/images/03-issue-form-filled.png`
> 撮る内容: Title と本文を入力し終えた Issue 作成画面。右下の緑 **Submit new issue** も画面内に入れる。

### 1-5. Submit new issue（緑のボタン）を押して作成する

1. **Title** に文字が入っていることを確認する
2. 本文に Goal / Current behavior / Expected behavior / File / Branch / Done when が入っていることを確認する
3. 本文に `<github-id>` が残っていないことを確認する
4. 入力欄の **右下** にある緑色の **Submit new issue** ボタンを押す

> 📝 ボタンが `Create` と表示されることもあります。どちらでも、緑色のボタンを押せば Issue が作成されます。

### 1-6. Issue 番号を確認する（あとで使う）

ボタンを押すと、画面が Issue の詳細ページに変わります。

1. 画面上部に、入力したタイトルが表示される
2. タイトルのすぐ近く（またはブラウザのURL末尾）に `#12` のような **番号** が表示される
3. この番号をメモする（あとで Pull Request 本文の `Closes #12` に使います）

Issue 番号の例:

```text
#12
```

Issue 作成後に見る場所:

| 場所 | 見るもの |
| --- | --- |
| 画面上部 | Issueタイトル |
| タイトルの近く | Issue番号（例: `#12`） |
| 緑色の `Open` 表示 | まだ対応中であること |
| 本文 | さきほど入力した目的・現在の動き・期待する動き |

完了条件:

- Issue が作成されている
- Issue 番号をメモしている
- Issue を見れば、何を直す作業か分かる
- `Branch / ブランチ` に自分のBranch名が書かれている

> 📷 **スクショ**: `handson/images/04-issue-created-number.png`
> 撮る内容: 作成後の Issue 詳細ページ。タイトル横の **#番号** と緑の **Open** バッジを赤枠で強調。

---

## 2. リポジトリを clone して VSCode で開く

Issue で「やること」を決めたら、リポジトリを自分のPCに持ってきて（clone）、VSCode で開きます。
ここからは **自分のPC** での作業です。

### 2-1. clone 用の URL を取得する（GitHub）

1. リポジトリの **Code** タブを開く
2. 右側にある緑色の **`< > Code`** ボタンを押す
3. **HTTPS** タブが選ばれていることを確認する
4. 表示された URL の右にある **コピー** アイコンを押す

画面の見え方（Code ボタンを押したところ）:

```text
┌────────────────────────────────────────────┐
│ Local    Codespaces                         │
│ [ HTTPS ]  SSH   GitHub CLI                  │ ← HTTPS を選ぶ
│ https://github.com/owner/repo.git      [⧉]  │ ← ⧉ でコピー
└────────────────────────────────────────────┘
```

> 📷 **スクショ**: `handson/images/05-code-clone-url.png`
> 撮る内容: 緑の **Code** ボタンを押し、HTTPS の URL とコピーアイコンが見える状態を赤枠で強調。

### 2-2. clone する（ターミナル）

ターミナル（Windows は **PowerShell**、Mac は **Terminal**）を開き、作業用フォルダで次を実行します。
`<コピーしたURL>` は 2-1 でコピーしたものを貼り付けます。

```bash
git clone <コピーしたURL>
```

clone が終わると、リポジトリ名のフォルダができます。その中へ移動します。

```bash
cd <リポジトリ名>
```

> 📝 認証を求められたら、[00. 環境構築](../onboarding/00-setup.md) の手順（`gh auth login` など）で済ませてください。

### 2-3. VSCode で開く

clone したフォルダの中で次を実行すると、VSCode が開きます。

```bash
code .
```

`code` コマンドが使えない場合は、VSCode を起動して **File > Open Folder...**（`ファイル > フォルダーを開く`）から、clone したフォルダを開きます。

確認すること:

- VSCode 左の **エクスプローラー** に `app` や `handson` などのフォルダが見える
- `app/falling-blocks/game.js` を開ける

完了条件:

- リポジトリを clone できている
- VSCode でそのフォルダを開けている

> 📷 **スクショ**: `handson/images/06-vscode-open.png`
> 撮る内容: VSCode で clone したリポジトリを開き、左のエクスプローラーに `app/falling-blocks/` が見える状態。

---

## 3. Branch を作る（ローカル）

`main` を直接さわらず、作業用の Branch を作ります。
VSCode の中のターミナル（**表示 > ターミナル** / `` Ctrl + ` ``）を使うと、編集と git 操作を同じ画面でできて便利です。

### 3-1. main を最新にする

```bash
git switch main
git pull
```

> 📝 画面上の既定ブランチが `master` の場合は `git switch master` にします。

### 3-2. 作業 Branch を作って切り替える

Branch 名は `fix-falling-blocks-floor-<github-id>` です。`<github-id>` を自分の GitHub ID に置き換えます。

```bash
git switch -c fix-falling-blocks-floor-octocat
```

確認すること:

```bash
git branch
```

- 今いる Branch（`*` が付いている行）が `fix-falling-blocks-floor-<github-id>` になっている
- `main` ではない

> 🔑 **重要**: 以降の編集は必ずこの Branch で行います。
> `main` のままになっていたら、`git switch -c ...` をやり直してください。

完了条件:

- 作業 Branch を作って、その Branch に切り替わっている

---

## 4. VSCode で `game.js` を修正する

ここで実際にバグを直します。直すのは **1行だけ** です。

### 4-1. 修正対象ファイルを開く

1. VSCode 左の **エクスプローラー** で `app` → `falling-blocks` フォルダを開く
2. `game.js` をクリックして開く

確認すること:

- VSCode のタブに `game.js` が表示されている
- VSCode 左下の Branch 表示が `fix-falling-blocks-floor-<github-id>` になっている（`main` ではない）

### 4-2. 修正する行を探す

`Ctrl + F`（Mac は `⌘ + F`）でファイル内検索を開き、次の行を探します。

```javascript
const FLOOR_ROW = Number.POSITIVE_INFINITY;
```

この定義は「底の行」を表すはずですが、`Number.POSITIVE_INFINITY` は無限大です。
そのため、ブロックがどれだけ下に落ちても「まだ底ではない」と判断され、止まりません。

### 4-3. 1行だけ修正して保存する

その行を、次のように書き換えます。

```javascript
const FLOOR_ROW = ROWS - 1;
```

なぜ `ROWS - 1` なのか:

- 行番号は `0` から数えます（`0, 1, 2, ...`）。
- 盤面の行数は `ROWS`（このアプリでは `16`）です。
- いちばん下の行は `ROWS - 1`（= `15`）になります。

書き換えたら保存します。

- メニュー **File > Save**、または `Ctrl + S`（Mac は `⌘ + S`）
- VSCode のタブの「●」が「×」に戻れば保存済みです

変更しないところ（さわると別のバグになります）:

- `ROWS` / `COLS` の値
- `SHAPE` などのブロック定義
- `isAtBottom()` や `tick()` の中身

> 📷 **スクショ**: `handson/images/07-vscode-edit.png`
> 撮る内容: VSCode で `FLOOR_ROW` の行を `ROWS - 1` に直したところ。該当行を赤枠で強調。

完了条件:

- `FLOOR_ROW` が `ROWS - 1` になっている
- ファイルを保存している
- 直したのは1行だけ

---

## 5. Commit して Push する

修正を Git の履歴に記録し（Commit）、GitHub に送ります（Push）。VSCode の中のターミナルで行います。

### 5-1. 変更を確認する

```bash
git status
git diff
```

- `git status` に `app/falling-blocks/game.js` が「変更あり」として出る
- `git diff` に `FLOOR_ROW` の差分が出る

期待する差分:

```diff
- const FLOOR_ROW = Number.POSITIVE_INFINITY;
+ const FLOOR_ROW = ROWS - 1;
```

### 5-2. Commit する

```bash
git add app/falling-blocks/game.js
git commit -m "Fix Falling Blocks floor detection"
```

> 🔑 `git add` は「Commit に含める変更を選ぶ」、`git commit` は「選んだ変更を履歴に固定する」操作です。

### 5-3. Push する

この作業 Branch を初めて push するので、`-u` を付けます。

```bash
git push -u origin fix-falling-blocks-floor-octocat
```

- 認証を求められたら [00. 環境構築](../onboarding/00-setup.md) の手順で済ませる
- push が成功すると、GitHub 側にこの Branch が現れる

完了条件:

- 変更が Commit されている
- 作業 Branch が GitHub に Push されている

> 📷 **スクショ**: `handson/images/08-terminal-commit-push.png`
> 撮る内容: ターミナルで `git add` → `git commit` → `git push` を実行し、push 成功のメッセージが見える状態。

> 💡 VSCode 左の **ソース管理**（枝のアイコン）からも、add / commit / push はボタン操作でできます。慣れてきたら GUI も試してみましょう。

---

## 6. Pull Request を作る

Pull Request は、作業 Branch の変更を `main` に取り込んでよいか相談する場所です。
ここで差分を見せ、レビューしてもらいます。ここからは **GitHub（ブラウザ）** での作業です。

### 6-1. PR作成画面を開く

Push のあと、GitHub のリポジトリ画面を開く（または再読み込みする）と、上部に **黄色っぽい帯** が出て、その右に緑色の **Compare & pull request** ボタンが表示されます。表示されていれば、それを押すのがいちばん簡単です。

画面の見え方（Push 直後のリポジトリ上部）:

```text
┌──────────────────────────────────────────────────────────────┐
│ fix-falling-blocks-floor-octocat had recent pushes            │
│                              [ Compare & pull request ]        │ ← 緑のボタン
└──────────────────────────────────────────────────────────────┘
                              ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
                              ↑ ここを押す
```

帯が出ない／消えてしまった場合:

1. **Pull requests** タブを開く
2. 右上の **New pull request** を押す
3. 次の 6-2 で base と compare を設定する

> 💡 ターミナル派の人は、clone したフォルダで `gh pr create --fill` でも Pull Request を作成できます。

> 📷 **スクショ**: `handson/images/09-compare-pr-banner.png`
> 撮る内容: Push 後にリポジトリ上部へ出る黄色い帯と緑の **Compare & pull request** ボタンを赤枠で強調。

### 6-2. base / compare を確認する

Pull Request の向き（どこへ・どこから取り込むか）は特に重要です。
画面の上の方に、2つのドロップダウンが `←` でつながって並んでいます。

| 表示 | 意味 | 今回の値 |
| --- | --- | --- |
| base | 変更を取り込みたい先 | `main` |
| compare | 取り込みたい変更が入っている Branch | `fix-falling-blocks-floor-<github-id>` |

画面の見え方（PR作成画面の上部のドロップダウン）:

```text
base: [ main ▾ ]   ←   compare: [ fix-...-octocat ▾ ]
        ‾‾‾‾                       ‾‾‾‾‾‾‾‾‾‾‾‾‾
      取り込み先                    自分のBranch
```

正しい向き:

```text
base: main ← compare: fix-falling-blocks-floor-<github-id>
```

逆になっている場合は、各ドロップダウンを押して選び直します。先に進まず修正します。

> 📷 **スクショ**: `handson/images/10-base-compare.png`
> 撮る内容: PR 作成画面上部の2つのドロップダウン。`base: main ← compare: 自分のBranch` を赤枠で強調。

### 6-3. PRタイトルを書く

Title:

```text
Fix Falling Blocks floor detection
```

Issue と同じタイトルで問題ありません。
何を直した Pull Request かが分かることを優先します。

### 6-4. PR本文を書く

PRタイトル欄の下にある大きい本文欄に、次をコピーして貼り付けます。
貼り付けたあと、`<issue-number>` を 1-6 でメモした自分の Issue 番号に置き換えます。

```markdown
## Summary / 変更概要

Falling Blocks の底の判定を修正した。

## What changed / 変更内容

- `FLOOR_ROW` を `Number.POSITIVE_INFINITY` から `ROWS - 1` に変更した。
- これでブロックが盤面のいちばん下の行で止まる。

## Related issue / 関連Issue

Closes #<issue-number>

## Review points / レビュー観点

- [ ] FLOOR_ROW が盤面のいちばん下の行を指している
- [ ] ブロックが盤面の底で止まる
- [ ] Files changed に関係のない変更が混ざっていない
- [ ] 関連 Issue が `Closes #...` でつながっている
```

`<issue-number>` の置き換え例:

```text
変更前: Closes #<issue-number>
変更後: Closes #12
```

`Closes #12` と書いておくと、Pull Request が Merge されたときに Issue `#12` が自動で閉じます。

### 6-5. Files changed を確認する

Pull Request を作る前、または作った後に **Files changed** を開きます。

確認すること:

- 変更ファイルが `app/falling-blocks/game.js` である
- `FLOOR_ROW` の1行だけが中心的な差分になっている
- unrelated changes が混ざっていない

差分の見方:

| 表示 | 意味 |
| --- | --- |
| 赤い行 / `-` | 削除された内容 |
| 緑の行 / `+` | 追加された内容 |

期待する差分:

```diff
- const FLOOR_ROW = Number.POSITIVE_INFINITY;
+ const FLOOR_ROW = ROWS - 1;
```

完了条件:

- Pull Request が作成されている
- base / compare が正しい
- `Closes #<issue-number>` が書かれている
- Files changed で修正内容を説明できる

> 📷 **スクショ**: `handson/images/11-files-changed-diff.png`
> 撮る内容: **Files changed** タブの差分。赤い `-` 行と緑の `+` 行（FLOOR_ROW の変更）が見える状態。

---

## 7. Review を受ける / Review する

Review は、Pull Request の変更を他の人が確認し、質問・コメント・承認する場です。
責める場ではなく、安心して Merge するための会話です。

### 7-1. ペアのPRを開く

講師からペア指定がある場合:

1. 指定された相手の Pull Request を開く
2. Conversation と Files changed を確認する

講師から指定がない場合:

1. **Pull requests** タブを開く
2. 一覧で自分の次に表示されている人の Pull Request を開く
3. まだレビューがない Pull Request を優先する

### 7-2. Files changed を見る

確認すること:

- `app/falling-blocks/game.js` が変更されている
- `FLOOR_ROW` が `ROWS - 1` になっている
- unrelated changes がない
- PR の向きが `base: main` / `compare: fix-falling-blocks-floor-<github-id>` になっている

### 7-3. コメントを書く

短いコメントで問題ありません。

確認コメント:

```text
FLOOR_ROW が ROWS - 1 になっていることを確認しました。
```

動作確認コメント:

```text
ローカルで確認したら、ブロックが底で止まりました。
```

質問コメント:

```text
ROWS - 1 にすると最後の行を表せる、という理解で合っていますか？
```

提案コメント:

```text
PR本文に、なぜ ROWS - 1 にするのかを一言足すと読みやすそうです。
```

> 📷 **スクショ**: `handson/images/12-inline-comment.png`
> 撮る内容: Files changed で行にカーソルを乗せると出る **＋** を押し、コメント入力欄が開いた状態。

### 7-4. Review changes を送る

1. Pull Request の **Files changed** タブを開く
2. 画面の **右上** にある **Review changes** ボタンを押す
3. 出てきた小さいウィンドウのコメント欄に、全体コメントを書く
4. その下で **Comment** または **Approve** を選ぶ
5. ウィンドウ右下の緑色の **Submit review** を押す

画面の見え方（Files changed の右上）:

```text
┌──────────────────────────────────────────────────┐
│ Files changed                    [ Review changes ]│ ← ①ここを押す
│                                  ┌────────────────┐│
│                                  │ (コメントを書く) ││ ← ②コメント
│                                  │ (o) Comment     ││ ← ③種類を選ぶ
│                                  │ ( ) Approve     ││
│                                  │ [ Submit review ]││ ← ④緑のボタン
│                                  └────────────────┘│
└──────────────────────────────────────────────────┘
```

初心者向けの使い分け:

| 種類 | 使う場面 |
| --- | --- |
| Comment | 確認・質問・軽いコメントを残す |
| Approve | 変更内容に問題ないと伝える |
| Request changes | 修正してから Merge してほしいと伝える |

このハンズオンでは、講師の指示がなければ **Comment** または **Approve** を使います。

完了条件:

- Pull Request に Review コメントが残っている
- コメントをもらった場合は、必要に応じて返信している
- Files changed の差分を自分の言葉で説明できる

> 📷 **スクショ**: `handson/images/13-review-changes.png`
> 撮る内容: Files changed 右上の **Review changes** を押し、Comment / Approve と緑の **Submit review** が見えるウィンドウ。

---

## 8. Review コメントに対応する

レビューで質問や提案をもらったら、Pull Request の **Conversation** で返信します。

返信の例:

```text
コメントありがとうございます。ROWS - 1 で最後の行を指す、で合っています。
PR本文に理由を追記しました。
```

修正が必要になったとき（VSCode で直して、もう一度 Push する）:

1. 自分のPCで、作業 Branch にいることを確認する（`git branch`）
2. VSCode で `game.js` を再編集して保存する
3. ターミナルで、追加の Commit と Push をする

```bash
git add app/falling-blocks/game.js
git commit -m "Address review comment"
git push
```

> 📝 Pull Request は、**同じ Branch に Push すると自動で更新**されます。新しい Pull Request を作り直す必要はありません。

完了条件:

- もらったコメントに返信できている
- 修正が必要だった場合は、追加の Push で Pull Request が更新されている

---

## 9. Merge する

Review で問題がなければ、`main` に取り込みます（Merge）。

### 9-1. Merge pull request を押す

1. Pull Request の **Conversation** タブを開く
2. 下の方にある緑色の **Merge pull request** ボタンを押す
3. **Confirm merge** を押す

画面の見え方（Conversation の下部）:

```text
┌──────────────────────────────────────────────────┐
│ ✓ This branch has no conflicts with the base branch│
│                          [ Merge pull request ]    │ ← ①押す
│                          [ Confirm merge ]         │ ← ②押す
└──────────────────────────────────────────────────┘
```

> 📝 ボタンが押せない（灰色の）場合は、base / compare の向きや、コンフリクトの有無を確認します。

### 9-2. Issue が閉じたか確認する

- PR本文に `Closes #12` と書いていれば、Merge と同時に Issue `#12` が自動で閉じます。
- **Issues** タブを開き、対象の Issue が `Closed`（紫）になっていることを確認します。

> 📷 **スクショ**: `handson/images/14-merge-pr.png`
> 撮る内容: Conversation 下部の緑 **Merge pull request** / **Confirm merge** ボタン。Merge 後の紫 **Merged** バッジでも可。

### 9-3. Branch を削除する

Merge 後、GitHub の画面に **Delete branch** ボタンが表示されることがあります。

1. **Delete branch** を押す
2. 作業 Branch（`fix-falling-blocks-floor-<github-id>`）が GitHub 上から消える

自分のPC（ローカル）の作業 Branch も片付けます。

```bash
git switch main
git pull
git branch -d fix-falling-blocks-floor-octocat
```

消えないもの（消えても問題ないもの）:

- Pull Request の記録（履歴として残る）
- Issue（閉じても記録として残る）
- Merge した変更（`main` に入っている）

完了条件:

- Pull Request が Merge されている
- 関連 Issue が閉じている
- 作業 Branch を GitHub とローカルの両方で削除している

> 📷 **スクショ**: `handson/images/15-delete-branch.png`
> 撮る内容: Merge 後に表示される **Delete branch** ボタン（または削除後の表示）を赤枠で強調。

---

## 10. 修正後の動作確認

Merge した変更を自分のPCに取り込み、Falling Blocks の動きを確認します。

```bash
git switch main
git pull
```

ローカルプレビューで開きます（起動方法は [handson/README.md](README.md) の「ローカルで見る」を参照）。

```text
http://127.0.0.1:8000/app/falling-blocks/
```

期待する動作:

- ブロックが盤面の底（いちばん下の行）で止まる
- ブロックが盤面の外まで落ち続けない
- 「底で止まった」と分かる表示が出る

完了条件:

- 修正後のアプリで、ブロックが底で止まる
- GitHub Flow を Issue から Merge まで一周できた

> 📷 **スクショ**: `handson/images/16-app-fixed.png`
> 撮る内容: 修正後の Falling Blocks。ブロックが盤面の底の行で止まっている画面。

---

## 11. 困ったときは

| 症状 | 対処 |
| --- | --- |
| `git` コマンドが見つからない | Git が未インストール。[00. 環境構築](../onboarding/00-setup.md) を確認する |
| clone / push で認証エラーになる | `gh auth login` などで認証し直す（[00. 環境構築](../onboarding/00-setup.md)） |
| `code` コマンドが使えない | VSCode を起動し、**File > Open Folder** でフォルダを開く |
| `main` のまま編集してしまった | Commit 前なら `git switch -c fix-...` で作業Branchへ移してから Commit する |
| New issue が見つからない | Issues タブを開いてから、右上の緑ボタンを探す |
| Submit / Create ボタンが押せない | Title が空。Title を入力する |
| Pull Request の向きが逆 | base / compare を `base: main ← compare: 自分のBranch` に直す |
| Issue が閉じない | PR本文の `Closes #番号` を確認する |
| Merge ボタンが灰色 | base / compare の向き、コンフリクトの有無を確認する |
| 自分のBranchが見つからない | `git push -u origin <branch>` が成功したか確認する |

困ったら、無理に進めず講師に相談してください。

---

## 12. ふりかえり

このハンズオンで体験した GitHub Flow:

| 順番 | やったこと | どこで | 学んだこと |
| --- | --- | --- | --- |
| 1 | Issue を作る | GitHub | 作業の目的を記録する |
| 2 | clone して VSCode で開く | PC | 手元にコードを持ってくる |
| 3 | Branch を作る | PC | mainを守って作業する |
| 4 | VSCode で修正する | PC | 変更を加える |
| 5 | Commit / Push する | PC | 変更を記録して GitHub に送る |
| 6 | Pull Request を作る | GitHub | 変更を相談する |
| 7 | Review する | GitHub | 変更を確認し合う |
| 9 | Merge する | GitHub | 変更を main に取り込む |

考えてみましょう:

- なぜ `main` で直接作業せず、Branch を作ったのでしょうか？
- `clone` と `push` は、それぞれ何をする操作でしたか？
- Pull Request があると、何が安心できるでしょうか？
- `Closes #番号` を書くと、何が自動で起きましたか？

次に学ぶこと:

- [02. GitHub Flow をターミナルで体験する（任意）](02-github-flow-cli-optional.md)
- [ローカル開発オンボーディング編](../onboarding/README.md) … コンフリクト解消・やり直し（undo）まで含めた、実務に向けた発展トラック
