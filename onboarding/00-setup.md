# 00. 環境構築 — ローカル開発に必要なツールをそろえる

> ℹ️ このページは **基本編ハンズオンの事前準備**であり、**ローカル開発オンボーディング編（Phase 1）の最初のステップ**でもあります。
> ここで「自分のPCで開発するために必要なツール」をすべてそろえます。
> 基本編でもコードの修正は VSCode で行うため、先にこの環境構築を済ませてください。

> 📝 本教材では既定ブランチを `main` と表記します。画面上で `master` と表示される場合は、`main` を `master` に読み替えてください。

---

## 0. 必要ツール早見表（最初にここを確認）

ローカルで開発するために、次の4つをそろえます。
**まだ何も入っていなくても大丈夫です。** このページで順番に用意します。

| # | ツール | 役割 | 必須 | このページの手順 |
| --- | --- | --- | --- | --- |
| 1 | **GitHub アカウント** | クラウド側の自分の入口 | ✅ 必須 | [前提](#1-githubアカウントを用意する) |
| 2 | **Git** | PC 上で履歴を記録するツール本体 | ✅ 必須 | [手順2](#2-git-をインストールする) |
| 3 | **コードエディタ（VS Code 推奨）** | ファイルを編集する道具 | ✅ 必須 | [手順3](#3-コードエディタvs-codeを入れる) |
| 4 | **ターミナル** | コマンドを入力する画面 | ✅ 必須（OS標準でOK） | [手順4](#4-ターミナルを開く) |
| 5 | **GitHub CLI（`gh`）** | 認証と PR 作成をかんたんにする | ⭐ 推奨 | [手順6](#6-githubに接続する認証) |

> 🔑 **ゴール**: このページが終わると、`git clone`（ダウンロード）と `git push`（アップロード）が
> 自分の PC からできる状態になります。

完了の目安（あとで1つずつ確認します）:

- [ ] `git --version` がバージョンを表示する
- [ ] VS Code でファイルを開ける
- [ ] `git config --global user.name` に自分の名前が表示される
- [ ] GitHub に `git clone` / `git push` できる（認証が通る）

---

## 1. GitHub アカウントを用意する

ローカル開発でも、変更のアップロード先は GitHub です。アカウントが必要です。

- すでに持っている場合: そのまま手順2へ。
- まだの場合: [GitHub アカウントを作成する](../docs/create-github-account.md) を先に終わらせてください。

> 🔑 **おすすめ**: 2要素認証（2FA）を有効にしておくと、後の認証もスムーズです。

---

## 2. Git をインストールする

Git は「PC の中で変更履歴を記録するツール本体」です。これがないと始まりません。

### Windows

方法A（おすすめ・winget を使う）:

```powershell
winget install --id Git.Git -e
```

方法B: ブラウザで <https://git-scm.com/download/win> を開き、インストーラーを実行する。
途中の選択肢はすべて既定（Next を押し続ける）で問題ありません。

### macOS

方法A（おすすめ・Homebrew を使う）:

```bash
brew install git
```

方法B（Homebrew がない場合）: 次を実行すると、開発ツール一式と一緒に Git が入ります。

```bash
xcode-select --install
```

### Linux（Debian / Ubuntu 系）

```bash
sudo apt update && sudo apt install -y git
```

### インストールできたか確認する

**新しいターミナルを開いて**（手順4参照）、次を実行します。

```bash
git --version
```

`git version 2.40.0` のようにバージョンが表示されれば成功です。

> 📝 `git: command not found` と出る場合は、ターミナルを一度閉じて開き直してください。
> それでも出ない場合は、インストールが完了していない可能性があります。

---

## 3. コードエディタ（VS Code）を入れる

ファイルを編集する道具です。メモ帳でも編集はできますが、
**Visual Studio Code（VS Code）** は無料で、Git との相性もよく、初心者におすすめです。

### インストール

- ブラウザで <https://code.visualstudio.com/> を開き、自分の OS 用をダウンロードして実行する。
- Windows は winget でも入れられます。

```powershell
winget install --id Microsoft.VisualStudioCode -e
```

### 確認

- VS Code を起動できる。
- フォルダを開ける（`File > Open Folder...`）。

> 💡 VS Code 内の「ターミナル」（`表示 > ターミナル` / `` Ctrl+` ``）を使うと、
> 編集とコマンド操作を1つの画面でできて便利です。

---

## 4. ターミナルを開く

ターミナルは「コマンドを文字で入力する画面」です。**OS に標準で入っているものでOK**です。

| OS | 使うもの | 開き方 |
| --- | --- | --- |
| Windows | **PowerShell** | スタートメニューで「PowerShell」と検索して起動 |
| macOS | **Terminal（ターミナル）** | `アプリケーション > ユーティリティ > ターミナル` |
| Linux | 端末 | アプリ一覧から「Terminal」 |

> 💡 Windows では「Git Bash」（Git for Windows に付属）も使えます。
> 本教材のコマンドは PowerShell / macOS・Linux の両方を併記するので、どれでも進められます。

ターミナルが開いたら、試しに次を打ってみましょう（今いるフォルダの一覧が出ます）。

```bash
# macOS / Linux / Git Bash
ls
```

```powershell
# Windows PowerShell
Get-ChildItem
```

---

## 5. Git に名前とメールアドレスを設定する

Commit には「誰が変更したか」が記録されます。最初に一度だけ設定します。

```bash
git config --global user.name "あなたの名前"
git config --global user.email "you@example.com"
```

> 🔑 **メールアドレス**は、GitHub に登録したものか、GitHub が用意する
> **noreply アドレス**を使うのがおすすめです（実アドレスを公開したくない場合）。
> noreply アドレスは GitHub の `Settings > Emails` で確認できます。

設定できたか確認します。

```bash
git config --global user.name
git config --global user.email
```

入力した名前とメールが表示されれば成功です。

> 📝 既定ブランチ名を `main` にそろえたい場合は、次も設定しておくとよいです。
>
> ```bash
> git config --global init.defaultBranch main
> ```

---

## 6. GitHub に接続する認証

`git push`（アップロード）するには「あなたが本人である」ことを GitHub に伝える必要があります。
方法は3つあります。**初心者には方法A（GitHub CLI）が一番かんたん**です。

| 方法 | 難易度 | 向いている人 |
| --- | --- | --- |
| **A. GitHub CLI（`gh`）** | ★かんたん | これから始める人（おすすめ） |
| B. HTTPS + 資格情報マネージャー | ★かんたん | ツールを増やしたくない人 |
| C. SSH 鍵 | ★★ふつう | 仕組みを理解したい人・複数端末で使う人 |

### 方法A: GitHub CLI（おすすめ）

GitHub CLI（`gh`）を入れると、ブラウザでログインするだけで認証が完了します。

インストール:

```powershell
# Windows
winget install --id GitHub.cli -e
```

```bash
# macOS
brew install gh
```

```bash
# Linux（Debian / Ubuntu 系）。詳細は https://github.com/cli/cli#installation
sudo apt update && sudo apt install -y gh
```

ログイン:

```bash
gh auth login
```

質問には次のように答えるのが基本です。

- `What account do you want to log into?` → **GitHub.com**
- `What is your preferred protocol for Git operations?` → **HTTPS**
- `Authenticate Git with your GitHub credentials?` → **Yes**
- `How would you like to authenticate?` → **Login with a web browser**

画面に出る短いコード（例: `ABCD-1234`）を控え、Enter を押すとブラウザが開きます。
ブラウザでコードを入力して許可すれば完了です。

確認:

```bash
gh auth status
```

`Logged in to github.com as <あなたのID>` と出れば成功です。

### 方法B: HTTPS + 資格情報マネージャー

Git for Windows / 最近の macOS の Git には **資格情報マネージャー** が付いています。
初めて `git push` したときにブラウザのログイン画面が出て、一度ログインすれば次回から自動で認証されます。

特別な準備は不要です。手順7の動作確認で、初回 push 時にブラウザ認証を済ませてください。

> 📝 昔ながらの方法として **Personal Access Token（PAT）** をパスワード代わりに使う方法もあります。
> GitHub の `Settings > Developer settings > Personal access tokens` で発行し、
> push 時のパスワード入力欄に貼り付けます。方法A・Bで困ったときの代替です。

### 方法C: SSH 鍵（任意）

仕組みを理解したい人向けです。鍵を1回作って GitHub に登録すると、以後パスワード入力なしで push できます。

```bash
# 1. 鍵を作る（メールは GitHub 登録のものを推奨。途中の質問は Enter でOK）
ssh-keygen -t ed25519 -C "you@example.com"

# 2. 公開鍵の中身を表示してコピーする
cat ~/.ssh/id_ed25519.pub
```

コピーした内容を GitHub の `Settings > SSH and GPG keys > New SSH key` に貼り付けて登録します。
接続テスト:

```bash
ssh -T git@github.com
```

`Hi <あなたのID>! You've successfully authenticated...` と出れば成功です。
SSH を使う場合、clone の URL は `git@github.com:owner/repo.git` 形式になります。

> 公式手順: [SSH の新しい鍵を生成して ssh-agent に追加する](https://docs.github.com/ja/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

---

## 7. 動作確認

練習Repoはハンズオンの最初にTemplateから作ります。ここではGitとCommit設定を確認します。

```bash
git --version
git config --global user.name
```

GitHub CLIを選んだ場合:

```bash
gh auth status
```

SSHを選んだ場合:

```bash
ssh -T git@github.com
```

HTTPSを選んだ場合は、初回push時にブラウザ認証を確認します。実際のclone / pushは、自分の練習Repoを作った後に行います。

> Codespacesを選ぶ場合はローカルへのインストールと認証設定を省略できます。ハンズオンで自分の練習Repoを作った後、Code > Codespacesから起動します。

---

## 8. うまくいかないとき

| 事象 | 原因の例 | 対応 |
| --- | --- | --- |
| `git: command not found` | Git 未インストール / PATH 未反映 | ターミナルを開き直す。手順2を再確認 |
| `git --version` は出るが push で 403 | 認証が通っていない | `gh auth login`（方法A）をやり直す |
| push 時にパスワードを聞かれて失敗 | 通常のパスワードは使えない | PAT を発行して使う、または `gh auth login` |
| `Permission denied (publickey)` | SSH 鍵が未登録 | 手順6C で公開鍵を GitHub に登録 |
| `Authentication failed` | 資格情報が古い | 資格情報マネージャーの GitHub 項目を削除して再ログイン |
| 会社PCで winget が使えない | 管理ポリシー | ブラウザからインストーラーを使う（方法B） |

> うまくいかない場合は、そのまま進めず講師に相談してください。
> 認証まわりは環境差が大きく、初心者がひとりで悩む必要はありません。

---

## 9. 準備ができたら

早見表の完了チェックがすべて埋まったら、次に進みます。

- 次へ: [基本編: Template Repo作成から履歴確認まで](../handson/01-github-flow-web.md)
- 発展: [01. ローカル開発サイクル（clone → 編集 → commit → push）](01-local-flow.md)
- 一覧に戻る: [ローカル開発オンボーディング編 トップ](README.md)
