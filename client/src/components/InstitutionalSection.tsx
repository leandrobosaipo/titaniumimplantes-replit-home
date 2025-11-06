import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Shield, Users } from "lucide-react";

const highlights = [
  {
    icon: Award,
    title: "Qualidade Certificada",
    description: "Produtos certificados e aprovados pelos principais órgãos reguladores",
  },
  {
    icon: Shield,
    title: "Segurança e Confiabilidade",
    description: "Compromisso com a segurança em todos os nossos processos",
  },
  {
    icon: Users,
    title: "Parceiros de Excelência",
    description: "Parcerias com líderes mundiais do setor médico-hospitalar",
  },
];

export function InstitutionalSection() {
  return (
    <section className="py-16 md:py-24 bg-muted" data-testid="section-institutional">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-block mb-6">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider bg-accent px-4 py-2 rounded-full" data-testid="text-institutional-badge">
                Quem Somos
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight" data-testid="text-institutional-title">
              Comprometidos com a excelência em saúde
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed" data-testid="text-institutional-desc">
              A Titanium Implantes nasceu com o propósito de fornecer soluções de alta qualidade para o mercado de materiais cirúrgicos e implantes médicos. Com respeito, segurança, inovação e compromisso com a saúde, trabalhamos para oferecer o melhor aos profissionais da área médica.
            </p>

            <div className="space-y-6 mb-8">
              {highlights.map((item, index) => (
                <div key={index} className="flex gap-4" data-testid={`highlight-${index}`}>
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1" data-testid={`text-highlight-title-${index}`}>
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm" data-testid={`text-highlight-desc-${index}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              asChild
              variant="default"
              size="lg"
              className="font-semibold"
              data-testid="button-saiba-mais"
            >
              <a href="/quem-somos" className="inline-flex items-center gap-2">
                Saiba mais sobre nós
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&h=600&fit=crop"
                alt="Equipe médica em ambiente hospitalar"
                className="w-full h-[400px] md:h-[500px] object-cover"
                data-testid="img-institutional"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
