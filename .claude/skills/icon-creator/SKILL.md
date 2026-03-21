---
name: icon-creator
description: >
  リンクカード用のアイコンPNG画像を生成するスキル。
  「アイコンを作成」「アイコンを追加」「リンクカードのアイコン」「アイコンをPNGで」
  「サービスのアイコンを作りたい」「アイコン画像が欲しい」など、
  リンクカードに使用するアイコン画像を作成・追加したいときは必ずこのスキルを使う。
  ユーザーと壁打ちしながらアイコン仕様を詰め、HTMLに変換してPNGを出力する。
  中間HTMLファイルは /tmp に置き、出力PNGは `public/icons/` に保存する。
---

## 概要

このスキルはリンクカード用のアイコンPNG画像を生成します。

1. `.claude/skills/ui-mock-generator/reference/design-system.md` を読み取り、デザインシステムを把握する
2. ユーザーと壁打ちしながらアイコン仕様を詰める（終了はユーザーの明示的な指示を待つ）
3. 合意した仕様を構造化Markdownとして `docs/design/icons/[YYYYMMDD-HHMMSS].md` に保存
4. その仕様に基づいたスタンドアロンHTMLを `/tmp/icon-[タイムスタンプ].html` に生成
5. Playwrightでレンダリングし `public/icons/[icon-name].png` に保存
6. 出力先パスをユーザーに伝える

## ワークフロー

### Step 1: デザインシステムの読み込み

`.claude/skills/ui-mock-generator/reference/design-system.md` を読み取り、
カラートークン・タイポグラフィ・コンポーネントパターンを把握する。

### Step 2: 壁打ち

ユーザーとの対話でアイコン仕様を詰める。以下の点を確認・提案しながら進める:

- **サービス名**: どのサービス・ブランドのアイコンか
- **スタイル**: ブランドカラーを使うか、デザインシステムのネイビーで統一するか
- **形状**: シンプルなロゴ型、文字アイコン型、抽象的なアイコン型など
- **背景**: 透明、白、ブランドカラー背景など
- **ファイル名**: `public/icons/` に保存するファイル名（例: `github.png`）

ユーザーが「生成して」などの指示を出すまで壁打ちを継続する。

### Step 3: アイコン仕様ファイルの保存

タイムスタンプを生成し、合意した仕様を以下のパスに保存する:
```
docs/design/icons/[YYYYMMDD-HHMMSS].md
```

ファイル形式:
```markdown
## サービス名
## スタイル
## 背景
## カラー
## 形状・デザイン詳細
## ファイル名
```

### Step 4: HTML生成 → PNG出力

デザインシステムとアイコン仕様の両方を参照してHTMLを生成し、PNG化する。

## HTMLの生成ルール

- キャンバスサイズは **512×512px** の正方形（`width: 512px; height: 512px`）
- アイコンはキャンバス中央に配置する（`display: flex; align-items: center; justify-content: center`）
- `<body>` の `margin: 0; padding: 0` を明示し、余白が入らないようにする
- Tailwind CDNは使わず、すべてのスタイルを `<style>` ブロックにインライン記述する
- フォントはGoogle Fonts CDNから読み込む（Geistが使えない場合はInterで代替）
- SVGアイコンはインラインSVGで記述し、サービスのロゴを忠実に再現する
- デザインシステムのカラートークンを参照し、統一感のある配色にする
- ブランドカラーを使う場合は実際のブランドカラーコードを使用する（例: GitHubは `#24292e`）

### アイコン品質のポイント

- 40px表示でも視認できるよう、シンプルで明瞭な形状にする
- 細い線は `stroke-width` を適切に調整し、縮小時につぶれないようにする
- 文字を含む場合は太めのフォントウェイト（600〜700）を使う

## レンダリングコマンド

HTMLを `/tmp/icon-[タイムスタンプ].html` に書き出した後、Playwrightでレンダリング:

```bash
npx playwright screenshot \
  "file:///tmp/icon-[タイムスタンプ].html" \
  "public/icons/[icon-name].png" \
  --viewport-size "512,512"
```

Playwrightのブラウザが未インストールの場合は先に実行:
```bash
npx playwright install chromium
```
