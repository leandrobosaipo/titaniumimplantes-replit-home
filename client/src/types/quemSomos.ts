/**
 * Interface para configuração da seção Quem Somos
 * 
 * Define a estrutura de dados para administração do conteúdo da seção,
 * seguindo o mesmo padrão arquitetural do carrossel.
 */
export interface QuemSomosConfig {
  /** Se a seção deve ser exibida */
  ativo: boolean;
  /** Caminho da imagem de background (pode ser import estático ou URL) */
  backgroundImage: string;
  /** Título da sessão (badge/selo) */
  tituloSessao?: string;
  /** Título principal da seção */
  titulo: string;
  /** Descrição/texto principal da seção */
  descricao: string;
  /** Se o botão de ação deve ser exibido */
  mostrarBotao?: boolean;
  /** Texto do botão de ação (opcional) */
  textoBotao?: string;
  /** Link de destino do botão (opcional, requer mostrarBotao) */
  linkBotao?: string;
}

