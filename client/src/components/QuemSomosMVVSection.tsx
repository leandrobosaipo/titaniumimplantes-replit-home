import React from "react";
import { quemSomosPageConfig as c } from "@/data/quemSomosPage";
import { Gem, Eye, Rocket } from "lucide-react";

// Função para formatar valores com labels em negrito
function formatValuesText(text: string): React.ReactNode {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, index) => {
        if (!line.trim()) return null;
        const colonIndex = line.indexOf(":");
        if (colonIndex > 0) {
          const label = line.substring(0, colonIndex + 1);
          const description = line.substring(colonIndex + 1).trim();
          return (
            <React.Fragment key={index}>
              <span className="font-bold">{label}</span>
              {description && <span> {description}</span>}
              {index < lines.length - 1 && <br />}
            </React.Fragment>
          );
        }
        return (
          <React.Fragment key={index}>
            {line}
            {index < lines.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </>
  );
}

// Função para obter o texto de fundo baseado no tipo
function getBackgroundText(tipo: string): string {
  switch (tipo) {
    case "missao":
      return "Missão";
    case "visao":
      return "Visão";
    case "valores":
      return "Valores";
    default:
      return "";
  }
}

export function QuemSomosMVVSection() {
  return (
    <section className="py-16 bg-[#F4F5F7] px-8">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
        {c.mvv.map((item) => (
          <div
            key={item.id}
            className="bg-[#01155a] text-white p-10 pt-20 rounded-[40px] flex flex-col shadow-lg relative min-h-[500px] md:min-h-[400px]"
          >
            {/* Texto de fundo vertical */}
            <div
              className="absolute right-0 bottom-0 pointer-events-none rotate-180 pr-0 md:pr-5"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontSize: "120px",
                fontWeight: 900,
                color: "rgba(96, 165, 250, 0.15)",
                fontFamily: "Lato, sans-serif",
                paddingBottom: "20px",
              }}
            >
              {getBackgroundText(item.tipo)}
            </div>

            {/* Ícone sobrepondo 50% da altura */}
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 z-10"
              style={{ top: '-48px' }}
            >
              <div className="bg-[#60a5fa] p-5 rounded-full">
                {item.tipo === "missao" && <Rocket size={64} className="text-white" />}
                {item.tipo === "visao" && <Eye size={64} className="text-white" />}
                {item.tipo === "valores" && <Gem size={64} className="text-white" />}
              </div>
            </div>

            {/* Conteúdo */}
            <div className="relative z-10 w-full">
              <h3 className="text-[44px] font-bold mb-6 font-lato text-[#60a5fa] text-center">
                {item.titulo}
              </h3>
              <div className="text-white leading-relaxed text-lg text-left">
                {item.tipo === "valores" ? (
                  formatValuesText(item.descricao)
                ) : (
                  <p className="whitespace-pre-line">{item.descricao}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

