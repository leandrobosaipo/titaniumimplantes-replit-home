# PRD - Estrutura de Seções da Home

## Objetivo

Este documento descreve o padrão arquitetural usado para criar e gerenciar seções na página inicial, permitindo que novas seções sejam adicionadas seguindo uma estrutura consistente e manutenível.

---

## Arquitetura Padrão (3 Camadas)

Todas as seções configuráveis seguem o mesmo padrão arquitetural, separando dados de apresentação:

### 1. Camada de Tipos (`client/src/types/`)
Define as interfaces TypeScript que garantem type safety e documentam a estrutura esperada.

### 2. Camada de Dados (`client/src/data/`)
Arquivo de configuração centralizado que contém todo o conteúdo editável (textos, imagens, links).

### 3. Camada de Apresentação (`client/src/components/`)
Componente React que renderiza a seção usando os dados da configuração.

---

## Estrutura da Home Atual

A página Home (`client/src/pages/Home.tsx`) segue esta ordem:

```tsx
<Header />
<main>
  <Carousel />              // Banner principal com slides
  <QuemSomosSection />      // Seção institucional
  <ProductCategories />     // Categorias de produtos
  <CTASection />            // Call to action
</main>
<Footer />
```

**Nova seção = Novo componente adicionado nesta lista**

---

## Casos de Estudo: Seções Implementadas

### Caso 1: Carrossel (Slides Rotativos)

#### Arquivos Criados

1. **Tipos**: `client/src/types/carousel.ts`
   ```typescript
   export interface CarouselSlide {
     id: string;
     image: string;
     title: string;
     subtitle: string;
     buttonText?: string;
     buttonLink?: string;
   }
   
   export interface CarouselConfig {
     slides: CarouselSlide[];
     autoplayInterval?: number;
   }
   ```

2. **Configuração**: `client/src/data/carousel.ts`
   ```typescript
   import slide1 from "@assets/slide-globus-without-title.jpg";
   
   export const carouselConfig: CarouselConfig = {
     slides: [
       {
         id: "1",
         image: slide1,
         title: "Parceria com a Globus",
         subtitle: "referência mundial...",
         buttonText: "Conheça nosso portfólio",
         buttonLink: "/produtos",
       },
     ],
     autoplayInterval: 5000,
   };
   ```

3. **Componente**: `client/src/components/Carousel.tsx`
   - Importa a configuração: `import { carouselConfig } from "@/data/carousel"`
   - Lê os dados e renderiza os slides

#### Como Editar o Carrossel

1. Edite `client/src/data/carousel.ts`
2. Adicione/remova objetos no array `slides`
3. Para nova imagem: adicione em `attached_assets/` e importe no topo do arquivo
4. Salve e veja as mudanças automaticamente (hot reload)

---

### Caso 2: Quem Somos (Seção Institucional)

#### Arquivos Criados

1. **Tipos**: `client/src/types/quemSomos.ts`
   ```typescript
   export interface QuemSomosConfig {
     ativo: boolean;
     backgroundImage: string;
     tituloSessao?: string;
     titulo: string;
     descricao: string;
     mostrarBotao?: boolean;
     textoBotao?: string;
     linkBotao?: string;
   }
   ```

2. **Configuração**: `client/src/data/quemSomos.ts`
   ```typescript
   import bgQuemSomos from "@assets/bg-quem-somos-home.jpg";
   
   export const quemSomosConfig: QuemSomosConfig = {
     ativo: true,
     backgroundImage: bgQuemSomos,
     tituloSessao: "QUEM SOMOS",
     titulo: "Nossa missão é promover...",
     descricao: "A Titanium Implantes...",
     mostrarBotao: true,
     textoBotao: "Conheça nossa história",
     linkBotao: "/institucional",
   };
   ```

3. **Componente**: `client/src/components/QuemSomosSection.tsx`
   - Importa a configuração: `import { quemSomosConfig as c } from "@/data/quemSomos"`
   - Verifica se `c.ativo` é true
   - Renderiza usando os dados da configuração

#### Como Editar a Seção Quem Somos

1. Edite `client/src/data/quemSomos.ts`
2. Modifique qualquer propriedade (título, descrição, etc.)
3. Para trocar background: adicione nova imagem em `attached_assets/` e atualize o import
4. Para ocultar: defina `ativo: false`

---

## Checklist: Como Solicitar uma Nova Seção

Ao solicitar uma nova seção para a Home, forneça as seguintes informações:

### ✅ Informações Básicas

- [ ] **Nome da seção**: (ex: "Nossos Valores", "Depoimentos", "Nossos Produtos")
- [ ] **Posição na Home**: Onde deve aparecer? (após carrossel, antes do footer, etc.)
- [ ] **Status inicial**: Deve aparecer ativa desde o início? (`ativo: true/false`)

### ✅ Conteúdo Textual

- [ ] **Textos necessários**: Títulos, subtítulos, descrições, botões
- [ ] **Links**: URLs para botões ou links internos
- [ ] **Elementos opcionais**: Badge/selo, botões de ação, listas, etc.

### ✅ Elementos Visuais

- [ ] **Imagens**: Quantas? Tamanho recomendado? (adicionar em `attached_assets/`)
- [ ] **Background**: Imagem de fundo? Cor sólida? Gradiente?
- [ ] **Ícones**: Necessários? Quais? (usar Lucide React)

### ✅ Layout e Comportamento

- [ ] **Estrutura**: Grid? Colunas? Lista vertical?
- [ ] **Responsividade**: Como deve se adaptar no mobile?
- [ ] **Interatividade**: Hover effects? Animações? Links clicáveis?
- [ ] **Elementos especiais**: Curvas, overlays, filtros?

### ✅ Exemplo de Especificação Completa

```markdown
## Nova Seção: Nossos Valores

**Posição**: Após "Quem Somos", antes de "Categorias de Produtos"

**Conteúdo**:
- Título: "Nossos Valores"
- Subtítulo: "Pilares que guiam nosso trabalho"
- 3 cards com:
  - Ícone (Award, Shield, Users)
  - Título do valor
  - Descrição curta

**Visual**:
- Background: Cor sólida (#F8F9FA)
- Layout: Grid 3 colunas no desktop, 1 coluna no mobile
- Cards com sombra suave e hover effect

**Configuração mínima necessária**:
- Array de valores (título, descrição, ícone)
- Título da seção
- Subtítulo da seção
```

---

## Estrutura de Arquivos para Nova Seção

Ao implementar uma nova seção, crie os seguintes arquivos:

```
client/src/
├── types/
│   └── nomeDaSecao.ts              # [NOVO] Interface TypeScript
├── data/
│   └── nomeDaSecao.ts              # [NOVO] Arquivo de configuração
└── components/
    └── NomeDaSecaoSection.tsx      # [NOVO] Componente React
```

### Passo a Passo

1. **Criar tipos** em `types/nomeDaSecao.ts`
   - Definir interface com todas as propriedades necessárias
   - Documentar cada campo com comentários JSDoc

2. **Criar configuração** em `data/nomeDaSecao.ts`
   - Importar o tipo criado
   - Importar imagens usando alias `@assets`
   - Exportar objeto de configuração tipado

3. **Criar componente** em `components/NomeDaSecaoSection.tsx`
   - Importar a configuração
   - Verificar `ativo` (se aplicável)
   - Renderizar usando dados da configuração
   - Implementar layout responsivo

4. **Adicionar na Home** em `pages/Home.tsx`
   - Importar o novo componente
   - Adicionar na ordem desejada dentro de `<main>`

---

## Vantagens deste Padrão

✅ **Separação de Responsabilidades**: Dados separados da apresentação  
✅ **Type Safety**: TypeScript garante estrutura correta  
✅ **Manutenibilidade**: Fácil localizar e editar conteúdo  
✅ **Hot Reload**: Mudanças refletidas automaticamente  
✅ **Reutilização**: Componente pode ser usado em outras páginas  
✅ **Flexibilidade**: Conteúdo editável sem tocar em código React  

---

## Diretrizes Importantes

### Imagens

- **Localização**: Todas as imagens devem estar em `attached_assets/` (raiz do projeto)
- **Import**: Use o alias `@assets` configurado no Vite
  ```typescript
  import minhaImagem from "@assets/nome-da-imagem.jpg";
  ```
- **Formato**: Preferir JPG/PNG, WebP quando possível

### Nomenclatura

- **Arquivos de tipo**: `nomeSecao.ts` (camelCase)
- **Arquivos de dados**: `nomeSecao.ts` (camelCase)
- **Componentes**: `NomeSecaoSection.tsx` (PascalCase com "Section" no final)

### Responsividade

- Sempre usar classes Tailwind responsivas (`md:`, `lg:`, etc.)
- Testar em mobile, tablet e desktop
- Seguir padrão mobile-first

### Documentação

- Criar README em `data/README-nomeSecao.md` se a seção tiver configuração complexa
- Documentar no arquivo de configuração como editar o conteúdo
- Comentar decisões arquiteturais importantes no componente

---

## Exemplo Completo: Checklist de Implementação

```markdown
### Nova Seção: Depoimentos de Clientes

**Arquivos a criar:**
- [ ] `client/src/types/depoimentos.ts`
- [ ] `client/src/data/depoimentos.ts`
- [ ] `client/src/components/DepoimentosSection.tsx`
- [ ] `client/src/data/README-depoimentos.md` (opcional)

**Configuração mínima:**
- [ ] Array de depoimentos (nome, cargo, texto, foto)
- [ ] Título da seção
- [ ] Opção de autoplay (se for carrossel)

**Visual:**
- [ ] Layout de cards
- [ ] Imagens de perfil (adicionar em attached_assets/)
- [ ] Background e estilos

**Integração:**
- [ ] Adicionar import na Home.tsx
- [ ] Adicionar componente na ordem correta
- [ ] Testar responsividade
```

---

## Próximos Passos

Após ler este PRD, ao solicitar uma nova seção, forneça:

1. **Especificação completa** seguindo o checklist acima
2. **Conteúdo textual** pronto (títulos, descrições, textos de botões)
3. **Arquivos de mídia** (imagens) já adicionados em `attached_assets/`
4. **Referência visual** (mockup, design, ou descrição detalhada)

Com essas informações, a implementação será rápida e seguirá exatamente o padrão estabelecido pelas seções existentes.

