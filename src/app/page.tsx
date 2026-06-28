"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Script from "next/script";
import ProductStrip from "@/components/home/ProductStrip";
import Hero from "@/components/home/Hero";
import ProductCarousel from "@/components/home/ProductCarousel";
import TrustBar from "@/components/home/TrustBar";
import ProductGrid from "@/components/home/ProductGrid";
import LeadCapture from "@/components/home/LeadCapture";
import FaqSection from "@/components/home/FaqSection";
import CinematicScrollSection from "@/components/home/CinematicScrollSection";
import CinematicQuote from "@/components/home/CinematicQuote";
import { PRODUCTS, getFeaturedProducts, getNewArrivals } from "@/lib/products";
import { FAQ_ITEMS, SITE } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const newArrivals = getNewArrivals().slice(0, 8);
  const featured = getFeaturedProducts();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── TEXT REVEAL (por caractere) ──
      const revealTexts = document.querySelectorAll(".reveal-text");
      revealTexts.forEach((el) => {
        const text = el.textContent || "";
        if (!text.trim()) return;
        el.innerHTML = text
          .split("")
          .map((char) => `<span class="char" style="display:inline-block">${char === " " ? "&nbsp;" : char}</span>`)
          .join("");

        const chars = el.querySelectorAll(".char");
        if (chars.length > 0) {
          gsap.from(chars, {
            opacity: 0,
            y: 50,
            rotateX: -40,
            stagger: 0.02,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      // ── PRODUCT CARDS STAGGER ──
      gsap.from(".product-card", {
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".products-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // ── PARALLAX MULTI-LAYER ──
      document.querySelectorAll(".parallax-section").forEach((section) => {
        const bg = section.querySelector(".parallax-bg");
        const fg = section.querySelector(".parallax-fg");
        if (bg) {
          gsap.to(bg, {
            yPercent: -20,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
        if (fg) {
          gsap.to(fg, {
            yPercent: 20,
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef}>
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question", name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }),
      }} />
      <Script id="product-list-schema" type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "ItemList",
          name: "Catálogo de Chuteiras Premium",
          itemListElement: PRODUCTS.slice(0, 6).map((p, i) => ({
            "@type": "ListItem", position: i + 1,
            item: {
              "@type": "Product", name: p.name, brand: { "@type": "Brand", name: p.brand },
              description: p.description, image: `${SITE.url}${p.image}`,
              offers: {
                "@type": "Offer", price: p.price.toFixed(2), priceCurrency: "BRL",
                availability: "https://schema.org/InStock", url: `${SITE.url}/produto/${p.slug}`,
              },
            },
          })),
        }),
      }} />

      <ProductStrip />

      {/* HERO SECTION — fullscreen + fade-in scale (1.5s, power3.out) */}
      <Hero />

      <TrustBar />

      <ProductCarousel />

      {/* SCROLL-TRIGGERED SECTION — 360° rotation + pin */}
      <CinematicScrollSection />

      {/* QUOTE SECTION — scale 0.8 → 1, back.out(1.7) */}
      <CinematicQuote
        quote="A chuteira certa muda tudo. Com a Roberto, senti a diferença no primeiro jogo — mais conforto, mais tração, mais confiança pra jogar."
        author="Carlos A."
        role="Jogador de society · Franca/SP"
        accent="#16A34A"
      />

      {/* PRODUCTS SECTION — com stagger */}
      <section className="products-section bg-[#0A0A0A] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-12 text-center">
            <h2 className="reveal-text font-display text-3xl font-black text-white md:text-5xl">
              Lançamentos
            </h2>
            <p className="mt-3 text-sm text-white/40">
              As chuteiras mais recentes para campo, society e futsal
            </p>
          </div>
          <ProductGrid
            title=""
            subtitle=""
            products={newArrivals}
            viewAllHref="/colecao?filtro=lancamentos"
          />
        </div>
      </section>

      {/* PARALLAX MULTI-LAYER SECTION */}
      <section className="parallax-section relative min-h-[60vh] overflow-hidden bg-[#0A0A0A]">
        <div className="parallax-bg absolute inset-0">
          <div className="h-full w-full opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle at 30% 50%, #16A34A 0%, transparent 50%), radial-gradient(circle at 70% 50%, #16A34A 0%, transparent 40%)",
            }}
          />
        </div>
        <div className="parallax-fg relative z-10 flex min-h-[60vh] items-center justify-center px-6 md:px-12">
          <div className="max-w-3xl text-center">
            <h2 className="reveal-text font-display text-3xl font-black text-white md:text-5xl">
              Sua chuteira, seu jogo, sua história
            </h2>
            <p className="mt-6 text-base text-white/50">
              Mais de 500 atletas já escolheram a Roberto. Qual vai ser sua jogada?
            </p>
          </div>
        </div>
      </section>

      <ProductGrid
        title="Mais Vendidas"
        subtitle="As mais escolhidas por atletas de todo o Brasil"
        products={featured}
        viewAllHref="/colecao"
      />

      <ProductGrid
        title="Campo e Futsal"
        subtitle="Chuteiras para cada tipo de jogo e superfície"
        products={PRODUCTS.slice(6, 12)}
        viewAllHref="/colecao"
      />

      <LeadCapture />
      <FaqSection />
    </div>
  );
}
