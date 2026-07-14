// 正規URLの単一ソース。本番ドメイン決定後は SITE_URL 環境変数を設定するだけで
// sitemap / robots / metadataBase の全てに反映される
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl =
  process.env.SITE_URL ??
  (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");

// 問い合わせ導線（フォーム実装までInstagram DMが唯一の窓口）
export const INSTAGRAM_URL = "https://www.instagram.com/wolfdrip2026";
