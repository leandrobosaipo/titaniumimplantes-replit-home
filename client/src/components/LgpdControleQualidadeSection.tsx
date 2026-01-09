import { lgpdPageConfig as d } from "@/data/lgpdPage";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function LgpdControleQualidadeSection() {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const percentage = 0.98;
  const strokeDasharray = `${circumference * percentage} ${circumference}`;
  const strokeDashoffset = circumference * 0.25;

  return (
    <section className="bg-white py-24 px-8">
      <SectionContainer>
        <SectionTitle level={2} className="text-center text-[#0a324c] mb-16" highlightedText="qualidade">
          Controle de qualidade
        </SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative">
          {/* Linhas divisórias verticais */}
          <div className="hidden md:block absolute left-1/3 top-0 bottom-0 w-[1px] bg-gray-200" />
          <div className="hidden md:block absolute left-2/3 top-0 bottom-0 w-[1px] bg-gray-200" />
          
          {d.secaoKpis.kpis.map((kpi) => {
            if (kpi.tipo === "circle") {
              // Bloco 1 - Taxa de Sucesso (98%)
              return (
                <div
                  key={kpi.id}
                  className="flex flex-col items-center justify-center space-y-4"
                >
                  <div className="relative">
                    <svg className="w-32 h-32 md:w-40 md:h-40" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="none"
                        stroke="#0d70dc"
                        strokeWidth="4"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        transform="rotate(-90 50 50)"
                      />
                      <text
                        x="50"
                        y="55"
                        textAnchor="middle"
                        fontSize="24"
                        fill="#0d70dc"
                        fontWeight="900"
                        fontFamily="Lato"
                      >
                        {kpi.valor}
                      </text>
                    </svg>
                  </div>
                  <p className="text-[#0a324c] font-semibold font-lato text-body">{kpi.label}</p>
                </div>
              );
            } else if (kpi.tipo === "stars") {
              // Bloco 2 - Experiência (+25 anos)
              return (
                <div
                  key={kpi.id}
                  className="flex flex-col items-center justify-center space-y-3"
                >
                  <div className="text-[#0d70dc] text-5xl md:text-6xl font-[900] font-lato mb-2">
                    {kpi.valor}
                  </div>
                  <p className="text-[#0a324c] font-semibold font-lato mb-3 text-body">
                    {kpi.label}
                  </p>
                  <div className="text-[#0d70dc] text-2xl">★★★★★</div>
                </div>
              );
            } else if (kpi.tipo === "bar") {
              // Bloco 3 - Rastreabilidade (100%)
              return (
                <div
                  key={kpi.id}
                  className="flex flex-col items-center justify-center space-y-3"
                >
                  <p className="text-[#0a324c] font-semibold font-lato mb-2 text-body">
                    {kpi.label}
                  </p>
                  <div className="text-[#0d70dc] text-5xl md:text-6xl font-[900] font-lato mb-3">
                    {kpi.valor}
                  </div>
                  <div className="flex gap-1 items-end min-h-[2rem]">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-2 bg-[#0d70dc] rounded-t"
                        style={{ height: `${100 - i * 2}%` }}
                      />
                    ))}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </SectionContainer>
    </section>
  );
}

