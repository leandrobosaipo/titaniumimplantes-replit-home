# Runbook — Rodar local, tratar nova lista de melhorias e publicar (Titanium)

## Objetivo
Ter um fluxo único para:
1) receber nova lista de melhorias (incluindo áudios),
2) executar ajustes com validação local confiável,
3) publicar com segurança via **GitHub -> EasyPanel**.

## Pré-requisitos
- Projeto em: `/Users/leandrobosaipo/sites/titanium/titaniumimplantes-replit-home`
- Node 20 via npx (`npx -y node@20`)
- Regra fixa: **não alterar rotas sem pedido explícito do Leandro**.

---

## 1) Início de sessão (sempre)

```bash
cd /Users/leandrobosaipo/sites/titanium/titaniumimplantes-replit-home

# Sincronizar com remoto (estado limpo)
git fetch origin
git reset --hard origin/main
git clean -fd
git pull --ff-only

# Dependências
npm install
```

---

## 2) Subir local na porta padrão (5001)

```bash
PORT=5001 NODE_ENV=development npx -y node@20 node_modules/.bin/tsx server/index.ts
```

Abrir: `http://127.0.0.1:5001/`

### Se a porta 5001 estiver ocupada
**Não trocar para 5002 automaticamente.**
Primeiro confirmar se é outra instância do mesmo projeto.

```bash
lsof -nP -iTCP:5001 -sTCP:LISTEN
ps -p <PID> -o pid,ppid,command=
```

- Se for a mesma aplicação, pode manter como está **ou** reiniciar na própria 5001.
- Só usar outra porta quando houver pedido explícito.

---

## 3) Receber nova lista de melhorias (cliente)

### 3.1 Quando vier por áudio
1. Transcrever todos os áudios.
2. Consolidar pedidos em checklist objetivo (linguagem de cliente).
3. Mapear cada pedido para página/seção do site.

Formato recomendado de checklist:
- Pedido do cliente
- Página
- Seção
- Status (pendente/em validação/concluído)

### 3.2 Execução dos ajustes
- Fazer alterações pontuais sem mudar rotas.
- Em mudanças grandes/multi-arquivo, considerar `coding-agent`.
- Manter padrão visual e CTAs consistentes entre páginas de produto.

---

## 4) Validação local obrigatória (antes de commit)

### 4.1 Rotas principais (sanidade)
```bash
curl -s -o /dev/null -w 'home:%{http_code}\n' http://127.0.0.1:5001/
curl -s -o /dev/null -w 'produtos:%{http_code}\n' http://127.0.0.1:5001/produtos
curl -s -o /dev/null -w 'quem:%{http_code}\n' http://127.0.0.1:5001/quem-somos
curl -s -o /dev/null -w 'contato:%{http_code}\n' http://127.0.0.1:5001/contato
```

### 4.2 Conferência funcional (UI)
Checar manualmente os itens da lista do cliente, sempre com:
- página + seção impactada,
- evidência de que o pedido foi atendido,
- sem regressão visual.

---

## 5) Publicar (GitHub -> EasyPanel)

### 5.1 Commit e push
```bash
git status
git add -A
git commit -m "feat/fix: <resumo objetivo do que o cliente pediu>"
git push origin main
```

### 5.2 Confirmação de envio
```bash
git rev-parse --short HEAD
git log --oneline -n 5 --decorate
```
Confirmar que `HEAD` local está em `origin/main`.

### 5.3 Fluxo principal de deploy (explícito)
**O padrão principal deste projeto não é mais depender da UI do EasyPanel.**

Usar este fluxo como caminho oficial:
1. validar local com `npm run build`;
2. `git push origin main`;
3. publicar no servidor por **SSH + Docker Swarm**;
4. validar a URL pública.

Comando operacional padrão:
```bash
ssh root@173.212.225.231 '
set -e
CODE_DIR=/etc/easypanel/projects/codigo5/titaniunimplantes/code
IMAGE=easypanel/codigo5/titaniunimplantes
SERVICE=codigo5_titaniunimplantes
cd "$CODE_DIR"
git pull --rebase origin main
docker build -t "$IMAGE" "$CODE_DIR"
docker service update --image "$IMAGE" --force "$SERVICE"
'
```

Depois verificar:
```bash
ssh root@173.212.225.231 'docker service ps codigo5_titaniunimplantes'
curl -I -L https://titaniunimplantes.codigo5.com.br/
```

### 5.4 Referência obrigatória
O runbook detalhado e validado do deploy real está em:

- `docs/DEPLOY_EASYPANEL_RUNBOOK.md`

Sempre tratar esse arquivo como a fonte de verdade para publicação.

### 5.5 EasyPanel (UI) — opcional
- Painel: `https://easypanel.codigo5.com.br`
- Projeto/serviço: `codigo5 / titaniunimplantes`
- URL do serviço: `https://titaniunimplantes.codigo5.com.br/`

A UI pode ser usada quando estiver conveniente, mas **não é o fluxo principal**.
Se a UI falhar, seguir o fluxo SSH/Swarm acima sem bloquear a entrega.

### 5.6 Credenciais e acessos (onde estão)
> **Importante:** não versionar segredos no repositório.

- Arquivo operacional com acessos do EasyPanel e variáveis de produção:
  - `/Users/leandrobosaipo/.openclaw/workspace-titanium-v2/.env.easypanel`
- GitHub deste projeto:
  - remoto: `https://github.com/leandrobosaipo/titaniumimplantes-replit-home.git`
  - autenticação via sessão/credencial já configurada no ambiente local.

---

## 6) Encerramento da sessão (obrigatório)
Atualizar documentação de memória com:
- o que o cliente pediu,
- o que foi entregue,
- commit final,
- pontos de atenção para próxima sessão.

Arquivos para atualizar:
- `MEMORY.md` (preferências/padrões duradouros)
- `memory/YYYY-MM-DD.md` (resumo da sessão)

---

## Atualização de referência — 2026-03-23 (última bateria entregue)

Implementado nesta rodada:
- Removidas 3 seções da página `/lgpd`:
  - `LgpdDestaquesMaterialSection` ("Destaques do material")
  - `LgpdControleQualidadeSection` ("Controle de qualidade")
  - `LgpdComplianceEticaSection` ("Compliance e Ética")
- Página `/lgpd` ficou apenas com as 2 seções finais:
  - `LgpdProtecaoDadosSection` ("LGPD — Proteção de Dados")
  - `LgpdExercerDireitosSection` (direitos e canais de contato)
- Corrigido gap de topo: `pt-[100px] lg:pt-[160px]` em `LgpdProtecaoDadosSection` (padrão do projeto).
- SEO atualizado: title e description focados em LGPD/Proteção de Dados.
- Commit: `ef734b7`
- Deploy EasyPanel: ✅ concluído (56s de build)

## Atualização de referência — 2026-03-19 (bateria anterior)

Implementado nesta rodada:
- Correção de imagem no detalhe do produto **Percept RC**.
- Inclusão de vídeos nos produtos:
  - `rise-l-globus` (YouTube)
  - `espacador-cervical-coalition-mis-globus` (YouTube)
- Inclusão de PDFs nos produtos:
  - `revolve-sistema-de-fixacao-suplementar-percutaneo-globus` → `/produtos/revolve.pdf`
  - `assure-placa-cervical-anterior-globus` → `/produtos/assure.pdf`
- Remoção do produto **Válvulas para Hidrocefalia – Pressão Fixa ATLAS**.
- Ajuste do template para mídia:
  - vídeo com player quando houver `videoUrl`,
  - bloco de PDF com visualização + botão **Abrir / Baixar PDF** quando houver `pdfUrl`,
  - tags de mídia na listagem de produtos.

Commits de referência da entrega:
- `553c295`
- `872dcc7`
- `9a316f7`

## Observações importantes
- Evitar Node 25 para este projeto local (já causou `ENOTSUP`).
- Em caso de inconsistência local: `reset + clean + pull --ff-only`.
- Fluxo oficial de publicação permanece: **GitHub -> EasyPanel**.
