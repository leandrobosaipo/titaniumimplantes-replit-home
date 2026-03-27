import type { PageConfig } from "@/types/pages";

/**
 * Configuração centralizada de todas as páginas internas
 * 
 * Para editar conteúdo de uma página, modifique o objeto correspondente abaixo.
 * Segue o padrão de administração via JSON estabelecido nas outras seções.
 */
export const pagesConfig: Record<string, PageConfig> = {
  "/quem-somos": {
    path: "/quem-somos",
    title: "Quem Somos | Titaniun Implantes",
    description: "Conheça a Titaniun Implantes, distribuidora especializada em implantes cirúrgicos para coluna, neurocirurgia, bucomaxilofacial e otorrinolaringologia em Cuiabá-MT.",
    h1: "Quem Somos",
  },
  "/produtos": {
    path: "/produtos",
    title: "Produtos | Titaniun Implantes",
    description: "Conheça nosso portfólio completo de implantes cirúrgicos: sistemas para coluna, neurocirurgia, bucomaxilofacial e otorrinolaringologia. Alta qualidade e tecnologia de ponta.",
    h1: "Produtos",
  },
  "/canal-de-denuncia": {
    path: "/canal-de-denuncia",
    title: "Canal de Denúncia | Titaniun Implantes",
    description: "Canal de denúncia da Titaniun Implantes. Reporte irregularidades de forma segura e anônima. Comprometidos com ética e transparência.",
    h1: "Canal de Denúncia",
  },
  "/lgpd": {
    path: "/lgpd",
    title: "LGPD - Lei Geral de Proteção de Dados | Titaniun Implantes",
    description: "Política de privacidade e proteção de dados da Titaniun Implantes. Conheça como tratamos seus dados pessoais em conformidade com a LGPD.",
    h1: "LGPD - Lei Geral de Proteção de Dados",
  },
  "/contato": {
    path: "/contato",
    title: "Contato | Titaniun Implantes",
    description: "Entre em contato com a Titaniun Implantes em Cuiabá-MT. Atendimento especializado para hospitais, clínicas e profissionais de saúde.",
    h1: "Contato",
  },
  "/compliance": {
    path: "/compliance",
    title: "Compliance | Titaniun Implantes",
    description: "Compromisso da Titaniun Implantes com ética, transparência e conformidade regulatória. Conheça nossas políticas de compliance e integridade.",
    h1: "Compliance",
  },
};

