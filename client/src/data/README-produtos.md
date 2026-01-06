# Guia de Importação de Produtos

Este guia explica como adicionar novos produtos ao catálogo da Titanium Implantes.

## Estrutura de Dados

Os produtos são gerenciados no arquivo [`products.ts`](./products.ts). Cada produto segue a interface `Product` definida em [`@/types/products`](../types/products.ts).

## Como Adicionar um Novo Produto

### 1. Preparar as Imagens

1. Coloque as imagens do produto na pasta `attached_assets/produtos/`
2. Siga o padrão de nomenclatura:
   - **Imagem principal**: `[slug-produto]-main.jpg` (ou `.webp`, `.avif`)
   - **Imagens adicionais**: `[slug-produto]-1.jpg`, `[slug-produto]-2.jpg`, etc.

**Exemplo:**
```
attached_assets/produtos/
  ├── produto-exemplo-main.jpg
  ├── produto-exemplo-1.jpg
  └── produto-exemplo-2.jpg
```

### 2. Importar as Imagens no `products.ts`

No topo do arquivo `products.ts`, adicione os imports:

```typescript
import exemploMainImg from "@assets/produtos/produto-exemplo-main.jpg";
import exemploImg1 from "@assets/produtos/produto-exemplo-1.jpg";
import exemploImg2 from "@assets/produtos/produto-exemplo-2.jpg";
```

### 3. Adicionar o Produto ao Array

Adicione um novo objeto ao array `products` em `productsConfig`:

```typescript
{
  id: "9", // Próximo ID sequencial
  slug: "produto-exemplo-nome",
  categoryId: "neuro", // ou "coluna", "buco", "otorrino", "premium"
  title: "Nome do Produto™ – Fabricante",
  description: "Descrição curta que aparece no card (~150 caracteres)",
  fullDescription: "Descrição completa que aparece na página de detalhes do produto.",
  mainImage: exemploMainImg,
  images: [exemploImg1, exemploImg2],
  anvisa: "10349001320", // Opcional
}
```

## Campos Obrigatórios

- `id`: String única (geralmente sequencial: "1", "2", "3"...)
- `slug`: URL-friendly, sem espaços, minúsculas, com hífens
- `categoryId`: Uma das categorias disponíveis
- `title`: Nome completo do produto
- `description`: Descrição curta para o card
- `fullDescription`: Descrição completa para a página de detalhes
- `mainImage`: Imagem principal importada
- `images`: Array com pelo menos a imagem principal (pode ter mais)

## Campos Opcionais

- `anvisa`: Número de registro ANVISA (string)

## Categorias Disponíveis

- `"premium"`: Linha Premium
- `"coluna"`: Coluna
- `"neuro"`: Neurocirurgia
- `"buco"`: Bucomaxilofacial
- `"otorrino"`: Otorrinolaringologia

## Modelo JSON

Para referência, consulte [`products-template.json`](./products-template.json) que contém a estrutura completa com exemplos e validações.

## Exemplo Completo

```typescript
// 1. Importar imagens
import novoProdutoMain from "@assets/produtos/novo-produto-main.jpg";
import novoProdutoImg1 from "@assets/produtos/novo-produto-1.jpg";

// 2. Adicionar ao array products
{
  id: "9",
  slug: "novo-produto-exemplo",
  categoryId: "neuro",
  title: "Novo Produto™ – Medtronic",
  description: "Sistema avançado para tratamento neurológico com tecnologia de ponta.",
  fullDescription: "O Novo Produto™ é um sistema desenvolvido pela Medtronic para tratamento de condições neurológicas. Oferece tecnologia de ponta com monitoramento em tempo real e terapias personalizadas adaptativas.",
  mainImage: novoProdutoMain,
  images: [novoProdutoMain, novoProdutoImg1],
  anvisa: "10349001320",
}
```

## Paginação

- **Produtos por página**: 12 (configurado em `itemsPerPage`)
- O paginador aparece automaticamente quando há mais de 12 produtos
- Com 8 produtos atuais, não há paginador (todos cabem em 1 página)

## Validação

Após adicionar um produto:

1. Verifique se o servidor de desenvolvimento recarregou
2. Navegue até `/produtos` para ver o novo produto
3. Clique no produto para verificar a página de detalhes
4. Teste os filtros de categoria

## Dicas

- Use slugs descritivos e consistentes
- Mantenha as descrições curtas no `description` (ideal: 100-150 caracteres)
- Use `fullDescription` para informações detalhadas
- Sempre inclua pelo menos uma imagem de alta qualidade
- Verifique se o número ANVISA está correto (se aplicável)

