# MEMORY.md

## Preferências duradouras

- Usuário: **Leandro**.
- Projeto principal: **Titanium Implantes**.
- Preferência: manutenção contínua, validação local confiável e deploy via **GitHub -> EasyPanel**.
- Não alterar rotas sem solicitação explícita.

## Padrão operacional confirmado

- Para este ambiente local, subir com **Node 20** e porta **5001**.
- Em caso de inconsistência local, restaurar com:
  - `git reset --hard origin/main`
  - `git clean -fd`
  - `git pull --ff-only`

## Observações importantes

- 404 interno em páginas geralmente foi diferença de estado local vs remoto.
- Após restore para `origin/main`, as páginas internas voltaram a existir no roteamento.
