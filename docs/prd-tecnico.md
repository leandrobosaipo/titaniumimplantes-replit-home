# PRD Técnico - Titanium Implantes Website

## Resumo Executivo

O projeto atual entrega uma landing page corporativa estática para a Titanium Implantes, servida por um backend Express que ainda não expõe APIs. O objetivo desta evolução é transformar o site em uma aplicação de múltiplas páginas, alimentada por conteúdo dinâmico em JSON, com navegação consistente e infraestrutura pronta para atualizações futuras sem retrabalho manual.

## Stack Tecnológica Atual

### Frontend (Cliente)
- **React 18** com TypeScript
- **Vite** como bundler e dev server
- **Wouter** para roteamento (SPA)
- **TanStack Query** para gerenciamento de estado e cache de dados
- **Shadcn UI** + **Radix UI** para componentes acessíveis
- **Tailwind CSS** com design system customizado
- **Framer Motion** para animações
- **Lucide React** + **React Icons** para ícones

### Backend (Servidor)
- **Express 4** como framework web
- **TypeScript** com tipagem estrita
- **Drizzle ORM** configurado (mas não integrado ainda)
- **PostgreSQL** via Neon (configurado mas não utilizado)
- **Vite SSR** em modo desenvolvimento
- Sistema de logs customizado

### Build & Deploy
- **Vite** para build do cliente (`dist/public`)
- **esbuild** para transpilação do servidor (`dist/index.js`)
- Suporte a ambientes: development, production

### Qualidade & Ferramentas
- TypeScript strict mode
- ESLint não configurado ainda
- Hooks utilitários customizados (`useToast`, `useIsMobile`)

## Diagnóstico da Arquitetura Atual

### Pontos Fortes
1. **Design System Consistente**: Tailwind configurado com tokens de design profissional
2. **Componentes Reutilizáveis**: Biblioteca Shadcn UI completa instalada
3. **Estrutura Organizada**: Separação clara entre client, server e shared
4. **Type Safety**: TypeScript em todo o projeto
5. **Performance**: Vite com HMR rápido em desenvolvimento

### Limitações Identificadas
1. **Navegação Limitada**: Apenas rota `/` implementada; menu do header antecipa páginas que não existem
2. **Conteúdo Hardcoded**: Todo conteúdo estático dentro dos componentes React
3. **Backend Sem APIs**: Express configurado mas sem endpoints REST funcionais
4. **Storage Volátil**: `MemStorage` em memória, dados perdidos ao reiniciar
5. **Banco Não Integrado**: Drizzle configurado mas não utilizado

## Objetivos da Evolução

1. **Expandir Navegação**: Suportar páginas internas (`/quem-somos`, `/produtos`, `/canal-denuncia`, `/lgpd`, `/contato`, etc.)
2. **Conteúdo Dinâmico**: Centralizar conteúdo textual e mídia em fonte JSON acessível via hook compartilhado
3. **Manutenibilidade**: Manter coesão visual e reutilização de componentes Shadcn
4. **Escalabilidade**: Preparar infraestrutura para futuras expansões sem retrabalho manual

## Requisitos Funcionais

> **Nota**: O RF04 (Atualização de Conteúdo) já está parcialmente implementado no carrossel da home através do padrão de arquivos de configuração. Veja seção "Sistema de Administração de Conteúdo - Padrão Implementado" para detalhes.

### RF01: Sistema de Roteamento
- Implementar roteamento declarativo que carregue páginas internas
- Suportar lazy loading de componentes com React.lazy
- Fallback para página 404 quando rota não encontrada
- Manter estado de navegação ativo no Header

### RF02: API de Conteúdo
- Criar endpoint `GET /api/content/:slug` que retorne JSON estruturado
- Suportar múltiplos idiomas (locale) via query param opcional
- Retornar estrutura padronizada com seções, títulos, descrições, CTAs, mídias

### RF03: Hook de Conteúdo
- Desenvolver hook `useContent(slug, locale?)` que utilize TanStack Query
- Cache configurável por página com staleTime apropriado
- Validação de schema com Zod antes de retornar dados

### RF04: Atualização de Conteúdo
- Permitir atualização de conteúdo via edição de JSON sem rebuild do frontend
- Suportar hot-reload em desenvolvimento
- Versionamento de conteúdo para rollback se necessário

### RF05: Navegação Consistente
- Manter componente Header atualizado com estados de navegação ativos
- Suportar navegação mobile com menu hamburger
- Links sociais e contato sempre acessíveis

### RF06: Páginas Placeholder
- Disponibilizar estrutura básica para todas as rotas do menu
- Conteúdo placeholder profissional até conteúdo definitivo estar pronto
- Validação de estrutura antes de publicação

## Requisitos Não Funcionais

### RNF01: Performance
- Resposta da API em <250ms para conteúdo em memória/banco
- First Contentful Paint < 1.5s em conexão 3G rápida
- Time to Interactive < 3s

### RNF02: Disponibilidade
- Fallback offline mínimo (mostrar último conteúdo cacheado)
- Tratamento de erros graceful com mensagens amigáveis
- Retry automático em caso de falha temporária

### RNF03: Observabilidade
- Logs padronizados para todas as requisições `/api/content`
- Métricas de tempo de resposta
- Rastreamento de erros

### RNF04: Validação
- Schemas Zod compartilhados entre server e client
- Validação de entrada e saída em todas as APIs
- Type safety end-to-end

### RNF05: Manutenibilidade
- Nenhuma página deve exceder ~200 linhas
- Componentes reutilizáveis para seções comuns
- Documentação inline para decisões arquiteturais

## Modelo de Dados Proposto

### Tabela: `content_pages`
```sql
CREATE TABLE content_pages (
  id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR NOT NULL UNIQUE,
  locale VARCHAR NOT NULL DEFAULT 'pt-BR',
  payload JSONB NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Schema Zod Compartilhado
```typescript
// shared/content-schema.ts
export const contentPageSchema = z.object({
  slug: z.string(),
  locale: z.string().default('pt-BR'),
  sections: z.array(sectionSchema),
  metadata: z.object({
    title: z.string(),
    description: z.string().optional(),
    ogImage: z.string().optional(),
  }),
});

export const sectionSchema = z.discriminatedUnion('type', [
  heroSectionSchema,
  richTextSectionSchema,
  cardsGridSectionSchema,
  ctaSectionSchema,
]);
```

## Plano de Implementação Detalhado

### Fase 1: Arquitetura de Conteúdo
1. Definir schema Zod em `shared/content-schema.ts` com tipos de seções reutilizáveis
2. Criar migração inicial para tabela `content_pages`
3. Implementar repositório `contentRepository` com Drizzle ORM
4. Fallback in-memory para desenvolvimento sem banco

### Fase 2: Camada de Dados
1. Implementar `ContentRepository` com métodos CRUD
2. Popular seeds iniciais com conteúdo atual da home
3. Suportar múltiplos idiomas (preparação futura)
4. Cache em memória para performance

### Fase 3: API REST
1. Criar rota `GET /api/content/:slug` em `server/routes.ts`
2. Adicionar middleware de validação com Zod
3. Implementar cache-control headers apropriados
4. Logs estruturados para monitoramento

### Fase 4: Hook e Provider
1. Criar `useContent(slug, locale?)` em `client/src/hooks/use-content.ts`
2. Integrar com TanStack Query com configuração de cache
3. Validação client-side com Zod antes de renderizar
4. Provider opcional para pré-carregamento de dados críticos

### Fase 5: Páginas Internas
1. Criar componentes de seção reutilizáveis (`Hero`, `RichText`, `FeatureList`, etc.)
2. Gerar templates de página usando composição de seções
3. Configurar rotas no `App.tsx` com lazy loading
4. Implementar páginas: `/quem-somos`, `/produtos`, `/canal-denuncia`, `/lgpd`, `/contato`

### Fase 6: Infraestrutura
1. Ajustar scripts de build para incluir seeds se necessário
2. Documentar variáveis de ambiente necessárias
3. Criar `.env.example` com valores de exemplo
4. Configurar hot-reload para arquivos de conteúdo em dev

### Fase 7: QA & Documentação
1. Criar testes de contrato (Zod) para API
2. Testes de integração para hook `useContent`
3. Atualizar este PRD com fluxo de atualização de conteúdo
4. Documentar processo de deploy e rollback

## Estrutura de Conteúdo JSON

### Exemplo de Payload
```json
{
  "slug": "quem-somos",
  "locale": "pt-BR",
  "metadata": {
    "title": "Quem Somos - Titanium Implantes",
    "description": "Conheça a história e missão da Titanium Implantes",
    "ogImage": "/images/og-quem-somos.jpg"
  },
  "sections": [
    {
      "type": "hero",
      "title": "Comprometidos com a excelência em saúde",
      "subtitle": "Nossa missão é promover saúde e qualidade de vida",
      "image": "/images/hero-quem-somos.jpg",
      "cta": {
        "text": "Conheça nossos produtos",
        "link": "/produtos"
      }
    },
    {
      "type": "richText",
      "content": "<p>Texto formatado em HTML...</p>"
    },
    {
      "type": "cardsGrid",
      "title": "Nossos Valores",
      "cards": [
        {
          "icon": "Award",
          "title": "Qualidade Certificada",
          "description": "Produtos certificados..."
        }
      ]
    }
  ]
}
```

## Dependências Novas Necessárias

- `drizzle-orm` - Já instalado
- `@neondatabase/serverless` - Já instalado (para Postgres serverless)
- `zod` - Já instalado
- Considerar `superjson` para serialização avançada (opcional)

## Riscos e Mitigações

### Risco 1: Ausência de Banco em Ambientes Locais
**Mitigação**: Fallback in-memory com dados mockados carregados de arquivo JSON apenas em dev

### Risco 2: Carga Inicial Lenta
**Mitigação**: TanStack Query com staleTime alto e pré-carregamento na home

### Risco 3: Duplicação de Layout
**Mitigação**: Criar componentes de seção genéricos antes de criar páginas específicas

### Risco 4: SEO em SPA
**Mitigação**: Considerar Vite SSR ou export estático futuro; manter metadados configuráveis por página

## Métricas de Sucesso

- Tempo de carregamento ≤ 2.5s em 3G rápido
- Time to Interactive similar ou melhor que versão atual
- Possibilidade de atualizar conteúdo com alteração única no JSON
- Todas as rotas do menu funcionando com conteúdo válido
- Zero erros de TypeScript após implementação

## Roadmap Sugerido

### Sprint 1: Fundação (1-2 semanas)
- Schema Zod e repositório de conteúdo
- API REST básica funcionando
- Hook `useContent` integrado

### Sprint 2: Migração (1 semana)
- Migrar conteúdo da home para formato JSON
- Validar funcionamento end-to-end
- Ajustes de performance

### Sprint 3: Expansão (2 semanas)
- Criar páginas internas principais
- Componentes de seção reutilizáveis
- Testes de integração

### Sprint 4: Polimento (1 semana)
- Ajustes visuais finais
- Documentação completa
- Deploy e monitoramento

## Sistema de Administração de Conteúdo - Padrão Implementado

### Caso de Estudo: Carrossel da Home

O carrossel da página inicial implementa um padrão de administração de conteúdo que serve como referência para outras seções do site. Este padrão demonstra como separar dados de apresentação de forma eficiente e manutenível.

#### Arquitetura do Sistema

O sistema de administração do carrossel segue uma arquitetura em três camadas:

1. **Camada de Tipos** (`client/src/types/carousel.ts`)
   - Define interfaces TypeScript para type safety
   - Documenta a estrutura de dados esperada
   - Garante consistência entre configuração e componente

2. **Camada de Dados** (`client/src/data/carousel.ts`)
   - Arquivo de configuração centralizado
   - Contém todos os dados dos slides
   - Importa imagens usando alias `@assets`
   - Exporta objeto de configuração tipado

3. **Camada de Apresentação** (`client/src/components/Carousel.tsx`)
   - Componente React reutilizável
   - Aceita configuração padrão ou props customizadas
   - Lógica de apresentação isolada dos dados

#### Estrutura de Dados

```typescript
// client/src/types/carousel.ts
export interface CarouselSlide {
  id: string;                    // Identificador único
  image: string;                 // Caminho da imagem (import estático)
  title: string;                 // Título principal
  subtitle: string;              // Subtítulo/descrição
  buttonText?: string;           // Texto do botão (opcional)
  buttonLink?: string;          // Link de destino (opcional)
}

export interface CarouselConfig {
  slides: CarouselSlide[];
  autoplayInterval?: number;     // Intervalo em ms (padrão: 5000)
}
```

#### Arquivo de Configuração

```typescript
// client/src/data/carousel.ts
import type { CarouselConfig } from "@/types/carousel";
import slide1 from "@assets/slide-globus-without-title.jpg";
import slide2 from "@assets/slide-certificada.jpg";
import slide3 from "@assets/slide-medtronic.jpg";

export const carouselConfig: CarouselConfig = {
  slides: [
    {
      id: "1",
      image: slide1,
      title: "Parceria com a Globus",
      subtitle: "referência mundial em soluções para cirurgias de coluna.",
      buttonText: "Conheça nosso portfólio",
      buttonLink: "/produtos",
    },
    // ... mais slides
  ],
  autoplayInterval: 5000,
};
```

#### Como Administrar o Conteúdo

**Adicionar um novo slide:**
1. Adicionar imagem em `attached_assets/`
2. Importar imagem no topo de `carousel.ts`
3. Adicionar objeto ao array `slides`

**Modificar um slide existente:**
- Editar propriedades diretamente no objeto do slide em `carousel.ts`
- Alterações são refletidas automaticamente via hot reload

**Remover um slide:**
- Remover objeto do array `slides`

**Alterar intervalo de autoplay:**
- Modificar propriedade `autoplayInterval` no objeto de configuração

#### Vantagens deste Padrão

1. **Separação de Responsabilidades**
   - Dados separados da lógica de apresentação
   - Fácil localizar e editar conteúdo

2. **Type Safety**
   - TypeScript garante estrutura correta dos dados
   - Autocomplete e validação em tempo de desenvolvimento

3. **Manutenibilidade**
   - Edição de conteúdo sem tocar em código React
   - Documentação inline no arquivo de configuração

4. **Reutilização**
   - Componente aceita props customizadas ou usa config padrão
   - Pode ser usado em múltiplas páginas com configurações diferentes

5. **Hot Reload**
   - Alterações refletidas imediatamente em desenvolvimento
   - Não requer rebuild ou reinicialização do servidor

6. **Flexibilidade**
   - Suporta slides com ou sem conteúdo de texto
   - Overlay e botões aparecem apenas quando necessário

#### Estrutura de Arquivos

```
client/src/
├── components/
│   └── Carousel.tsx          # Componente de apresentação
├── data/
│   ├── carousel.ts           # Configuração dos slides
│   └── README.md            # Documentação de uso
└── types/
    └── carousel.ts           # Interfaces TypeScript
```

#### Documentação de Uso

O arquivo `client/src/data/README.md` contém documentação detalhada sobre como editar o carrossel, incluindo:
- Instruções passo a passo para adicionar/remover slides
- Como adicionar novas imagens
- Estrutura de dados completa
- Exemplos práticos

#### Aplicação do Padrão em Outras Seções

Este padrão pode ser replicado para outras seções do site seguindo a mesma estrutura:

1. **Criar tipos** em `client/src/types/[secao].ts`
2. **Criar configuração** em `client/src/data/[secao].ts`
3. **Criar componente** em `client/src/components/[Seccao].tsx`
4. **Documentar** em `client/src/data/README.md` ou arquivo específico

**Exemplo de seções candidatas:**
- Categorias de produtos (`ProductCategories`)
- Seções institucionais (`InstitutionalSection`)
- CTAs (`CTASection`)
- Rodapé (`Footer`)

#### Próximos Passos para Expansão

Para evoluir este padrão para um sistema mais robusto:

1. **Migração para JSON + API**
   - Manter estrutura atual como fallback
   - Adicionar endpoint `/api/content/carousel`
   - Hook `useCarousel()` com TanStack Query

2. **Validação com Zod**
   - Criar schema Zod baseado nas interfaces TypeScript
   - Validar dados em runtime antes de renderizar

3. **Admin Interface** (futuro)
   - Interface visual para edição
   - Upload de imagens integrado
   - Preview em tempo real

4. **Versionamento**
   - Histórico de alterações
   - Rollback para versões anteriores
   - Deploy controlado

## Governança e Manutenção

### Processo de Atualização de Conteúdo

**Padrão Atual (Carrossel e similares):**
1. Editar arquivo de configuração em `client/src/data/[secao].ts`
2. Hot reload automático em desenvolvimento
3. Build e deploy para produção

**Padrão Futuro (Conteúdo via API):**
1. Editar JSON de conteúdo (via admin futuro ou diretamente no banco)
2. Validação automática via Zod antes de salvar
3. Deploy automático via CI/CD (futuro)
4. Rollback via versionamento de conteúdo

### Padrões de Código
- Componentes funcionais com TypeScript
- Hooks customizados para lógica reutilizável
- Separação clara entre apresentação e lógica de negócio
- Testes unitários para utilitários críticos

### Documentação Contínua
- Manter este PRD atualizado com mudanças arquiteturais
- Documentar decisões técnicas em ADRs (Architecture Decision Records)
- Guias de contribuição para novos desenvolvedores

## Análise de Escalabilidade e Manutenibilidade

### Padrão Atual Implementado

O sistema de administração do carrossel demonstra um padrão funcional e escalável que já está em produção:

- **Separação de dados e apresentação**: Conteúdo editável sem modificar componentes React
- **Type safety**: TypeScript garante consistência estrutural
- **Hot reload**: Alterações refletidas imediatamente em desenvolvimento
- **Documentação inline**: Instruções claras para manutenção

Este padrão pode ser replicado para outras seções do site, criando uma base consistente antes da migração completa para API + banco de dados.

### Migração Futura

A migração para conteúdo gerenciado por JSON validado (via API) melhora significativamente a escalabilidade editorial: novas páginas podem ser publicadas sem alterar código, e o uso de schemas compartilhados reduz riscos de inconsistência.

O uso de componentes reutilizáveis mantém a base de código enxuta e facilita expansão futura para outros idiomas ou temas. Recomenda-se planejar desde já um mecanismo de cache (ex: `etag` ou `s-maxage`) e considerar futura renderização híbrida (SSR/SSG) caso SEO e performance sejam críticos.

**Estratégia de Migração Gradual:**
1. Manter padrão atual (arquivos de configuração) como base
2. Adicionar camada de API opcional que lê dos mesmos arquivos
3. Migrar gradualmente para banco de dados mantendo compatibilidade
4. Implementar admin interface quando necessário

## Conclusão

Este PRD estabelece a base técnica para evoluir o site da Titanium Implantes de uma landing page estática para uma aplicação web moderna, escalável e fácil de manter. A arquitetura proposta prioriza flexibilidade, performance e experiência do desenvolvedor, preparando o projeto para crescimento futuro.

