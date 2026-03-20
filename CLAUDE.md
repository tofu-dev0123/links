# CLAUDE.md

## プロジェクト概要

tofu のリンクページ。SNS や各種サービスへのリンクをまとめて公開するシンプルな Web ページ。

## 技術スタック

| カテゴリ | 技術 |
| --- | --- |
| フレームワーク | Next.js 16 (App Router) |
| UI ライブラリ | React 19 |
| 言語 | TypeScript 5 |
| スタイリング | Tailwind CSS v4 |
| UI コンポーネント | shadcn/ui (new-york スタイル) |
| アイコン | Lucide React |
| プリミティブ | Radix UI |
| フォント | Geist (Sans / Mono) |
| リンター | ESLint 9 |
| フォーマッター | Prettier |

## 開発コマンド

```bash
npm run dev          # 開発サーバー起動
npm run build        # プロダクションビルド
npm run lint         # ESLint によるコード検査
npm run format       # Prettier でフォーマット
npm run format:check # フォーマットの差分チェック
```

## ディレクトリ構成

```
src/
├── app/            # App Router のページ・レイアウト
│   ├── layout.tsx  # ルートレイアウト
│   ├── page.tsx    # トップページ
│   └── globals.css # グローバルスタイル
├── components/     # コンポーネント
│   └── ui/         # shadcn/ui コンポーネント
├── hooks/          # カスタムフック
└── lib/            # ユーティリティ関数
    └── utils.ts    # cn() などの汎用ヘルパー
```

## shadcn/ui コンポーネントの追加

```bash
npx shadcn add <component>
```

## パスエイリアス

`@/*` は `./src/*` にマッピングされている。
