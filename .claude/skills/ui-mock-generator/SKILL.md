---
name: ui-mock-generator
description: >
  UIモックのPNG画像を生成するスキル。
  「モックを作成」「UIを画像で」「デザインをPNGで」「画像として確認したい」
  「設計書に貼る画像」「UIのスクリーンショット」など、UIコンポーネントや
  画面レイアウトを画像として出力したいときは必ずこのスキルを使う。
  `docs/design/` 配下のファイルを読み取り、その定義に従ってHTMLを生成してPNGに変換する。
  中間HTMLファイルは /tmp に置き、出力PNGはリポジトリの `docs/design/mocks/` に保存する。
---

## 概要

このスキルはUIモックのPNG画像を生成します。

1. `docs/design/` 配下のファイルを読み取り、プロジェクトのデザインシステムを把握する
2. その定義に基づいたスタンドアロンHTMLを `/tmp/ui-mock-[タイムスタンプ].html` に生成
3. Playwrightでレンダリング: `npx playwright screenshot`
4. `docs/design/mocks/mock-[YYYYMMDD-HHMMSS].png` に保存

## ワークフロー

1. `docs/design/` 配下のファイルをすべて読み取り、デザインシステムを把握する
2. 含めるUI要素（コンポーネント、コンテンツ）をユーザーに確認する（未指定の場合はデザインシステムのプレースホルダーを使用）
3. デザインシステムの定義に忠実なスタンドアロンHTMLを `/tmp/ui-mock-[タイムスタンプ].html` に生成
4. PlaywrightでPNGを出力し `docs/design/mocks/mock-[YYYYMMDD-HHMMSS].png` に保存
5. 出力先パスをユーザーに伝える

## HTMLの生成ルール

- `docs/design/` 配下のカラートークン・タイポグラフィ・ボーダーラディウス・コンポーネントパターンをすべて反映する
- Tailwind CDNは使わず、すべてのスタイルを `<style>` ブロックにインライン記述する
- フォントはGoogle Fonts CDNから読み込む（Geistが使えない場合はInterで代替）
- アイコンはLucideスタイルのインラインSVG（`stroke-width="2"`, `fill="none"`, `viewBox="0 0 24 24"`）を使用する
- ホバーアニメーションはデザインシステムに定義されたパターンを使用する

## レンダリングコマンド

HTMLを `/tmp/ui-mock-[タイムスタンプ].html` に書き出した後、Playwrightでレンダリング:

```bash
npx playwright screenshot \
  "file:///tmp/ui-mock-[タイムスタンプ].html" \
  "docs/design/mocks/mock-[YYYYMMDD-HHMMSS].png" \
  --viewport-size "1280,900"
```

Playwrightのブラウザが未インストールの場合は先に実行:
```bash
npx playwright install chromium
```
