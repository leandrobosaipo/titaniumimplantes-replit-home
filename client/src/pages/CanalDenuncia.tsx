import { Layout } from "@/components/Layout";
import { PageSEO } from "@/components/SEO/PageSEO";
import { CanalDenunciaHeroSection } from "@/components/CanalDenunciaHeroSection";
import { CanalDenunciaOrientacoesSection } from "@/components/CanalDenunciaOrientacoesSection";
import { CanalDenunciaCTASection } from "@/components/CanalDenunciaCTASection";

export default function CanalDenuncia() {
  return (
    <Layout>
      <PageSEO
        title="Canal de Denúncia | Titanium Implantes"
        description="Canal de denúncia da Titanium Implantes. Reporte irregularidades de forma segura e anônima. Comprometidos com ética e transparência."
      />
      <CanalDenunciaHeroSection />
      <CanalDenunciaOrientacoesSection />
      <CanalDenunciaCTASection />
    </Layout>
  );
}
