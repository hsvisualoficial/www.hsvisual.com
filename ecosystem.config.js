module.exports = {
  apps: [
    {
      name: "hsvisual",
      script: "node_modules/.bin/next",
      args: "start",
      cwd: "/var/www/hsvisual.com",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "512M",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        // Copie aqui as variáveis do .env.local
        NEXT_PUBLIC_WEBHOOK_URL: "https://SEU_N8N.DOMINIO.COM/webhook/hsvisual-quiz",
      },
    },
  ],
};
