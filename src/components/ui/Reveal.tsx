"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: React.ReactNode;
  /** 秒。同じ行に並ぶ要素をずらして出したいときに使う */
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span";
};

/**
 * サイト全体で共通のスクロール表示モーション。
 * 初期状態（opacity:0 / y:24px）は globals.css の [data-reveal] が持ち、
 * ここでは表示側だけをGSAPで動かす（ハイドレーション前のちらつきを避けるため）。
 */
export function Reveal({ children, delay = 0, className = "", as = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    }, el);

    return () => ctx.revert();
  }, [delay]);

  const Tag = as;

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLLIElement & HTMLSpanElement>}
      data-reveal=""
      className={className}
    >
      {children}
    </Tag>
  );
}
