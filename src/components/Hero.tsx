"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const wolfRef = useRef<HTMLSpanElement>(null);
  const dripRef = useRef<HTMLSpanElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const taglineJaRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // DRIP: droplet-like fall animation
      const dripChars = dripRef.current?.querySelectorAll(".char");
      if (dripChars) {
        dripChars.forEach((char, i) => {
          const tl = gsap.timeline({ delay: 0.8 + i * 0.15 });

          // Start: small droplet forming at the top
          gsap.set(char, {
            y: -180,
            opacity: 0,
            scaleX: 0.6,
            scaleY: 1.4,
          });

          // Phase 1: droplet falls with gravity
          tl.to(char, {
            opacity: 1,
            y: 0,
            scaleX: 0.7,
            scaleY: 1.3,
            duration: 0.6,
            ease: "power3.in",
          });

          // Phase 3: splash - squash on landing
          tl.to(char, {
            scaleX: 1.3,
            scaleY: 0.7,
            duration: 0.1,
            ease: "power2.out",
          });

          // Phase 4: settle back to normal shape
          tl.to(char, {
            scaleX: 1,
            scaleY: 1,
            duration: 0.4,
            ease: "elastic.out(1, 0.4)",
          });
        });
      }

      // Tagline fade in
      gsap.from(taglineRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 1.8,
      });

      // Japanese tagline fade in
      gsap.from(taglineJaRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 2.1,
      });

      // Scroll indicator fade in
      gsap.from(scrollIndicatorRef.current, {
        opacity: 0,
        duration: 1,
        delay: 2.6,
      });

      // Parallax on scroll
      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: -100,
      });

      // Fade overlay on scroll
      gsap.to(overlayRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        opacity: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const title = "WOLF DRIP";

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image placeholder */}
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-black/50" />
      <div ref={overlayRef} className="absolute inset-0 bg-black/40 opacity-0" />

      {/* Decorative border frame */}
      <div className="absolute inset-8 border border-white/10 pointer-events-none" />

      <div className="relative z-10 text-center px-4">
        <h1
          ref={titleRef}
          className="font-[family-name:var(--font-display)] text-[clamp(3rem,12vw,12rem)] font-bold leading-none tracking-tighter"
          style={{ perspective: "600px" }}
        >
          <span ref={wolfRef}>
            {"WOLF".split("").map((char, i) => (
              <span
                key={i}
                className="char inline-block"
                style={{ transformOrigin: "bottom" }}
              >
                {char}
              </span>
            ))}
          </span>
          {"\u00A0"}
          <span ref={dripRef}>
            {"DRIP".split("").map((char, i) => (
              <span
                key={i}
                className="char inline-block"
                style={{ transformOrigin: "top" }}
              >
                {char}
              </span>
            ))}
          </span>
        </h1>

        <p
          ref={taglineRef}
          className="mt-6 text-sm tracking-[0.4em] uppercase text-[var(--color-accent)] font-[family-name:var(--font-body)]"
        >
          Specialty Coffee &amp; Herb Tea
        </p>

        <p
          ref={taglineJaRef}
          className="mt-3 text-xs tracking-[0.3em] text-[var(--color-muted)] font-[family-name:var(--font-body-ja)]"
        >
          野性の一杯を、あなたに
        </p>

        <div ref={scrollIndicatorRef} className="mt-20">
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[var(--color-muted)]">
              Scroll
            </span>
            <div className="w-px h-12 bg-gradient-to-b from-[var(--color-accent)] to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
