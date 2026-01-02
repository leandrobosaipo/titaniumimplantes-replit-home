import type { LgpdPageConfig } from "@/types/lgpdPage";
import isoImg from "@assets/lgpd/iso.jpg";
import fdaImg from "@assets/lgpd/fda.jpg";
import anvisaImg from "@assets/lgpd/anvisa.jpg";
import abntImg from "@assets/lgpd/abnt.jpg";
import destaqueMaterialImg from "@assets/lgpd/destaques_do_material-removebg-preview.png";
import complianceImg from "@assets/lgpd/compliance_e_etica.jpg";

export const lgpdPageConfig: LgpdPageConfig = {
  breadcrumb: "Certificações, Compliance e LGPD",
  secaoCertificacoes: {
    titulo: "Certificações e qualidade",
    itens: [
      {
        id: "1",
        img: isoImg,
        label: "ISO 13485:2016",
        sublabel: "Gestão de qualidade em dispositivos médicos.",
      },
      {
        id: "2",
        img: fdaImg,
        label: "FDA Approved",
        sublabel: "Segurança e eficácia aprovadas internacionalmente.",
      },
      {
        id: "3",
        img: anvisaImg,
        label: "ANVISA",
        sublabel: "Conformidade com as normas brasileiras de saúde.",
      },
      {
        id: "4",
        img: abntImg,
        label: "Normas Técnicas",
        sublabel: "ASTM F136-8e1, ISO 14801, ISO 10993.",
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
