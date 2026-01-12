# Guia de Debug - Formulários

Este guia fornece um checklist passo a passo para diagnosticar e resolver problemas com os formulários.

## ✅ Checklist Rápido de Diagnóstico

### 1. Verificar Configuração

- [ ] Variáveis de ambiente configuradas (`.env` local ou EasyPanel remoto)
- [ ] `WEBHOOK_CONTATO_URL` configurada e válida
- [ ] `WEBHOOK_DENUNCIA_URL` configurada e válida
- [ ] `NODE_ENV` configurado (`development` ou `production`)
- [ ] Servidor reiniciado após mudanças nas variáveis de ambiente
- [ ] `dotenv` instalado e configurado em `server/index.ts`

**Como verificar:**
```bash
# Local
cat .env

# Verificar se servidor carregou
# Procurar nos logs: [DEBUG] Enviando para webhook externo: https://...
```

### 2. Verificar Servidor

- [ ] Servidor está rodando (`npm run dev` ou `npm start`)
- [ ] Nenhum erro ao iniciar
- [ ] Porta 5000 (ou configurada) está acessível
- [ ] Logs aparecem no console

**Como verificar:**
```bash
# Iniciar servidor
npm run dev

# Deve aparecer:
# [SERVER] Iniciando registro de rotas...
# [ROUTES] Registrando rotas da API...
# serving on port 5000
```

### 3. Verificar Formulário no Frontend

- [ ] Formulário carrega corretamente no navegador
- [ ] Campos aparecem e são editáveis
- [ ] Validação funciona (mensagens de erro aparecem)
- [ ] Botão de enviar está habilitado quando formulário válido

**Como verificar:**
1. Abrir site no navegador
2. Ir para página de contato ou denúncia
3. Tentar enviar formulário vazio (deve mostrar erros)
4. Preencher formulário (deve habilitar botão)

### 4. Verificar Envio

- [ ] Formulário envia sem erros
- [ ] Mensagem de sucesso aparece
- [ ] Código de acompanhamento aparece (denúncia)
- [ ] Logs do servidor mostram requisição recebida

**Como verificar:**
1. Preencher e enviar formulário
2. Verificar console do navegador (F12 → Console)
3. Verificar logs do servidor
4. Verificar se mensagem de sucesso aparece

## 🔍 Verificação Detalhada por Camada

### Camada 1: Frontend

**O que verificar:**
- Formulário renderiza corretamente
- Validação funciona
- Dados são coletados corretamente
- Requisição é enviada para URL correta

**Como verificar:**
1. Abrir DevTools (F12)
2. Ir em Network
3. Preencher e enviar formulário
4. Verificar requisição POST para `/api/webhook/contato` ou `/api/webhook/denuncia`
5. Verificar payload enviado (Request Payload)

**Exemplo de payload esperado (Contato):**
```json
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "telefone": "(65) 99999-9999",
  "mensagem": "Mensagem de teste",
  "origem": "form_contato_titanium_home",
  "website": "",
  "_formStartTime": 1234567890
}
```

**Exemplo de payload esperado (Denúncia):**
```json
{
  "anonimo": false,
  "nome": "João Silva",
  "email": "joao@example.com",
  "urgencia": "Media",
  "tipo_denuncia": "Fraude",
  "data_ocorrencia": "2024-01-15",
  "local_ocorrencia": "Escritório",
  "descricao_detalhada": "Descrição detalhada...",
  "termos_aceitos": true,
  "origem": "form_denuncia_titanium",
  "website": "",
  "_formStartTime": 1234567890
}
```

### Camada 2: Backend - Rate Limiting

**O que verificar:**
- Rate limit não está bloqueando requisições legítimas
- Verificação humana funciona quando rate limit é atingido

**Como verificar:**
1. Enviar 6 formulários rapidamente (em menos de 1 minuto)
2. 6º deve retornar 429
3. Dialog de verificação deve aparecer
4. Após confirmar, 7º deve ser enviado com sucesso

**Logs esperados:**
```
[MIDDLEWARE] Resposta enviada: POST /api/webhook/contato 429
[ROUTES] ✅ Rota /api/verify-human CHAMADA!
[DEBUG] ✅ Verificação humana válida, permitindo envio
```

### Camada 3: Backend - Spam Protection

**O que verificar:**
- Honeypot está funcionando (campo `website` deve estar vazio)
- Tempo de preenchimento está dentro dos limites (3s - 30min)
- Headers HTTP estão presentes

**Como verificar:**
- Verificar logs para mensagens de spam protection
- Se bloqueado, verificar qual validação falhou

**Logs esperados (se bloqueado):**
```
[SPAM PROTECTION] Honeypot detectado, rejeitando silenciosamente
[SPAM PROTECTION] Submissão muito rápida: 0.5s
```

### Camada 4: Backend - Content Validator

**O que verificar:**
- Conteúdo não contém spam keywords
- Não há muitos links (>3)
- Não há CAPS LOCK excessivo (>50%)

**Como verificar:**
- Verificar logs para mensagens de content validator
- Se bloqueado, verificar qual padrão foi detectado

**Logs esperados (se bloqueado):**
```
[CONTENT VALIDATOR] Muitos links detectados: 5
[CONTENT VALIDATOR] CAPS LOCK excessivo detectado: 75%
```

### Camada 5: Backend - Webhook Externo

**O que verificar:**
- Webhook URL está configurada
- Webhook externo (n8n) está ativo
- Payload está sendo enviado corretamente
- Código de acompanhamento está no payload (denúncia)

**Como verificar:**
1. Verificar logs do backend:
   ```
   [DEBUG] Enviando para webhook externo: https://...
   [DEBUG] Resposta do webhook: { status: 200, ok: true }
   ```

2. Verificar webhook n8n:
   - Acessar workflow do webhook
   - Verificar dados recebidos
   - Verificar se email foi enviado

**Payload enviado ao webhook (Denúncia):**
```json
{
  "anonimo": false,
  "nome": "João Silva",
  "email": "joao@example.com",
  "urgencia": "Media",
  "tipo_denuncia": "Fraude",
  "data_ocorrencia": "2024-01-15",
  "local_ocorrencia": "Escritório",
  "descricao_detalhada": "Descrição...",
  "termos_aceitos": true,
  "origem": "form_denuncia_titanium",
  "codigo_denuncia": "DEN-123456-ABCD"  // ← Código gerado no backend
}
```

## 🧪 Testes Específicos

### Teste 1: Formulário de Contato

**Passos:**
1. Acessar página de contato
2. Preencher todos os campos
3. Enviar formulário
4. Verificar mensagem de sucesso

**Logs esperados:**
```
[ROUTES] ✅ Rota /api/webhook/contato CHAMADA!
[DEBUG] Enviando para webhook externo: https://...
[DEBUG] Resposta do webhook: { status: 200, ok: true }
[DEBUG] ✅ Sucesso - retornando 200
```

**Verificar:**
- [ ] Requisição aparece no Network (DevTools)
- [ ] Status 200 na resposta
- [ ] Mensagem de sucesso aparece
- [ ] Email foi enviado (verificar n8n)

### Teste 2: Formulário de Denúncia com Código

**Passos:**
1. Acessar página de denúncia
2. Preencher todos os campos obrigatórios
3. Enviar formulário
4. Verificar código de acompanhamento

**Logs esperados:**
```
[ROUTES] ✅ Rota /api/webhook/denuncia CHAMADA!
[DEBUG] Código de acompanhamento gerado: DEN-123456-ABCD
[DEBUG] Enviando para webhook externo: https://...
[DEBUG] Resposta do webhook: { status: 200, ok: true }
[DEBUG] ✅ Sucesso - retornando 200
```

**Verificar:**
- [ ] Código foi gerado no backend (log)
- [ ] Código está no payload enviado ao webhook
- [ ] Código está na resposta ao frontend
- [ ] Código aparece na tela de confirmação
- [ ] Código foi recebido pelo webhook n8n
- [ ] Email foi enviado com código

### Teste 3: Rate Limit e Verificação Humana

**Passos:**
1. Enviar 6 formulários rapidamente (em menos de 1 minuto)
2. 6º deve retornar 429
3. Dialog de verificação deve aparecer
4. Clicar em "Confirmar que sou humano"
5. Formulário deve ser enviado com sucesso

**Logs esperados:**
```
# 6º envio - Rate limit
[MIDDLEWARE] Resposta enviada: POST /api/webhook/contato 429

# Verificação humana
[ROUTES] ✅ Rota /api/verify-human CHAMADA!
[DEBUG] Token de verificação gerado: human_...

# 7º envio - Com verificação
[DEBUG] ✅ Verificação humana válida, permitindo envio
[DEBUG] ✅ Sucesso - retornando 200
```

**Verificar:**
- [ ] 6º retorna 429
- [ ] Dialog aparece com mensagem amigável
- [ ] Token é gerado
- [ ] 7º é enviado com sucesso após verificação

## 📋 Comandos Úteis

### Ver Logs em Tempo Real

```bash
# Local
npm run dev

# Logs aparecem no terminal em tempo real
```

### Filtrar Logs Específicos

```bash
# Ver apenas rotas chamadas
npm run dev | grep "\[ROUTES\]"

# Ver apenas erros
npm run dev | grep "\[ERROR\]"

# Ver apenas códigos gerados
npm run dev | grep "Código de acompanhamento gerado"

# Ver apenas rate limits
npm run dev | grep "429"

# Ver apenas verificações humanas
npm run dev | grep "verify-human"
```

### Verificar Variáveis de Ambiente

```bash
# Local - Ver arquivo .env
cat .env

# Verificar se estão carregadas no processo
# (adicionar log temporário no código)
```

### Testar Endpoint Manualmente

```bash
# Testar endpoint de contato
curl -X POST http://localhost:5000/api/webhook/contato \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Teste",
    "email": "teste@teste.com",
    "telefone": "(65) 99999-9999",
    "mensagem": "Teste",
    "origem": "form_contato_titanium_home",
    "website": "",
    "_formStartTime": 1234567890
  }'

# Testar endpoint de denúncia
curl -X POST http://localhost:5000/api/webhook/denuncia \
  -H "Content-Type: application/json" \
  -d '{
    "anonimo": false,
    "nome": "Teste",
    "email": "teste@teste.com",
    "urgencia": "Media",
    "tipo_denuncia": "Fraude",
    "data_ocorrencia": "2024-01-15",
    "local_ocorrencia": "Teste",
    "descricao_detalhada": "Descrição detalhada do teste",
    "termos_aceitos": true,
    "origem": "form_denuncia_titanium",
    "website": "",
    "_formStartTime": 1234567890
  }'
```

## 🔍 Exemplos de Logs

### Log Normal (Sucesso - Contato)

```
[MIDDLEWARE] Requisição recebida: POST /api/webhook/contato
[ROUTES] ✅ Rota /api/webhook/contato CHAMADA! {
  method: 'POST',
  path: '/webhook/contato',
  body: {
    nome: 'João Silva',
    email: 'joao@example.com',
    telefone: '(65) 99999-9999',
    mensagem: 'Mensagem de teste',
    origem: 'form_contato_titanium_home',
    website: '',
    _formStartTime: 1234567890
  }
}
[DEBUG] Enviando para webhook externo: https://criadordigital-n8n-webhook.easypanel.codigo5.com.br/webhook/contact-form-titanium-implantes
[DEBUG] Resposta do webhook: { status: 200, statusText: 'OK', ok: true }
[DEBUG] ✅ Sucesso - retornando 200
[MIDDLEWARE] Resposta enviada: POST /api/webhook/contato 200 1309ms
```

### Log Normal (Sucesso - Denúncia com Código)

```
[MIDDLEWARE] Requisição recebida: POST /api/webhook/denuncia
[ROUTES] ✅ Rota /api/webhook/denuncia CHAMADA!
[DEBUG] Código de acompanhamento gerado: DEN-123456-ABCD
[DEBUG] Enviando para webhook externo: https://criadordigital-n8n-webhook.easypanel.codigo5.com.br/webhook/canal-denuncia
[DEBUG] Resposta do webhook: { status: 200, statusText: 'OK', ok: true }
[DEBUG] ✅ Sucesso - retornando 200
[MIDDLEWARE] Resposta enviada: POST /api/webhook/denuncia 200 1456ms
```

### Log com Rate Limit

```
[MIDDLEWARE] Requisição recebida: POST /api/webhook/contato
[ROUTES] ✅ Rota /api/webhook/contato CHAMADA!
[MIDDLEWARE] Resposta enviada: POST /api/webhook/contato 429 1ms
[express] POST /api/webhook/contato 429 in 1ms :: {"error":"Limite de envios atingido","humanChallenge":true,"retryAfter":45}
```

### Log com Erro de Webhook

```
[DEBUG] Enviando para webhook externo: https://...
[DEBUG] Resposta do webhook: { status: 500, statusText: 'Internal Server Error', ok: false }
[DEBUG] Erro no proxy de contato: Error: ...
```

### Log com Verificação Humana

```
[MIDDLEWARE] Requisição recebida: POST /api/verify-human
[ROUTES] ✅ Rota /api/verify-human CHAMADA!
[DEBUG] Token de verificação gerado: human_1234567890_abc123
[MIDDLEWARE] Requisição recebida: POST /api/webhook/contato
[ROUTES] ✅ Rota /api/webhook/contato CHAMADA!
[DEBUG] ✅ Verificação humana válida, permitindo envio
[DEBUG] Enviando para webhook externo: https://...
[DEBUG] ✅ Sucesso - retornando 200
```

## 🐛 Troubleshooting Específico

### Problema: "Código de acompanhamento não aparece"

**Diagnóstico:**
1. Verificar se código foi gerado no backend:
   - Procurar por `[DEBUG] Código de acompanhamento gerado:` nos logs
   - Se não aparecer, código não está sendo gerado

2. Verificar se código está no payload:
   - Verificar log `[DEBUG] Enviando para webhook externo`
   - Payload deve conter `codigo_denuncia`

3. Verificar se código está na resposta:
   - Verificar resposta do backend
   - Deve conter `codigo_denuncia` no JSON

4. Verificar se frontend está recebendo:
   - Abrir DevTools → Network
   - Verificar resposta da requisição
   - Deve conter `codigo_denuncia`

**Solução:**
- Se código não é gerado: Verificar código em `server/routes.ts` linha ~254
- Se código não está no payload: Verificar se está sendo adicionado antes de enviar
- Se código não está na resposta: Verificar se está sendo retornado na resposta JSON
- Se frontend não recebe: Verificar se está lendo da resposta corretamente

### Problema: "Formulário retorna 429 mas dialog não aparece"

**Diagnóstico:**
1. Verificar se resposta contém `humanChallenge: true`
2. Verificar se frontend está detectando 429
3. Verificar se dialog está sendo renderizado

**Solução:**
- Verificar código em `ContatoSection.tsx` ou `CanalDenunciaFormSection.tsx`
- Verificar se `errorData.humanChallenge` está sendo verificado
- Verificar se `setShowHumanChallenge(true)` está sendo chamado

### Problema: "Webhook não recebe código_denuncia"

**Diagnóstico:**
1. Verificar logs do backend:
   - Código deve ser gerado
   - Código deve estar no payload enviado

2. Verificar webhook n8n:
   - Verificar dados recebidos
   - Verificar se campo `codigo_denuncia` está presente

**Solução:**
- Verificar se código está sendo adicionado ao payload em `server/routes.ts`
- Verificar se campo está com nome correto: `codigo_denuncia` (não `codigo_acompanhamento`)

## 📚 Documentação Relacionada

- [Auditoria de Formulários](./AUDITORIA-FORMULARIOS.md) - Guia completo de auditoria
- [Proteção Anti-Spam](./PROTECAO-ANTI-SPAM.md) - Detalhes sobre proteções
- [Configuração de Ambiente](./CONFIGURACAO-AMBIENTE.md) - Como configurar
- [Deploy](./DEPLOY.md) - Como fazer deploy
