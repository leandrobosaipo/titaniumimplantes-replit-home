# Pasta de Imagens de Produtos

Esta pasta contém todas as imagens dos produtos do catálogo da Titanium Implantes.

## Padrão de Nomenclatura

### Imagem Principal
- **Formato**: `[slug-produto]-main.[extensão]`
- **Exemplo**: `produto-dbs-percept-main.jpg`
- **Uso**: Imagem exibida no card do produto e como imagem principal na página de detalhes

### Imagens Adicionais
- **Formato**: `[slug-produto]-[número].[extensão]`
- **Exemplo**: 
  - `produto-dbs-percept-1.jpg`
  - `produto-dbs-percept-2.jpg`
  - `produto-dbs-percept-3.jpg`
- **Uso**: Imagens adicionais exibidas na galeria da página de detalhes do produto

## Regras de Nomenclatura

1. **Slug do produto**: Use o mesmo `slug` definido no arquivo `products.ts`
2. **Hífens**: Use hífens (`-`) para separar palavras, não espaços ou underscores
3. **Minúsculas**: Todo o nome do arquivo deve estar em minúsculas
4. **Números**: Para imagens adicionais, use números sequenciais começando em `1`
5. **Extensões suportadas**: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`

## Exemplo Completo

Para um produto com `slug: "dbs-percept-rc-medtronic"`:

```
attached_assets/produtos/
  ├── dbs-percept-rc-medtronic-main.jpg    (imagem principal)
  ├── dbs-percept-rc-medtronic-1.jpg       (imagem adicional 1)
  ├── dbs-percept-rc-medtronic-2.jpg       (imagem adicional 2)
  └── dbs-percept-rc-medtronic-3.jpg       (imagem adicional 3)
```

## Boas Práticas

### Qualidade das Imagens
- **Resolução recomendada**: Mínimo 800x600px para imagens principais
- **Formato**: Prefira `.webp` ou `.avif` para melhor compressão
- **Tamanho**: Otimize as imagens antes de adicionar (ideal: < 500KB por imagem)

### Organização
- Mantenha todas as imagens de um produto com o mesmo prefixo (slug)
- Use números sequenciais para imagens adicionais (1, 2, 3...)
- Não use espaços, caracteres especiais ou acentos nos nomes dos arquivos

### Conteúdo
- **Imagem principal**: Deve mostrar o produto de forma clara e profissional
- **Imagens adicionais**: Podem mostrar diferentes ângulos, detalhes, ou o produto em uso

## Como Adicionar Imagens de um Novo Produto

1. Prepare as imagens seguindo o padrão de nomenclatura
2. Coloque todas as imagens nesta pasta (`attached_assets/produtos/`)
3. No arquivo `client/src/data/products.ts`:
   - Importe as imagens no topo do arquivo
   - Adicione o produto ao array `products` com as referências corretas

**Exemplo de import:**
```typescript
import produtoMain from "@assets/produtos/produto-exemplo-main.jpg";
import produtoImg1 from "@assets/produtos/produto-exemplo-1.jpg";
```

## Estrutura de Pastas

```
attached_assets/
  └── produtos/          ← Você está aqui
      ├── README.md      ← Este arquivo
      ├── produto-1-main.jpg
      ├── produto-1-1.jpg
      ├── produto-2-main.jpg
      └── ...
```

## Notas Importantes

- ⚠️ **Não renomeie imagens** de produtos já cadastrados sem atualizar as referências em `products.ts`
- ✅ **Sempre use o mesmo slug** do produto para nomear as imagens
- ✅ **Mantenha a consistência** no padrão de nomenclatura
- ✅ **Otimize as imagens** antes de adicionar para melhor performance

## Suporte

Para mais informações sobre como adicionar produtos, consulte:
- [`client/src/data/README-produtos.md`](../../client/src/data/README-produtos.md)
- [`client/src/data/products-template.json`](../../client/src/data/products-template.json)

