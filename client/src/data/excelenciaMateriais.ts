import type { ExcelenciaMateriaisConfig } from "@/types/excelenciaMateriais";

/**
 * Configuração dinâmica da seção Excelência em Materiais Cirúrgicos
 * 
 * Para editar o conteúdo da seção, modifique as propriedades abaixo.
 */
export const excelenciaMateriaisConfig: ExcelenciaMateriaisConfig = {
  ativo: true,
  tituloSessao: "NOSSO COMPROMISSO COM A QUALIDADE",
  titulo: "Excelência em Materiais Cirúrgicos",
  descricao:
    "Produtos inovadores que atendem às demandas dos profissionais de saúde com qualidade e segurança.\n\nDistribuição Especializada para Coluna, Neurocirurgia, Bucomaxilofacial e Otorrino.",
  textoLateral:
    "Nossos diferenciais se baseiam na excelência operacional e na confiança em cada etapa do seu atendimento médico. Inovamos continuamente para entregar resultados com a agilidade e precisão que a saúde exige.",
  kpis: [
    {
      id: "1",
      titulo: "Equipe qualificada:",
      subtitulo: "treinamento contínuo para expertise e excelência.",
      numero: "87%",
      legenda: "de satisfação.",
    },
    {
      id: "2",
      titulo: "Logística eficiente:",
      subtitulo: "entrega rápida, segura e no prazo.",
      numero: "92%",
      legenda: "de performance.",
    },
    {
      id: "3",
      titulo: "Atendimento ágil:",
      subtitulo: "respostas imediatas e soluções no momento.",
      numero: "82%",
      legenda: "de eficiência.",
    },
  ],
};

