"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const conceptLines = [
  { en: "Born from the Wild", ja: "野生から生まれた" },
  { en: "Crafted with Instinct", ja: "本能で淹れる" },
  { en: "Savored with Soul", ja: "魂で味わう" },
];

export function Concept() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalScrollHeight = window.innerHeight * 3;

      // Pin the section
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${totalScrollHeight}`,
        pin: true,
      });

      // Heading reveal
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalScrollHeight * 0.1}`,
          scrub: 1,
        },
      });

      // Divider width animation
      gsap.from(dividerRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: `top top`,
          end: `+=${totalScrollHeight * 0.15}`,
          scrub: 1,
        },
      });

      // Stagger line reveals
      linesRef.current.forEach((line, i) => {
        const startPct = 0.15 + i * 0.2;
        const endPct = startPct + 0.15;

        gsap.from(line, {
          y: 60,
          opacity: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: `+=${totalScrollHeight * startPct}`,
            end: `+=${totalScrollHeight * endPct}`,
            scrub: 1,
          },
        });
      });

      // Body text reveal
      gsap.from(bodyRef.current, {
        y: 40,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: `+=${totalScrollHeight * 0.75}`,
          end: `+=${totalScrollHeight * 0.9}`,
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="concept"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-[var(--color-bg)]"
    >
      <div className="max-w-5xl mx-auto px-8 w-full">
        <p
          ref={headingRef}
          className="text-[var(--color-accent)] text-sm tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-body)]"
        >
          Concept
        </p>

        <div
          ref={dividerRef}
          className="w-16 h-px bg-[var(--color-accent)] mb-16"
        />

        <div className="space-y-12 mb-20">
          {conceptLines.map((line, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) linesRef.current[i] = el;
              }}
              className="flex items-baseline gap-6"
            >
              <span className="font-[family-name:var(--font-display)] text-[clamp(2rem,5vw,5rem)] font-bold leading-none">
                {line.en}
              </span>
              <span className="text-[var(--color-muted)] text-sm tracking-widest font-[family-name:var(--font-display-ja)]">
                {line.ja}
              </span>
            </div>
          ))}
        </div>

        <p
          ref={bodyRef}
          className="text-[var(--color-muted)] text-base leading-[2] max-w-2xl font-[family-name:var(--font-body-ja)]"
        >
          WOLF DRIPは、飼い慣らされた日常から解き放たれる一杯を届ける
          スペシャルティコーヒー＆ハーブティースタンド。
          世界各地から厳選した豆と、自然の力を宿すハーブを、
          野性的な直感と職人の技で一杯に仕上げる。
          ここにあるのは、型にはまらない自由な味わい。
        </p>
      </div>
    </section>
  );
}
