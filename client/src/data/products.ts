/**
 * Configuração de Produtos
 * 
 * ESTRUTURA DE IMAGENS:
 * 
 * As imagens dos produtos devem ser organizadas na pasta:
 * attached_assets/produtos/
 * 
 * Padrão de nomenclatura:
 * - Imagem principal: [slug-produto]-main.jpg
 * - Imagens adicionais: [slug-produto]-1.jpg, [slug-produto]-2.jpg, etc.
 * 
 * Exemplo:
 * - produto-dbs-percept-main.jpg
 * - produto-dbs-percept-1.jpg
 * - produto-dbs-percept-2.jpg
 * 
 * Para importar:
 * import produtoMain from "@assets/produtos/[slug]-main.jpg";
 */

import type { ProductsPageConfig } from "@/types/products";
import colunaImg from "@assets/coluna-bg-solucoes.jpg";
import neuroImg from "@assets/neurologia-bg-solucoes.jpg";
import bucoImg from "@assets/bucomaxilfacial-bg-solucoes.jpg";
import otorrinoImg from "@assets/otorrinolaringologia-bg-solucoes.jpg";
import heroImg from "@assets/home-topo_1762428378908.jpeg";
import estruturaImg from "@assets/home-slide_1762428378908.jpeg";

import syncromedImg from "@assets/SynchroMed-II.jpg";
import neuroestimuladorImg from "@assets/Neuroestimulador-Intellis.jpg";
import dbsPerceptImg from "@assets/DBS-Percept-RC.jpg";
import dvpStrataImg from "@assets/DVP-Strata-II.jpg";

import neuronavegadorImg from "@assets/percept-rc-front-and-side.avif";
import aspiradorImg from "@assets/Aspirador-Ultrassonico-Sonoca-300-Soring.webp";
import espacadorImg from "@assets/Espacador-Cervical-COALITION-MIS-Globus.jpg";
import valvulasImg from "@assets/Valvulas-para-Hidrocefalia-Pressao-Fixa-ATLAS.jpg";

export const productsConfig: ProductsPageConfig = {
  categories: [
    { id: "all", slug: "todos", label: "Todos os Produtos" },
    { id: "premium", slug: "linha-premium", label: "Linha Premium" },
    { id: "coluna", slug: "coluna", label: "Coluna" },
    { id: "neuro", slug: "neurocirurgia", label: "Neurocirurgia" },
    { id: "buco", slug: "bucomaxilofacial", label: "Bucomaxilofacial" },
    { id: "otorrino", slug: "otorrinolaringologia", label: "Otorrinolaringologia" },
  ],
  products: [
    {
      id: "1",
      slug: "percept-rc-neuroestimulador-medtronic",
      categoryId: "neuro",
      title: "Percept™ RC Neuroestimulador – Medtronic",
      description:
        "Sistema de neuroestimulação profunda (DBS) recarregável com tecnologia BrainSense™ para sensoriamento real-time e programação avançada.",
      fullDescription:
        "O Percept™ RC é um sistema de neuroestimulação cerebral profunda (DBS) recarregável desenvolvido pela Medtronic, líder mundial em tecnologias médicas. Equipado com a tecnologia exclusiva BrainSense™, este neuroestimulador representa uma evolução significativa no tratamento de distúrbios do movimento e condições neurológicas, oferecendo monitoramento cerebral em tempo real e terapias personalizadas adaptativas.",
      mainImage: neuronavegadorImg, // Placeholder: substituir por produto-percept-rc-neuroestimulador-medtronic-main.jpg
      images: [neuronavegadorImg],
      anvisa: "10349001320",
    },
    {
      id: "2",
      slug: "synchromed-ii-bomba-infusao-implantavel-medtronic",
      categoryId: "neuro",
      title: "SynchroMed™ II – Bomba de Infusão Implantável – Medtronic",
      description:
        "Sistema de bomba de infusão implantável e programável que entrega medicamentos diretamente no espaço intratecal via cateter.",
      fullDescription:
        "Sistema de bomba de infusão implantável e programável que entrega medicamentos diretamente no espaço intratecal via cateter, usado para terapia de dor crônica intratável e espasticidade. Oferece fluxo preciso e programações personalizadas para necessidades terapêuticas específicas.",
      mainImage: syncromedImg, // Placeholder: substituir por produto-synchromed-ii-main.jpg
      images: [syncromedImg],
      anvisa: "10349001240",
    },
    {
      id: "3",
      slug: "neuroestimulador-intellis-medtronic",
      categoryId: "coluna",
      title: "Neuroestimulador Intellis™ – Medtronic",
      description:
        "Sistema de estimulação da medula espinhal recarregável com tecnologia AdaptiveStim™ para alívio de dor crônica neuropática e intratável.",
      fullDescription:
        "Sistema de estimulação da medula espinhal recarregável com tecnologia AdaptiveStim™ para alívio de dor crônica neuropática e intratável. Projeto compacto com bateria Overdrive™, recarga rápida (~1h) e relatórios Snapshot™ para monitoramento objetivo da terapia.",
      mainImage: neuroestimuladorImg, // Placeholder: substituir por produto-neuroestimulador-intellis-main.jpg
      images: [neuroestimuladorImg],
      anvisa: "1034900",
    },
    {
      id: "4",
      slug: "dvp-strata-ii-medtronic",
      categoryId: "neuro",
      title: "DVP Strata™ II – Medtronic",
      description:
        "Sistema de válvula de derivação ventricular peritoneal com ajuste de pressão para tratamento de hidrocefalia e controle de fluxo de líquido cerebrospinal.",
      fullDescription:
        "Sistema de válvula de derivação ventricular peritoneal com ajuste de pressão, usado no tratamento de hidrocefalia para controlar o fluxo de líquido cerebrospinal e reduzir complicações associadas à hipertensão intracraniana.",
      mainImage: dvpStrataImg, // Placeholder: substituir por produto-dvp-strata-ii-main.jpg
      images: [dvpStrataImg],
      anvisa: "10339190739",
    },
    {
      id: "5",
      slug: "neuronavegador-brainlab",
      categoryId: "neuro",
      title: "Neuronavegador – Brainlab",
      description:
        "Sistema de neuronavegação cirúrgica para orientação tridimensional em tempo real durante procedimentos neurológicos.",
      fullDescription:
        "Sistema de neuronavegação cirúrgica para orientação tridimensional em tempo real durante procedimentos neurológicos. Suporta planejamento pré-operatório e assistência precisa na localização de estruturas cerebrais e espinais.",
      mainImage: neuroImg, // Placeholder: substituir por produto-neuronavegador-brainlab-main.jpg
      images: [neuroImg],
      anvisa: "80263050053",
    },
    {
      id: "6",
      slug: "aspirador-ultrassonico-sonoca-300-soring",
      categoryId: "neuro",
      title: "Aspirador Ultrassônico Sonoca 300 – Soring",
      description:
        "Aspirador ultrassônico cirúrgico para remoção de tecido com precisão e preservação de tecidos nobres em procedimentos neurocirúrgicos.",
      fullDescription:
        "Aspirador ultrassônico cirúrgico para remoção de tecido com precisão e preservação de tecidos nobres. Indicado em procedimentos neurocirúrgicos e ortopédicos, com controle de energia ultrassônica e irrigação integrada.",
      mainImage: aspiradorImg, // Placeholder: substituir por produto-aspirador-ultrassonico-sonoca-300-main.jpg
      images: [aspiradorImg],
      anvisa: "10171610052",
    },
    {
      id: "7",
      slug: "espacador-cervical-coalition-mis-globus",
      categoryId: "coluna",
      title: "Espaçador Cervical COALITION MIS – Globus",
      description:
        "Espaçador cervical intersomático MIS em titânio com perfis anatômicos e placas de fixação integradas para estabilização segmentar.",
      fullDescription:
        "Espaçador cervical intersomático MIS em titânio com perfis anatômicos e placas de fixação integradas, projetado para estabilização segmentar em cirurgias minimamente invasivas da coluna cervical.",
      mainImage: colunaImg, // Placeholder: substituir por produto-espacador-cervical-coalition-mis-main.jpg
      images: [colunaImg],
    },
    {
      id: "8",
      slug: "valvulas-hidrocefalia-pressao-fixa-atlas",
      categoryId: "neuro",
      title: "Válvulas para Hidrocefalia – Pressão Fixa ATLAS",
      description:
        "Válvulas de pressão fixa para derivação ventricular em regimes terapêuticos de hidrocefalia com fluxo estável de líquido cerebrospinal.",
      fullDescription:
        "Válvulas de pressão fixa para derivação ventricular em regimes terapêuticos de hidrocefalia, projetadas para manutenção de fluxo estável de líquido cerebrospinal e redução de riscos de sobre-drenagem.",
      mainImage: neuroImg, // Placeholder: substituir por produto-valvulas-hidrocefalia-atlas-main.jpg
      images: [neuroImg],
    },
  ],
  itemsPerPage: 6,
};
