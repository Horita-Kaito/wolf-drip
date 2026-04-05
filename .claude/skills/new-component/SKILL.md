---
name: new-component
description: コンポーネント設計ルールに従って新しいコンポーネントを作成する
disable-model-invocation: true
allowed-tools: Read, Write, Glob, Grep
---

新しいコンポーネントを作成してください。

引数: `$ARGUMENTS` — コンポーネントの種類と名前（例: `ui/Button`, `sections/ProductList`, `layout/Sidebar`）

## 手順

1. 引数からカテゴリ（ui/sections/layout）とコンポーネント名を解析
2. `.claude/rules/component-design.md` のルールに従う
3. 以下のテンプレートに基づいてファイルを作成:

### UIコンポーネント (`src/components/ui/`)
- propsの型定義を含む
- Server Component（"use client"なし）をデフォルトとする
- インタラクションが必要な場合のみ "use client" を付与

### セクションコンポーネント (`src/components/sections/`)
- "use client" を付与（アニメーション用）
- GSAP + ScrollTriggerのボイラープレートを含む
- useEffect内でgsap.context → return revert パターン
- Props型を定義し、データはpropsで受け取る

### レイアウトコンポーネント (`src/components/layout/`)
- children propsを受け取る構造
- Server Componentをデフォルトとする

4. 作成後、ファイルパスと使い方を報告
