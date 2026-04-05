"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

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

      const fields = formRef.current?.querySelectorAll(".form-field");
      if (fields) {
        gsap.from(fields, {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 75%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 px-8 bg-[var(--color-bg)] relative"
    >
      {/* Top decorative line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-[var(--color-accent)]/30" />

      <div className="max-w-6xl mx-auto">
        <div ref={contentRef} className="text-center mb-20">
          <p className="text-[var(--color-accent)] text-sm tracking-[0.3em] uppercase mb-4 font-[family-name:var(--font-body)]">
            Contact
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.5rem,5vw,5rem)] font-bold leading-none mb-4">
            Get in Touch
          </h2>
          <p className="text-[var(--color-muted)] text-sm tracking-widest font-[family-name:var(--font-display-ja)]">
            お問い合わせ
          </p>
          <p className="mt-8 text-[var(--color-muted)] text-base leading-relaxed max-w-xl mx-auto font-[family-name:var(--font-body-ja)]">
            ご質問やご予約、イベントのお問い合わせなど、
            お気軽にご連絡ください。
          </p>
        </div>

        {/* Contact form */}
        <form ref={formRef} className="max-w-2xl mx-auto space-y-8">
          <div className="form-field grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-[var(--color-accent)] mb-3 font-[family-name:var(--font-body)]">
                Name
              </label>
              <input
                type="text"
                placeholder="お名前"
                className="w-full bg-transparent border-b border-[var(--color-border)] focus:border-[var(--color-accent)] pb-3 text-[var(--color-fg)] placeholder:text-neutral-600 outline-none transition-colors duration-300 font-[family-name:var(--font-body-ja)]"
              />
            </div>
            <div>
              <label className="block text-xs tracking-[0.2em] uppercase text-[var(--color-accent)] mb-3 font-[family-name:var(--font-body)]">
                Email
              </label>
              <input
                type="email"
                placeholder="メールアドレス"
                className="w-full bg-transparent border-b border-[var(--color-border)] focus:border-[var(--color-accent)] pb-3 text-[var(--color-fg)] placeholder:text-neutral-600 outline-none transition-colors duration-300 font-[family-name:var(--font-body-ja)]"
              />
            </div>
          </div>

          <div className="form-field">
            <label className="block text-xs tracking-[0.2em] uppercase text-[var(--color-accent)] mb-3 font-[family-name:var(--font-body)]">
              Subject
            </label>
            <input
              type="text"
              placeholder="件名"
              className="w-full bg-transparent border-b border-[var(--color-border)] focus:border-[var(--color-accent)] pb-3 text-[var(--color-fg)] placeholder:text-neutral-600 outline-none transition-colors duration-300 font-[family-name:var(--font-body-ja)]"
            />
          </div>

          <div className="form-field">
            <label className="block text-xs tracking-[0.2em] uppercase text-[var(--color-accent)] mb-3 font-[family-name:var(--font-body)]">
              Message
            </label>
            <textarea
              rows={5}
              placeholder="メッセージ"
              className="w-full bg-transparent border-b border-[var(--color-border)] focus:border-[var(--color-accent)] pb-3 text-[var(--color-fg)] placeholder:text-neutral-600 outline-none transition-colors duration-300 resize-none font-[family-name:var(--font-body-ja)]"
            />
          </div>

          <div className="form-field pt-4 text-center">
            <button
              type="button"
              className="group relative inline-flex items-center gap-4 px-10 py-4 border border-[var(--color-accent)] text-[var(--color-accent)] text-sm tracking-[0.2em] uppercase overflow-hidden transition-colors duration-500 hover:text-[var(--color-bg)] font-[family-name:var(--font-body)]"
            >
              <span className="absolute inset-0 bg-[var(--color-accent)] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative">Send Message</span>
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
            </button>
          </div>
        </form>

      </div>
    </section>
  );
}
