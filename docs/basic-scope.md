# 基本編で扱う範囲と実施パターン

> ℹ️ このページは、本ワークショップの基本編で使う機能と実施パターンを整理します。
> GitHub アカウントとブラウザに加え、自分のPCの **Git / VSCode** で進められる範囲に絞り、実際の開発に近い最初の体験にします。

## 1. 基本編で使う機能

| 機能 | 用途 | 基本編での扱い |
| --- | --- | --- |
| Repository | 教材ファイルを置く | 必須 |
| Template Repository | 参加者ごとに同じ初期状態の練習Repoを作る | 必須 |
| Issue | 作業内容を記録する | 必須 |
| Branch | main から分けて作業する | 必須 |
| Commit | 変更を履歴として保存する | 必須 |
| Pull Request | 変更をレビューして取り込む | 必須 |
| Review | コメント・承認を行う | 必須 |
| Merge | レビュー済みの変更を main に取り込む | 必須 |
| ローカル開発（clone / VSCode編集 / commit / push） | 自分のPCで修正して GitHub に送る | 必須 |
| Markdown | 説明文を書く | 必須 |
| Label / Assignee / @メンション | Issueを分類し、担当と通知先を示す | 必須 |
| Collaborator | ペアでReviewできる権限を用意する | 必須 |
| Codespaces | ローカル構築が難しい場合の代替環境 | 選択 |
| log / blame / 検索 | Merge後の変更理由と由来をたどる | 必須 |

## 2. 基本編では必須にしない機能

| 機能 | 理由 |
| --- | --- |
| GitHub Actions | テストやビルドの自動化は便利だが、GitHub Flow の理解には必須ではない |
| GitHub Pages | 公開サイト化は便利だが、GitHub Flow の理解には必須ではない |
| Branch protection / Ruleset | チーム運用では重要だが、最初の体験では手順を増やしすぎない |
| GitHub CLI の高度な操作 | clone / commit / push は基本編で使う。PR自動化などの高度な操作は発展編で扱う |
| コンフリクト解消・やり直し（undo） | 起きたら対処するが、体系的な練習は発展（オンボーディング編）で扱う |
| GitHub Advanced Security | 高度なセキュリティ機能は、基本の Pull Request 運用を理解した後に扱う |

## 3. 推奨する実施パターン

### 基本: Templateから参加者ごとに練習Repoを作る

全参加者が [`Tachaan/github-basic-practice`](https://github.com/Tachaan/github-basic-practice) の **Use this template** から、自分のアカウントに次のRepoを作ります。

```text
github-basic-practice-<github-id>
```

推奨設定:

| 項目 | 設定 |
| --- | --- |
| Owner | 参加者本人 |
| Visibility | Public |
| Default branch | main（Templateから継承） |
| Review相手 | ペアをCollaboratorへ招待 |

メリット:

- Repository作成から履歴確認まで、1つの自分のRepoで完結する
- 全員が同じバグ・Issue Template・PR Templateから始められる
- 講師Repoへの書き込み権限やfork / upstreamの説明が不要
- 参加者がRepo所有者なので、SettingsやMerge、終了後のArchiveも体験できる

注意:

- 参加者ごとにPRが別Repoへ分かれるため、ペアでPR URLを交換する
- Collaborator招待の承認に時間がかかる場合がある
- Publicにできない研修ではPrivate Repoを作り、Collaborator承認を開始前に済ませる

### 代替: 講師の共有Repoで実施する

時間が非常に短い場合や、参加者がRepoを作成できない環境では、講師の共有Repoへ全員を招待する方式も使えます。ただし、権限管理・同名Branch・参加者同士の変更衝突が増えるため、本当の初心者向けの第一候補にはしません。

### 今回扱わない: fork方式

fork / upstreamはOSS参加で重要ですが、最初の体験では概念とリモート構成が増えます。本教材では発展扱いとし、Templateから作る独立Repoと混同させません。

## 4. この教材での推奨

**参加者ごとのPublic Template Repo + ペアCollaborator**を標準にします。招待が間に合わない場合も、Public RepoのPR URLを共有してReviewコメントを行い、MergeはRepo所有者が担当します。

## 5. 高度な機能を使わずに伝えること

高度な統制機能を使わなくても、次の基本は十分に体験できます。

- main に直接入れず、ブランチで作業する
- Pull Request で差分を見える化する
- Review で会話してから Merge する
- Issue と PR をつなげて作業の目的を残す

> 🎯 **基本編のゴール**: 便利機能をたくさん使うことではなく、チーム開発の基本動作を体で覚えること。
