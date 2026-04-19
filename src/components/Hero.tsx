"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WolfDripLogo } from "./WolfDripLogo";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const taglineJaRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // WOLF: rise + fade in as one block
      const wolfGroup = logoRef.current?.querySelector<SVGGElement>("#WOLF");
      if (wolfGroup) {
        gsap.from(wolfGroup, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.3,
        });
      }

      // DRIP: each letter drops from the top edge and lands with a subtle squash
      const dripLetters =
        logoRef.current?.querySelectorAll<SVGGElement>("#DRIP .letter");
      if (dripLetters) {
        dripLetters.forEach((letter, i) => {
          const tl = gsap.timeline({ delay: 1.0 + i * 0.12 });
          tl.from(letter, {
            y: -window.innerHeight * 0.7,
            opacity: 0,
            duration: 0.85,
            ease: "power2.in",
          })
            .to(letter, {
              scaleY: 0.8,
              scaleX: 1.14,
              transformOrigin: "50% 100%",
              duration: 0.1,
              ease: "power2.out",
            })
            .to(letter, {
              scaleY: 1,
              scaleX: 1,
              duration: 0.55,
              ease: "elastic.out(1.1, 0.4)",
            });
        });
      }

      // Tagline fade in (after DRIP lands)
      gsap.from(taglineRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 2.9,
      });

      // Japanese tagline fade in
      gsap.from(taglineJaRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 3.2,
      });

      // Scroll indicator fade in
      gsap.from(scrollIndicatorRef.current, {
        opacity: 0,
        duration: 1,
        delay: 3.7,
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
        <WolfDripLogo
          ref={logoRef}
          className="w-[min(70vw,56rem)] text-white"
        />

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
