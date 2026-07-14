// 文にせず、単語だけを流す（説明を足さず、印象だけを置く）
const MESSAGES = ["WOLF DRIP", "BEFORE REASON", "ORIGINAL BLEND", "国産ハーブ"];

/**
 * 最上部の告知ティッカー。同じ列を2本並べて -50% までずらすことで途切れなく回す。
 */
export function Marquee() {
  const row = (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden="true"
    >
      {[...MESSAGES, ...MESSAGES, ...MESSAGES].map((message, i) => (
        <li
          key={i}
          className="flex items-center gap-8 whitespace-nowrap px-8 text-[10px] uppercase tracking-[0.3em] text-[var(--color-muted)]"
        >
          <span>{message}</span>
          <span className="text-[var(--color-accent)]">✦</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee overflow-hidden bg-[var(--color-surface-strong)] py-2.5">
      {/* 読み上げ用に1度だけテキストを置き、視覚上のループ列は aria-hidden にする */}
      <p className="sr-only">{MESSAGES.join(" / ")}</p>
      <div className="marquee-track flex w-max">
        {row}
        {row}
      </div>
    </div>
  );
}
