import { Reveal } from "@/components/ui/Reveal";

/**
 * 店舗のお知らせ枠。詳細が未定のため、決まっている事実（2026年オープン予定）
 * だけを置き、続報はお知らせ／Instagram へ送る。
 * 情報が固まったら、この枠を住所・営業時間のセクションに育てる。
 */
export function ComingSoon() {
  return (
    <section
      id="store"
      className="bg-[var(--color-bg)] px-5 py-20 md:px-8 md:py-28"
    >
      <Reveal className="mx-auto max-w-[100rem]">
        <div className="flex flex-col gap-10 rounded-[var(--radius-block)] border border-[var(--color-border)] px-6 py-16 md:flex-row md:items-end md:justify-between md:px-14 md:py-20">
          <div>
            <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-accent-dark)]">
              Store
            </p>
            <p className="mt-6 text-[clamp(2rem,4.4vw,3.5rem)] font-medium leading-[1.1] tracking-[0.01em] font-[family-name:var(--font-display)]">
              Coming soon.
            </p>
          </div>

          <p className="text-sm leading-[2] text-[var(--color-muted)] font-[family-name:var(--font-body-ja)] md:text-right">
            2026年、店舗オープン予定。
            <br />
            続報はお知らせにて。
          </p>
        </div>
      </Reveal>
    </section>
  );
}
