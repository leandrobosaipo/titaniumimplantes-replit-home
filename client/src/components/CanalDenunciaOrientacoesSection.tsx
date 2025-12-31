import { canalDenunciaPageConfig as c } from "@/data/canalDenunciaPage";
import { FileText, Clock, Search, FileCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { designConstants as d } from "@/lib/designConstants";

// Mapa de ícones
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Clock,
  Search,
  FileCheck,
};

export function CanalDenunciaOrientacoesSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Título */}
        <h2
          className="text-3xl md:text-4xl font-black font-lato text-center mb-8 md:mb-12"
          style={{ color: d.colors.text.primary }}
        >
          {c.orientacoes.titulo}
        </h2>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {c.orientacoes.cards.map((card) => {
            const IconComponent = iconMap[card.icone] || FileText;
            return (
              <Card
                key={card.numero}
                className="bg-[#F4F5F7] border-0 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl"
              >
                <CardContent className="p-6 md:p-8 text-center">
                  {/* Número */}
                  <div className="w-10 h-10 bg-[#0d70dc] text-white rounded-full flex items-center justify-center font-bold font-lato mb-4 mx-auto">
                    {card.numero}
                  </div>

                  {/* Ícone */}
                  <div className="mb-4 flex justify-center">
                    <IconComponent className="w-6 h-6 text-[#0d70dc]" />
                  </div>

                  {/* Título */}
                  <h3
                    className="font-lato font-bold text-xl mb-3"
                    style={{ color: d.colors.text.primary }}
                  >
                    {card.titulo}
                  </h3>

                  {/* Descrição */}
                  <p className="font-lato text-base text-[#4A4A4A]">{card.descricao}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Texto Complementar */}
        <div className="mt-12 space-y-6 text-lg font-lato text-[#4A4A4A] leading-relaxed max-w-4xl mx-auto text-center md:text-left">
          {c.orientacoes.textos.map((texto, index) => (
            <p key={index}>{texto}</p>
          ))}

          {/* Email */}
          <p>
            <a
              href={`mailto:${c.orientacoes.email}`}
              className="text-[#0d70dc] hover:text-[#0953b0] font-semibold underline"
            >
              {c.orientacoes.email}
            </a>
          </p>

          {/* Última frase com destaque sutil */}
          <p className="font-semibold text-[#0a324c] mt-8">
            Desde já, agradecemos o seu relato.
          </p>
        </div>
      </div>
    </section>
  );
}

