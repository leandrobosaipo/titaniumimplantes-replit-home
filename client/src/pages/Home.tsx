import { Layout } from "@/components/Layout";
import { PageSEO } from "@/components/SEO/PageSEO";
import { Carousel } from "@/components/Carousel";
import { QuemSomosSection } from "@/components/QuemSomosSection";
import { AreasAtuacaoSection } from "@/components/AreasAtuacaoSection";
import { ExcelenciaMateriaisSection } from "@/components/ExcelenciaMateriaisSection";
import { CertificacoesSection } from "@/components/CertificacoesSection";
import { ContatoSection } from "@/components/ContatoSection";

export default function Home() {
  return (
    <Layout>
      <PageSEO
        title="Titanium Implantes | Implantes para Coluna, Neuro e Bucomaxilo em Cuiabá - MT"
        description="Distribuidora especializada em implantes para coluna, neurocirurgia, bucomaxilofacial e otorrinolaringologia em Cuiabá-MT. Soluções certificadas, alta tecnologia e entrega ágil."
        canonical="https://titaniumimplantes.com.br/"
      />
        <Carousel />
        <QuemSomosSection />
        <AreasAtuacaoSection />
        <ExcelenciaMateriaisSection />
        <CertificacoesSection />
        <ContatoSection />
    </Layout>
  );
}
