---
paths:
  - "package.json"
  - ".env*"
  - "next.config.ts"
---

# 環境構築手順

## 前提条件

- Node.js（package.jsonのenginesに準拠、未指定の場合はLTS推奨）
- npm（パッケージマネージャはnpmで統一）
- Git

## 初回セットアップ

```bash
# 1. リポジトリをクローン
git clone git@github.com:Horita-Kaito/wolf-drip.git
cd wolf-drip

# 2. 依存パッケージをインストール
npm install

# 3. 環境変数を設定
cp .env.local.example .env.local
# .env.local を編��し、APIキー等を設定する

# 4. 開発サーバーを起動
npm run dev
```

## 環��変数の取得��

| 変数 | 取得場所 |
|---|---|
| `MICROCMS_SERVICE_DOMAIN` | microCMS管理画面 → サービス設定 |
| `MICROCMS_API_KEY` | microCMS管理画面 → サービス設定 → APIキー |

※ 本番用のAPIキーとローカル用のAPIキーは同じサービスのものを使用（現時点）

## npmスクリプト

| コマンド | 用途 |
|---|---|
| `npm run dev` | 開発サーバー起動（Turbopack） |
| `npm run build` | 本番ビルド |
| `npm run start` | 本番サーバー起動 |
| `npm run lint` | ESLint実行 |

## パッケージ管理

- パッケージマネージャは **npm** で統一する
- `yarn.lock` や `pnpm-lock.yaml` ���コミットしない
- パッケージ追加時は用途をコミット���ッセージに記載する
- 不要なパッケージは放置せず削除する
