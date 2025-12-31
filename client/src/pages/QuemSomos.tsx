import { Layout } from "@/components/Layout";
import { PageSEO } from "@/components/SEO/PageSEO";
import { QuemSomosHeroSection } from "@/components/QuemSomosHeroSection";
import { QuemSomosHistoriaSection } from "@/components/QuemSomosHistoriaSection";
import { QuemSomosMVVSection } from "@/components/QuemSomosMVVSection";
import { QuemSomosEstruturaSection } from "@/components/QuemSomosEstruturaSection";

export default function QuemSomos() {
  return (
    <Layout>
      <PageSEO
        title="Quem Somos | Titanium Implantes"
        description="Conheça a história e o compromisso da Titanium Implantes com a excelência em materiais cirúrgicos."
      />

      <QuemSomosHeroSection />
      <QuemSomosHistoriaSection />
      <QuemSomosMVVSection />
      <QuemSomosEstruturaSection />
    </Layout>
  );
}
