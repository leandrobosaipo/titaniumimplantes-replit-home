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
    title: "Quem Somos | Titanium Implantes",
    description: "Conheça a Titanium Implantes, distribuidora especializada em implantes cirúrgicos para coluna, neurocirurgia, bucomaxilofacial e otorrinolaringologia em Cuiabá-MT.",
    h1: "Quem Somos",
  },
  "/produtos": {
    path: "/produtos",
    title: "Produtos | Titanium Implantes",
    description: "Conheça nosso portfólio completo de implantes cirúrgicos: sistemas para coluna, neurocirurgia, bucomaxilofacial e otorrinolaringologia. Alta qualidade e tecnologia de ponta.",
    h1: "Produtos",
  },
  "/canal-de-denuncia": {
    path: "/canal-de-denuncia",
    title: "Canal de Denúncia | Titanium Implantes",
    description: "Canal de denúncia da Titanium Implantes. Reporte irregularidades de forma segura e anônima. Comprometidos com ética e transparência.",
    h1: "Canal de Denúncia",
  },
  "/lgpd": {
    path: "/lgpd",
    title: "LGPD - Lei Geral de Proteção de Dados | Titanium Implantes",
    description: "Política de privacidade e proteção de dados da Titanium Implantes. Conheça como tratamos seus dados pessoais em conformidade com a LGPD.",
    h1: "LGPD - Lei Geral de Proteção de Dados",
  },
  "/contato": {
    path: "/contato",
    title: "Contato | Titanium Implantes",
    description: "Entre em contato com a Titanium Implantes em Cuiabá-MT. Atendimento especializado para hospitais, clínicas e profissionais de saúde.",
    h1: "Contato",
  },
  "/compliance": {
    path: "/compliance",
    title: "Compliance | Titanium Implantes",
    description: "Compromisso da Titanium Implantes com ética, transparência e conformidade regulatória. Conheça nossas políticas de compliance e integridade.",
    h1: "Compliance",
  },
};

