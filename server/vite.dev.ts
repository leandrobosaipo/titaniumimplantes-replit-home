import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  // List all registered routes for debugging
  console.log("[VITE] Rotas registradas no Express:");
  app._router?.stack?.forEach((middleware: any) => {
    if (middleware.route) {
      console.log(`  ${Object.keys(middleware.route.methods).join(',').toUpperCase()} ${middleware.route.path}`);
    }
  });

  // Apply Vite middleware conditionally - skip for /api routes
  // IMPORTANTE: Este middleware deve ser aplicado DEPOIS das rotas da API serem registradas
  // e deve definitivamente não processar rotas /api/*
  app.use((req, res, next) => {
    // CRITICAL: Skip ALL /api routes - they should be handled by API router
    if (req.path.startsWith("/api")) {
      console.log("[VITE] ⏭️ Pulando middleware do Vite para rota /api:", req.path);
      return next(); // Pass to next middleware (which should be the API routes)
    }
    console.log("[VITE] ✅ Aplicando middleware do Vite para:", req.path);
    // vite.middlewares is a Connect-compatible middleware function
    // Only apply to non-API routes
    return vite.middlewares(req, res, next);
  });
  
  app.use("*", async (req, res, next) => {
    console.log("[VITE] Catch-all interceptado:", req.method, req.path);
    // Skip API routes - they should be handled by registerRoutes
    if (req.path.startsWith("/api")) {
      console.log("[VITE] ⚠️ Rota /api chegou no catch-all - isso não deveria acontecer! Verificando rotas...");
      // List routes to debug
      const routes: string[] = [];
      app._router?.stack?.forEach((middleware: any) => {
        if (middleware.route) {
          routes.push(`${Object.keys(middleware.route.methods).join(',').toUpperCase()} ${middleware.route.path}`);
        }
      });
      console.log("[VITE] Rotas disponíveis:", routes);
      return next(); // Let Express handle 404
    }

    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        __dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
