import { useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * スクロールに合わせて要素を縦に流す（視差）共通ロジック。
 * 移動量は yPercent（要素自身の高さに対する割合）で、trigger が
 * 画面を通過する間に -travel → +travel を線形に動く。
 * モーション低減設定のときは何もしない。
 */
export function useParallaxY(
  target: RefObject<HTMLElement | null>,
  trigger: RefObject<HTMLElement | null>,
  travel: number,
) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || travel === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        target.current,
        { yPercent: -travel },
        {
          yPercent: travel,
          ease: "none",
          scrollTrigger: {
            trigger: trigger.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, trigger);

    return () => ctx.revert();
  }, [target, trigger, travel]);
}
