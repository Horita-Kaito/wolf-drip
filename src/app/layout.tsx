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
  title: "WOLF DRIP — Specialty Coffee",
  description:
    "A specialty coffee experience crafted with precision and passion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${cormorant.variable} ${dmSans.variable} ${shipporiMincho.variable} ${notoSansJP.variable} antialiased`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
