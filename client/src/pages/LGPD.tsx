import { Layout } from "@/components/Layout";
import { PageSEO } from "@/components/SEO/PageSEO";
import { LgpdProtecaoDadosSection } from "@/components/LgpdProtecaoDadosSection";
import { LgpdExercerDireitosSection } from "@/components/LgpdExercerDireitosSection";

export default function LGPD() {
  return (
    <Layout>
      <PageSEO
        title="LGPD — Proteção de Dados | Titaniun Implantes"
        description="Saiba como a Titaniun Implantes protege seus dados pessoais conforme a Lei Geral de Proteção de Dados (LGPD). Transparência, segurança e seus direitos garantidos."
        canonical="https://titaniumimplantes.com.br/lgpd"
      />

      <LgpdProtecaoDadosSection />
      <LgpdExercerDireitosSection />
    </Layout>
  );
}
