import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── HS Visual Brandbook V1.1 — Paleta Oficial ────────────
        void:      "#050505",   // Vazio 01 — Preto Oficial da Marca
        obsidian:  "#1C1C1C",   // Grafite 01 — Cards · UI Components
        gold:      "#C5A467",   // Champagne 01 — Cor de Marca · CTAs
        "gold-soft":"#8B7251",  // Champagne 02 — Verniz · Logo em fundo claro
        white:     "#FFFFFF",   // Branco Puro — texto principal
        gray:      "#A0A0A0",   // Cinza Suave — texto de apoio
        areia:     "#F5F2ED",   // Areia 01 — Papelaria · Impressão
        // Identidade HS Visual — acentos
        magenta:   "#E01183",
        coral:     "#FF5E50",
        turquoise: "#20C2AE",
        // Alias de compatibilidade (cream → white)
        cream:     "#FFFFFF",
        // Alpha tokens
        "gold-glow":  "rgba(197,164,103,0.12)",
        "gold-dim":   "rgba(197,164,103,0.06)",
        "cream-60":   "rgba(255,255,255,0.60)",
        "cream-30":   "rgba(255,255,255,0.30)",
        "cream-10":   "rgba(255,255,255,0.10)",
        "wire":       "rgba(197,164,103,0.12)",
        "wire-soft":  "rgba(255,255,255,0.06)",
        "wire-em":    "rgba(197,164,103,0.25)",
      },
      fontFamily: {
        display: ["Playfair Display SC", "Georgia", "serif"],
        body:    ["Montserrat", "Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 8vw, 7rem)",   { lineHeight: "1.0",  letterSpacing: "-0.02em"  }],
        "display-lg": ["clamp(2rem, 5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.01em"  }],
        "display-md": ["clamp(1.5rem, 3vw, 2.5rem)",{ lineHeight: "1.1", letterSpacing: "-0.008em" }],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C5A467 0%, #B8956A 50%, #C5A467 100%)",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        "gold-sm":  "0 0 12px rgba(197,164,103,0.14)",
        "gold-md":  "0 0 30px rgba(197,164,103,0.12), 0 0 60px rgba(197,164,103,0.06)",
        "gold-lg":  "0 0 60px rgba(197,164,103,0.16), 0 0 120px rgba(197,164,103,0.07)",
        "glass":    "0 4px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      borderRadius: {
        "xs":      "2px",
        "sm":      "4px",
        "DEFAULT": "8px",
        "md":      "10px",
        "lg":      "16px",
        "xl":      "24px",
        "2xl":     "32px",
      },
      animation: {
        "float":      "float 6s ease-in-out infinite",
        "pulse-gold": "pulse-gold 3s ease-in-out infinite",
        "counter":    "counter 2s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(197,164,103,0.08)" },
          "50%":      { boxShadow: "0 0 40px rgba(197,164,103,0.22)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
