/**
 * Componente para adicionar Schema.org JSON-LD markup
 * Implementa Organization, LocalBusiness, ContactPoint e BreadcrumbList
 * 
 * Aceita props opcionais para customização por página, mantendo valores padrão
 */
interface SchemaMarkupProps {
  /** URL base customizada (opcional) */
  baseUrl?: string;
  /** Nome da organização customizado (opcional) */
  organizationName?: string;
}

export function SchemaMarkup({ 
  baseUrl = "https://titaniumimplantes.com.br",
  organizationName = "Titanium Implantes"
}: SchemaMarkupProps = {}) {
  const siteUrl = `${baseUrl}/`;

  // Schema Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": organizationName,
    "url": siteUrl,
    "logo": `${baseUrl}/logo.png`,
    "description": "Distribuidora especializada em implantes para coluna, neurocirurgia, bucomaxilofacial e otorrinolaringologia em Cuiabá-MT. Soluções certificadas, alta tecnologia e entrega ágil.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Hist. Rubens de Mendonça, 2368, Sala 1101",
      "addressLocality": "Cuiabá",
      "addressRegion": "MT",
      "addressCountry": "BR",
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+55-65-3025-5625",
      "contactType": "customer service",
      "areaServed": "BR",
      "availableLanguage": "Portuguese",
    },
    "sameAs": [
      // Adicionar URLs de redes sociais quando disponíveis
    ],
  };

  // Schema LocalBusiness
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#organization`,
    "name": organizationName,
    "image": `${baseUrl}/logo.png`,
    "description": "Distribuidora especializada em implantes cirúrgicos para coluna, neurocirurgia, bucomaxilofacial e otorrinolaringologia em Cuiabá-MT.",
    "url": siteUrl,
    "telephone": "+55-65-3025-5625",
    "email": "contratos@titaniunimplantes.com.br",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Av. Hist. Rubens de Mendonça, 2368, Sala 1101",
      "addressLocality": "Cuiabá",
      "addressRegion": "MT",
      "postalCode": "78000-000",
      "addressCountry": "BR",
    },
    "geo": {
      "@type": "GeoCoordinates",
      // Coordenadas aproximadas de Cuiabá - podem ser atualizadas com coordenadas exatas
      "latitude": "-15.6014",
      "longitude": "-56.0979",
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      "opens": "08:00",
      "closes": "18:00",
    },
    "priceRange": "$$",
    "areaServed": {
      "@type": "Country",
      "name": "Brasil",
    },
  };

  // Schema BreadcrumbList (para navegação)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": siteUrl,
      },
    ],
  };

  // Schema WebSite (para busca)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": organizationName,
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}?s={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

