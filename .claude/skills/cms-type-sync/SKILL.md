---
name: cms-type-sync
description: microCMSのスキーマ変更に合わせて型定義とコンポーネントを更新する
disable-model-invocation: true
allowed-tools: Read, Edit, Write, Glob, Grep, Bash(npm run build *)
---

microCMSのスキーマ変更に対応してコードを更新してください。

引数: `$ARGUMENTS` — 変更内容の説明（例: `newsにthumbnail画像フィールドを追加`, `menuからflavorフィールドを削除`）

## 手順

1. `src/lib/microcms.ts` の型定義を変更内容に合わせて更新
2. 影響を受けるコンポーネントをGrepで特定
3. page.tsxのデータマッピングを更新
4. コンポーネントのProps型と表示を更新
5. 画像フィールドの追加の場合:
   - next/image の Image コンポーネントを使用
   - next.config.ts のremotePatternsにドメインが含まれているか確認
6. `npm run build` でビルドエラーがないか確認
7. 変更内容のサマリーを報告
