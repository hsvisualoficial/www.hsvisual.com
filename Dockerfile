# ── Stage 1: Instalar dependências ────────────────────────────────────────
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# ── Stage 2: Build estático (output: export) ──────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build
# Gera a pasta /app/out com os arquivos estáticos prontos

# ── Stage 3: Nginx serve os arquivos em produção ──────────────────────────
FROM nginx:1.27-alpine AS runner

# Remove config padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Config customizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Arquivos estáticos do build Next.js
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
