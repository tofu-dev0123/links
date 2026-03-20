---
name: ui-mock-generator
description: >
  Generates UI mock PNG images for the links page project. Use this skill whenever
  the user wants to create, preview, or visualize a UI design, mockup, or screen
  layout as an image file. Triggers on phrases like "モックを作成", "UIを画像で",
  "デザインをPNGで", "画像として確認したい", "設計書に貼る画像", "UIのスクリーンショット", or
  any request to render a UI component or page as a PNG/image. The skill understands
  the project's design system (Tailwind-compatible tokens, shadcn/ui new-york style,
  navy brand color, Geist-equivalent font) and generates a PNG without touching the
  repository — all intermediate files stay in /tmp.
---

## Overview

This skill generates PNG mockup images of the links page UI. It:

1. Generates a complete standalone HTML file at `/tmp/ui-mock-[timestamp].html` using the project's design system
2. Renders it to PNG with Playwright: `npx playwright screenshot`
3. Saves the result to `~/Desktop/mock-[YYYYMMDD-HHMMSS].png` (or user-specified path)

The repository is never touched. No files are created inside the project directory.

## Workflow

1. Ask the user what to include (which links/cards, profile info) — or use placeholder content if not specified
2. Generate the HTML file at `/tmp/ui-mock-[timestamp].html`
3. Run Playwright to produce the PNG
4. Tell the user the output path

## Design System

### Color Tokens

Embed these as CSS custom properties in the generated HTML's `<style>` block:

```css
:root {
  --background: oklch(1 0 0);              /* white */
  --foreground: oklch(0.145 0 0);          /* near-black */
  --primary: oklch(0.28 0.1 255);          /* navy brand color ≈ #1a2f5a */
  --primary-foreground: oklch(0.985 0 0);  /* white */
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --muted: oklch(0.97 0 0);               /* very light gray */
  --muted-foreground: oklch(0.556 0 0);   /* medium gray */
  --border: oklch(0.922 0 0);             /* light gray border */
  --radius: 0.625rem;
}
```

### Typography

- Font: **Inter** via Google Fonts CDN (visual equivalent of Geist Sans)
- Load in `<head>`:
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  ```
- Apply: `font-family: 'Inter', system-ui, sans-serif`

### Border Radius Scale

| Token | Value |
|---|---|
| sm | `calc(0.625rem - 4px)` ≈ 0.375rem |
| md | `calc(0.625rem - 2px)` ≈ 0.5rem |
| lg | `0.625rem` (base) |
| xl | `calc(0.625rem + 4px)` ≈ 0.875rem |

### Card Hover Animation (lift pattern — GitHub/Vercel/Linear style)

```css
.card {
  transition: transform 150ms ease, box-shadow 150ms ease, border-color 150ms ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.12);
  border-color: oklch(0.28 0.1 255); /* primary navy */
}
```

## Layout Specification

### Page Structure

- Background: white (`--background`)
- Body centered: `max-width: 760px; margin: 0 auto; padding: 48px 24px`
- Top: profile section (avatar circle + name + bio), centered
- Below: card grid

### Card Grid

```css
.grid {
  display: grid;
  grid-template-columns: repeat(2, 340px); /* 2 columns, PC */
  gap: 12px;
  justify-content: center;
}

@media (max-width: 640px) {
  .grid {
    grid-template-columns: 340px; /* 1 column, mobile */
  }
}
```

### Card (340px fixed width)

Structure:
```
[Icon 40px]  Service Name (bold)      [ExternalLink 16px]
             Short description (muted)
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

### Profile Section (top of page)

```html
<div class="profile">
  <div class="avatar">T</div>  <!-- or initials -->
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

## Icons

Use inline SVG (Lucide-style, stroke-based, `stroke-width="2"`, `fill="none"`, `viewBox="0 0 24 24"`).

Common icons for links page:
- GitHub: `<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77..."/>`
- External link: `<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>`
- X (Twitter): Use a simple X letter or SVG path
- Generic link: `<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>`

For services without a distinct icon, use the `Link` icon as fallback.

## Complete HTML Template

Generate a file at `/tmp/ui-mock-[timestamp].html` using this structure:

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

    /* Profile */
    .profile { text-align: center; margin-bottom: 32px; }
    .avatar {
      width: 80px; height: 80px; border-radius: 50%;
      background: oklch(0.28 0.1 255); color: white;
      font-size: 2rem; font-weight: 700;
      display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;
    }
    .name { font-size: 1.25rem; font-weight: 700; margin-bottom: 4px; }
    .bio  { font-size: 0.875rem; color: oklch(0.556 0 0); }

    /* Grid */
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 340px);
      gap: 12px;
      justify-content: center;
    }
    @media (max-width: 640px) {
      .grid { grid-template-columns: 340px; }
    }

    /* Card */
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
      <!-- Card example -->
      <a href="#" class="card">
        <svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <!-- icon path here -->
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
      <!-- Repeat for each link -->
    </div>
  </main>
</body>
</html>
```

## Rendering Command

After writing the HTML to `/tmp/ui-mock-[timestamp].html`, render it with Playwright:

```bash
npx playwright screenshot \
  "file:///tmp/ui-mock-[timestamp].html" \
  "[output_path]" \
  --viewport-size "1280,900"
```

Default output path: `~/Desktop/mock-[YYYYMMDD-HHMMSS].png`

If Playwright browsers aren't installed yet, run first:
```bash
npx playwright install chromium
```

## Placeholder Content

If the user doesn't specify links, use these defaults:

| Name | Description | Icon |
|---|---|---|
| GitHub | ソースコードを公開しています | github icon |
| X (Twitter) | 日々の気づきをつぶやいています | X icon |
| Zenn | 技術記事を書いています | link icon |
| YouTube | 動画を投稿しています | youtube icon |
