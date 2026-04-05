import type { MetadataRoute } from "next";
import { getNewsList } from "@/lib/microcms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { contents: newsItems } = await getNewsList({ fields: "id,updatedAt" });

  const newsPages = newsItems.map((item) => ({
    url: `https://example.com/news/${item.id}`, // ドメイン決定後に変更
    lastModified: new Date(item.updatedAt),
  }));

  return [
    {
      url: "https://example.com", // ドメイン決定後に変更
      lastModified: new Date(),
    },
    ...newsPages,
  ];
}
