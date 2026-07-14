"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export type MenuCardItem = {
  name: string;
  nameJa: string;
  flavor: string;
  price?: string;
  description: string;
  image?: string;
};

type Tone = "coffee" | "herb";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  items: MenuCardItem[];
  tone: Tone;
};

const toneSection: Record<Tone, string> = {
  coffee: "bg-[var(--color-bg-coffee)]",
  herb: "bg-[var(--color-bg-herb)]",
};

const tonePlaceholder: Record<Tone, string> = {
  coffee: "bg-[linear-gradient(160deg,#7a5235_0%,#2a211c_100%)]",
  herb: "bg-[linear-gradient(160deg,#8f875f_0%,#3a3422_100%)]",
};

/**
 * rhode のコレクションスライダーに合わせた横スライダー。
 * スクロールジャック（GSAPのpin）はやめ、指・トラックパッドでそのまま引ける
 * ネイティブの横スクロール＋スナップに置き換えている。
 */
export function MenuSection({ id, eyebrow, title, items, tone }: Props) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncEdges = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setAtStart(track.scrollLeft <= 8);
    setAtEnd(track.scrollLeft >= track.scrollWidth - track.clientWidth - 8);
  }, []);

  useEffect(() => {
    syncEdges();
    window.addEventListener("resize", syncEdges);
    return () => window.removeEventListener("resize", syncEdges);
  }, [syncEdges, items.length]);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("li");
    const step = card ? card.clientWidth + 16 : track.clientWidth * 0.8;
    track.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <section
      id={id}
      className={`overflow-hidden py-20 md:py-28 ${toneSection[tone]}`}
    >
      {/* 見出し行: 左に文言、右に送りボタン */}
      <div className="mx-auto flex max-w-[100rem] items-end justify-between gap-8 px-5 md:px-8">
        <div>
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-accent-dark)]">
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-[clamp(1.9rem,4vw,3.25rem)] font-medium leading-[1.3] tracking-[0.06em] font-[family-name:var(--font-body-ja)]">
              {title}
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.16} className="hidden shrink-0 gap-3 md:flex">
          {([-1, 1] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              onClick={() => scrollByCard(direction)}
              disabled={direction === -1 ? atStart : atEnd}
              aria-label={direction === -1 ? "前のメニュー" : "次のメニュー"}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-fg)]/30 text-[var(--color-fg)] transition-all duration-300 hover:border-[var(--color-fg)] disabled:opacity-25"
            >
              <svg
                className={`h-4 w-4 ${direction === -1 ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.25}
                  d="M14 5l7 7-7 7M21 12H3"
                />
              </svg>
            </button>
          ))}
        </Reveal>
      </div>

      {/* カードトラック */}
      <ul
        ref={trackRef}
        onScroll={syncEdges}
        /* scroll-px を効かせないと、スナップが左のパディング分を飲み込んで
           先頭カードが画面端に貼り付く */
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 md:scroll-px-8 md:px-8"
      >
        {items.map((item, i) => (
          <Reveal
            as="li"
            key={`${item.name}-${i}`}
            delay={Math.min(i, 3) * 0.08}
            className="group w-[74vw] shrink-0 snap-start sm:w-[46vw] lg:w-[calc((100%-2rem)/3)] xl:w-[calc((100%-3rem)/4)]"
          >
            {/* 画像面 */}
            {item.image ? (
              <ParallaxImage
                src={item.image}
                alt={item.name}
                strength={5}
                zoomOnHover
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 46vw, 74vw"
                className="aspect-[4/5] w-full rounded-[var(--radius-card)]"
              >
                <span className="absolute left-4 top-4 z-10 text-[10px] uppercase tracking-[0.25em] text-[var(--color-fg-inverse)]/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </ParallaxImage>
            ) : (
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)]">
                <div
                  className={`grain absolute inset-0 ${tonePlaceholder[tone]} transition-transform duration-[1200ms] ease-out group-hover:scale-105`}
                />
                <span className="absolute left-4 top-4 z-10 text-[10px] uppercase tracking-[0.25em] text-[var(--color-fg-inverse)]/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            )}

            {/* 情報面 */}
            <div className="px-1 pt-6">
              {item.flavor && (
                <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-[var(--color-accent-dark)]">
                  {item.flavor}
                </p>
              )}
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-xl font-medium tracking-[0.04em]">
                  {item.name}
                </h3>
                {item.price && (
                  <span className="shrink-0 text-sm tabular-nums text-[var(--color-muted)]">
                    {item.price}
                  </span>
                )}
              </div>
              {item.nameJa && (
                <p className="mt-2 text-xs tracking-[0.1em] text-[var(--color-muted)] font-[family-name:var(--font-body-ja)]">
                  {item.nameJa}
                </p>
              )}
              {/* microCMSのdescription（産地・焙煎度）は、まだ確定していない事実まで
                  読み手に伝えてしまうため出さない。決まり次第ここに戻す */}
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
