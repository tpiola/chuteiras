"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const BRANDS = [
  { name: "Nike", color: "#0A0A0B" },
  { name: "Adidas", color: "#1A1A1A" },
  { name: "Puma", color: "#1A1A1A" },
  { name: "Mizuno", color: "#1A1A1A" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-[#0A0A0B]">
      {/* Hero image area — full-bleed dark backdrop */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B] via-[#0A0A0B]/95 to-[#0A0A0B]/80" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle at 65% 50%, #00B341 0%, transparent 50%), radial-gradient(circle at 85% 20%, #00B341 0%, transparent 40%)",
          }}
        />
        {/* Dynamic grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col items-start justify-center px-6 md:px-12">
        {/* Eyebrow — brand indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-white/40">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00B341]" />
            Roberto — Edição Atleta
          </span>
        </motion.div>

        {/* Main headline — Nike-style bold typography */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-8 max-w-3xl"
        >
          <h1 className="text-[clamp(3rem,9vw,7rem)] font-black leading-[0.88] tracking-tighter text-white">
            <span className="block">Jogue Sem</span>
            <span className="block text-[#00B341]">Limites.</span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-lg text-base leading-relaxed text-white/40"
        >
          As melhores chuteiras para campo, society e futsal. Nike, Adidas, Puma, Mizuno e a linha exclusiva Roberto.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href="/colecao"
            className="group inline-flex items-center gap-3 bg-white px-10 py-4 text-sm font-bold text-[#0A0A0B] transition-all hover:bg-neutral-200"
          >
            Explorar Coleção
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M1 8H15M15 8L8 1M15 8L8 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <Link
            href="/colecao?categoria=society"
            className="inline-flex items-center border border-white/20 px-10 py-4 text-sm font-bold text-white/70 transition-all hover:border-white/40 hover:text-white"
          >
            Society
          </Link>
        </motion.div>

        {/* Brand strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 w-full border-t border-white/[0.06] pt-8"
        >
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">
            Marcas Oficiais
          </p>
          <div className="flex flex-wrap gap-8">
            {BRANDS.map((brand, i) => (
              <motion.span
                key={brand.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
                className="text-sm font-black uppercase tracking-wider text-white/20 transition-colors hover:text-white/40"
              >
                {brand.name}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Stats — bottom-right positioned */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="absolute bottom-12 right-12 hidden gap-10 md:flex"
        >
          {[
            { value: "+500", label: "Modelos" },
            { value: "Grátis", label: "Frete Brasil" },
            { value: "7 Dias", label: "Troca Garantida" },
          ].map((stat) => (
            <div key={stat.label} className="text-right">
              <p className="text-xl font-black text-white">{stat.value}</p>
              <p className="text-[11px] text-white/30">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
