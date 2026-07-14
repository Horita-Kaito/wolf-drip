"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  src: string;
  alt: string;
  /** 枠側のクラス（アスペクト比・角丸・サイズはここで決める） */
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** 枠に対して画像が上下に動く量（%）。大きいほど視差が強い */
  strength?: number;
  /** ホバーで寄る（カード用） */
  zoomOnHover?: boolean;
  /** クロップ位置（縦長素材を横長に切るとき、被写体を残すために使う） */
  objectPosition?: string;
  children?: React.ReactNode;
};

/**
 * 枠の中で画像だけがスクロールに合わせてゆっくり流れる、ギャラリー用の視差画像。
 * 画像は枠より縦に大きく描いておき（scale）、その余白を使って動かすので隙間が出ない。
 */
export function ParallaxImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  strength = 8,
  zoomOnHover = false,
  objectPosition = "center",
  children,
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        { yPercent: -strength },
        {
          yPercent: strength,
          ease: "none",
          scrollTrigger: {
            trigger: frameRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, frameRef);

    return () => ctx.revert();
  }, [strength]);

  return (
    <div
      ref={frameRef}
      className={`group relative overflow-hidden bg-[var(--color-surface-strong)] ${className}`}
    >
      <div
        ref={innerRef}
        className="absolute inset-0"
        // 視差で動かす分だけ縦に余らせる
        style={{ top: `-${strength}%`, bottom: `-${strength}%` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectPosition }}
          className={[
            "object-cover",
            zoomOnHover
              ? "transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
              : "",
          ].join(" ")}
        />
      </div>
      {children}
    </div>
  );
}
