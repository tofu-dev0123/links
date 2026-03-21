---
name: ui-mock-generator
description: >
  UIモックのPNG画像を生成するスキル。
  「モックを作成」「UIを画像で」「デザインをPNGで」「画像として確認したい」
  「設計書に貼る画像」「UIのスクリーンショット」など、UIコンポーネントや
  画面レイアウトを画像として出力したいときは必ずこのスキルを使う。
  ユーザーと壁打ちしながらUIデザインファイルを作成し、HTMLに変換してPNGを出力する。
  中間HTMLファイルは /tmp に置き、出力PNGはリポジトリの `docs/design/mocks/` に保存する。
---

## 概要

このスキルはUIモックのPNG画像を生成します。

1. `.claude/skills/ui-mock-generator/reference/design-system.md` を読み取り、デザインシステムを把握する
2. ユーザーと壁打ちしながらUI仕様を詰める（終了はユーザーの明示的な指示を待つ）
3. 合意した仕様を構造化Markdownとして `docs/design/ui/[YYYYMMDD-HHMMSS].md` に保存
4. その定義に基づいたスタンドアロンHTMLを `/tmp/ui-mock-[タイムスタンプ].html` に生成
5. Playwrightでレンダリングし `docs/design/mocks/[YYYYMMDD-HHMMSS].png` に保存
6. 出力先パスをユーザーに伝える

## ワークフロー

### Step 1: デザインシステムの読み込み

`.claude/skills/ui-mock-generator/reference/design-system.md` を読み取り、
カラートークン・タイポグラフィ・コンポーネントパターンを把握する。

### Step 2: 壁打ち

ユーザーとの対話でUI仕様を詰める。
テンプレート（`.claude/skills/ui-mock-generator/templates/ui-design-template.md`）のセクションを埋めるように質問・確認を進める。
ユーザーが「生成して」などの指示を出すまで壁打ちを継続する。

### Step 3: UIデザインファイルの保存

タイムスタンプを生成し、合意した仕様を以下のパスに保存する:

```
docs/design/ui/[YYYYMMDD-HHMMSS].md
```

ファイル形式はテンプレートに従った構造化Markdown:

```markdown
## 目的

## レイアウト

## コンポーネント

## 状態・バリアント

## 備考
```

### Step 4: HTML生成 → PNG出力

デザインシステムとUIデザインファイルの両方を参照してHTMLを生成し、PNG化する。

## HTMLの生成ルール

- `reference/design-system.md` のカラートークン・タイポグラフィ・ボーダーラディウス・コンポーネントパターンをすべて反映する
- Tailwind CDNは使わず、すべてのスタイルを `<style>` ブロックにインライン記述する
- フォントはGoogle Fonts CDNから読み込む（Geistが使えない場合はInterで代替）
- アイコンはLucideスタイルのインラインSVG（`stroke-width="2"`, `fill="none"`, `viewBox="0 0 24 24"`）を使用する
- ホバーアニメーションはデザインシステムに定義されたパターンを使用する

## レンダリングコマンド

HTMLを `/tmp/ui-mock-[タイムスタンプ].html` に書き出した後、Playwrightでレンダリング:

```bash
npx playwright screenshot \
  "file:///tmp/ui-mock-[タイムスタンプ].html" \
  "docs/design/mocks/[YYYYMMDD-HHMMSS].png" \
  --viewport-size "1280,900"
```

Playwrightのブラウザが未インストールの場合は先に実行:

```bash
npx playwright install chromium
```
