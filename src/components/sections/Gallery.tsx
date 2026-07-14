"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { Reveal } from "@/components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

type GalleryImage = {
  src: string;
  alt: string;
  /** 縦横比。列ごとにリズムを作るため画像単位で持つ */
  ratio: string;
};

// 3列。列ごとにスクロール速度を変え、段違いに流れる見え方をつくる
const COLUMNS: GalleryImage[][] = [
  [
    { src: "/images/portrait-brown.webp", alt: "WOLF DRIP のカップを持つ人物", ratio: "aspect-[4/5]" },
    { src: "/images/cooler.webp", alt: "氷に沈めたアイスコーヒー", ratio: "aspect-[4/5]" },
    { src: "/images/night.webp", alt: "夜の街でカップを持つ人物", ratio: "aspect-[3/4]" },
    { src: "/images/basket.webp", alt: "バスケットに入れたコーヒーバッグ", ratio: "aspect-square" },
  ],
  [
    { src: "/images/bags-coat.webp", alt: "コーヒーバッグを抱える人物", ratio: "aspect-[3/4]" },
    { src: "/images/cups-shelf.webp", alt: "棚に並んだアイスコーヒー", ratio: "aspect-square" },
    { src: "/images/table-still.webp", alt: "テーブルの上のアイスコーヒー", ratio: "aspect-[4/5]" },
    { src: "/images/tee.webp", alt: "WOLF DRIP のTシャツ", ratio: "aspect-[3/4]" },
  ],
  [
    { src: "/images/street.webp", alt: "街を歩く人物とカップ", ratio: "aspect-[3/4]" },
    { src: "/images/ice-cube.webp", alt: "氷の塊に閉じ込めたカップ", ratio: "aspect-[4/5]" },
    { src: "/images/cafe-table.webp", alt: "窓辺のテーブルとコーヒー", ratio: "aspect-[4/5]" },
    { src: "/images/car.webp", alt: "車内でカップを持つ手", ratio: "aspect-square" },
  ],
];

// 中央列を最も速く送る（左右より前に出て見える）
const SPEED = [-60, -140, -90];

export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      // 列単位の視差は横並びになるデスクトップだけ（積み上がる幅では効果がないため）
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        columnsRef.current.forEach((column, i) => {
          if (!column) return;
          gsap.fromTo(
            column,
            { y: -SPEED[i] / 2 },
            {
              y: SPEED[i] / 2,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
      });
      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="overflow-hidden bg-[var(--color-bg)] px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-[100rem]">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-accent-dark)]">
                Gallery
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-5 text-[clamp(1.9rem,4vw,3.25rem)] font-medium leading-[1.3] tracking-[0.06em] font-[family-name:var(--font-body-ja)]">
                手に取った日の、記録。
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p className="max-w-xs text-sm leading-[2] text-[var(--color-muted)] font-[family-name:var(--font-body-ja)]">
              街で、車の中で、窓辺で。持ち歩かれている姿がいちばん似合う。
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {COLUMNS.map((column, columnIndex) => (
            <div
              key={columnIndex}
              ref={(el) => {
                columnsRef.current[columnIndex] = el;
              }}
              className={[
                "flex flex-col gap-3 md:gap-4",
                // 3列目はモバイルでは2列に収まらないため、狭い画面では隠す
                columnIndex === 2 ? "hidden md:flex" : "",
                // 中央列を少し下げて段差をつける
                columnIndex === 1 ? "md:pt-16" : "",
              ].join(" ")}
            >
              {column.map((image) => (
                <Reveal key={image.src}>
                  <ParallaxImage
                    src={image.src}
                    alt={image.alt}
                    strength={6}
                    zoomOnHover
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className={`${image.ratio} w-full rounded-[var(--radius-card)]`}
                  />
                </Reveal>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
