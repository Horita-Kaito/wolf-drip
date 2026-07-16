---
name: verify
description: このリポジトリでUI変更をヘッドレスブラウザで実機検証する手順（dev server + puppeteer）
---

# 実機検証の手順

## 起動

```bash
npm run dev -- --port 3987   # バックグラウンドで起動、200が返るまで数秒待つ
```

## ブラウザ（puppeteer）

- `puppeteer` はdependenciesに入っている（Chromeは `~/.cache/puppeteer` にDL済み）
- **WSL2の注意**: Chromeの共有ライブラリ（libnspr4 / libnss3 / libasound2）がシステムにない。
  sudoも使えないため、`apt-get download libnspr4 libnss3 libasound2t64` → `dpkg -x` で
  スクラッチパッドに展開し、`LD_LIBRARY_PATH` に `extracted/usr/lib/x86_64-linux-gnu` を
  指定してnodeを実行する
- 検証スクリプトをプロジェクト外に置く場合は `createRequire("/path/to/project/package.json")`
  でpuppeteerを解決する

## モバイル検証

```js
await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
```

## このリポジトリ特有の落とし穴

- スクロールはLenis（smooth scroll）経由。`window.scrollY` の変化はアニメーション完了まで
  1.5〜2.5秒待ってから読む
- ハンバーガーメニュー表示中は `lenis.stop()` でスクロールがロックされる。
  停止中のLenisは `scrollTo` を無視し、`start()` は `reset()` で進行中の
  アニメーションを打ち切る（Header.tsxのアンカー処理はこの順序に依存）
- アンカー到達位置はヘッダー高さ80px（`HEADER_HEIGHT`）オフセット。セクションの
  `getBoundingClientRect().top` が約80pxなら正しい
