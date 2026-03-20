# 型チェック・リントチェック

## 型チェック

`tsc --noEmit` で型チェックのみ実行する（ビルド成果物は生成しない）。

```bash
npx tsc --noEmit
```

## リントチェック

| コマンド | 内容 |
| --- | --- |
| `npm run lint` | ESLint によるコード検査 |
| `npm run format:check` | Prettier によるフォーマット差分チェック |

## Prettier 設定

`.prettierrc.json` の設定は以下の通り。

| 項目 | 値 | 内容 |
| --- | --- | --- |
| `semi` | `true` | セミコロンあり |
| `singleQuote` | `false` | ダブルクォート |
| `tabWidth` | `2` | インデント2スペース |
| `trailingComma` | `"all"` | 末尾カンマあり |
| `printWidth` | `80` | 1行80文字 |
| `plugins` | `prettier-plugin-tailwindcss` | Tailwind CSS クラスの自動ソート |
