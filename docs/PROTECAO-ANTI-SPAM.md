# Proteção Anti-Spam - Guia de Configuração

Este documento descreve como configurar e usar o sistema de proteção anti-spam implementado nos formulários do site.

## 📋 Visão Geral

O sistema implementa **6 camadas de proteção** contra spam:

1. **Rota Proxy Obrigatória** - Elimina bypass direto ao webhook
2. **Rate Limiting** - Limite de requisições por IP e email
3. **Honeypot** - Campo oculto que detecta bots
4. **Validação de Tempo** - Detecta preenchimento muito rápido ou muito lento
5. **Validação de Conteúdo** - Detecta padrões suspeitos (spam keywords, links excessivos, etc.)
6. **Validação de Headers** - Verifica User-Agent, Referer e Origin

## 🔧 Configuração

### ⚠️ IMPORTANTE: Por que configurar variáveis de ambiente?

**NÃO é seguro usar sem configurar o `.env`** porque:

1. **URLs expostas no código**: Se as URLs estiverem hardcoded no código, qualquer pessoa com acesso ao código (GitHub, repositório, etc.) pode descobrir as URLs dos webhooks
2. **Bypass de proteções**: Spammers podem enviar diretamente para os webhooks, contornando todas as proteções anti-spam
3. **Segurança comprometida**: URLs públicas permitem ataques diretos aos webhooks

**Solução**: Configure sempre as variáveis de ambiente para manter as URLs secretas.

### Ambiente Local

1. **Criar arquivo `.env`** na raiz do projeto:
   ```bash
   # Criar arquivo .env manualmente
   touch .env
   ```

2. **Configurar variáveis de ambiente** no `.env` (OBRIGATÓRIO):
   ```env
   NODE_ENV=development
   PORT=5000
   WEBHOOK_CONTATO_URL=https://criadordigital-n8n-webhook.easypanel.codigo5.com.br/webhook/contact-form-titanium-implantes
   WEBHOOK_DENUNCIA_URL=https://criadordigital-n8n-webhook.easypanel.codigo5.com.br/webhook/canal-denuncia
   ```

3. **Iniciar o servidor**:
   ```bash
   npm run dev
   ```

**Nota**: Em desenvolvimento, se as variáveis não estiverem configuradas, o servidor retornará erro 500. Configure sempre o `.env`.

### Ambiente Remoto (EasyPanel/Produção)

1. **Acessar painel do EasyPanel**

2. **Configurar variáveis de ambiente** no projeto:
   - `NODE_ENV=production`
   - `PORT=5000` (ou porta configurada pelo EasyPanel)
   - `WEBHOOK_CONTATO_URL=<sua-url-do-webhook-contato>`
   - `WEBHOOK_DENUNCIA_URL=<sua-url-do-webhook-denuncia>`

3. **Fazer deploy** - O sistema aplicará automaticamente todas as proteções

## 🛡️ Como Funciona

### Fluxo de Proteção

```
Frontend (Formulário)
  ↓
POST /api/webhook/contato ou /api/webhook/denuncia
  ↓
[1] Rate Limiter (por IP e email)
  ↓
[2] Spam Protection (honeypot, tempo, headers)
  ↓
[3] Content Validator (conteúdo suspeito)
  ↓
[4] Proxy para Webhook Externo (n8n)
```

### Rate Limiting

- **Por IP**: 1 requisição por minuto
- **Por Email**: 3 requisições por hora
- **Armazenamento**: Em memória (limpeza automática a cada 5 minutos)

### Validações Aplicadas

#### Honeypot
- Campo oculto "website" no formulário
- Se preenchido = bot/spammer → rejeição silenciosa

#### Tempo de Preenchimento
- **Mínimo**: 3 segundos (anti-bot)
- **Máximo**: 30 minutos (prevenir preenchimento suspeito)

#### Conteúdo
- Palavras-chave de spam detectadas
- Mais de 3 links na mensagem
- Mais de 50% do texto em CAPS LOCK
- Caracteres repetidos excessivos (>5 seguidos)
- Emails suspeitos (domínios temporários)

#### Headers HTTP
- User-Agent deve estar presente
- Referer e Origin validados (em produção)

## 📝 Formulários Protegidos

### 1. Formulário de Contato

**Rota**: `POST /api/webhook/contato`

**Campos**:
- nome
- email
- telefone
- mensagem
- website (honeypot - oculto)
- _formStartTime (timestamp - automático)

**Webhook Externo**: Configurado em `WEBHOOK_CONTATO_URL`

### 2. Formulário de Denúncia

**Rota**: `POST /api/webhook/denuncia`

**Campos**:
- anonimo
- nome (se não anônimo)
- email (se não anônimo)
- urgencia
- tipo_denuncia
- data_ocorrencia
- local_ocorrencia
- pessoas_envolvidas
- descricao_detalhada
- evidencias
- termos_aceitos
- website (honeypot - oculto)
- _formStartTime (timestamp - automático)

**Webhook Externo**: Configurado em `WEBHOOK_DENUNCIA_URL`

## 🔍 Monitoramento e Logs

O sistema registra logs detalhados no console do servidor:

```
[SPAM PROTECTION] Honeypot detectado, rejeitando silenciosamente
[SPAM PROTECTION] Submissão muito rápida: 0.5s
[CONTENT VALIDATOR] Muitos links detectados: 5
[ROUTES] ✅ Rota /api/webhook/contato CHAMADA!
```

### Verificar Logs

**Local**:
```bash
npm run dev
# Logs aparecem no terminal
```

**Remoto (EasyPanel)**:
- Acessar logs do container no painel do EasyPanel
- Verificar logs em tempo real

## ⚙️ Configurações Avançadas

### Ajustar Rate Limiting

Edite `server/middleware/rateLimiter.ts`:

```typescript
// Por IP: 1 req/min
rateLimiter.ipRateLimit = rateLimiter.createMiddleware(60000, 1, "ip");

// Por email: 3 req/hora
rateLimiter.emailRateLimit = rateLimiter.createMiddleware(3600000, 3, "email");
```

### Ajustar Validações

Edite `server/middleware/spamProtection.ts`:

```typescript
const config = {
  minTimeSeconds: 3,      // Tempo mínimo
  maxTimeMinutes: 30,     // Tempo máximo
  requireUserAgent: true,  // Exigir User-Agent
  requireReferer: false,   // Exigir Referer
};
```

### Ajustar Validação de Conteúdo

Edite `server/middleware/contentValidator.ts`:

```typescript
const config = {
  maxLinks: 3,                    // Máximo de links
  maxCapsPercentage: 50,          // Máximo de CAPS (%)
  maxRepeatedChars: 5,            // Máximo de caracteres repetidos
  spamKeywords: [...],            // Lista de palavras-chave
  suspiciousEmailDomains: [...],  // Domínios suspeitos
};
```

## 🧪 Testes

### Testar Rate Limiting

```bash
# Enviar múltiplas requisições rapidamente
for i in {1..5}; do
  curl -X POST http://localhost:5000/api/webhook/contato \
    -H "Content-Type: application/json" \
    -d '{"nome":"Teste","email":"teste@teste.com","telefone":"(11) 99999-9999","mensagem":"Teste","_formStartTime":'$(date +%s000)'}'
  sleep 1
done
```

### Testar Honeypot

Enviar requisição com campo `website` preenchido:

```bash
curl -X POST http://localhost:5000/api/webhook/contato \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"teste@teste.com","telefone":"(11) 99999-9999","mensagem":"Teste","website":"preenchido","_formStartTime":'$(date +%s000)'}'
```

Deve retornar `200 OK` silenciosamente (sem processar).

### Testar Tempo Mínimo

Enviar requisição com tempo muito curto:

```bash
curl -X POST http://localhost:5000/api/webhook/contato \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","email":"teste@teste.com","telefone":"(11) 99999-9999","mensagem":"Teste","_formStartTime":'$(($(date +%s) - 1))000'}'
```

Deve retornar erro `400 Bad Request`.

## 🚨 Troubleshooting

### Formulário não envia

1. **Verificar variáveis de ambiente**:
   ```bash
   echo $WEBHOOK_CONTATO_URL
   echo $WEBHOOK_DENUNCIA_URL
   ```

2. **Verificar logs do servidor** para erros

3. **Verificar se webhooks externos estão ativos** (n8n)

### Rate limiting muito restritivo

- Ajustar limites em `server/middleware/rateLimiter.ts`
- Verificar se não há múltiplas instâncias do servidor (cada uma tem seu próprio cache)

### Falsos positivos (usuários legítimos bloqueados)

1. **Verificar logs** para identificar qual validação está bloqueando
2. **Ajustar configurações** nos middlewares conforme necessário
3. **Considerar whitelist** de IPs ou emails (implementação futura)

## 📊 Métricas Esperadas

- **Redução de spam**: >90%
- **Taxa de falsos positivos**: <1%
- **Tempo de resposta**: <200ms (com todas as proteções)
- **Zero bypass direto**: Webhooks não podem ser acessados diretamente

## 🔐 Segurança

### URLs dos Webhooks

- **NUNCA** exponha as URLs dos webhooks no código frontend
- **SEMPRE** use as rotas proxy (`/api/webhook/*`)
- **MANTENHA** as URLs secretas nas variáveis de ambiente

### Em Produção

- Configure `NODE_ENV=production`
- Validações mais estritas são aplicadas automaticamente
- Logs detalhados ajudam a identificar tentativas de spam

## 🔍 Verificação Humana - Fluxo Detalhado

### Como Funciona

Quando o rate limit é atingido, o sistema oferece uma verificação humana simples:

1. **Usuário envia formulário** → Rate limit excedido
2. **Backend retorna 429** com flag `humanChallenge: true`
3. **Frontend detecta flag** e mostra dialog amigável
4. **Usuário clica "Confirmar que sou humano"**
5. **Frontend solicita verificação** → `POST /api/verify-human`
6. **Backend gera token temporário** (válido por 5 minutos)
7. **Frontend reenvia formulário** com token
8. **Backend valida token** e permite envio (bypass rate limit)
9. **Formulário é enviado com sucesso**

### Como Auditar Tokens de Verificação

**Logs a procurar:**
```
[ROUTES] ✅ Rota /api/verify-human CHAMADA!
[DEBUG] Token de verificação gerado: human_1234567890_abc123
[DEBUG] ✅ Verificação humana válida, permitindo envio
```

**Informações úteis:**
- Token gerado: `human_<timestamp>_<random>`
- IP do usuário (nos logs)
- Timestamp de geração
- Se token foi usado (marcado como `used: true`)

### Como Verificar se Bypass Está Funcionando

**Logs esperados após verificação:**
```
[DEBUG] ✅ Verificação humana válida, permitindo envio
[DEBUG] Enviando para webhook externo: https://...
[DEBUG] ✅ Sucesso - retornando 200
```

**Se bypass não funciona:**
- Verificar se token é válido (não expirado, não usado)
- Verificar se IP do token corresponde ao IP da requisição
- Verificar lógica em `server/middleware/rateLimiter.ts`

### Troubleshooting Específico

**Problema: Token inválido ou expirado**
- Tokens expiram em 5 minutos
- Tokens são de uso único
- Verificar se token não foi usado antes

**Problema: Muitas verificações solicitadas**
- Limite: 3 verificações ativas por IP por hora
- Se excedido, retorna 429 com mensagem amigável

## 🔍 Código de Acompanhamento - Verificação

### Como Funciona

O código de acompanhamento é gerado **no backend** antes de enviar ao webhook:

1. **Backend recebe requisição** de denúncia
2. **Backend gera código** no formato `DEN-XXXXXX-XXXX`
3. **Backend adiciona código** ao payload como `codigo_denuncia`
4. **Backend envia** para webhook externo (n8n)
5. **Backend retorna código** na resposta para frontend
6. **Frontend exibe código** na tela de confirmação

### Como Verificar se Código Foi Gerado

**Logs esperados:**
```
[DEBUG] Código de acompanhamento gerado: DEN-123456-ABCD
```

**Se código não aparece:**
- Verificar se geração está em `server/routes.ts` linha ~254
- Verificar se código está sendo adicionado ao payload
- Verificar se código está sendo retornado na resposta

### Como Verificar se Código Foi Enviado ao Webhook

**Verificar payload no log:**
```
[DEBUG] Enviando para webhook externo: https://...
```

**Payload deve conter:**
```json
{
  "...": "...",
  "codigo_denuncia": "DEN-123456-ABCD"
}
```

**Verificar webhook n8n:**
1. Acessar workflow do webhook
2. Verificar dados recebidos
3. Verificar se campo `codigo_denuncia` está presente
4. Verificar se email foi enviado com código

### Troubleshooting Específico

**Problema: Código não aparece na tela**
- Verificar se código está na resposta do backend
- Verificar se frontend está lendo `responseData.codigo_denuncia`
- Verificar se `setReportCode(code)` está sendo chamado

**Problema: Código não é enviado ao webhook**
- Verificar se código está sendo adicionado ao payload
- Verificar se campo está com nome correto: `codigo_denuncia`
- Verificar logs do webhook n8n para confirmar recebimento

## 📚 Referências

- [Auditoria de Formulários](./AUDITORIA-FORMULARIOS.md) - Guia completo de auditoria
- [Guia de Debug](./GUIA-DEBUG-FORMULARIOS.md) - Checklist de diagnóstico
- [Blueprint](./blueprint.md) - Comandos e operações
- [Deploy](./DEPLOY.md) - Guia de deploy
- [PRD Técnico](./prd-tecnico.md) - Requisitos técnicos
