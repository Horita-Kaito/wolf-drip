import { Reveal } from "@/components/ui/Reveal";
import { PillButton } from "@/components/ui/PillButton";

/**
 * 店舗のお知らせ枠。詳細が未定のため、決まっている事実（2026年オープン予定）だけを置く。
 * ページ内で最も強い区切りにするため、他セクションの「角丸ブロック＋左右余白」の
 * リズムをあえて破り、画面端まで抜けた背の高い濃い面にしている。
 * 情報が固まったら、この枠を住所・営業時間のセクションに育てる。
 */
export function ComingSoon() {
  return (
    <section
      id="store"
      className="grain relative flex min-h-[80svh] items-center overflow-hidden bg-[radial-gradient(80%_120%_at_50%_0%,#4a382c_0%,transparent_65%),linear-gradient(180deg,#2a211c_0%,#1c1512_100%)] px-5 py-24 md:px-8 md:py-32"
    >
      {/* 年号を面いっぱいの地紋として敷く（読ませる文字ではないので装飾扱い） */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-0.08em] select-none text-center text-[26vw] font-medium leading-[0.75] tracking-[0.02em] text-[var(--color-accent)]/[0.14] font-[family-name:var(--font-display)]"
      >
        2026
      </span>

      <div className="relative mx-auto flex max-w-[100rem] flex-1 flex-col items-center text-center">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.45em] text-[var(--color-accent-soft)]">
            Store
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-8 text-[clamp(3rem,10vw,9rem)] font-medium leading-[0.95] tracking-[0.01em] text-[var(--color-fg-inverse)] font-[family-name:var(--font-display)]">
            Coming soon.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-10 text-sm leading-[2.2] text-[var(--color-muted-inverse)] font-[family-name:var(--font-body-ja)]">
            2026年、店舗オープン予定。
            <br />
            続報はお知らせにて。
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-12">
            <PillButton href="#news" tone="dark">
              View News
            </PillButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
