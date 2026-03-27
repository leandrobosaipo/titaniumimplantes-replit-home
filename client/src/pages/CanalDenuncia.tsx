import { Layout } from "@/components/Layout";
import { PageSEO } from "@/components/SEO/PageSEO";
import { CanalDenunciaHeroSection } from "@/components/CanalDenunciaHeroSection";
import { CanalDenunciaOrientacoesSection } from "@/components/CanalDenunciaOrientacoesSection";
import { CanalDenunciaFormSection } from "@/components/CanalDenunciaFormSection";

export default function CanalDenuncia() {
  return (
    <Layout>
      <PageSEO
        title="Canal de Denúncia | Titaniun Implantes"
        description="Canal de denúncia da Titaniun Implantes. Reporte irregularidades de forma segura e anônima. Comprometidos com ética e transparência."
        canonical="https://titaniumimplantes.com.br/canal-de-denuncia"
      />
      <CanalDenunciaHeroSection />
      <CanalDenunciaOrientacoesSection />
      <CanalDenunciaFormSection />
    </Layout>
  );
}
