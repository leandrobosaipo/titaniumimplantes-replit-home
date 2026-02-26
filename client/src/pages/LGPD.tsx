import { Layout } from "@/components/Layout";
import { PageSEO } from "@/components/SEO/PageSEO";
import { LgpdDestaquesMaterialSection } from "@/components/LgpdDestaquesMaterialSection";
import { LgpdControleQualidadeSection } from "@/components/LgpdControleQualidadeSection";
import { LgpdComplianceEticaSection } from "@/components/LgpdComplianceEticaSection";
import { LgpdProtecaoDadosSection } from "@/components/LgpdProtecaoDadosSection";
import { LgpdExercerDireitosSection } from "@/components/LgpdExercerDireitosSection";

export default function LGPD() {
  return (
    <Layout>
      <PageSEO
        title="LGPD e Compliance | Titanium Implantes"
        description="Certificações, Compliance e Proteção de Dados."
      />

      <div className="mt-[100px] lg:mt-[180px]">
        <LgpdDestaquesMaterialSection />
      </div>
      <LgpdControleQualidadeSection />
      <LgpdComplianceEticaSection />
      <LgpdProtecaoDadosSection />
      <LgpdExercerDireitosSection />
    </Layout>
  );
}
