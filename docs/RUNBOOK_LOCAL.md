# Runbook — Rodar local (Titanium)

## Objetivo
Subir o projeto local sempre do mesmo jeito, evitando erro de porta ocupada e incompatibilidade de versão do Node.

## Pré-requisitos
- Estar na pasta do projeto:
  `/Users/leandrobosaipo/Sites/titanium/titaniumimplantes-replit-home`
- Node 20 disponível via npx (`npx -y node@20`)

---

## Passo a passo padrão

```bash
cd /Users/leandrobosaipo/Sites/titanium/titaniumimplantes-replit-home

# 1) Atualizar local com remoto
git fetch origin
git reset --hard origin/main
git clean -fd
git pull --ff-only

# 2) Dependências
npm install

# 3) Subir servidor (Node 20 + porta 5001)
PORT=5001 NODE_ENV=development npx -y node@20 node_modules/.bin/tsx server/index.ts
```

Abra no navegador:
- http://127.0.0.1:5001/

---

## Verificação rápida

```bash
curl -s -o /dev/null -w 'home:%{http_code}\n' http://127.0.0.1:5001/
curl -s -o /dev/null -w 'produtos:%{http_code}\n' http://127.0.0.1:5001/produtos
curl -s -o /dev/null -w 'quem:%{http_code}\n' http://127.0.0.1:5001/quem-somos
curl -s -o /dev/null -w 'contato:%{http_code}\n' http://127.0.0.1:5001/contato
```

---

## Observações
- Se a porta 5001 já estiver em uso, troque para 5002.
- Evitar Node 25 para este projeto local (já causou erro de socket `ENOTSUP`).
- Fluxo de deploy continua sendo GitHub -> EasyPanel.

---

## Skills recomendadas (OpenClaw)
Usar conforme tarefa:

- **openai-whisper**: transcrever áudios locais (ex.: WhatsApp `.opus`).
- **coding-agent**: mudanças grandes/refatorações (quando for além de ajustes pontuais).
- **github**: validação de PR/branch/status remoto via `gh`.

Regra prática neste projeto:
- Ajuste simples de conteúdo/layout: editar direto.
- Tarefa extensa/multi-arquivo: considerar `coding-agent`.
- Sempre validar local antes de push/deploy.

