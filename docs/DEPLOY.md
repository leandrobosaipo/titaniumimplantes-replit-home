# Guia de Deploy - Titaniun Implantes

Este documento descreve o processo completo de deploy do projeto usando GitHub, Docker e EasyPanel.

## 📋 Pré-requisitos

- Conta no GitHub
- Repositório GitHub criado
- Conta no EasyPanel
- Docker instalado localmente (para testes)

## 🚀 Processo de Deploy

### 1. Commit e Push para GitHub

#### Primeira vez (se ainda não fez):

```bash
# Verificar status do git
git status

# Adicionar todos os arquivos (exceto os ignorados pelo .gitignore)
git add .

# Fazer commit
git commit -m "feat: adicionar configuração de deploy com Docker"

# Adicionar remote (se ainda não tiver)
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git

# Push para o repositório
git push -u origin main
```

#### Atualizações futuras:

```bash
# Verificar mudanças
git status

# Adicionar arquivos modificados
git add .

# Commit com mensagem descritiva
git commit -m "descrição das mudanças"

# Push para GitHub
git push origin main
```

### 2. Configuração no EasyPanel

#### Passo 1: Criar Novo Projeto

1. Acesse o painel do EasyPanel
2. Clique em "New Project" ou "Criar Projeto"
3. Escolha "GitHub" como fonte

#### Passo 2: Conectar Repositório GitHub

1. Selecione seu repositório da lista
2. Escolha a branch (geralmente `main` ou `master`)
3. Configure o método de build: **Dockerfile**

#### Passo 3: Configurar Build

- **Build Method**: Dockerfile
- **Dockerfile Path**: `Dockerfile` (raiz do projeto)
- **Context**: `.` (raiz do projeto)

#### Passo 4: Variáveis de Ambiente

Configure as seguintes variáveis de ambiente no EasyPanel:

| Variável | Valor | Obrigatório | Descrição |
|----------|-------|-------------|-----------|
| `NODE_ENV` | `production` | ✅ Sim | Ambiente de produção |
| `PORT` | `5000` | ❌ Não | Porta do servidor (padrão: 5000) |
| `WEBHOOK_CONTATO_URL` | `https://...` | ✅ Sim | URL do webhook de contato (n8n) |
| `WEBHOOK_DENUNCIA_URL` | `https://...` | ✅ Sim | URL do webhook de denúncia (n8n) |
| `DATABASE_URL` | `postgresql://...` | ❌ Não | URL do banco (se necessário no futuro) |

**Nota**: O EasyPanel geralmente configura a porta automaticamente. Se não configurar, use `5000`.

**Importante**: As URLs dos webhooks (`WEBHOOK_CONTATO_URL` e `WEBHOOK_DENUNCIA_URL`) devem ser mantidas secretas e configuradas apenas no backend. Nunca exponha essas URLs no código frontend.

#### Passo 5: Configurar Porta

- **Port**: `5000` (ou a porta configurada nas variáveis de ambiente)
- **Protocol**: HTTP/HTTPS (conforme configuração do EasyPanel)

#### Passo 6: Deploy

1. Clique em "Deploy" ou "Save"
2. O EasyPanel irá:
   - Clonar o repositório
   - Construir a imagem Docker usando o Dockerfile
   - Iniciar o container
   - Expor a aplicação na URL fornecida

### 3. Verificação Pós-Deploy

Após o deploy, verifique:

1. ✅ **Aplicação carrega**: Acesse a URL fornecida pelo EasyPanel
2. ✅ **Assets carregam**: Verifique se imagens, CSS e JS estão funcionando
3. ✅ **Console do navegador**: Verifique se não há erros 404 ou 500
4. ✅ **Logs**: Verifique os logs no EasyPanel para erros

## 📦 Como os Assets Funcionam

### Estrutura de Assets

O projeto possui dois tipos de assets:

1. **Assets Públicos** (`client/public/`):
   - `favicon.png`
   - `logo.png`
   - São copiados automaticamente pelo Vite durante o build
   - Acessíveis via `/favicon.png`, `/logo.png`

2. **Assets Importados** (`attached_assets/`):
   - Imagens importadas via alias `@assets`
   - Processadas e otimizadas pelo Vite durante o build
   - Incluídas no bundle ou copiadas para `dist/public/assets/`
   - Acessíveis via paths relativos gerados pelo Vite

### Processo de Build

Durante o build (`npm run build`):

1. **Vite processa o frontend**:
   - Compila React/TypeScript
   - Processa e otimiza imagens de `attached_assets/`
   - Gera CSS otimizado
   - Gera JS otimizado e code-split
   - Copia assets de `client/public/` para `dist/public/`
   - Tudo vai para `dist/public/`

2. **Esbuild compila o backend**:
   - Compila `server/index.ts` para `dist/index.js`
   - Bundle otimizado para produção

3. **Express serve tudo**:
   - Em produção, Express serve arquivos estáticos de `dist/public/`
   - Rotas SPA: qualquer rota não encontrada retorna `index.html`

### Verificação de Assets

Para verificar se os assets estão funcionando:

```bash
# Build local para teste
npm run build

# Verificar estrutura gerada
ls -la dist/public/
# Deve conter:
# - index.html
# - assets/ (JS, CSS, imagens processadas)
# - favicon.png
# - logo.png
```

## 🐳 Testando Docker Localmente

Antes de fazer deploy, teste o Docker localmente:

```bash
# Construir a imagem
docker build -t titanium-implantes .

# Executar o container
docker run -p 5000:5000 -e NODE_ENV=production titanium-implantes

# Acessar em http://localhost:5000
```

### Verificar se Assets Funcionam no Container

```bash
# Entrar no container
docker exec -it <container-id> sh

# Verificar estrutura
ls -la dist/
ls -la dist/public/

# Verificar se assets estão presentes
ls -la dist/public/assets/
```

## 🔧 Troubleshooting

### Problema: Assets não carregam (404)

**Solução**:
1. Verifique se `attached_assets/` está sendo copiado no Dockerfile
2. Verifique se o build do Vite está gerando os assets corretamente
3. Verifique os logs do container no EasyPanel
4. Verifique se o Express está servindo de `dist/public/` corretamente

### Problema: Erro ao fazer build

**Solução**:
1. Verifique se todas as dependências estão no `package.json`
2. Verifique se o Node.js versão 20 está sendo usado
3. Verifique os logs de build no EasyPanel

### Problema: Porta não funciona

**Solução**:
1. Verifique se a variável `PORT` está configurada corretamente
2. Verifique se o EasyPanel está mapeando a porta corretamente
3. Verifique se o container está escutando em `0.0.0.0` (não `localhost`)

### Problema: Aplicação não inicia

**Solução**:
1. Verifique os logs do container no EasyPanel
2. Verifique se `dist/index.js` existe após o build
3. Verifique se `dist/public/` existe após o build
4. Verifique se `NODE_ENV=production` está configurado

## 📝 Checklist de Deploy

Antes de fazer deploy, certifique-se de:

- [ ] Código commitado e pushado para GitHub
- [ ] Dockerfile criado e testado localmente
- [ ] `.dockerignore` configurado
- [ ] `.gitignore` atualizado
- [ ] Build local funciona (`npm run build`)
- [ ] Docker build funciona localmente
- [ ] Variáveis de ambiente configuradas no EasyPanel:
  - [ ] `NODE_ENV=production`
  - [ ] `WEBHOOK_CONTATO_URL` (URL do webhook de contato)
  - [ ] `WEBHOOK_DENUNCIA_URL` (URL do webhook de denúncia)
  - [ ] `PORT` (se necessário)
- [ ] `dotenv` instalado (já incluído nas dependências)
- [ ] Servidor carrega variáveis do `.env` automaticamente (configurado em `server/index.ts`)
- [ ] Porta configurada corretamente
- [ ] Repositório conectado no EasyPanel
- [ ] Proteções anti-spam funcionando (testar formulários)

## 🔄 Deploy Automático

O EasyPanel geralmente configura deploy automático por padrão:

- **Trigger**: Push para branch `main` (ou branch configurada)
- **Ação**: Build e deploy automático
- **Notificação**: Email ou webhook (se configurado)

Para desabilitar deploy automático, configure no painel do EasyPanel.

## 📚 Recursos Adicionais

- [Documentação do EasyPanel](https://easypanel.io/docs)
- [Documentação do Docker](https://docs.docker.com/)
- [Documentação do Vite](https://vitejs.dev/)

## 🆘 Suporte

Em caso de problemas:

1. Verifique os logs no EasyPanel
2. Teste o build localmente
3. Verifique a documentação do EasyPanel
4. Entre em contato com o suporte do EasyPanel

