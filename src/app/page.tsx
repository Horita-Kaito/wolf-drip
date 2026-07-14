import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { Band } from "@/components/sections/Band";
import { Gallery } from "@/components/sections/Gallery";
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
    category: item.category,
    title: item.title,
  }));

  const toCard = (item: (typeof menuItems)[number]) => ({
    name: item.name,
    nameJa: item.nameJa,
    flavor: item.flavor,
    price: item.price,
    description: item.description,
    image: item.image?.url,
  });

  const coffeeData = menuItems
    .filter((item) => ([] as string[]).concat(item.type).includes("コーヒー"))
    .map(toCard);

  const herbTeaData = menuItems
    .filter((item) => ([] as string[]).concat(item.type).includes("ティー"))
    .map(toCard);

  return (
    // overflow-x は body 側で抑えている。ここで overflow を張ると
    // Hero の -mt-20（ヘッダーの下に潜り込ませる負マージン）がクリップされる
    <main>
      <Hero />

      <Statement
        index="01"
        eyebrow="Coffee"
        title="濃く、静かに。"
        body="オリジナルブレンドのコーヒー。"
        cta={{ href: "#coffee", label: "コーヒーを見る" }}
        image={{
          src: "/images/pour-splash.webp",
          alt: "カップに注がれ、跳ねるコーヒー",
        }}
        inset={{ src: "/images/beans.webp", alt: "焙煎したコーヒー豆" }}
      />

      <MenuSection
        id="coffee"
        eyebrow="Coffee"
        title="コーヒー"
        items={coffeeData}
        tone="coffee"
      />

      <Band
        image={{
          src: "/images/canvas-logo.webp",
          alt: "布に型押しされた WOLF DRIP のロゴ",
        }}
        eyebrow="Before Reason"
        title="理由は、あとでいい。"
      />

      <Gallery />

      <Statement
        index="02"
        eyebrow="Herb Tea"
        title="湯を注ぐ。香りが立つ。"
        body="国産ハーブのお茶。"
        cta={{ href: "#tea", label: "ハーブティーを見る" }}
        image={{
          src: "/images/towels-ledge.webp",
          alt: "窓辺に置かれたタオルとカップ",
        }}
        inset={{
          src: "/images/table-still.webp",
          alt: "テーブルの上のアイスコーヒー",
        }}
        reverse
      />

      <MenuSection
        id="tea"
        eyebrow="Herb Tea"
        title="ハーブティー"
        items={herbTeaData}
        tone="herb"
      />

      <News items={newsData} />
      <Contact />
    </main>
  );
}
