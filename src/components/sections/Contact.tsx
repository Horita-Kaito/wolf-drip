import { Reveal } from "@/components/ui/Reveal";
import { PillButton } from "@/components/ui/PillButton";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { INSTAGRAM_URL } from "@/lib/site";

/**
 * rhode の banner セクション相当。写真の上に濃いスクリムを敷き、
 * 短い断言とCTAだけを置く。フォームはバックエンド実装まで持たず Instagram DM へ送る。
 */
export function Contact() {
  return (
    <section id="contact" className="bg-[var(--color-bg)] px-2 py-20 md:py-28">
      <Reveal>
        <ParallaxImage
          src="/images/bags-grid.webp"
          alt="並べられた WOLF DRIP のコーヒーバッグ"
          strength={8}
          sizes="100vw"
          className="mx-auto flex max-w-[100rem] flex-col items-center rounded-[var(--radius-block)] px-6 py-24 text-center md:py-32"
        >
          <div className="absolute inset-0 bg-[var(--color-overlay)]/80" />

          <div className="relative z-10 flex flex-col items-center">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-accent-soft)]">
              Contact
            </p>

            <h2 className="mt-6 max-w-[14em] text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-[1.2] tracking-[0.01em] text-[var(--color-fg-inverse)] font-[family-name:var(--font-display)]">
              Say hello.
            </h2>

            {/* 説明は置かず、窓口だけを示す */}
            <div className="mt-12">
              <PillButton href={INSTAGRAM_URL} tone="dark" external>
                Instagram DM
              </PillButton>
            </div>
          </div>
        </ParallaxImage>
      </Reveal>
    </section>
  );
}
