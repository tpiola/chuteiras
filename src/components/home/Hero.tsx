"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text entrance
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power4.out", delay: 0.3 }
      );

      // 3D viewer entrance
      gsap.fromTo(viewerRef.current,
        { opacity: 0, scale: 0.7, rotateY: 30 },
        { opacity: 1, scale: 1, rotateY: 0, duration: 1.2, ease: "power3.out", delay: 0.1 }
      );

      // Shine sweep animation (continues looping)
      if (shineRef.current) {
        gsap.to(shineRef.current, {
          x: "150%",
          duration: 2.5,
          delay: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          repeatDelay: 3,
        });
      }

      // Parallax on scroll
      if (sectionRef.current && viewerRef.current) {
        gsap.to(viewerRef.current, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[90vh] overflow-hidden bg-[#0A0A0A]">
      {/* Dark gradient backdrop */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0D0D0D] to-[#0A0A0A]" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 50% 40%, #16A34A 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center px-6 md:flex-row md:px-12">
        {/* ── Left: Text ── */}
        <div ref={textRef} className="order-2 w-full md:order-1 md:w-1/2 md:pr-16">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16A34A]">
            Roberto — Chuteiras para Atletas
          </span>

          <h1 className="mt-6 max-w-2xl text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[0.9] tracking-tighter text-white">
            <span className="block">Performance</span>
            <span className="block text-[#16A34A]">Que Define</span>
            <span className="block">O Jogo.</span>
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-[#666]">
            Chuteiras originais para campo, society e futsal. Nike, Adidas, Puma, Mizuno e a linha exclusiva Roberto.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/colecao"
              className="inline-flex items-center gap-2.5 bg-[#16A34A] px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#15803D] active:scale-[0.98]"
            >
              Ver Catálogo
              <ArrowRight size={16} />
            </a>
            <a
              href="/colecao?categoria=futsal"
              className="inline-flex items-center border border-white/15 px-8 py-3.5 text-sm font-bold text-white/60 transition-all hover:border-white/30 hover:text-white"
            >
              Futsal
            </a>
          </div>

          <div className="mt-12 flex gap-8 border-t border-white/[0.06] pt-6">
            {[
              { label: "Frete Grátis", detail: "Todo Brasil" },
              { label: "Troca em 7 Dias", detail: "Primeira grátis" },
              { label: "Original", detail: "Com garantia" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-sm font-bold text-white">{item.label}</p>
                <p className="text-[11px] text-[#555]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: 3D Rotating Product Viewer ── */}
        <div ref={viewerRef} className="order-1 mb-10 flex w-full items-center justify-center md:order-2 md:mb-0 md:w-1/2" style={{ perspective: 1200 }}>
          <div className="relative flex h-[320px] w-[320px] items-center justify-center md:h-[480px] md:w-[480px]">
            {/* Glow ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-[60%] w-[60%] rounded-full bg-[#16A34A] opacity-[0.04] blur-3xl" />
            </div>

            {/* 3D rotating card */}
            <div
              className="product-spin relative h-[70%] w-[70%]"
            >
              {/* Front face */}
              <div
                className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#111] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                style={{ backfaceVisibility: "hidden" }}
              >
                {/*
                  Product silhouette — primeiros socorros até ter imagens reais.
                  Quando tiver as fotos das chuteiras, substituir por <Image />
                */}
                <svg viewBox="0 0 200 180" fill="none" className="h-3/4 w-3/4 drop-shadow-[0_8px_32px_rgba(22,163,74,0.15)]">
                  {/* Chuteira silhouette — campo */}
                  <path d="M60 150 Q50 130 55 110 L65 100 Q70 90 80 85 L100 80 L120 82 Q135 85 145 95 L155 110 Q160 125 155 140 L150 150 L140 148 Q145 135 145 120 Q145 105 135 95 L120 88 L100 86 L80 88 Q70 92 65 100 L58 115 Q55 130 60 145 Z" fill="#16A34A" opacity="0.12"/>
                  <path d="M55 148 Q50 135 52 120 L58 108 Q62 98 72 92 L95 85 L125 86 Q140 90 150 102 L158 118 Q162 135 158 148 L150 155 L145 150 Q148 140 148 128 Q148 112 138 102 L125 94 L95 90 L72 95 Q63 100 58 110 L52 125 Q50 138 54 148 Z" fill="#1A1A1A" stroke="#16A34A" strokeWidth="0.5" strokeOpacity="0.3"/>
                  {/* Detalhes — solado */}
                  <path d="M65 148 L70 155 L75 148 L80 155 L85 148 L90 155 L95 148 L100 155 L105 148 L110 155 L115 148 L120 155 L125 148 L130 155 L135 148" stroke="#16A34A" strokeWidth="0.8" strokeOpacity="0.2"/>
                  {/* Swoosh / detalhe da marca */}
                  <path d="M90 95 Q110 85 130 90 Q140 92 145 100" stroke="#16A34A" strokeWidth="1.5" strokeOpacity="0.3" fill="none" strokeLinecap="round"/>
                  {/* Travas */}
                  <circle cx="80" cy="155" r="3" fill="#16A34A" opacity="0.15"/>
                  <circle cx="95" cy="157" r="3" fill="#16A34A" opacity="0.15"/>
                  <circle cx="110" cy="157" r="3" fill="#16A34A" opacity="0.15"/>
                  <circle cx="125" cy="155" r="3" fill="#16A34A" opacity="0.15"/>
                </svg>
              </div>

              {/* Back face */}
              <div
                className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#111] shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <svg viewBox="0 0 200 180" fill="none" className="h-3/4 w-3/4 drop-shadow-[0_8px_32px_rgba(22,163,74,0.15)]">
                  <path d="M60 150 Q50 130 55 110 L65 100 Q70 90 80 85 L100 80 L120 82 Q135 85 145 95 L155 110 Q160 125 155 140 L150 150 L140 148 Q145 135 145 120 Q145 105 135 95 L120 88 L100 86 L80 88 Q70 92 65 100 L58 115 Q55 130 60 145 Z" fill="#16A34A" opacity="0.08"/>
                  <path d="M55 148 Q50 135 52 120 L58 108 Q62 98 72 92 L95 85 L125 86 Q140 90 150 102 L158 118 Q162 135 158 148 L150 155 L145 150 Q148 140 148 128 Q148 112 138 102 L125 94 L95 90 L72 95 Q63 100 58 110 L52 125 Q50 138 54 148 Z" fill="#1A1A1A"/>
                </svg>
              </div>
            </div>

            {/* Shine overlay */}
            <div
              ref={shineRef}
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 45%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 55%, transparent 70%)",
                transform: "translateX(-100%)",
              }}
            />

            {/* Bottom reflection */}
            <div className="absolute -bottom-4 left-[10%] right-[10%] h-8 rounded-full bg-[#16A34A] opacity-[0.04] blur-xl" />
          </div>

          {/* Labels de detalhes */}
          <div className="absolute -left-4 top-1/3 hidden md:block">
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-[#16A34A]/30" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#444]">Cabedal em couro</span>
            </div>
          </div>
          <div className="absolute -right-4 bottom-1/3 hidden md:block">
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#444]">Solado com travas</span>
              <div className="h-px w-8 bg-[#16A34A]/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
