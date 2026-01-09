import { lgpdPageConfig as d } from "@/data/lgpdPage";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function LgpdCertificacoesSection() {
  return (
    <div className="mt-[100px] lg:mt-[180px] pb-20 bg-white">
      {/* Breadcrumb e título */}
      <SectionContainer className="text-center mb-16">
        <span className="text-body-sm md:text-body font-semibold text-gray-600 uppercase tracking-[0.2em] block mb-4 font-lato">
          {d.breadcrumb}
        </span>
        <SectionTitle level={1} className="text-[#0a324c]" highlightedText="qualidade">
          Certificações e qualidade
        </SectionTitle>
      </SectionContainer>

      {/* Certificações */}
      <section className="section-container grid grid-cols-1 md:grid-cols-4 gap-10 mb-24 relative">
        {d.secaoCertificacoes.itens.map((item, index) => (
          <div 
            key={item.id} 
            className="flex flex-col items-center text-center relative
              md:after:content-[''] md:after:absolute md:after:top-[3em] md:after:left-[calc(50%+3em+1rem)] md:after:w-[calc(50%-3em+1.5rem)] md:after:h-[4px] md:after:bg-[#0a324c]
              md:last:after:hidden"
          >
            <div className="w-24 h-24 md:w-28 md:h-28 mb-6 rounded-full border-4 border-[#0d70dc] flex items-center justify-center p-2 bg-white relative overflow-hidden">
              {/* Container interno com overflow para cortar imagem em círculo */}
              <div className="absolute inset-2 rounded-full overflow-hidden">
                <img src={item.img} alt={item.label} className="object-contain w-full h-full" />
              </div>
              {/* Anel azul externo acima da imagem */}
              <div className="absolute inset-[-4px] rounded-full border-[6px] border-[#0d70dc] z-10 pointer-events-none" />
            </div>
            <h3 className="font-bold text-[#0a324c] mb-2 text-body-sm md:text-body font-lato">
              {item.label}
            </h3>
            <p className="text-body text-[#0a324c] leading-relaxed max-w-[12rem] md:max-w-none font-lato">
              {item.sublabel}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

