import { Hero } from "@/components/Hero";
import { Concept } from "@/components/Concept";
import { Coffee } from "@/components/Coffee";
import { HerbTea } from "@/components/HerbTea";
import { Location } from "@/components/Location";
import { News } from "@/components/News";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Concept />
      <Coffee />
      <HerbTea />
      <Location />
      <News />
      <Contact />
      <Footer />
    </main>
  );
}
