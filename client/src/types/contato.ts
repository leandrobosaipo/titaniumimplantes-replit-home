/**
 * Interface para configuração da seção de Contato
 * 
 * Define a estrutura de dados para administração do conteúdo da seção,
 * seguindo o mesmo padrão arquitetural das outras seções.
 */
export interface ContatoConfig {
  /** Se a seção deve ser exibida */
  ativo: boolean;
  /** Título principal da seção */
  titulo: string;
  /** Descrição/texto institucional da seção */
  descricao: string;
  /** URL do webhook para envio do formulário */
  webhookUrl: string;
}

