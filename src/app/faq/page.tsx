import { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { FAQ_ITEMS } from "@/lib/constants";

export const metadata: Metadata = {
  title: `FAQ | ${SITE.name}`,
  description: `Tire suas dúvidas sobre chuteiras, entrega, troca e pagamento na ${SITE.name}.`,
};

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
        Perguntas Frequentes
      </h1>
      <p className="mt-3 text-sm text-muted">
        Tudo que você precisa saber sobre comprar chuteira na {SITE.name}.
      </p>

      <div className="mt-10 space-y-6">
        {FAQ_ITEMS.map((item, i) => (
          <details key={i} className="group rounded-xl border border-border bg-surface">
            <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-bold transition-colors hover:text-accent">
              {item.question}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 transition-transform group-open:rotate-180">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </summary>
            <div className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </main>
  );
}
