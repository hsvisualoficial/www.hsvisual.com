"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: string;
  role: "helena" | "user";
  text: string;
};

const OPENING: Message[] = [
  {
    id: "h0",
    role: "helena",
    text: "Olá! Sou a Helena, estrategista digital da HS Visual.",
  },
  {
    id: "h1",
    role: "helena",
    text: "Você está a uma conversa de transformar seu negócio. Qual é o seu principal desafio agora?",
  },
];

const QUICK_REPLIES = [
  "Quero atrair mais clientes",
  "Preciso de tráfego pago",
  "Social media profissional",
  "Automatizar meu atendimento",
];

const AUTO_REPLY =
  "Entendido! Nossa equipe vai analisar sua situação e entrar em contato via WhatsApp em até 24h com um diagnóstico personalizado. Posso te perguntar: qual é o ticket médio do seu produto?";

export default function HelenaChat() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]     = useState("");
  const [typing, setTyping]   = useState(false);
  const [pulsed, setPulsed]   = useState(false);
  const [replied, setReplied] = useState(false);
  const bottomRef             = useRef<HTMLDivElement>(null);

  // Show opening messages staggered when panel first opens
  useEffect(() => {
    if (!open || messages.length > 0) return;
    OPENING.forEach((msg, i) => {
      setTimeout(() => setMessages(prev => [...prev, msg]), i * 900);
    });
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = { id: `u${Date.now()}`, role: "user", text: trimmed };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    if (replied) return;
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setReplied(true);
      setMessages(prev => [
        ...prev,
        { id: `h${Date.now()}`, role: "helena", text: AUTO_REPLY },
      ]);
    }, 1800);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  };

  const showQuickReplies = messages.length > 0 && messages.length < 3 && !replied;

  return (
    <>
      {/* ── Chat panel ─────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="helena-panel"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              bottom: "6.5rem",
              left: "2rem",
              zIndex: 70,
              width: 356,
              maxHeight: "calc(100vh - 9rem)",
              display: "flex",
              flexDirection: "column",
              borderRadius: 24,
              overflow: "hidden",
              background: "rgba(0, 0, 0, 0.92)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
              border: "1px solid rgba(212,175,55,0.14)",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.80), 0 0 0 1px rgba(212,175,55,0.06), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* ── Header ── */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 18px",
                borderBottom: "1px solid rgba(212,175,55,0.08)",
                flexShrink: 0,
              }}
            >
              {/* Avatar */}
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "rgba(212,175,55,0.08)",
                    border: "1px solid rgba(212,175,55,0.28)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 20px rgba(212,175,55,0.14)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Playfair Display SC', Georgia, serif",
                      fontStyle: "italic",
                      fontSize: "1.05rem",
                      color: "#D4AF37",
                      lineHeight: 1,
                    }}
                  >
                    H
                  </span>
                </div>
                {/* Online dot */}
                <div
                  style={{
                    position: "absolute",
                    bottom: -1,
                    right: -1,
                    width: 11,
                    height: 11,
                    borderRadius: "50%",
                    background: "#34d399",
                    border: "2px solid #000000",
                  }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "'Montserrat', 'Inter', system-ui, sans-serif",
                    fontWeight: 500,
                    fontSize: "0.875rem",
                    color: "rgba(255,255,255,0.92)",
                    lineHeight: 1.2,
                  }}
                >
                  Helena
                </div>
                <div
                  style={{
                    fontFamily: "'Montserrat', 'Inter', system-ui, sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.32em",
                    textTransform: "uppercase",
                    color: "rgba(212,175,55,0.55)",
                    marginTop: 2,
                  }}
                >
                  Estrategista HS Visual · Online
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                style={{
                  color: "rgba(255,255,255,0.28)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 4,
                  lineHeight: 0,
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.65)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.28)")}
                aria-label="Fechar chat"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* ── Messages ── */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "14px 16px",
                display: "flex",
                flexDirection: "column",
                gap: 10,
                minHeight: 260,
                maxHeight: 300,
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(212,175,55,0.18) transparent",
              }}
            >
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "82%",
                      padding: "10px 14px",
                      borderRadius: msg.role === "helena" ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                      fontFamily: "'Montserrat', 'Inter', system-ui, sans-serif",
                      fontSize: "0.835rem",
                      lineHeight: 1.55,
                      ...(msg.role === "helena"
                        ? {
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            color: "rgba(255,255,255,0.78)",
                          }
                        : {
                            background: "#D4AF37",
                            color: "#000000",
                            fontWeight: 500,
                          }),
                    }}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <div
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "4px 16px 16px 16px",
                        padding: "10px 16px",
                        display: "flex",
                        gap: 5,
                        alignItems: "center",
                      }}
                    >
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "rgba(212,175,55,0.55)",
                          }}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.55, delay: i * 0.14, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* ── Quick replies ── */}
            <AnimatePresence>
              {showQuickReplies && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{
                    padding: "0 16px 10px",
                    display: "flex",
                    gap: 6,
                    flexWrap: "wrap",
                    flexShrink: 0,
                  }}
                >
                  {QUICK_REPLIES.map(reply => (
                    <button
                      key={reply}
                      onClick={() => send(reply)}
                      style={{
                        fontSize: "0.6rem",
                        fontFamily: "'Montserrat', 'Inter', system-ui, sans-serif",
                        fontWeight: 500,
                        letterSpacing: "0.06em",
                        color: "rgba(212,175,55,0.65)",
                        border: "1px solid rgba(212,175,55,0.18)",
                        borderRadius: 100,
                        padding: "5px 12px",
                        background: "transparent",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        transition: "border-color 0.2s, color 0.2s, background 0.2s",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = "rgba(212,175,55,0.45)";
                        e.currentTarget.style.color = "#D4AF37";
                        e.currentTarget.style.background = "rgba(212,175,55,0.05)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = "rgba(212,175,55,0.18)";
                        e.currentTarget.style.color = "rgba(212,175,55,0.65)";
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      {reply}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Input ── */}
            <div
              style={{
                padding: "10px 16px 14px",
                flexShrink: 0,
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: 14,
                  padding: "9px 14px",
                  transition: "border-color 0.2s",
                }}
                onFocusCapture={e => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,175,55,0.30)")}
                onBlurCapture={e => ((e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.09)")}
              >
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Digite sua mensagem..."
                  style={{
                    flex: 1,
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    fontFamily: "'Montserrat', 'Inter', system-ui, sans-serif",
                    fontSize: "0.825rem",
                    color: "rgba(255,255,255,0.82)",
                  }}
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim()}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: input.trim() ? "pointer" : "default",
                    color: input.trim() ? "#D4AF37" : "rgba(255,255,255,0.18)",
                    lineHeight: 0,
                    transition: "color 0.2s",
                    flexShrink: 0,
                  }}
                  aria-label="Enviar"
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
              <p
                style={{
                  textAlign: "center",
                  fontFamily: "'Montserrat', 'Inter', system-ui, sans-serif",
                  fontSize: "0.57rem",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.14)",
                  marginTop: 8,
                }}
              >
                HS Visual · Resposta em até 24h
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating trigger button ─────────────────────────── */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => { setOpen(prev => !prev); setPulsed(true); }}
        aria-label="Falar com Helena — HS Visual"
        style={{
          position: "fixed",
          bottom: "2rem",
          left: "2rem",
          zIndex: 70,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #D4AF37 0%, #C5A467 100%)",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0 0 0 2px rgba(212,175,55,0.22), 0 8px 32px rgba(0,0,0,0.55), 0 0 40px rgba(212,175,55,0.12)",
          cursor: "pointer",
        }}
      >
        {/* Pulse ring — só antes da primeira abertura */}
        {!pulsed && (
          <span
            className="wa-ping"
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              background: "rgba(212,175,55,0.28)",
              pointerEvents: "none",
            }}
          />
        )}

        <AnimatePresence mode="wait">
          {open ? (
            <motion.span
              key="x"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
              transition={{ duration: 0.22 }}
              style={{ lineHeight: 0 }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2.2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.span>
          ) : (
            <motion.span
              key="h"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.22 }}
              style={{
                fontFamily: "'Playfair Display SC', Georgia, serif",
                fontStyle: "italic",
                fontSize: "1.25rem",
                color: "#000000",
                fontWeight: 500,
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              H
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
