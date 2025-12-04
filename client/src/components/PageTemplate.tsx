import { Layout } from "@/components/Layout";
import { PageSEO } from "@/components/SEO/PageSEO";
import { pagesConfig } from "@/data/pages";
import NotFound from "@/pages/not-found";

interface PageTemplateProps {
  pageKey: string;
}

/**
 * Componente genérico de página que usa configuração centralizada
 * 
 * Busca a configuração em pagesConfig e renderiza Layout + SEO + H1
 * Estrutura pronta para adicionar conteúdo futuro via JSON
 */
export function PageTemplate({ pageKey }: PageTemplateProps) {
  const pageConfig = pagesConfig[pageKey];

  if (!pageConfig) {
    return <NotFound />;
  }

  const canonicalUrl = `https://titaniumimplantes.com.br${pageConfig.path}`;

  return (
    <Layout>
      <PageSEO
        title={pageConfig.title}
        description={pageConfig.description}
        canonical={canonicalUrl}
      />
      <div className="mx-auto max-w-[1280px] px-8 pt-[70px] lg:pt-[150px] pb-16 md:pb-24">
        <h1
          className="text-[#0a324c] text-[36px] md:text-[48px] lg:text-[56px] mb-8"
          style={{
            fontFamily: "Lato, sans-serif",
            fontWeight: 900,
            lineHeight: 1.2,
          }}
        >
          {pageConfig.h1}
        </h1>
        {/* Área para conteúdo futuro - será preenchida via configuração JSON */}
        {pageConfig.content && (
          <div
            className="text-[#4A4A4A] text-[18px]"
            style={{
              fontFamily: "Lato, sans-serif",
              fontWeight: 400,
              lineHeight: 1.6,
            }}
            dangerouslySetInnerHTML={{ __html: pageConfig.content }}
          />
        )}
      </div>
    </Layout>
  );
}

