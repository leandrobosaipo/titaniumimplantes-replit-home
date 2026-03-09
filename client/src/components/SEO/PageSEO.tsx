import { useEffect } from "react";

interface PageSEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "product";
  schema?: Record<string, unknown>;
}

const SITE_URL = "https://titaniumimplantes.com.br";

/**
 * Componente que injeta meta tags dinâmicas no head da página
 */
export function PageSEO({
  title,
  description,
  canonical,
  ogImage = `${SITE_URL}/og-default.jpg`,
  ogType = "website",
  schema,
}: PageSEOProps) {
  useEffect(() => {
    const currentCanonical = canonical || window.location.href;

    if (title) {
      document.title = title;
    }

    const ensureMeta = (selector: string, attr: "name" | "property", value: string) => {
      let meta = document.querySelector(selector) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, value);
        document.head.appendChild(meta);
      }
      return meta;
    };

    const metaDescription = ensureMeta('meta[name="description"]', "name", "description");
    if (description) metaDescription.setAttribute("content", description);

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", currentCanonical);

    const ogTitle = ensureMeta('meta[property="og:title"]', "property", "og:title");
    if (title) ogTitle.setAttribute("content", title);

    const ogDescription = ensureMeta('meta[property="og:description"]', "property", "og:description");
    if (description) ogDescription.setAttribute("content", description);

    const ogUrl = ensureMeta('meta[property="og:url"]', "property", "og:url");
    ogUrl.setAttribute("content", currentCanonical);

    const ogTypeMeta = ensureMeta('meta[property="og:type"]', "property", "og:type");
    ogTypeMeta.setAttribute("content", ogType);

    const ogImageMeta = ensureMeta('meta[property="og:image"]', "property", "og:image");
    ogImageMeta.setAttribute("content", ogImage);

    const twitterCard = ensureMeta('meta[name="twitter:card"]', "name", "twitter:card");
    twitterCard.setAttribute("content", "summary_large_image");

    const twitterTitle = ensureMeta('meta[name="twitter:title"]', "name", "twitter:title");
    if (title) twitterTitle.setAttribute("content", title);

    const twitterDescription = ensureMeta('meta[name="twitter:description"]', "name", "twitter:description");
    if (description) twitterDescription.setAttribute("content", description);

    const twitterImage = ensureMeta('meta[name="twitter:image"]', "name", "twitter:image");
    twitterImage.setAttribute("content", ogImage);

    let schemaScript = document.getElementById("seo-schema-runtime") as HTMLScriptElement | null;
    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.type = "application/ld+json";
      schemaScript.id = "seo-schema-runtime";
      document.head.appendChild(schemaScript);
    }

    const defaultSchema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: "Titanium Implantes",
          url: SITE_URL,
          logo: `${SITE_URL}/logo.png`,
        },
      ],
    };

    schemaScript.text = JSON.stringify(schema ?? defaultSchema);
  }, [title, description, canonical, ogImage, ogType, schema]);

  return null;
}
