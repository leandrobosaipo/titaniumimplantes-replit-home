import type { Express, Router } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

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
  
  // Proxy endpoint para webhook de denúncia (evita problemas de CORS)
  apiRouter.post("/webhook/denuncia", async (req, res) => {
    console.log("[ROUTES] ✅ Rota /api/webhook/denuncia CHAMADA!", {
      method: req.method,
      path: req.path,
      originalUrl: req.originalUrl,
      body: req.body,
    });
    
    try {
      const webhookUrl =
        "https://criadordigital-n8n-webhook.easypanel.codigo5.com.br/webhook/canal-denuncia";

      console.log("[DEBUG] Enviando para webhook externo:", webhookUrl);
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body),
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
      res.status(200).json({ success: true });
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
