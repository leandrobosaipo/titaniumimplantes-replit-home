/**
 * Interface para configuração da seção Certificações, Compliance e LGPD
 * 
 * Define a estrutura de dados para administração do conteúdo da seção,
 * seguindo o mesmo padrão arquitetural das outras seções.
 */
export interface CertificacoesConfig {
  /** Se a seção deve ser exibida */
  ativo: boolean;
  /** Caminho da imagem (coluna esquerda) - pode ser import estático ou URL */
  imagem: string;
  /** Título da sessão (badge/selo) - "CERTIFICAÇÕES, COMPLIANCE E LGPD" */
  tituloSessao: string;
  /** Texto institucional da coluna direita */
  textoInstitucional: string;
  /** Se o botão de ação deve ser exibido */
  mostrarBotao?: boolean;
  /** Texto do botão de ação (opcional) */
  textoBotao?: string;
  /** Link de destino do botão (opcional, requer mostrarBotao) */
  linkBotao?: string;
}

