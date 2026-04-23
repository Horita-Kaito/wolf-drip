import { Hero } from "@/components/Hero";
import { Concept } from "@/components/Concept";
import { Coffee } from "@/components/Coffee";
import { HerbTea } from "@/components/HerbTea";
import { News } from "@/components/News";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { getNewsList, getMenuList } from "@/lib/microcms";

export const revalidate = 60;

export default async function Home() {
  const [{ contents: newsItems }, { contents: menuItems }] = await Promise.all([
    getNewsList(),
    getMenuList(),
  ]);

  const newsData = newsItems.map((item) => ({
    id: item.id,
    date: new Date(item.date).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replaceAll("/", "."),
    category: item.category,
    title: item.title,
  }));

  const coffeeData = menuItems
    .filter((item) => ([] as string[]).concat(item.type).includes("コーヒー"))
    .map((item) => ({
      name: item.name,
      nameJa: item.nameJa,
      flavor: item.flavor,
      price: item.price,
      description: item.description,
      image: item.image?.url,
    }));

  const herbTeaData = menuItems
    .filter((item) => ([] as string[]).concat(item.type).includes("ティー"))
    .map((item) => ({
      name: item.name,
      nameJa: item.nameJa,
      flavor: item.flavor,
      price: item.price,
      description: item.description,
      image: item.image?.url,
    }));

  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Concept />
      <Coffee items={coffeeData} />
      <HerbTea items={herbTeaData} />
      <News items={newsData} />
      <Contact />
      <Footer />
    </main>
  );
}
