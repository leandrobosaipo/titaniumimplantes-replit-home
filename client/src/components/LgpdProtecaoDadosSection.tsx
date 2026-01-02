import { lgpdPageConfig as d } from "@/data/lgpdPage";
import { Search, Edit3, Undo2, Share, Lock } from "lucide-react";

const lgpdIconMap = {
  search: Search,
  edit: Edit3,
  undo: Undo2,
  share: Share,
} as const;

export function LgpdProtecaoDadosSection() {
  return (
    <section className="bg-white py-24 px-8">
      <div className="mx-auto max-w-[1280px]">
        <div className="bg-[#0d70dc] rounded-3xl p-12 md:p-16">
          {/* Área superior: título + ilustração */}
          <div className="grid md:grid-cols-2 gap-16 mb-12 items-center">
            <h2 className="text-white text-[48px] md:text-[56px] font-[900] leading-tight font-lato">
              LGPD
              <br />
              Proteção de Dados
            </h2>
            <div className="flex justify-center md:justify-end">
              <Lock className="w-32 h-32 md:w-40 md:h-40 text-white/80" />
            </div>
          </div>
          
          {/* Área inferior: direitos */}
          <div className="mt-12 border border-white/30 rounded-xl p-8 bg-white/5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative">
              {/* Linhas divisórias verticais */}
              <div className="hidden md:block absolute left-1/4 top-0 bottom-0 w-[1px] bg-white/30" />
              <div className="hidden md:block absolute left-2/4 top-0 bottom-0 w-[1px] bg-white/30" />
              <div className="hidden md:block absolute left-3/4 top-0 bottom-0 w-[1px] bg-white/30" />
              
              {d.secaoLgpd.cards.map((card) => {
                const Icon = lgpdIconMap[card.icone];
                return (
                  <div
                    key={card.id}
                    className="flex flex-col items-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#01155a] flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-white text-base font-medium text-center leading-relaxed font-lato">
                      {card.texto}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

