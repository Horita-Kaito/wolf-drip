import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

type NewsItem = {
  id: string;
  date: string;
  category: string;
  title: string;
};

type Props = {
  items: NewsItem[];
};

export function News({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <section
      id="news"
      className="bg-[var(--color-bg-news)] px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-[100rem]">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.35em] text-[var(--color-accent-dark)]">
            News
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-5 text-[clamp(1.9rem,4vw,3.25rem)] font-medium leading-[1.3] tracking-[0.06em] font-[family-name:var(--font-body-ja)]">
            お知らせ
          </h2>
        </Reveal>

        {/* カード列（rhodeのエディトリアルカード同様、白面＋角丸＋ホバーで持ち上げ） */}
        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 6).map((item, i) => (
            <Reveal as="li" key={item.id} delay={Math.min(i, 3) * 0.08}>
              <Link
                href={`/news/${item.id}`}
                className="group flex h-full flex-col justify-between rounded-[var(--radius-card)] bg-[var(--color-surface)] p-8 transition-transform duration-500 ease-out hover:-translate-y-1"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-xs tabular-nums text-[var(--color-muted)]">
                      {item.date}
                    </span>
                    <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent-dark)]">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="mt-6 text-base leading-[1.9] tracking-[0.05em] font-[family-name:var(--font-body-ja)]">
                    {item.title}
                  </h3>
                </div>

                <span className="mt-10 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-[var(--color-muted)]">
                  Read
                  <svg
                    className="h-3 w-3 transition-transform duration-500 ease-out group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.25}
                      d="M14 5l7 7-7 7M21 12H3"
                    />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
