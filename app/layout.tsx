import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050505",
};

export const metadata: Metadata = {
  title: "HS Visual — Sonhos que Vendem",
  description:
    "Atelier de Estratégia Digital de Alto Padrão. Onde o Luxo encontra o Algoritmo. Tráfego de elite, social media editorial, audiovisual de cinema e sistemas autônomos para marcas Triple A.",
  keywords: ["agência digital", "tráfego de elite", "luxury marketing", "HS Visual", "performance digital"],
  icons: {
    icon: "https://res.cloudinary.com/dubbc2scp/image/upload/v1777402760/01_hs_visual_logo_3d_jewelry-removebg-preview_n7txjl.png",
    shortcut: "https://res.cloudinary.com/dubbc2scp/image/upload/v1777402760/01_hs_visual_logo_3d_jewelry-removebg-preview_n7txjl.png",
    apple: "https://res.cloudinary.com/dubbc2scp/image/upload/v1777402760/01_hs_visual_logo_3d_jewelry-removebg-preview_n7txjl.png",
  },
  openGraph: {
    title: "HS Visual — Sonhos que Vendem",
    description: "Atelier de Estratégia Digital de Alto Padrão.",
    url: "https://hsvisual.com",
    siteName: "HS Visual",
    images: [
      {
        url: "https://res.cloudinary.com/dubbc2scp/image/upload/v1777402760/01_hs_visual_logo_3d_jewelry-removebg-preview_n7txjl.png",
        width: 800,
        height: 200,
        alt: "HS Visual",
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
