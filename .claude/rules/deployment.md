---
paths:
  - ".github/**"
  - "next.config.ts"
  - ".env*"
---

# デプロイ・運用ルール

## デプロイフロー

```
ローカル開発 → npm run build で確認 → mainにプッシュ → Vercel自動デプロイ
```

## デプロイ前チェック（必須）

1. `npm run build` でビルドエラーがないことを確認
2. TypeScriptの型エラーがないことを確認（ビルドに含まれる）
3. console.logのデバッグ出力が残っていないか確認
4. 環境変数の追加があればVercel側にも設定する
5. microCMSのスキーマ変更を伴う場合、型定義の更新が先

## 環境管理

| 環境 | ホスティング | ブランチ | 備考 |
|---|---|---|---|
| ローカル | localhost:3000 | 任意 | `.env.local` |
| ステージング | 未定 | 未定 | `.env.staging.example` 参照 |
| 本番 | Vercel | main | Vercel環境変数で管理 |

- ステージング・本番のホスティングは今後変更の可能性あり（VPSなど）
- Laravel導入後はフロントとバックエンドの環境をセットで管理する

## 環境変数の追加手順

1. `.env.local` に追加してローカルで動作確認
2. 各 `.env.*.example` ファイルにキー名を追加（値は空）
3. 本番ホスティングの環境変数に値を設定
4. `CLAUDE.md` の環境変数セクションを更新
5. `.claude/rules/services.md` に関連サービス情報を追記
6. `NEXT_PUBLIC_` は原則使わない

## CI/CD

- GitHub Actions → Vercel Deploy Hook で自動デプロイ
- 現状はビルド検証やテストのCIは未設定
- 将来的にPR時のビルド検証を追加する

## 障害・ロールバック

- Vercelのダッシュボードから過去のデプロイに即時ロールバック可能
- microCMSのコンテンツ変更が原因の場合、microCMS側で該当コンテンツを修正後に再デプロイ
- 緊急時は `git revert` でコミットを取り消してプッシュ
