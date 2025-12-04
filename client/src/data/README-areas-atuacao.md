# Administração da Seção Áreas de Atuação

Este diretório contém a configuração dinâmica da seção "Áreas de Atuação" da página inicial.

## Como Editar o Conteúdo

Para modificar o conteúdo da seção, edite o arquivo `areasAtuacao.ts` neste diretório.

### Editar Títulos e Subtítulos

Modifique diretamente as propriedades no objeto `areasAtuacaoConfig`:

```typescript
export const areasAtuacaoConfig: AreasAtuacaoConfig = {
  tituloSessao: "ÁREAS DE ATUAÇÃO",  // Texto do selo/badge
  titulo: "Soluções em saúde para especialidades cirúrgicas.",
  subtitulo: "Especialidades atendidas: Coluna, Neurocirurgia...",
  // ...
};
```

### Adicionar uma Nova Especialidade

Adicione um novo objeto ao array `especialidades`:

```typescript
{
  id: "5",
  titulo: "Nova Especialidade",
  descricao: "Descrição da nova especialidade...",
  imagem: novaImagem,
  icone: novoIcone,
}
```

**Importante**: Antes de adicionar, você precisa:
1. Adicionar a imagem de background em `attached_assets/`
2. Adicionar a imagem do ícone em `attached_assets/`
3. Importar ambas no topo do arquivo `areasAtuacao.ts`

### Remover uma Especialidade

Simplesmente remova o objeto do array `especialidades`.

### Modificar uma Especialidade Existente

Edite as propriedades do objeto correspondente:
- `titulo`: Título da especialidade
- `descricao`: Descrição/texto explicativo
- `imagem`: Imagem de background do card
- `icone`: Ícone circular sobreposto à imagem

### Trocar Imagens

1. Adicione a nova imagem na pasta `attached_assets/` na raiz do projeto
2. Importe a imagem no topo do arquivo `areasAtuacao.ts`:
   ```typescript
   import novaImagem from "@assets/nova-imagem.jpg";
   ```
3. Atualize a propriedade correspondente:
   ```typescript
   imagem: novaImagem,
   ```

### Ocultar a Seção

Para ocultar completamente a seção sem remover o código:

```typescript
ativo: false,
```

## Estrutura de Dados

A configuração segue a interface `AreasAtuacaoConfig`:

- **ativo** (boolean, obrigatório): Se a seção deve ser exibida
- **tituloSessao** (string, opcional): Texto do selo/badge no topo
- **titulo** (string, obrigatório): Título principal da seção
- **subtitulo** (string, obrigatório): Subtítulo/legenda da seção
- **especialidades** (array, obrigatório): Array de objetos `EspecialidadeCard`

Cada especialidade (`EspecialidadeCard`) contém:

- **id** (string, obrigatório): Identificador único
- **titulo** (string, obrigatório): Nome da especialidade
- **descricao** (string, obrigatório): Descrição da especialidade
- **imagem** (string, obrigatório): Caminho da imagem de background
- **icone** (string, obrigatório): Caminho da imagem do ícone circular

## Exemplo Completo

```typescript
export const areasAtuacaoConfig: AreasAtuacaoConfig = {
  ativo: true,
  tituloSessao: "ÁREAS DE ATUAÇÃO",
  titulo: "Soluções em saúde para especialidades cirúrgicas.",
  subtitulo: "Especialidades atendidas: Coluna, Neurocirurgia...",
  especialidades: [
    {
      id: "1",
      titulo: "Coluna",
      descricao: "Sistemas de fixação, espaçadores...",
      imagem: colunaBg,
      icone: colunaIcone,
    },
    // Adicione mais especialidades aqui...
  ],
};
```

## Notas Importantes

- As alterações são refletidas automaticamente após salvar o arquivo (hot reload)
- Não é necessário reiniciar o servidor para ver as mudanças
- A seção não será renderizada se `ativo: false`
- O grid se adapta automaticamente ao número de especialidades (4 colunas desktop, 2 tablet, 1 mobile)
- Todas as imagens devem estar em `attached_assets/` e usar o alias `@assets` para importação

## Especificações Visuais

- **Selo**: Lato Semibold 25.47px, fundo azul #0d70dc
- **Título**: Lato Heavy 63.58px (desktop), responsivo no mobile
- **Subtítulo**: Lato Bold/Regular 32px (desktop), responsivo no mobile
- **Cards**: Imagens 180px altura (desktop), 140px (tablet)
- **Ícones**: 60px diâmetro (desktop), 50px (mobile)
- **Cores**: Azul escuro #0a324c (títulos), Cinza #4A4A4A (descrições)

