/**
 * HS Visual — Integração Quiz → Webhook → Pixels
 *
 * Cole a função `submitLead` no handleSubmit do QuizModal (app/page.tsx).
 * Os eventos de pixel só disparam se o script estiver ativado no layout.tsx.
 */

// ── Tipagem dos dados do quiz ──────────────────────────────────────────────
interface LeadPayload {
  name: string;
  phone: string;        // digitado pelo usuário — será normalizado no n8n
  segment: string;
  investment: string;
  goal: string;
  source: "hs-visual-quiz";
  timestamp: string;
}

// ── Helpers de pixel (tipagem global) ─────────────────────────────────────
declare function fbq(event: string, name: string, params?: Record<string, unknown>): void;
declare function gtag(cmd: string, event: string, params?: Record<string, unknown>): void;
declare function ttq_track(event: string, params?: Record<string, unknown>): void;

// ── Disparo de pixels após conversão ──────────────────────────────────────
function fireConversionPixels(payload: LeadPayload) {
  // Meta Pixel
  if (typeof fbq !== "undefined") {
    fbq("track", "Lead", {
      content_name: "Quiz HS Visual",
      content_category: payload.segment,
      value: 0,
      currency: "BRL",
    });
  }

  // Google Analytics 4
  if (typeof gtag !== "undefined") {
    gtag("event", "generate_lead", {
      event_category: "quiz",
      event_label: payload.segment,
      value: 1,
    });
  }

  // TikTok Pixel
  if (typeof ttq_track !== "undefined") {
    ttq_track("SubmitForm", {
      content_type: "product",
      content_name: payload.segment,
    });
  }
}

// ── Função principal — substitui o fetch atual do QuizModal ───────────────
export async function submitLead(
  payload: Omit<LeadPayload, "source" | "timestamp">
): Promise<"success" | "error"> {
  const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("NEXT_PUBLIC_WEBHOOK_URL não configurada.");
    return "error";
  }

  const body: LeadPayload = {
    ...payload,
    source: "hs-visual-quiz",
    timestamp: new Date().toISOString(),
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      // Não espera o fluxo n8n inteiro — apenas o nó "Resposta 200 OK"
      signal: AbortSignal.timeout(8000),
    });

    if (res.ok) {
      fireConversionPixels(body);
      return "success";
    }
    return "error";
  } catch {
    // Falha silenciosa: mostra tela de sucesso mesmo offline
    // para não bloquear o funil
    fireConversionPixels(body);
    return "success";
  }
}

/*
 * ── Como usar no QuizModal (app/page.tsx) ──────────────────────────────
 *
 *  import { submitLead } from "@/n8n/integration-frontend";
 *
 *  const handleSubmit = async () => {
 *    if (!name || !phone || submitting) return;
 *    setSubmitting(true);
 *
 *    const result = await submitLead({ name, phone, segment, investment, goal });
 *
 *    setStep(result === "success" ? "success" : "success"); // fail silently
 *    setSubmitting(false);
 *  };
 *
 * ── SQL para criar a tabela no Supabase ────────────────────────────────
 *
 *  CREATE TABLE leads_projeto_3000 (
 *    id           uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
 *    nome         text        NOT NULL,
 *    whatsapp     text        NOT NULL,
 *    segmento     text,
 *    investimento text,
 *    objetivo     text,
 *    origem       text        DEFAULT 'hs-visual-quiz',
 *    score        integer     DEFAULT 0,
 *    temperatura  text        DEFAULT '🔵 COLD',
 *    mensagem     text,
 *    created_at   timestamptz DEFAULT now()
 *  );
 *
 *  -- Índice para buscas rápidas por telefone (evita duplicatas)
 *  CREATE UNIQUE INDEX leads_whatsapp_unique ON leads_projeto_3000 (whatsapp);
 *
 * ── Variáveis de ambiente (.env.local) ────────────────────────────────
 *
 *  NEXT_PUBLIC_WEBHOOK_URL=https://seu-n8n.dominio.com/webhook/hsvisual-quiz
 *
 * ── Variáveis no n8n (Settings → Variables) ───────────────────────────
 *
 *  SUPABASE_URL          → https://xxxx.supabase.co
 *  SUPABASE_KEY          → eyJ... (service_role key)
 *  EVOLUTION_API_URL     → https://sua-evolution.com
 *  EVOLUTION_INSTANCE    → hsvisual
 *  EVOLUTION_API_KEY     → sua-api-key
 *  HELDER_WHATSAPP       → 5511953611000
 */
