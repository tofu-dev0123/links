---
name: ui-mock-generator
description: >
  リンクページプロジェクト用のUIモックPNG画像を生成するスキル。
  「モックを作成」「UIを画像で」「デザインをPNGで」「画像として確認したい」
  「設計書に貼る画像」「UIのスクリーンショット」など、UIコンポーネントや
  画面レイアウトを画像として出力したいときは必ずこのスキルを使う。
  プロジェクトのデザインシステム（Tailwind互換トークン、shadcn/ui new-yorkスタイル、
  ネイビーブランドカラー、Geist相当フォント）を理解した上でPNGを生成する。
  中間ファイルはすべて /tmp に置き、リポジトリには何も書き込まない。
---

## 概要

このスキルはリンクページのUIモックPNG画像を生成します。

1. プロジェクトのデザインシステムに基づいたスタンドアロンHTMLを `/tmp/ui-mock-[タイムスタンプ].html` に生成
2. Playwrightでレンダリング: `npx playwright screenshot`
3. `~/Desktop/mock-[YYYYMMDD-HHMMSS].png`（またはユーザー指定のパス）に保存

リポジトリには一切ファイルを作成しない。

## ワークフロー

1. 含めるリンク・カード・プロフィール情報をユーザーに確認する（未指定の場合はプレースホルダーを使用）
2. `/tmp/ui-mock-[タイムスタンプ].html` にHTMLファイルを生成
3. PlaywrightでPNGを出力
4. 出力先パスをユーザーに伝える

## デザインシステム

### カラートークン

生成するHTMLの `<style>` ブロックに以下をCSS変数として埋め込む：

```css
:root {
  --background: oklch(1 0 0);              /* 白 */
  --foreground: oklch(0.145 0 0);          /* ほぼ黒 */
  --primary: oklch(0.28 0.1 255);          /* ネイビーブランドカラー ≈ #1a2f5a */
  --primary-foreground: oklch(0.985 0 0);  /* 白 */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --muted: oklch(0.97 0 0);               /* 薄いグレー */
  --muted-foreground: oklch(0.556 0 0);   /* 中グレー */
  --border: oklch(0.922 0 0);             /* 薄いボーダー */
  --radius: 0.625rem;
}
```

### タイポグラフィ

- フォント: **Inter**（Google Fonts CDN経由、Geist Sansの代替）
- `<head>` に追加:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  ```
- 適用: `font-family: 'Inter', system-ui, sans-serif`

### ボーダーラディウススケール

| トークン | 値 |
|---|---|
| sm | `calc(0.625rem - 4px)` ≈ 0.375rem |
| md | `calc(0.625rem - 2px)` ≈ 0.5rem |
| lg | `0.625rem`（ベース） |
| xl | `calc(0.625rem + 4px)` ≈ 0.875rem |

### カードホバーアニメーション（liftパターン — GitHub/Vercel/Linear方式）

```css
.card {
  transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.12);
  border-color: oklch(0.28 0.1 255); /* ネイビー */
}
```

## レイアウト仕様

### ページ構造

- 背景: 白（`--background`）
- 中央寄せ: `max-width: 760px; margin: 0 auto; padding: 48px 24px`
- 上部: プロフィールセクション（アバター円＋名前＋bio）、中央揃え
- 下部: カードグリッド

### カードグリッド

```css
.grid {
  display: grid;
  grid-template-columns: repeat(2, 340px); /* PC: 2カラム */
  gap: 12px;
  justify-content: center;
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 340px; /* モバイル: 1カラム */
  }
}
```

### カード（幅340px固定）

構造:
```
[アイコン 40px]  サービス名（太字）      [外部リンクアイコン 16px]
                 説明テキスト（ミュート）
```

CSS:
```css
.card {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 340px;
  padding: 16px;
  border: 1px solid oklch(0.922 0 0);
  border-radius: 0.625rem;
  background: oklch(1 0 0);
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
.card-icon  { width: 40px; height: 40px; flex-shrink: 0; color: oklch(0.28 0.1 255); }
.card-body  { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
.card-title { font-weight: 600; font-size: 0.9rem; color: oklch(0.145 0 0); }
.card-desc  { font-size: 0.8rem; color: oklch(0.556 0 0); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.card-link  { width: 16px; height: 16px; margin-left: auto; flex-shrink: 0; color: oklch(0.556 0 0); }
```

### プロフィールセクション（ページ上部）

```html
<div class="profile">
  <div class="avatar">T</div>  <!-- イニシャル -->
  <h1 class="name">tofu</h1>
  <p class="bio">リンク集</p>
</div>
```

```css
.profile    { text-align: center; margin-bottom: 32px; }
.avatar     { width: 80px; height: 80px; border-radius: 50%; background: oklch(0.28 0.1 255);
              color: white; font-size: 2rem; font-weight: 700;
              display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.name       { font-size: 1.25rem; font-weight: 700; margin-bottom: 4px; }
.bio        { font-size: 0.875rem; color: oklch(0.556 0 0); }
```

## アイコン

インラインSVG（Lucideスタイル）を使用: `stroke-width="2"`, `fill="none"`, `viewBox="0 0 24 24"`

主要アイコンのSVGパス:
- GitHub: `<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77..."/>`
- 外部リンク: `<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>`
- X (Twitter): シンプルなXのSVGパスを使用
- 汎用リンク: `<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>`

専用アイコンがないサービスは `Link` アイコンをフォールバックとして使用する。

## HTMLテンプレート全体

`/tmp/ui-mock-[タイムスタンプ].html` に以下の構造で生成する:

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>UI Mock</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', system-ui, sans-serif;
      background: oklch(1 0 0);
      color: oklch(0.145 0 0);
    }
    .page { max-width: 760px; margin: 0 auto; padding: 48px 24px; }

    /* プロフィール */
    .profile { text-align: center; margin-bottom: 32px; }
    .avatar {
      width: 80px; height: 80px; border-radius: 50%;
      background: oklch(0.28 0.1 255); color: white;
      font-size: 2rem; font-weight: 700;
      display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;
    }
    .name { font-size: 1.25rem; font-weight: 700; margin-bottom: 4px; }
    .bio  { font-size: 0.875rem; color: oklch(0.556 0 0); }

    /* グリッド */
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 340px);
      gap: 12px;
      justify-content: center;
    }
    @media (max-width: 640px) {
      .grid { grid-template-columns: 340px; }
    }

    /* カード */
    .card {
      display: flex; align-items: center; gap: 12px;
      width: 340px; padding: 16px;
      border: 1px solid oklch(0.922 0 0);
      border-radius: 0.625rem;
      background: oklch(1 0 0);
      text-decoration: none; color: inherit; cursor: pointer;
      transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease;
    }
    .card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.12);
      border-color: oklch(0.28 0.1 255);
    }
    .card-icon  { width: 40px; height: 40px; flex-shrink: 0; color: oklch(0.28 0.1 255); }
    .card-body  { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }
    .card-title { font-weight: 600; font-size: 0.9rem; color: oklch(0.145 0 0); }
    .card-desc  { font-size: 0.8rem; color: oklch(0.556 0 0); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .card-link  { width: 16px; height: 16px; flex-shrink: 0; color: oklch(0.556 0 0); }
  </style>
</head>
<body>
  <main class="page">
    <div class="profile">
      <div class="avatar">T</div>
      <h1 class="name">tofu</h1>
      <p class="bio">リンク集</p>
    </div>
    <div class="grid">
      <!-- カード例 -->
      <a href="#" class="card">
        <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <!-- アイコンパス -->
        </svg>
        <div class="card-body">
          <span class="card-title">GitHub</span>
          <span class="card-desc">ソースコードを公開しています</span>
        </div>
        <svg class="card-link" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
          <polyline points="15 3 21 3 21 9"/>
          <line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </a>
      <!-- カードを繰り返す -->
    </div>
  </main>
</body>
</html>
```

## レンダリングコマンド

HTMLを `/tmp/ui-mock-[タイムスタンプ].html` に書き出した後、Playwrightでレンダリング:

```bash
npx playwright screenshot \
  "file:///tmp/ui-mock-[タイムスタンプ].html" \
  "[出力パス]" \
  --viewport-size "1280,900"
```

デフォルト出力先: `~/Desktop/mock-[YYYYMMDD-HHMMSS].png`

Playwrightのブラウザが未インストールの場合は先に実行:
```bash
npx playwright install chromium
```

## プレースホルダーコンテンツ

リンクが未指定の場合は以下をデフォルトとして使用:

| 名前 | 説明 | アイコン |
|---|---|---|
| GitHub | ソースコードを公開しています | GitHubアイコン |
| X (Twitter) | 日々の気づきをつぶやいています | Xアイコン |
| Zenn | 技術記事を書いています | リンクアイコン |
| YouTube | 動画を投稿しています | YouTubeアイコン |
