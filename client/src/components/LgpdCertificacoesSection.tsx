import { lgpdPageConfig as d } from "@/data/lgpdPage";

export function LgpdCertificacoesSection() {
  return (
    <div className="mt-[100px] lg:mt-[180px] pb-20 bg-white">
      {/* Breadcrumb e título */}
      <div className="mx-auto max-w-[1280px] px-8 text-center mb-16">
        <span className="text-base font-semibold text-gray-600 uppercase tracking-[0.2em] block mb-4 font-lato">
          {d.breadcrumb}
        </span>
        <h1 className="text-[#0a324c] text-[36px] md:text-[56px] font-[900] font-lato leading-tight">
          Certificações e <span className="text-[#0d70dc]">qualidade</span>
        </h1>
      </div>

      {/* Certificações */}
      <section className="mx-auto max-w-[1280px] px-8 grid grid-cols-1 md:grid-cols-4 gap-10 mb-24 relative">
        {d.secaoCertificacoes.itens.map((item, index) => (
          <div 
            key={item.id} 
            className="flex flex-col items-center text-center relative
              md:after:content-[''] md:after:absolute md:after:top-[48px] md:after:left-[calc(50%+48px+1rem)] md:after:w-[calc(50%-48px+1.5rem)] md:after:h-[4px] md:after:bg-[#0a324c]
              md:last:after:hidden"
          >
            <div className="w-24 h-24 mb-6 rounded-full border-4 border-[#0d70dc] flex items-center justify-center p-2 bg-white relative overflow-hidden">
              {/* Container interno com overflow para cortar imagem em círculo */}
              <div className="absolute inset-2 rounded-full overflow-hidden">
                <img src={item.img} alt={item.label} className="object-contain w-full h-full" />
              </div>
              {/* Anel azul externo acima da imagem */}
              <div className="absolute inset-[-4px] rounded-full border-[6px] border-[#0d70dc] z-10 pointer-events-none" />
            </div>
            <h3 className="font-bold text-[#0a324c] mb-2 text-sm md:text-base font-lato">
              {item.label}
            </h3>
            <p className="text-base text-[#0a324c] leading-relaxed max-w-[180px] font-lato">
              {item.sublabel}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}

