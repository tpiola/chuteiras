"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, ChevronRight, Activity, Target, TrendingUp, Zap, Shield, Brain, Sparkles, Ruler, Footprints } from "lucide-react";
import ProductStrip from "@/components/home/ProductStrip";
import TrustBar from "@/components/home/TrustBar";
import ProductCarousel from "@/components/home/ProductCarousel";
import ProductGrid from "@/components/home/ProductGrid";
import LeadCapture from "@/components/home/LeadCapture";
import FaqSection from "@/components/home/FaqSection";
import { PRODUCTS, getFeaturedProducts, getNewArrivals } from "@/lib/products";
import { FAQ_ITEMS, SITE } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

const easeOut = [0.16, 1, 0.3, 1];

/* ─── SCORE RING ─── */
function ScoreRing({ value, label, size = 80 }: { value: number; label: string; size?: number }) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    let s = 0;
    const step = Math.ceil(value / 40);
    const t = setInterval(() => { s += step; if (s >= value) { setCount(value); clearInterval(t); } else setCount(s); }, 30);
    return () => clearInterval(t);
  }, [inView, value]);

  const offset = circ - (count / 100) * circ;

  return (
    <div ref={ref} className="flex flex-col items-center gap-1.5">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#16A34A" strokeWidth="4"
          strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={inView ? offset : circ}
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
        />
        <text x={size/2} y={size/2} textAnchor="middle" dominantBaseline="middle"
          fill="white" fontSize={size * 0.22} fontWeight="700" fontFamily="Plus Jakarta Sans">
          {count}
        </text>
      </svg>
      <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-white/40">{label}</span>
    </div>
  );
}

/* ─── HERO ─── */
function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(titleRef.current, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.5 })
      .fromTo(subtitleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "-=0.8")
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.6");
  }, []);

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#0D1A0D] to-[#0A0A0A]" />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #16A34A 0%, transparent 50%), radial-gradient(circle at 70% 30%, #16A34A 0%, transparent 40%)" }}
        />
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <div ref={titleRef}>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#16A34A]/20 bg-[#16A34A]/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#16A34A]">
            <Sparkles size={12} /> Roberto — Performance Intelligence
          </span>
          <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,7vw,5rem)] font-black leading-[0.9] tracking-tighter text-white">
            <span className="block">A Chuteira Certa</span>
            <span className="block text-[#16A34A]">Para Seu Jogo.</span>
          </h1>
        </div>

        <p ref={subtitleRef} className="mt-5 max-w-lg text-base leading-relaxed text-white/40">
          Encontre a chuteira ideal baseado no seu tipo de jogo, posição e superfície. Score de compatibilidade, dados técnicos e as melhores marcas.
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4">
          <Link href="/colecao"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#16A34A] px-8 py-4 text-sm font-bold text-white transition-all hover:bg-[#15803D] hover:shadow-[0_0_30px_rgba(22,163,74,0.3)]"
          >
            Encontrar Minha Chuteira <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="/colecao?categoria=futsal"
            className="inline-flex items-center rounded-full border border-white/15 px-8 py-4 text-sm font-bold text-white/50 transition-all hover:border-white/30 hover:text-white"
          >
            Futsal
          </Link>
        </div>

        {/* Score preview */}
        <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/[0.04] pt-8 md:gap-10">
          {[
            { value: "94%", label: "Compatibilidade" },
            { value: "195g", label: "Peso Médio" },
            { value: "12", label: "Marcas" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-xl font-black text-white md:text-2xl">{s.value}</p>
              <p className="mt-1 text-[11px] text-white/30">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PAGE ─── */
export default function Home() {
  const newArrivals = getNewArrivals().slice(0, 8);
  const featured = getFeaturedProducts();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal
      document.querySelectorAll(".reveal-text").forEach((el) => {
        const text = el.textContent || "";
        if (!text.trim()) return;
        el.innerHTML = text.split("").map((c) => `<span class="char" style="display:inline-block">${c === " " ? "&nbsp;" : c}</span>`).join("");
        const chars = el.querySelectorAll(".char");
        if (chars.length) {
          gsap.from(chars, { opacity: 0, y: 30, stagger: 0.02, duration: 0.5, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" }
          });
        }
      });

      // Parallax
      document.querySelectorAll(".parallax-section").forEach((section) => {
        const bg = section.querySelector(".parallax-bg");
        if (bg) gsap.to(bg, { yPercent: -20, scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((i) => ({ "@type": "Question", name: i.question, acceptedAnswer: { "@type": "Answer", text: i.answer } })),
      })}} />
      <Script id="product-list-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ItemList", name: "Catálogo de Chuteiras Premium",
        itemListElement: PRODUCTS.slice(0, 6).map((p, i) => ({
          "@type": "ListItem", position: i + 1,
          item: { "@type": "Product", name: p.name, brand: { "@type": "Brand", name: p.brand }, description: p.description, image: `${SITE.url}${p.image}`,
            offers: { "@type": "Offer", price: p.price.toFixed(2), priceCurrency: "BRL", availability: "https://schema.org/InStock", url: `${SITE.url}/produto/${p.slug}` },
          },
        })),
      })}} />

      <ProductStrip />

      <HeroSection />

      <TrustBar />

      <ProductCarousel />

      {/* SCORE SECTION — Sprint AI style */}
      <section className="border-t border-white/[0.04] bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#16A34A]">Score de Compatibilidade</span>
              <h2 className="mt-4 font-display text-3xl font-black leading-tight text-white md:text-5xl">
                Dados que <span className="text-[#16A34A]">encontram</span> seu par ideal
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/40">
                Cada chuteira é analisada por 4 eixos: ajuste, superfície, peso e tecnologia. 
                O score mostra qual modelo mais combina com seu tipo de jogo.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  { icon: <Ruler size={16} />, label: "Ajuste", desc: "Do tamanho ao formato do pé" },
                  { icon: <Footprints size={16} />, label: "Superfície", desc: "Campo, society ou futsal" },
                  { icon: <Activity size={16} />, label: "Peso", desc: "Leveza para velocidade" },
                  { icon: <Zap size={16} />, label: "Tecnologia", desc: "Cabedal, solado, amortecimento" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#16A34A]/10 text-[#16A34A]">{item.icon}</div>
                    <div>
                      <p className="text-sm font-bold text-white">{item.label}</p>
                      <p className="text-xs text-white/30">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              <ScoreRing value={94} label="Ajuste" size={100} />
              <ScoreRing value={88} label="Superfície" size={100} />
              <ScoreRing value={92} label="Peso" size={100} />
              <ScoreRing value={85} label="Tecnologia" size={100} />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUTOS */}
      <section className="products-section bg-background py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <h2 className="reveal-text font-display text-3xl font-black text-white md:text-5xl">Lançamentos</h2>
            <p className="mt-3 text-sm text-white/40">As chuteiras mais recentes para campo, society e futsal</p>
          </div>
          <ProductGrid title="" subtitle="" products={newArrivals} viewAllHref="/colecao?filtro=lancamentos" />
        </div>
      </section>

      {/* PARALLAX */}
      <section className="parallax-section relative min-h-[50vh] overflow-hidden bg-[#0A0A0A]">
        <div className="parallax-bg absolute inset-0">
          <div className="h-full w-full opacity-[0.04]"
            style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #16A34A 0%, transparent 50%), radial-gradient(circle at 70% 50%, #16A34A 0%, transparent 40%)" }}
          />
        </div>
        <div className="relative z-10 flex min-h-[50vh] items-center justify-center px-6 md:px-12">
          <div className="max-w-2xl text-center">
            <h2 className="reveal-text font-display text-3xl font-black text-white md:text-5xl">Feita pra quem joga pra vencer</h2>
            <p className="mt-6 text-base text-white/40">+500 atletas já escolheram Roberto. Qual vai ser sua chuteira?</p>
            <Link href="/colecao" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#16A34A] px-8 py-4 text-sm font-bold text-white transition-all hover:bg-[#15803D]">
              Ver Catálogo <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <ProductGrid title="Mais Vendidas" subtitle="As mais escolhidas por atletas de todo o Brasil" products={featured} viewAllHref="/colecao" />
      <ProductGrid title="Campo e Futsal" subtitle="Chuteiras para cada tipo de jogo e superfície" products={PRODUCTS.slice(6, 12)} viewAllHref="/colecao" />
      <LeadCapture />
      <FaqSection />
    </>
  );
}
