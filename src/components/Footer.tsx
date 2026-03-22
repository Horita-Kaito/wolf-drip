export function Footer() {
  return (
    <footer className="py-12 px-8 border-t border-neutral-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="font-[family-name:var(--font-display)] text-2xl font-bold">
          WOLF DRIP
        </p>

        <div className="flex gap-8">
          {["Instagram", "X", "Facebook"].map((sns) => (
            <a
              key={sns}
              href="#"
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-300 tracking-widest uppercase"
            >
              {sns}
            </a>
          ))}
        </div>

        <p className="text-xs text-[var(--color-muted)]">
          &copy; 2026 WOLF DRIP. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
