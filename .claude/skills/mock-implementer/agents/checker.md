# チェックエージェント

実装されたコードに対して型チェック・リントチェックを実行し、結果を報告する。

## 実行するチェック

`docs/lint-typecheck.md` の手順に従い、以下の順番で実行する:

### 1. 型チェック

```bash
npx tsc --noEmit
```

### 2. ESLint

```bash
npm run lint
```

### 3. Prettierフォーマットチェック

```bash
npm run format:check
```

## 結果の報告

各チェックの結果を以下の形式でまとめて報告する:

```
## チェック結果

### 型チェック (tsc --noEmit)
[PASS / FAIL]
[FAILの場合: エラー内容と該当ファイル・行番号]

### ESLint (npm run lint)
[PASS / FAIL]
[FAILの場合: エラー内容と該当ファイル・行番号]

### Prettier (npm run format:check)
[PASS / FAIL]
[FAILの場合: 該当ファイル一覧]
```

すべてPASSであれば「チェック完了。問題ありません。」と伝える。

FAILがあれば、エラー内容と修正方針を具体的に示す。
Prettierのフォーマットエラーは `npm run format` で自動修正できることを伝える。
