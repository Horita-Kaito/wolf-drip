import Link from "next/link";
import { getNewsDetail, getNewsList } from "@/lib/microcms";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const { contents } = await getNewsList({ fields: "id" });
  return contents.map((item) => ({ id: item.id }));
}

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NewsDetailPage({ params }: Props) {
  const { id } = await params;

  let article;
  try {
    article = await getNewsDetail(id);
  } catch {
    notFound();
  }

  const date = new Date(article.date)
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replaceAll("/", ".");

  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-fg)]">
      <div className="max-w-3xl mx-auto px-6 py-32">
        {/* Back link */}
        <Link
          href="/#news"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-300 mb-12 font-[family-name:var(--font-body)]"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Top
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm text-[var(--color-muted)] font-[family-name:var(--font-body)] tabular-nums">
              {date}
            </span>
            <span className="text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 border border-[var(--color-accent)]/30 text-[var(--color-accent)] rounded font-[family-name:var(--font-body)]">
              {article.category}
            </span>
          </div>
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,4vw,3rem)] font-bold leading-tight">
            {article.title}
          </h1>
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-[var(--color-accent)] mb-12" />

        {/* Body (rich editor HTML) */}
        <div
          className="news-content font-[family-name:var(--font-body-ja)] text-base leading-[2] text-[var(--color-fg)]"
          dangerouslySetInnerHTML={{ __html: article.description ?? "" }}
        />

        {/* Back link bottom */}
        <div className="mt-20 pt-8 border-t border-[var(--color-border)]">
          <Link
            href="/#news"
            className="inline-flex items-center gap-2 text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-300 font-[family-name:var(--font-body)]"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Top
          </Link>
        </div>
      </div>
    </main>
  );
}
