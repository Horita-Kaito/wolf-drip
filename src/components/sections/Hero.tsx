"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WolfDripLogo } from "@/components/ui/WolfDripLogo";
import { PillButton } from "@/components/ui/PillButton";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const wolf = logoRef.current?.querySelector("#WOLF");
      const dripLetters = logoRef.current?.querySelectorAll("#DRIP .letter");
      const copyItems = copyRef.current ? Array.from(copyRef.current.children) : [];

      if (reduced) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 面がゆっくり収まってから、ロゴ・コピーの順に立ち上がる
      tl.from(fieldRef.current, { scale: 1.06, duration: 1.8, ease: "power2.out" });

      if (wolf) {
        tl.from(wolf, { y: 32, opacity: 0, duration: 1 }, 0.3);
      }
      if (dripLetters?.length) {
        tl.from(
          dripLetters,
          { y: -60, opacity: 0, duration: 1.1, stagger: 0.1 },
          0.7,
        );
      }
      if (copyItems.length) {
        tl.from(copyItems, { y: 24, opacity: 0, duration: 1, stagger: 0.12 }, 1.5);
      }

      // スクロールに合わせて背景の面だけを浅く送る（パララックス）
      gsap.to(fieldRef.current, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="top" className="-mt-20 px-2">
      <div className="grain relative flex h-[100svh] min-h-[36rem] flex-col overflow-hidden rounded-[var(--radius-block)] bg-[var(--color-overlay)]">
        {/* 背景の面。写真素材が決まるまでは色面＋グレインで質感を作る */}
        <div
          ref={fieldRef}
          className="absolute inset-0 scale-110 bg-[radial-gradient(120%_90%_at_20%_10%,#4a382c_0%,transparent_55%),radial-gradient(100%_80%_at_85%_85%,#7a5235_0%,transparent_60%),linear-gradient(180deg,#2a211c_0%,#1c1512_100%)]"
        />

        {/* 中央: ワードマーク */}
        <div className="relative z-10 flex flex-1 items-center justify-center px-6 pt-20">
          <WolfDripLogo
            ref={logoRef}
            className="w-[min(78vw,44rem)] text-[var(--color-fg-inverse)]"
          />
        </div>

        {/* 下部: 宣言コピーとCTA（rhodeのヒーロー同様、面の底に寄せる） */}
        <div
          ref={copyRef}
          className="relative z-10 flex flex-col items-start gap-8 px-6 pb-12 md:flex-row md:items-end md:justify-between md:px-12 md:pb-14"
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-accent-soft)]">
              Specialty Coffee &amp; Herb Tea
            </p>
            <h1 className="mt-5 max-w-[16em] text-[clamp(1.9rem,4.2vw,3.5rem)] font-medium leading-[1.35] tracking-[0.06em] text-[var(--color-fg-inverse)] font-[family-name:var(--font-body-ja)]">
              香りは、理屈より速い。
            </h1>
          </div>

          <PillButton href="#coffee" tone="dark">
            Menu を見る
          </PillButton>
        </div>
      </div>
    </section>
  );
}
