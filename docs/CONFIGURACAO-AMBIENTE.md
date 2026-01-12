# Configuração de Ambiente - Guia Rápido

Este guia explica como configurar o projeto para funcionar localmente e no ambiente remoto.

## ⚠️ IMPORTANTE: Por que configurar variáveis de ambiente?

**NÃO é seguro usar sem configurar o `.env`** porque:

1. **URLs expostas no código**: Se as URLs estiverem hardcoded, qualquer pessoa pode descobrir as URLs dos webhooks
2. **Bypass de proteções**: Spammers podem enviar diretamente para os webhooks, contornando todas as proteções
3. **Segurança comprometida**: URLs públicas permitem ataques diretos

**Solução**: Configure sempre as variáveis de ambiente para manter as URLs secretas.

## 🏠 Ambiente Local

### Passo 1: Criar arquivo `.env` (OBRIGATÓRIO)

Na raiz do projeto, crie um arquivo `.env`:

```bash
touch .env
```

### Passo 2: Configurar variáveis (OBRIGATÓRIO)

Adicione as seguintes variáveis no arquivo `.env`:

```env
# Ambiente
NODE_ENV=development
PORT=5000

# Webhooks (URLs dos webhooks externos - n8n)
# IMPORTANTE: Mantenha estas URLs secretas - não exponha no frontend
WEBHOOK_CONTATO_URL=https://criadordigital-n8n-webhook.easypanel.codigo5.com.br/webhook/contact-form-titanium-implantes
WEBHOOK_DENUNCIA_URL=https://criadordigital-n8n-webhook.easypanel.codigo5.com.br/webhook/canal-denuncia

# Banco de Dados (opcional - se usar banco no futuro)
# DATABASE_URL=postgresql://user:password@host:port/database
```

### Passo 3: Instalar dependências

```bash
npm install
```

**Nota**: O projeto usa `dotenv` para carregar variáveis do arquivo `.env` automaticamente. Certifique-se de que o arquivo `.env` está na raiz do projeto.

### Passo 4: Executar servidor

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:5000`

**Verificação**: Se as variáveis não estiverem sendo carregadas, verifique:
1. O arquivo `.env` está na raiz do projeto (mesmo nível que `package.json`)
2. Não há espaços antes ou depois do `=` nas variáveis
3. Não há aspas nas URLs (ex: `WEBHOOK_CONTATO_URL="url"` - remover aspas)

## 🌐 Ambiente Remoto (EasyPanel)

### Passo 1: Acessar painel do EasyPanel

1. Acesse o painel do EasyPanel
2. Selecione seu projeto

### Passo 2: Configurar variáveis de ambiente

No painel do EasyPanel, vá em **Environment Variables** e adicione:

| Variável | Valor | Obrigatório |
|----------|-------|-------------|
| `NODE_ENV` | `production` | ✅ Sim |
| `PORT` | `5000` | ❌ Não (padrão) |
| `WEBHOOK_CONTATO_URL` | `https://...` | ✅ Sim |
| `WEBHOOK_DENUNCIA_URL` | `https://...` | ✅ Sim |

**Exemplo de valores:**
```
NODE_ENV=production
WEBHOOK_CONTATO_URL=https://criadordigital-n8n-webhook.easypanel.codigo5.com.br/webhook/contact-form-titanium-implantes
WEBHOOK_DENUNCIA_URL=https://criadordigital-n8n-webhook.easypanel.codigo5.com.br/webhook/canal-denuncia
```

### Passo 3: Fazer deploy

O deploy será automático após push para o repositório GitHub (se configurado) ou manualmente pelo painel.

## ✅ Verificação

### Local

1. **Servidor inicia sem erros**:
   ```bash
   npm run dev
   # Deve mostrar: "serving on port 5000"
   ```

2. **Formulários funcionam**:
   - Acesse `http://localhost:5000`
   - Teste o formulário de contato
   - Verifique logs do servidor para confirmar que as proteções estão ativas

### Remoto

1. **Aplicação carrega**: Acesse a URL fornecida pelo EasyPanel
2. **Formulários funcionam**: Teste os formulários
3. **Logs**: Verifique os logs no EasyPanel para confirmar funcionamento

## 🔍 Troubleshooting

### Erro: "WEBHOOK_CONTATO_URL is not defined"

**Solução**: Configure a variável de ambiente no `.env` (local) ou no EasyPanel (remoto).

### Formulário não envia

1. Verifique se as variáveis de ambiente estão configuradas
2. Verifique os logs do servidor para erros
3. Verifique se os webhooks externos (n8n) estão ativos

### Rate limiting muito restritivo

- Ajuste os limites em `server/middleware/rateLimiter.ts` se necessário
- Em desenvolvimento, as validações são mais permissivas

## 📚 Documentação Relacionada

- [Proteção Anti-Spam](./PROTECAO-ANTI-SPAM.md) - Detalhes sobre as proteções
- [Deploy](./DEPLOY.md) - Guia completo de deploy
- [Blueprint](./blueprint.md) - Comandos e operações
