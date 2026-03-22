"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const infoItems = [
  {
    label: "Address",
    labelJa: "住所",
    content: "東京都渋谷区神南1-2-3 WOLF DRIP BLDG. 1F",
  },
  {
    label: "Hours",
    labelJa: "営業時間",
    content: "Mon – Fri: 8:00 – 20:00 / Sat – Sun: 9:00 – 21:00",
  },
  {
    label: "Closed",
    labelJa: "定休日",
    content: "不定休",
  },
  {
    label: "Phone",
    labelJa: "電話",
    content: "03-1234-5678",
  },
];

export function Location() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const infoItemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
        x: -80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(rightRef.current, {
        x: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      infoItemsRef.current.forEach((item, i) => {
        gsap.from(item, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="location"
      className="py-32 px-8 bg-[var(--color-bg)]"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        {/* Left: Info */}
        <div ref={leftRef}>
          <p className="text-[var(--color-accent)] text-sm tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-body)]">
            Location
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,5rem)] font-bold mb-4 leading-none">
            Visit Us
          </h2>
          <p className="text-[var(--color-muted)] text-sm tracking-widest mb-12 font-[family-name:var(--font-display-ja)]">
            店舗情報
          </p>

          <div className="space-y-8">
            {infoItems.map((item, i) => (
              <div
                key={item.label}
                ref={(el) => {
                  if (el) infoItemsRef.current[i] = el;
                }}
                className="border-b border-[var(--color-border)] pb-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-[var(--color-accent)] text-xs tracking-[0.2em] uppercase font-[family-name:var(--font-body)]">
                    {item.label}
                  </h4>
                  <span className="text-[var(--color-muted)] text-[10px] font-[family-name:var(--font-body-ja)]">
                    {item.labelJa}
                  </span>
                </div>
                <p className="text-base font-[family-name:var(--font-body-ja)] leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Map placeholder */}
        <div ref={rightRef} className="sticky top-32">
          <div className="aspect-[4/3] rounded-2xl bg-neutral-900 border border-[var(--color-border)] flex items-center justify-center overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800/50 to-neutral-900" />
            <div className="relative flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-[var(--color-accent)]/30 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-[var(--color-accent)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <span className="text-[var(--color-muted)] text-sm tracking-widest uppercase">
                Map
              </span>
            </div>
          </div>

          <div className="mt-6 p-6 rounded-xl bg-neutral-900/50 border border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-muted)] leading-relaxed font-[family-name:var(--font-body-ja)]">
              渋谷駅ハチ公口より徒歩5分。
              神南エリアの路地裏、緑に囲まれた隠れ家的空間。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
