import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidade — HS Visual",
  description: "Como a HS Visual coleta, usa e protege seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).",
};

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-void text-cream">
      {/* Header */}
      <header className="border-b border-cream/5 px-6 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-serif italic text-xl text-cream/80 hover:text-cream transition-colors">
            HS<span className="text-[#C5A059]">Visual</span>
          </Link>
          <Link href="/" className="text-[11px] font-sans text-cream/40 hover:text-cream/70 transition-colors tracking-widest uppercase">
            ← Voltar ao site
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-12">
          <p className="text-[10px] font-sans text-[#C5A059]/60 tracking-[0.4em] uppercase mb-4">Transparência e Conformidade</p>
          <h1 className="font-serif italic text-4xl md:text-5xl text-cream leading-tight mb-4">
            Política de Privacidade
          </h1>
          <p className="text-sm font-sans text-cream/40">Última atualização: abril de 2025</p>
        </div>

        <div className="prose prose-invert prose-gold max-w-none space-y-10 font-sans text-cream/70 leading-relaxed text-[15px]">

          <section>
            <h2 className="text-cream text-xl font-medium mb-3">1. Quem somos</h2>
            <p>
              A <strong className="text-cream">HS Visual</strong> (razão social sob CNPJ 52.672.332/0001-16), com sede em Jundiaí/SP, é uma agência de estratégia digital e audiovisual de alto padrão. Para fins desta Política, somos o <strong className="text-cream">Controlador</strong> dos seus dados pessoais, nos termos da Lei Geral de Proteção de Dados (<strong className="text-cream">LGPD — Lei nº 13.709/2018</strong>).
            </p>
            <p className="mt-3">
              Dúvidas sobre privacidade podem ser encaminhadas para: <a href="mailto:contato@hsvisual.com" className="text-[#C5A059] hover:underline">contato@hsvisual.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-cream text-xl font-medium mb-3">2. Dados que coletamos</h2>
            <p>Coletamos dados pessoais das seguintes formas:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>
                <strong className="text-cream">Quiz de Diagnóstico:</strong> ao responder nosso quiz de qualificação de leads, coletamos nome, número de WhatsApp e respostas fornecidas voluntariamente. Esses dados são enviados via webhook seguro para nosso sistema de CRM.
              </li>
              <li>
                <strong className="text-cream">Navegação e cookies:</strong> ao acessar este site, informações técnicas como endereço IP, tipo de navegador, páginas visitadas e tempo de navegação podem ser registradas automaticamente por nossas ferramentas de análise.
              </li>
              <li>
                <strong className="text-cream">Meta Pixel (Facebook/Instagram Ads):</strong> utilizamos o Meta Pixel para medir a eficácia de campanhas publicitárias, rastrear conversões e criar públicos personalizados. O Pixel pode registrar eventos de página vista, interação com conteúdo e início de formulários.
              </li>
              <li>
                <strong className="text-cream">Google Analytics (GA4) e Google Tag Manager:</strong> utilizados para análise de tráfego, comportamento de usuários e otimização de desempenho do site. Os dados são anonimizados e agregados.
              </li>
              <li>
                <strong className="text-cream">TikTok Pixel:</strong> pode ser utilizado para mensuração de campanhas veiculadas na plataforma TikTok.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-cream text-xl font-medium mb-3">3. Finalidade e base legal</h2>
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-cream/10">
                    <th className="text-left py-2 pr-6 text-cream font-medium">Dado / Finalidade</th>
                    <th className="text-left py-2 text-cream font-medium">Base Legal (LGPD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cream/5">
                  {[
                    ["Nome e WhatsApp via Quiz", "Consentimento (art. 7º, I) — Legítimo Interesse (art. 7º, IX)"],
                    ["Contato comercial e envio de proposta", "Execução de contrato ou diligências pré-contratuais (art. 7º, V)"],
                    ["Meta Pixel — mensuração de campanhas", "Consentimento e Legítimo Interesse (art. 7º, I e IX)"],
                    ["Análise de tráfego (GA4)", "Legítimo Interesse (art. 7º, IX)"],
                    ["Cumprimento de obrigação legal / fiscal", "Obrigação legal (art. 7º, II)"],
                  ].map(([dado, base]) => (
                    <tr key={dado}>
                      <td className="py-2 pr-6 text-cream/60">{dado}</td>
                      <td className="py-2 text-cream/60">{base}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-cream text-xl font-medium mb-3">4. Cookies</h2>
            <p>
              Utilizamos cookies essenciais para o funcionamento do site e cookies de rastreamento para fins publicitários (Meta Pixel, TikTok Pixel, GA4). Ao continuar navegando neste site, você concorda com o uso de cookies conforme descrito nesta política.
            </p>
            <p className="mt-3">
              Você pode gerenciar ou desativar cookies a qualquer momento pelas configurações do seu navegador. A desativação de cookies pode afetar funcionalidades do site.
            </p>
            <div className="mt-4 p-4 border border-cream/10 rounded-xl space-y-1">
              <p className="text-cream font-medium text-sm">Tipos de cookies utilizados:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2 text-sm">
                <li><span className="text-cream">Essenciais:</span> necessários para o funcionamento básico do site.</li>
                <li><span className="text-cream">Analíticos:</span> GA4 / Google Tag Manager — compreendem como os visitantes interagem com o site.</li>
                <li><span className="text-cream">Publicitários:</span> Meta Pixel, TikTok Pixel — permitem exibir anúncios relevantes e mensurar campanhas.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-cream text-xl font-medium mb-3">5. Compartilhamento de dados</h2>
            <p>Não vendemos seus dados pessoais. Podemos compartilhá-los com:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li><strong className="text-cream">Meta Platforms (Facebook/Instagram):</strong> para mensuração de anúncios via Pixel.</li>
              <li><strong className="text-cream">Google LLC:</strong> para análise de tráfego via GA4 e GTM.</li>
              <li><strong className="text-cream">Parceiros de automação (n8n, CRM):</strong> para gestão de leads captados via quiz, sujeitos às mesmas obrigações de proteção de dados.</li>
              <li><strong className="text-cream">Autoridades públicas:</strong> quando exigido por lei ou ordem judicial.</li>
            </ul>
            <p className="mt-3">
              Todos os fornecedores são avaliados quanto à conformidade com a LGPD e GDPR, quando aplicável.
            </p>
          </section>

          <section>
            <h2 className="text-cream text-xl font-medium mb-3">6. Retenção de dados</h2>
            <p>
              Mantemos seus dados pessoais pelo tempo necessário para cumprir as finalidades descritas nesta política ou conforme exigido por lei. Dados de leads não convertidos são excluídos após 24 meses de inatividade. Você pode solicitar a exclusão antecipada a qualquer momento.
            </p>
          </section>

          <section>
            <h2 className="text-cream text-xl font-medium mb-3">7. Seus direitos (LGPD — art. 18)</h2>
            <p>Como titular de dados, você tem direito a:</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              <li>Confirmação da existência de tratamento dos seus dados;</li>
              <li>Acesso aos seus dados;</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários;</li>
              <li>Portabilidade dos dados a outro fornecedor de serviço;</li>
              <li>Eliminação dos dados tratados com base em consentimento;</li>
              <li>Informação sobre compartilhamentos realizados;</li>
              <li>Revogação do consentimento, a qualquer momento.</li>
            </ul>
            <p className="mt-3">
              Para exercer qualquer desses direitos, entre em contato pelo e-mail <a href="mailto:contato@hsvisual.com" className="text-[#C5A059] hover:underline">contato@hsvisual.com</a> com o assunto "LGPD — Direitos do Titular".
            </p>
          </section>

          <section>
            <h2 className="text-cream text-xl font-medium mb-3">8. Segurança</h2>
            <p>
              Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados contra acesso não autorizado, alteração, divulgação ou destruição. O tráfego do site é protegido por HTTPS/TLS. O acesso ao CRM e sistemas de automação é restrito e autenticado.
            </p>
          </section>

          <section>
            <h2 className="text-cream text-xl font-medium mb-3">9. Alterações nesta política</h2>
            <p>
              Podemos atualizar esta Política periodicamente. Alterações relevantes serão comunicadas por meio de aviso no site. O uso continuado dos nossos serviços após as alterações implica aceite da versão atualizada.
            </p>
          </section>

          <section>
            <h2 className="text-cream text-xl font-medium mb-3">10. Contato e DPO</h2>
            <div className="p-5 border border-[#C5A059]/20 rounded-xl mt-3 space-y-1.5">
              <p className="text-cream font-medium">HS Visual</p>
              <p>CNPJ: 52.672.332/0001-16</p>
              <p>Jundiaí / SP — Brasil</p>
              <p>E-mail: <a href="mailto:contato@hsvisual.com" className="text-[#C5A059] hover:underline">contato@hsvisual.com</a></p>
              <p>Instagram: <a href="https://www.instagram.com/hsvisual.oficial/" target="_blank" rel="noopener noreferrer" className="text-[#C5A059] hover:underline">@hsvisual.oficial</a></p>
            </div>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-cream/5 text-center">
          <Link href="/" className="inline-block text-[11px] font-sans text-cream/30 hover:text-[#C5A059] transition-colors tracking-widest uppercase">
            ← Voltar ao site
          </Link>
        </div>
      </main>
    </div>
  );
}
