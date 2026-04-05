---
paths:
  - "src/lib/microcms.ts"
  - "src/app/**/page.tsx"
  - "src/features/news/**"
---

# microCMS連携ルール

## エンドポイント一覧

| エンドポイント | 形式 | 用途 |
|---|---|---|
| `news` | リスト | お知らせ（リッチエディタ） |
| `menu` | リスト | メニュー（typeで「コーヒー」「ティー」を区別） |

## 型定義

- APIレスポンスの型は `src/lib/microcms.ts` に集約する
- `MicroCMSListContent` を必ずintersectionで使う（id, createdAt等の共通フィールド）
- microCMS側でフィールドを追加・変更したら��必ずこの型定義も更新する

## データ取得

- データ取得関数は `src/lib/microcms.ts` にまとめる
- Server Componentのpage.tsxからのみ呼び出す
- Client Componentから直接APIを呼ばない
- 複数APIの呼び出しは `Promise.all` で並列化する

## フィールド型の注意

- microCMSのセレクトフィールド（複数選択可）は配列 `string[]` で返る
- 日付フィールドはISO 8601形式（`2026-03-31T15:00:00.000Z`）で返る
  - 表示時に `toLocaleDateString("ja-JP")` でフォーマットする
- リッチエディタはHTML文字列���返る
  - 表示は `dangerouslySetInnerHTML` を使用
  - メタデータ用のプレーンテキスト変換: `.replace(/<[^>]*>/g, "")`
- 画像フィールドは `{ url, width, height }` オブジェクトで返る
  - next/imageのImageコンポーネントで表示する
- オプショナルなフィールドは `??` でフォールバックする

## リッチエディタのスタイリング

- `.news-content` クラスでスコープしたCSSを `globals.css` に定義済み
- 新しいリッチエディタフィールドを追加する場合も同様のスコープCSSを用意する

## Webhook / 再検証

- 現状未実装
- 将来的に `/api/revalidate` エンドポイン���を作り、microCMSのWebhook��ISRを再検証する
