import type { QuemSomosPageConfig } from "@/types/quemSomosPage";
import heroBg from "@assets/bg-quem-somos-home.jpg";
import heroBgNew from "@assets/Site_251003_Titaniun Implantes_Quem somos.min.jpg";
import historiaImg from "@assets/Quem-somos-historia-section.min.jpg";
import estruturaImg from "@assets/home-slide_1762428378908.jpeg";
import estruturaSlide1 from "@assets/Quem-somos-estrutura-slide-3.jpg";
import estruturaSlide2 from "@assets/Quem-somos-estrutura-slide-4.jpg";

export const quemSomosPageConfig: QuemSomosPageConfig = {
  hero: {
    titulo: "Compromisso com a vida, excelência em cada detalhe",
    backgroundImage: heroBgNew,
  },
  historia: {
    titulo: "Nossa História",
    texto: "Há 13 anos, a Titanium Implantes atua no mercado de materiais cirúrgicos com o propósito de promover saúde e qualidade de vida por meio da inovação e da confiança.\n\nSediada em Mato Grosso, a empresa é referência na distribuição de implantes e soluções médicas nas áreas de coluna, neurocirurgia, bucomaxilofacial e otorrinolaringologia, oferecendo produtos de alto desempenho para profissionais e pacientes em todo o estado.",
    imagem: historiaImg,
  },
  mvv: [
    {
      id: "1",
      tipo: "missao",
      titulo: "Nossa Missão:",
      descricao: "Gerar confiança com relacionamento respeitoso, excelência técnica em tudo o que entregamos.",
    },
    {
      id: "2",
      tipo: "visao",
      titulo: "Nossa Visão:",
      descricao: "Consolidar-se no mercado nacional como referência em excelência, sendo admirada por clientes, fornecedores e colaboradores pela qualidade e compromisso em tudo o que faz.",
    },
    {
      id: "3",
      tipo: "valores",
      titulo: "Nossos Valores:",
      descricao: "Respeito e confiança nas pessoas: promovemos um ambiente de acolhimento, transparência e colaboração, onde cada pessoa é valorizada.\n\nQualidade nos produtos: entregamos materiais de alta performance, confiáveis e seguros, comprometidos com o bem-estar do paciente e a tranquilidade do profissional de saúde.\n\nSistematização dos processos: acreditamos que a padronização é a base da excelência. Processos bem definidos garantem eficiência, previsibilidade e segurança em nossas operações.\n\nEvolução e melhoria contínua: investimos no desenvolvimento das pessoas e na inovação constante, buscando sempre fazer melhor do que ontem.\n\nEmpatia: colocar-se no lugar do outro para compreender necessidades, promover acolhimento e construir relações humanas e respeitosas.\n\nFoco em resultados: nosso olhar está direcionado para a performance e para os impactos positivos que geramos na saúde, na vida das pessoas e na sustentabilidade do negócio.",
    },
  ],
  estrutura: {
    titulo: "Nossa estrutura e diferenciais:",
    subtitulo: "Com uma equipe especializada e marcas exclusivas, a Titanium Implantes assegura excelência em todas as etapas, do atendimento à entrega.",
    imagem: [estruturaSlide1, estruturaSlide2],
    textoFinal: "Mantemos certificações ISO, registro ANVISA, e atuamos em conformidade com as diretrizes de Compliance, LGPD e Ética em Saúde, reforçando nosso compromisso com a integridade e a transparência.",
    propositoBadge: "NOSSO PROPÓSITO",
    propositoTexto: "Mais do que distribuir produtos, acreditamos em construir confiança e devolver qualidade de vida. Cada solução entregue representa o resultado de um trabalho guiado por técnica, cuidado e responsabilidade com o futuro da saúde.",
  },
};
