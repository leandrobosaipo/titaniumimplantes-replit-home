// Carregar variáveis de ambiente do arquivo .env PRIMEIRO
import dotenv from "dotenv";
dotenv.config();

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic, log } from "./vite.prod";

const app = express();

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log("[MIDDLEWARE] Requisição recebida:", req.method, req.path);
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log("[MIDDLEWARE] Resposta enviada:", req.method, path, res.statusCode, `${duration}ms`);
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  console.log("[SERVER] Iniciando registro de rotas...");
  const server = await registerRoutes(app);
  console.log("[SERVER] Rotas registradas, configurando middlewares...");

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    // Importação dinâmica para evitar carregar vite em produção
    try {
      const { setupVite } = await import("./vite.dev");
      await setupVite(app, server);
    } catch (error) {
      log(`Failed to setup Vite: ${error instanceof Error ? error.message : String(error)}`);
      // Fallback para servir arquivos estáticos se vite falhar
      serveStatic(app);
    }
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: process.env.HOST || "127.0.0.1",
  }, () => {
    log(`serving on port ${port}`);
  }).on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
      log(`❌ Erro: Porta ${port} já está em uso.`);
      log(`💡 Solução: Pare o processo usando a porta ou use outra porta.`);
      log(`   Para parar processos na porta ${port}, execute:`);
      log(`   lsof -ti:${port} | xargs kill -9`);
      log(`   Ou use outra porta: PORT=5001 npm run dev`);
      process.exit(1);
    } else {
      log(`❌ Erro ao iniciar servidor: ${err.message}`);
      throw err;
    }
  });
})();
