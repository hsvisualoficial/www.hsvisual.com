import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agência de Marketing Digital em Jundiaí - HS Visual | Estratégia e Tráfego Pago',
  description: 'Agência de marketing digital especializada em tráfego pago (Meta e Google Ads), automação de vendas 24h e conteúdo estratégico. Atendemos marcas em Jundiaí, SP.',
  keywords: ['agência marketing digital jundiaí', 'marketing jundiaí', 'tráfego pago', 'meta ads', 'google ads'],
  robots: 'index, follow',
  openGraph: {
    title: 'Agência de Marketing Digital em Jundiaí - HS Visual',
    description: 'Agência especializada em tráfego pago, automação 24h e conteúdo estratégico para marcas de alto padrão.',
    url: 'https://hsvisual.com/agencia-de-marketing-digital-jundiai',
    type: 'website',
    images: [{ url: 'https://res.cloudinary.com/dubbc2scp/image/upload/v1777402760/01_hs_visual_logo_3d_jewelry-removebg-preview_n7txjl.png' }],
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'HS Visual',
    url: 'https://hsvisual.com',
    logo: 'https://res.cloudinary.com/dubbc2scp/image/upload/v1777402760/01_hs_visual_logo_3d_jewelry-removebg-preview_n7txjl.png',
    description: 'Agência de marketing digital especializada em tráfego pago, automação de vendas e conteúdo estratégico.',
    contactPoint: { '@type': 'ContactPoint', contactType: 'Customer Service', areaServed: 'BR' },
    areaServed: { '@type': 'City', name: 'Jundiaí', 'areaServed': 'SP' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'HS Visual', item: 'https://hsvisual.com' },
      { '@type': 'ListItem', position: 2, name: 'Agência de Marketing Digital Jundiaí', item: 'https://hsvisual.com/agencia-de-marketing-digital-jundiai' },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Agência de Marketing Digital',
    description: 'Serviços completos de tráfego pago, automação de vendas e conteúdo estratégico para crescimento escalável.',
    provider: { '@type': 'LocalBusiness', name: 'HS Visual', areaServed: 'Jundiaí, SP' },
    areaServed: { '@type': 'City', name: 'Jundiaí', addressRegion: 'SP' },
  },
];

export default function AgenciaMarketing() {
  return (
    <>
      <head>
        <meta name="canonical" content="https://hsvisual.com/agencia-de-marketing-digital-jundiai" />
      </head>
      <div className="min-h-screen bg-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Agência de Marketing Digital em Jundiaí
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            A HS Visual é uma agência de marketing digital especializada em tráfego pago estratégico, automação de vendas 24h e conteúdo que vende. 
            Transformamos sua operação em uma máquina de vendas com dados, não com suposição.
          </p>
          
          <div className="bg-slate-50 rounded-lg p-8 my-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Por que escolher a HS Visual?</h2>
            <ul className="space-y-4 text-lg text-slate-700">
              <li className="flex items-start"><span className="mr-4">✓</span> ROAS médio de 8,4× comprovado em carteira</li>
              <li className="flex items-start"><span className="mr-4">✓</span> Mais de R$ 10 milhões gerados para nossos clientes</li>
              <li className="flex items-start"><span className="mr-4">✓</span> Tráfego pago sem desperdício: apenas quem pode comprar vê seus anúncios</li>
              <li className="flex items-start"><span className="mr-4">✓</span> Automação de vendas que trabalha enquanto você dorme</li>
              <li className="flex items-start"><span className="mr-4">✓</span> Atendimento especializado em Jundiaí e região</li>
            </ul>
          </div>

          <div className="my-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Serviços de Marketing Digital</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border border-slate-200 rounded-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Tráfego Pago</h3>
                <p className="text-slate-700 mb-4">Meta Ads e Google Ads com estratégia cirúrgica: apenas orçamento para quem tem intenção real de compra.</p>
              </div>
              <div className="p-6 border border-slate-200 rounded-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Automação de Vendas</h3>
                <p className="text-slate-700 mb-4">IA 24h que qualifica, nutre e agenda automaticamente. Você acorda com reuniões marcadas.</p>
              </div>
              <div className="p-6 border border-slate-200 rounded-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Conteúdo Estratégico</h3>
                <p className="text-slate-700 mb-4">Social media, videomaker e criação de conteúdo que posiciona preço antes do primeiro contato.</p>
              </div>
              <div className="p-6 border border-slate-200 rounded-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Criação de Sites</h3>
                <p className="text-slate-700 mb-4">Landing pages e sites institucionais otimizados para conversão e SEO.</p>
              </div>
            </div>
          </div>

          <div className="my-12 bg-blue-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Próximos passos</h2>
            <p className="text-lg text-slate-700 mb-6">
              Quer saber quanto você está deixando na mesa? Agende um diagnóstico gratuito com nossos especialistas em Jundiaí.
            </p>
            <a href="https://wa.me/551199999999?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20agência%20de%20marketing%20digital%20em%20Jundiaí" 
               className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700">
              Conversar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
