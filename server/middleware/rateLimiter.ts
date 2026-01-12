import type { Request, Response, NextFunction } from "express";

interface RateLimitEntry {
  count: number;
  resetAt: number;
  firstRequestAt: number;
}

interface RateLimitStore {
  [key: string]: RateLimitEntry;
}

class RateLimiter {
  private store: RateLimitStore = {};
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Limpar entradas antigas a cada 5 minutos
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  private cleanup() {
    const now = Date.now();
    const keys = Object.keys(this.store);
    
    for (const key of keys) {
      const entry = this.store[key];
      // Remover entradas que expiraram há mais de 2 minutos
      if (now > entry.resetAt + 2 * 60 * 1000) {
        delete this.store[key];
      }
    }
  }

  private getKey(req: Request, type: "ip" | "email"): string | null {
    if (type === "ip") {
      // Obter IP real (considerando proxies)
      const forwarded = req.headers["x-forwarded-for"];
      const ip = forwarded
        ? (Array.isArray(forwarded) ? forwarded[0] : forwarded.split(",")[0].trim())
        : req.socket.remoteAddress || "unknown";
      return `ip:${ip}`;
    } else {
      // Rate limiting por email (se fornecido)
      const email = req.body?.email;
      if (!email || typeof email !== "string") {
        return null;
      }
      return `email:${email.toLowerCase().trim()}`;
    }
  }

  createMiddleware(
    windowMs: number,
    maxRequests: number,
    keyType: "ip" | "email" = "ip"
  ) {
    return (req: Request, res: Response, next: NextFunction) => {
      // Verificar se tem token de verificação humana válido (bypass rate limit)
      const humanVerified = req.body?.humanVerified === true;
      const verificationToken = req.body?.verificationToken as string | undefined;
      
      if (humanVerified && verificationToken) {
        // Token será validado no routes.ts, aqui apenas permitimos passar
        // se a flag estiver presente
        return next();
      }

      const key = this.getKey(req, keyType);
      
      if (!key) {
        // Se não conseguir gerar chave (ex: email não fornecido), permitir
        return next();
      }

      const now = Date.now();
      const entry = this.store[key];

      if (!entry) {
        // Primeira requisição
        this.store[key] = {
          count: 1,
          resetAt: now + windowMs,
          firstRequestAt: now,
        };
        return next();
      }

      if (now > entry.resetAt) {
        // Janela expirou, resetar
        this.store[key] = {
          count: 1,
          resetAt: now + windowMs,
          firstRequestAt: now,
        };
        return next();
      }

      // Verificar limite
      if (entry.count >= maxRequests) {
        const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
        
        return res.status(429).json({
          error: "Limite de envios atingido",
          message: "Entendemos que você precisa enviar várias mensagens. Para garantir que você é uma pessoa real, precisamos de uma confirmação rápida.",
          humanChallenge: true, // Flag para indicar que precisa de verificação humana
          retryAfter,
          friendlyMessage: "Por favor, confirme que você é humano para continuar.",
        });
      }

      // Incrementar contador
      entry.count++;
      next();
    };
  }

  // Middleware para rate limiting por IP (5 req/min - menos restritivo para permitir múltiplos formulários)
  ipRateLimit = this.createMiddleware(60000, 5, "ip");

  // Middleware para rate limiting por email (3 req/hora)
  emailRateLimit = this.createMiddleware(3600000, 3, "email");
}

export const rateLimiter = new RateLimiter();
