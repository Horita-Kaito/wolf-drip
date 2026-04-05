"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type NewsItem = {
  id: string;
  date: string;
  category: string;
  title: string;
};

type Props = {
  items: NewsItem[];
};

export function News({ items }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    itemsRef.current = [];

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      itemsRef.current.forEach((item, i) => {
        gsap.from(item, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          delay: i * 0.12,
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
      id="news"
      className="py-32 px-8 bg-[var(--color-bg)]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="mb-16 text-center">
          <p className="text-[var(--color-accent)] text-sm tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-body)]">
            News
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,5rem)] font-bold leading-none">
            Latest
          </h2>
          <p className="mt-3 text-sm text-[var(--color-muted)] tracking-widest font-[family-name:var(--font-display-ja)]">
            お知らせ
          </p>
        </div>

        {/* News list */}
        <div className="max-w-4xl mx-auto">
          {items.map((item, i) => (
            <Link
              key={item.id}
              href={`/news/${item.id}`}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className="group block border-b border-[var(--color-border)] py-8 hover:border-[var(--color-accent)]/30 transition-colors duration-500"
            >
              <div className="flex items-start gap-6 md:gap-10">
                {/* Date */}
                <div className="flex-shrink-0 w-28">
                  <span className="text-sm text-[var(--color-muted)] font-[family-name:var(--font-body)] tabular-nums">
                    {item.date}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 border border-[var(--color-accent)]/30 text-[var(--color-accent)] rounded font-[family-name:var(--font-body)]">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-base font-[family-name:var(--font-body-ja)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-4 h-4 text-[var(--color-accent)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
