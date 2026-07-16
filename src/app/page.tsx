import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { Band } from "@/components/sections/Band";
import { Gallery } from "@/components/sections/Gallery";
import { ComingSoon } from "@/components/sections/ComingSoon";
import { MenuSection } from "@/components/sections/MenuSection";
import { News } from "@/components/sections/News";
import { Contact } from "@/components/sections/Contact";
import { getNewsList, getMenuList } from "@/lib/microcms";

export const revalidate = 60;

export default async function Home() {
  const [{ contents: newsItems }, { contents: menuItems }] = await Promise.all([
    getNewsList(),
    getMenuList(),
  ]);

  const newsData = newsItems.map((item) => ({
    id: item.id,
    date: new Date(item.date)
      .toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replaceAll("/", "."),
    // category（microCMS側は日本語）は表示しないため渡さない
    title: item.title,
  }));

  // nameJa / description は意図的に渡していない（表記は英語で統一、産地・焙煎度は未確定。MenuSection.tsx参照）
  const toCard = (item: (typeof menuItems)[number]) => ({
    name: item.name,
    flavor: item.flavor,
    price: item.price,
    image: item.image?.url,
  });

  const coffeeData = menuItems
    .filter((item) => ([] as string[]).concat(item.type).includes("コーヒー"))
    .map(toCard);

  const herbTeaData = menuItems
    .filter((item) => ([] as string[]).concat(item.type).includes("ティー"))
    .map(toCard);

  // 先頭カードの画像は一時的にローカル素材で上書き。
  // APIキーにmicroCMS書き込み権限がないためコード側で対応。CMSに正式画像を登録したらこの上書きを削除する
  if (herbTeaData[0]) {
    herbTeaData[0].image = "/herb-tea-top.webp";
  }

  return (
    // overflow-x は body 側で抑えている。ここで overflow を張ると
    // Hero の -mt-20（ヘッダーの下に潜り込ませる負マージン）がクリップされる
    <main>
      <Hero />

      <Statement
        index="01"
        eyebrow="Coffee"
        title="Deep, and quiet."
        body="Original blend coffee."
        cta={{ href: "#coffee", label: "View Coffee" }}
        image={{ src: "/images/beans.webp", alt: "焙煎したコーヒー豆" }}
      />

      <MenuSection
        id="coffee"
        title="Coffee"
        items={coffeeData}
        tone="coffee"
      />

      {/* 主役はコーヒーだが、ハーブティーもコーヒーの直後に置いて埋もれさせない */}
      <Statement
        index="02"
        eyebrow="Herb Tea"
        title="Pour. It rises."
        body="Herb tea, grown in Japan."
        cta={{ href: "#tea", label: "View Herb Tea" }}
        image={{
          src: "/images/towels-ledge.webp",
          alt: "窓辺に置かれたタオルとカップ",
        }}
        reverse
      />

      <MenuSection
        id="tea"
        title="Herb Tea"
        items={herbTeaData}
        tone="herb"
      />

      <Band
        image={{
          src: "/images/canvas-logo.webp",
          alt: "布に型押しされた WOLF DRIP のロゴ",
        }}
        eyebrow="Before Reason"
        title="Reason can wait."
      />

      <Gallery />

      <ComingSoon />

      <News items={newsData} />
      <Contact />
    </main>
  );
}
