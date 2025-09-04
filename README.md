# TagLink 公式サイト

TagLinkデスクトップアプリケーションの公式サイト・ヘルプページです。

## GitHub Pagesでの公開方法

1. GitHubリポジトリを作成
2. このコードをプッシュ
3. GitHub Actionsを設定（`.github/workflows/deploy.yml`）
4. GitHub PagesでPages sourceを「GitHub Actions」に設定

## ローカル開発

\`\`\`bash
npm install
npm run dev
\`\`\`

## 静的サイト生成

\`\`\`bash
npm run build
npx next export
\`\`\`

## 設定変更が必要な項目

- `next.config.mjs`の`basePath`をリポジトリ名に変更
- BoothのURL（`YOUR_BOOTH_ID`部分）を実際のIDに変更
- アプリのスクリーンショットと アイコン画像を差し替え
