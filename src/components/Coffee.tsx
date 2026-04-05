"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CoffeeItemProps = {
  name: string;
  nameJa: string;
  flavor: string;
  price?: string;
  description: string;
  image?: string;
};

type Props = {
  items: CoffeeItemProps[];
};

export function Coffee({ items }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      const scrollWidth = track.scrollWidth - window.innerWidth;

      gsap.from(headingRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.to(track, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      const cards = track.querySelectorAll(".coffee-card");
      gsap.from(cards, {
        opacity: 0,
        scale: 0.9,
        y: 60,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="coffee"
      className="relative h-screen overflow-hidden bg-[var(--color-bg-coffee)]"
    >
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,_var(--color-accent)_1px,_transparent_1px)] bg-[size:24px_24px]" />

      {/* Large background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none">
        <span className="font-[family-name:var(--font-display)] text-[20vw] font-bold text-white/[0.02] leading-none whitespace-nowrap">
          COFFEE
        </span>
      </div>

      {/* Section heading - centered at top */}
      <div ref={headingRef} className="absolute top-10 left-0 right-0 z-10 text-center">
        <p className="text-[var(--color-accent)] text-sm tracking-[0.3em] uppercase font-[family-name:var(--font-body)] mb-3">
          Coffee
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,5rem)] font-bold leading-[0.9]">
          WOLF COFFEE
        </h2>
        <p className="mt-3 text-sm text-[var(--color-muted)] font-[family-name:var(--font-display-ja)]">
          深く、力強く、野性の一杯を
        </p>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="flex items-end justify-start h-full gap-6 px-[max(2rem,calc((100vw-1152px)/2))] pb-10 pt-44"
      >
        {items.map((item, i) => (
          <div
            key={i}
            className="coffee-card group flex-shrink-0 w-[400px] h-[65vh] relative overflow-hidden cursor-pointer"
          >
            {/* Image area */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#1a1208] to-[#0d0a05] group-hover:scale-[1.03] transition-transform duration-1000 ease-out" />
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="400px"
                className="object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-1000"
              />
            ) : (
              <div className="absolute inset-0 bg-[url('/coffee-placeholder.jpg')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity duration-1000" />
            )}

            {/* Top: Number */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start">
              <span className="font-[family-name:var(--font-display)] text-[4rem] font-bold leading-none text-[var(--color-accent)]/[0.08]">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Bottom: Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-24">
              <p className="text-[var(--color-accent)] text-[10px] tracking-[0.25em] uppercase mb-3 font-[family-name:var(--font-body)]">
                {item.flavor}
              </p>
              <h3 className="font-[family-name:var(--font-display)] text-[1.75rem] font-bold leading-tight mb-2">
                {item.name}
              </h3>
              <p className="text-xs text-[var(--color-muted)] leading-relaxed mb-4 font-[family-name:var(--font-body-ja)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-20 overflow-hidden">
                {item.description}
              </p>
              <div className="flex items-center justify-between">
                {item.price && (
                  <span className="font-[family-name:var(--font-display)] text-xl font-light">
                    {item.price}
                  </span>
                )}
                <span className="text-[10px] tracking-widest text-[var(--color-muted)] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  View →
                </span>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--color-accent)] group-hover:w-full transition-all duration-700" />
          </div>
        ))}
        {/* End spacer */}
        <div className="flex-shrink-0 w-[40vw]" />
      </div>
    </section>
  );
}
