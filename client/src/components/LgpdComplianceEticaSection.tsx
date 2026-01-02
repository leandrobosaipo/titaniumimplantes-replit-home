import { lgpdPageConfig as d } from "@/data/lgpdPage";

export function LgpdComplianceEticaSection() {
  return (
    <section className="bg-[#01155a] text-white py-24 px-8">
      <div className="mx-auto max-w-[1280px] grid md:grid-cols-2 gap-20 items-center">
        <div className="rounded-[30px] overflow-hidden">
          <img 
            src={d.secaoCompliance.imagem} 
            alt="Compliance" 
            className="w-full h-auto max-h-[500px] object-cover" 
          />
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-white text-[48px] md:text-[56px] font-[900] mb-8 font-lato">
            Compliance e <span className="text-[#0d70dc]">Ética</span>
          </h2>
          <p className="text-[#0d70dc] text-xl mb-10 leading-relaxed font-lato">
            {d.secaoCompliance.descricao}
          </p>
          <ul className="space-y-4">
            {d.secaoCompliance.lista.map((item) => (
              <li key={item} className="flex items-start gap-3 text-lg text-white font-lato">
                <span className="text-[#0d70dc] text-2xl leading-none">•</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

