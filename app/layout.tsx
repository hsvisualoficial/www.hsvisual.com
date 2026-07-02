import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050505",
};

export const metadata: Metadata = {
  title: "HS Visual — Agência de Tráfego Pago & Automação | Sonhos que Vendem",
  description:
    "Agência de marketing digital especializada em tráfego pago (Meta Ads, Google Ads), automação de vendas e conteúdo estratégico. ROAS 8.4× comprovado. Marcas Triple A. Jundiaí, SP.",
  keywords: [
    "agência marketing digital",
    "tráfego pago",
    "google ads",
    "meta ads",
    "automação vendas",
    "lead generation",
    "agência brasil",
    "gestão anúncios",
    "HS Visual",
    "performance digital",
  ],
  icons: {
    icon: "https://res.cloudinary.com/dubbc2scp/image/upload/v1777402760/01_hs_visual_logo_3d_jewelry-removebg-preview_n7txjl.png",
    shortcut: "https://res.cloudinary.com/dubbc2scp/image/upload/v1777402760/01_hs_visual_logo_3d_jewelry-removebg-preview_n7txjl.png",
    apple: "https://res.cloudinary.com/dubbc2scp/image/upload/v1777402760/01_hs_visual_logo_3d_jewelry-removebg-preview_n7txjl.png",
  },
  openGraph: {
    title: "HS Visual — Agência de Tráfego Pago & Automação de Vendas",
    description:
      "Transformamos sua operação em máquina de vendas com tráfego pago estratégico e IA 24h. ROAS 8.4× comprovado para marcas de luxo.",
    url: "https://hsvisual.com",
    siteName: "HS Visual",
    images: [
      {
        url: "https://res.cloudinary.com/dubbc2scp/image/upload/v1777402760/01_hs_visual_logo_3d_jewelry-removebg-preview_n7txjl.png",
        width: 800,
        height: 200,
        alt: "HS Visual — Agência de Tráfego Pago",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300;1,400&family=Playfair+Display+SC:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600&display=swap"
          rel="stylesheet"
        />

        {/* ── JSON-LD Schema.org — Agência de Marketing Digital ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://hsvisual.com#organization",
                  "name": "HS Visual",
                  "alternateName": "HS Visual — Agência de Tráfego Pago",
                  "description":
                    "Agência de marketing digital especializada em tráfego pago, automação de vendas e conteúdo estratégico para marcas de alto padrão",
                  "url": "https://hsvisual.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://res.cloudinary.com/dubbc2scp/image/upload/v1777402760/01_hs_visual_logo_3d_jewelry-removebg-preview_n7txjl.png",
                    "width": 250,
                    "height": 60,
                  },
                  "image": "https://res.cloudinary.com/dubbc2scp/image/upload/v1777402760/01_hs_visual_logo_3d_jewelry-removebg-preview_n7txjl.png",
                  "sameAs": [
                    "https://www.instagram.com/hsvisual.oficial/",
                    "https://wa.me/5511953611000",
                  ],
                  "founder": {
                    "@type": "Person",
                    "name": "Helder Show",
                    "jobTitle": "Estrategista e Fundador",
                  },
                  "foundingDate": "2014",
                  "areaServed": "BR",
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+55-11-95361-1000",
                    "contactType": "Customer Service",
                    "email": "contato@hsvisual.com",
                  },
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Jundiaí",
                    "addressRegion": "SP",
                    "addressCountry": "BR",
                  },
                  "priceRange": "$$$",
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://hsvisual.com#localbusiness",
                  "name": "HS Visual",
                  "businessType": "Digital Marketing Agency",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Jundiaí",
                    "addressRegion": "SP",
                    "addressCountry": "BR",
                  },
                  "telephone": "+55-11-95361-1000",
                  "priceRange": "$$$",
                },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://hsvisual.com#service",
                  "name": "Agência de Tráfego Pago e Automação de Vendas",
                  "description":
                    "Gestão profissional de campanhas em Meta Ads, Google Ads, automação de leads com IA e conteúdo estratégico de alto padrão",
                  "provider": {
                    "@type": "Organization",
                    "@id": "https://hsvisual.com#organization",
                  },
                  "areaServed": "BR",
                  "serviceType": [
                    "Paid Traffic Management",
                    "Google Ads",
                    "Meta Ads",
                    "Lead Automation",
                    "Social Media Strategy",
                    "Video Production",
                  ],
                },
                {
                  "@type": "AggregateRating",
                  "@id": "https://hsvisual.com#rating",
                  "ratingValue": "8.4",
                  "bestRating": "10",
                  "name": "ROAS Médio",
                  "description": "Retorno sobre investimento médio em campanhas de tráfego pago",
                  "ratingCount": "130",
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "O que é tráfego pago?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Tráfego pago é a gestão profissional de anúncios em plataformas como Meta Ads (Facebook/Instagram) e Google Ads. A HS Visual especializa-se em converter esse tráfego em vendas reais.",
                      },
                    },
                    {
                      "@type": "Question",
                      "name": "Qual é o ROAS médio da HS Visual?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "O ROAS (Return on Ad Spend) médio comprovado é de 8.4×, significando que cada R$ 1 investido em anúncios gera R$ 8.4 em faturamento.",
                      },
                    },
                    {
                      "@type": "Question",
                      "name": "Para quais marcas a HS Visual trabalha?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A HS Visual especializa-se em marcas Triple A (alto padrão) com ticket médio elevado: imobiliário de luxo, saúde premium, corporativos. Atendemos todo o Brasil.",
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />

        {/* ── Infraestrutura de Pixel — instale seus scripts aqui ── */}
        {/* Meta Pixel — substituir pelo seu Pixel ID */}
        {/* <script dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s){...}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', 'SEU_PIXEL_ID');
          fbq('track', 'PageView');
        `}} /> */}

        {/* Google Tag Manager — substituir pelo seu GTM ID */}
        {/* <script dangerouslySetInnerHTML={{ __html: `
          (function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-XXXXXXX');
        `}} /> */}

        {/* Google Analytics GA4 — substituir pelo seu Measurement ID */}
        {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" /> */}
        {/* <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}} /> */}

        {/* TikTok Pixel — substituir pelo seu Pixel ID */}
        {/* <script dangerouslySetInnerHTML={{ __html: `...` }} /> */}
      </head>
      <body className="bg-void text-cream antialiased">
        <svg style={{ display: "none", position: "absolute" }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="nobg">
              <feColorMatrix type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                       -1 -1 -1 3 0" />
            </filter>
          </defs>
        </svg>
        {children}
      </body>
    </html>
  );
}
