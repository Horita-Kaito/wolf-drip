---
name: new-page
description: App Routerのルールに従って新しいページを作成する
disable-model-invocation: true
allowed-tools: Read, Write, Bash(mkdir *), Glob, Grep
---

新しいページを作成してください。

引数: `$ARGUMENTS` — ページのパス（例: `shop`, `shop/[handle]`, `about`）

## 手順

1. `src/app/$ARGUMENTS/page.tsx` を作成
2. 以下のテンプレートに基づく:

### 静的ページ
```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ページタイトル",
  description: "ページの説明",
};

export default function XxxPage() {
  return (
    <main>
      {/* コンテンツ */}
    </main>
  );
}
```

### 動的ページ（[id]等）
```tsx
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  // データソースからパラメータ一覧を取得
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  // 動的メタデータ生成
  return { title: "" };
}

export default async function XxxPage({ params }: Props) {
  const { id } = await params;
  return (
    <main>
      {/* コンテンツ */}
    </main>
  );
}
```

3. データ取得が必要な場合はServer Componentとしてasync functionにする
4. sitemap.tsに新しいページを追加するか確認する
5. 作成後、ファイルパスとルーティングを報告
