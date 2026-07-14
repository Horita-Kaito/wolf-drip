"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WolfDripLogo } from "@/components/ui/WolfDripLogo";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { INSTAGRAM_URL } from "@/lib/site";
import { getLenis } from "@/lib/lenis";
import { HEADER_HEIGHT } from "@/lib/layout";

const NAV = [
  { hash: "coffee", label: "Coffee" },
  { hash: "tea", label: "Herb Tea" },
  { hash: "news", label: "News" },
  { hash: "contact", label: "Contact" },
] as const;

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // メニューを開いている間は背後のスクロールを止める
  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) lenis?.stop();
    else lenis?.start();
    return () => lenis?.start();
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // ヒーローの上に重なっている間は白抜き、スクロール後（とメニュー展開中）はクリーム地に前景色
  const overlay = isHome && !scrolled && !menuOpen;

  const handleAnchor = (
    event: React.MouseEvent<HTMLAnchorElement>,
    hash: string,
  ) => {
    if (!isHome) return; // 他ページからは通常遷移（/#hash）に任せる
    setMenuOpen(false);

    // Lenisが未初期化ならブラウザ既定のアンカー遷移に任せる。
    // 位置は globals.css の scroll-margin-top が合わせてくれる
    const lenis = getLenis();
    if (!lenis) return;

    event.preventDefault();
    lenis.scrollTo(`#${hash}`, { offset: -HEADER_HEIGHT });
  };

  const tint = overlay
    ? "text-[var(--color-fg-inverse)]"
    : "text-[var(--color-fg)]";

  const linkClass = `text-[11px] uppercase tracking-[0.25em] transition-opacity duration-300 hover:opacity-60 ${tint}`;

  const href = (hash: string) => (isHome ? `#${hash}` : `/#${hash}`);

  return (
    <>
      <header
        className={[
          "sticky top-0 z-50 transition-colors duration-500",
          overlay
            ? "bg-transparent"
            : "border-b border-[var(--color-border)]/40 bg-[var(--color-bg)]/85 backdrop-blur-md",
        ].join(" ")}
      >
        <div className="mx-auto grid h-20 max-w-[110rem] grid-cols-[1fr_auto_1fr] items-center px-5 md:px-8">
          {/* 左: デスクトップは水平ナビ、モバイルはハンバーガー */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.slice(0, 2).map((item) => (
              <a
                key={item.hash}
                href={href(item.hash)}
                onClick={(e) => handleAnchor(e, item.hash)}
                className={linkClass}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={menuOpen}
            className={`flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden ${tint}`}
          >
            <span
              className={[
                "block h-px w-5 bg-current transition-transform duration-300",
                menuOpen ? "translate-y-[3px] rotate-45" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-px w-5 bg-current transition-transform duration-300",
                menuOpen ? "-translate-y-[3px] -rotate-45" : "",
              ].join(" ")}
            />
          </button>

          {/* 中央: ワードマーク */}
          <Link
            href="/"
            aria-label="WOLF DRIP ホームへ"
            className="justify-self-center"
          >
            <WolfDripLogo
              className={`w-32 transition-colors duration-500 md:w-40 ${tint}`}
            />
          </Link>

          {/* 右: 残りのナビ + Instagram */}
          <div className="flex items-center justify-end gap-8">
            {NAV.slice(2).map((item) => (
              <a
                key={item.hash}
                href={href(item.hash)}
                onClick={(e) => handleAnchor(e, item.hash)}
                className={`hidden md:inline ${linkClass}`}
              >
                {item.label}
              </a>
            ))}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className={`transition-opacity duration-300 hover:opacity-60 ${tint}`}
            >
              <InstagramIcon className="h-[18px] w-[18px]" />
            </a>
          </div>
        </div>
      </header>

      {/* モバイル: 全画面メニュー。
          ヘッダーの backdrop-blur は fixed の基準（containing block）になるため、
          パネルはヘッダーの外に出さないとヘッダー内に閉じ込められる。
          閉じている間は inert でキーボードフォーカスと読み上げの対象から外す
          （opacity:0 だけだと、見えないリンクにTabが入る） */}
      <div
        inert={!menuOpen}
        className={[
          // top-20 はヘッダー高（HEADER_HEIGHT / --header-h）と揃える
          "fixed inset-x-0 bottom-0 top-20 z-40 bg-[var(--color-bg)] px-6 pt-10 transition-opacity duration-300 md:hidden",
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        <nav className="flex flex-col">
          {NAV.map((item) => (
            <a
              key={item.hash}
              href={href(item.hash)}
              onClick={(e) => handleAnchor(e, item.hash)}
              className="border-b border-[var(--color-border)]/50 py-5 text-2xl tracking-[0.1em] text-[var(--color-fg)]"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
