import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agência de Tráfego Pago em Jundiaí | Meta Ads e Google Ads",
  description:
    "Gestão de tráfego pago em Jundiaí para empresas, negócios locais e mercado imobiliário. Campanhas de Meta Ads e Google Ads com acompanhamento próximo.",
  alternates: {
    canonical: "https://hsvisual.com/trafego-pago-jundiai",
  },
  openGraph: {
    title: "Agência de Tráfego Pago em Jundiaí | Meta Ads e Google Ads",
    description:
      "Gestão de tráfego pago em Jundiaí para empresas, negócios locais e mercado imobiliário. Campanhas de Meta Ads e Google Ads com acompanhamento próximo.",
    url: "https://hsvisual.com/trafego-pago-jundiai",
    type: "website",
  },
};

const faqs = [
  {
    q: "Quanto tempo leva para ver resultado com tráfego pago?",
    a: "Os primeiros dados de campanha (cliques, custo por clique, primeiras conversões) aparecem já nos primeiros dias. Otimizações mais consistentes de performance costumam ser avaliadas a partir da terceira ou quarta semana, quando já existe volume de dados suficiente para ajustar públicos, criativos e lances.",
  },
  {
    q: "A HS Visual atende só o mercado imobiliário?",
    a: "Não. O mercado imobiliário é uma especialidade da HS Visual, mas atendemos negócios locais, prestadores de serviço e empresas de outros segmentos em Jundiaí e região, além de atendimento remoto para todo o Brasil.",
  },
  {
    q: "Preciso ter site para rodar tráfego pago?",
    a: "Não é obrigatório, é possível rodar campanhas usando formulários, WhatsApp ou páginas de terceiros, mas ter uma landing page própria normalmente melhora a taxa de conversão e o controle sobre os dados gerados pelas campanhas.",
  },
  {
    q: "Como funciona o atendimento em Jundiaí?",
    a: "Para negócios da região de Jundiaí/SP, o atendimento presencial acontece mediante agendamento prévio. Para empresas de outras regiões do Brasil, o atendimento é 100% remoto.",
  },
];

export default function TrafegoPagoJundiaiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": "https://hsvisual.com/trafego-pago-jundiai#service",
        name: "Tráfego Pago em Jundiaí",
        serviceType: ["Google Ads", "Meta Ads", "Gestão de Tráfego Pago"],
        provider: {
          "@type": "Organization",
          "@id": "https://hsvisual.com#organization",
        },
        areaServed: {
          "@type": "City",
          name: "Jundiaí",
        },
        description:
          "Gestão de campanhas de tráfego pago (Meta Ads e Google Ads) para empresas, negócios locais e mercado imobiliário em Jundiaí e região.",
        url: "https://hsvisual.com/trafego-pago-jundiai",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "HS Visual",
            item: "https://hsvisual.com",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tráfego Pago em Jundiaí",
            item: "https://hsvisual.com/trafego-pago-jundiai",
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-void text-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <header className="border-b border-cream/5 px-6 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-display text-lg text-cream hover:text-gold transition-colors">
            HS Visual
          </Link>
          <Link href="/" className="text-[11px] font-body font-light text-cream/40 hover:text-gold/70 transition-colors tracking-[0.1em] uppercase">
            Voltar ao início
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <section className="mb-16">
          <p className="font-body font-light text-gold mb-4 text-[0.7rem] tracking-[0.12em] uppercase opacity-70">
            Tráfego Pago · Jundiaí / SP
          </p>
          <h1 className="font-display leading-[1.05] mb-6" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
            Agência de Tráfego Pago em Jundiaí
          </h1>
          <p className="font-body font-light text-cream/70 text-lg leading-relaxed max-w-2xl">
            A HS Visual é uma agência de marketing digital sediada em Jundiaí/SP, especializada em gestão de tráfego pago para empresas, negócios locais e o mercado imobiliário. Trabalhamos com campanhas de Meta Ads e Google Ads estruturadas para gerar leads qualificados e apoiar o crescimento do seu negócio, com atendimento presencial na região mediante agendamento e atendimento remoto para todo o Brasil.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="font-display text-2xl mb-4 text-cream">Como funciona a gestão de tráfego pago</h2>
          <p className="font-body font-light text-cream/60 leading-relaxed">
            O trabalho começa com um diagnóstico do negócio e do público-alvo, seguido da estruturação das campanhas nas plataformas mais adequadas ao objetivo (geração de leads, vendas ou reconhecimento de marca). As campanhas são acompanhadas de forma contínua, com ajustes de públicos, criativos e orçamento conforme os dados de performance vão sendo gerados.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="font-display text-2xl mb-4 text-cream">Meta Ads (Facebook e Instagram)</h2>
          <p className="font-body font-light text-cream/60 leading-relaxed">
            Gestão de campanhas no Facebook e Instagram voltadas para geração de leads, tráfego qualificado e reconhecimento de marca, com segmentação de público e criativos ajustados ao momento e ao objetivo de cada negócio.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="font-display text-2xl mb-4 text-cream">Google Ads</h2>
          <p className="font-body font-light text-cream/60 leading-relaxed">
            Campanhas de pesquisa e display no Google Ads para captar demanda ativa, pessoas que já estão buscando um produto ou serviço parecido com o seu, com foco em conversão e custo por lead sob controle.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="font-display text-2xl mb-4 text-cream">Geração de leads</h2>
          <p className="font-body font-light text-cream/60 leading-relaxed">
            As campanhas são estruturadas para gerar leads qualificados, com formulários, WhatsApp ou landing pages de conversão integrados a fluxos de automação de atendimento, reduzindo o tempo entre o clique do anúncio e o primeiro contato.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="font-display text-2xl mb-4 text-cream">Para quais empresas</h2>
          <ul className="font-body font-light text-cream/60 leading-relaxed space-y-2 list-disc list-inside">
            <li>Negócios locais em Jundiaí e região que querem gerar mais clientes de forma previsível</li>
            <li>Prestadores de serviço que dependem de agenda cheia e fluxo constante de contatos</li>
            <li>Corretores de imóveis e imobiliárias, especialidade da HS Visual</li>
            <li>Empresas de outros segmentos que já têm um negócio estruturado e querem crescer com tráfego pago</li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="font-display text-2xl mb-4 text-cream">Processo de trabalho</h2>
          <p className="font-body font-light text-cream/60 leading-relaxed">
            Diagnóstico inicial do negócio e do público, estruturação das campanhas, publicação e acompanhamento contínuo, com relatórios periódicos sobre o andamento das campanhas e ajustes conforme os resultados observados.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="font-display text-2xl mb-4 text-cream">Métricas acompanhadas</h2>
          <p className="font-body font-light text-cream/60 leading-relaxed">
            Custo por clique, custo por lead, taxa de conversão e volume de leads gerados são acompanhados ao longo da campanha para orientar os ajustes de segmentação, criativos e orçamento.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="font-display text-2xl mb-6 text-cream">Perguntas frequentes</h2>
          <div className="space-y-6">
            {faqs.map((f, i) => (
              <div key={i} className="border-b border-cream/10 pb-6">
                <h3 className="font-body font-medium text-cream mb-2">{f.q}</h3>
                <p className="font-body font-light text-cream/60 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center border border-gold/20 rounded-lg py-12 px-6">
          <h2 className="font-display text-2xl mb-4 text-cream">Vamos conversar sobre o seu tráfego pago?</h2>
          <p className="font-body font-light text-cream/60 mb-8 max-w-lg mx-auto">
            Fale agora pelo WhatsApp e entenda como a HS Visual pode estruturar suas campanhas de Meta Ads e Google Ads em Jundiaí e região.
          </p>
          <a
            href="https://wa.me/5511953611000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold text-void font-body font-medium px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Falar no WhatsApp
          </a>
        </section>

        <section className="mt-16 pt-8 border-t border-cream/5">
          <p className="font-body font-light text-cream/30 text-[11px] tracking-[0.1em] uppercase">
            <Link href="/" className="hover:text-gold/70 transition-colors">Início</Link>
            {" · "}
            <Link href="/privacidade" className="hover:text-gold/70 transition-colors">Política de Privacidade</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
