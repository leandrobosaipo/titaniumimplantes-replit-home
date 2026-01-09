import { canalDenunciaPageConfig as c } from "@/data/canalDenunciaPage";
import { ScrollReveal } from "./ScrollReveal";
import bgImage from "@assets/denuncia/bg-topo-hero-canal-denuncia-min.png";

export function CanalDenunciaHeroSection() {
  return (
    <>
      <section
        className="relative bg-cover bg-no-repeat bg-center flex items-center justify-center text-center py-24 md:py-32 mt-[70px] lg:mt-[130px] min-h-[400px] md:min-h-[600px]"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      >
        {/* Overlay sutil para legibilidade do texto */}
        <div className="absolute inset-0 bg-[#01155a]/40"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-8">
          <ScrollReveal animation="fade-in" className="space-y-6">
            {/* Título de contexto */}
            <p className="text-white/80 text-sm md:text-base font-lato font-bold mb-4 uppercase tracking-wider">
              {c.hero.tituloContexto}
            </p>

            {/* H1 com palavra destacada */}
            <h1 className="text-white text-heading-1 md:text-heading-1-md lg:text-heading-1-lg font-black leading-tight font-lato mb-8">
              {c.hero.titulo}{" "}
              <span className="text-[#60a5fa]">{c.hero.tituloDestaque}</span>
            </h1>

            {/* Texto institucional */}
            <div className="space-y-6 text-white text-body-lg md:text-body-lg-md font-lato font-semibold leading-relaxed">
              {c.hero.texto.map((paragrafo, index) => (
                <p key={index} style={{ animationDelay: `${index * 100}ms` }}>
                  {paragrafo}
                </p>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Wave Divider - Hero para Orientações */}
      <div className="relative -mt-1">
        <svg
          className="w-full h-12 md:h-16"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z"
            fill="white"
            className="transition-all duration-500"
          />
        </svg>
      </div>
    </>
  );
}

