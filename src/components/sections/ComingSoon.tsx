import { Reveal } from "@/components/ui/Reveal";

/**
 * 店舗のお知らせ枠。詳細が未定のため、決まっている事実（2026年オープン予定）
 * だけを置く。ページ内で埋もれないよう、濃い面と大きな年号で区切りを作る。
 * 情報が固まったら、この枠を住所・営業時間のセクションに育てる。
 */
export function ComingSoon() {
  return (
    <section id="store" className="bg-[var(--color-bg)] px-2 py-20 md:py-28">
      <Reveal className="mx-auto max-w-[100rem]">
        <div className="grain relative overflow-hidden rounded-[var(--radius-block)] bg-[radial-gradient(90%_120%_at_85%_0%,#4a382c_0%,transparent_60%),linear-gradient(180deg,#2a211c_0%,#1c1512_100%)] px-6 py-20 md:px-14 md:py-24">
          {/* 年号を面いっぱいの地紋として敷く（読ませる文字ではないので装飾扱い） */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[0.12em] right-[-0.04em] select-none text-[clamp(7rem,22vw,20rem)] font-medium leading-[0.8] tracking-[0.02em] text-[var(--color-fg-inverse)]/[0.07] font-[family-name:var(--font-display)]"
          >
            2026
          </span>

          <div className="relative">
            <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-accent-soft)]">
              Store
            </p>

            <p className="mt-6 text-[clamp(2.6rem,7vw,6rem)] font-medium leading-[1] tracking-[0.01em] text-[var(--color-fg-inverse)] font-[family-name:var(--font-display)]">
              Coming soon.
            </p>

            <p className="mt-10 max-w-md text-sm leading-[2.2] text-[var(--color-muted-inverse)] font-[family-name:var(--font-body-ja)]">
              2026年、店舗オープン予定。
              <br />
              続報はお知らせにて。
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
