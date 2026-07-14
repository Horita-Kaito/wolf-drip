import { Reveal } from "@/components/ui/Reveal";
import { PillButton } from "@/components/ui/PillButton";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

type Props = {
  /** メディア面に添える連番（01, 02...） */
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: { href: string; label: string };
  image: { src: string; alt: string };
  /** true でメディアを右に置く（左右交互にするため） */
  reverse?: boolean;
};

/**
 * rhode の image-with-content を踏襲したブランドステートメント。
 * 大きな写真を視差で流し、反対側に英語の短い一文（印象）と
 * 日本語の一行（事実）を置く。コピー規範は CLAUDE.md を参照。
 */
export function Statement({
  index,
  eyebrow,
  title,
  body,
  cta,
  image,
  reverse = false,
}: Props) {
  return (
    <section className="bg-[var(--color-bg)] px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-[100rem] items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* メディア面（写真は1枚。重ね置きはしない） */}
        <Reveal className={reverse ? "md:order-2" : ""}>
          <ParallaxImage
            src={image.src}
            alt={image.alt}
            strength={8}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-[4/5] w-full rounded-[var(--radius-block)] md:aspect-[5/6]"
          >
            {/* 明るい素材でもキャプションが読めるよう、足元だけ落とす */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent_0%,rgba(28,21,18,0.55)_100%)]" />
            <span className="absolute bottom-6 left-6 z-10 text-[10px] uppercase tracking-[0.3em] text-[var(--color-fg-inverse)]">
              {index} — {eyebrow}
            </span>
          </ParallaxImage>
        </Reveal>

        {/* コピー面 */}
        <div className={reverse ? "md:order-1 md:pr-8" : "md:pl-8"}>
          <Reveal>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-accent-dark)]">
              {eyebrow}
            </p>
          </Reveal>

          {/* 見出し（抽象）も、その下の1行（事実）も英語で置く */}
          <Reveal delay={0.08}>
            <h2 className="mt-6 text-[clamp(1.9rem,3.4vw,3rem)] font-medium leading-[1.2] tracking-[0.01em] font-[family-name:var(--font-display)]">
              {title}
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-8 max-w-md text-sm leading-[2] tracking-[0.08em] text-[var(--color-muted)]">
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
