import type { MetadataRoute } from "next";
import { getNewsList } from "@/lib/microcms";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { contents: newsItems } = await getNewsList({ fields: "id,updatedAt" });

  const newsPages = newsItems.map((item) => ({
    url: `${siteUrl}/news/${item.id}`,
    lastModified: new Date(item.updatedAt),
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    ...newsPages,
  ];
}
