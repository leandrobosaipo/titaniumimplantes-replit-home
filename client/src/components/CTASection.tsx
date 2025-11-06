import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 md:py-28 bg-primary relative overflow-hidden" data-testid="section-cta">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6 leading-tight" data-testid="text-cta-title">
            Pronto para conhecer nossas soluções em materiais cirúrgicos?
          </h2>
          <p className="text-primary-foreground/90 text-lg md:text-xl mb-10 leading-relaxed" data-testid="text-cta-subtitle">
            Descubra como nossos produtos podem elevar a qualidade dos seus procedimentos cirúrgicos
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold px-10 py-6 text-lg h-auto"
            data-testid="button-cta-produtos"
          >
            <a href="/produtos" className="inline-flex items-center gap-2">
              Conheça nossos produtos
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
