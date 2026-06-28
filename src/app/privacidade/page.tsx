import { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Privacidade | ${SITE.name}`,
  description: `Saiba como a ${SITE.name} coleta, usa e protege seus dados pessoais.`,
};

export default function PrivacidadePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <h1 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
        Política de Privacidade
      </h1>

      <div className="mt-8 space-y-5 text-sm leading-relaxed text-foreground/80">
        <p>
          A <strong>{SITE.name}</strong> leva a sério a privacidade dos seus dados.
          Esta política explica como coletamos, usamos e protegemos suas informações.
        </p>

        <h2 className="font-display text-lg uppercase tracking-tight">1. Coleta de Dados</h2>
        <p>
          Coletamos apenas os dados necessários para processar seu pedido: nome, e-mail,
          telefone, endereço de entrega e informações de pagamento. Esses dados são
          fornecidos voluntariamente por você no momento da compra.
        </p>

        <h2 className="font-display text-lg uppercase tracking-tight">2. Uso dos Dados</h2>
        <p>
          Seus dados são usados exclusivamente para processar seu pedido, informar sobre
          o status da entrega e, com sua autorização, enviar ofertas e novidades.
        </p>

        <h2 className="font-display text-lg uppercase tracking-tight">3. Compartilhamento</h2>
        <p>
          Não vendemos, alugamos ou compartilhamos seus dados com terceiros para fins
          de marketing. Seus dados de pagamento são processados diretamente pelas
          operadoras de cartão e gateways, sem armazenamento em nossos servidores.
        </p>

        <h2 className="font-display text-lg uppercase tracking-tight">4. Segurança</h2>
        <p>
          Utilizamos criptografia SSL/TLS em todas as páginas do site e seguimos as
          melhores práticas de segurança da informação para proteger seus dados contra
          acesso não autorizado.
        </p>

        <h2 className="font-display text-lg uppercase tracking-tight">5. Seus Direitos</h2>
        <p>
          Você pode solicitar a exclusão, correção ou exportação dos seus dados a qualquer
          momento entrando em contato pelo e-mail <strong>contato@roberto.com.br</strong>.
        </p>

        <p className="text-muted">
          Última atualização: Junho 2026
        </p>
      </div>
    </main>
  );
}
