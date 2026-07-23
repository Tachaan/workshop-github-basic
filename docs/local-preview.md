# ローカルプレビュー手順

> ℹ️ 本ワークショップはビルドツールを使わず、静的HTMLとしてローカル表示できます。
> ローカルプレビューは講師や教材編集者向けの確認手段です。ルートのサイトは既存の Markdown を読み込んで表示します。
> 受講者も、スライド形式のハンズオンや修正したアプリを同じサーバーから確認できます。

## 1. PowerShell スクリプトで起動する

リポジトリのルートで実行します。

```powershell
.\scripts\serve-local.ps1
```

PowerShell の実行ポリシーで止まる場合は、そのターミナルだけ一時的に許可してから再実行します。

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\scripts\serve-local.ps1
```

起動後、ブラウザで以下を開きます。

```text
http://127.0.0.1:8000/
```

ポートを変えたい場合:

```powershell
.\scripts\serve-local.ps1 -Port 8080
```

## 2. Python を直接使う

PowerShell:

```powershell
python -m http.server 8000 --bind 127.0.0.1 --directory .
```

Windows で `python` が見つからない場合:

```powershell
py -3 -m http.server 8000 --bind 127.0.0.1 --directory .
```

macOS / Linux:

```bash
python3 -m http.server 8000 --bind 127.0.0.1 --directory .
```

## 3. 表示するページ

| URL | 内容 |
| --- | --- |
| http://127.0.0.1:8000/ | Markdown 教材を表示するワークショップサイト |
| http://127.0.0.1:8000/handson/ | 既存のスライド形式ハンズオン |
| http://127.0.0.1:8000/app/falling-blocks/ | Falling Blocks アプリ |
| http://127.0.0.1:8000/README.md | リポジトリ概要 |
| http://127.0.0.1:8000/docs/workshop-plan.md | ワークショップ全体設計 |

Markdown ファイルの URL を直接開くと、ブラウザでは素のテキスト表示になる場合があります。
ルートのワークショップサイトでは、ナビゲーションから各 Markdown ページを整形表示できます。

## 4. 止め方

サーバーを起動しているターミナルで `Ctrl+C` を押します。

## 5. よくあるトラブル

| 事象 | 対応 |
| --- | --- |
| `python` が見つからない | Python をインストールするか、Windows では `py -3 -m http.server ...` を使う |
| ポートが使用中 | `.\scripts\serve-local.ps1 -Port 8080` のように別ポートを指定する |
| ページが古い | ブラウザを再読み込みする |
| スクリプト実行が許可されない | `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` を実行してから再試行する |
