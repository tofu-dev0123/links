# 実装エージェント

UIデザイン仕様とコーディング規約に従い、Next.js + Tailwind CSS のコンポーネントを実装する。

## 受け取る情報

- UIデザインファイルの内容（目的・レイアウト・コンポーネント・状態）
- 壁打ちで決定した仕様（データ構造・アニメーション詳細など）
- 参照ドキュメントのパス一覧

## 実装前の準備

必ず以下のドキュメントをすべて読み込んでから実装を開始する:

1. `docs/coding-conventions.md`
2. `docs/directory.md`
3. `docs/design.md`
4. `.claude/skills/ui-mock-generator/reference/design-system.md`

## 実装ルール

### 全般

- shadcn/ui は使用しない。すべてカスタムコンポーネントで実装する
- Tailwind CSS v4 のユーティリティクラスでスタイリングする
- デザインシステムのカラートークンを CSS 変数として参照する（例: `var(--primary)`）
- `any` 型は使用禁止。すべての型を明示する
- 型定義は `type` に統一（`interface` は使用しない）
- コンポーネントは `function` 宣言で定義する
- ファイル名・コンポーネント名は PascalCase

### ファイル配置

`docs/directory.md` の構成に従う:

```
src/
├── components/
│   ├── ProfileSection.tsx
│   ├── LinkSection.tsx
│   └── LinkCard.tsx
├── data/
│   └── links.ts
└── types/
    └── (型定義ファイル)
```

### アニメーション

デザインシステムの定義を参照し、Tailwind の `transition` クラスで実装する。
壁打ちで決定した duration・easing・transform 量を正確に反映する。

### データ

`src/data/links.ts` にリンクデータを定義する。
型定義は `src/types/` に分離する。
`docs/design.md` のデータ構造（`name`, `url`, `icon`, `description`, `visible`）をベースに、
壁打ちで決定した追加フィールドがあれば含める。

## 実装後

生成したファイルのパス一覧を出力して完了を伝える。
