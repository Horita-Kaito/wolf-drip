import Link from "next/link";
import { WolfDripLogo } from "@/components/ui/WolfDripLogo";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { INSTAGRAM_URL } from "@/lib/site";

const NAV = [
  { href: "/#coffee", label: "Coffee" },
  { href: "/#tea", label: "Herb Tea" },
  { href: "/#store", label: "Store" },
  { href: "/#news", label: "News" },
  { href: "/#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="overflow-hidden bg-[var(--color-overlay)] px-5 pt-20 text-[var(--color-fg-inverse)] md:px-8">
      <div className="mx-auto max-w-[110rem]">
        <div className="grid gap-12 border-b border-[var(--color-fg-inverse)]/15 pb-16 md:grid-cols-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-muted-inverse)]">
              Menu
            </p>
            <ul className="mt-6 flex flex-col gap-3">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm tracking-[0.1em] transition-opacity duration-300 hover:opacity-60"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-muted-inverse)]">
              Contact
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 text-sm tracking-[0.1em] transition-opacity duration-300 hover:opacity-60"
            >
              <InstagramIcon className="h-4 w-4" />
              @wolfdrip2026
            </a>
          </div>

          <div className="md:justify-self-end">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-muted-inverse)]">
              Before Reason
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse items-center gap-6 py-8 md:flex-row md:justify-between">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted-inverse)]">
            &copy; 2026 WOLF DRIP
          </p>
        </div>

        {/* 画面幅いっぱいのワードマーク（rhode同様、フッター下端に敷く） */}
        <WolfDripLogo className="w-full translate-y-[14%] text-[var(--color-fg-inverse)]/10" />
      </div>
    </footer>
  );
}
