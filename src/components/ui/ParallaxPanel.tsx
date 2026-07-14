"use client";

import { useRef } from "react";
import { useParallaxY } from "@/components/ui/useParallaxY";

type Props = {
  /** 面の見た目・位置（色・角丸・オフセット）は呼び出し側のクラスで決める */
  className?: string;
  /** 面の移動量（%）。写真側と変えることで層が分かれて見える */
  travel?: number;
};

/**
 * 写真の後ろに敷く色面。写真とは別の速度で流し、静かに奥行きを出す。
 */
export function ParallaxPanel({ className = "", travel = 4 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useParallaxY(ref, ref, travel);

  return <div ref={ref} aria-hidden="true" className={className} />;
}
