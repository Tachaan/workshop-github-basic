# 🐙 GitHub Basic ワークショップ

> ℹ️ 本リポジトリは **Git / GitHub 初心者向けの学習教材** です。
> 自分のPCの **VSCode** で簡易アプリのバグを修正し、**Issue / Branch / Commit / Pull Request / Review / Merge** の基本を体験します。

**前提事項**

- GitHub アカウントを持っていること
  - まだ持っていない場合は [GitHub アカウントを作成する](docs/create-github-account.md)（公式: [GitHubでのアカウントの作成](https://docs.github.com/ja/get-started/start-your-journey/creating-an-account-on-github)）
- 開発環境（**Git / VSCode / GitHub認証**）が用意できていること
  - コードは自分のPCの VSCode で修正します。未導入なら [00. 環境構築](onboarding/00-setup.md) で事前に準備（約30〜45分）。

**本日のゴール**

- GitHubを使った基本の開発の流れを理解すること

Git と GitHub を初めて使う参加者が、Falling Blocks アプリのバグ修正を題材に **GitHub Flow** の一連の流れを体験し、
「なぜブランチを切るのか」「なぜ Pull Request を作るのか」「レビューとマージで何を確認するのか」を理解するためのワークショップです。

> 📝 本教材では既定ブランチを `main` と表記します。画面上で `master` と表示されるリポジトリでは、`main` を `master` に読み替えてください。

---

## 🎯 このワークショップが解く課題

| よくある悩み | このワークショップでの解 |
| --- | --- |
| Git と GitHub の違いがわからない | 最初に必要な用語に絞り、GitHub 画面上の操作と対応づけて説明する |
| ブランチやコミットの意味が抽象的でつかみにくい | アプリのバグ修正を小さなブランチで作り、Pull Request で取り込む体験にする |
| Pull Request が何のためにあるかわからない | レビュー・会話・差分確認・履歴化の場として PR を使う |
| チーム開発の流れを想像できない | GitHub Flow を使い、Issue から Merge までを1サイクルで体験する |

> 💡 **キーメッセージ**: GitHub Flow は「小さく分けて、見える形で相談し、合意してから取り込む」ための開発の型。

---

## 📦 リポジトリ構成

```text
.
├── docs/          座学資料（GitHub概要、基本機能、GitHub Flow、基本編の実施範囲）
├── handson/       受講者向けハンズオン手順
├── onboarding/    発展: ローカル開発オンボーディング編（環境構築・同期・コンフリクト・復旧）
├── app/           ハンズオンで修正する簡易アプリ（Falling Blocks）
├── facilitator/   講師用ガイド（時間配分・進行台本・準備）
├── templates/     Issue / Pull Request 記入例
├── participants/  任意の追加練習用ディレクトリ
├── scripts/       ローカルプレビュー起動スクリプト
└── .github/       GitHub上で使うIssue / Pull Requestテンプレート
```

> 🔑 **設計のキモ**: コードの修正は自分のPCの **VSCode**、Issue・Pull Request・Review・Merge は **GitHub** で行い、実際の開発に近い形で GitHub Flow を一周します。環境構築（Git / VSCode / 認証）は事前準備として最初にガイドします。

## 📝 表記について

- GitHub の画面に出る名前は、教材内でも **Issue / Branch / Commit / Pull Request / Review / Merge** のように英語表記を基本にします。
- 説明文では、必要に応じて日本語で意味を補足します。
- 既定ブランチは `main` と表記します。画面上で `master` と表示される場合は、`main` を `master` に読み替えてください。

---

## 🚀 クイックスタート

### 0. ローカルでハンズオンサイトを見る

ローカルプレビューは、講師や教材編集者がスライド風の表示を確認するための手順です。
受講者がハンズオンの修正後アプリを自分のPCで確認するときにも同じ手順を使います。

PowerShell:

```powershell
.\scripts\serve-local.ps1
```

ブラウザで http://127.0.0.1:8000/handson/ を開きます。
Falling Blocks アプリは http://127.0.0.1:8000/app/falling-blocks/ で確認できます。

Python を直接使う場合:

```powershell
python -m http.server 8000 --bind 127.0.0.1 --directory .
```

詳細は [ローカルプレビュー手順](docs/local-preview.md) を参照してください。

### 1. まず座学の全体像を確認する

- [GitHub アカウントを作成する](docs/create-github-account.md)
- [ワークショップ全体設計](docs/workshop-plan.md)
- [GitHub と Git の基本](docs/github-overview.md)
- [GitHub の基本機能](docs/basic-features.md)
- [GitHub Flow](docs/github-flow.md)
- [基本編で扱う範囲と実施パターン](docs/basic-scope.md)
- [ローカルプレビュー手順](docs/local-preview.md)

読み方の目安:

| 立場 | まず読むもの |
| --- | --- |
| 受講者 | [ハンズオン手順](handson/README.md) → [基本編: VSCode で修正し、GitHub Flow を一周する](handson/01-github-flow-web.md) |
| 講師 | [ワークショップ全体設計](docs/workshop-plan.md) → [講師進行ガイド](facilitator/facilitator-guide.md) |
| 教材編集者 | [ローカルプレビュー手順](docs/local-preview.md) → `handson/index.html` |

### 2. ハンズオンを進める

受講者は [`handson/README.md`](handson/README.md) から開始します。

基本編では、Falling Blocks アプリの底判定バグを題材に以下を体験します。

1. バグを Issue として記録する（GitHub）
2. リポジトリを clone して VSCode で開く（自分のPC）
3. `fix-falling-blocks-floor-<github-id>` Branch を作り、`app/falling-blocks/game.js` を修正する（VSCode）
4. Commit / Push で変更を GitHub に送る（自分のPC）
5. Pull Request を作成する（GitHub）
6. Review を受ける（GitHub）
7. Merge する（GitHub）

### 3. 余裕があれば CLI 編に進む

Git のコマンド操作に触れたい場合は、発展編として
[`handson/02-github-flow-cli-optional.md`](handson/02-github-flow-cli-optional.md) を使います。

### 4. さらに深掘りする（ローカル開発オンボーディング編）

基本編でも VSCode を使ったローカル開発の流れは体験します。発展トラックでは、実務でつまずきやすい
**コンフリクト解消**や**やり直し（undo）**まで含めて、自分の PC で開発を続けられる状態を目指します。

- [ローカル開発オンボーディング編（トップ）](onboarding/README.md)
- [00. 環境構築（必要ツール・認証）](onboarding/00-setup.md) … 基本編の事前準備としても使います
- [01. ローカル開発サイクル](onboarding/01-local-flow.md)
- [02. コンフリクト解決](onboarding/02-conflicts.md)
- [03. やり直し・復旧](onboarding/03-undo-recovery.md)

> 🔑 環境構築（00）は基本編の事前準備でもあります。01〜03 は基本編のあとの発展として読むのがおすすめです。

---

## 🧭 ワークショップ進行（初心者向け・約2時間）

| モジュール | テーマ | 体験すること |
| --- | --- | --- |
| **M0** はじめに | GitHub を使う理由 | 変更履歴・共同作業・レビューの価値を理解する |
| **M1** Git / GitHub の基本 | 用語と基本機能 | Repository / Issue / Branch / Commit / Pull Request / Review / Merge を画面と対応づける |
| **M2** GitHub Flow | ブランチ運用の型 | main から分岐し、PR で戻す流れを理解する |
| **M3** ハンズオン | VSCode で開発体験 | Issue から Merge までを1周する（修正は VSCode、PR/レビューは GitHub） |
| **M4** まとめ | 次の一歩 | 今日の流れを言語化し、CLI、Actions、ブランチ保護などの発展につなげる |

---

## ✅ 必要な環境

### 基本編

基本編では、コードの修正を自分の PC の **VSCode** で行います。次のツールを使います。
**導入手順は [onboarding/00-setup.md](onboarding/00-setup.md) でガイド**するので、未インストールでも大丈夫です（事前準備 約30〜45分）。

- GitHub アカウント
- ブラウザ（Issue / Pull Request / Review / Merge 用）
- Git（履歴を記録するツール本体）
- コードエディタ（VS Code 推奨）
- ターミナル（OS 標準でOK）
- GitHub CLI `gh`（推奨・認証と clone / push がかんたんになる）

GitHub Actions や GitHub Pages は基本編では使いません。発展として扱います。

### 発展編（ローカル開発オンボーディング編）

コンフリクト解消・やり直し（undo）など、実務に向けた内容を扱います。使うツールは基本編と同じです。

---

## 📚 ドキュメント

- [GitHub アカウントを作成する](docs/create-github-account.md)
- [ワークショップ全体設計](docs/workshop-plan.md)
- [GitHub と Git の基本](docs/github-overview.md)
- [GitHub の基本機能](docs/basic-features.md)
- [GitHub Flow](docs/github-flow.md)
- [基本編で扱う範囲と実施パターン](docs/basic-scope.md)
- [ローカルプレビュー手順](docs/local-preview.md)
- [講師進行ガイド](facilitator/facilitator-guide.md)
- [ハンズオン手順](handson/README.md)
- [ローカル開発オンボーディング編](onboarding/README.md)（発展: 環境構築・同期・コンフリクト・復旧）

---

## ⚖️ 免責・補足

- 本教材は学習・説明を目的としたサンプルです。
- GitHub の画面や提供機能は変更されることがあります。実施時点の UI に合わせて読み替えてください。
- GitHub / GitHub Actions / GitHub Pages などの名称は GitHub, Inc. の商標または登録商標です。
