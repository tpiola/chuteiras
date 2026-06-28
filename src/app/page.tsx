"use client";
import Script from "next/script";
import ProductStrip from "@/components/home/ProductStrip";
import Hero from "@/components/home/Hero";
import TrustBar from "@/components/home/TrustBar";
import ProductGrid from "@/components/home/ProductGrid";
import LeadCapture from "@/components/home/LeadCapture";
import FaqSection from "@/components/home/FaqSection";
import { PRODUCTS, getFeaturedProducts, getNewArrivals } from "@/lib/products";
import { FAQ_ITEMS, SITE } from "@/lib/constants";

export default function Home() {
  const newArrivals = getNewArrivals().slice(0, 8);
  const featured = getFeaturedProducts();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  const productListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Catálogo de Chuteiras Premium",
    itemListElement: PRODUCTS.slice(0, 6).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        brand: { "@type": "Brand", name: p.brand },
        description: p.description,
        image: `${SITE.url}${p.image}`,
        offers: {
          "@type": "Offer",
          price: p.price.toFixed(2),
          priceCurrency: "BRL",
          availability: "https://schema.org/InStock",
          url: `${SITE.url}/produto/${p.slug}`,
        },
      },
    })),
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Script
        id="product-list-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productListJsonLd) }}
      />

      <ProductStrip />

      <Hero />

      <TrustBar />

      <ProductGrid
        title="Lançamentos"
        subtitle="As chuteiras mais recentes para campo, society e futsal"
        products={newArrivals}
        viewAllHref="/colecao?filtro=lancamentos"
      />

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
    </>
  );
}
