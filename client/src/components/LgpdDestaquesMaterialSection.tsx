import { lgpdPageConfig as d } from "@/data/lgpdPage";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function LgpdDestaquesMaterialSection() {
  return (
    <section className="bg-gray-50 py-24 px-8">
      <SectionContainer>
        <div className="grid md:grid-cols-2 items-center gap-20">
          <div className="flex justify-start">
            <img
              src={d.secaoDestaques.imagem}
              className="max-h-[38.75rem] object-contain"
              alt="Destaque Material"
            />
          </div>
          <div>
            <SectionTitle level={2} className="text-[#0a324c] mb-16 text-center md:text-left" highlightedText="material">
              Destaques do material
            </SectionTitle>
            {/* Grid responsivo mobile-first: mobile 1 col, tablet+ 2 cols */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {d.secaoDestaques.pills.map((text) => (
                <div
                  key={text}
                  className="bg-[#01155a] text-white px-6 py-3 md:px-10 md:py-5 rounded-full text-center text-body md:text-body-lg font-semibold min-h-[2.5em] flex items-center justify-center"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

