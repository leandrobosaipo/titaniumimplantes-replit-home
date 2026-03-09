type SeoPayload = {
  title: string;
  description: string;
  canonical: string;
  ogType: "website" | "product";
  ogImage: string;
  schema: Record<string, unknown>;
};

const SITE_URL = "https://titaniumimplantes.com.br";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`;

const baseOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Titanium Implantes",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
};

function slugToProductName(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

export function getSeoForPath(pathname: string): SeoPayload {
  const path = pathname.split("?")[0];

  if (path === "/") {
    return {
      title: "Titanium Implantes | Implantes para Coluna, Neuro e Bucomaxilo em Cuiabá - MT",
      description:
        "Distribuidora especializada em implantes para coluna, neurocirurgia, bucomaxilofacial e otorrinolaringologia em Cuiabá-MT. Soluções certificadas, alta tecnologia e entrega ágil.",
      canonical: `${SITE_URL}/`,
      ogType: "website",
      ogImage: DEFAULT_OG_IMAGE,
      schema: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "WebSite",
            name: "Titanium Implantes",
            url: SITE_URL,
          },
          baseOrganization,
        ],
      },
    };
  }

  if (path === "/produtos") {
    return {
      title: "Produtos | Titanium Implantes",
      description: "Conheça nosso portfólio completo de implantes cirúrgicos certificados.",
      canonical: `${SITE_URL}/produtos`,
      ogType: "website",
      ogImage: DEFAULT_OG_IMAGE,
      schema: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "CollectionPage",
            name: "Produtos | Titanium Implantes",
            url: `${SITE_URL}/produtos`,
            description: "Portfólio de implantes cirúrgicos da Titanium Implantes.",
          },
          baseOrganization,
        ],
      },
    };
  }

  if (path.startsWith("/produtos/")) {
    const slug = path.replace("/produtos/", "").trim();
    const productName = slugToProductName(slug);
    const canonical = `${SITE_URL}/produtos/${slug}`;

    return {
      title: `${productName} | Produtos | Titanium Implantes`,
      description: `Saiba mais sobre ${productName}. Especificações e informações técnicas com suporte especializado da Titanium Implantes.`,
      canonical,
      ogType: "product",
      ogImage: DEFAULT_OG_IMAGE,
      schema: {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Product",
            name: productName,
            brand: { "@type": "Brand", name: "Titanium Implantes" },
            url: canonical,
            image: [DEFAULT_OG_IMAGE],
            description: `Informações técnicas de ${productName}.`,
          },
          baseOrganization,
        ],
      },
    };
  }

  const map: Record<string, { title: string; description: string }> = {
    "/quem-somos": {
      title: "Quem Somos | Titanium Implantes",
      description: "Conheça a história e o compromisso da Titanium Implantes com a excelência em materiais cirúrgicos.",
    },
    "/lgpd": {
      title: "LGPD e Compliance | Titanium Implantes",
      description: "Certificações, compliance e proteção de dados na Titanium Implantes.",
    },
    "/canal-de-denuncia": {
      title: "Canal de Denúncia | Titanium Implantes",
      description: "Canal de denúncia seguro e confidencial da Titanium Implantes.",
    },
    "/contato": {
      title: "Contato | Titanium Implantes",
      description: "Entre em contato com a Titanium Implantes em Cuiabá-MT.",
    },
  };

  const fallback = map[path] ?? {
    title: "Titanium Implantes",
    description: "Titanium Implantes - implantes cirúrgicos e soluções médicas.",
  };

  return {
    ...fallback,
    canonical: `${SITE_URL}${path === "/" ? "/" : path}`,
    ogType: "website",
    ogImage: DEFAULT_OG_IMAGE,
    schema: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          name: fallback.title,
          url: `${SITE_URL}${path === "/" ? "/" : path}`,
          description: fallback.description,
        },
        baseOrganization,
      ],
    },
  };
}

function replaceOrInsert(html: string, pattern: RegExp, replacement: string, fallbackInsert: string): string {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement);
  }
  return html.replace("</head>", `${fallbackInsert}\n</head>`);
}

export function applySeoToHtml(html: string, pathname: string): string {
  const seo = getSeoForPath(pathname);
  const schemaJson = JSON.stringify(seo.schema);

  let out = html;
  out = replaceOrInsert(out, /<title>.*?<\/title>/is, `<title>${seo.title}</title>`, `<title>${seo.title}</title>`);
  out = replaceOrInsert(
    out,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>(?:\s*)/i,
    `<meta name="description" content="${seo.description}" />`,
    `<meta name="description" content="${seo.description}" />`,
  );
  out = replaceOrInsert(
    out,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>(?:\s*)/i,
    `<link rel="canonical" href="${seo.canonical}" />`,
    `<link rel="canonical" href="${seo.canonical}" />`,
  );

  const metas: Array<[RegExp, string, string]> = [
    [/<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>(?:\s*)/i, `<meta property="og:title" content="${seo.title}" />`, `<meta property="og:title" content="${seo.title}" />`],
    [/<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>(?:\s*)/i, `<meta property="og:description" content="${seo.description}" />`, `<meta property="og:description" content="${seo.description}" />`],
    [/<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>(?:\s*)/i, `<meta property="og:type" content="${seo.ogType}" />`, `<meta property="og:type" content="${seo.ogType}" />`],
    [/<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>(?:\s*)/i, `<meta property="og:url" content="${seo.canonical}" />`, `<meta property="og:url" content="${seo.canonical}" />`],
    [/<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>(?:\s*)/i, `<meta property="og:image" content="${seo.ogImage}" />`, `<meta property="og:image" content="${seo.ogImage}" />`],
    [/<meta\s+name="twitter:card"\s+content="[^"]*"\s*\/?>(?:\s*)/i, `<meta name="twitter:card" content="summary_large_image" />`, `<meta name="twitter:card" content="summary_large_image" />`],
    [/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>(?:\s*)/i, `<meta name="twitter:title" content="${seo.title}" />`, `<meta name="twitter:title" content="${seo.title}" />`],
    [/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>(?:\s*)/i, `<meta name="twitter:description" content="${seo.description}" />`, `<meta name="twitter:description" content="${seo.description}" />`],
    [/<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>(?:\s*)/i, `<meta name="twitter:image" content="${seo.ogImage}" />`, `<meta name="twitter:image" content="${seo.ogImage}" />`],
  ];

  for (const [pattern, replacement, insert] of metas) {
    out = replaceOrInsert(out, pattern, replacement, insert);
  }

  out = out.replace(/<script\s+type="application\/ld\+json"\s+id="seo-schema">[\s\S]*?<\/script>/i, "");
  out = out.replace("</head>", `<script type="application/ld+json" id="seo-schema">${schemaJson}</script>\n</head>`);

  return out;
}
