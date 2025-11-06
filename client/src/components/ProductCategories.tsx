import { Package, Activity, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: "1",
    title: "Cirurgia de Coluna",
    description: "Soluções avançadas para procedimentos em coluna vertebral com tecnologia de ponta e materiais de alta qualidade.",
    icon: Activity,
  },
  {
    id: "2",
    title: "Materiais Cirúrgicos",
    description: "Amplo portfólio de instrumentais e materiais cirúrgicos para diversas especialidades médicas.",
    icon: Package,
  },
  {
    id: "3",
    title: "Implantes Ortopédicos",
    description: "Implantes e próteses ortopédicas certificadas para garantir a melhor recuperação dos pacientes.",
    icon: Heart,
  },
];

export function ProductCategories() {
  return (
    <section className="py-16 md:py-24 bg-background" data-testid="section-categories">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider bg-accent px-4 py-2 rounded-full" data-testid="text-categories-badge">
              Nossos Produtos
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4" data-testid="text-categories-title">
            Soluções em saúde para especialidades cirúrgicas
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto" data-testid="text-categories-subtitle">
            Fornecemos soluções completas com produtos certificados e tecnologia de última geração
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={category.id} 
              className="hover-elevate transition-all duration-300 border-card-border"
              data-testid={`card-category-${index}`}
            >
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <category.icon className="w-8 h-8 text-primary" data-testid={`icon-category-${index}`} />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3" data-testid={`text-category-title-${index}`}>
                  {category.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed" data-testid={`text-category-desc-${index}`}>
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
