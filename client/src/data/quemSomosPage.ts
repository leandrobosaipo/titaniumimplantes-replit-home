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
      descricao: "Promover a saúde e o bem-estar com segurança, ética e certificação, garantindo que cada paciente receba o melhor resultado possível através de tecnologias confiáveis e parceiros sólidos.",
    },
    {
      id: "2",
      tipo: "visao",
      titulo: "Nossa Visão:",
      descricao: "Ser reconhecida como a principal referência em implantes e materiais cirúrgicos de Mato Grosso, destacando-se pela excelência técnica, agilidade e parceria com os profissionais de saúde.",
    },
    {
      id: "3",
      tipo: "valores",
      titulo: "Nossos Valores:",
      descricao: "Ética e Transparência: relacionamento baseado em confiança e respeito.\nQualidade e Segurança: produtos certificados e processos auditados.\nInovação: soluções que acompanham os avanços da medicina moderna.\nAgilidade e Eficiência: entregas rápidas e suporte integral.\nCuidado com a Vida: foco em cada paciente, em cada história.",
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
