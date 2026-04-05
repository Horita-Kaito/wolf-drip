"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const conceptLines = [
  "Born from the Wild",
  "Unmatched Quality Service",
  "Special Drip Delivered to You",
];

export function Concept() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLDivElement[]>([]);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    linesRef.current = [];

    const ctx = gsap.context(() => {
      // Heading fade in
      gsap.from(headingRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Divider grow
      gsap.from(dividerRef.current, {
        scaleX: 0,
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Concept lines stagger
      linesRef.current.forEach((line, i) => {
        gsap.from(line, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: i * 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        });
      });

      // Body text
      gsap.from(bodyRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: bodyRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="concept"
      className="py-40 px-8 bg-[var(--color-bg)]"
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <p
          ref={headingRef}
          className="text-[var(--color-accent)] text-sm tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-body)]"
        >
          Concept
        </p>

        <div
          ref={dividerRef}
          className="w-16 h-px bg-[var(--color-accent)] mb-16 origin-center"
        />

        <div className="flex flex-col items-center gap-10 mb-16">
          {conceptLines.map((line, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) linesRef.current[i] = el;
              }}
              className="flex flex-col items-center gap-2"
            >
              <span className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,4vw,4rem)] font-bold leading-none">
                {line}
              </span>
            </div>
          ))}
        </div>

        <p
          ref={bodyRef}
          className="text-[var(--color-muted)] text-sm leading-[2] max-w-2xl text-center font-[family-name:var(--font-body-ja)]"
        >
          WOLF DRIPは高品質なサービスと特別な一杯をお届けします。
          コロンビアを中心に厳選したコーヒーと国内産のハーブを使用したティー。
          ここにあるのは型にハマらない自由な味わい。
        </p>
      </div>
    </section>
  );
}
