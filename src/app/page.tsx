import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
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
        title="深く、静かに、目を覚ます。"
        body="選ぶのはスペシャルティコーヒーだけ。湯気の向こうに、焦げた砂糖と乾いた木の匂い。舌の奥に残る余韻が、次の一杯を呼ぶ。"
        cta={{ href: "#coffee", label: "コーヒーを見る" }}
        tone="coffee"
      />

      <MenuSection
        id="coffee"
        eyebrow="Coffee"
        title="コーヒー"
        lead="深く、力強く、飲むほどに輪郭が出る。"
        items={coffeeData}
        tone="coffee"
      />

      <Statement
        index="02"
        eyebrow="Herb Tea"
        title="湯を注ぐ。草の匂いが立つ。"
        body="使うのは国産のハーブ。青い葉、乾いた土、日が落ちたあとの空気。急がない時間のための一杯。"
        cta={{ href: "#tea", label: "ハーブティーを見る" }}
        tone="herb"
        reverse
      />

      <MenuSection
        id="tea"
        eyebrow="Herb Tea"
        title="ハーブティー"
        lead="国産ハーブ。香りは静かに、長く残る。"
        items={herbTeaData}
        tone="herb"
      />

      <News items={newsData} />
      <Contact />
    </main>
  );
}
