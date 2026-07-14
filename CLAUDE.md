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
    sitemap.ts        — sitemap.xml自動生成（URLはlib/site.tsから取得）
    news/[id]/page.tsx — お知らせ詳細（generateMetadata対応）
  components/
    layout/
      Header.tsx      — 固定ヘッダー（中央ワードマーク、ヒーロー上は白抜き→スクロールでクリーム地、モバイルは全画面メニュー）
      Marquee.tsx     — 最上部の告知ティッカー（CSSの無限ループ、hoverで停止）
      Footer.tsx      — フッター（メニュー/連絡先/大型ワードマーク）
      SmoothScroll.tsx — Lenisラッパー（ページ遷移時スクロールリセット、lib/lenis.tsにインスタンス共有）
    sections/
      Hero.tsx        — ヒーロー（角丸ブロック + SVGロゴ + DRIP落下アニメーション + 宣言コピー + ピルCTA）
      Statement.tsx   — ブランドステートメント（メディア面 + コピー、左右交互。page.tsxから2回使用）
      MenuSection.tsx — メニュー（横スナップスライダー。コーヒー/ハーブティーで共用、toneで色分け）
      News.tsx        — お知らせカード列（microCMS連携）
      Contact.tsx     — お問い合わせ（Instagram DM誘導。フォームはバックエンド実装後に復活）
    ui/
      PillButton.tsx  — ピルボタン（hoverで下から面が満ちて反転。#アンカーはLenisで送る）
      Reveal.tsx      — スクロール表示モーション共通ラッパー（初期状態はglobals.cssの[data-reveal]）
      WolfDripLogo.tsx — WOLF DRIPロゴのSVGコンポーネント
      InstagramIcon.tsx — Instagramアイコン
  lib/
    microcms.ts       — microCMSクライアント + 型定義 + 取得関数
    site.ts           — 正規URL（siteUrl）とInstagram URLの単一ソース
    lenis.ts          — Lenisインスタンスの保持箱（ヘッダー/ボタンのアンカー遷移用）
```

### デザイン方針（2026-07 rhode参照リニューアル）
- [rhodeskin.com](https://www.rhodeskin.com/) のセクション設計とモーションを踏襲。カラーとフォントはWOLF DRIPのまま
- 大きな面を角丸で切り出す（`--radius-block` 12px / `--radius-card` 8px）、ピルボタン、左右交互のメディア+コピー、横スナップスライダー
- モーションは「スクロールで下から静かに現れる」に統一（`Reveal`）。GSAPのpinによるスクロールジャックは使わない
- ヘッダーの `backdrop-blur` は `position: fixed` の基準になるため、全画面メニューは `<header>` の外に置く（内側だとヘッダー内に閉じ込められる）

---

## 環境変数

| 変数名 | 用途 | 公開範囲 |
|---|---|---|
| `MICROCMS_SERVICE_DOMAIN` | microCMSサービスドメイン | サーバーのみ |
| `MICROCMS_API_KEY` | microCMS APIキー | サーバーのみ |
| `SITE_URL` | 正規URL（sitemap / robots / metadataBase）。未設定時はVercel本番URL→localhostにフォールバック（`src/lib/site.ts`） | サーバーのみ |

環境別テンプレート: `.env.local.example`, `.env.staging.example`, `.env.production.example`

Vercel側にも同じ環境変数の設定が必要。

---

## SEO対応状況

- [x] OGP / Twitter Card メタデータ
- [x] title template（子ページ対応）
- [x] お知らせ詳細の動的metadata (generateMetadata)
- [x] robots.txt / sitemap.xml 自動生成（URLは `src/lib/site.ts` の `siteUrl` に集約）
- [x] 構造化データ（Organization JSON-LD。実店舗確定後にLocalBusinessへ拡張し住所・電話を実データで追加）
- [x] next/image でmicroCMS画像最適化
- [ ] favicon / OG画像（ロゴ未決定のため保留）
- [ ] ドメイン決定後に `SITE_URL` 環境変数を設定（sitemap / canonical / OGPに自動反映）
- [ ] Google Search Console 登録

---

## 未実装・TODO

- **お問い合わせフォーム**: 現在はInstagram DM誘導のみ（送信されないダミーフォームは撤去、UIはgit履歴 `Contact.tsx` に残存）。Laravel構築後またはformspree等でフォーム復活
- **Shopify連携**: 2026年5月頃開始。docs/infrastructure-plan.md に構成プランあり
- **Laravelバックエンド**: お問い合わせ管理、Shopify連携、顧客管理。VPSに構築予定
- **ステージング環境**: Vercel以外も検討中（Laravelと同一VPSでの運用など）
- **favicon / OG画像**: ロゴデザイン確定待ち
- **写真・映像素材**: AI生成の仮ヒーロー動画は撤去（git履歴に残存）。現状ヒーロー/ステートメントの面は色面＋グレインのCSSで代用中。正式素材が入り次第、`Hero.tsx` の背景divと `Statement.tsx` のメディア面を画像/動画に差し替える（レイアウトは変更不要）
- **ドメイン**: 未決定

---

## コピー・タイポグラフィ規範（2026-07 ブランド調査に基づく）

### コピーの事実制約（最重要）
- コピーに書いてよい事実は「国産ハーブ」「スペシャルティコーヒー」「卸は直接取引のみ」だけ
- 以下は**事実でない**ので書かない: 農園所有、製造工程の詳細（非公開方針）、コロンビア産中心、実店舗の住所・電話（店舗は構想段階）
- 戦略は「宣言と情景型」（猿田彦珈琲・KOFFEE MAMEYA型）: 工程で証明せず、短い断言と五感の描写で語る。抽象語（高品質・こだわり・上質）は単体で使わない

### タイポグラフィ
- 2書体システム: 欧文 EB Garamond / 和文 Zen Old Mincho（next/font/google、`--font-display` / `--font-display-ja`。`--font-body`系はglobals.cssでエイリアス）
- font-weightは400/500のみ。**font-bold（700）禁止**（ハイブランド和文タイポの共通則）
- 和文はletter-spacing 0.05em以上、本文line-height 2前後

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
