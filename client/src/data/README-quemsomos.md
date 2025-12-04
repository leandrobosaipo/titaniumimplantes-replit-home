# Administração da Seção Quem Somos

Este diretório contém a configuração dinâmica da seção "Quem Somos / Nossa Missão" da página inicial.

## Como Editar o Conteúdo

Para modificar o conteúdo da seção, edite o arquivo `quemSomos.ts` neste diretório.

### Editar Título e Descrição

Modifique diretamente as propriedades no objeto `quemSomosConfig`:

```typescript
export const quemSomosConfig: QuemSomosConfig = {
  titulo: "Seu novo título aqui",
  descricao: "Sua nova descrição aqui",
  // ...
};
```

### Editar Botão de Ação

Para modificar o botão:

```typescript
mostrarBotao: true,        // true para exibir, false para ocultar
textoBotao: "Novo texto",  // Texto do botão
linkBotao: "/nova-rota",   // Link de destino
```

### Trocar a Imagem de Background

1. Adicione a nova imagem na pasta `attached_assets/` na raiz do projeto
2. Importe a imagem no topo do arquivo `quemSomos.ts`:
   ```typescript
   import bgQuemSomos from "@assets/nome-da-nova-imagem.jpg";
   ```
3. Atualize a propriedade `backgroundImage`:
   ```typescript
   backgroundImage: bgQuemSomos,
   ```

### Ocultar a Seção

Para ocultar completamente a seção sem remover o código:

```typescript
ativo: false,
```

### Remover o Botão

Para ocultar apenas o botão:

```typescript
mostrarBotao: false,
```

## Estrutura de Dados

A configuração segue a interface `QuemSomosConfig`:

- **ativo** (boolean, obrigatório): Se a seção deve ser exibida
- **backgroundImage** (string, obrigatório): Caminho da imagem de background
- **titulo** (string, obrigatório): Título principal da seção
- **descricao** (string, obrigatório): Descrição/texto principal
- **mostrarBotao** (boolean, opcional): Se o botão deve ser exibido
- **textoBotao** (string, opcional): Texto do botão
- **linkBotao** (string, opcional): Link de destino do botão

## Exemplo Completo

```typescript
export const quemSomosConfig: QuemSomosConfig = {
  ativo: true,
  backgroundImage: bgQuemSomos,
  titulo: "Nossa missão é promover saúde...",
  descricao: "A Titanium Implantes tem o compromisso...",
  mostrarBotao: true,
  textoBotao: "Conheça nossa história",
  linkBotao: "/institucional",
};
```

## Notas Importantes

- As alterações são refletidas automaticamente após salvar o arquivo (hot reload)
- Não é necessário reiniciar o servidor para ver as mudanças
- A seção não será renderizada se `ativo: false`
- O botão só aparece se `mostrarBotao: true` e ambos `textoBotao` e `linkBotao` estiverem definidos

