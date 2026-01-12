import type { Request, Response, NextFunction } from "express";

interface SpamProtectionConfig {
  minTimeSeconds: number;
  maxTimeMinutes: number;
  requireUserAgent: boolean;
  requireReferer: boolean;
  allowedOrigins?: string[];
}

const defaultConfig: SpamProtectionConfig = {
  minTimeSeconds: 3,
  maxTimeMinutes: 30,
  requireUserAgent: true,
  requireReferer: false, // Pode ser false em desenvolvimento
  allowedOrigins: undefined, // Se undefined, não valida origin
};

export function createSpamProtectionMiddleware(config: Partial<SpamProtectionConfig> = {}) {
  const finalConfig = { ...defaultConfig, ...config };

  return (req: Request, res: Response, next: NextFunction) => {
    // 1. Validar Honeypot
    if (req.body?.website) {
      // Campo honeypot preenchido = bot/spammer
      // Retornar sucesso silencioso para não alertar o spammer
      console.log("[SPAM PROTECTION] Honeypot detectado, rejeitando silenciosamente");
      return res.status(200).json({ success: true });
    }

    // 2. Validar Timestamp de Preenchimento
    const startTime = req.body?._formStartTime;
    if (startTime && typeof startTime === "number") {
      const elapsedSeconds = (Date.now() - startTime) / 1000;
      const elapsedMinutes = elapsedSeconds / 60;

      // Tempo mínimo (anti-bot)
      if (elapsedSeconds < finalConfig.minTimeSeconds) {
        console.log(`[SPAM PROTECTION] Submissão muito rápida: ${elapsedSeconds.toFixed(2)}s`);
        return res.status(400).json({
          error: "Invalid Request",
          message: "O formulário foi preenchido muito rapidamente. Por favor, preencha com mais cuidado.",
        });
      }

      // Tempo máximo (prevenir preenchimento muito lento ou suspeito)
      if (elapsedMinutes > finalConfig.maxTimeMinutes) {
        console.log(`[SPAM PROTECTION] Submissão muito lenta: ${elapsedMinutes.toFixed(2)}min`);
        return res.status(400).json({
          error: "Invalid Request",
          message: "O tempo de preenchimento expirou. Por favor, recarregue a página e tente novamente.",
        });
      }
    } else {
      // Timestamp não fornecido - pode ser spam ou formulário antigo
      // Em produção, podemos ser mais estritos
      if (process.env.NODE_ENV === "production") {
        console.log("[SPAM PROTECTION] Timestamp não fornecido");
        return res.status(400).json({
          error: "Invalid Request",
          message: "Dados do formulário inválidos.",
        });
      }
    }

    // 3. Validar User-Agent
    if (finalConfig.requireUserAgent) {
      const userAgent = req.headers["user-agent"];
      if (!userAgent || userAgent.trim().length === 0) {
        console.log("[SPAM PROTECTION] User-Agent ausente");
        return res.status(400).json({
          error: "Invalid Request",
          message: "Requisição inválida.",
        });
      }

      // Verificar User-Agents suspeitos comuns
      const suspiciousUserAgents = [
        "curl",
        "wget",
        "python-requests",
        "go-http-client",
        "java/",
        "scrapy",
      ];
      
      const lowerUA = userAgent.toLowerCase();
      if (suspiciousUserAgents.some(sus => lowerUA.includes(sus))) {
        console.log(`[SPAM PROTECTION] User-Agent suspeito: ${userAgent}`);
        // Em produção, rejeitar; em desenvolvimento, apenas logar
        if (process.env.NODE_ENV === "production") {
          return res.status(400).json({
            error: "Invalid Request",
            message: "Requisição inválida.",
          });
        }
      }
    }

    // 4. Validar Referer (opcional)
    if (finalConfig.requireReferer) {
      const referer = req.headers.referer;
      if (!referer) {
        console.log("[SPAM PROTECTION] Referer ausente");
        return res.status(400).json({
          error: "Invalid Request",
          message: "Requisição inválida.",
        });
      }
    }

    // 5. Validar Origin (se configurado)
    if (finalConfig.allowedOrigins && finalConfig.allowedOrigins.length > 0) {
      const origin = req.headers.origin;
      if (origin && !finalConfig.allowedOrigins.includes(origin)) {
        console.log(`[SPAM PROTECTION] Origin não permitido: ${origin}`);
        return res.status(403).json({
          error: "Forbidden",
          message: "Origem não permitida.",
        });
      }
    }

    // Todas as validações passaram
    next();
  };
}

// Middleware padrão
export const spamProtection = createSpamProtectionMiddleware();
