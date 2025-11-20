# Blueprint - Guia de Comandos e Operações

Este documento contém todos os comandos essenciais para trabalhar com o projeto Titanium Implantes.

## 📋 Índice

- [Iniciar o Projeto](#iniciar-o-projeto)
- [Reiniciar o Servidor](#reiniciar-o-servidor)
- [Abrir no Navegador](#abrir-no-navegador)
- [Comandos de Desenvolvimento](#comandos-de-desenvolvimento)
- [Comandos de Build](#comandos-de-build)
- [Comandos de Banco de Dados](#comandos-de-banco-de-dados)
- [Solução de Problemas](#solução-de-problemas)
- [Comandos Úteis](#comandos-úteis)

---

## 🚀 Iniciar o Projeto

### Primeira vez (instalar dependências)

```bash
npm install
```

### Iniciar servidor de desenvolvimento

```bash
npm run dev
```

**Porta padrão:** `5000` (ou `5001` se a 5000 estiver ocupada)

**O que acontece:**
- Compila o código TypeScript
- Inicia o servidor Express
- Ativa o Vite HMR (Hot Module Replacement)
- Abre automaticamente no navegador (se configurado)

### Iniciar em porta específica

```bash
PORT=5001 npm run dev
```

---

## 🔄 Reiniciar o Servidor

### Parar o servidor

No terminal onde o servidor está rodando, pressione:
```
Ctrl + C
```

### Reiniciar o servidor

```bash
npm run dev
```

### Reiniciar forçando (se houver problemas)

```bash
# 1. Matar processos na porta
lsof -ti:5000 | xargs kill -9
lsof -ti:5001 | xargs kill -9

# 2. Limpar cache (opcional)
rm -rf node_modules/.vite

# 3. Reiniciar
npm run dev
```

---

## 🌐 Abrir no Navegador

### Abrir manualmente

**Porta padrão (5000):**
```bash
open http://localhost:5000
```

**Porta alternativa (5001):**
```bash
open http://localhost:5001
```

### Abrir automaticamente após iniciar

O servidor já abre automaticamente, mas se não abrir:

```bash
npm run dev && open http://localhost:5000
```

---

## 💻 Comandos de Desenvolvimento

### Verificar tipos TypeScript

```bash
npm run check
```

**O que faz:** Valida todo o código TypeScript sem gerar arquivos.

### Verificar tipos e continuar

```bash
npm run check -- --watch
```

**O que faz:** Monitora mudanças e valida tipos continuamente.

### Limpar cache do Vite

```bash
rm -rf node_modules/.vite
rm -rf dist
```

---

## 🏗️ Comandos de Build

### Build para produção

```bash
npm run build
```

**O que faz:**
- Compila o frontend (Vite)
- Transpila o backend (esbuild)
- Gera arquivos em `dist/`

**Estrutura gerada:**
```
dist/
├── index.js          # Servidor compilado
└── public/           # Frontend compilado
    ├── index.html
    └── assets/
```

### Iniciar servidor de produção

```bash
npm start
```

**Requisitos:** Deve ter executado `npm run build` antes.

**Variáveis de ambiente necessárias:**
- `NODE_ENV=production` (definido automaticamente)
- `PORT` (opcional, padrão: 5000)

---

## 🗄️ Comandos de Banco de Dados

### Aplicar migrações (push schema)

```bash
npm run db:push
```

**Requisitos:**
- Variável `DATABASE_URL` configurada no `.env`
- Banco PostgreSQL acessível

**O que faz:** Sincroniza o schema do banco com as definições em `shared/schema.ts`.

### Verificar conexão com banco

```bash
# Verificar se DATABASE_URL está configurada
echo $DATABASE_URL

# Ou verificar no arquivo .env
cat .env | grep DATABASE_URL
```

---

## 🔧 Solução de Problemas

### Porta já em uso

**Problema:** `Error: listen EADDRINUSE: address already in use`

**Solução 1 - Usar outra porta:**
```bash
PORT=5001 npm run dev
```

**Solução 2 - Matar processo na porta:**
```bash
# Ver qual processo está usando
lsof -i:5000

# Matar processo específico
kill -9 <PID>

# Ou matar todos na porta
lsof -ti:5000 | xargs kill -9
```

**Solução 3 - Porta 5000 ocupada pelo AirPlay (macOS):**
```bash
# Desabilitar AirPlay Receiver temporariamente nas Configurações do Sistema
# Ou usar porta alternativa
PORT=5001 npm run dev
```

### Erro de módulo não encontrado

**Problema:** `Cannot find module` ou erros de import

**Solução:**
```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

### Erro de TypeScript

**Problema:** Erros de tipo no código

**Solução:**
```bash
# Verificar erros
npm run check

# Corrigir manualmente ou usar --noEmit para ignorar
```

### Hot reload não funcionando

**Problema:** Mudanças não aparecem automaticamente

**Solução:**
```bash
# Limpar cache do Vite
rm -rf node_modules/.vite

# Reiniciar servidor
npm run dev
```

### Erro de build

**Problema:** `npm run build` falha

**Solução:**
```bash
# Verificar erros de TypeScript primeiro
npm run check

# Limpar builds anteriores
rm -rf dist

# Tentar build novamente
npm run build
```

---

## 📝 Comandos Úteis

### Ver processos rodando nas portas

```bash
# Porta 5000
lsof -i:5000

# Porta 5001
lsof -i:5001

# Todas as portas Node
lsof -i -P | grep node
```

### Ver logs do servidor

Os logs aparecem automaticamente no terminal onde `npm run dev` está rodando.

**Formato dos logs:**
```
HH:MM:SS AM/PM [express] GET / 200 in 45ms
HH:MM:SS AM/PM [express] GET /api/content/home 200 in 12ms
```

### Verificar versão do Node

```bash
node --version
```

**Requisito:** Node.js 18+ (recomendado: 18.20.8 ou superior)

### Verificar versão do npm

```bash
npm --version
```

### Limpar tudo e começar do zero

```bash
# Remover node_modules e locks
rm -rf node_modules package-lock.json

# Remover builds
rm -rf dist

# Remover cache
rm -rf node_modules/.vite

# Reinstalar
npm install

# Iniciar
npm run dev
```

### Ver estrutura do projeto

```bash
# Ver estrutura de diretórios
tree -L 2 -I 'node_modules'

# Ou usar find
find . -maxdepth 2 -type d -not -path '*/node_modules/*'
```

### Verificar variáveis de ambiente

```bash
# Ver todas as variáveis
env | grep -E "NODE|PORT|DATABASE"

# Ver arquivo .env (se existir)
cat .env
```

---

## 🎯 Workflow Recomendado

### Desenvolvimento diário

```bash
# 1. Iniciar servidor
npm run dev

# 2. Abrir navegador (se não abrir automaticamente)
open http://localhost:5000

# 3. Fazer alterações no código
# 4. Ver mudanças automaticamente (hot reload)

# 5. Verificar tipos antes de commitar
npm run check

# 6. Parar servidor quando terminar
# Ctrl + C no terminal
```

### Deploy para produção

```bash
# 1. Verificar tipos
npm run check

# 2. Build
npm run build

# 3. Testar build localmente
npm start

# 4. Deploy (conforme sua plataforma)
# Exemplo: copiar dist/ para servidor
```

---

## 📚 Comandos por Ambiente

### Desenvolvimento

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run check` | Valida tipos TypeScript |
| `npm run db:push` | Aplica migrações do banco |

### Produção

| Comando | Descrição |
|---------|-----------|
| `npm run build` | Gera build de produção |
| `npm start` | Inicia servidor de produção |
| `npm run check` | Valida tipos antes do build |

---

## 🔍 Comandos de Debug

### Ver erros detalhados

```bash
# Com mais verbosidade
NODE_ENV=development DEBUG=* npm run dev

# Ver apenas erros do Vite
npm run dev -- --debug
```

### Verificar se servidor está respondendo

```bash
# Teste HTTP
curl http://localhost:5000

# Teste com código de status
curl -I http://localhost:5000

# Teste completo
curl -v http://localhost:5000
```

---

## 📖 Recursos Adicionais

- **PRD Técnico:** `docs/prd-tecnico.md`
- **Documentação do Carrossel:** `client/src/data/README.md`
- **Design Guidelines:** `design_guidelines.md`

---

## ⚠️ Notas Importantes

1. **Porta 5000:** Pode estar ocupada pelo AirPlay Receiver no macOS. Use `PORT=5001` se necessário.

2. **Hot Reload:** Funciona automaticamente em desenvolvimento. Não é necessário reiniciar para ver mudanças no código.

3. **TypeScript:** Sempre execute `npm run check` antes de commitar código.

4. **Banco de Dados:** Requer `DATABASE_URL` configurada para operações de banco. Em desenvolvimento, pode usar storage em memória.

5. **Build:** Sempre teste o build localmente (`npm start`) antes de fazer deploy.

---

## 🆘 Precisa de Ajuda?

1. Verifique os logs no terminal onde o servidor está rodando
2. Execute `npm run check` para ver erros de TypeScript
3. Consulte a seção [Solução de Problemas](#solução-de-problemas)
4. Revise o [PRD Técnico](prd-tecnico.md) para entender a arquitetura

