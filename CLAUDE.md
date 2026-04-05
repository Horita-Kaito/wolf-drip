# WOLF DRIP プロジェクト

## ビジネス概要

WOLF DRIPはスペシャルティコーヒー＆ハーブティーのブランド。現在は**準備段階**。

### 事業内容
- **店舗運営**（将来）
- **EC販売**（Shopify移行予定、2026年5月頃開発開始）
- **BtoB卸販売**（現段階で対応中、直接取引のみ）
- **BtoC**（店舗販売を軸とした店員ファンビジネス）

### ターゲット
- **BtoB**: ハイブランドなどハイクラス顧客を持つ企業
- **BtoC**: 店舗体験を軸としたファンコミュニティ

### サイトの目的
ブランディング → 集客 → 将来的にEC販売導線

---

## 技術スタック

| カテゴリ | 技術 |
|---|---|
| フレームワーク | Next.js 16 (App Router, Turbopack) |
| 言語 | TypeScript (strict mode) |
| UI | React 19, Tailwind CSS 4 |
| アニメーション | GSAP + ScrollTrigger, Lenis (smooth scroll) |
| CMS | microCMS (news, menu エンドポイント) |
| ホスティング | Vercel (mainプッシュで自動デプロイ) |
| CI/CD | GitHub Actions → Vercel Deploy Hook |

---

## 外部サービス連携

### microCMS (稼働中)
- **サービスID**: `pecx3vdrv4`
- **エンドポイント**:
  - `news` — お知らせ（リスト形式、リッチエディタ）
  - `menu` — メニュー（リスト形式、typeフィールドで「コーヒー」「ティー」を区別）
- **コンテンツ更新者**: 非エンジニアのチームメンバー
- APIキーはサーバーサイドのみで使用（`NEXT_PUBLIC_` なし、閲覧者には非公開）

### Shopify (未着手、2026年5月頃開始予定)
- Storefront API (GraphQL) ���商品データ取得
- チェックアウトはShopifyホスト型
- 現在のメニューデータはmicroCMSから取得中、Shopify移行後はデータソースを差し替え
- コンポーネントはprops経由なので、page.tsxのfetch部分のみ変更で移行可能

### Laravel バックエンド (未着手、将来)
- お問い合わせ管理
- Shopifyとの複雑な連携
- 顧客管理
- VPS上に構築予定

### Instagram
- アカウント: [@wolfdrip2026](https://www.instagram.com/wolfdrip2026)
- フッターにリンクあり

---

## アーキテクチャ

```
ブラウザ
  └── Vercel (CDN + Edge)
        └── Next.js (App Router)
              ├── Server Components → microCMS API (news, menu)
              ├── Server Components → Shopify Storefront API (将来)
              └── Client Components (GSAP animations, Lenis)

将来:
  └── Laravel (VPS)
        ├── お問い合わせ管理
        ├── Shopify連携
        └── 顧客管理
```

### データフロー
- microCMS/Shopifyからのデータ取得は全てServer Componentsで実行
- 各セクションコンポーネントはpropsでデータを���け取る（データソースに依存しない）
- アニメーション系は "use client" コンポーネント

---

## ディレクトリ構成

```
src/
  app/
    layout.tsx        — ルートレイアウト（フォント、メタデータ、JSON-LD）
    page.tsx          — トップページ（データ取�� → 各セクションに配布）
    globals.css       — カラー変数、リッチエディタスタイル
    robots.ts         — robots.txt自動生成
    sitemap.ts        — sitemap.xml自動生成（ドメイン決定後にURL差し替え）
    news/[id]/page.tsx — お知らせ詳細（generateMetadata対応）
  components/
    Hero.tsx          — ヒーロー（DRIPしずく落下アニメーション）
    Concept.tsx       — コンセプト3項目（英語のみ）
    Coffee.tsx        — コーヒーメニュー（横スクロール）
    HerbTea.tsx       — ハーブティーメニュー（2カラムグリッド）
    Location.tsx      — 所在地 + Google Maps iframe
    News.tsx          — お知らせ一覧（microCMS連携）
    Contact.tsx       — お問い合わせフォーム（送信機能未実装）
    Footer.tsx        — フッター（Instagramアイコン）
    SmoothScroll.tsx  — Lenisラッパー（ページ遷移時スクロールリセット）
  lib/
    microcms.ts       — microCMSクライアント + 型定義 + 取得関数
```

---

## 環境変数

| 変数名 | 用途 | 公開範囲 |
|---|---|---|
| `MICROCMS_SERVICE_DOMAIN` | microCMSサービスドメイン | サーバーのみ |
| `MICROCMS_API_KEY` | microCMS APIキー | サーバーの��� |

環境別テンプレート: `.env.local.example`, `.env.staging.example`, `.env.production.example`

Vercel側にも同じ環境変数の設定が必要。

---

## SEO対応状況

- [x] OGP / Twitter Card メタデータ
- [x] title template（子ページ対応）
- [x] お知らせ詳細の動的metadata (generateMetadata)
- [x] robots.txt / sitemap.xml 自動生成
- [x] 構造化データ（LocalBusiness JSON-LD）
- [x] next/image でmicroCMS画像最適化
- [ ] favicon / OG画像（ロゴ未決定のため保留）
- [ ] ドメイン設定後のURL確定（sitemap, canonical, OGP）
- [ ] Google Search Console 登録

---

## 未実装・TODO

- **お問い合わせフォ���ム送信**: UIのみ実装済み。Laravel構築後に接続、またはformspree等で仮実装
- **Shopify連携**: 2026年5月頃開始。docs/infrastructure-plan.md に構成プランあり
- **Laravelバックエンド**: お問い合わせ管理、Shopify連携、顧客管理。VPSに構築予定
- **ステージング環境**: Vercel以外も検討中（Laravelと同一VPSでの運用など）
- **favicon / OG画像**: ロゴデザイン確定待ち
- **ドメイン**: 未決定

---

## 開発ルール

- `npm run dev` でローカル開発サーバー起動（Turbopack）
- mainブランチにプッシュすると自動でVercelにデプロイされる
- ビルド確認: `npm run build` でエラーがないことを確認してからプッシュ
- 環境変数に `NEXT_PUBLIC_` プレフィックスは使わない（APIキー漏洩防止）

---

## チーム・運用

- 開発: 主に一人（将来メンバー追加の可能性あり）
- コンテンツ更新（microCMS）: 非エンジニアのメンバーが担当
- ドメイン・ホスティング管理: 開発者の判断で決定可能
