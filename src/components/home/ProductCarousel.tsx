"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { ChevronLeft, ChevronRight } from "lucide-react";

const FEATURED = PRODUCTS.filter(p => p.isNew).slice(0, 6);

export default function ProductCarousel() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % FEATURED.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + FEATURED.length) % FEATURED.length);
  }, []);

  // Auto-play
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const visibleItems = isMobile ? 1 : 3;

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#16A34A]">
            Destaques
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-white md:text-4xl">
            Chuteiras em Destaque
          </h2>
        </div>
        <div className="hidden gap-2 md:flex">
          <button onClick={prev} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-colors hover:border-white/30 hover:text-white" aria-label="Anterior">
            <ChevronLeft size={18} />
          </button>
          <button onClick={next} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-colors hover:border-white/30 hover:text-white" aria-label="Próximo">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${(current / FEATURED.length) * 100}%)` }}
        >
          {FEATURED.map((product) => (
            <Link
              key={product.slug}
              href={`/produto/${product.slug}`}
              className="group min-w-[100%] px-2 md:min-w-[33.333%]"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-[#111]">
                {product.image && product.image !== "/products/placeholder.svg" && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                )}
                {product.isNew && (
                  <span className="absolute left-3 top-3 rounded bg-[#16A34A] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                    Novo
                  </span>
                )}
              </div>
              <div className="mt-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#555]">
                  {product.brand}
                </p>
                <h3 className="mt-0.5 text-sm font-bold text-white transition-colors group-hover:text-[#16A34A]">
                  {product.name}
                </h3>
                <p className="mt-1 text-base font-bold text-white">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                </p>
                <p className="text-xs text-[#555]">
                  até {product.installments}x de R$ {product.installmentPrice.toFixed(2).replace(".", ",")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="mt-6 flex justify-center gap-2">
        {FEATURED.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === current ? "w-8 bg-[#16A34A]" : "w-1.5 bg-[#333]"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Mobile nav */}
      <div className="mt-4 flex justify-center gap-4 md:hidden">
        <button onClick={prev} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40" aria-label="Anterior">
          <ChevronLeft size={16} />
        </button>
        <button onClick={next} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/40" aria-label="Próximo">
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
