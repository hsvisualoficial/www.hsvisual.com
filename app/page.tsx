"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticCursor from "@/components/MagneticCursor";
import HelenaChat from "@/components/HelenaChat";

const HELDER_PHOTO_A = "/bio_auth/ChatGPT Image 1_05_2026, 11_49_43.png";
const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL ?? "https://seu-n8n.dominio.com/webhook/hsvisual-quiz";

// Global quiz modal trigger — suporta serviço pré-selecionado
let _openQuiz: ((service?: string) => void) | null = null;
function openQuizModal(service?: string) { _openQuiz?.(service); }

const WA_NUMBER = "5511953611000";
const WA_MSG = encodeURIComponent("Olá Helder, vim pelo site e quero elevar o padrão do meu marketing!");

function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 60,
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 0 2px rgba(197,164,103,0.45), 0 0 24px rgba(197,164,103,0.25)",
        textDecoration: "none",
      }}
    >
      <span
        className="wa-ping"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: "rgba(197,164,103,0.35)",
          pointerEvents: "none",
        }}
      />
      <svg viewBox="0 0 24 24" fill="white" width="30" height="30" style={{ position: "relative", zIndex: 1 }}>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

// ── Helpers ───────────────────────────────────────────────────────
function useCounter(target: number, duration = 2000, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

// ── Loading Screen ────────────────────────────────────────────────
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const duration = 2200;
    const steps = 100;
    const interval = duration / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 300);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center"
        >
          {/* Grid lines */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(197,164,103,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(197,164,103,0.8) 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          <div className="relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-[10px] font-body font-medium tracking-[0.3em] text-cream/30 uppercase mb-8"
            >
              HS Visual — Iniciando
            </motion.div>

            <div className="overflow-hidden">
              <div
                className="font-body font-light text-cream/90 tabular-nums"
                style={{ fontSize: "clamp(5rem, 18vw, 12rem)", lineHeight: 1, letterSpacing: "-0.04em" }}
              >
                {String(count).padStart(3, "0")}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-12 w-48 h-[1px] bg-cream/10 mx-auto overflow-hidden">
              <motion.div
                className="h-full bg-gold"
                style={{ width: `${count}%` }}
              />
            </div>

            <div className="mt-6 text-sm font-cormorant text-cream/20">
              Sonhos que Vendem
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const LOGO_SRC = "/bio_auth/LOGO HS VISUAL - 1920 x 1080 - SEM FUNDO.png";

const NAV_LINKS = [
  { label: "Anúncios",     anchor: "resultados" },
  { label: "Social Media", anchor: "social"     },
  { label: "VideoMaker",   anchor: "filmmaker"  },
  { label: "Automação",    anchor: "automacao"  },
  { label: "Sobre Nós",    anchor: "sobre"      },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── CountUp — anima número de 0 até o valor final ────────────────
function CountUp({
  to,
  suffix = "",
  decimals = 0,
  duration = 1.6,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = parseFloat((eased * to).toFixed(decimals));
      setCount(current);
      if (progress < 1) requestAnimationFrame(animate);
      else setCount(to);
    };
    requestAnimationFrame(animate);
  }, [inView, to, decimals, duration]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}{suffix}
    </span>
  );
}

// ── Navbar ────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [logoReady, setLogoReady] = useState(false);
  const [visible,   setVisible]   = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleHide = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (window.scrollY >= 80) setVisible(false);
    }, 700);
  };

  useEffect(() => {
    const onScroll = () => {
      const atTop = window.scrollY < 80;
      setScrolled(window.scrollY > 40);
      if (atTop) {
        if (hideTimer.current) clearTimeout(hideTimer.current);
        setVisible(true);
      } else {
        scheduleHide();
      }
    };
    setVisible(window.scrollY < 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Detecta mouse no topo da tela (mesmo com navbar invisible/pointerEvents:none)
    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY < 72) {
        if (hideTimer.current) clearTimeout(hideTimer.current);
        setVisible(true);
      } else if (visible) {
        scheduleHide();
      }
    };
    document.addEventListener("mousemove", onMouseMove);
    return () => document.removeEventListener("mousemove", onMouseMove);
  }, [visible]);

  useEffect(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setLogoReady(true));
    });
  }, []);

  return (
    <motion.nav
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -16 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong py-4" : "py-6"
      }`}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <div className="max-w-7xl mx-auto px-6 relative flex items-center justify-between">
        {/* Logo — esquerda */}
        <a href="/" aria-label="HS Visual — Home" className="flex items-center py-1 shrink-0">
          <img
            src={LOGO_SRC}
            alt="HS Visual"
            style={{
              height: 40,
              width: "auto",
              display: "block",
              opacity: logoReady ? 1 : 0,
              transition: "opacity 0.35s ease",
            }}
          />
        </a>

        {/* Links — absolutamente centrados */}
        <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map(({ label, anchor }) => (
            <button
              key={anchor}
              onClick={() => scrollTo(anchor)}
              className="text-[10.5px] font-body font-medium tracking-widest uppercase text-cream/50 hover:text-gold transition-colors duration-300 whitespace-nowrap"
            >
              {label}
            </button>
          ))}
        </div>

        {/* CTA — direita */}
        <button
          onClick={() => openQuizModal()}
          className="shrink-0 text-xs font-body font-medium tracking-[0.2em] uppercase border border-gold/40 hover:border-gold hover:shadow-gold-sm hover:-translate-y-0.5 text-gold px-5 py-2 rounded transition-all duration-300"
          aria-label="Agendar consultoria de tráfego pago — diagnóstico gratuito com gestor especializado em Meta Ads"
        >
          Consultoria
        </button>
      </div>
    </motion.nav>
  );
}

// ── Hero ──────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ height: "100vh", background: "#050505" }}
    >
      {/* ── FOTO — full bleed, ancorada à direita ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HELDER_PHOTO_A}
        alt="Helder Show — Estrategista em Tráfego Pago, Meta Ads e Automação de Vendas"
        className="absolute inset-0 w-full h-full select-none pointer-events-none"
        style={{ objectFit: "cover", objectPosition: "62% 10%" }}
        draggable={false}
      />

      {/* ── GRADIENTE — esquerda negra → centro transparente ── */}
      {/* Cortina soberana: preto absoluto até ~30%, dissolução suave até ~72%, foto 100% nítida à direita */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: "linear-gradient(to right, #050505 0%, #050505 28%, rgba(5,5,5,0.92) 40%, rgba(5,5,5,0.60) 52%, rgba(5,5,5,0.18) 66%, transparent 78%)",
        }}
      />
      {/* Fade topo — espaço para navbar */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ zIndex: 2, height: "18%", background: "linear-gradient(to bottom, rgba(5,5,5,0.75) 0%, transparent 100%)" }} />
      {/* Fade base — ancora a faixa inferior */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ zIndex: 2, height: "22%", background: "linear-gradient(to top, #050505 0%, rgba(5,5,5,0.55) 55%, transparent 100%)" }} />

      {/* ── CONTEÚDO — coluna esquerda, zona preta ── */}
      <div className="relative z-10 h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, x: -32, filter: "blur(6px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center flex-1"
          style={{
            paddingTop: "6rem",
            paddingLeft: "clamp(2rem, 6vw, 5.5rem)",
            maxWidth: "clamp(320px, 50%, 600px)",
          }}
        >
          <h1
            className="font-display leading-[1.0] mb-1"
            style={{ fontSize: "clamp(2.2rem, 3.6vw, 3.8rem)", color: "#FFFFFF", letterSpacing: "-0.01em" }}
          >
            Tráfego Pago, Sites e Automação
          </h1>

          <h2
            className="font-display-italic leading-[1.0] mb-8"
            style={{
              fontSize: "clamp(2.2rem, 3.6vw, 3.8rem)",
              color: "#C5A467",
              letterSpacing: "-0.02em",
              textShadow: "0 0 48px rgba(197,164,103,0.20)",
            }}
          >
            para Transformar Presença Digital em Oportunidades.
          </h2>

          {/* Micro-linha descritiva — contexto técnico sutil */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="font-body font-light text-gold mb-6"
            style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: 0.55 }}
          >
            Tráfego Pago · Automação 24h · IA
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-body font-light mb-6"
            style={{ color: "#808080", fontSize: "clamp(0.78rem, 0.9vw, 0.84rem)", maxWidth: 360, lineHeight: 1.8 }}
          >
            Sua empresa já fatura. Mas depende de indicação, não tem um sistema de aquisição
            que funcione sozinho e perde leads todos os dias. Existe uma saída — e começa aqui.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.65 }}
            onClick={() => openQuizModal()}
            className="shimmer-auto pulse-cta font-body font-medium uppercase rounded transition-all duration-300 hover:-translate-y-1 hover:shadow-gold-md"
            aria-label="Quero escalar meu negócio com tráfego pago profissional — Meta Ads e Google Ads estratégico"
            style={{
              background: "#C5A467",
              color: "#050505",
              fontSize: "0.61rem",
              letterSpacing: "0.22em",
              padding: "1.0rem 2.2rem",
              whiteSpace: "nowrap",
              alignSelf: "flex-start",
            }}
          >
            QUERO ESCALAR MEU NEGÓCIO
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="font-body font-light mt-3 mb-8"
            style={{ color: "#3A3A3A", fontSize: "0.67rem", letterSpacing: "0.04em" }}
          >
            Sem tentativa e erro. Sem campanhas no escuro.
          </motion.p>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center">
              {[
                "/social_media/ORGANIZAGRAM BY CAROL RHEIN (20).png",
                "/social_media/ORGANIZAGRAM BY CAROL RHEIN (15).png",
                "/social_media/ORGANIZAGRAM BY CAROL RHEIN (18).png",
                "/social_media/ORGANIZAGRAM BY CAROL RHEIN (17).png",
              ].map((src, i) => (
                <div key={i} className="rounded-full border-2 overflow-hidden flex-shrink-0"
                  style={{
                    width: 28, height: 28,
                    marginLeft: i === 0 ? 0 : -8,
                    borderColor: "#050505",
                    background: `rgba(197,164,103,${0.12 + i * 0.06})`,
                    zIndex: 4 - i, position: "relative",
                    backgroundImage: `url(${src})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }} />
              ))}
            </div>
            <div>
              <div className="font-body font-semibold" style={{ fontSize: "0.70rem", color: "#C5A467" }}>
                +R$ 10.000.000
              </div>
              <div className="font-body font-light" style={{ fontSize: "0.62rem", color: "#9CA3AF", lineHeight: 1.3 }}>
                gerados para nossos clientes
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Faixa inferior — plataformas ── */}
        <div className="relative z-10 w-full flex-shrink-0">
          <div
            className="mx-auto py-4 flex items-center justify-between gap-6"
            style={{ paddingLeft: "clamp(2rem, 6vw, 5.5rem)", paddingRight: "clamp(1rem, 3.5vw, 3.5rem)" }}
          >
            <span
              className="font-body font-light uppercase tracking-[0.32em] hidden sm:block"
              style={{ color: "#A0A0A0", fontSize: "0.57rem" }}
            >
              Gestão de campanhas nas principais plataformas
            </span>
            <div className="flex items-center gap-7">
              <svg width="72" height="16" viewBox="0 0 72 16" style={{ opacity: 0.32 }}>
                <text x="0" y="12" fontFamily="Montserrat,sans-serif" fontSize="12" fontWeight="500" fill="#A0A0A0">Google Ads</text>
              </svg>
              <svg width="54" height="16" viewBox="0 0 54 16" style={{ opacity: 0.32 }}>
                <text x="0" y="12" fontFamily="Montserrat,sans-serif" fontSize="12" fontWeight="500" fill="#A0A0A0">Meta Ads</text>
              </svg>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.32 }}>
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="#A0A0A0" strokeWidth="1.4"/>
                <circle cx="12" cy="12" r="4" stroke="#A0A0A0" strokeWidth="1.4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="#A0A0A0"/>
              </svg>
              <svg width="20" height="18" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.32 }}>
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.96C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" stroke="#A0A0A0" strokeWidth="1.4"/>
                <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#A0A0A0"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Faixa Sutil Pós-Hero — Clareza Técnica + Tagline ─────────────
function BrandStripSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
      className="relative px-6 overflow-hidden"
      style={{
        height: "60px",
        background: "linear-gradient(90deg, rgba(5,5,5,1) 0%, rgba(5,5,5,0.98) 50%, rgba(5,5,5,1) 100%)",
        borderBottom: "1px solid rgba(197,164,103,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Descrição técnica — esquerda */}
        <div className="flex-1 flex items-center gap-3">
          <span
            className="font-body text-cream/35"
            style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            Agência de Marketing Digital
          </span>
          <span className="text-cream/15">·</span>
          <span
            className="font-body text-cream/35"
            style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}
          >
            Tráfego Pago · Automação
          </span>
        </div>

        {/* Ícones centrais — 35% opacidade */}
        <div className="flex items-center gap-4 opacity-35">
          {/* Google Ads icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
            <path d="M8 2H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 12H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2zm12-12h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm0 12h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2z" />
          </svg>
          {/* Meta Ads icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
          {/* IA icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
          </svg>
        </div>

        {/* Tagline institucional — direita */}
        <div className="flex-1 text-right">
          <span
            className="font-cormorant text-gold/60"
            style={{ fontSize: "14px", fontStyle: "italic", fontWeight: 300, letterSpacing: "0.05em" }}
          >
            Sonhos que Vendem
          </span>
        </div>
      </div>
    </motion.section>
  );
}

// ── Estratégia Section ────────────────────────────────────────────
function EstrategiaSection() {
  const pillars = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="22"/><line x1="2" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="22" y2="12"/>
        </svg>
      ),
      title: "Anúncios para Quem Compra",
      desc: "Paramos de mostrar seus anúncios para todo mundo. Cada real vai para quem tem poder de compra e intenção de fechar — no momento certo.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
      title: "Zero Real Desperdiçado",
      desc: "Rastreamos cada clique até a venda. Sabemos qual campanha trouxe qual cliente. Alocamos onde o retorno é comprovado — não suposto.",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
        </svg>
      ),
      title: "Escala Sem Teto",
      desc: "Testamos com verba pequena, validamos o que converte e escalamos sem risco. Você cresce com método — não com sorte.",
    },
  ];

  return (
    <section className="py-16 px-6 bg-void border-t border-cream/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="font-body text-[12px] tracking-[0.3em] uppercase text-gold mb-5 font-medium">
              Por que 9 em 10 campanhas de tráfego pago não convertem
            </div>
            <h2
              className="font-display text-cream mb-5"
              style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", letterSpacing: "-0.025em", lineHeight: "1.05" }}
            >
              A diferença entre campanhas que <span className="font-display-italic text-gold">sangram</span> e as que <span className="font-display-italic text-gold">multiplicam.</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-body font-light text-cream/40 leading-relaxed"
            style={{ fontSize: "clamp(0.9rem, 1.4vw, 1rem)" }}
          >
            A maioria das empresas perde dinheiro em anúncios porque não sabe o que está errado.
            Na HS Visual, cada decisão tem base em dados reais — sem suposição, sem desperdício.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass-hover rounded-2xl p-8 group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-gold mb-6 transition-all duration-400"
                style={{ background: "rgba(197,164,103,0.06)", border: "1px solid rgba(197,164,103,0.14)" }}
              >
                {p.icon}
              </div>
              <div className="font-body font-medium text-cream/85 text-sm mb-3">{p.title}</div>
              <p className="font-body font-light text-cream/35 text-xs leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Objeções Section ──────────────────────────────────────────────
function ObjecoesSection() {
  const objecoes = [
    {
      q: "Já tentei tráfego pago e não funcionou.",
      a: "O canal não era o problema — era a falta de método. Tráfego sem estratégia é como contratar um vendedor sem script. A HS Visual traz o sistema que faltava.",
    },
    {
      q: "Meu nicho é muito específico.",
      a: "Nichos específicos e de alto ticket são onde trabalhamos melhor. Quanto mais nichado seu mercado, menos concorrência no leilão de anúncios — e mais barato fica atrair o cliente certo.",
    },
    {
      q: "O investimento é alto demais.",
      a: "Com ROAS médio de 8,4×, cada R$ 10.000 investidos retornam R$ 84.000 em faturamento. O custo real é continuar dependendo de indicação.",
    },
    {
      q: "Não tenho tempo para acompanhar.",
      a: "Você não gerencia campanha — você recebe resultado. Seu gestor dedicado te manda um relatório por semana. Sua única função é fechar os leads que chegam prontos.",
    },
  ];

  return (
    <section className="py-16 px-6 bg-obsidian/20 border-t border-cream/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="font-body text-[10px] tracking-[0.4em] uppercase text-gold/55 mb-4">O que está te impedindo</div>
          <h2
            className="font-display-italic text-cream"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.02em" }}
          >
            Por que você ainda <span className="text-gold">não escalou?</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {objecoes.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="glass-hover rounded-2xl p-8 group"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-gold/60 flex-shrink-0 mt-2" />
                <span className="font-body font-medium text-cream/75 text-sm leading-snug">{item.q}</span>
              </div>
              <p className="font-body font-light text-cream/35 text-xs leading-relaxed pl-4">{item.a}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => openQuizModal()}
            className="shimmer-auto font-body font-medium tracking-[0.25em] uppercase text-void px-10 py-4 rounded transition-all duration-300 pulse-cta"
            style={{ background: "#C5A467", fontSize: "0.72rem" }}
          >
            AGENDAR DIAGNÓSTICO
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ── Section wrapper ───────────────────────────────────────────────
function Section({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      style={{ scrollMarginTop: "88px" }}
    >
      {children}
    </motion.section>
  );
}

// ── Ambient Orb — iluminação parallax dourada ─────────────────────
function AmbientOrb({
  width = 500,
  height = 500,
  style = {},
  speed = 0.25,
}: {
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  speed?: number;
}) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 4000], [0, -4000 * speed]);

  return (
    <motion.div
      style={{
        position: "absolute",
        width,
        height,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(197,164,103,0.07) 0%, transparent 70%)`,
        filter: "blur(70px)",
        pointerEvents: "none",
        y,
        ...style,
      }}
    />
  );
}

// ── TiltCard — 3D perspective tilt with gold glare ────────────────
function TiltCard({
  children,
  className = "",
  intensity = 8,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafId    = useRef<number | null>(null);
  const target   = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, o: 0 });
  const cur      = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, o: 0 });

  useEffect(() => {
    const lp = (a: number, b: number) => a + (b - a) * 0.09;
    const tick = () => {
      cur.current.rx = lp(cur.current.rx, target.current.rx);
      cur.current.ry = lp(cur.current.ry, target.current.ry);
      cur.current.gx = lp(cur.current.gx, target.current.gx);
      cur.current.gy = lp(cur.current.gy, target.current.gy);
      cur.current.o  = lp(cur.current.o,  target.current.o);
      if (cardRef.current) {
        cardRef.current.style.transform =
          `perspective(900px) rotateX(${cur.current.rx}deg) rotateY(${cur.current.ry}deg)`;
      }
      if (glareRef.current) {
        glareRef.current.style.background =
          `radial-gradient(circle at ${cur.current.gx}% ${cur.current.gy}%, rgba(197,164,103,0.13) 0%, transparent 60%)`;
        glareRef.current.style.opacity = String(cur.current.o);
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top)  / r.height;
    target.current.ry = (x - 0.5) * intensity * 2;
    target.current.rx = -(y - 0.5) * intensity * 2;
    target.current.gx = x * 100;
    target.current.gy = y * 100;
    target.current.o  = 1;
  };

  const onMouseLeave = () => {
    target.current.rx = 0;
    target.current.ry = 0;
    target.current.o  = 0;
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ willChange: "transform", position: "relative" }}
    >
      {children}
      <div
        ref={glareRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0, borderRadius: "inherit" }}
      />
    </div>
  );
}

// ── Sparkline — mini trend SVG ────────────────────────────────────
function Sparkline({ data, width = 62, height = 22 }: { data: number[]; width?: number; height?: number }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const rng = (max - min) || 1;
  const pad = 2;
  const pts = data.map((v, i) => ({
    x: pad + (i / (data.length - 1)) * (width - pad * 2),
    y: pad + (1 - (v - min) / rng) * (height - pad * 2),
  }));
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const area = `${line} L ${pts[pts.length - 1].x} ${height} L ${pts[0].x} ${height} Z`;
  const gradId = `sp-${data[0]}-${data[data.length - 1]}`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#C5A467" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#C5A467" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradId})`} />
      <path d={line} stroke="#C5A467" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="2" fill="#C5A467" />
    </svg>
  );
}

// ── BarChartGrowth — barras douradas animadas staggered ──────────
function BarChartGrowth() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const bars = [
    { pct: 14, label: "Jan", value: "1.2×" },
    { pct: 25, label: "Fev", value: "2.1×" },
    { pct: 40, label: "Mar", value: "3.4×" },
    { pct: 60, label: "Abr", value: "5.0×" },
    { pct: 81, label: "Mai", value: "6.8×" },
    { pct: 100, label: "Jun", value: "8.4×" },
  ];
  return (
    <div ref={ref} className="mt-6 mb-1">
      <div className="flex items-end gap-[6px] h-[80px]">
        {bars.map((b, i) => (
          <div key={b.label} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
            {/* Valor no topo da última barra */}
            {i === bars.length - 1 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: i * 0.12 + 0.5, duration: 0.4 }}
                className="text-[9px] font-body text-gold tabular-nums"
              >
                {b.value}
              </motion.span>
            )}
            {i < bars.length - 1 && <div className="h-[14px]" />}
            {/* Barra */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{
                delay: i * 0.1,
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                height: `${b.pct}%`,
                transformOrigin: "bottom",
                background: i === bars.length - 1
                  ? "linear-gradient(180deg, #C5A467 0%, rgba(197,164,103,0.55) 100%)"
                  : "linear-gradient(180deg, rgba(197,164,103,0.45) 0%, rgba(197,164,103,0.18) 100%)",
                borderRadius: "3px 3px 1px 1px",
                boxShadow: i === bars.length - 1 ? "0 0 12px rgba(197,164,103,0.30)" : "none",
              }}
              className="w-full"
            />
          </div>
        ))}
      </div>
      {/* Labels mês */}
      <div className="flex gap-[6px] mt-2">
        {bars.map((b) => (
          <span key={b.label} className="flex-1 text-center text-[8px] font-body text-cream/20 tabular-nums">
            {b.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Metodologia Section — Como transformamos sua realidade ────────
const pillars = [
  {
    number: "01",
    title: "Conteúdo Que Vende",
    question: "Como isso me traz dinheiro?",
    answer: "Cada post é calculado para posicionar seu preço antes de você abrir a boca. Quem chega até você já sabe quanto custa — e quer pagar. Você para de competir por preço e começa a ser escolhido.",
    metric: "+340% em contatos qualificados",
    icon: "◈",
    hue: 38,
  },
  {
    number: "02",
    title: "Anúncios Que Pagam de Volta",
    question: "Como isso me traz dinheiro?",
    answer: "Paramos de gastar com alcance vago. Seus anúncios chegam só para quem tem poder de compra e intenção real — quando estão prontos para decidir. ROAS médio de 8,4× comprovado em carteira.",
    metric: "ROAS médio de 8,4× comprovado",
    icon: "◎",
    hue: 210,
  },
  {
    number: "03",
    title: "Vendas que Não Dormem",
    question: "Como isso me traz dinheiro?",
    answer: "Às 2h da manhã, um lead entra pelo seu anúncio. Em menos de 2 minutos, nossa IA responde, qualifica e agenda. Você acorda com uma reunião marcada — sem perder lead por demora.",
    metric: "Resposta em menos de 2 min · 24/7",
    icon: "✦",
    hue: 280,
  },
];

function MetodologiaSection() {
  return (
    <section className="py-8 px-6 bg-obsidian/20 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <AmbientOrb width={600} height={600} speed={0.18} style={{ left: "50%", top: "20%", marginLeft: -300 }} />

        {/* Header */}
        <div className="text-center mb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-[10px] font-body tracking-[0.4em] uppercase text-gold/55 mb-5"
          >
            Como funciona na prática
          </motion.div>
          <motion.h2
            data-reveal-title
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-cream mb-5"
            style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", letterSpacing: "-0.025em", lineHeight: 1 }}
          >
            Como transformamos{" "}
            <span className="font-display-italic text-gold">sua realidade</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="font-body font-light text-gold/40 mb-6"
            style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            Gestão de Anúncios · Automação de Leads · Conteúdo Estratégico
          </motion.p>
          <motion.p
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-body font-light text-cream/32 max-w-md mx-auto text-sm leading-relaxed"
          >
            Três pilares integrados. Cada um com função clara. Juntos, transformam sua marca em máquina de vendas.
          </motion.p>
        </div>

        {/* 3 Pilares */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10 max-w-5xl mx-auto w-full">
          {pillars.map((p, i) => (
            <motion.div
              key={p.number}
              initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.18, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard className="glass rounded-2xl px-8 py-10 overflow-hidden group h-full flex flex-col items-center text-center">

                {/* Accent top line */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

                {/* Círculo numerado — ponto focal */}
                <div className="relative mb-7">
                  {/* Anel externo */}
                  <div className="w-20 h-20 rounded-full border border-gold/20 flex items-center justify-center">
                    {/* Anel interno */}
                    <div className="w-14 h-14 rounded-full border border-gold/35 bg-gold/5 flex items-center justify-center"
                      style={{ boxShadow: "0 0 24px rgba(197,164,103,0.12)" }}>
                      <span
                        className="font-body font-light text-gold tabular-nums"
                        style={{ fontSize: "1.5rem", letterSpacing: "-0.04em", lineHeight: 1 }}
                      >
                        {parseInt(p.number)}
                      </span>
                    </div>
                  </div>
                  {/* Glow no hover */}
                  <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{ background: "radial-gradient(circle, rgba(197,164,103,0.15) 0%, transparent 70%)" }} />
                </div>

                {/* Pillar name */}
                <div
                  className="font-body font-medium text-cream/90 uppercase tracking-[0.14em] mb-3 leading-tight"
                  style={{ fontSize: "clamp(0.8rem, 1.3vw, 0.95rem)" }}
                >
                  {p.title}
                </div>

                {/* The question */}
                <div className="font-display-italic text-gold/55 mb-5 leading-snug"
                  style={{ fontSize: "clamp(0.85rem, 1.2vw, 1rem)" }}>
                  "{p.question}"
                </div>

                {/* Answer */}
                <p className="font-body font-light text-cream/45 leading-relaxed mb-8 flex-1"
                  style={{ fontSize: "clamp(0.82rem, 1.1vw, 0.9rem)" }}>
                  {p.answer}
                </p>

                {/* Metric badge */}
                <div className="inline-flex items-center gap-2 border border-gold/20 bg-gold/6 rounded-full px-4 py-1.5">
                  <div className="w-1 h-1 rounded-full bg-gold/70" />
                  <span className="text-[9px] font-body font-medium text-gold/80 tracking-[0.2em] uppercase">
                    {p.metric}
                  </span>
                </div>

                {/* Hover glow bg */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, hsla(${p.hue},40%,20%,0.10), transparent)` }}
                />
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Connecting flow line — desktop only */}
        <div className="hidden lg:flex absolute top-[calc(100%-theme(spacing.6))] left-0 right-0 items-center justify-center pointer-events-none" />
      </div>
    </section>
  );
}

// ── Como Funciona Section — 4 passos do processo ──────────────────
function ComoFuncionaSection() {
  const steps = [
    {
      number: "01",
      title: "Diagnóstico",
      desc: "Em 72h analisamos sua operação, mercado e concorrência. Você recebe um mapa claro de onde o dinheiro está sendo perdido.",
    },
    {
      number: "02",
      title: "Planejamento",
      desc: "Criamos a estratégia completa: canais, verba, criativos e funil. Nada entra no ar sem ter base em dados do seu mercado.",
    },
    {
      number: "03",
      title: "Execução",
      desc: "Sua operação vai ao ar na semana seguinte. Gestor dedicado, relatório semanal, ajustes contínuos — você só fecha os leads.",
    },
    {
      number: "04",
      title: "Escala",
      desc: "O que converte, escalamos. O que não converte, paramos. Seu investimento cresce junto com os resultados comprovados.",
    },
  ];

  return (
    <section className="py-16 px-6 bg-obsidian/20 border-t border-cream/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="font-body text-[10px] tracking-[0.4em] uppercase text-gold/55 mb-4">O Processo</div>
          <h2
            className="font-display text-cream"
            style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", letterSpacing: "-0.025em", lineHeight: 1.05 }}
          >
            Como você vai de onde está{" "}
            <span className="font-display-italic text-gold">para onde quer chegar</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass-hover rounded-2xl p-8 relative"
            >
              <div
                className="font-body font-light tabular-nums mb-6"
                style={{ fontSize: "3rem", color: "rgba(197,164,103,0.14)", lineHeight: 1, letterSpacing: "-0.05em" }}
              >
                {step.number}
              </div>
              <div className="font-body font-medium text-cream/85 text-sm mb-3 uppercase tracking-widest">{step.title}</div>
              <p className="font-body font-light text-cream/35 text-xs leading-relaxed">{step.desc}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 z-10 w-6 h-6 items-center justify-center">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(197,164,103,0.30)" strokeWidth="2" strokeLinecap="round">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => openQuizModal()}
            className="shimmer-auto font-body font-medium tracking-[0.25em] uppercase text-void px-10 py-4 rounded transition-all duration-300 pulse-cta"
            style={{ background: "#C5A467", fontSize: "0.72rem" }}
          >
            FALAR COM ESPECIALISTA
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ── Traffic Section ───────────────────────────────────────────────
function TrafficSection() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const counterRef  = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-20%" });

  // Small cards — lightweight RAF counter
  const roas   = useCounter(847,   2000, inView);
  const leads  = useCounter(52000, 2200, inView);
  const brands = useCounter(130,   1800, inView);

  // Big hero number — GSAP ScrollTrigger
  useEffect(() => {
    if (!sectionRef.current || !counterRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const obj = { value: 0 };
    const tween = gsap.to(obj, {
      value: 10000000,
      duration: 2.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%",
        once: true,
      },
      onUpdate() {
        if (!counterRef.current) return;
        const v = Math.floor(obj.value);
        // Format as R$ XX.000.000
        const millions = Math.floor(v / 1000000);
        const remainder = String(v % 1000000).padStart(6, "0");
        counterRef.current.textContent =
          `+ R$ ${millions}.${remainder.slice(0, 3)}.${remainder.slice(3)}`;
      },
    });

    return () => { tween.kill(); };
  }, []);

  const stats = [
    { value: `${roas}%`,              label: "ROAS Médio",        desc: "retorno sobre cada real investido",  sparkData: [420, 510, 590, 680, 760, 847] },
    { value: `${(leads / 1000).toFixed(0)}k+`, label: "Leads Qualificados", desc: "com intenção real de comprar",    sparkData: [18, 28, 35, 42, 48, 52] },
    { value: `${brands}+`,            label: "Marcas Atendidas",  desc: "em mercados de alto padrão",    sparkData: [80, 95, 105, 115, 125, 130] },
  ];

  return (
    <Section id="resultados" className="py-8 px-6">
      <div className="max-w-7xl mx-auto" ref={sectionRef}>
        {/* Orb atrás do contador de receita */}
        <AmbientOrb width={600} height={600} speed={0.2} style={{ right: -100, top: -50 }} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          <div>
            <h2
              data-reveal-title
              className="font-display text-cream leading-[1.0] mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.025em" }}
            >
              Resultados
              <br />
              <span className="font-display-italic text-gold">Reais</span>
            </h2>
            <p className="font-body font-light text-cream/50 leading-relaxed max-w-md">
              Mais de R$ 10.000.000 gerados para nossos clientes. Cada campanha rastreada do clique ao fechamento — sem achismo, sem capital perdido.
            </p>
          </div>

          {/* Big GSAP counter — Playfair Display Italic */}
          <TiltCard className="glass rounded-2xl p-10 overflow-hidden" intensity={6}>
            {/* Ambient glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold/8 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/4 rounded-full blur-2xl pointer-events-none" />

            <div className="text-[9px] font-body tracking-[0.35em] uppercase text-gold/50 mb-4">
              Gerado para Nossos Clientes
            </div>

            {/* Number in Playfair Display Italic — gigante */}
            <div
              ref={counterRef}
              className="font-display-italic text-gold tabular-nums"
              style={{
                fontSize: "clamp(2.8rem, 6.5vw, 5.5rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                textShadow: "0 0 40px rgba(197,164,103,0.22), 0 0 80px rgba(197,164,103,0.08)",
              }}
            >
              + R$ 0.000.000
            </div>

            <BarChartGrowth />

            <div className="mt-2 h-[1px] bg-gradient-to-r from-gold/40 via-gold/10 to-transparent" />
            <div className="mt-4 text-[10px] font-body text-cream/20 tracking-widest uppercase">
              Meta Ads · Google Ads · Estratégia Omnicanal
            </div>
          </TiltCard>
        </div>

        {/* Stats grid — 3 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard className="glass rounded-xl p-6 overflow-hidden group hover:border-gold/20 transition-colors duration-500">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div
                    className="font-body font-light text-cream tabular-nums"
                    style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
                  >
                    {stat.value}
                  </div>
                  <div className="mt-1 opacity-65 flex-shrink-0">
                    <Sparkline data={stat.sparkData} />
                  </div>
                </div>
                <div className="text-xs font-body font-medium text-gold/70 mb-1">{stat.label}</div>
                <div className="text-[11px] font-body text-cream/30">{stat.desc}</div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Quiz CTA — Descubra seu potencial de escala */}
        <QuizTrigger />
      </div>
    </Section>
  );
}

function QuizTrigger() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="mt-16 flex flex-col items-center gap-4 text-center"
    >
      <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      <p className="text-[11px] font-body text-cream/35 tracking-[0.25em] uppercase">
        Quanto você está deixando na mesa?
      </p>
      <button
        onClick={() => openQuizModal()}
        className="group flex items-center gap-3 text-cream/60 hover:text-cream transition-colors duration-300"
      >
        <span className="font-display-italic text-lg">Descubra seu potencial de escala</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
        </svg>
      </button>
      <p className="text-[10px] font-body text-cream/20">3 perguntas · 60 segundos · diagnóstico gratuito</p>
    </motion.div>
  );
}

// ── AdCard — 4:5 (1080×1350) ─────────────────────────────────────
type AdItem = {
  id: number;
  label: string;
  imageSrc?: string; // e.g. "/social_media/slot-1.jpg"
  videoSrc?: string; // e.g. "https://stream.mux.com/PLAYBACK_ID.m3u8"
};

// Card dimensions — 4:5 ratio matching 1080×1350 source format
const AD_W = 304;
const AD_H = 380; // 304 × (5/4) = 380

function AdCard({ item, cardW = AD_W, cardH = AD_H }: { item: AdItem; cardW?: number | string; cardH?: number | string }) {
  const [active, setActive] = useState(false);

  return (
    <div
      data-magnetic
      className="flex-shrink-0 relative overflow-hidden rounded-2xl select-none"
      style={{
        width: cardW,
        height: cardH,
        boxShadow: active
          ? "0 32px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(197,164,103,0.22), 0 8px 24px rgba(0,0,0,0.6)"
          : "0 20px 60px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04), 0 4px 16px rgba(0,0,0,0.4)",
        transform: active ? "translateY(-6px) scale(1.025)" : "translateY(0) scale(1)",
        transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
        cursor: "pointer",
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {item.imageSrc ? (
        <img
          src={item.imageSrc.replace("/upload/", "/upload/w_320,h_400,c_fill,q_auto,f_auto/")}
          alt={item.label}
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${150 + ((item.id - 1) % 4) * 30}deg,
              rgba(197,164,103,${0.08 + ((item.id - 1) % 4) * 0.04}) 0%,
              #050505 100%)`,
          }}
        />
      )}

      <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95), transparent)" }}>
        <div className="text-[10px] font-body text-cream/50 tracking-wider">{item.label}</div>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-gold/55 to-transparent pointer-events-none"
        style={{ opacity: active ? 1 : 0, transition: "opacity 0.4s" }} />
    </div>
  );
}

// ── AdMarquee — single-direction infinite row ─────────────────────
function AdMarquee({
  cards,
  direction,
  hoveredRef,
  controlRef,
  cardW = AD_W,
  cardH = AD_H,
  gap = 20,
  py = 24,
  speed = 0.52,
}: {
  cards: AdItem[];
  direction: "left" | "right";
  hoveredRef: { current: boolean };
  controlRef?: React.MutableRefObject<{ nudge: (delta: number) => void } | null>;
  cardW?: number | string;
  cardH?: number | string;
  gap?: number;
  py?: number;
  speed?: number;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number | null>(null);
  const posRef   = useRef(0);
  const speedRef = useRef(speed);

  const BASE_SPEED  = speed;
  const HOVER_SPEED = 0.05;

  // Expose nudge method for manual navigation arrows
  useEffect(() => {
    if (!controlRef) return;
    controlRef.current = { nudge: (delta: number) => { posRef.current += delta; } };
    return () => { if (controlRef) controlRef.current = null; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    let initialized = false;

    const tick = () => {
      const totalWidth = inner.scrollWidth / 2;

      if (!initialized) {
        if (direction === "right") posRef.current = -totalWidth * 0.5;
        initialized = true;
      }

      const target = hoveredRef.current ? HOVER_SPEED : BASE_SPEED;
      speedRef.current += (target - speedRef.current) * 0.055;

      if (direction === "left") {
        posRef.current -= speedRef.current;
        if (posRef.current <= -totalWidth) posRef.current += totalWidth;
      } else {
        posRef.current += speedRef.current;
        if (posRef.current >= 0) posRef.current -= totalWidth;
      }

      inner.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [direction, hoveredRef]);

  const allCards = [...cards, ...cards];

  return (
    <div style={{ paddingTop: py, paddingBottom: py }}>
      <div
        ref={innerRef}
        style={{ display: "flex", gap, paddingLeft: py, width: "max-content", willChange: "transform" }}
      >
        {allCards.map((item, i) => (
          <AdCard key={i} item={item} cardW={cardW} cardH={cardH} />
        ))}
      </div>
    </div>
  );
}

// ── Social Media Section ──────────────────────────────────────────
function SocialSection() {
  const hoveredRef = useRef(false);
  const topCtrl = useRef<{ nudge: (d: number) => void } | null>(null);
  const botCtrl = useRef<{ nudge: (d: number) => void } | null>(null);

  // All 12 unique images — agora com caminhos locais em /public/social_media/
  const allImages: AdItem[] = [
    { id: 1,  label: "Imobiliário · São Paulo",  imageSrc: "/social_media/Português.png" },
    { id: 2,  label: "Clínica Estética · Rio",   imageSrc: "/social_media/ORGANIZAGRAM BY CAROL RHEIN (15).png" },
    { id: 3,  label: "Corporate · Fintech",       imageSrc: "/social_media/Modelo lançamento (9).png" },
    { id: 4,  label: "Lifestyle · Alto Padrão",  imageSrc: "/social_media/Modelo lançamento (4).png" },
    { id: 5,  label: "Real Estate · Litoral",    imageSrc: "/social_media/ORGANIZAGRAM BY CAROL RHEIN (6).png" },
    { id: 6,  label: "Dermatologia Premium",     imageSrc: "/social_media/77.png" },
    { id: 7,  label: "Odontologia Premium",      imageSrc: "/social_media/18.png" },
    { id: 8,  label: "Imóvel · Jardins SP",      imageSrc: "/social_media/4.POST QUEM SOU EU BY CAROL RHEIN (3).png" },
    { id: 9,  label: "Academia Premium",          imageSrc: "/social_media/ORGANIZAGRAM BY CAROL RHEIN.png" },
    { id: 10, label: "Joalheria · Luxo",          imageSrc: "/social_media/2.POST QUEM SOU EU BY CAROL RHEIN (2).png" },
    { id: 11, label: "Hotel Boutique",            imageSrc: "/social_media/119.png" },
    { id: 12, label: "Cirurgia Plástica",         imageSrc: "/social_media/1.POST QUEM SOU EU BY CAROL RHEIN.png" },
  ];

  // ── Faixa inferior — 12 assets independentes (Helder: substitua as URLs abaixo) ──
  const botImages: AdItem[] = [
    { id: 13, label: "Imobiliário · Premium",    imageSrc: "" },
    { id: 14, label: "Social · Lifestyle",        imageSrc: "" },
    { id: 15, label: "Corporate · Alto Padrão",  imageSrc: "" },
    { id: 16, label: "Real Estate · Litoral",    imageSrc: "" },
    { id: 17, label: "Clínica · Premium",        imageSrc: "" },
    { id: 18, label: "Joalheria · Luxo",         imageSrc: "" },
    { id: 19, label: "Imóvel · Alto Padrão",     imageSrc: "" },
    { id: 20, label: "Lifestyle · Exclusivo",    imageSrc: "" },
    { id: 21, label: "Hotel · Boutique",         imageSrc: "" },
    { id: 22, label: "Odontologia · Premium",    imageSrc: "" },
    { id: 23, label: "Incorporadora · Elite",    imageSrc: "" },
    { id: 24, label: "Corporate · Fintech",      imageSrc: "" },
  ];

  const topRow = allImages;
  // Usa botImages quando Helder fornecer as URLs; enquanto isso, fallback com gradient cards
  const botRow = botImages.some(i => i.imageSrc) ? botImages : [...allImages.slice(6), ...allImages.slice(0, 6)];

  // Shared layout constants
  const FW = "clamp(60px, 8vw, 120px)"; // gradient fade width
  const FL = "linear-gradient(90deg, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.75) 30%, rgba(0,0,0,0.30) 60%, transparent 100%)";
  const FR = "linear-gradient(-90deg, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.75) 30%, rgba(0,0,0,0.30) 60%, transparent 100%)";
  const BTN = "absolute top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-gold transition-all duration-300 hover:scale-110 hover:border-gold/60 opacity-30 hover:opacity-90";
  const BTN_S = { border: "1px solid rgba(197,164,103,0.3)", background: "rgba(0,0,0,0.80)", backdropFilter: "blur(12px)" };

  // Social band card dimensions — fits within 30vh with ~80% density
  const CARD_H = "clamp(155px, 23vh, 230px)";
  const CARD_W = "clamp(124px, 18.4vh, 184px)";  // CARD_H × 0.8
  const CARD_GAP = 10;
  const CARD_PY  = 8;
  const NUDGE = 190; // approx CARD_W mid + CARD_GAP

  // Reusable row arrow SVGs
  const ChevLeft = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  );
  const ChevRight = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );

  return (
    <section
      id="social"
      className="relative bg-void flex flex-col overflow-hidden"
      style={{ height: "100vh", scrollMarginTop: "88px" }}
    >
      {/* Ambient gold orb — background depth */}
      <AmbientOrb
        width={600} height={600} speed={0.08}
        style={{ position: "absolute", left: "50%", top: "50%", marginLeft: -300, marginTop: -300, zIndex: 0, pointerEvents: "none" }}
      />

      {/* ══ FAIXA SUPERIOR — 30vh — cards movendo para a esquerda ══ */}
      <div
        className="relative flex-none overflow-hidden"
        style={{ height: "30vh" }}
        onMouseEnter={() => { hoveredRef.current = true; }}
        onMouseLeave={() => { hoveredRef.current = false; }}
      >
        <AdMarquee
          cards={topRow} direction="left"
          hoveredRef={hoveredRef} controlRef={topCtrl}
          cardW={CARD_W} cardH={CARD_H} gap={CARD_GAP} py={CARD_PY}
        />
        <div className="absolute inset-y-0 left-0 pointer-events-none" style={{ width: FW, background: FL }} />
        <div className="absolute inset-y-0 right-0 pointer-events-none" style={{ width: FW, background: FR }} />
        <button aria-label="Voltar" onClick={() => topCtrl.current?.nudge(NUDGE)}
          className={`${BTN} left-4`} style={BTN_S}><ChevLeft /></button>
        <button aria-label="Avançar" onClick={() => topCtrl.current?.nudge(-NUDGE)}
          className={`${BTN} right-4`} style={BTN_S}><ChevRight /></button>
      </div>

      {/* ══ CENTRO DE AUTORIDADE — 40vh — Playfair Italic + métricas ══ */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="font-body text-[8px] tracking-[0.6em] uppercase text-gold-soft/50 mb-4">
            Social Media
          </div>
          <h2
            className="font-display-italic text-cream"
            style={{ fontSize: "clamp(1.9rem, 4vw, 4rem)", letterSpacing: "-0.03em", lineHeight: 1.0 }}
          >
            Conteúdo que para<br />
            <span className="text-gold-soft">o scroll e gera venda</span>
          </h2>
          <div className="mt-6 flex justify-center gap-8 md:gap-14">
            {([
              { to: 8.4, decimals: 1, suffix: "×", label: "ROAS Médio"       },
              { to: 95,  decimals: 0, suffix: "%",  label: "Taxa de Retenção" },
              { to: 3,   decimals: 0, suffix: "s",  label: "Hook Comprovado"  },
            ] as const).map(({ to, decimals, suffix, label }) => (
              <div key={label} className="text-center">
                <div className="font-body font-light text-gold-soft tabular-nums"
                  style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.8rem)" }}>
                  <CountUp to={to} decimals={decimals} suffix={suffix} duration={1.8} />
                </div>
                <div className="font-body text-[8px] text-cream/25 uppercase tracking-[0.2em] mt-1">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ══ FAIXA INFERIOR — 30vh — cards movendo para a direita ══ */}
      <div
        className="relative flex-none overflow-hidden"
        style={{ height: "30vh" }}
        onMouseEnter={() => { hoveredRef.current = true; }}
        onMouseLeave={() => { hoveredRef.current = false; }}
      >
        <AdMarquee
          cards={botRow} direction="right"
          hoveredRef={hoveredRef} controlRef={botCtrl}
          cardW={CARD_W} cardH={CARD_H} gap={CARD_GAP} py={CARD_PY}
        />
        <div className="absolute inset-y-0 left-0 pointer-events-none" style={{ width: FW, background: FL }} />
        <div className="absolute inset-y-0 right-0 pointer-events-none" style={{ width: FW, background: FR }} />
        <button aria-label="Voltar" onClick={() => botCtrl.current?.nudge(-NUDGE)}
          className={`${BTN} left-4`} style={BTN_S}><ChevLeft /></button>
        <button aria-label="Avançar" onClick={() => botCtrl.current?.nudge(NUDGE)}
          className={`${BTN} right-4`} style={BTN_S}><ChevRight /></button>
      </div>
    </section>
  );
}

// ── VideoCard — 9:16 (1080×1920) vertical cinema card for Vídeo Maker de Elite
type VideoItem = {
  id: number;
  label: string;
  videoSrc?: string;
};

// 9:16 dobra única — -10% da versão anterior
const VM_W = 180;
const VM_H = 320;

function VideoCard({ v }: { v: VideoItem }) {
  const [hover, setHover] = useState(false);
  const src = v.videoSrc;

  // Constrói URL oficial do embed Bunny a partir do playback GUID.
  // Aceita tanto URL completa do player quanto GUID puro.
  const embedBase = src
    ? src.includes("player.mediadelivery.net")
      ? src.replace("/play/", "/embed/").replace(/\/$/, "")
      : `https://player.mediadelivery.net/embed/695508/${src}`
    : null;

  // Player limpo, sem auto-play (decisão do usuário), sem loop, mudo
  const embedUrl = embedBase
    ? `${embedBase}?autoplay=false&muted=true&loop=false&playsinline=true&preload=true`
    : null;

  return (
    <div
      data-magnetic
      className="flex-shrink-0 relative overflow-hidden rounded-3xl select-none"
      title={`${v.label} — Video case de tráfego pago e Meta Ads estratégico`}
      aria-label={`Vídeo: ${v.label}. Case de sucesso em tráfego pago, gestão de Meta Ads, Google Ads e automação de leads. ROAS comprovado 8.4×.`}
      style={{
        width: VM_W,
        height: VM_H,
        aspectRatio: "9 / 16",
        boxShadow: hover
          ? "0 32px 80px rgba(0,0,0,0.9), 0 0 0 1px rgba(197,164,103,0.22), 0 8px 24px rgba(0,0,0,0.6)"
          : "0 20px 60px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.04), 0 4px 16px rgba(0,0,0,0.4)",
        transform: hover ? "translateY(-6px) scale(1.025)" : "translateY(0) scale(1)",
        transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Iframe Bunny — player real, sempre montado, ocupa 100% */}
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={`${v.label} — vídeo HS Visual`}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: 0, background: "#050505" }}
        />
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(${140 + ((v.id - 1) % 3) * 40}deg,
              rgba(197,164,103,${0.06 + ((v.id - 1) % 3) * 0.04}) 0%,
              #050505 100%)`,
          }}
        />
      )}

      {/* Gold left accent on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-gold/45 to-transparent pointer-events-none"
        style={{ opacity: hover ? 1 : 0, transition: "opacity 0.4s" }} />

      {/* Bottom label */}
      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-void to-transparent z-10 pointer-events-none">
        <div className="text-[10px] font-body text-cream/50 tracking-wider">{v.label}</div>
      </div>
    </div>
  );
}

// ── Audiovisual Section (Marquee Interativa) ──────────────────────
function AudiovisualSection() {
  const videos: VideoItem[] = [
    { id: 1, label: "Imobiliário · São Paulo",    videoSrc: "e2a645c3-7af9-4a7d-979e-f72d5bb69907" },
    { id: 2, label: "Veduta Residencial",         videoSrc: "b96711b3-ea9c-4bc4-9afc-4e8c599c9d6e" },
    { id: 3, label: "Felipe Corretor · Drone",    videoSrc: "04f363de-735c-4fbe-b70b-5b577c46c151" },
    { id: 4, label: "Lifestyle · Alto Padrão",    videoSrc: "340e9e5a-9e47-4fa7-a5c7-23842c1c687e" },
    { id: 5, label: "Colinas do Mosteiro",        videoSrc: "05c97387-7d2e-4807-b3b3-f55d7d97ceb3" },
    { id: 6, label: "Reserva Ermida",             videoSrc: "4a28cb09-4a5b-46b2-9302-8fc70d6b5c7c" },
    { id: 7, label: "Vila Rica · Indaiatuba",     videoSrc: "60c63f91-aac7-464b-959f-cd50fd68db72" },
    { id: 8, label: "Helvetia Park · Indaiatuba", videoSrc: "9eec0a0d-fb75-47e5-ae10-ac56e3eec1ae" },
  ];

  // 3 cópias — loop seamless sem tranco
  const allVideos = [...videos, ...videos, ...videos];

  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const posRef = useRef(0);
  const isDragging = useRef(false);
  const isHovering = useRef(false);
  const dragOccurred = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);
  const totalWidthRef = useRef(0);
  const [grabbing, setGrabbing] = useState(false);

  // gap-4 = 16px entre cards; 1 set = 8 vídeos
  const CARD_SLOT = VM_W + 16;
  const VM_NUDGE = CARD_SLOT;
  const BTN_VM = "absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-gold transition-all duration-300 hover:scale-110 hover:border-gold/60 z-20 opacity-40 hover:opacity-100";
  const BTN_VM_S = { border: "1px solid rgba(197,164,103,0.35)", background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)" };

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    // totalWidth = 1 set de 8 cards — sem depender do DOM para evitar tranco
    const tw = CARD_SLOT * videos.length;
    totalWidthRef.current = tw;
    // começa no início do segundo set (cópia do meio)
    posRef.current = -tw;

    const SPEED = 0.48;

    const tick = () => {
      if (!isDragging.current && !isHovering.current) {
        posRef.current -= SPEED;
        // quando chegar ao início do 3º set, volta para o início do 2º set — sem salto visível
        if (posRef.current <= -tw * 2) posRef.current += tw;
        inner.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [CARD_SLOT, videos.length]);

  const onMouseEnter = () => { isHovering.current = true; };
  const onMouseLeave = () => {
    isHovering.current = false;
    isDragging.current = false;
    setGrabbing(false);
  };
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    dragOccurred.current = false;
    dragStartX.current = e.clientX;
    dragStartPos.current = posRef.current;
    setGrabbing(true);
    e.preventDefault();
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !innerRef.current) return;
    const delta = e.clientX - dragStartX.current;
    if (Math.abs(delta) > 5) dragOccurred.current = true;
    const tw = totalWidthRef.current;
    let newPos = dragStartPos.current + delta;
    if (newPos > -tw) newPos -= tw;
    if (newPos < -tw * 2) newPos += tw;
    posRef.current = newPos;
    innerRef.current.style.transform = `translateX(${newPos}px)`;
  };
  const onMouseUp = () => {
    isDragging.current = false;
    setGrabbing(false);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    isHovering.current = true;
    dragStartX.current = e.touches[0].clientX;
    dragStartPos.current = posRef.current;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !innerRef.current) return;
    const delta = e.touches[0].clientX - dragStartX.current;
    const tw = totalWidthRef.current;
    let newPos = dragStartPos.current + delta;
    if (newPos > -tw) newPos -= tw;
    if (newPos < -tw * 2) newPos += tw;
    posRef.current = newPos;
    innerRef.current.style.transform = `translateX(${newPos}px)`;
  };
  const onTouchEnd = () => {
    isDragging.current = false;
    isHovering.current = false;
  };

  return (
    <Section id="filmmaker" className="min-h-screen flex flex-col overflow-hidden">
      {/* Bloco superior — 2 colunas, sem label "03" */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-2 w-full flex-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* Coluna esquerda — título + descrição + CTA */}
          <div>
            <h2 data-reveal-title className="leading-[1.0] mb-4">
              <span
                className="font-display text-cream block"
                style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)", letterSpacing: "0.01em" }}
              >
                Video Maker
              </span>
              <span
                className="font-display-italic text-gold-soft block"
                style={{ fontSize: "clamp(2rem, 3.8vw, 3.4rem)", letterSpacing: "-0.02em" }}
              >
                de Elite
              </span>
            </h2>
            <p className="font-body font-light text-cream/45 leading-relaxed max-w-sm mb-5 text-sm">
              Vídeo que para o scroll em 3 segundos e transforma visualização em desejo de compra. Roteiro, filmagem e edição com foco total em conversão.
            </p>
            <button
              onClick={() => openQuizModal()}
              className="shimmer-auto pulse-cta px-6 py-2.5 border border-gold/50 text-gold hover:border-gold hover:bg-gold/8 font-body font-medium text-xs tracking-[0.2em] uppercase rounded transition-all duration-300 hover:shadow-gold-md"
            >
              Quero um vídeo que vende
            </button>
          </div>

          {/* Coluna direita — 3 métricas compactas */}
          <div className="grid grid-cols-3 gap-3">
            {([
              { to: 95,  decimals: 0, suffix: "%",  label: "Taxa de retenção" },
              { to: 3,   decimals: 0, suffix: "s",  label: "Hook médio"       },
              { to: 2.4, decimals: 1, suffix: "×",  label: "Engajamento"      },
            ] as const).map(({ to, decimals, suffix, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ delay: i * 0.18, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="glass rounded-xl px-3 py-4 text-center"
              >
                <div className="font-body font-light text-gold-soft tabular-nums"
                  style={{ fontSize: "clamp(1.3rem, 2vw, 1.8rem)" }}>
                  <CountUp to={to} decimals={decimals} suffix={suffix} duration={1.5} />
                </div>
                <div className="text-[9px] font-body text-cream/30 mt-1.5 uppercase tracking-widest leading-tight">
                  {label}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>

      {/* Marquee Interativa — ocupa o restante da tela ── */}
      <div className="relative flex-1 flex flex-col justify-center">
        {/* Gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(90deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.35) 60%, transparent 100%)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{ background: "linear-gradient(-90deg, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.35) 60%, transparent 100%)" }} />

        {/* Navigation arrows */}
        <button aria-label="Voltar" onClick={() => { posRef.current += VM_NUDGE; }}
          className={`${BTN_VM} left-5`} style={BTN_VM_S}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <button aria-label="Avançar" onClick={() => { posRef.current -= VM_NUDGE; }}
          className={`${BTN_VM} right-5`} style={BTN_VM_S}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>

        <div
          className="overflow-hidden"
          style={{ cursor: grabbing ? "grabbing" : "grab", touchAction: "pan-y" }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onClickCapture={(e) => { if (dragOccurred.current) e.stopPropagation(); }}
        >
          <div
            ref={innerRef}
            className="flex gap-4 py-3 px-6"
            style={{ width: "max-content", willChange: "transform" }}
          >
            {allVideos.map((v, i) => (
              <VideoCard key={i} v={v} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Quiz Modal ────────────────────────────────────────────────────
const quizSteps = [
  {
    id: "service",
    label: "O Foco",
    question: "Qual é o seu principal objetivo agora?",
    options: [
      "Vender mais e atrair novos clientes",
      "Passar mais autoridade e profissionalismo",
      "Ter uma estrutura que vende 24h por dia",
      "Parar de perder leads e automatizar processos",
    ],
  },
  {
    id: "investment",
    label: "O Momento",
    question: "Como está o seu investimento em marketing hoje?",
    options: [
      "Vou começar do zero agora",
      "Já invisto, mas não estou satisfeito",
      "Já tenho resultados e quero escalar",
      "Preciso organizar a casa antes de anunciar",
    ],
  },
  {
    id: "urgency",
    label: "A Urgência",
    question: "Qual a velocidade que você espera para ver os resultados?",
    options: [
      "Para ontem! Preciso de vendas imediatas",
      "Quero construir uma base sólida e constante",
      "Estou apenas pesquisando as melhores opções",
      "Quero dominar meu mercado e ser a maior referência",
    ],
  },
];

function QuizModal({ open, onClose, initialService }: { open: boolean; onClose: () => void; initialService?: string }) {
  const [step, setStep] = useState(initialService ? 1 : 0);
  const [answers, setAnswers] = useState<Record<string, string>>(
    initialService ? { service: initialService } : {}
  );

  useEffect(() => {
    if (open && initialService) { setStep(1); setAnswers({ service: initialService }); }
    if (!open) { setStep(0); setAnswers({}); }
  }, [open, initialService]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const isContact = step === quizSteps.length;

  const handleOption = (value: string) => {
    setAnswers((prev) => ({ ...prev, [quizSteps[step].id]: value }));
    setTimeout(() => setStep((s) => s + 1), 180);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const payload = {
      name,
      phone,
      ...answers,
      source: "hs-visual-quiz",
      timestamp: new Date().toISOString(),
    };
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      });
    } catch (_) {}
    // Pixels de conversão — só disparam se o script estiver ativo no layout.tsx
    try {
      if (typeof (window as any).fbq === "function")
        (window as any).fbq("track", "Lead", { content_name: "Quiz HS Visual", content_category: (payload as any).service });
      if (typeof (window as any).gtag === "function")
        (window as any).gtag("event", "generate_lead", { event_category: "quiz", event_label: (payload as any).service });
      if (typeof (window as any).ttq === "object")
        (window as any).ttq.track("SubmitForm");
    } catch (_) {}
    setDone(true);
    setSubmitting(false);
  };

  const reset = () => { setStep(0); setAnswers({}); setName(""); setPhone(""); setDone(false); onClose(); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          <motion.div className="absolute inset-0 bg-void/88 backdrop-blur-md" onClick={onClose} />
          <motion.div initial={{ scale: 0.95, y: 20, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="glass relative rounded-3xl p-10 w-full max-w-lg">
            <button onClick={onClose} className="absolute top-6 right-6 text-cream/30 hover:text-cream/60 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            {!done ? (<>
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-body tracking-[0.35em] uppercase text-gold/60">
                    Filtro de Elite — {Math.min(step + 1, quizSteps.length + 1)}/{quizSteps.length + 1}
                  </span>
                  {!isContact && quizSteps[step].label && (
                    <span className="text-[10px] font-body tracking-[0.25em] uppercase text-gold border border-gold/30 px-2 py-0.5 rounded-full">
                      {quizSteps[step].label}
                    </span>
                  )}
                </div>
                <h3 className="font-display-italic text-cream leading-tight" style={{ fontSize: "clamp(1.4rem,3vw,1.8rem)" }}>
                  {!isContact ? quizSteps[step].question : "Últimos detalhes para o diagnóstico"}
                </h3>
              </div>
              <div className="w-full h-[2px] bg-cream/8 rounded mb-8 overflow-hidden">
                <motion.div className="h-full bg-gold rounded"
                  animate={{ width: `${(step / (quizSteps.length)) * 100}%` }}
                  transition={{ duration: 0.35 }} />
              </div>
              {!isContact ? (
                <div className="space-y-3">
                  {quizSteps[step].options.map((opt, idx) => {
                    const isSelected = answers[quizSteps[step].id] === opt;
                    const isFeatured = step === 0 && idx === 0;
                    return (
                      <button key={opt} onClick={() => handleOption(opt)}
                        className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 font-body text-sm ${
                          isSelected
                            ? "border-gold/70 bg-gold/10 text-cream"
                            : isFeatured
                            ? "border-gold/35 text-cream/75 hover:border-gold/60 hover:text-cream"
                            : "border-cream/10 text-cream/55 hover:border-cream/22 hover:text-cream/80"}`}>
                        {isFeatured && !isSelected && (
                          <span className="block text-[9px] tracking-[0.3em] uppercase text-gold/60 mb-0.5">Mais popular</span>
                        )}
                        {opt}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-4">
                  <input type="text" placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-cream/10 bg-cream/5 text-cream placeholder-cream/30 font-body text-sm focus:outline-none focus:border-gold/40 transition-colors" />
                  <input type="tel" placeholder="WhatsApp (com DDD)" value={phone} onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-cream/10 bg-cream/5 text-cream placeholder-cream/30 font-body text-sm focus:outline-none focus:border-gold/40 transition-colors" />
                  <button onClick={handleSubmit} disabled={!name || !phone || submitting}
                    className="shimmer-auto pulse-cta w-full py-4 bg-gold text-void font-body font-medium text-sm tracking-widest uppercase rounded-xl disabled:opacity-50 transition-opacity">
                    {submitting ? "Enviando..." : "Descobrir meu potencial →"}
                  </button>
                </div>
              )}
            </>) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center mx-auto mb-6">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C5A467" strokeWidth="1.5">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h3 className="font-display-italic text-cream mb-3" style={{ fontSize: "1.8rem" }}>Recebido.</h3>
                <p className="font-body font-light text-cream/45 text-sm leading-relaxed mb-8">
                  Nosso time entrará em contato via WhatsApp em até 24h com um diagnóstico personalizado.
                </p>
                <button onClick={reset} className="text-xs font-body text-cream/30 hover:text-cream/60 tracking-widest uppercase transition-colors">
                  Fechar
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Testimonials Section ──────────────────────────────────────────
const testimonials = [
  {
    name: "Dr. Rafael Mendes",
    role: "Dermatologista · Clínica RM Premium",
    text: "Em 90 dias, nossa clínica saiu de 12 consultas por semana para 47 consultas premium. A HS Visual entende exatamente o que o mercado de alto padrão exige.",
    initials: "RM",
    result: "+292% em consultas premium",
    hue: 38,
  },
  {
    name: "André Cavalcante",
    role: "CEO · Cavalcante Real Estate",
    text: "O pipeline de automação eliminou completamente o desperdício de leads. Hoje, apenas compradores sérios chegam ao meu time. ROI de 840% no primeiro trimestre.",
    initials: "AC",
    result: "ROAS 8.4× comprovado",
    hue: 210,
  },
  {
    name: "Dra. Isabela Fortuna",
    role: "Especialista · Fortuna Aesthetics",
    text: "Minha agenda estava liberada. Após 60 dias com a HS Visual, tenho fila de espera de 3 semanas para procedimentos premium. O audiovisual mudou tudo.",
    initials: "IF",
    result: "3 semanas de fila de espera",
    hue: 280,
  },
];

function TestimonialsSection() {
  return (
    <Section className="py-8 px-6 bg-obsidian/30">
      <div className="max-w-7xl mx-auto relative">
        <AmbientOrb width={700} height={700} speed={0.2} style={{ left: "50%", top: "-10%", marginLeft: -350 }} />

        <div className="text-center mb-20">
          <h2 data-reveal-title className="font-display text-cream mb-5"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.025em", lineHeight: 1 }}>
            Resultados de Quem{" "}
            <span className="text-gold">Apostou</span>
          </h2>
          <p className="font-body font-light text-cream/35 max-w-sm mx-auto text-sm leading-relaxed">
            Números reais. Clientes reais. Sem edição, sem filtro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {testimonials.map((t, i) => (
            <motion.div key={t.name}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.14, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}>
              <TiltCard className="glass rounded-2xl p-8 overflow-hidden group h-full">
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `hsl(${t.hue},40%,18%)`, transform: "translate(30%,-30%)" }} />
                <div className="font-display-italic text-gold/18 leading-none mb-4 select-none" style={{ fontSize: "5rem", lineHeight: 0.8 }}>"</div>
                <p className="font-body font-light text-cream/65 leading-relaxed text-sm mb-8">{t.text}</p>
                <div className="inline-flex items-center gap-2 bg-gold/8 border border-gold/18 rounded-full px-4 py-1.5 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                  <span className="text-[10px] font-body font-medium text-gold tracking-wider uppercase">{t.result}</span>
                </div>
                <div className="flex items-center gap-3 pt-5 border-t border-cream/8">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-body font-medium text-void flex-shrink-0"
                    style={{ background: `hsl(${t.hue},25%,55%)` }}>
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-body font-medium text-cream/80">{t.name}</div>
                    <div className="text-[11px] font-body text-cream/30 mt-0.5">{t.role}</div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ── Strategist Section — O Estrategista ──────────────────────────
function StrategistSection() {
  return (
    <Section className="py-8 px-6">
      <div className="max-w-7xl mx-auto relative">
        <AmbientOrb width={600} height={600} speed={0.22} style={{ left: "20%", top: "20%" }} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          {/* Left — Photo frame */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative">
            <div className="relative rounded-3xl overflow-hidden" style={{ aspectRatio: "3/4", maxWidth: 460 }}>
              <img
                src="/bio_auth/Helder Show.png"
                alt="Helder Show — Fundador de Agência de Tráfego Pago, Especialista em Meta Ads, Google Ads e Automação de Lead Generation para Imobiliárias e Marcas Premium"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full rounded-3xl"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
            {/* Floating stat */}
            <div className="glass rounded-2xl p-5 absolute -bottom-5 -right-5 shadow-2xl">
              <div className="text-2xl font-body font-light text-gold tabular-nums">+10M</div>
              <div className="text-[10px] font-body text-cream/35 uppercase tracking-widest mt-1">em capital gerenciado</div>
            </div>
          </motion.div>

          {/* Right — Manifesto */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}>
            <div className="text-[10px] font-body tracking-[0.4em] uppercase text-gold/55 mb-6">O Estrategista</div>
            <h2 data-reveal-title className="font-display text-cream leading-[1.0] mb-8"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.025em" }}>
              Helder Show
            </h2>
            <div className="space-y-5 font-body font-light text-cream/50 leading-relaxed text-[15px] max-w-lg">
              <p>Construí a HS Visual com uma convicção: cada negócio merece uma comunicação à altura do seu produto e do seu momento. Não aceito mediocridade — nem na estética, nem nos números.</p>
              <p>Passei anos estudando o que separa uma campanha que gasta de uma campanha que retorna. A resposta não está no volume — está na <span className="text-gold/80 font-normal">precisão cirúrgica</span> de cada decisão criativa e estratégica.</p>
              <p>A HS Visual atende negócios de diferentes segmentos que estão prontos para crescer com estratégia, com especialidade no mercado imobiliário. Se é você, vamos conversar.</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              {[["12+", "Anos de experiência"], ["130+", "Marcas atendidas"], ["R$10M+", "Em capital gerenciado"]].map(([val, label]) => (
                <div key={label} className="glass rounded-xl px-5 py-3">
                  <div className="text-xl font-body font-light text-gold tabular-nums">{val}</div>
                  <div className="text-[10px] font-body text-cream/30 uppercase tracking-wider mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

// ── Systems Section ───────────────────────────────────────────────
// Glow intensity scales with pipeline progress — last node is the "destination"
const NODE_GLOWS = [
  "0 0 10px rgba(197,164,103,0.14), 0 0 20px rgba(197,164,103,0.06)",
  "0 0 12px rgba(197,164,103,0.18), 0 0 28px rgba(197,164,103,0.08)",
  "0 0 16px rgba(197,164,103,0.22), 0 0 36px rgba(197,164,103,0.09)",
  "0 0 20px rgba(197,164,103,0.28), 0 0 48px rgba(197,164,103,0.11)",
  "0 0 28px rgba(197,164,103,0.40), 0 0 70px rgba(197,164,103,0.16), 0 0 120px rgba(197,164,103,0.06)",
];

const NODE_BORDERS = [
  "rgba(197,164,103,0.15)",
  "rgba(197,164,103,0.20)",
  "rgba(197,164,103,0.28)",
  "rgba(197,164,103,0.38)",
  "rgba(197,164,103,0.58)",
];

function SystemsSection() {
  const nodes = [
    { icon: "◈", label: "Lead entra",          desc: "Via Meta Ads ou Google Ads" },
    { icon: "◎", label: "IA responde em 2min", desc: "Qualificação automática em tempo real" },
    { icon: "◐", label: "Classificação",       desc: "Comprador / Curioso / Descarte" },
    { icon: "◆", label: "Nurturing",           desc: "Aquecimento automático até estar pronto" },
    { icon: "✦",  label: "Você fecha a venda", desc: "Só chega quem tem intenção real" },
  ];

  return (
    <Section id="automacao" className="py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <AmbientOrb width={500} height={500} speed={0.18} style={{ left: "60%", top: "10%" }} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2
              data-reveal-title
              className="font-display text-cream leading-[1.0] mb-6"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.025em" }}
            >
              Vendas que
              <br />
              <span className="font-display-italic text-gold">não dormem</span>
            </h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-body font-light text-gold/45 mb-4"
              style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase" }}
            >
              Automação 24h · IA · CRM
            </motion.p>
            <p className="font-body font-light text-cream/50 leading-relaxed max-w-md mb-8">
              Às 2h da manhã, um lead clica no seu anúncio. Em menos de 2 minutos, ele recebe resposta, é qualificado e — se for comprador — chega até você pronto para fechar. Tudo automático.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Resposta em menos de 2 min", "Qualificação automática", "Só compradores chegam até você", "Funciona 24h por dia"].map((tag) => (
                <span key={tag} className="text-[10px] font-body font-medium text-gold/60 border border-gold/15 rounded px-3 py-1 tracking-wider transition-all duration-300 hover:border-gold/40 hover:text-gold/90 hover:bg-gold/5 cursor-default">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Architecture panel */}
          <div className="glass rounded-2xl p-8 relative overflow-hidden">
            {/* Ambient glow — emanates from the last node area */}
            <div className="absolute bottom-8 left-4 w-32 h-32 rounded-full blur-3xl pointer-events-none"
              style={{ background: "rgba(197,164,103,0.05)" }} />
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none"
              style={{ background: "rgba(197,164,103,0.025)" }} />

            <div className="text-[10px] font-body tracking-[0.3em] uppercase text-gold/50 mb-8">
              Como seu lead vira cliente
            </div>

            <div className="flex flex-col gap-1 relative">
              {/* Connector line — fades from dim to gold as pipeline converges */}
              <div
                className="absolute left-[19px] top-8 bottom-8 w-[1px] pointer-events-none"
                style={{
                  background: "linear-gradient(to bottom, rgba(197,164,103,0.08), rgba(197,164,103,0.20), rgba(197,164,103,0.45))",
                }}
              />

              {nodes.map((node, i) => (
                <motion.div
                  key={node.label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.18, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-4 py-3 group cursor-default"
                >
                  {/* Node icon — glow intensifies toward the final step */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-gold text-base flex-shrink-0 transition-all duration-500 group-hover:scale-105"
                    style={{
                      background: "rgba(15,15,15,0.8)",
                      border: `1px solid ${NODE_BORDERS[i]}`,
                      boxShadow: NODE_GLOWS[i],
                    }}
                  >
                    {node.icon}
                  </div>

                  <div className="flex-1">
                    <div
                      className="text-sm font-body font-medium"
                      style={{ color: i === nodes.length - 1 ? "#C5A467" : "rgba(255,255,255,0.80)" }}
                    >
                      {node.label}
                    </div>
                    <div className="text-[11px] font-body text-cream/30 mt-0.5">{node.desc}</div>
                  </div>

                  <div className="text-[10px] font-body tabular-nums"
                    style={{ color: i === nodes.length - 1 ? "rgba(197,164,103,0.40)" : "rgba(255,255,255,0.12)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── FAQ ───────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Qual é o perfil de cliente que a HS Visual atende?",
    a: "Empresas e profissionais com negócio já estruturado que querem crescer com previsibilidade: negócios locais, prestadores de serviço, corretores e imobiliárias, e empresas de outros segmentos. Temos especialidade no mercado imobiliário, mas atendemos negócios de diferentes áreas. Se você está validando o negócio do zero, ainda não é o momento ideal para nós — e não vamos fingir que é.",
  },
  {
    q: "Como começa minha operação?",
    a: "Você faz o diagnóstico gratuito. Em até 72h, analisamos sua situação a fundo. Na semana seguinte, a operação entra no ar. Você tem gestor dedicado e relatório semanal em linguagem simples — sem precisar entender de marketing.",
  },
  {
    q: "Qual o investimento mínimo em tráfego pago?",
    a: "A partir de R$ 10.000/mês em mídia paga. Com ROAS médio de 8,4×, isso representa R$ 84.000/mês em faturamento potencial. Não é gasto — é o custo de crescer com método.",
  },
  {
    q: "A HS Visual produz o conteúdo audiovisual internamente?",
    a: "Sim. Equipe própria, equipamentos profissionais, roteiro focado em conversão. Nenhum vídeo sai sem ter passado por teste de retenção e hook nos primeiros 3 segundos.",
  },
  {
    q: "Como funciona a automação de leads na prática?",
    a: "Lead entra pelo anúncio. Em menos de 2 minutos, nossa IA responde, faz perguntas de qualificação e classifica: comprador, curioso ou descarte. Apenas os compradores chegam até você — os outros entram em nutrição automática até estarem prontos.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto">
      {faqs.map((faq, i) => (
        <div key={i} className="border-b border-cream/8">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between py-6 text-left group"
          >
            <span className="font-body font-medium text-cream/80 group-hover:text-cream transition-colors duration-300 pr-8 text-sm leading-relaxed">
              {faq.q}
            </span>
            <span
              className={`text-gold flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
            </span>
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <p className="font-body font-light text-cream/40 text-sm leading-relaxed pb-6">
                  {faq.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ── Frentes de Trabalho Section ────────────────────────────────────
function FrentesSection() {
  const frentes = [
    {
      icon: "◎",
      title: "Tráfego Pago",
      services: "Meta Ads · Google Ads",
      metric: "ROAS 8.4×",
      hue: 38,
    },
    {
      icon: "◈",
      title: "Social Media",
      services: "Conteúdo Estratégico",
      metric: "Taxa Retenção 95%",
      hue: 210,
    },
    {
      icon: "✦",
      title: "Automação",
      services: "IA · CRM · 24h",
      metric: "Resposta em 2 min",
      hue: 280,
    },
  ];

  return (
    <section className="py-8 px-6 border-t border-cream/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display text-cream mb-2"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", letterSpacing: "-0.02em" }}
          >
            Nossas <span className="font-display-italic text-gold">Frentes</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="font-body font-light text-cream/35 text-sm"
          >
            Três pilares integrados para dominar seu mercado
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {frentes.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-6 border border-cream/8 hover:border-gold/20 transition-all duration-400 group"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-gold text-xl mb-4 transition-all duration-400"
                style={{
                  background: "rgba(197,164,103,0.08)",
                  border: "1px solid rgba(197,164,103,0.14)",
                  boxShadow: `0 0 16px rgba(${Math.floor(Math.cos(f.hue * Math.PI / 180) * 200)}, ${Math.floor(Math.cos((f.hue - 120) * Math.PI / 180) * 200)}, ${Math.floor(Math.cos((f.hue - 240) * Math.PI / 180) * 200)}, 0.08)`,
                }}
              >
                {f.icon}
              </div>
              <h4 className="font-body font-medium text-cream/85 text-sm mb-1">{f.title}</h4>
              <p className="font-body font-light text-cream/40 text-xs mb-4">{f.services}</p>
              <div className="inline-flex items-center gap-1.5 bg-gold/6 border border-gold/15 rounded-full px-3 py-1">
                <div className="w-1 h-1 rounded-full bg-gold/70" />
                <span className="text-[10px] font-body font-medium text-gold/80">{f.metric}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── FAQ Section ───────────────────────────────────────────────────
function FAQSection() {
  return (
    <section className="py-10 px-6 border-t border-cream/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-[10px] font-body tracking-[0.35em] uppercase text-gold/50 mb-3">Perguntas Frequentes</div>
          <h2
            className="font-display text-cream"
            style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", letterSpacing: "-0.02em" }}
          >
            Perguntas diretas. Respostas honestas.
          </h2>
        </div>
        <FAQ />
      </div>
    </section>
  );
}

// ── Sobre Nós ─────────────────────────────────────────────────────
function SobreNosSection() {
  const regioes = [
    "Jundiaí / SP", "São Paulo / SP", "Santos / SP", "Campinas / SP",
    "Rio de Janeiro / RJ", "Belo Horizonte / MG", "Salvador / BA",
    "Fortaleza / CE", "Recife / PE", "Brasília / DF",
  ];

  return (
    <Section id="sobre" className="py-5 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <div>
            <motion.h2
              data-reveal-title
              initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display-italic text-cream mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}
            >
              Atendimento em todo o <span className="text-gold">Brasil</span>
            </motion.h2>
            <p className="font-body font-light text-cream/55 text-sm leading-relaxed mb-3">
              A HS Visual é um atelier de estratégia digital fundado por{" "}
              <span className="text-cream/80 font-medium">Helder Show</span>, sediado em Jundiaí/SP,
              com operação estruturada para atender negócios de diferentes segmentos, com especialidade no mercado imobiliário, em qualquer estado do país.
            </p>
            <p className="font-body font-light text-cream/35 text-sm leading-relaxed mb-6">
              Nossa operação é 100% digital e estruturada para entregar resultados em qualquer cidade do Brasil — sem depender de presença física.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => openQuizModal()}
                className="text-xs font-body font-medium tracking-[0.2em] uppercase bg-gold text-void px-6 py-2.5 rounded hover:shadow-gold-sm transition-all duration-300"
              >
                Quero Crescer Agora
              </button>
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-body font-medium tracking-[0.2em] uppercase border border-gold/40 hover:border-gold text-gold px-6 py-2.5 rounded text-center transition-all duration-300"
              >
                Falar no WhatsApp
              </a>
            </div>
          </div>

          <div>
            <div className="text-[10px] font-body tracking-[0.3em] uppercase text-gold/40 mb-3">
              Regiões atendidas
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {regioes.map((regiao, i) => (
                <motion.div
                  key={regiao}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="glass rounded-lg px-3 py-2 flex items-center gap-2 transition-all duration-300 hover:border-gold/20 hover:-translate-y-0.5 hover:shadow-gold-sm"
                >
                  <div className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                  <span className="font-body text-xs text-cream/55 tracking-wider">{regiao}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Quiz Inline — 4 botões grandes visíveis na página ─────────────
const QUIZ_SERVICES = [
  { label: "Vender Mais e Atrair Clientes",  sub: "Tráfego Pago · Meta & Google Ads" },
  { label: "Redes Sociais Profissionais",     sub: "Social Media · Conteúdo Estratégico" },
  { label: "Vídeos de Alto Impacto",          sub: "Videomaker · Produção Audiovisual" },
  { label: "Atendimento Automático 24h",      sub: "Automação · IA · CRM" },
];

function QuizInlineSection() {
  return (
    <section className="py-8 px-6 border-t border-cream/5" style={{ scrollMarginTop: "88px" }}>
      <div className="max-w-3xl mx-auto text-center">
        <div className="text-[10px] font-body tracking-[0.4em] uppercase text-gold/50 mb-3">
          Diagnóstico Gratuito
        </div>
        <h2
          className="font-display-italic text-cream mb-10"
          style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", letterSpacing: "-0.02em" }}
        >
          O que você precisa <span className="text-gold">resolver agora?</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {QUIZ_SERVICES.map(({ label, sub }) => (
            <button
              key={label}
              onClick={() => openQuizModal(label)}
              className="glass rounded-2xl px-6 py-7 border border-cream/8 hover:border-gold/40 hover:bg-gold/5 hover:-translate-y-1 hover:shadow-gold-sm transition-all duration-300 group flex flex-col items-center justify-center text-center min-h-[96px]"
            >
              <div className="font-body text-[13px] font-medium text-cream/80 group-hover:text-cream mb-1.5 leading-snug">
                {label}
              </div>
              <div className="font-body text-[10px] text-cream/30 tracking-widest uppercase">
                {sub}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────
function Footer() {
  return (
    <motion.footer
      className="relative px-6 overflow-hidden"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      style={{ borderTop: "1px solid transparent", backgroundImage: "linear-gradient(#050505, #050505), linear-gradient(90deg, transparent, rgba(197,164,103,0.15), transparent)", backgroundOrigin: "border-box", backgroundClip: "padding-box, border-box" }}>
      <div className="max-w-6xl mx-auto">

        {/* ── Faixa principal — Logo · Nav · Ícones ── */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">

          {/* Logo */}
          <a href="/" aria-label="HS Visual — Home" className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO_SRC}
              alt="HS Visual"
              className="opacity-85 hover:opacity-100 transition-opacity duration-500"
              style={{ height: 62, width: "auto", display: "block", filter: "url(#nobg)" }}
            />
          </a>

          {/* Navegação — horizontal */}
          <nav className="flex flex-wrap justify-center items-center gap-x-7 gap-y-2">
            {NAV_LINKS.map(({ label, anchor }) => (
              <button
                key={anchor}
                onClick={() => scrollTo(anchor)}
                className="text-[10px] font-body font-light tracking-[0.3em] uppercase text-cream/30 hover:text-gold transition-colors duration-300"
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Ícones de contato — apenas ícones, sem texto */}
          <div className="flex items-center gap-5 shrink-0">
            <a href="https://www.instagram.com/hsvisual.oficial/" target="_blank" rel="noopener noreferrer"
              aria-label="Instagram @hsvisual.oficial"
              className="text-cream/25 hover:text-gold transition-colors duration-300">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`} target="_blank" rel="noopener noreferrer"
              aria-label="WhatsApp HS Visual"
              className="text-cream/25 hover:text-gold transition-colors duration-300">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </a>
            <a href="mailto:contato@hsvisual.com"
              aria-label="E-mail contato@hsvisual.com"
              className="text-cream/25 hover:text-gold transition-colors duration-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="18" height="18">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </a>
          </div>

        </div>

        {/* ── Linha legal — mínima ── */}
        <div className="border-t border-cream/5 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="text-[10px] font-body font-light text-cream/15 tracking-wide">
            © {new Date().getFullYear()} HS Visual · CNPJ 52.672.332/0001-16
          </span>
          <div className="flex items-center gap-5">
            <a href="/privacidade" target="_blank" rel="noopener noreferrer"
              className="text-[10px] font-body font-light text-cream/30 hover:text-gold/70 transition-colors tracking-[0.15em] uppercase">
              Política de Privacidade
            </a>
            <span className="text-cream/10">·</span>
            <a href="/privacidade" target="_blank" rel="noopener noreferrer"
              className="text-[10px] font-body font-light text-cream/30 hover:text-gold/70 transition-colors tracking-[0.15em] uppercase">
              LGPD</a><span className="text-cream/10">·</span><a href="/trafego-pago-jundiai" className="text-[10px] font-body font-light text-cream/30 hover:text-gold/70 transition-colors tracking-[0.15em] uppercase">Tráfego Pago em Jundiaí
            </a>
          </div>
        </div>

      </div>
    </motion.footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────
export default function Home() {
  const [loaded,         setLoaded]         = useState(false);
  const [quizOpen,       setQuizOpen]       = useState(false);
  const [initialService, setInitialService] = useState<string | undefined>();

  // Register global quiz trigger — suporta serviço pré-selecionado
  useEffect(() => {
    _openQuiz = (service?: string) => {
      setInitialService(service);
      setQuizOpen(true);
    };
    return () => { _openQuiz = null; };
  }, []);

  // GSAP blur-in reveal — dispara após a loading screen sair
  useEffect(() => {
    if (!loaded) return;
    gsap.registerPlugin(ScrollTrigger);

    const titles = document.querySelectorAll("[data-reveal-title]");
    titles.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 30, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true,
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [loaded]);

  return (
    <>
      <MagneticCursor />
      <QuizModal open={quizOpen} onClose={() => { setQuizOpen(false); setInitialService(undefined); }} initialService={initialService} />
      <LoadingScreen onComplete={() => setLoaded(true)} />

      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <Navbar />
            <WhatsAppButton />
            <main>
              <Hero />
              <BrandStripSection />
              <EstrategiaSection />
              <ObjecoesSection />
              <QuizInlineSection />
              <MetodologiaSection />
              <ComoFuncionaSection />
              <TrafficSection />
              <SocialSection />
              <AudiovisualSection />
              <TestimonialsSection />
              <SystemsSection />
              <StrategistSection />
              <FrentesSection />
              <FAQSection />
              <SobreNosSection />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
