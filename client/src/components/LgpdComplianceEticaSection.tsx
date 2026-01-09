import { lgpdPageConfig as d } from "@/data/lgpdPage";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function LgpdComplianceEticaSection() {
  return (
    <section className="bg-[#01155a] text-white py-24 px-8">
      <SectionContainer>
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="rounded-[30px] overflow-hidden">
            <img 
              src={d.secaoCompliance.imagem} 
              alt="Compliance" 
              className="w-full h-auto max-h-[31.25rem] object-cover" 
            />
          </div>
          <div className="text-center md:text-left">
            <SectionTitle level={2} className="text-white mb-8" highlightedText="Ética">
              Compliance e Ética
            </SectionTitle>
            <p className="text-[#0d70dc] text-body-lg md:text-body-lg-md mb-10 leading-relaxed font-lato">
              {d.secaoCompliance.descricao}
            </p>
            <ul className="space-y-4">
              {d.secaoCompliance.lista.map((item) => (
                <li key={item} className="flex items-start gap-3 text-body md:text-body-lg text-white font-lato">
                  <span className="text-[#0d70dc] text-2xl leading-none">•</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

