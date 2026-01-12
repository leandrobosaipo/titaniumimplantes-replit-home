import type { Request, Response, NextFunction } from "express";

interface ContentValidationConfig {
  maxLinks: number;
  maxCapsPercentage: number;
  maxRepeatedChars: number;
  spamKeywords: string[];
  suspiciousEmailDomains: string[];
}

const defaultConfig: ContentValidationConfig = {
  maxLinks: 3,
  maxCapsPercentage: 50,
  maxRepeatedChars: 5,
  spamKeywords: [
    "viagra",
    "cialis",
    "casino",
    "poker",
    "loan",
    "debt",
    "free money",
    "make money",
    "work from home",
    "get rich",
    "click here",
    "buy now",
    "limited time",
    "act now",
    "urgent",
    "guaranteed",
    "no risk",
    "winner",
    "prize",
    "congratulations",
  ],
  suspiciousEmailDomains: [
    "tempmail",
    "guerrillamail",
    "10minutemail",
    "throwaway",
    "mailinator",
    "trashmail",
  ],
};

function countLinks(text: string): number {
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
  const matches = text.match(urlRegex);
  return matches ? matches.length : 0;
}

function calculateCapsPercentage(text: string): number {
  if (text.length === 0) return 0;
  const capsCount = (text.match(/[A-Z]/g) || []).length;
  return (capsCount / text.length) * 100;
}

function hasRepeatedChars(text: string, maxRepeated: number): boolean {
  const regex = new RegExp(`(.)\\1{${maxRepeated},}`, "i");
  return regex.test(text);
}

function containsSpamKeywords(text: string, keywords: string[]): boolean {
  const lowerText = text.toLowerCase();
  return keywords.some(keyword => lowerText.includes(keyword.toLowerCase()));
}

function isSuspiciousEmail(email: string, suspiciousDomains: string[]): boolean {
  if (!email || typeof email !== "string") return false;
  const domain = email.split("@")[1]?.toLowerCase();
  if (!domain) return false;
  return suspiciousDomains.some(susDomain => domain.includes(susDomain));
}

export function createContentValidatorMiddleware(config: Partial<ContentValidationConfig> = {}) {
  const finalConfig = { ...defaultConfig, ...config };

  return (req: Request, res: Response, next: NextFunction) => {
    const body = req.body || {};

    // Validar mensagem/descrição
    const messageFields = ["mensagem", "descricao_detalhada", "descricao", "message"];
    for (const field of messageFields) {
      const text = body[field];
      if (text && typeof text === "string") {
        // 1. Verificar links
        const linkCount = countLinks(text);
        if (linkCount > finalConfig.maxLinks) {
          console.log(`[CONTENT VALIDATOR] Muitos links detectados: ${linkCount}`);
          return res.status(400).json({
            error: "Invalid Content",
            message: `A mensagem contém muitos links. Máximo permitido: ${finalConfig.maxLinks}.`,
          });
        }

        // 2. Verificar CAPS LOCK excessivo
        const capsPercentage = calculateCapsPercentage(text);
        if (capsPercentage > finalConfig.maxCapsPercentage) {
          console.log(`[CONTENT VALIDATOR] CAPS LOCK excessivo: ${capsPercentage.toFixed(1)}%`);
          return res.status(400).json({
            error: "Invalid Content",
            message: "Por favor, evite usar muitas letras maiúsculas na mensagem.",
          });
        }

        // 3. Verificar caracteres repetidos
        if (hasRepeatedChars(text, finalConfig.maxRepeatedChars)) {
          console.log("[CONTENT VALIDATOR] Caracteres repetidos detectados");
          return res.status(400).json({
            error: "Invalid Content",
            message: "A mensagem contém padrões suspeitos.",
          });
        }

        // 4. Verificar palavras-chave de spam
        if (containsSpamKeywords(text, finalConfig.spamKeywords)) {
          console.log("[CONTENT VALIDATOR] Palavras-chave de spam detectadas");
          return res.status(400).json({
            error: "Invalid Content",
            message: "A mensagem contém conteúdo não permitido.",
          });
        }
      }
    }

    // Validar email
    const emailFields = ["email", "e-mail"];
    for (const field of emailFields) {
      const email = body[field];
      if (email && isSuspiciousEmail(email, finalConfig.suspiciousEmailDomains)) {
        console.log(`[CONTENT VALIDATOR] Email suspeito detectado: ${email}`);
        return res.status(400).json({
          error: "Invalid Email",
          message: "O email fornecido não é válido.",
        });
      }
    }

    // Todas as validações passaram
    next();
  };
}

// Middleware padrão
export const contentValidator = createContentValidatorMiddleware();
