import { canalDenunciaPageConfig as c } from "@/data/canalDenunciaPage";
import { Monitor, Hourglass, Search, FileText, Paperclip } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { designConstants as d } from "@/lib/designConstants";

// Mapa de ícones
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Monitor,
  Hourglass,
  Search,
  FileText,
  Paperclip,
};

export function CanalDenunciaOrientacoesSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-[10%]">
        {/* Título */}
        <h2
          className="text-4xl md:text-5xl font-black font-lato text-center mb-8 md:mb-12"
          style={{ color: d.colors.text.primary }}
        >
          {c.orientacoes.titulo}
        </h2>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {c.orientacoes.cards.map((card) => {
            const IconComponent = iconMap[card.icone] || Monitor;
            // Para o card de documentos, usar composição de ícones
            const isDocumentosCard = card.numero === 4;
            return (
              <Card
                key={card.numero}
                className="bg-[#F4F5F7] border-0 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl relative"
              >
                <CardContent className="p-6 md:p-8 relative min-h-[300px] flex flex-col">
                  {/* Header: Número e Título na mesma linha */}
                  <div className="flex flex-row items-center gap-3 mb-4">
                    {/* Número */}
                    <div className="w-10 h-10 bg-[#0d70dc] text-white rounded-full flex items-center justify-center font-bold font-lato flex-shrink-0">
                      {card.numero}
                    </div>

                    {/* Título */}
                    <h3
                      className="font-lato font-bold text-xl"
                      style={{ color: d.colors.text.primary }}
                    >
                      {card.titulo}
                    </h3>
                  </div>

                  {/* Descrição - Centralizada horizontalmente apenas, com espaço para ícone */}
                  <div className="flex-1 flex justify-center text-center mb-20">
                    <p className="font-lato text-base text-[#4A4A4A]">{card.descricao}</p>
                  </div>

                  {/* Ícone - Posicionado no bottom, centralizado */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex justify-center items-end">
                    {isDocumentosCard ? (
                      <div className="relative">
                        <FileText className="w-20 h-20 text-[#0d70dc]" />
                        <Paperclip className="absolute -bottom-1 -right-1 w-5 h-5 text-[#0d70dc]" />
                      </div>
                    ) : (
                      <IconComponent className="w-20 h-20 text-[#0d70dc]" />
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Texto Complementar */}
        <div className="mt-12 space-y-6 text-lg font-lato text-[#4A4A4A] leading-relaxed max-w-4xl mx-auto text-center">
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

