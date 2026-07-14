import { Reveal } from "@/components/ui/Reveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

type Props = {
  image: { src: string; alt: string };
  eyebrow: string;
  title: string;
};

/**
 * 全幅の写真バンド。視差の効いた1枚の上に短い一文だけを置き、
 * セクションとセクションの間に「間」をつくる。
 */
export function Band({ image, eyebrow, title }: Props) {
  return (
    <section className="bg-[var(--color-bg)] px-2 py-6">
      <Reveal>
        <ParallaxImage
          src={image.src}
          alt={image.alt}
          strength={10}
          sizes="100vw"
          className="flex h-[70svh] min-h-[26rem] items-end rounded-[var(--radius-block)]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(28,21,18,0.1)_0%,rgba(28,21,18,0.7)_100%)]" />
          <div className="relative z-10 px-6 pb-12 md:px-12 md:pb-14">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-accent-soft)]">
              {eyebrow}
            </p>
            <p className="mt-5 max-w-[14em] text-[clamp(1.6rem,3.4vw,2.75rem)] font-medium leading-[1.45] tracking-[0.06em] text-[var(--color-fg-inverse)] font-[family-name:var(--font-body-ja)]">
              {title}
            </p>
          </div>
        </ParallaxImage>
      </Reveal>
    </section>
  );
}
