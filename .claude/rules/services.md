---
paths:
  - "src/lib/**"
  - "src/app/api/**"
  - ".env*"
  - "next.config.ts"
---

# 外部サービス管理

## 現在稼働中

### Vercel（ホスティング）
- mainプッシュで自動���プロイ（GitHub Actions → Deploy Hook）
- 環境変数はVercelダッシュボードで管理
- Preview Deploymentsは現在未使用
- **管理��限**: 開発者

### microCMS（コンテンツ管理）
- サー���スID: `pecx3vdrv4`
- エンドポイント: `news`（お知らせ）, `menu`（メニュー）
- コンテンツ更新は非エンジニアが担当
- **管理権限**: 開発者 + コンテンツ担当

### GitHub（リポジトリ）
- リポジトリ: `Horita-Kaito/wolf-drip`
- Secrets: `VERCEL_DEPLOY_HOOK`
- **管理権限**: 開発者

## 将来追加予定

### Shopify（EC）
- 2026年5月頃に開発開始
- Storefront API (GraphQL) で商品データ取得
- チェックアウトはShopifyホスト型
- 現在のmicroCMS menuエンドポイントからの移行を伴う
- 追加環境変数: `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_ACCESS_TOKEN`

### Laravel（バックエンド）
- VPSに構築予定
- 用途: お問い合わせ管理、Shopify連携、顧客管理
- 追加環境変数: `LARAVEL_API_URL` 等
- CORS設定が必要（Laravelの config/cors.php でフロントのドメイン��許可）

## 外部サービス追加時のルール

1. `src/lib/` にクライアントファイルを作成（型定義 + 取得関数）
2. 環境変数を `.env.local` に追加し動作確認
3. 各 `.env.*.example` にキー名を追加
4. Vercelの環境変数に本��値を設定
5. `CLAUDE.md` の外部サービス連携セクションを更新
6. このファ���ル（services.md）にサービス情報を追記
7. next.config.ts に画像ドメイン等の設定が必要なら追加
