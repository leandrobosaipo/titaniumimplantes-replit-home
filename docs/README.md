# Documentação do Projeto Titanium Implantes

Esta pasta contém a documentação técnica e de manutenção do projeto.

## Documentos Disponíveis

- **[Blueprint](./blueprint.md)**: Guia completo de comandos e operações - como iniciar, reiniciar, abrir o projeto, comandos úteis e solução de problemas.
- **[PRD Técnico](./prd-tecnico.md)**: Documento de requisitos técnicos detalhado, incluindo arquitetura atual, objetivos de evolução, requisitos funcionais e não funcionais, modelo de dados proposto e plano de implementação.
- **[Proteção Anti-Spam](./PROTECAO-ANTI-SPAM.md)**: Guia completo de configuração e uso do sistema de proteção anti-spam dos formulários.
- **[Auditoria de Formulários](./AUDITORIA-FORMULARIOS.md)**: Guia completo de auditoria, monitoramento e verificação de problemas com formulários.
- **[Guia de Debug](./GUIA-DEBUG-FORMULARIOS.md)**: Checklist passo a passo para diagnosticar e resolver problemas com formulários.
- **[Configuração de Ambiente](./CONFIGURACAO-AMBIENTE.md)**: Guia rápido de configuração para ambiente local e remoto.
- **[Deploy](./DEPLOY.md)**: Guia de deploy com Docker e EasyPanel.

## Estrutura do Projeto

```
titaniumimplantes-replit-home/
├── client/          # Frontend React + Vite
├── server/          # Backend Express
├── shared/          # Schemas e tipos compartilhados
├── docs/            # Documentação (esta pasta)
└── attached_assets/ # Imagens e assets estáticos
```

## Guias Rápidos

### Executar Localmente

1. Instalar dependências: `npm install`
2. Configurar variáveis de ambiente:
   - Criar arquivo `.env` na raiz do projeto: `touch .env`
   - Adicionar variáveis (veja seção "Configuração de Variáveis de Ambiente" abaixo)
3. Executar servidor de desenvolvimento: `npm run dev`
4. Acessar: `http://localhost:5000`

### Build para Produção

1. Executar: `npm run build`
2. Iniciar servidor: `npm start`

### Verificar Tipos TypeScript

```bash
npm run check
```

### Configuração de Variáveis de Ambiente

⚠️ **IMPORTANTE**: As variáveis de ambiente são **OBRIGATÓRIAS** para segurança.

**Por que é obrigatório?**
- URLs dos webhooks devem ser mantidas secretas
- Sem configuração, o servidor retornará erro 500
- URLs hardcoded no código são inseguras (qualquer pessoa pode ver)
- Spammers podem descobrir URLs e enviar diretamente, bypassando proteções

O projeto usa variáveis de ambiente para configuração. Crie um arquivo `.env` na raiz do projeto:

**Criar arquivo `.env`:**
```bash
# Na raiz do projeto
touch .env
```

**Conteúdo do arquivo `.env` (copie e ajuste):**
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

**Variáveis Obrigatórias:**
- `NODE_ENV`: Ambiente (`development` ou `production`)
- `WEBHOOK_CONTATO_URL`: URL do webhook de contato (n8n)
- `WEBHOOK_DENUNCIA_URL`: URL do webhook de denúncia (n8n)

**Variáveis Opcionais:**
- `PORT`: Porta do servidor (padrão: 5000)
- `DATABASE_URL`: URL do banco de dados (se necessário)

**⚠️ IMPORTANTE**: 
- O arquivo `.env` está no `.gitignore` e não será commitado
- Mantenha as URLs dos webhooks secretas
- As URLs são usadas apenas no backend
- O frontend usa rotas proxy (`/api/webhook/contato` e `/api/webhook/denuncia`) que aplicam proteções anti-spam

**Para ambiente remoto (EasyPanel)**: Configure as mesmas variáveis no painel do EasyPanel (veja [Deploy](./DEPLOY.md)).

## Proteção Anti-Spam

O projeto implementa múltiplas camadas de proteção contra spam nos formulários:

### Proteções Implementadas

1. **Rate Limiting**: Limite de 1 requisição por minuto por IP e 3 requisições por hora por email
2. **Honeypot**: Campo oculto que detecta bots
3. **Validação de Tempo**: Tempo mínimo de 3 segundos e máximo de 30 minutos para preenchimento
4. **Validação de Conteúdo**: Detecta palavras-chave de spam, links excessivos, CAPS LOCK, etc.
5. **Validação de Headers**: Verifica User-Agent, Referer e Origin
6. **Rota Proxy**: Todos os formulários passam pelo backend (elimina bypass direto)

### Configuração

As proteções funcionam automaticamente sem configuração adicional. As URLs dos webhooks devem ser configuradas nas variáveis de ambiente:

- **Local**: Configure no arquivo `.env`
- **Remoto (EasyPanel)**: Configure nas variáveis de ambiente do painel

### Formulários Protegidos

- **Formulário de Contato**: `/api/webhook/contato`
- **Formulário de Denúncia**: `/api/webhook/denuncia`

Ambos os formulários passam por todas as camadas de proteção antes de enviar para os webhooks externos.

### Verificação Humana

Quando o rate limit é atingido, o sistema oferece uma verificação humana simples:
- Dialog amigável aparece automaticamente
- Usuário clica "Confirmar que sou humano"
- Sistema gera token temporário (válido por 5 minutos)
- Formulário é enviado após verificação

**Como funciona:** Veja detalhes em [Proteção Anti-Spam](./PROTECAO-ANTI-SPAM.md#verificação-humana---fluxo-detalhado)

### Código de Acompanhamento (Denúncia)

O formulário de denúncia gera automaticamente um código de acompanhamento:
- Formato: `DEN-XXXXXX-XXXX`
- Gerado no backend antes de enviar ao webhook
- Enviado ao webhook n8n como `codigo_denuncia`
- Exibido na tela de confirmação para o usuário

**Como verificar:** Veja [Auditoria de Formulários](./AUDITORIA-FORMULARIOS.md#verificação-de-código-de-acompanhamento)

## Próximos Passos

Consulte o [PRD Técnico](./prd-tecnico.md) para entender o plano de evolução do projeto e as próximas implementações planejadas.

