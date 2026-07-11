"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      gsap.from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 px-8 bg-[var(--color-bg-contact)] relative"
    >
      {/* Top decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[var(--color-clay)]/35" />

      <div className="max-w-6xl mx-auto">
        <div ref={contentRef} className="text-center mb-16">
          <p className="text-[var(--color-clay)] text-sm tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-body)]">
            Contact
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,5rem)] font-bold leading-none mb-4">
            Get in Touch
          </h2>
          <p className="text-[var(--color-muted)] text-sm tracking-widest font-[family-name:var(--font-display-ja)]">
            お問い合わせ
          </p>
          <p className="mt-8 text-[var(--color-muted)] text-base leading-relaxed max-w-xl mx-auto font-[family-name:var(--font-body-ja)]">
            ご質問やお取引のご相談など、現在はInstagramのDMにて承っております。
            お気軽にご連絡ください。
          </p>
        </div>

        <div ref={ctaRef} className="text-center">
          <a
            href="https://www.instagram.com/wolfdrip2026"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-4 px-10 py-4 border border-[var(--color-clay)] text-[var(--color-clay)] text-sm tracking-[0.2em] uppercase overflow-hidden transition-colors duration-500 hover:text-[var(--color-fg-inverse)] font-[family-name:var(--font-body)]"
          >
            <span className="absolute inset-0 bg-[var(--color-clay)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <svg
              className="relative w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C16.67.014 16.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
            <span className="relative">Message on Instagram</span>
            <svg
              className="relative w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
