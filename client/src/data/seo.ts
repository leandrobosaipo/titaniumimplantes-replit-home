/**
 * Configurações centralizadas de SEO
 * 
 * Este arquivo contém todas as configurações relacionadas a SEO,
 * facilitando manutenção e reutilização em múltiplas páginas.
 */

export const seoConfig = {
  siteName: "Titanium Implantes",
  baseUrl: "https://titaniumimplantes.com.br",
  defaultTitle: "Titanium Implantes | Implantes para Coluna, Neuro e Bucomaxilo em Cuiabá - MT",
  defaultDescription: "Distribuidora especializada em implantes para coluna, neurocirurgia, bucomaxilofacial e otorrinolaringologia em Cuiabá-MT. Soluções certificadas, alta tecnologia e entrega ágil.",
  keywords: [
    "implantes cirúrgicos",
    "implantes para coluna",
    "materiais neurocirúrgicos",
    "distribuidora de materiais hospitalares",
    "implantes bucomaxilofacial",
    "otorrinolaringologia",
    "Cuiabá MT",
    "materiais hospitalares",
    "implantes cirúrgicos Cuiabá",
    "distribuidora implantes Mato Grosso"
  ],
  organization: {
    name: "Titanium Implantes",
    legalName: "Titanium Implantes",
    url: "https://titaniumimplantes.com.br",
    logo: "https://titaniumimplantes.com.br/logo.png",
    contactPoint: {
      telephone: "+55-65-3025-5625",
      email: "contratos@titaniunimplantes.com.br",
      contactType: "customer service",
      areaServed: "BR",
      availableLanguage: "Portuguese"
    },
    sameAs: [
      "https://www.facebook.com/titaniumimplantes",
      "https://www.instagram.com/titaniumimplantes",
      "https://www.linkedin.com/company/titaniumimplantes",
      "https://www.youtube.com/@titaniumimplantes"
    ]
  },
  localBusiness: {
    name: "Titanium Implantes",
    address: {
      streetAddress: "Av. Hist. Rubens de Mendonça, 2368, Sala 1101",
      addressLocality: "Cuiabá",
      addressRegion: "MT",
      postalCode: "78050-000",
      addressCountry: "BR"
    },
    geo: {
      latitude: "-15.6014",
      longitude: "-56.0979"
    },
    telephone: "+55-65-3025-5625",
    email: "contratos@titaniunimplantes.com.br",
    openingHours: {
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00"
    },
    priceRange: "$$",
    areaServed: {
      type: "Country",
      name: "Brasil"
    }
  }
};

/**
 * Gera meta tags para uma página específica
 */
export function generateMetaTags(page?: {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
}) {
  const title = page?.title || seoConfig.defaultTitle;
  const description = page?.description || seoConfig.defaultDescription;
  const keywords = page?.keywords || seoConfig.keywords;
  const canonical = page?.canonical || seoConfig.baseUrl;
  const ogImage = page?.ogImage || `${seoConfig.baseUrl}/logo.png`;

  return {
    title,
    description,
    keywords: keywords.join(", "),
    canonical,
    og: {
      title,
      description,
      url: canonical,
      image: ogImage,
      type: "website",
      locale: "pt_BR"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

