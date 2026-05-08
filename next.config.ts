import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportação estática — Nginx serve os arquivos em produção
  output: "export",

  // next/image não tem servidor de otimização em modo export
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dubbc2scp/**",
      },
    ],
  },

  // Oculta o indicador de desenvolvimento (N) na tela
  devIndicators: false,

  // Desativa o "X-Powered-By: Next.js" no header de resposta
  poweredByHeader: false,
};

export default nextConfig;
