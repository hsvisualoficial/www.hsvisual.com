import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Marketing Imobiliário - Geração de Leads | HS Visual',
  description: 'Marketing digital para imobiliárias e corretores. Tráfego pago em Meta Ads e Google Ads, geração e qualificação de leads de alto valor.',
  keywords: ['marketing imobiliário', 'tráfego pago imóveis', 'leads imobiliários'],
  robots: 'index, follow',
  openGraph: {
    title: 'Marketing Imobiliário - HS Visual',
    description: 'Estratégia de tráfego pago e automação especializada para imobiliárias e corretores de alto padrão.',
    url: 'https://hsvisual.com/marketing-imobiliario',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Marketing Imobiliário',
  description: 'Serviço de tráfego pago e geração de leads para corretores, imobiliárias e construtoras.',
  provider: { '@type': 'Organization', name: 'HS Visual' },
  serviceArea: { '@type': 'AdministrativeArea', name: 'Brasil' },
};

export default function MarketingImobiliario() {
  return (
    <>
      <head>
        <meta name="canonical" content="https://hsvisual.com/marketing-imobiliario" />
      </head>
      <div className="min-h-screen bg-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Marketing Imobiliário: Geração de Leads de Alto Valor
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            A HS Visual especializa-se em tráfego pago para imobiliárias, corretores e lançamentos. 
            Geramos leads qualificados com intenção real de compra através de Meta Ads e Google Ads.
          </p>

          <div className="bg-slate-50 rounded-lg p-8 my-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Por que Marketing Digital para Imóveis?</h2>
            <ul className="space-y-4 text-lg text-slate-700">
              <li className="flex items-start"><span className="mr-4">✓</span> Leads qualificados com intenção real de compra</li>
              <li className="flex items-start"><span className="mr-4">✓</span> Rastreamento completo do lead até o fechamento</li>
              <li className="flex items-start"><span className="mr-4">✓</span> Alcance de públicos de alto poder aquisitivo</li>
              <li className="flex items-start"><span className="mr-4">✓</span> Criativos otimizados para empreendimentos específicos</li>
              <li className="flex items-start"><span className="mr-4">✓</span> Automação de follow-up 24 horas</li>
            </ul>
          </div>

          <div className="my-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Soluções de Marketing Imobiliário</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border border-slate-200 rounded-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Tráfego Pago para Lançamentos</h3>
                <p className="text-slate-700">Campanha especializada no lançamento de empreendimentos com criativos de alta qualidade.</p>
              </div>
              <div className="p-6 border border-slate-200 rounded-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Geração de Leads Contínua</h3>
                <p className="text-slate-700">Sistema de geração e qualificação de leads automático para manter seu pipeline abastecido.</p>
              </div>
              <div className="p-6 border border-slate-200 rounded-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Meta Ads e Google Ads</h3>
                <p className="text-slate-700">Estratégia omnicanal com públicos segmentados por perfil de comprador e faixa de preço.</p>
              </div>
              <div className="p-6 border border-slate-200 rounded-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Automação e Follow-up</h3>
                <p className="text-slate-700">IA que qualifica leads e agenda visitas automaticamente. Sem perder oportunidade por demora.</p>
              </div>
            </div>
          </div>

          <div className="my-12 bg-blue-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Próximos passos</h2>
            <p className="text-lg text-slate-700 mb-6">
              Quer ver quantos leads qualificados você pode gerar por mês? Fale com nossos especialistas.
            </p>
            <a href="https://wa.me/551199999999?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20marketing%20imobiliário" 
               className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700">
              Conversar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
