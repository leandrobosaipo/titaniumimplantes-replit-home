"use client";

import { useState, useEffect } from "react";
import { quemSomosPageConfig as c } from "@/data/quemSomosPage";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function QuemSomosEstruturaSection() {
  const imagens = Array.isArray(c.estrutura.imagem) ? c.estrutura.imagem : [c.estrutura.imagem];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoplayInterval = 5000;

  useEffect(() => {
    if (!isAutoPlaying || imagens.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % imagens.length);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, imagens.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="py-16 md:py-24 bg-white px-8 text-center">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="text-[#60a5fa] text-5xl md:text-6xl font-black mb-6 font-lato">
          {c.estrutura.titulo}
        </h2>
        <p className="text-2xl text-[#4A4A4A] mb-12 max-w-3xl mx-auto">
          {c.estrutura.subtitulo}
        </p>

        <div className="mb-12 rounded-[40px] overflow-hidden shadow-xl max-w-5xl mx-auto relative">
          <div className="relative w-full aspect-video">
            {imagens.map((imagem, index) => {
              const isActive = index === currentSlide;
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <img
                    src={imagem}
                    alt={`Estrutura ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              );
            })}
          </div>

          {/* Paginador inferior - linha grossa */}
          {imagens.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {imagens.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 transition-all duration-300 touch-manipulation ${
                    index === currentSlide
                      ? "bg-[#0d70dc] w-16"
                      : "bg-[#60a5fa] opacity-50 hover:opacity-75 w-8"
                  }`}
                  aria-label={`Ir para o slide ${index + 1}`}
                  style={{ borderRadius: "2px" }}
                />
              ))}
            </div>
          )}
        </div>

        <p className="text-lg text-[#1A1A1A] font-bold max-w-4xl mx-auto mb-16">
          {c.estrutura.textoFinal}
        </p>

        <Separator className="mb-12 max-w-4xl mx-auto" />

        <Card className="max-w-4xl mx-auto border-0 shadow-lg bg-white">
          <CardContent className="pt-8 pb-10 px-8 md:px-12">
            <div className="flex flex-col items-center space-y-6">
              <span
                className="inline-block bg-[#0d70dc] text-white uppercase rounded-full"
                style={{
                  fontFamily: "Lato, sans-serif",
                  fontWeight: 600,
                  fontSize: "14px",
                  letterSpacing: "1px",
                  padding: "6px 20px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {c.estrutura.propositoBadge}
              </span>
              <p
                className="text-xl md:text-2xl text-[#0a324c] text-center leading-relaxed max-w-3xl"
                style={{
                  fontFamily: "Lato, sans-serif",
                  fontWeight: 400,
                  lineHeight: 1.6,
                }}
              >
                {c.estrutura.propositoTexto}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

