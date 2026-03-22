# wolf-drip インフラ構成プラン

## 概要

wolf-dripに今後追加予定の物販機能（Shopify連携）とお知らせ管理機能のインフラ構成プラン。

**構成:** Vercel + Shopify Storefront API + microCMS

---

## 1. ホスティング: Vercel

- Next.js 16 のISR（Incremental Static Regeneration）がネイティブ対応
- 東京リージョンのEdge CDNで高速配信
- Hobby（無料）またはPro（$20/月）で十分
- GitHubリポジトリ連携で自動デプロイ・プレビューデプロイ

**VPSを選ばない理由:**
- 既存VPS（boisdepin/bullema）はPHP-FPM + Nginx。Node.jsランタイムの追加は環境の混在を招く
- ISRのキャッシュ管理をDockerで自前運用するのは複雑

---

## 2. 物販: Shopify Storefront API（GraphQL）

Shopify Buy SDKではなくStorefront APIを直接fetchする。

**理由:**
- Server Componentsから直接呼べてクライアントバンドルに影響なし
- 小規模カタログにはGraphQLクエリで十分
- チェックアウトはShopifyホスト型に飛ばす（PCI不要）

**アーキテクチャ:**
```
src/
  lib/shopify.ts                -- GraphQL fetchラッパー
  app/shop/page.tsx             -- 商品一覧（ISR）
  app/shop/[handle]/page.tsx    -- 商品詳細（ISR）
  components/ProductCard.tsx
  components/CartDrawer.tsx     -- "use client"、カート状態管理
  components/AddToCartButton.tsx
```

**カート戦略:**
- Shopify Cart APIでカート作成 → Shopifyチェックアウトページにリダイレクト
- カート状態はReact Contextでクライアント管理

**ISR:**
- `generateStaticParams` で商品ページをビルド時に事前生成
- `revalidate = 3600`（1時間）をフォールバック設定
- Shopify Webhookで `revalidateTag('products')` を呼び出し即時更新

---

## 3. お知らせ管理: microCMS

**選定理由:**
- 日本語ネイティブの管理画面 → カフェスタッフが直接投稿可能
- 無料枠（3 API、10GB転送）で十分
- Next.js対応SDK（`microcms-js-sdk`）あり
- Webhook連携でISR再検証が簡単

**代替案を選ばない理由:**

| 選択肢 | 不採用理由 |
|--------|-----------|
| Shopifyブログ | カスタムフィールドが限定的、コマース以外のコンテンツに不向き |
| Contentful | 管理画面が英語、無料枠がmicroCMSより制限的 |
| Strapi自前運用 | VPSに追加Node.jsアプリが必要、運用負荷大 |
| Markdownファイル | スタッフが投稿できない |

**microCMSスキーマ（`news` API）:**
- `title`（テキスト）
- `date`（日付）
- `category`（セレクト: イベント, 新メニュー, お知らせ等）
- `content`（リッチエディタ）

**アーキテクチャ:**
```
src/
  lib/microcms.ts                -- microCMSクライアント
  app/news/page.tsx              -- ニュース一覧
  app/news/[id]/page.tsx         -- ニュース詳細
  app/api/revalidate/route.ts    -- Webhook受信（Shopify・microCMS共用）
```

---

## 4. データフロー

```
                         Vercel (CDN + Edge)
                         Next.js 16 (App Router)
                                |
              +-----------------+-----------------+
              |                 |                 |
       Server Components  Server Components  Client Components
       (商品ページ)        (ニュースページ)    (カート, GSAP)
              |                 |                 |
              v                 v                 v
       Shopify Storefront  microCMS API     Shopify Cart API
       API (GraphQL)                        → チェックアウト

       Webhooks ──→ /api/revalidate ──→ revalidateTag()
```

---

## 5. 環境変数

```
SHOPIFY_STORE_DOMAIN=xxx.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxxxx
MICROCMS_SERVICE_DOMAIN=xxx
MICROCMS_API_KEY=xxxxx
REVALIDATION_SECRET=xxxxx
```

---

## 6. 追加パッケージ

```
microcms-js-sdk    -- microCMS公式SDK
```

Shopify SDKは不要（fetch + GraphQLで直接アクセス）。

---

## 7. 実装順序

### Phase 1: microCMSニュース（低リスク、即効性あり）
1. microCMSサービス作成・スキーマ定義
2. `src/lib/microcms.ts` 作成
3. 既存 `News.tsx` をリファクタ（ハードコードデータ → props受け取り）
4. `/news` 一覧・詳細ページ作成
5. revalidation webhook設定

### Phase 2: Shopify物販
1. Shopifyストア作成
2. `src/lib/shopify.ts` 作成（GraphQLクエリ）
3. `/shop` 一覧・詳細ページ作成
4. カート機能（CartDrawer, AddToCartButton）
5. Shopify webhook設定

### Phase 3: 仕上げ
- GSAPアニメーション統一
- SEOメタデータ・OGP画像
- アナリティクス導入
