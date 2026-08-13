import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criação de Sites Otimizados para Conversão | HS Visual',
  description: 'Criação de sites institucionais e landing pages de alta conversão. React, Next.js, design responsivo e SEO técnico.',
  keywords: ['criação de sites', 'landing page', 'site institucional', 'web design', 'seo técnico'],
  robots: 'index, follow',
  openGraph: {
    title: 'Criação de Sites | HS Visual',
    description: 'Sites e landing pages otimizados para conversão, velocidade e SEO. Design responsivo.',
    url: 'https://hsvisual.com/criacao-de-sites',
    type: 'website',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Criação de Sites',
  description: 'Desenvolvimento de sites institucionais, landing pages e e-commerce otimizados para conversão e SEO.',
  provider: { '@type': 'Organization', name: 'HS Visual' },
  areaServed: { '@type': 'Country', name: 'BR' },
};

export default function CriacaoDeSites() {
  return (
    <>
      <head>
        <meta name="canonical" content="https://hsvisual.com/criacao-de-sites" />
      </head>
      <div className="min-h-screen bg-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
            Criação de Sites Otimizados para Conversão
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            Sites e landing pages desenvolvidos com tecnologia de ponta, design de elite e SEO técnico. 
            Cada página é construída para vender, não apenas para existir.
          </p>

          <div className="bg-slate-50 rounded-lg p-8 my-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Por que nossos sites vendem mais?</h2>
            <ul className="space-y-4 text-lg text-slate-700">
              <li className="flex items-start"><span className="mr-4">✓</span> Design responsivo e de alto impacto visual</li>
              <li className="flex items-start"><span className="mr-4">✓</span> Velocidade otimizada (Core Web Vitals)</li>
              <li className="flex items-start"><span className="mr-4">✓</span> SEO técnico: canonical, sitemap, schema JSON-LD</li>
              <li className="flex items-start"><span className="mr-4">✓</span> Integração com WhatsApp e CRM automático</li>
              <li className="flex items-start"><span className="mr-4">✓</span> Analytics e rastreamento de conversões configurados</li>
              <li className="flex items-start"><span className="mr-4">✓</span> Suporte e manutenção contínua</li>
            </ul>
          </div>

          <div className="my-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Tipos de Sites que Desenvolvemos</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border border-slate-200 rounded-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Landing Pages</h3>
                <p className="text-slate-700">Páginas otimizadas para campanhas de tráfego pago. Uma única intenção, máximo resultado.</p>
              </div>
              <div className="p-6 border border-slate-200 rounded-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Sites Institucionais</h3>
                <p className="text-slate-700">Páginas com design premium que apresentam sua marca com navegabilidade intuitiva.</p>
              </div>
              <div className="p-6 border border-slate-200 rounded-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">E-commerce</h3>
                <p className="text-slate-700">Lojas online otimizadas para vender com integração de pagamento e estoque.</p>
              </div>
              <div className="p-6 border border-slate-200 rounded-lg">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Sites para Negócios Locais</h3>
                <p className="text-slate-700">Sites otimizados para SEO local com Google Maps integrado.</p>
              </div>
            </div>
          </div>

          <div className="my-12 bg-green-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Stack Tecnológico</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Frontend</h3>
                <p className="text-slate-700 text-sm">React + Next.js + TypeScript + Tailwind CSS</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Deploy</h3>
                <p className="text-slate-700 text-sm">Vercel (CDN Global, CI/CD automático)</p>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-2">Integrações</h3>
                <p className="text-slate-700 text-sm">WhatsApp, Google Analytics, Stripe, Hotjar</p>
              </div>
            </div>
          </div>

          <div className="my-12 bg-blue-50 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Próximos passos</h2>
            <p className="text-lg text-slate-700 mb-6">
              Quer um site que venda? Fale com nossos especialistas e receba um diagnóstico de potencial.
            </p>
            <a href="https://wa.me/551199999999?text=Olá!%20Gostaria%20de%20um%20orçamento%20para%20criação%20de%20site" 
               className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700">
              Solicitar Orçamento
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
