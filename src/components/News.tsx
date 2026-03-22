"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const newsItems = [
  {
    date: "2026.03.15",
    category: "Event",
    title: "Spring Tasting Event — 春のテイスティングイベント開催",
    description:
      "3月末に春の新豆テイスティングイベントを開催します。エチオピアとケニアの新ロットをお楽しみください。",
  },
  {
    date: "2026.03.01",
    category: "New Menu",
    title: "Twilight Hibiscus — 新作ハーブティー登場",
    description:
      "鮮やかなルビー色のハイビスカスティーが新メニューに加わりました。春の訪れとともにお楽しみください。",
  },
  {
    date: "2026.02.14",
    category: "Info",
    title: "営業時間変更のお知らせ",
    description:
      "3月より土日の営業時間を9:00〜21:00に延長いたします。週末もゆっくりお過ごしください。",
  },
  {
    date: "2026.01.20",
    category: "Feature",
    title: "BRUTUS Magazine 掲載",
    description:
      "BRUTUS最新号「東京のコーヒー最前線」特集にてWOLF DRIPが紹介されました。",
  },
];

export function News() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading fade in
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

      // Staggered news items
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
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div ref={headingRef} className="mb-16">
          <p className="text-[var(--color-accent)] text-sm tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-body)]">
            News
          </p>
          <div className="flex items-baseline gap-6 flex-wrap">
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,5rem)] font-bold leading-none">
              Latest
            </h2>
            <span className="text-[var(--color-muted)] text-sm tracking-widest font-[family-name:var(--font-display-ja)]">
              お知らせ
            </span>
          </div>
        </div>

        {/* News list */}
        <div className="space-y-0">
          {newsItems.map((item, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className="group border-b border-neutral-800 py-8 cursor-pointer hover:border-[var(--color-accent)]/30 transition-colors duration-500"
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
                  <h3 className="text-lg font-[family-name:var(--font-body-ja)] mb-2 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-muted)] leading-relaxed font-[family-name:var(--font-body-ja)]">
                    {item.description}
                  </p>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
