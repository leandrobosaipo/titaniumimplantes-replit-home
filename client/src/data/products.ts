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
import { productExcelOverrides } from "@/data/productsExcelOverrides";
import colunaImg from "@assets/coluna-bg-solucoes.jpg";
import neuroImg from "@assets/neurologia-bg-solucoes.jpg";
import bucoImg from "@assets/bucomaxilfacial-bg-solucoes.jpg";
import otorrinoImg from "@assets/otorrinolaringologia-bg-solucoes.jpg";
import heroImg from "@assets/home-topo_1762428378908.jpeg";
import estruturaImg from "@assets/home-slide_1762428378908.jpeg";

import syncromedMain from "@assets/produtos/synchromed-ii-bomba-infusao-implantavel-medtronic-main.jpg";
import neuroestimuladorMain from "@assets/produtos/neuroestimulador-intellis-medtronic-main.jpg";
import dbsPerceptImg from "@assets/DBS-Percept-RC.jpg";
import dvpStrataMain from "@assets/produtos/dvp-strata-ii-medtronic-main.jpg";
import dvpStrata1 from "@assets/produtos/dvp-strata-ii-medtronic-1.jpg";

import neuronavegadorMain from "@assets/produtos/neuronavegador-brainlab-main.jpg";
import neuronavegador1 from "@assets/produtos/neuronavegador-brainlab-1.jpg";
import aspiradorMain from "@assets/produtos/aspirador-ultrassonico-sonoca-300-soring-main.jpg";
import aspirador1 from "@assets/produtos/aspirador-ultrassonico-sonoca-300-soring-1.jpg";
import espacadorMain from "@assets/produtos/espacador-cervical-coalition-mis-globus-main.jpg";
import valvulasImg from "@assets/Valvulas-para-Hidrocefalia-Pressao-Fixa-ATLAS.jpg";

// Produtos (catálogo + novos)
import midasRexMr8Main from "@assets/produtos/midas-rex-mr8-medtronic-main.jpg";
import midasRexMr8_1 from "@assets/produtos/midas-rex-mr8-medtronic-1.jpg";
import midasRexMr8_2 from "@assets/produtos/midas-rex-mr8-medtronic-2.jpg";

import alteraMain from "@assets/produtos/altera-globus-main.jpg";
import altera1 from "@assets/produtos/altera-globus-1.jpg";

import riseIntralifMain from "@assets/produtos/rise-intralif-globus-main.jpg";
import riseIntralif1 from "@assets/produtos/rise-intralif-globus-1.jpg";

import riseLMain from "@assets/produtos/rise-l-globus-main.jpg";
import riseL1 from "@assets/produtos/rise-l-globus-1.jpg";

import sustainArchMain from "@assets/produtos/sustain-arch-globus-main.jpg";

import independenceGmMain from "@assets/produtos/independence-gm-sistema-de-fusao-intersomatica-anterior-globus-main.jpg";
import independenceGm1 from "@assets/produtos/independence-gm-sistema-de-fusao-intersomatica-anterior-globus-1.jpg";

import revereMain from "@assets/produtos/revere-sistema-de-estabilizacao-globus-main.jpg";
import revere1 from "@assets/produtos/revere-sistema-de-estabilizacao-globus-1.jpg";

import revolveMain from "@assets/produtos/revolve-sistema-de-fixacao-suplementar-percutaneo-globus-main.jpg";
import revolve1 from "@assets/produtos/revolve-sistema-de-fixacao-suplementar-percutaneo-globus-1.jpg";

import coalitionGmMain from "@assets/produtos/coalition-gm-globus-main.jpg";

import assureMain from "@assets/produtos/assure-placa-cervical-anterior-globus-main.jpg";
import assure1 from "@assets/produtos/assure-placa-cervical-anterior-globus-1.jpg";

import eSpineMain from "@assets/produtos/e-spine-angel-care-solutions-main.jpg";
import nemostMain from "@assets/produtos/nemost-angel-care-solutions-main.jpg";
import eSpineTanitMain from "@assets/produtos/e-spine-tanit-angel-care-solutions-main.jpg";
import eSpineTanit1 from "@assets/produtos/e-spine-tanit-angel-care-solutions-1.jpg";

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
      mainImage: dbsPerceptImg,
      images: [dbsPerceptImg],
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
      mainImage: syncromedMain,
      images: [syncromedMain],
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
      mainImage: neuroestimuladorMain,
      images: [neuroestimuladorMain],
      anvisa: "10349001101",
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
      mainImage: dvpStrataMain,
      images: [dvpStrataMain, dvpStrata1],
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
      mainImage: neuronavegadorMain,
      images: [neuronavegadorMain, neuronavegador1],
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
      mainImage: aspiradorMain,
      images: [aspiradorMain, aspirador1],
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
      mainImage: espacadorMain,
      images: [espacadorMain],
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
    // Produtos importados do catálogo extraído
    {
      id: "9",
      slug: "midas-rex-mr8-medtronic",
      categoryId: "otorrino",
      title: "Midas Rex™ MR8™ – Medtronic",
      description:
        "Sistema de perfuração de alta velocidade para procedimentos cirúrgicos de coluna, crânio, otorrinolaringologia, ortopedia e outros.",
      fullDescription:
        "O sistema de perfuração de alta velocidade Midas Rex™ MR8™ oferece potência e desempenho para procedimentos cirúrgicos de coluna, crânio, otorrinolaringologia, ortopedia e outros. Possui temperatura operacional mais baixa, menos vibração, melhor visibilidade do local cirúrgico e desempenho de corte ainda melhor. Navegável com o sistema de navegação StealthStation™ S8, integra-se perfeitamente com outras tecnologias do nosso portfólio. Com nosso suporte, educação, treinamento e serviço abrangentes, você tem um parceiro que estará ao seu lado do início ao fim.",
      mainImage: midasRexMr8Main,
      images: [midasRexMr8Main, midasRexMr8_1, midasRexMr8_2],
      anvisa: "10349000975",
    },
    {
      id: "10",
      slug: "altera-globus",
      categoryId: "coluna",
      title: "ALTERA® – Globus",
      description:
        "Cage TLIF expansível e articulado, fabricado em titânio, projetado para restaurar a altura e a lordose do espaço interdiscal.",
      fullDescription:
        "Cage TLIF expansível e articulado, fabricado em titânio. Foi projetado para restaurar a altura e a lordose do espaço interdiscal, auxiliando na manutenção do equilíbrio sagital. ALTERA é inserido através de um acesso minimizado, reduzindo os desafios do acesso, articulado na posição frontal e, depois, expandido para otimizar o ajuste. Seu mecanismo de articulação permite um posicionamento frontal direcionável.",
      mainImage: alteraMain,
      images: [alteraMain, altera1],
      anvisa: "80263050065",
    },
    {
      id: "11",
      slug: "rise-intralif-globus",
      categoryId: "coluna",
      title: "RISE® IntraLIF® – Globus",
      description:
        "Cage expansível de fusão intersomática lombar, fabricado em titânio com sistema de expansão para introdução através de cânula de 8,5mm.",
      fullDescription:
        "Cage expansível de fusão intersomática lombar. Fabricado em titânio e dotado de um sistema de expansão que permite sua introdução através de uma cânula de 8,5mm de diâmetro. Rise IntraLIF é implantado de maneira minimamente invasiva e expandido in situ para otimizar o ajuste.",
      mainImage: riseIntralifMain,
      images: [riseIntralifMain, riseIntralif1],
      anvisa: "80263050052",
    },
    {
      id: "12",
      slug: "rise-l-globus",
      categoryId: "coluna",
      title: "RISE®-L – Globus",
      description:
        "Dispositivo de fusão intersomático lateral expansível projetado para proporcionar lordose segmentar com até 15° de ajuste.",
      fullDescription:
        "Dispositivo de fusão intersomático lateral expansível. Projetado para ser implantado através de uma incisão mínima enquanto permite descompressão indireta. Projetado para proporcionar lordose segmentar enquanto a introdução de enxerto ósseo adicional in situ proporciona um ambiente de fusão ideal. Até 15° de lordose ajustável sem comprometer a descompressão indireta.",
      mainImage: riseLMain,
      images: [riseLMain, riseL1],
      anvisa: "80263050052",
    },
    {
      id: "13",
      slug: "sustain-arch-globus",
      categoryId: "coluna",
      title: "SUSTAIN® Arch – Globus",
      description:
        "Dispositivo de fusão intersomática lombar transforaminal (TLIF) projetado para maximizar a cobertura da borda corticalizada e manter o equilíbrio sagital.",
      fullDescription:
        "Dispositivo de fusão intersomática lombar transforaminal (TLIF). Projetado para abordagem frontal, para maximizar a cobertura da borda corticalizada e manter o equilíbrio sagital. Permite amplo espaço para preenchimento com enxerto. Apresenta ranhuras (dentes) nas superfícies inferior e superior para resistir à migração.",
      mainImage: sustainArchMain,
      images: [sustainArchMain],
      anvisa: "80203050060",
    },
    {
      id: "14",
      slug: "independence-gm-sistema-de-fusao-intersomatica-anterior-globus",
      categoryId: "coluna",
      title: "INDEPENDENCE GM® – Sistema de fusão intersomática anterior – Globus",
      description:
        "Sistema de fusão intersomática lombar anterior com cage integrado em titânio e placas posteriores em PEEK, permitindo técnica de fixação híbrida.",
      fullDescription:
        "Sistema de fusão intersomática lombar anterior. Cage integrado com design frontal em titânio e placas posteriores em PEEK. Projetado para ser utilizado através de tripla fixação por âncoras e/ou parafusos, possibilitando a técnica de fixação híbrida. Trava de bloqueio anterior confiável que evita expulsão das âncoras e/ou parafusos. Posição de fixação escalonada que elimina interferências com implantes de nível adjacente.",
      mainImage: independenceGmMain,
      images: [independenceGmMain, independenceGm1],
      anvisa: "80263050104",
    },
    {
      id: "15",
      slug: "revere-sistema-de-estabilizacao-globus",
      categoryId: "coluna",
      title: "REVERE® – Sistema de Estabilização – Globus",
      description:
        "Sistema de estabilização abrangente com ampla gama de parafusos poliaxiais, hastes e conectores para tratamento de condições lombares posteriores.",
      fullDescription:
        "Sistema de estabilização abrangente com ampla gama de parafusos poliaxiais, hastes e conectores. O sistema centraliza no mecanismo de bloqueio de baixo torque não-roscado que captura a haste com uma rotação e 90°. Para o tratamento de condições lombares posteriores.",
      mainImage: revereMain,
      images: [revereMain, revere1],
      anvisa: "80263050061",
    },
    {
      id: "16",
      slug: "revolve-sistema-de-fixacao-suplementar-percutaneo-globus",
      categoryId: "coluna",
      title: "REVOLVE® – Sistema de fixação suplementar percutâneo – Globus",
      description:
        "Sistema de estabilização posterior para cirurgias minimamente invasivas com capacidade de atender múltiplos níveis e diversas patologias.",
      fullDescription:
        "Sistema de estabilização posterior para cirurgias minimamente invasivas. Facilidade de uso independente da anatomia do paciente por meio de haste integrada e simplificada, além de forte conexão parafuso-torre. Capacidade de atender a múltiplos níveis. Aplicação para as mais diversas patologias (ex. tumor, trauma e deformidades).",
      mainImage: revolveMain,
      images: [revolveMain, revolve1],
      anvisa: "80263050090",
    },
    {
      id: "17",
      slug: "coalition-gm-globus",
      categoryId: "coluna",
      title: "COALITION GM® – Globus",
      description:
        "Sistema de fusão intersomática de coluna cervical projetado para fornecer fixação através de espaçador integrado às âncoras ou parafusos.",
      fullDescription:
        "É um sistema de fusão intersomática de coluna cervical. Projetado para fornecer fixação através de um espaçador integrado às âncoras ou parafusos. Possui estrutura em titânio e placas terminais em PEEK. Permite a construção com âncoras, parafusos ou híbrida. Procedimento em menos etapas e um corredor cirúrgico menos invasivo do que os espaçadores tradicionais com parafusos integrados.",
      mainImage: coalitionGmMain,
      images: [coalitionGmMain],
      anvisa: "80263050063",
    },
    {
      id: "18",
      slug: "assure-placa-cervical-anterior-globus",
      categoryId: "coluna",
      title: "ASSURE® – Placa cervical anterior – Globus",
      description:
        "Placa cervical anterior de baixo perfil com sistema de bloqueio acoplado, reduzindo tempo cirúrgico e complicações relacionadas à compressão de estruturas adjacentes.",
      fullDescription:
        "Placa cervical anterior que requer somente uma etapa para inserção e bloqueio dos parafusos, possibilitando menor perfil e tempo cirúrgico. O design das placas permite uma superfície anterior lisa. Placa cervical de baixo perfil, com sistema de bloqueio acoplado. Reduz a ocorrência de complicações relacionadas à compressão de estruturas adjacentes, como cordas vocais e esôfago.",
      mainImage: assureMain,
      images: [assureMain, assure1],
      anvisa: "80263050053",
    },

    // Novos produtos (Angel Care Solutions)
    {
      id: "19",
      slug: "e-spine-angel-care-solutions",
      categoryId: "coluna",
      title: "E.SPINE – Angel Care Solutions",
      description:
        "Parafuso híbrido que reúne características de parafusos pediculares monoaxiais e poliaxiais em um único implante.",
      fullDescription:
        "Parafuso híbrido com possibilidade de decisão intraoperatória (mono ou poliaxial), conforme patologia e necessidade do caso.",
      diferentials: [
        "Reúne e acumula as principais características e benefícios dos parafusos pediculares monoaxiais e poliaxiais em um único implante.",
        "Após a implantação, o cirurgião decide a função (mono ou poliaxial) considerando a patologia do paciente e as possibilidades no intraoperatório.",
        "Evita troca do implante no intraoperatório caso o planejamento prévio não possa ser efetivado.",
      ],
      mainImage: eSpineMain,
      images: [eSpineMain],
    },
    {
      id: "20",
      slug: "nemost-angel-care-solutions",
      categoryId: "coluna",
      title: "NEMOST – Angel Care Solutions",
      description:
        "Dispositivo estéril de uso único destinado à estabilização e correção de deformidades da coluna durante o crescimento (uso pediátrico).",
      fullDescription:
        "Dispositivo estéril de uso único destinado à implantação cirúrgica posterior, com foco em estabilizar e corrigir deformidades da coluna durante o crescimento.",
      characteristics: [
        "Permite o crescimento natural da coluna sem a utilização de nenhum dispositivo externo.",
        "Mecanismo unidirecional de alongamento.",
        "Permite moldagem das hastes.",
        "Baixo perfil.",
        "Biocompatível.",
        "Dois tamanhos para reserva de crescimento: 50mm e 80mm.",
      ],
      indications: [
        "Escoliose de início precoce: Idiopática.",
        "Escoliose de início precoce: Neuromuscular.",
        "Escoliose de início precoce: Sindrômica.",
        "Escoliose de início precoce: Congênita.",
      ],
      details: [
        "Proporciona o crescimento da coluna vertebral e da caixa torácica preservando a função respiratória.",
        "Estabiliza e corrige a deformidade (correção automática).",
        "Reduz o número de cirurgias posteriores (idealmente para zero).",
        "Reduz significativamente o risco de infecções.",
        "Reduz a quantidade de anestesia e raio-x.",
        "Reduz possíveis complicações mecânicas relacionadas aos procedimentos de distração das hastes.",
        "Facilita os cuidados com o paciente (enfermeira e pais).",
        "Restaura o equilíbrio geral.",
      ],
      mainImage: nemostMain,
      images: [nemostMain],
    },
    {
      id: "21",
      slug: "e-spine-tanit-angel-care-solutions",
      categoryId: "coluna",
      title: "E.SPINE TANIT – Angel Care Solutions",
      description:
        "Sistema com base convergente e ancoragem pélvica tricortical, com técnica de implantação exclusiva (menos invasiva) assistida por gabaritos.",
      fullDescription:
        "Sistema projetado para construção estável com ancoragem pélvica e conectores multiaxiais.",
      characteristics: [
        "Construção estável devido à estrutura de base convergente.",
        "Ancoragem pélvica tricortical através dos parafusos ilíaco-sacrais.",
        "Conector ilíaco-sacral multiaxial.",
        "Técnica de implantação exclusiva (menos invasiva) com suporte por gabaritos para implantação.",
      ],
      mainImage: eSpineTanitMain,
      images: [eSpineTanitMain, eSpineTanit1],
    },
  ],
  itemsPerPage: 12,
};

productsConfig.products = productsConfig.products.map((product) => {
  const override = productExcelOverrides[product.slug];
  if (!override) return product;

  return {
    ...product,
    title: override.title,
    description: override.description,
    fullDescription: override.fullDescription,
  };
});
