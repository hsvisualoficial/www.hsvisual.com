import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050505",
};

export const metadata: Metadata = {
  title: "Agência de Tráfego Pago em Jundiaí | HS Visual",
    description:
          "Agência de marketing digital em Jundiaí especializada em tráfego pago, Meta Ads, Google Ads, sites, landing pages e automação para empresas.",
    alternates: {
          canonical: "https://hsvisual.com",
    },
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
    title: "Agência de Tráfego Pago em Jundiaí | HS Visual",
        description:
                "Agência de marketing digital em Jundiaí especializada em tráfego pago, Meta Ads, Google Ads, sites, landing pages e automação para empresas.",
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
                    "Agência de marketing digital especializada em tráfego pago, automação de vendas e conteúdo estratégico para negócios de diferentes segmentos, com especialidade no mercado imobiliário",
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
                                  },
                {
                  "@type": "WebSite",
                  "@id": "https://hsvisual.com#website",
                  "name": "HS Visual",
                  "url": "https://hsvisual.com",
                  "inLanguage": "pt-BR",
                  "publisher": {
                    "@type": "Organization",
                    "@id": "https://hsvisual.com#organization"
                  }
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
                                  },
                {
                  "@type": "ProfessionalService",
                  "@id": "https://hsvisual.com#service",
                  "name": "Agência de Tráfego Pago e Automação de Vendas",
                  "description":
                    "Gestão profissional de campanhas em Meta Ads, Google Ads, automação de leads com IA e conteúdo estratégico para negócios de diferentes segmentos",
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
                      "name": "Para quais marcas a HS Visual trabalha?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "A HS Visual atende negócios de diferentes segmentos, com especialidade no mercado imobiliário (imobiliárias, corretores e lançamentos), além de negócios locais, prestadores de serviço e empresas de outras áreas. Atendimento presencial na região de Jundiaí/SP e remoto para todo o Brasil.",
                      },
                    },
                  ],
                },
                {
                  "@type": "VideoObject",
                  "@id": "https://hsvisual.com/#video-1",
                  "name": "Case Tráfego Pago: Imobiliária São Paulo — Meta Ads",
                  "description": "Vídeo case: gestão profissional de tráfego pago e Meta Ads para imobiliária em São Paulo. Demonstra estratégia de lead generation e automação de vendas.",
                  "uploadDate": "2026-07-02",
                  "duration": "PT5M",
                  "thumbnailUrl": "https://player.mediadelivery.net/play/695508/e2a645c3-7af9-4a7d-979e-f72d5bb69907",
                  "contentUrl": "https://player.mediadelivery.net/play/695508/e2a645c3-7af9-4a7d-979e-f72d5bb69907",
                  "embedUrl": "https://player.mediadelivery.net/play/695508/e2a645c3-7af9-4a7d-979e-f72d5bb69907",
                  "keywords": "tráfego pago,meta ads,google ads,imobiliário,case de sucesso,lead generation",
                  "publication": {
                    "@type": "BroadcastEvent",
                    "name": "HS Visual — Vídeo Maker de Elite",
                    "isLiveNow": false,
                  },
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

        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5JT983KF');
        `}} />

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
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5JT983KF" height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
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
