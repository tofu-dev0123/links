# ディレクトリ構成

```
src/
├── app/
│   ├── layout.tsx        # ルートレイアウト
│   ├── page.tsx          # トップページ
│   └── globals.css       # グローバルスタイル
├── components/
│   ├── ui/               # shadcn/ui コンポーネント
│   ├── ProfileSection.tsx # プロフィールエリア
│   ├── LinkSection.tsx   # リンク一覧グリッド
│   └── LinkCard.tsx      # リンクカード1枚
├── data/
│   └── links.ts          # リンクデータ
├── hooks/                # カスタムフック
├── lib/
│   └── utils.ts          # cn() などの汎用ヘルパー
└── types/                # 型定義
```
