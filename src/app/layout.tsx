import type { Metadata } from "next";
import { EB_Garamond, Zen_Old_Mincho } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Marquee } from "@/components/layout/Marquee";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteUrl, INSTAGRAM_URL } from "@/lib/site";

const garamond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const zenOldMincho = Zen_Old_Mincho({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-display-ja",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "WOLF DRIP — Specialty Coffee & Herb Tea",
    template: "%s | WOLF DRIP",
  },
  description:
    "スペシャルティコーヒーと国産ハーブティーのブランド、WOLF DRIP。理屈より先に、舌と鼻で選ぶ。本能を刺激する一杯を届けます。",
  openGraph: {
    title: "WOLF DRIP — Specialty Coffee & Herb Tea",
    description:
      "スペシャルティコーヒーと国産ハーブティーのブランド、WOLF DRIP。理屈より先に、舌と鼻で選ぶ。本能を刺激する一杯を届けます。",
    siteName: "WOLF DRIP",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 実店舗確定後にLocalBusiness（住所・電話・営業時間）へ拡張する
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WOLF DRIP",
    url: siteUrl,
    description:
      "スペシャルティコーヒーと国産ハーブティーのブランド。本能を刺激する一杯を届けます。",
    sameAs: [INSTAGRAM_URL],
  };

  return (
    <html lang="ja" className={`${garamond.variable} ${zenOldMincho.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <Marquee />
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
