import type { LgpdPageConfig } from "@/types/lgpdPage";
import certificacaoImg from "@assets/certificacoes-lgpd.png";
import destaqueMaterialImg from "@assets/home-topo_1762428378908.jpeg";
import complianceImg from "@assets/eticaesaude.png";

export const lgpdPageConfig: LgpdPageConfig = {
  breadcrumb: "Certificações, Compliance e LGPD",
  secaoCertificacoes: {
    titulo: "Certificações e qualidade",
    itens: [
      {
        id: "1",
        img: certificacaoImg,
        label: "ISO 13485:2016",
        sublabel: "Gestão de qualidade em dispositivos médicos.",
      },
      {
        id: "2",
        img: certificacaoImg,
        label: "FDA Approved",
        sublabel: "Segurança e eficácia aprovadas internacionalmente.",
      },
      {
        id: "3",
        img: certificacaoImg,
        label: "ANVISA",
        sublabel: "Conformidade com as normas brasileiras de saúde.",
      },
      {
        id: "4",
        img: certificacaoImg,
        label: "Normas Técnicas",
        sublabel: "ASTM F136, ISO 5832-3, ISO 52640.",
      },
    ],
  },
  secaoDestaques: {
    titulo: "Destaques do material",
    imagem: destaqueMaterialImg,
    pills: ["Osseointegração", "Resistência à corrosão", "Não toxicidade", "Durabilidade"],
  },
  secaoKpis: {
    titulo: "Controle de qualidade",
    kpis: [
      { id: "1", valor: "98%", label: "Taxa de sucesso", tipo: "circle" },
      { id: "2", valor: "+25", label: "anos de experiência", tipo: "stars" },
      { id: "3", valor: "100%", label: "Rastreabilidade", tipo: "bar" },
    ],
  },
  secaoCompliance: {
    titulo: "Compliance e Ética",
    descricao: "O compliance garante decisões e operações alinhadas à ética e legislação.",
    imagem: complianceImg,
    lista: [
      "Compliance Officer: Vinícius Almeida",
      "Comitê de Ética: revisão de políticas, análise de ocorrências, relatórios e promoção de cultura",
    ],
  },
  secaoLgpd: {
    titulo: "LGPD Proteção de Dados",
    cards: [
      { id: "1", icone: "search", texto: "Confirmação e acesso aos seus dados" },
      { id: "2", icone: "edit", texto: "Correção, eliminação e portabilidade" },
      { id: "3", icone: "undo", texto: "Revogação do consentimento" },
      { id: "4", icone: "share", texto: "Informação sobre compartilhamento" },
    ],
  },
  secaoDireitos: {
    titulo: "Como exercer seus direitos",
    contatos: [
      { tipo: "email", valor: "contratos@titaniunimplantes.com.br" },
      { tipo: "tel", valor: "(65) 3025-5625" },
      { tipo: "map", valor: "Av. Historiador Rubens de Mendonça 2368, Sala 1101, Cuiabá, MT" },
    ],
    seguranca:
      "Segurança implementada: criptografia, controle de acesso, monitoramento e treinamento contínuo da equipe.",
  },
};
