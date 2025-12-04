# Plano para Corrigir Erro de Build Docker

## Problema Identificado

O erro `npm ci` falhando pode ter várias causas:

1. **package-lock.json excluído**: O `.dockerignore` está excluindo `package-lock.json`, mas `npm ci` precisa dele
2. **Dependências opcionais**: `bufferutil` é uma dependência opcional que pode falhar em builds nativos
3. **Falta de ferramentas de build**: Node Alpine pode não ter ferramentas necessárias para compilar dependências nativas
4. **Problemas de compatibilidade**: Algumas dependências podem ter problemas com Node 20 Alpine

## Soluções Propostas

### Solução 1: Corrigir .dockerignore (CRÍTICO)
- Remover `package-lock.json` do `.dockerignore`
- O `npm ci` precisa do lock file para funcionar

### Solução 2: Melhorar Dockerfile
- Adicionar tratamento para dependências opcionais que podem falhar
- Usar `npm ci --legacy-peer-deps` se houver problemas de peer dependencies
- Adicionar `--ignore-scripts` temporariamente se necessário
- Adicionar ferramentas de build se `bufferutil` for necessário

### Solução 3: Alternativa com npm install
- Se `npm ci` continuar falhando, usar `npm install` como fallback
- Menos ideal, mas mais tolerante a problemas

### Solução 4: Remover dependências problemáticas
- Se `bufferutil` não for essencial, pode ser removido
- É uma otimização opcional para WebSocket

## Plano de Implementação

1. Corrigir `.dockerignore` (remover package-lock.json)
2. Atualizar Dockerfile com melhor tratamento de erros
3. Adicionar opção de fallback para npm install
4. Testar build localmente antes de fazer deploy
5. Se necessário, adicionar ferramentas de build nativas

## Perguntas para Antecipar Problemas

Antes de implementar, considere:

1. **bufferutil é necessário?**
   - É uma otimização opcional para WebSocket
   - Se não for crítico, pode ser ignorado se falhar

2. **Há outras dependências nativas?**
   - Verificar se outras dependências precisam de compilação
   - `ws` pode ter dependências opcionais

3. **Problemas de peer dependencies?**
   - Algumas versões podem ter conflitos
   - `--legacy-peer-deps` pode resolver

4. **Versão do Node é compatível?**
   - Node 20 Alpine pode ter diferenças
   - Considerar Node 20 (não Alpine) se houver problemas

5. **Problemas de rede/timeout?**
   - Build pode estar demorando muito
   - Adicionar retry ou aumentar timeout

