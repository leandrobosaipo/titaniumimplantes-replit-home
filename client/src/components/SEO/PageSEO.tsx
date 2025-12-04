import { useEffect } from "react";

interface PageSEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

/**
 * Componente que injeta meta tags dinâmicas no head da página
 * Atualiza title, description, canonical e Open Graph tags
 */
export function PageSEO({
  title,
  description,
  canonical,
  ogImage = "https://titaniumimplantes.com.br/logo.png",
}: PageSEOProps) {
  useEffect(() => {
    // Atualizar title
    if (title) {
      document.title = title;
    }

    // Atualizar ou criar meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }
    if (description) {
      metaDescription.setAttribute("content", description);
    }

    // Atualizar ou criar canonical
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    if (canonical) {
      canonicalLink.setAttribute("href", canonical);
    }

    // Atualizar Open Graph title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement("meta");
      ogTitle.setAttribute("property", "og:title");
      document.head.appendChild(ogTitle);
    }
    if (title) {
      ogTitle.setAttribute("content", title);
    }

    // Atualizar Open Graph description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement("meta");
      ogDescription.setAttribute("property", "og:description");
      document.head.appendChild(ogDescription);
    }
    if (description) {
      ogDescription.setAttribute("content", description);
    }

    // Atualizar Open Graph URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement("meta");
      ogUrl.setAttribute("property", "og:url");
      document.head.appendChild(ogUrl);
    }
    if (canonical) {
      ogUrl.setAttribute("content", canonical);
    }

    // Atualizar Open Graph image
    let ogImageMeta = document.querySelector('meta[property="og:image"]');
    if (!ogImageMeta) {
      ogImageMeta = document.createElement("meta");
      ogImageMeta.setAttribute("property", "og:image");
      document.head.appendChild(ogImageMeta);
    }
    ogImageMeta.setAttribute("content", ogImage);

    // Atualizar Twitter Card title
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (!twitterTitle) {
      twitterTitle = document.createElement("meta");
      twitterTitle.setAttribute("name", "twitter:title");
      document.head.appendChild(twitterTitle);
    }
    if (title) {
      twitterTitle.setAttribute("content", title);
    }

    // Atualizar Twitter Card description
    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (!twitterDescription) {
      twitterDescription = document.createElement("meta");
      twitterDescription.setAttribute("name", "twitter:description");
      document.head.appendChild(twitterDescription);
    }
    if (description) {
      twitterDescription.setAttribute("content", description);
    }
  }, [title, description, canonical, ogImage]);

  // Componente não renderiza nada visualmente
  return null;
}

