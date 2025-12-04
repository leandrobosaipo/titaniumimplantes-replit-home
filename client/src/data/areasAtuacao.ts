import type { AreasAtuacaoConfig } from "@/types/areasAtuacao";
import colunaBg from "@assets/coluna-bg-solucoes.jpg";
import colunaIcone from "@assets/coluna-icone-bg-solucoes.jpg";
import neurologiaBg from "@assets/neurologia-bg-solucoes.jpg";
import neurologiaIcone from "@assets/neurologia-icone-bg-solucoes.jpg";
import bucomaxilfacialBg from "@assets/bucomaxilfacial-bg-solucoes.jpg";
import bucomaxilfacialIcone from "@assets/bucomaxilfacial-icone-bg-solucoes.jpg";
import otorrinolaringologiaBg from "@assets/otorrinolaringologia-bg-solucoes.jpg";
import otorrinolaringologiaIcone from "@assets/otorrinolaringologia-icone-bg-solucoes.jpg";

/**
 * Configuração dinâmica da seção Áreas de Atuação
 * 
 * Para editar o conteúdo da seção, modifique as propriedades abaixo.
 * Para trocar imagens, adicione novas imagens em attached_assets/ e atualize os imports.
 */
export const areasAtuacaoConfig: AreasAtuacaoConfig = {
  ativo: true,
  tituloSessao: "ÁREAS DE ATUAÇÃO",
  titulo: "Soluções em saúde para especialidades cirúrgicas.",
  subtitulo: "Especialidades atendidas: Coluna, Neurocirurgia, Bucomaxilfacial e Otorrinolaringologia.",
  especialidades: [
    {
      id: "1",
      titulo: "Coluna",
      descricao: "Sistemas de fixação, espaçadores cervicais e dispositivos que promovem a estabilidade e a segurança em cirurgias de coluna.",
      imagem: colunaBg,
      icone: colunaIcone,
    },
    {
      id: "2",
      titulo: "Neurocirurgia",
      descricao: "Produtos como neuronavegadores, válvulas para hidrocefalia e clipes neurocirúrgicos, desenvolvidos para procedimentos de alta complexidade.",
      imagem: neurologiaBg,
      icone: neurologiaIcone,
    },
    {
      id: "3",
      titulo: "Bucomaxilofacial",
      descricao: "Soluções para cirurgias que envolvem a região facial, com sistemas de fixação especializados e suporte para procedimentos crânio-maxilo-faciais.",
      imagem: bucomaxilfacialBg,
      icone: bucomaxilfacialIcone,
    },
    {
      id: "4",
      titulo: "Otorrinolaringologia",
      descricao: "Equipamentos como aspiradores ultrassônicos e kits específicos para cirurgias otorrinolaringológicas, garantindo precisão e eficácia.",
      imagem: otorrinolaringologiaBg,
      icone: otorrinolaringologiaIcone,
    },
  ],
};

