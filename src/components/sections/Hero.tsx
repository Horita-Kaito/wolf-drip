"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { WolfDripLogo } from "@/components/ui/WolfDripLogo";
import { PillButton } from "@/components/ui/PillButton";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

// スクロール連動（背景写真の視差）は ParallaxImage 側が持つ。
// ここは読み込み時のタイムラインだけなので ScrollTrigger は不要
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
      <ParallaxImage
        src="/images/wolf-dog.webp"
        alt="WOLF DRIP のカップの前に座る白いウルフドッグ"
        priority
        strength={6}
        // 縦長素材を横長に切るので、顔が残る位置で止める
        objectPosition="center 32%"
        sizes="100vw"
        className="flex h-[100svh] min-h-[36rem] flex-col justify-end rounded-[var(--radius-block)]"
      >
        {/* 文字を読ませるためのスクリム。素材が明るいので下半分を強めに落とす */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,21,18,0.35)_0%,rgba(28,21,18,0.1)_30%,rgba(28,21,18,0.55)_70%,rgba(28,21,18,0.85)_100%)]" />

        <div className="relative z-10 flex flex-col items-start gap-10 px-6 pb-12 md:flex-row md:items-end md:justify-between md:px-12 md:pb-14">
          <div>
            {/* ワードマークは被写体を避けて下段に。DRIPは一文字ずつ落ちる */}
            <WolfDripLogo
              ref={logoRef}
              className="w-[min(70vw,26rem)] text-[var(--color-fg-inverse)]"
            />

            <div ref={copyRef} className="mt-8">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-accent-soft)]">
                Coffee &amp; Herb Tea
              </p>
              {/* 抽象的な文言は英語で置く（説明的にならず、印象だけが残る） */}
              <h1 className="mt-5 max-w-[14em] text-[clamp(2.1rem,4.4vw,3.75rem)] font-medium leading-[1.15] tracking-[0.01em] text-[var(--color-fg-inverse)] font-[family-name:var(--font-display)]">
                Scent arrives before reason.
              </h1>
            </div>
          </div>

          <PillButton href="#coffee" tone="dark">
            Menu
          </PillButton>
        </div>
      </ParallaxImage>
    </section>
  );
}
