# Auditoria e Monitoramento de Formulários

Este guia explica como auditar, monitorar e debugar problemas com os formulários do site.

## 📋 Fluxo Completo de Envio

### Formulário de Contato

```
1. Usuário preenche formulário (nome, email, telefone, mensagem)
2. Frontend valida dados (React Hook Form + Zod)
3. Frontend envia POST /api/webhook/contato
4. Backend aplica proteções:
   - Rate Limiting (5 req/min por IP, 3 req/hora por email)
   - Spam Protection (honeypot, tempo, headers)
   - Content Validator (palavras-chave, links, etc)
5. Backend envia para webhook externo (n8n)
6. Webhook n8n processa e envia email
```

### Formulário de Denúncia

```
1. Usuário preenche formulário (dados da denúncia)
2. Frontend valida dados (React Hook Form + Zod)
3. Frontend envia POST /api/webhook/denuncia
4. Backend aplica proteções (mesmas do contato)
5. Backend GERA código de acompanhamento (DEN-XXXXXX-XXXX)
6. Backend envia para webhook externo (n8n) COM codigo_denuncia
7. Webhook n8n processa e envia email com código
8. Backend retorna código para frontend exibir
```

## 🔍 Como Verificar Logs

### Logs do Servidor (Local)

**Onde ver:**
- Terminal onde `npm run dev` está rodando
- Logs aparecem em tempo real

**O que procurar:**

#### Log Normal (Sucesso)
```
[ROUTES] ✅ Rota /api/webhook/contato CHAMADA!
[DEBUG] Enviando para webhook externo: https://...
[DEBUG] Resposta do webhook: { status: 200, ok: true }
[DEBUG] ✅ Sucesso - retornando 200
```

#### Log com Código de Acompanhamento (Denúncia)
```
[ROUTES] ✅ Rota /api/webhook/denuncia CHAMADA!
[DEBUG] Código de acompanhamento gerado: DEN-123456-ABCD
[DEBUG] Enviando para webhook externo: https://...
[DEBUG] Resposta do webhook: { status: 200, ok: true }
[DEBUG] ✅ Sucesso - retornando 200
```

#### Log com Rate Limit
```
[ROUTES] ✅ Rota /api/webhook/contato CHAMADA!
[MIDDLEWARE] Resposta enviada: POST /api/webhook/contato 429
```

#### Log com Verificação Humana
```
[ROUTES] ✅ Rota /api/verify-human CHAMADA!
[DEBUG] Token de verificação gerado: human_1234567890_abc123
[ROUTES] ✅ Rota /api/webhook/contato CHAMADA!
[DEBUG] ✅ Verificação humana válida, permitindo envio
```

### Logs do Servidor (Remoto - EasyPanel)

**Onde ver:**
1. Acesse o painel do EasyPanel
2. Selecione seu projeto
3. Vá em "Logs" ou "Container Logs"
4. Logs aparecem em tempo real

**Filtros úteis:**
- Buscar por `[ROUTES]` para ver requisições
- Buscar por `[DEBUG]` para ver detalhes
- Buscar por `[ERROR]` para ver erros
- Buscar por `429` para ver rate limits
- Buscar por `codigo_denuncia` para ver códigos gerados

## 🐛 Problemas Comuns e Soluções

### "Formulário não envia / Erro ao enviar"

**Checklist de diagnóstico:**

1. **Verificar logs do servidor:**
   ```bash
   # Ver se servidor está rodando
   # Ver se há erros nos logs
   ```

2. **Verificar variáveis de ambiente:**
   ```bash
   # Local
   cat .env
   
   # Verificar se WEBHOOK_CONTATO_URL está configurada
   # Verificar se WEBHOOK_DENUNCIA_URL está configurada
   ```

3. **Verificar se rate limit bloqueou:**
   - Procurar por `429` nos logs
   - Se aparecer, usuário precisa fazer verificação humana

4. **Verificar se spam protection bloqueou:**
   - Procurar por `[SPAM PROTECTION]` nos logs
   - Verificar qual validação falhou

5. **Verificar se webhook externo está ativo:**
   - Verificar logs do n8n
   - Verificar se webhook está configurado corretamente

**Solução:**
- Se rate limit: Usuário deve fazer verificação humana
- Se spam: Verificar dados do formulário (não deve ter spam)
- Se webhook: Verificar configuração no n8n

### "Código de acompanhamento não aparece"

**Checklist de diagnóstico:**

1. **Verificar se código foi gerado no backend:**
   - Procurar por `[DEBUG] Código de acompanhamento gerado:` nos logs
   - Código deve aparecer antes de enviar ao webhook

2. **Verificar se código foi enviado ao webhook:**
   - Verificar payload no log `[DEBUG] Enviando para webhook externo`
   - Deve conter campo `codigo_denuncia`

3. **Verificar se código foi retornado ao frontend:**
   - Verificar resposta do backend
   - Deve conter `codigo_denuncia` na resposta JSON

4. **Verificar logs do webhook externo (n8n):**
   - Verificar se n8n recebeu `codigo_denuncia`
   - Verificar se email foi enviado com código

**Solução:**
- Se código não foi gerado: Verificar código em `server/routes.ts`
- Se código não foi enviado: Verificar se campo está no payload
- Se código não aparece no frontend: Verificar se frontend está recebendo da resposta

### "Rate limit muito restritivo"

**Sintomas:**
- Usuários legítimos sendo bloqueados
- Muitos erros 429 nos logs

**Solução:**
1. Ajustar limites em `server/middleware/rateLimiter.ts`:
   ```typescript
   // Atual: 5 req/min por IP
   ipRateLimit = this.createMiddleware(60000, 5, "ip");
   
   // Pode aumentar para 10 req/min se necessário
   ipRateLimit = this.createMiddleware(60000, 10, "ip");
   ```

2. Verificar se verificação humana está funcionando
3. Monitorar logs para identificar padrões

### "Verificação humana não funciona"

**Checklist:**

1. **Verificar endpoint de verificação:**
   - Procurar por `[ROUTES] ✅ Rota /api/verify-human CHAMADA!`
   - Verificar se token foi gerado

2. **Verificar se token é válido:**
   - Procurar por `[DEBUG] ✅ Verificação humana válida`
   - Se não aparecer, token pode estar expirado ou inválido

3. **Verificar se bypass está funcionando:**
   - Após verificação, formulário deve ser enviado
   - Não deve retornar 429 novamente

**Solução:**
- Se endpoint não responde: Verificar se rota está registrada
- Se token inválido: Verificar se token não expirou (5 minutos)
- Se bypass não funciona: Verificar lógica em `server/middleware/rateLimiter.ts`

## 🧪 Como Testar Manualmente

### Teste Básico de Formulário

1. **Preencher formulário:**
   - Preencher todos os campos obrigatórios
   - Clicar em "Enviar"

2. **Verificar logs:**
   - Deve aparecer `[ROUTES] ✅ Rota chamada`
   - Deve aparecer `[DEBUG] Enviando para webhook externo`
   - Deve aparecer `[DEBUG] ✅ Sucesso`

3. **Verificar webhook (n8n):**
   - Verificar se webhook recebeu os dados
   - Verificar se email foi enviado

### Teste de Rate Limit

1. **Enviar múltiplos formulários rapidamente:**
   - Enviar 6 formulários em menos de 1 minuto
   - 6º formulário deve retornar 429

2. **Verificar dialog de verificação:**
   - Dialog deve aparecer
   - Mensagem amigável deve estar visível

3. **Confirmar verificação:**
   - Clicar em "Confirmar que sou humano"
   - Formulário deve ser enviado com sucesso

### Teste de Código de Acompanhamento (Denúncia)

1. **Enviar denúncia:**
   - Preencher formulário de denúncia
   - Enviar

2. **Verificar logs do backend:**
   ```
   [DEBUG] Código de acompanhamento gerado: DEN-123456-ABCD
   ```

3. **Verificar payload enviado ao webhook:**
   - Deve conter `codigo_denuncia: "DEN-123456-ABCD"`

4. **Verificar resposta ao frontend:**
   - Frontend deve receber `codigo_denuncia` na resposta
   - Código deve aparecer na tela de confirmação

5. **Verificar webhook n8n:**
   - Verificar se `codigo_denuncia` foi recebido
   - Verificar se email foi enviado com código

## 📊 Monitoramento de Rate Limiting

### Verificar Rate Limit Ativo

**Logs a procurar:**
```
[MIDDLEWARE] Resposta enviada: POST /api/webhook/contato 429
```

**Informações úteis:**
- IP do usuário (nos logs do servidor)
- Email do usuário (se fornecido)
- Timestamp da requisição

### Verificar Verificações Humanas

**Logs a procurar:**
```
[ROUTES] ✅ Rota /api/verify-human CHAMADA!
[DEBUG] Token de verificação gerado: human_...
[DEBUG] ✅ Verificação humana válida, permitindo envio
```

**Métricas:**
- Número de verificações por hora
- Taxa de sucesso de verificações
- IPs que mais solicitam verificação

## 🔐 Verificação de Código de Acompanhamento

### Como Verificar se Código Foi Gerado

**No backend (logs):**
```
[DEBUG] Código de acompanhamento gerado: DEN-123456-ABCD
```

**No payload enviado ao webhook:**
- Verificar log `[DEBUG] Enviando para webhook externo`
- Payload deve conter `codigo_denuncia: "DEN-123456-ABCD"`

### Como Verificar se Código Foi Recebido pelo Webhook

**No n8n:**
1. Acessar workflow do webhook
2. Verificar dados recebidos
3. Verificar se campo `codigo_denuncia` está presente
4. Verificar se email foi enviado com código

### Como Verificar se Código Foi Exibido no Frontend

**No navegador:**
1. Abrir DevTools (F12)
2. Ir em Network
3. Filtrar por `/api/webhook/denuncia`
4. Verificar resposta JSON
5. Deve conter `codigo_denuncia`
6. Código deve aparecer na tela de confirmação

## 📝 Exemplos de Logs Completos

### Envio Bem-Sucedido (Contato)

```
[MIDDLEWARE] Requisição recebida: POST /api/webhook/contato
[ROUTES] ✅ Rota /api/webhook/contato CHAMADA! {
  method: 'POST',
  path: '/webhook/contato',
  body: { nome: 'João Silva', email: 'joao@example.com', ... }
}
[DEBUG] Enviando para webhook externo: https://...
[DEBUG] Resposta do webhook: { status: 200, statusText: 'OK', ok: true }
[DEBUG] ✅ Sucesso - retornando 200
[MIDDLEWARE] Resposta enviada: POST /api/webhook/contato 200 1309ms
```

### Envio Bem-Sucedido (Denúncia com Código)

```
[MIDDLEWARE] Requisição recebida: POST /api/webhook/denuncia
[ROUTES] ✅ Rota /api/webhook/denuncia CHAMADA!
[DEBUG] Código de acompanhamento gerado: DEN-123456-ABCD
[DEBUG] Enviando para webhook externo: https://...
[DEBUG] Resposta do webhook: { status: 200, ok: true }
[DEBUG] ✅ Sucesso - retornando 200
[MIDDLEWARE] Resposta enviada: POST /api/webhook/denuncia 200 1456ms
```

### Rate Limit com Verificação Humana

```
[MIDDLEWARE] Requisição recebida: POST /api/webhook/contato
[ROUTES] ✅ Rota /api/webhook/contato CHAMADA!
[MIDDLEWARE] Resposta enviada: POST /api/webhook/contato 429 1ms
[express] POST /api/webhook/contato 429 in 1ms :: {"error":"Limite de envios atingido","humanChallenge":true}

[MIDDLEWARE] Requisição recebida: POST /api/verify-human
[ROUTES] ✅ Rota /api/verify-human CHAMADA!
[DEBUG] Token de verificação gerado: human_1234567890_abc123

[MIDDLEWARE] Requisição recebida: POST /api/webhook/contato
[ROUTES] ✅ Rota /api/webhook/contato CHAMADA!
[DEBUG] ✅ Verificação humana válida, permitindo envio
[DEBUG] Enviando para webhook externo: https://...
[DEBUG] ✅ Sucesso - retornando 200
```

## 🛠️ Comandos Úteis

### Ver Logs em Tempo Real (Local)

```bash
npm run dev
# Logs aparecem no terminal
```

### Verificar Variáveis de Ambiente

```bash
# Local
cat .env

# Verificar se estão carregadas
echo $WEBHOOK_CONTATO_URL
echo $WEBHOOK_DENUNCIA_URL
```

### Filtrar Logs Específicos

```bash
# Ver apenas rotas chamadas
npm run dev | grep "\[ROUTES\]"

# Ver apenas erros
npm run dev | grep "\[ERROR\]"

# Ver apenas códigos gerados
npm run dev | grep "Código de acompanhamento gerado"
```

## 📚 Documentação Relacionada

- [Proteção Anti-Spam](./PROTECAO-ANTI-SPAM.md) - Detalhes sobre proteções
- [Guia de Debug](./GUIA-DEBUG-FORMULARIOS.md) - Checklist de diagnóstico
- [Configuração de Ambiente](./CONFIGURACAO-AMBIENTE.md) - Como configurar
- [Deploy](./DEPLOY.md) - Como fazer deploy

## 🆘 Quando Alguém Reclama

### Checklist de Atendimento

1. **Perguntar:**
   - Qual formulário (contato ou denúncia)?
   - Quando tentou enviar?
   - Qual mensagem de erro apareceu (se houver)?
   - Recebeu código de acompanhamento (se denúncia)?

2. **Verificar logs:**
   - Procurar por requisições no horário informado
   - Verificar se houve erro 429 (rate limit)
   - Verificar se houve erro 500 (erro interno)
   - Verificar se webhook recebeu os dados

3. **Verificar webhook n8n:**
   - Verificar se workflow está ativo
   - Verificar se email foi enviado
   - Verificar se código de acompanhamento está presente (denúncia)

4. **Solução:**
   - Se rate limit: Explicar verificação humana
   - Se erro interno: Verificar logs e corrigir
   - Se webhook não recebeu: Verificar configuração
   - Se código não apareceu: Verificar geração no backend
