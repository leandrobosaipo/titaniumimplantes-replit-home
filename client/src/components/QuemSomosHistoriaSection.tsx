import React from "react";
import { quemSomosPageConfig as c } from "@/data/quemSomosPage";

// Função para destacar palavras-chave no texto
function highlightText(text: string): React.ReactNode {
  const highlights = [
    "Titanium Implantes",
    "coluna, neurocirurgia, bucomaxilofacial e otorrinolaringologia",
  ];

  // Encontra todas as ocorrências de highlights com suas posições
  const matches: Array<{ start: number; end: number; text: string }> = [];
  
  highlights.forEach((highlight) => {
    let index = text.indexOf(highlight);
    while (index !== -1) {
      matches.push({
        start: index,
        end: index + highlight.length,
        text: highlight,
      });
      index = text.indexOf(highlight, index + 1);
    }
  });

  // Ordena matches por posição
  matches.sort((a, b) => a.start - b.start);

  // Remove sobreposições (mantém apenas o primeiro)
  const filteredMatches: Array<{ start: number; end: number; text: string }> = [];
  let lastEnd = 0;
  matches.forEach((match) => {
    if (match.start >= lastEnd) {
      filteredMatches.push(match);
      lastEnd = match.end;
    }
  });

  // Se não há matches, retorna texto original
  if (filteredMatches.length === 0) {
    return text;
  }

  // Constrói array de elementos React
  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  let keyCounter = 0;

  filteredMatches.forEach((match) => {
    // Adiciona texto antes do match
    if (match.start > lastIndex) {
      result.push(text.substring(lastIndex, match.start));
    }
    // Adiciona highlight
    result.push(
      <span key={`highlight-${keyCounter++}`} className="text-[#60a5fa] font-semibold">
        {match.text}
      </span>
    );
    lastIndex = match.end;
  });

  // Adiciona texto restante
  if (lastIndex < text.length) {
    result.push(text.substring(lastIndex));
  }

  return <>{result}</>;
}

export function QuemSomosHistoriaSection() {
  const paragraphs = c.historia.texto.split("\n\n");

  return (
    <>
      <style>{`
        .historia-bg {
          background-image: url(${c.historia.imagem});
          background-position: left center;
          background-size: cover;
          background-repeat: no-repeat;
        }
        @media (min-width: 1024px) {
          .historia-bg {
            background-position: center;
          }
        }
      `}</style>
      <section className="py-16 md:py-24 px-6 relative historia-bg">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Coluna esquerda - Texto */}
            <div 
              className="text-[#0a324c] space-y-5" 
              style={{ textShadow: '0 1px 2px rgba(255,255,255,0.3)' }}
            >
              {paragraphs.map((paragraph, i) => (
                <p 
                  key={i}
                  className="text-[26px] leading-normal font-lato"
                >
                  {highlightText(paragraph)}
                </p>
              ))}
            </div>

            {/* Coluna direita - Vazia */}
            <div className="hidden lg:block" />
          </div>
        </div>
      </section>
    </>
  );
}

