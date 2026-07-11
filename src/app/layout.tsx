import type { Metadata } from "next";
import { EB_Garamond, Zen_Old_Mincho } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { siteUrl } from "@/lib/site";

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
    "スペシャルティコーヒーと国産ハーブティーのブランド、WOLF DRIP。理屈より先に、舌と鼻で選ぶ。言葉になる前の一杯を、そのまま差し出します。",
  openGraph: {
    title: "WOLF DRIP — Specialty Coffee & Herb Tea",
    description:
      "スペシャルティコーヒーと国産ハーブティーのブランド、WOLF DRIP。理屈より先に、舌と鼻で選ぶ。言葉になる前の一杯を、そのまま差し出します。",
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
      "スペシャルティコーヒーと国産ハーブティーのブランド。言葉になる前の一杯を、そのまま差し出します。",
    sameAs: ["https://www.instagram.com/wolfdrip2026"],
  };

  return (
    <html lang="ja" className={`${garamond.variable} ${zenOldMincho.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
