/**
 * Interface para configuração de páginas internas
 * 
 * Segue o padrão de administração via JSON estabelecido nas outras seções.
 * Permite que conteúdo seja gerenciado centralizadamente em data/pages.ts
 */
export interface PageConfig {
  /** Caminho da rota (ex: "/quem-somos") */
  path: string;
  /** Título da página para SEO e title tag */
  title: string;
  /** Meta description para SEO */
  description: string;
  /** Texto do H1 da página */
  h1: string;
  /** Conteúdo futuro da página (opcional por enquanto) */
  content?: string;
}

