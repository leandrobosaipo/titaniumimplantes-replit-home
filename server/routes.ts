import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Proxy endpoint para webhook de denúncia (evita problemas de CORS)
  app.post("/api/webhook/denuncia", async (req, res) => {
    try {
      const webhookUrl =
        "https://criadordigital-n8n-webhook.easypanel.codigo5.com.br/webhook/denuncia-titanium-implantes";

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
      });

      if (!response.ok) {
        return res.status(response.status).json({
          error: "Erro ao enviar denúncia",
          status: response.status,
        });
      }

      res.status(200).json({ success: true });
    } catch (error) {
      console.error("Erro no proxy de denúncia:", error);
      res.status(500).json({
        error: "Erro interno ao processar denúncia",
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
