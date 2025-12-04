import type { CertificacoesConfig } from "@/types/certificacoes";
import certificacoesImg from "@assets/certificacoes-lgpd.png";

/**
 * Configuração dinâmica da seção Certificações, Compliance e LGPD
 * 
 * Para editar o conteúdo da seção, modifique as propriedades abaixo.
 * Para trocar a imagem, adicione a nova imagem em attached_assets/ e atualize o import.
 */
export const certificacoesConfig: CertificacoesConfig = {
  ativo: true,
  imagem: certificacoesImg,
  tituloSessao: "CERTIFICAÇÕES, COMPLIANCE E LGPD",
  textoInstitucional:
    "Na Titanium Implantes, seguimos os mais rigorosos padrões internacionais de qualidade, segurança e ética. Nosso compromisso é oferecer produtos confiáveis e processos transparentes, garantindo a confiança de profissionais da saúde, pacientes e parceiros.",
  mostrarBotao: true,
  textoBotao: "Saiba mais",
  linkBotao: "/lgpd",
};

