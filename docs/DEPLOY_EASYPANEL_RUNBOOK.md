# Runbook — Deploy Titanium no EasyPanel (fluxo real)

Atualizado em: 2026-03-26
Projeto: `titaniunimplantes`
Repo: `https://github.com/leandrobosaipo/titaniumimplantes-replit-home.git`
Produção: `https://titaniunimplantes.codigo5.com.br/`

## Objetivo
Documentar o procedimento que **realmente funciona** para publicar o site no servidor do EasyPanel da Codigo5, inclusive quando a UI do painel estiver indisponível ou a automação do browser falhar.

---

## Infra real confirmada

- EasyPanel público: `https://easypanel.codigo5.com.br`
- VPS: `173.212.225.231`
- Orquestração: **Docker Swarm**
- Serviço do app: `codigo5_titaniunimplantes`
- Imagem do app: `easypanel/codigo5/titaniunimplantes`
- Código no servidor:
  - `/etc/easypanel/projects/codigo5/titaniunimplantes/code`

### Estado confirmado em 2026-03-26
No servidor, este app:
- já é um clone Git do mesmo repositório do GitHub;
- já possui `Dockerfile` próprio;
- já roda como **Docker service** no Swarm;
- pode ser atualizado sem usar a UI, via `git pull + docker build + docker service update --force`.

---

## Fluxo oficial recomendado

### 1) Alterar localmente
Trabalhar em:

```bash
cd /Users/leandrobosaipo/Sites/scripts/titaniumimplantes-replit-home
```

### 2) Validar build local
```bash
npm run build
```

### 3) Commit e push
```bash
git add -A
git commit -m "fix/feat: resumo objetivo"
git push origin main
```

### 4) Implantar no servidor (sem depender da UI)
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

### 5) Verificar rollout
```bash
ssh root@173.212.225.231 'docker service ps codigo5_titaniunimplantes --no-trunc'
ssh root@173.212.225.231 'docker service inspect codigo5_titaniunimplantes --pretty'
```

### 6) Testar produção
```bash
curl -I -L https://titaniunimplantes.codigo5.com.br/quem-somos
curl -sL https://titaniunimplantes.codigo5.com.br/assets/index-*.js
```

> Observação: como o site é SPA, muitas vezes o texto visível não aparece no HTML inicial. Nesses casos, validar pelo bundle JS publicado ou por inspeção visual no navegador.

---

## Procedimento validado nesta sessão (2026-03-26)

Objetivo executado:
- corrigir na página `/quem-somos`, seção **Nossa estrutura e diferenciais**
- trocar o texto de `Titanium Implantes` para `Titaniun Implantes`

### Arquivo alterado
- `client/src/data/quemSomosPage.ts`

### Commit publicado
- `c04a9ba`

### Deploy aplicado no servidor
O servidor foi atualizado com:
- `git pull --rebase origin main`
- `docker build -t easypanel/codigo5/titaniunimplantes ...`
- `docker service update --image easypanel/codigo5/titaniunimplantes --force codigo5_titaniunimplantes`

### Evidência de sucesso
- rollout convergiu com sucesso (`Service codigo5_titaniunimplantes converged`)
- produção respondeu `HTTP 200`
- bundle servido em produção continha o trecho:

```text
Titaniun Implantes assegura excelência em todas as etapas, do atendimento à entrega.
```

---

## Comandos prontos de operação

### Ver HEAD local
```bash
git rev-parse --short HEAD
```

### Ver HEAD no servidor
```bash
ssh root@173.212.225.231 'git -C /etc/easypanel/projects/codigo5/titaniunimplantes/code rev-parse --short HEAD'
```

### Rebuild + redeploy completo
```bash
ssh root@173.212.225.231 '
set -e
cd /etc/easypanel/projects/codigo5/titaniunimplantes/code
git pull --rebase origin main
docker build -t easypanel/codigo5/titaniunimplantes .
docker service update --image easypanel/codigo5/titaniunimplantes --force codigo5_titaniunimplantes
'
```

### Ver logs recentes do serviço
```bash
ssh root@173.212.225.231 'docker service logs --tail 200 codigo5_titaniunimplantes'
```

### Ver tarefas do serviço
```bash
ssh root@173.212.225.231 'docker service ps codigo5_titaniunimplantes'
```

---

## Troubleshooting

### 1) `git push` rejeitado localmente
Causa comum: remoto avançou.

Resolver com:
```bash
git pull --rebase origin main
git push origin main
```

### 2) Build local passa, mas produção não atualiza
Causa provável:
- faltou rebuild da imagem no servidor, ou
- faltou `docker service update --force`.

Rodar novamente o bloco de deploy remoto completo.

### 3) HTML não mostra a alteração, mas o site responde 200
Provável comportamento normal de SPA.
Validar:
- bundle JS publicado;
- DevTools/network;
- inspeção visual da rota no browser.

### 4) Browser/OpenClaw falhar no login do EasyPanel
Não bloquear a entrega por isso.
Este projeto já tem fluxo operacional via SSH no VPS, que foi validado e funciona.

---

## Regra prática para próximas sessões
Se precisar fazer deploy da Titanium e a UI do EasyPanel estiver ruim:
1. alterar localmente;
2. rodar `npm run build`;
3. `git push origin main`;
4. executar o deploy remoto por SSH neste runbook;
5. validar a URL pública.

Esse é o caminho confiável atual.
