import { Header } from "@/components/Header";
import { Carousel } from "@/components/Carousel";
import { QuemSomosSection } from "@/components/QuemSomosSection";
import { AreasAtuacaoSection } from "@/components/AreasAtuacaoSection";
import { ExcelenciaMateriaisSection } from "@/components/ExcelenciaMateriaisSection";
import { CertificacoesSection } from "@/components/CertificacoesSection";
import { ContatoSection } from "@/components/ContatoSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-0">
        <Carousel />
        <QuemSomosSection />
        <AreasAtuacaoSection />
        <ExcelenciaMateriaisSection />
        <CertificacoesSection />
        <ContatoSection />
      </main>

      <Footer />
    </div>
  );
}
