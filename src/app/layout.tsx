import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  DM_Sans,
  Shippori_Mincho,
  Noto_Sans_JP,
} from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-ja",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-body-ja",
});

export const metadata: Metadata = {
  title: {
    default: "WOLF DRIP — Specialty Coffee & Herb Tea",
    template: "%s | WOLF DRIP",
  },
  description:
    "WOLF DRIPは高品質なサービスと特別な一杯をお届けします。コロンビアを中心に厳選したコーヒーと国内産のハーブを使用したティー。",
  openGraph: {
    title: "WOLF DRIP — Specialty Coffee & Herb Tea",
    description:
      "WOLF DRIPは高品質なサービスと特別な一杯をお届けします。コロンビアを中心に厳選したコーヒーと国内産のハーブを使用したティー。",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "WOLF DRIP",
    description:
      "WOLF DRIPは高品質なサービスと特別な一杯をお届けします。コロンビアを中心に厳選したコーヒーと国内産のハーブを使用したティー。",
    address: {
      "@type": "PostalAddress",
      streetAddress: "神南1-2-3 WOLF DRIP BLDG. 1F",
      addressLocality: "渋谷区",
      addressRegion: "東京都",
      addressCountry: "JP",
    },
    telephone: "03-1234-5678",
    sameAs: [
      "https://www.instagram.com/wolfdrip2026",
    ],
  };

  return (
    <html lang="ja">
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${shipporiMincho.variable} ${notoSansJP.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
