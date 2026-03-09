import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { applySeoToHtml } from "./seo";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
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
  // but exclude /api routes to allow API endpoints to work
  app.use("*", async (req, res, next) => {
    // Skip API routes - they should be handled by registerRoutes
    if (req.path.startsWith("/api")) {
      return next();
    }

    try {
      const indexPath = path.resolve(distPath, "index.html");
      const template = await fs.promises.readFile(indexPath, "utf-8");
      const host = req.get("x-forwarded-host") || req.get("host") || "titaniumimplantes.com.br";
      const proto = req.get("x-forwarded-proto") || (host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https");
      const siteUrl = `${proto}://${host}`;
      const seoPage = applySeoToHtml(template, req.originalUrl || req.url || req.path, siteUrl);
      res.status(200).set({ "Content-Type": "text/html" }).send(seoPage);
    } catch (error) {
      next(error);
    }
  });
}

