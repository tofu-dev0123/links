# デザインシステム

## 技術スタック

- フレームワーク: Next.js (App Router)
- スタイリング: Tailwind CSS v4
- UIコンポーネント: shadcn/ui (new-yorkスタイル)
- アイコン: Lucide React (インラインSVG、`stroke-width="2"`, `fill="none"`, `viewBox="0 0 24 24"`)
- フォント: Geist Sans / Geist Mono（モック生成時はInterで代替）

---

## カラートークン

HTMLモック生成時は以下をCSS変数として `<style>` ブロックに埋め込む。

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

---

## タイポグラフィ

- 本文フォント: Geist Sans（モック生成時はInterで代替）
- 等幅フォント: Geist Mono
- 言語: `lang="ja"`

モック生成時のCDN読み込み:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```
適用: `font-family: 'Inter', system-ui, sans-serif`

---

## ボーダーラディウス

| トークン | 値 |
|---|---|
| sm | `calc(0.625rem - 4px)` ≈ 0.375rem |
| md | `calc(0.625rem - 2px)` ≈ 0.5rem |
| lg | `0.625rem`（ベース） |
| xl | `calc(0.625rem + 4px)` ≈ 0.875rem |
| 2xl | `calc(0.625rem + 8px)` ≈ 1.125rem |

---

## ホバーアニメーション

GitHub・Vercel・Linearで採用されている **liftパターン** を標準とする。

```css
.card {
  transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.12);
  border-color: oklch(0.28 0.1 255); /* --primary */
}
```

---

## レイアウト

### ページ全体

- 背景: `--background`（白）
- 中央寄せ: `max-width: 760px; margin: 0 auto; padding: 48px 24px`
- 上部: プロフィールセクション（アバター＋名前＋bio）、中央揃え

### カードグリッド

```css
.grid {
  display: grid;
  grid-template-columns: repeat(2, 340px); /* PC: 2カラム */
  gap: 12px;
  justify-content: center;
}
@media (max-width: 640px) {
  .grid { grid-template-columns: 340px; } /* モバイル: 1カラム */
}
```

---

## コンポーネントパターン

### プロフィールセクション

```html
<div class="profile">
  <div class="avatar">T</div>
  <h1 class="name">tofu</h1>
  <p class="bio">リンク集</p>
</div>
```

```css
.profile { text-align: center; margin-bottom: 32px; }
.avatar  {
  width: 80px; height: 80px; border-radius: 50%;
  background: oklch(0.28 0.1 255); color: white;
  font-size: 2rem; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 16px;
}
.name { font-size: 1.25rem; font-weight: 700; margin-bottom: 4px; }
.bio  { font-size: 0.875rem; color: oklch(0.556 0 0); }
```

### リンクカード（幅340px固定）

構造:
```
[アイコン 40px]  サービス名（font-weight: 600）      [ExternalLink 16px]
                 説明テキスト（muted-foreground）
```

```css
.card {
  display: flex; align-items: center; gap: 12px;
  width: 340px; padding: 16px;
  border: 1px solid oklch(0.922 0 0);
  border-radius: 0.625rem;
  background: oklch(1 0 0);
  text-decoration: none; color: inherit; cursor: pointer;
}
.card-icon  { width: 40px; height: 40px; flex-shrink: 0; color: oklch(0.28 0.1 255); }
.card-body  { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }
.card-title { font-weight: 600; font-size: 0.9rem; color: oklch(0.145 0 0); }
.card-desc  { font-size: 0.8rem; color: oklch(0.556 0 0); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.card-link  { width: 16px; height: 16px; flex-shrink: 0; color: oklch(0.556 0 0); }
```

---

## プレースホルダーコンテンツ

リンク未指定時のデフォルト:

| 名前 | 説明 |
|---|---|
| GitHub | ソースコードを公開しています |
| X (Twitter) | 日々の気づきをつぶやいています |
| Zenn | 技術記事を書いています |
| YouTube | 動画を投稿しています |
