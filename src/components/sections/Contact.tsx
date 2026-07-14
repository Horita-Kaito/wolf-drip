import { Reveal } from "@/components/ui/Reveal";
import { PillButton } from "@/components/ui/PillButton";
import { INSTAGRAM_URL } from "@/lib/site";

/**
 * rhode の banner セクション相当。暗い面を角丸で切り出し、短い断言とCTAだけを置く。
 * フォームはバックエンド実装まで持たず、Instagram DM へ送る。
 */
export function Contact() {
  return (
    <section id="contact" className="bg-[var(--color-bg)] px-2 py-20 md:py-28">
      <Reveal className="grain relative mx-auto flex max-w-[100rem] flex-col items-center overflow-hidden rounded-[var(--radius-block)] bg-[radial-gradient(80%_80%_at_50%_0%,#4a382c_0%,transparent_60%),linear-gradient(180deg,#2a211c_0%,#1c1512_100%)] px-6 py-24 text-center md:py-32">
        <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-accent-soft)]">
          Contact
        </p>

        <h2 className="mt-6 max-w-[18em] text-[clamp(1.7rem,3.4vw,2.75rem)] font-medium leading-[1.5] tracking-[0.06em] text-[var(--color-fg-inverse)] font-[family-name:var(--font-body-ja)]">
          この一杯を、あなたの店に。
        </h2>

        <p className="mt-8 max-w-md text-sm leading-[2.2] text-[var(--color-muted-inverse)] font-[family-name:var(--font-body-ja)]">
          卸販売は直接取引のみ。お取り扱いのご相談、取材、その他のお問い合わせは
          Instagram の DM からお受けしています。
        </p>

        <div className="mt-12">
          <PillButton href={INSTAGRAM_URL} tone="dark" external>
            Instagram DM
          </PillButton>
        </div>
      </Reveal>
    </section>
  );
}
