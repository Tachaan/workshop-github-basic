---
name: Workshop task
about: GitHub Basic ワークショップ用の作業Issue
title: "Fix Falling Blocks floor detection"
labels: ""
assignees: ""
---

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

## Related PR / 関連Pull Request

Pull Request を作成したら、ここに番号（例: `#13`）を書く。

## Done when / 完了条件

- [ ] FLOOR_ROW が盤面のいちばん下の行を指している
- [ ] Pull Request を作成した
- [ ] Pull Request のレビューを受けた
- [ ] Pull Request を Merge した
- [ ] 関連する Issue が閉じた
- [ ] 作業 Branch を削除した（または削除してよい状態）
