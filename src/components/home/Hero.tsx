"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-[#0A0A0A]">
      {/* Textured backdrop — subtle field pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0F0F0F] to-[#0A0A0A]" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 3px)",
            backgroundSize: "100% 40px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl flex-col items-start justify-center px-6 md:px-12">
        {/* Category label */}
        <div className="mb-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16A34A]">
            Chuteiras — Campo e Futsal
          </span>
        </div>

        {/* Main headline */}
        <h1 className="max-w-3xl text-[clamp(3rem,9vw,6.5rem)] font-black leading-[0.9] tracking-tighter text-white">
          <span className="block">Performance</span>
          <span className="block text-[#16A34A]">Que Define</span>
          <span className="block">O Jogo.</span>
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-lg text-base leading-relaxed text-[#888]">
          Chuteiras originais para campo, society e futsal. Nike, Adidas, Puma, Mizuno e a linha exclusiva Roberto. Tamanhos do 33 ao 45.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/colecao"
            className="inline-flex items-center gap-2.5 bg-[#16A34A] px-8 py-3.5 text-sm font-bold text-white transition-all hover:bg-[#15803D] active:scale-[0.98]"
          >
            Ver Catálogo
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link
            href="/colecao?categoria=futsal"
            className="inline-flex items-center border border-white/15 px-8 py-3.5 text-sm font-bold text-white/60 transition-all hover:border-white/30 hover:text-white"
          >
            Futsal
          </Link>
        </div>

        {/* Trust row */}
        <div className="mt-16 flex gap-8 border-t border-white/[0.06] pt-6">
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
    </section>
  );
}
