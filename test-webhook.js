// Script de teste para verificar se a rota /api/webhook/denuncia funciona
// Execute: node test-webhook.js

const testData = {
  anonimo: true,
  urgencia: "Baixa",
  tipo_denuncia: "Teste",
  data_ocorrencia: "2026-01-05",
  local_ocorrencia: "Teste",
  pessoas_envolvidas: "Teste",
  descricao_detalhada: "Este é um teste automatizado da rota de webhook",
  evidencias: "Teste",
  termos_aceitos: true,
  origem: "form_denuncia_titanium",
};

async function testWebhook() {
  try {
    console.log("🧪 Testando rota /api/webhook/denuncia...");
    console.log("📤 Enviando dados:", JSON.stringify(testData, null, 2));
    
    const response = await fetch("http://localhost:5001/api/webhook/denuncia", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    console.log("📥 Status:", response.status, response.statusText);
    console.log("📥 Headers:", Object.fromEntries(response.headers.entries()));
    
    const text = await response.text();
    console.log("📥 Body:", text);
    
    if (response.ok) {
      console.log("✅ SUCESSO! Rota funcionando corretamente!");
      return true;
    } else {
      console.log("❌ ERRO! Status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("❌ ERRO na requisição:", error.message);
    return false;
  }
}

testWebhook().then(success => {
  process.exit(success ? 0 : 1);
});

