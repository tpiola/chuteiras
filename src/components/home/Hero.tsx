"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance: fade-in + scale (duração: 1.5s, ease: power3.out)
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(titleRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.5 }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.8"
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(productRef.current,
        { opacity: 0, scale: 0.85, rotation: -10 },
        { opacity: 1, scale: 1, rotation: 0, duration: 1.4 },
        "-=1"
      );

      // Parallax multi-layer no hero
      gsap.to(productRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="hero-section relative flex min-h-screen items-center justify-between overflow-hidden px-[5%]"
      style={{
        background: "linear-gradient(135deg, #0A0A0A 0%, #1A2A1A 50%, #0D1F0D 100%)",
      }}
    >
      {/* Multi-layer parallax background */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 30% 50%, #16A34A 0%, transparent 50%), radial-gradient(circle at 70% 30%, #16A34A 0%, transparent 40%)",
        }}
      />
      <div className="background-layer pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 flex w-full flex-col-reverse items-center justify-between md:flex-row">
        {/* Left content */}
        <div className="w-full md:w-1/2 md:pr-12">
          <h1 ref={titleRef}
            className="hero-title font-display text-[clamp(2.5rem,6vw,5rem)] font-black leading-[0.92] tracking-tighter text-white"
            style={{ willChange: "transform" }}
          >
            <span className="block">Performance</span>
            <span className="block text-[#16A34A]">Que Define</span>
            <span className="block">O Jogo.</span>
          </h1>

          <p ref={subtitleRef}
            className="hero-subtitle mt-6 max-w-md text-base leading-relaxed text-white/50"
          >
            Chuteiras originais para campo, society e futsal. Nike, Adidas, Puma, Mizuno e a linha exclusiva Roberto.
          </p>

          <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4">
            <Link href="/colecao"
              className="cta-button inline-flex items-center gap-2.5 rounded-full bg-[#16A34A] px-8 py-4 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(22,163,74,0.3)] active:translate-y-0"
              style={{ willChange: "transform" }}
            >
              Ver Catálogo
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
            <Link href="/colecao?categoria=futsal"
              className="inline-flex items-center rounded-full border border-white/20 px-8 py-4 text-sm font-bold text-white/60 transition-all hover:border-white/40 hover:text-white"
            >
              Futsal
            </Link>
          </div>
        </div>

        {/* Right - product image */}
        <div ref={productRef}
          className="animated-product mb-8 flex w-full items-center justify-center md:mb-0 md:w-1/2"
          style={{ willChange: "transform", transformOrigin: "center center" }}
        >
          <div className="relative h-[300px] w-[300px] md:h-[450px] md:w-[450px]">
            <Image
              src="/products/chuteira-campo.svg"
              alt="Chuteira Roberto"
              fill
              className="object-contain drop-shadow-[0_20px_60px_rgba(22,163,74,0.15)]"
              priority
              sizes="(max-width: 768px) 300px, 450px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
