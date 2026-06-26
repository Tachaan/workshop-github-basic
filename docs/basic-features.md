# GitHub の基本機能

> ℹ️ 本書は GitHub Flow のハンズオンで使う機能に絞って説明します。

## 1. Repository

Repository は、ファイル・履歴・Issue・Pull Request をまとめて管理する単位です。

ワークショップでは、1つのリポジトリを参加者全員の作業場所として使います。

## 2. main

main は、チームにとっての基準となるブランチです。
この教材では、main を「レビュー済みの変更が集まる場所」として扱います。

## 3. Issue

Issue は、やること・相談・不具合・アイデアを記録する場所です。

ワークショップでの使い方:

- 「Falling Blocks の底判定バグを直す」という作業を Issue にする
- 作業の目的を文章で残す
- Pull Request と関連づける

例:

```text
Title: Fix Falling Blocks floor detection

Goal / 目的:
Fix the bug where the block keeps falling below the board.
```

## 4. Branch

Branch は、main から分かれて作業する場所です。

命名例:

```text
fix-falling-blocks-floor-octocat
fix-readme-typo
update-workshop-notes
```

> 🔑 **ポイント**: ブランチ名は「何をするブランチか」がわかる短い名前にする。

## 5. Commit

Commit は、変更を保存して履歴に残す操作です。

Commit message は短く具体的に書きます。

```text
Fix Falling Blocks floor detection
```

## 6. Pull Request

Pull Request（PR）は、ブランチで作った変更を main に入れてよいか確認する場所です。

Pull Request に書くこと:

- 何を変更したか
- なぜ変更したか
- 見てほしい点
- 関連する Issue

Pull Request 画面で見る場所:

| 場所 | 見ること |
| --- | --- |
| Conversation | 変更の説明、コメント、レビュー結果 |
| Files changed | 変更前後の差分(diff) |
| Checks | 自動チェックの結果（基本編では必須にしない） |

## 7. Review

Review は、Pull Request の変更を確認してコメントする作業です。

初心者向けレビュー観点:

- 変更内容が Issue と合っているか
- ファイル名や配置が正しいか
- 説明が読みやすいか
- 不要な変更が混ざっていないか

Review の種類:

| 種類 | 使いどころ |
| --- | --- |
| Comment | 質問や確認だけを残す |
| Approve | 変更内容に問題ないことを伝える |
| Request changes | 修正してから取り込みたいことを伝える |

## 8. Merge

Merge は、Pull Request の変更を main に取り込む操作です。

Merge 後に確認すること:

- Pull Request が Closed / Merged になっている
- main に変更が入っている
- 関連 Issue が Closed になっている、または閉じてよい状態になっている
- 作業ブランチを削除できる

作業ブランチは一時的な作業場所です。Merge 後は main に変更が入っているため、不要になった作業ブランチは削除できます。

## 9. Markdown

GitHub では、Issue、Pull Request、README などで Markdown を使います。
入力後に **Preview** を見ると、見出しや箇条書きが意図どおり表示されるか確認できます。

よく使う書き方:

```markdown
# 見出し

- 箇条書き
- 箇条書き

**強調**

`code`
```

## 10. GitHub Actions（発展）

GitHub Actions は、テストやビルドなどを自動実行する機能です。

本ワークショップの基本編では必須にしません。
Pull Request の流れを理解した後に、チェックを自動化する発展要素として紹介します。
