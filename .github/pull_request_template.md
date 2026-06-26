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
