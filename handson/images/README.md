# ハンズオン用スクリーンショット一覧

このフォルダは、ハンズオン手順書（`handson/01-github-flow-web.md`）と
スライド（`handson/index.html` の M3）に貼る画像を置く場所です。

手順書の本文には、画像を貼ると分かりやすい場所に次のメモを入れてあります。

````text
> 📷 **スクショ**: `handson/images/01-issues-tab.png`
> 撮る内容: ...
```

## 使い方

1. 下の一覧の「ファイル名」のとおりに PNG をこのフォルダに保存する。
2. 手順書側では、対応する `> 📷 **スクショ**: ...` の2行を、次の画像記法に置き換える。

   ```markdown
   ![Issuesタブ](images/01-issues-tab.png)
   ```

3. スライド（`handson/index.html`）側では、対応するプレースホルダ
   `<div class="shot" data-shot="01-issues-tab">` の中身を `<img>` に差し替える。

   ```html
   <img src="images/01-issues-tab.png" alt="Issuesタブ" />
   ```

## 撮影のコツ

- 押す場所・見る場所を **赤枠**（四角）で囲むと、初心者に伝わりやすいです。
- 個人情報（メールアドレス、他人のID、無関係な通知）は写さない・ぼかす。
- 横幅はおおよそ 1200px 前後を目安にすると、手順書・スライドの両方で見やすいです。
- ブラウザの拡大率は 100% にして撮ると、文字が崩れません。

## 必要な画像（16枚）

| # | ファイル名 | 手順 | 撮る内容 / 赤枠で強調する場所 |
| --- | --- | --- | --- |
| 1 | `01-issues-tab.png` | 1-1 | リポジトリ上部の横並びメニュー。**Issues** タブ |
| 2 | `02-new-issue-button.png` | 1-2 | Issue 一覧の右上。緑の **New issue** ボタン |
| 3 | `03-issue-form-filled.png` | 1-4 | Title と本文を入力し終えた Issue 作成画面（右下の **Submit new issue** も入れる） |
| 4 | `04-issue-created-number.png` | 1-6 | 作成後の Issue 詳細。タイトル横の **#番号** と緑の **Open** バッジ |
| 5 | `05-code-clone-url.png` | 2-1 | 緑の **Code** ボタンを押し、HTTPS の URL と **コピーアイコン** が見える状態 |
| 6 | `06-vscode-open.png` | 2-3 | VSCode で clone したリポジトリを開き、左のエクスプローラーに `app/falling-blocks/` が見える状態 |
| 7 | `07-vscode-edit.png` | 4-3 | VSCode の編集画面で `FLOOR_ROW` の行を `ROWS - 1` に直したところ |
| 8 | `08-terminal-commit-push.png` | 5-3 | ターミナルで `git add` → `git commit` → `git push` を実行し、push 成功メッセージが見える状態 |
| 9 | `09-compare-pr-banner.png` | 6-1 | Push 直後の黄色い帯。緑の **Compare & pull request** ボタン |
| 10 | `10-base-compare.png` | 6-2 | PR 作成画面上部のドロップダウン。`base: main ← compare: 自分のBranch` |
| 11 | `11-files-changed-diff.png` | 6-5 | **Files changed** の差分。赤い `-` 行と緑の `+` 行 |
| 12 | `12-inline-comment.png` | 7-3 | Files changed で行の **＋** を押し、コメント入力欄が開いた状態 |
| 13 | `13-review-changes.png` | 7-4 | **Review changes** → Comment / Approve と緑の **Submit review** |
| 14 | `14-merge-pr.png` | 9-1 | Conversation 最下部の緑 **Merge pull request** → **Confirm merge** |
| 15 | `15-delete-branch.png` | 9-3 | Merge 後の **Delete branch** ボタン（上部が紫の **Merged**） |
| 16 | `16-app-fixed.png` | 10 | 修正後の Falling Blocks。ブロックが盤面の底で止まっている画面 |

> スライド（M3）には、このうち主要な 6 枚（Issue / Clone / VSCode編集 / Commit·Push / Review / Merge =
> `03` / `05` / `07` / `08` / `13` / `14`）のプレースホルダを用意しています。残りは手順書側で活用してください。
````