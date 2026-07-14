"use client";

import { useRef } from "react";
import Image from "next/image";
import { useParallaxY } from "@/components/ui/useParallaxY";

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
 * 画像を載せた内側divを枠より縦に大きく取り（top/bottomを -strength% に引き伸ばす）、
 * その余白の範囲だけ動かすので、動かしても枠に隙間ができない。
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

  // yPercent は「内側div自身の高さ」に対する割合。内側divは枠より
  // (1 + 2*strength/100) 倍高いので、そのまま strength を渡すと確保した余白を
  // 越えてしまい、両端で下地が覗く。ここで割り戻す。
  const travel = (strength * 100) / (100 + 2 * strength);

  useParallaxY(innerRef, frameRef, travel);

  // 呼び出し側が absolute 等を渡すことがある。Tailwindの生成CSSでは
  // .relative が .absolute より後に来るため、無条件に relative を足すと
  // 渡された位置指定が負ける。位置指定が来ていないときだけ relative を補う。
  const hasPositionClass = /(^|\s)(absolute|fixed|sticky|static)(\s|$)/.test(
    className,
  );

  return (
    <div
      ref={frameRef}
      className={`group ${hasPositionClass ? "" : "relative"} overflow-hidden bg-[var(--color-surface-strong)] ${className}`}
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
