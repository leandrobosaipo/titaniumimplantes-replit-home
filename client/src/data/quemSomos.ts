import type { QuemSomosConfig } from "@/types/quemSomos";
import bgQuemSomos from "@assets/bg-quem-somos-home.jpg";

/**
 * Configuração dinâmica da seção Quem Somos
 * 
 * Para editar o conteúdo da seção, modifique as propriedades abaixo.
 * Para trocar o background, adicione a nova imagem em attached_assets/ e atualize o import.
 */
export const quemSomosConfig: QuemSomosConfig = {
  ativo: true,
  backgroundImage: bgQuemSomos,
  tituloSessao: "QUEM SOMOS",
  titulo: "Nossa missão é promover saúde e qualidade de vida com inovação e produtos de excelência.",
  descricao:
    "A Titanium Implantes tem o compromisso de gerar confiança por meio de produtos cirúrgicos de alta tecnologia. Visamos ser referência nacional em qualidade, evoluindo continuamente e respeitando os profissionais e pacientes que fazem parte de nossa jornada.",
  mostrarBotao: true,
  textoBotao: "Conheça nossa história",
  linkBotao: "/quem-somos",
};

