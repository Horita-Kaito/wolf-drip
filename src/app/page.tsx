import { Hero } from "@/components/Hero";
import { Concept } from "@/components/Concept";
import { Coffee } from "@/components/Coffee";
import { HerbTea } from "@/components/HerbTea";
import { Location } from "@/components/Location";
import { News } from "@/components/News";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { getNewsList } from "@/lib/microcms";

export default async function Home() {
  const { contents: newsItems } = await getNewsList();

  const items = newsItems.map((item) => ({
    date: new Date(item.date).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replaceAll("/", "."),
    category: item.category,
    title: item.title,
    description: item.description,
  }));

  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Concept />
      <Coffee />
      <HerbTea />
      <Location />
      <News items={items} />
      <Contact />
      <Footer />
    </main>
  );
}
