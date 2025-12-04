/**
 * Interface para configuração de card de especialidade
 * 
 * Cada card representa uma área de atuação com imagem, ícone, título e descrição.
 */
export interface EspecialidadeCard {
  /** Identificador único da especialidade */
  id: string;
  /** Título da especialidade */
  titulo: string;
  /** Descrição curta da especialidade */
  descricao: string;
  /** Descrição longa otimizada para SEO (100-150 palavras) */
  descricaoLonga?: string;
  /** Caminho da imagem de background (pode ser import estático ou URL) */
  imagem: string;
  /** Caminho da imagem do ícone circular (pode ser import estático ou URL) */
  icone: string;
}

/**
 * Interface para configuração da seção Áreas de Atuação
 * 
 * Define a estrutura de dados para administração do conteúdo da seção,
 * seguindo o mesmo padrão arquitetural do carrossel e Quem Somos.
 */
export interface AreasAtuacaoConfig {
  /** Se a seção deve ser exibida */
  ativo: boolean;
  /** Título da sessão (badge/selo) */
  tituloSessao?: string;
  /** Título principal da seção */
  titulo: string;
  /** Subtítulo/legenda da seção */
  subtitulo: string;
  /** Array de especialidades/cards a serem exibidos */
  especialidades: EspecialidadeCard[];
}

