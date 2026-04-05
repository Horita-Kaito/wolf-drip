---
paths:
  - "src/components/**"
  - "src/app/**"
---

# コンポーネント設計ルール

## ディレクトリ構成

```
src/
  components/
    ui/                    # 汎用UIパーツ（Button, Input, Card, Badge等）
    sections/              # ページセクション（Hero, Concept, Coffee等）
    layout/                # レイアウト系（Header, Footer, SmoothScroll等）
  features/                # 機能単位（cart, contact, news等）
    news/
      components/          # この機能専用のコンポーネント
      hooks/               # この機能専用のhooks
      types.ts             # この機能の型定義
    cart/
      ...
  lib/                     # 外部サービスクライアント、ユーティリティ
  types/                   # グローバルな型定義
```

## 命名規則

- コンポーネント: PascalCase (`ProductCard.tsx`)
- hooks: camelCase、use接頭辞 (`useCart.ts`)
- 型定義ファイル: camelCase (`types.ts`)
- ユーティリティ: camelCase (`formatDate.ts`)

## コンポーネント分割の基準

### UIコンポーネント (`components/ui/`)
- プロジェクト固有のロジックを持たない
- props経由でデータを受け取る
- 2箇所以上で使う、または使う見込みがあるもの
- 例: Button, Input, SectionHeader, Badge

### セクションコンポーネント (`components/sections/`)
- ページの1セクションを担当
- アニメーションロジックを含んでよい
- データはpropsで受け取る（fetchしない）

### 機能コンポーネント (`features/`)
- 特定の機能に紐づくコンポーネント群
- 機能内で閉じた型定義・hooks・コンポーネントをまとめる
- 他の機能から直接importしない（共通化するならui/に昇格）

## Server Components vs Client Components

- デフォルトはServer Component
- "use client" は以下の場合のみ:
  - useState / useEffect / useRef 等のhooksが必要
  - ブラウザAPI（window, document）にアクセスする
  - イベントハンドラ（onClick等）が必要
  - GSAP等のアニメーションライブラリを使用する
- "use client" の範囲は最小限に。ページ全体ではなく必要なコンポーネントだけ

## データフロー

```
page.tsx (Server Component)
  └── データ取得（microCMS, Shopify, Laravel API）
        └── props��コンポーネントに渡す
              └── Client Componentは表示とインタ��クションのみ
```

- page.tsxがデータ取得の責務を持つ
- コンポーネントはデータソースに依存しない（propsのみ）
- これによりmicroCMS→Shopify等のデータソース移行がpage.tsxの変更だけで済む

## アニメーション

- GSAPのアニメーションはClient Componentで完結させる
- useEffect内でgsap.context()を使い、return時にrevert()でクリーンアップ
- ScrollTriggerのtriggerは自コンポーネントのrefに限定する
- 共通アニメーションパターンはカスタムhooksに切り出す

## 型定義

- 外部APIレスポンスの型: `src/lib/` 内の該当クライアントファイルに定義
- 機能固有の型: `src/features/*/types.ts`
- コンポーネントのProps型: コンポーネントファイル内に定義
- 複数機能で共有する型: `src/types/`
