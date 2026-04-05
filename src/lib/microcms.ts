import { createClient } from "microcms-js-sdk";
import type { MicroCMSListContent, MicroCMSQueries } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
});

// お知らせの型定義
export type News = {
  date: string;
  category: string;
  title: string;
  description: string; // リッチエディタ（HTML）
} & MicroCMSListContent;

// お知らせ一覧取得
export async function getNewsList(queries?: MicroCMSQueries) {
  return client.getList<News>({
    endpoint: "news",
    queries: { orders: "-date", limit: 10, ...queries },
  });
}

// お知らせ詳細取得
export async function getNewsDetail(contentId: string, queries?: MicroCMSQueries) {
  return client.getListDetail<News>({
    endpoint: "news",
    contentId,
    queries,
  });
}

// メニューの型定義
export type MenuItem = {
  name: string;
  nameJa: string;
  type: string | string[];
  flavor: string;
  price?: string;
  description: string;
  image?: { url: string; width: number; height: number };
} & MicroCMSListContent;

// メニュー一覧取得
export async function getMenuList(queries?: MicroCMSQueries) {
  return client.getList<MenuItem>({
    endpoint: "menu",
    queries: { limit: 50, ...queries },
  });
}
