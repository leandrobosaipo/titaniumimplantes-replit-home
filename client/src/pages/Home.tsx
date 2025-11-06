import { Header } from "@/components/Header";
import { Carousel } from "@/components/Carousel";
import { WelcomeSection } from "@/components/WelcomeSection";
import { ProductCategories } from "@/components/ProductCategories";
import { CTASection } from "@/components/CTASection";
import { InstitutionalSection } from "@/components/InstitutionalSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-[128px] md:pt-[120px]">
        <Carousel />
        <WelcomeSection />
        <ProductCategories />
        <CTASection />
        <InstitutionalSection />
      </main>

      <Footer />
    </div>
  );
}
