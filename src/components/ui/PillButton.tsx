"use client";

import Link from "next/link";
import { getLenis } from "@/lib/lenis";

type Tone = "light" | "dark";

type Props = {
  href: string;
  children: React.ReactNode;
  /** light: 明るい面の上に置く（線は前景色） / dark: 暗い面の上に置く（線は反転色） */
  tone?: Tone;
  external?: boolean;
  className?: string;
};

const toneClass: Record<Tone, string> = {
  light:
    "border-[var(--color-fg)]/40 text-[var(--color-fg)] hover:text-[var(--color-fg-inverse)] before:bg-[var(--color-fg)]",
  dark: "border-[var(--color-fg-inverse)]/50 text-[var(--color-fg-inverse)] hover:text-[var(--color-fg)] before:bg-[var(--color-fg-inverse)]",
};

/**
 * rhode流のピルボタン。枠線だけの状態から、ホバーで下から面が満ちて色が反転する。
 * href が同一ページ内のアンカーなら Lenis で滑らかに送る。
 */
export function PillButton({
  href,
  children,
  tone = "light",
  external = false,
  className = "",
}: Props) {
  const classes = [
    "group relative inline-flex items-center justify-center overflow-hidden",
    "rounded-full border px-8 py-3.5",
    "text-[11px] uppercase tracking-[0.25em] whitespace-nowrap",
    "transition-colors duration-500 ease-out",
    "before:absolute before:inset-0 before:translate-y-full before:transition-transform before:duration-500 before:ease-out",
    "hover:before:translate-y-0",
    toneClass[tone],
    className,
  ].join(" ");

  const label = <span className="relative z-10">{children}</span>;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {label}
      </a>
    );
  }

  const isAnchor = href.startsWith("#");

  return (
    <Link
      href={href}
      className={classes}
      onClick={(event) => {
        if (!isAnchor) return;
        event.preventDefault();
        getLenis()?.scrollTo(href, { offset: -80 });
      }}
    >
      {label}
    </Link>
  );
}
