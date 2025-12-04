# Dados Dinâmicos das Seções

Este diretório contém as configurações dinâmicas das seções da página inicial, seguindo um padrão arquitetural consistente que separa dados de apresentação.

## Seções Configuráveis

- **Carrossel** (`carousel.ts`) - Banner principal com slides
- **Quem Somos** (`quemSomos.ts`) - Seção institucional com background image

Cada seção possui sua própria documentação detalhada. Veja `README-quemsomos.md` para informações sobre a seção Quem Somos.

---

# Dados Dinâmicos do Carrossel

Este diretório contém a configuração dinâmica do carrossel da página inicial.

## Como Editar os Slides

Para modificar os slides do carrossel, edite o arquivo `carousel.ts` neste diretório.

### Adicionar um Novo Slide

Adicione um novo objeto ao array `slides`:

```typescript
{
  id: "4", // ID único (pode ser qualquer string)
  image: slide3, // Import da imagem (veja seção abaixo)
  title: "Título do novo slide",
  subtitle: "Subtítulo ou descrição do slide",
  buttonText: "Texto do botão", // Opcional
  buttonLink: "/link-destino", // Opcional (requer buttonText)
}
```

### Remover um Slide

Simplesmente remova o objeto do array `slides`.

### Modificar um Slide Existente

Edite as propriedades do objeto correspondente:
- `title`: Título principal
- `subtitle`: Subtítulo/descrição
- `buttonText`: Texto do botão de ação
- `buttonLink`: Link de destino do botão

### Adicionar Nova Imagem

1. Adicione a imagem na pasta `attached_assets/` na raiz do projeto
2. Importe a imagem no topo do arquivo `carousel.ts`:
   ```typescript
   import slide3 from "@assets/nome-da-imagem.jpg";
   ```
3. Use a variável importada na propriedade `image` do slide

### Alterar Intervalo de Autoplay

Modifique a propriedade `autoplayInterval` (em milissegundos):

```typescript
autoplayInterval: 3000, // Troca a cada 3 segundos
```

## Estrutura de Dados

Cada slide segue a interface `CarouselSlide`:

- **id** (string, obrigatório): Identificador único
- **image** (string, obrigatório): Caminho da imagem (import estático)
- **title** (string, obrigatório): Título principal
- **subtitle** (string, obrigatório): Subtítulo/descrição
- **buttonText** (string, opcional): Texto do botão
- **buttonLink** (string, opcional): Link de destino (requer buttonText)

## Exemplo Completo

```typescript
export const carouselConfig: CarouselConfig = {
  slides: [
    {
      id: "1",
      image: slide1,
      title: "Meu Título",
      subtitle: "Minha descrição",
      buttonText: "Clique aqui",
      buttonLink: "/produtos",
    },
    // Adicione mais slides aqui...
  ],
  autoplayInterval: 5000,
};
```

## Notas Importantes

- As alterações são refletidas automaticamente após salvar o arquivo (hot reload)
- Não é necessário reiniciar o servidor para ver as mudanças
- O carrossel se adapta automaticamente ao número de slides
- Se não houver slides, o carrossel não será renderizado

