# 発展編: CLI で同じ流れを体験する

> 所要: 30-40分。
> この章は任意です。Git コマンドに触れる準備ができている参加者向けです。

## 0. 前提

- Git がインストールされている
- GitHub に push できる認証設定が済んでいる
- 基本編の GitHub Flow を理解している

> 🧰 まだ Git のインストールや GitHub 認証が済んでいない場合は、先に
> [オンボーディング編 00. 環境構築](../onboarding/00-setup.md) でツールと認証をそろえてください。
> ローカル開発をもっと体系的に学びたい場合は
> [ローカル開発オンボーディング編](../onboarding/README.md)（環境構築・同期・コンフリクト・復旧）も参照できます。

## 1. Clone

```bash
git clone https://github.com/<owner>/<repo>.git
cd <repo>
```

既に clone 済みの場合は、最新の既定ブランチから始めます。

```bash
git switch main
git pull
```

画面上で既定ブランチが `master` のリポジトリでは、`main` を `master` に読み替えてください。

## 2. 名前とメールアドレスを確認する

```bash
git config user.name
git config user.email
```

未設定の場合:

```bash
git config --global user.name "<your-name>"
git config --global user.email "<your-email>"
```

## 3. Branch を作る

```bash
git switch -c fix-falling-blocks-floor-<github-id>
```

`git switch` が使えない古い Git では、次のコマンドを使います。

```bash
git checkout -b fix-falling-blocks-floor-<github-id>
```

現在の Branch を確認します。

```bash
git branch --show-current
```

## 4. バグを修正する

`app/falling-blocks/game.js` を開きます。

```javascript
const FLOOR_ROW = Number.POSITIVE_INFINITY;
```

を、次のように直します。

```javascript
const FLOOR_ROW = ROWS - 1;
```

## 5. 変更を確認する

```bash
git status
git diff
```

## 6. Commit する

```bash
git add app/falling-blocks/game.js
git commit -m "Fix Falling Blocks floor detection"
```

## 7. Push する

```bash
git push -u origin fix-falling-blocks-floor-<github-id>
```

認証で止まる場合は、ブラウザ認証や GitHub CLI の設定が必要な場合があります。
そのまま進めず講師に相談してください。

## 8. Pull Request を作る

GitHub の画面で **Compare & pull request** を選び、Pull Request を作成します。

## 9. Web UI 編との対応

| Web UI | CLI |
| --- | --- |
| Issue を作る | GitHub 画面で作成 |
| Branch を作る | `git switch -c` |
| ファイルを編集 | エディタで編集 |
| Commit changes | `git add` + `git commit` |
| Branch を publish | `git push` |
| Pull Request 作成 | GitHub 画面または `gh pr create` |
| Review / Merge | GitHub 画面で実施 |

## 10. よく使う確認コマンド

```bash
git status
git branch
git log --oneline --decorate -5
git diff
```

> 🔑 **ポイント**: CLI は GitHub Flow の考え方を変えるものではありません。操作方法が画面からコマンドに変わるだけです。
