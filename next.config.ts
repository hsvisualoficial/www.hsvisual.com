import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportação estática — Nginx serve os arquivos em produção
  output: "export",

  // Otimização de imagens ativada com geração de WebP
  images: {
    unoptimized: false,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dubbc2scp/**",
      },
      {
        protocol: "https",
        hostname: "stream.mediadelivery.net",
        pathname: "/695508/**",
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Oculta o indicador de desenvolvimento (N) na tela
  devIndicators: false,

  // Desativa o "X-Powered-By: Next.js" no header de resposta
  poweredByHeader: false,
};

export default nextConfig;
