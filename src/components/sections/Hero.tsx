"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { WolfDripLogo } from "@/components/ui/WolfDripLogo";
import { PillButton } from "@/components/ui/PillButton";

// スクロール連動はないため ScrollTrigger は不要。
// ヒーローの写真は検討中のため、いまは色面（グラデーション＋グレイン）で置いている。
// 素材が決まったら ParallaxImage に差し替えるだけでよい（他セクションと同じ作り）
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const wolf = logoRef.current?.querySelector("#WOLF");
      const dripLetters = logoRef.current?.querySelectorAll("#DRIP .letter");
      const copyItems = copyRef.current ? Array.from(copyRef.current.children) : [];

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (wolf) {
        tl.from(wolf, { y: 24, opacity: 0, duration: 0.9 }, 0.2);
      }
      if (dripLetters?.length) {
        tl.from(
          dripLetters,
          { y: -48, opacity: 0, duration: 1, stagger: 0.09 },
          0.5,
        );
      }
      if (copyItems.length) {
        tl.from(copyItems, { y: 24, opacity: 0, duration: 1, stagger: 0.12 }, 1.1);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="top" className="-mt-20 px-2">
      <div className="grain relative flex h-[100svh] min-h-[36rem] flex-col justify-end overflow-hidden rounded-[var(--radius-block)] bg-[radial-gradient(120%_90%_at_20%_10%,#4a382c_0%,transparent_55%),radial-gradient(100%_80%_at_85%_85%,#7a5235_0%,transparent_60%),linear-gradient(180deg,#2a211c_0%,#1c1512_100%)]">
        {/* ワードマークは面の中央に大きく置く */}
        <div className="flex flex-1 items-center justify-center px-6 pt-20">
          <WolfDripLogo
            ref={logoRef}
            className="w-[min(76vw,42rem)] text-[var(--color-fg-inverse)]"
          />
        </div>

        <div
          ref={copyRef}
          className="flex flex-col items-start gap-8 px-6 pb-12 md:flex-row md:items-end md:justify-between md:px-12 md:pb-14"
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-accent-soft)]">
              Coffee &amp; Herb Tea
            </p>
            {/* 抽象的な文言は英語で置く（説明的にならず、印象だけが残る） */}
            <h1 className="mt-5 max-w-[14em] text-[clamp(2.1rem,4.4vw,3.75rem)] font-medium leading-[1.15] tracking-[0.01em] text-[var(--color-fg-inverse)] font-[family-name:var(--font-display)]">
              Scent arrives before reason.
            </h1>
          </div>

          <PillButton href="#coffee" tone="dark">
            Menu
          </PillButton>
        </div>
      </div>
    </section>
  );
}
