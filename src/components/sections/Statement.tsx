"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "@/components/ui/Reveal";
import { PillButton } from "@/components/ui/PillButton";

gsap.registerPlugin(ScrollTrigger);

type Tone = "coffee" | "herb";

type Props = {
  /** メディア面に添える連番（01, 02...） */
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: { href: string; label: string };
  tone: Tone;
  /** true でメディアを右に置く（2枚目以降を左右交互にするため） */
  reverse?: boolean;
};

const toneField: Record<Tone, string> = {
  coffee:
    "bg-[radial-gradient(90%_70%_at_25%_20%,#7a5235_0%,transparent_60%),linear-gradient(160deg,#3a2c23_0%,#1c1512_100%)]",
  herb: "bg-[radial-gradient(90%_70%_at_75%_25%,#8f875f_0%,transparent_60%),linear-gradient(160deg,#5f5434_0%,#2f2a1c_100%)]",
};

/**
 * rhode の image-with-content を踏襲したブランドステートメント。
 * 左右どちらかに大きなメディア面、反対側に短い断言と情景のコピーを置く。
 */
export function Statement({
  index,
  eyebrow,
  title,
  body,
  cta,
  tone,
  reverse = false,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.to(fieldRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[var(--color-bg)] px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto grid max-w-[100rem] items-center gap-10 md:grid-cols-2 md:gap-16">
        {/* メディア面 */}
        <Reveal
          className={[
            "grain relative aspect-[4/5] overflow-hidden rounded-[var(--radius-block)] md:aspect-[5/6]",
            reverse ? "md:order-2" : "",
          ].join(" ")}
        >
          <div
            ref={fieldRef}
            className={`absolute inset-0 scale-110 ${toneField[tone]}`}
          />
          <span className="absolute bottom-6 left-6 z-10 text-[10px] uppercase tracking-[0.3em] text-[var(--color-fg-inverse)]/70">
            {index} — {eyebrow}
          </span>
        </Reveal>

        {/* コピー面 */}
        <div className={reverse ? "md:order-1 md:pr-8" : "md:pl-8"}>
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-accent-dark)]">
              {eyebrow}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-6 text-[clamp(1.7rem,3.2vw,2.75rem)] font-medium leading-[1.5] tracking-[0.06em] font-[family-name:var(--font-body-ja)]">
              {title}
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-8 max-w-md text-sm leading-[2.2] text-[var(--color-muted)] font-[family-name:var(--font-body-ja)]">
              {body}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-10">
              <PillButton href={cta.href}>{cta.label}</PillButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
