import { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Termos de Uso | ${SITE.name}`,
  description: `Termos e condições de uso da loja ${SITE.name}.`,
};

export default function TermosPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
        Termos de Uso
      </h1>

      <div className="mt-8 space-y-5 text-sm leading-relaxed text-foreground/80">
        <p>
          Ao acessar e utilizar o site <strong>{SITE.name}</strong>, você concorda com
          os termos e condições descritos abaixo.
        </p>

        <h2 className="font-display text-lg uppercase tracking-tight">1. Produtos</h2>
        <p>
          Todos os produtos anunciados em nosso site são originais e provenientes de
          fabricantes oficiais. As imagens são meramente ilustrativas e podem variar
          conforme o lote.
        </p>

        <h2 className="font-display text-lg uppercase tracking-tight">2. Preços e Pagamento</h2>
        <p>
          Os preços exibidos estão em reais (BRL) e podem ser alterados sem aviso prévio.
          Aceitamos as formas de pagamento indicadas no checkout. O parcelamento segue as
          regras da operadora de cartão de crédito.
        </p>

        <h2 className="font-display text-lg uppercase tracking-tight">3. Marcas</h2>
        <p>
          {SITE.name}. As marcas Nike, Adidas, Puma, Mizuno, Umbro e Penalty são
          propriedades de seus respectivos fabricantes. A {SITE.name} é uma loja revendedora
          autorizada.
        </p>

        <h2 className="font-display text-lg uppercase tracking-tight">4. Limitação de Responsabilidade</h2>
        <p>
          A {SITE.name} não se responsabiliza por danos indiretos decorrentes do uso do
          site ou dos produtos adquiridos, limitando-se ao valor pago pelo produto.
        </p>

        <p className="text-muted">
          Última atualização: Junho 2026
        </p>
      </div>
    </main>
  );
}
