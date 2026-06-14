---
name: deploy
description: ビルド確認してmainにプッシュする
disable-model-invocation: true
allowed-tools: Bash(npm *), Bash(git *)
---

本番デプロイの手順を実行してください:

1. `npm run build` でビルドエラーがないか確認
2. ビルドが失敗したらエラーを報告して停止
3. ビルドが成功したら `git status` で未コミットの変更がないか確認
4. 未コミットの変更があればユーザーに報告して停止
5. 全て問題なければ `git push origin main` を実行
6. プッシュ結果を報告

$ARGUMENTS が指定されていれば、それをコミットメッセージとしてコミットしてからプッシュする。
