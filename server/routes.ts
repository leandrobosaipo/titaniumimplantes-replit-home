import type { Express, Router } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { rateLimiter } from "./middleware/rateLimiter";
import { spamProtection } from "./middleware/spamProtection";
import { contentValidator } from "./middleware/contentValidator";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  console.log("[ROUTES] Registrando rotas da API...");
  
  // Criar router separado para API para garantir que seja processado antes do Vite
  const apiRouter = express.Router();
  
  // Test route to verify routing works
  apiRouter.get("/test", (req, res) => {
    console.log("[ROUTES] ✅ Rota de teste /api/test chamada");
    res.json({ message: "Rota de teste funcionando", timestamp: new Date().toISOString() });
  });

  // Debug route: verifica se variáveis de ambiente críticas estão presentes (sem expor valores)
  apiRouter.get("/env-check", (_req, res) => {
    res.json({
      nodeEnv: process.env.NODE_ENV || null,
      port: process.env.PORT || null,
      hasWebhookContatoUrl: Boolean(process.env.WEBHOOK_CONTATO_URL),
      hasWebhookDenunciaUrl: Boolean(process.env.WEBHOOK_DENUNCIA_URL),
    });
  });

  // Store para tokens de verificação humana
  interface HumanVerificationToken {
    token: string;
    ip: string;
    expiresAt: number;
    used: boolean;
  }
  const humanVerificationTokens: Map<string, HumanVerificationToken> = new Map();

  // Limpar tokens expirados a cada 5 minutos
  setInterval(() => {
    const now = Date.now();
    const tokensToDelete: string[] = [];
    humanVerificationTokens.forEach((data, token) => {
      if (now > data.expiresAt || data.used) {
        tokensToDelete.push(token);
      }
    });
    tokensToDelete.forEach((token) => humanVerificationTokens.delete(token));
  }, 5 * 60 * 1000);

  // Endpoint para verificação humana
  apiRouter.post("/verify-human", (req, res) => {
    console.log("[ROUTES] ✅ Rota /api/verify-human CHAMADA!");

    try {
      // Obter IP do usuário
      const forwarded = req.headers["x-forwarded-for"];
      const ip = forwarded
        ? (Array.isArray(forwarded) ? forwarded[0] : forwarded.split(",")[0].trim())
        : req.socket.remoteAddress || "unknown";

      // Verificar se já tem muitos tokens ativos para este IP (limite: 3 por hora)
      const now = Date.now();
      const activeTokensForIP = Array.from(humanVerificationTokens.values()).filter(
        (t) => t.ip === ip && !t.used && now < t.expiresAt
      );

      if (activeTokensForIP.length >= 3) {
        return res.status(429).json({
          error: "Muitas verificações",
          message: "Você já possui verificações ativas. Aguarde alguns minutos antes de solicitar uma nova verificação.",
        });
      }

      // Gerar token temporário (válido por 5 minutos)
      const token = `human_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      const expiresAt = now + 5 * 60 * 1000; // 5 minutos

      humanVerificationTokens.set(token, {
        token,
        ip,
        expiresAt,
        used: false,
      });

      console.log("[DEBUG] Token de verificação gerado:", { token, ip, expiresAt });

      res.status(200).json({
        success: true,
        token,
        expiresAt,
        message: "Verificação confirmada. Você pode enviar sua mensagem agora.",
      });
    } catch (error) {
      console.error("[DEBUG] Erro na verificação humana:", error);
      res.status(500).json({
        error: "Erro interno ao processar verificação",
      });
    }
  });
  
  // Função helper para validar token de verificação humana
  function validateHumanVerificationToken(req: express.Request): boolean {
    const verificationToken = req.body?.verificationToken as string | undefined;
    if (!verificationToken) return false;

    const tokenData = humanVerificationTokens.get(verificationToken);
    if (!tokenData) return false;

    // Verificar se token não expirou e não foi usado
    const now = Date.now();
    if (now > tokenData.expiresAt || tokenData.used) {
      humanVerificationTokens.delete(verificationToken);
      return false;
    }

    // Verificar IP (opcional, mas recomendado)
    const forwarded = req.headers["x-forwarded-for"];
    const ip = forwarded
      ? (Array.isArray(forwarded) ? forwarded[0] : forwarded.split(",")[0].trim())
      : req.socket.remoteAddress || "unknown";
    
    if (tokenData.ip !== ip) {
      return false;
    }

    // Marcar token como usado
    tokenData.used = true;
    return true;
  }

  // Proxy endpoint para webhook de contato (com proteções anti-spam)
  apiRouter.post(
    "/webhook/contato",
    rateLimiter.ipRateLimit, // Rate limiting por IP: 5 req/min
    rateLimiter.emailRateLimit, // Rate limiting por email: 3 req/hora
    spamProtection, // Validações de honeypot, tempo, headers
    contentValidator, // Validação de conteúdo suspeito
    async (req, res) => {
      console.log("[ROUTES] ✅ Rota /api/webhook/contato CHAMADA!", {
        method: req.method,
        path: req.path,
        body: req.body,
      });

      // Validar token de verificação humana se presente
      if (req.body?.humanVerified === true) {
        const isValid = validateHumanVerificationToken(req);
        if (!isValid) {
          return res.status(400).json({
            error: "Token de verificação inválido ou expirado",
            message: "Por favor, solicite uma nova verificação.",
          });
        }
        console.log("[DEBUG] ✅ Verificação humana válida, permitindo envio");
      }

      try {
        // Webhook URL - OBRIGATÓRIA em produção, fallback apenas em desenvolvimento
        const webhookUrl = process.env.WEBHOOK_CONTATO_URL;
        
        if (!webhookUrl) {
          if (process.env.NODE_ENV === "production") {
            console.error("[ERROR] WEBHOOK_CONTATO_URL não configurada em produção!");
            return res.status(500).json({
              error: "Configuração do servidor incompleta",
              message: "Webhook não configurado",
            });
          }
          // Apenas em desenvolvimento: usar fallback (não seguro para produção)
          console.warn("[WARN] WEBHOOK_CONTATO_URL não configurada, usando fallback (apenas desenvolvimento)");
          const fallbackUrl = "https://criadordigital-n8n-webhook.easypanel.codigo5.com.br/webhook/contact-form-titanium-implantes";
          console.warn("[WARN] ⚠️ URLs hardcoded são inseguras! Configure variáveis de ambiente.");
          return res.status(500).json({
            error: "Webhook não configurado",
            message: "Configure WEBHOOK_CONTATO_URL no arquivo .env",
          });
        }

        console.log("[DEBUG] Enviando para webhook externo:", webhookUrl);

        // Remover campos internos antes de enviar
        const { website, _formStartTime, ...payload } = req.body;

        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...payload,
            origem: "form_contato_titanium_home",
          }),
        });

        console.log("[DEBUG] Resposta do webhook:", {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
        });

        if (!response.ok) {
          return res.status(response.status).json({
            error: "Erro ao enviar formulário",
            status: response.status,
          });
        }

        console.log("[DEBUG] ✅ Sucesso - retornando 200");
        res.status(200).json({ success: true });
      } catch (error) {
        console.error("[DEBUG] Erro no proxy de contato:", error);
        res.status(500).json({
          error: "Erro interno ao processar formulário",
        });
      }
    }
  );

  // Proxy endpoint para webhook de denúncia (evita problemas de CORS)
  apiRouter.post(
    "/webhook/denuncia",
    rateLimiter.ipRateLimit, // Rate limiting por IP: 1 req/min
    rateLimiter.emailRateLimit, // Rate limiting por email: 3 req/hora
    spamProtection, // Validações de honeypot, tempo, headers
    contentValidator, // Validação de conteúdo suspeito
    async (req, res) => {
    console.log("[ROUTES] ✅ Rota /api/webhook/denuncia CHAMADA!", {
      method: req.method,
      path: req.path,
      originalUrl: req.originalUrl,
      body: req.body,
    });
    
    try {
      // Webhook URL - OBRIGATÓRIA em produção, fallback apenas em desenvolvimento
      const webhookUrl = process.env.WEBHOOK_DENUNCIA_URL;
      
      if (!webhookUrl) {
        if (process.env.NODE_ENV === "production") {
          console.error("[ERROR] WEBHOOK_DENUNCIA_URL não configurada em produção!");
          return res.status(500).json({
            error: "Configuração do servidor incompleta",
            message: "Webhook não configurado",
          });
        }
        // Apenas em desenvolvimento: usar fallback (não seguro para produção)
        console.warn("[WARN] WEBHOOK_DENUNCIA_URL não configurada, usando fallback (apenas desenvolvimento)");
        const fallbackUrl = "https://criadordigital-n8n-webhook.easypanel.codigo5.com.br/webhook/canal-denuncia";
        console.warn("[WARN] ⚠️ URLs hardcoded são inseguras! Configure variáveis de ambiente.");
        return res.status(500).json({
          error: "Webhook não configurado",
          message: "Configure WEBHOOK_DENUNCIA_URL no arquivo .env",
        });
      }

      console.log("[DEBUG] Enviando para webhook externo:", webhookUrl);
      
      // Gerar código de acompanhamento (formato: DEN-XXXXXX-XXXX)
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.random().toString(36).substring(2, 6).toUpperCase();
      const codigoDenuncia = `DEN-${timestamp}-${random}`;
      
      console.log("[DEBUG] Código de acompanhamento gerado:", codigoDenuncia);
      
      // Remover campos internos anti-spam antes de enviar ao webhook externo
      const { website, _formStartTime, humanVerified, verificationToken, ...payload } = req.body;

      // Adicionar código de acompanhamento ao payload (campo esperado pelo webhook n8n)
      const payloadComCodigo = {
        ...payload,
        codigo_denuncia: codigoDenuncia,
      };

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadComCodigo),
      });

      console.log("[DEBUG] Resposta do webhook:", {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
      });

      // Se o webhook retornar 404, significa que não está configurado no n8n
      // Em desenvolvimento, podemos aceitar isso como sucesso para testes
      // Em produção, o webhook precisa estar configurado e ativo
      if (response.status === 404) {
        console.log("[DEBUG] ⚠️ Webhook não encontrado no n8n (404)");
        console.log("[DEBUG] ℹ️ O webhook precisa ser configurado e ativado no n8n");
        // Em desenvolvimento, retornar sucesso para permitir testes
        // Em produção, isso deve ser tratado como erro
        if (process.env.NODE_ENV === "development") {
          console.log("[DEBUG] ✅ Modo desenvolvimento: retornando sucesso mesmo com 404 do webhook");
          return res.status(200).json({ 
            success: true,
            codigo_denuncia: codigoDenuncia,
            message: "Denúncia recebida (webhook externo não configurado - modo desenvolvimento)"
          });
        }
      }

      if (!response.ok) {
        return res.status(response.status).json({
          error: "Erro ao enviar denúncia",
          status: response.status,
        });
      }

      console.log("[DEBUG] ✅ Sucesso - retornando 200");
      // Retornar código de acompanhamento para o frontend exibir
      res.status(200).json({ 
        success: true,
        codigo_denuncia: codigoDenuncia,
      });
    } catch (error) {
      console.error("[DEBUG] Erro no proxy de denúncia:", error);
      res.status(500).json({
        error: "Erro interno ao processar denúncia",
      });
    }
  });

  // Montar o router da API no app ANTES de qualquer outro middleware
  // Isso garante que as rotas /api/* sejam processadas antes do Vite
  app.use("/api", apiRouter);
  
  console.log("[ROUTES] ✅ Router da API montado em /api");
  console.log("[ROUTES] Rotas registradas com sucesso");
  
  // Debug: List all registered routes
  console.log("[ROUTES] Listando todas as rotas registradas:");
  const routes: string[] = [];
  app._router?.stack?.forEach((middleware: any) => {
    if (middleware.route) {
      const methods = Object.keys(middleware.route.methods).map(m => m.toUpperCase()).join(',');
      routes.push(`${methods} ${middleware.route.path}`);
    } else if (middleware.regexp && middleware.name === 'router') {
      // Router mounted
      routes.push(`ROUTER mounted`);
    }
  });
  console.log("[ROUTES] Rotas encontradas:", routes.length > 0 ? routes : "NENHUMA ROTA ENCONTRADA!");
  
  const httpServer = createServer(app);

  return httpServer;
}
