---
paths:
  - "src/**"
---

# コーディング規約

## TypeScript

- strict mode（tsconfig.jsonで有効済み）
- `any` は使わない。型が不明な場合は `unknown` を使い、型ガードで絞り込む
- 型アサーション (`as`) は最小限に。non-null assertion (`!`) はライブラリの初期化等やむを得ない場合のみ
- enumは使わない。union型またはas constを使う
- 関数の戻り値型は、複雑な場合のみ明示する

## React

- 関数コンポーネントのみ（クラスコンポーネントは使わない）
- Props型はコンポーネント直上にtype定義
- デフォルトエクスポートはpage.tsxのみ。コンポーネントはnamed export
- useEffectの依存配列は正確に指���する（ESLintルールに従う）
- 不要なuseState/useEffectを避ける。Server Componentで解決できるならそちらを使う

## Tailwind CSS

- インラインスタイルよりTailwindクラスを優先
- カスタムCSS変数はglobals.cssの:rootで定義（色、フォント等）
- レスポンシブはモバイルファースト（sm: → md: → lg:）
- 長いクラス文字列は可読性のために改行して整理する
- @applyは使わない（Tailwind v4の方針に従う）

## ファイル構成

- 1ファイル1コンポーネントを基本とする
- ファイルが200行を超えたら分割を検討する
- importの順序: 1.React/Next.js 2.外部ライブラリ 3.内部モジュール（@/...）

## エラーハンドリング

- 外部API呼び出しはtry-catchで囲む
- ユーザー向けのエラーメッセージは日本語
- 開発者向けのエラーログは英語（console.error��
- 本番環境のconsole.logは削除する（デバッグ用は残さない）

## セキュリティ

- 環境変数に `NEXT_PUBLIC_` プレフィックスは原則使わない
- APIキー等のシークレットはサーバーサイドのみで使用する
- dangerouslySetInnerHTMLはmicroCMS等の信頼できるソースのみに使用
- ユーザー入力は必ずバリデーション・サニタイズする
