"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type HerbTeaItemProps = {
  name: string;
  nameJa: string;
  flavor: string;
  price?: string;
  description: string;
  image?: string;
};

type Props = {
  items: HerbTeaItemProps[];
};

export function HerbTea({ items }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    cardsRef.current = [];

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(lineRef.current, {
        scaleX: 0,
        duration: 1.5,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      cardsRef.current.forEach((card, i) => {
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
          delay: (i % 2) * 0.15,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="herbtea"
      className="py-32 px-8 relative overflow-hidden bg-[var(--color-bg-herb)]"
    >
      {/* Soft botanical gradient bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(138,154,123,0.06)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(138,154,123,0.04)_0%,_transparent_60%)]" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div ref={headingRef} className="mb-6 text-center">
          <p className="text-[var(--color-herb)] text-sm tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-body)]">
            Herb Tea
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.5rem)] font-light leading-tight italic">
            WOLF HERBS
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)] tracking-[0.2em] font-[family-name:var(--font-display-ja)]">
            自然が宿す、野生のハーブティー
          </p>
        </div>

        {/* Divider */}
        <div
          ref={lineRef}
          className="w-24 h-px bg-[var(--color-herb)]/40 mx-auto mb-20 origin-center"
        />

        {/* Two-column list layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0">
          {items.map((item, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="group py-8 border-b border-[var(--color-border)] hover:border-[var(--color-herb)]/30 transition-colors duration-500 cursor-pointer"
            >
              <div className={item.image ? "flex gap-5" : ""}>
                {/* Image */}
                {item.image && (
                  <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-neutral-900">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  {/* Name row */}
                  <div className="flex items-baseline justify-between mb-2">
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-normal italic group-hover:text-[var(--color-herb)] transition-colors duration-500">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-[var(--color-muted)] font-[family-name:var(--font-display-ja)] mt-0.5">
                        {item.nameJa}
                      </p>
                    </div>
                    {item.price && (
                      <span className="font-[family-name:var(--font-display)] text-base font-light text-[var(--color-muted)] group-hover:text-[var(--color-fg)] transition-colors duration-500">
                        {item.price}
                      </span>
                    )}
                  </div>

                  {/* Flavor tags */}
                  <p className="text-[9px] tracking-[0.2em] uppercase text-[var(--color-herb)]/70 font-[family-name:var(--font-body)] mb-2">
                    {item.flavor}
                  </p>

                  {/* Description - reveals on hover */}
                  <p className="text-xs text-[var(--color-muted)] leading-relaxed font-[family-name:var(--font-body-ja)] max-h-0 opacity-0 group-hover:max-h-16 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
