import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SchemaMarkup } from "@/components/SchemaMarkup";

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Layout reutilizável que envolve todas as páginas
 * Inclui Header, Footer e SchemaMarkup padrão
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <SchemaMarkup />
      <Header />
      <main className="pt-0">{children}</main>
      <Footer />
    </div>
  );
}

