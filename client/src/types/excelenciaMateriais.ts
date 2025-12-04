/**
 * Interface para configuração de card de KPI
 * 
 * Cada card representa um indicador de performance com título, número e legenda.
 */
export interface KPICard {
  /** Identificador único do KPI */
  id: string;
  /** Título do KPI (ex: "Equipe qualificada: treinamento contínuo...") */
  titulo: string;
  subtitulo: string;
  /** Número/percentual do KPI (ex: "87%") */
  numero: string;
  /** Legenda do KPI (ex: "de satisfação.") */
  legenda: string;
}

/**
 * Interface para configuração da seção Excelência em Materiais Cirúrgicos
 * 
 * Define a estrutura de dados para administração do conteúdo da seção,
 * seguindo o mesmo padrão arquitetural das outras seções.
 */
export interface ExcelenciaMateriaisConfig {
  /** Se a seção deve ser exibida */
  ativo: boolean;
  /** Título da sessão (badge/selo) - "NOSSO COMPROMISSO COM A QUALIDADE" */
  tituloSessao: string;
  /** Título principal da seção - "Excelência em Materiais Cirúrgicos" */
  titulo: string;
  /** Parágrafo institucional (coluna esquerda) */
  descricao: string;
  /** Texto institucional completo (coluna direita, linha 1) */
  textoLateral: string;
  /** Array de KPIs a serem exibidos */
  kpis: KPICard[];
}

