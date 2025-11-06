# Titanium Implantes - Homepage Institucional

## Visão Geral
Homepage institucional corporativa para a Titanium Implantes, empresa especializada em materiais cirúrgicos e implantes médicos. O projeto foi desenvolvido com foco em design profissional, responsividade e otimização para SEO.

## Tecnologias Utilizadas
- **Frontend**: React 18 + TypeScript
- **Estilização**: Tailwind CSS + Shadcn UI
- **Roteamento**: Wouter
- **Build**: Vite
- **Tipografia**: Montserrat (Google Fonts)

## Estrutura do Projeto

### Páginas
- **Home** (`/`): Página principal com todas as seções institucionais

### Componentes Principais
- **Header**: Cabeçalho fixo com logo, navegação e redes sociais
- **Carousel**: Carrossel automático de 3 slides com controles
- **WelcomeSection**: Seção de boas-vindas com missão da empresa
- **ProductCategories**: Grade de 3 categorias de produtos
- **CTASection**: Call-to-action destacado em azul
- **InstitutionalSection**: Seção "Quem Somos" com destaques
- **Footer**: Rodapé completo com informações de contato

### Design System
- **Cor Principal**: Azul escuro (#002776 / HSL 218 100% 23%)
- **Fonte**: Montserrat (300, 400, 500, 600, 700, 800)
- **Espaçamento**: Sistema consistente seguindo Tailwind
- **Componentes**: Shadcn UI para elementos reutilizáveis

### Recursos
- ✅ Design responsivo (mobile-first)
- ✅ Carrossel com auto-play e controles manuais
- ✅ Menu mobile com hamburger
- ✅ Animações suaves com hover/active states
- ✅ SEO otimizado com meta tags
- ✅ Acessibilidade (ARIA labels, alt texts)
- ✅ Ícones de redes sociais
- ✅ HTML semântico

## Arquitetura

### Schema (`shared/schema.ts`)
Define os tipos TypeScript para slides do carrossel e categorias de produtos.

### Assets
Imagens fornecidas pelo cliente armazenadas em `attached_assets/`:
- Logo e banners do carrossel
- Imagens institucionais
- Logos de parceiros

### Roteamento
- Configurado via Wouter
- Rotas preparadas para expansão futura (Quem Somos, Produtos, etc.)

## Próximos Passos (Fases Futuras)
1. Implementar páginas internas (Quem Somos, Produtos, Contato, etc.)
2. Adicionar formulário de contato funcional
3. Sistema de gerenciamento de conteúdo (CMS)
4. Integração com Google Analytics
5. Sistema de busca de produtos

## Desenvolvimento
```bash
npm run dev  # Inicia o servidor de desenvolvimento
```

O workflow "Start application" executa o servidor Express + Vite na porta 5000.

## Última Atualização
06 de Novembro de 2025 - Implementação inicial da homepage com todos os componentes principais
