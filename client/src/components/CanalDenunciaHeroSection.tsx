import { canalDenunciaPageConfig as c } from "@/data/canalDenunciaPage";

export function CanalDenunciaHeroSection() {
  return (
    <section className="relative bg-[#01155a] flex items-center justify-center text-center py-24 md:py-32 mt-[70px] lg:mt-[130px]">
      {/* Overlay opcional para textura suave */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#01155a] to-[#012a7a] opacity-90"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-8">
        {/* Título de contexto */}
        <p className="text-white/80 text-sm md:text-base font-lato font-bold mb-4 uppercase tracking-wider">
          {c.hero.tituloContexto}
        </p>

        {/* H1 com palavra destacada */}
        <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-black font-lato leading-tight mb-8">
          {c.hero.titulo}{" "}
          <span className="text-[#60a5fa]">{c.hero.tituloDestaque}</span>
        </h1>

        {/* Texto institucional */}
        <div className="space-y-6 text-white text-lg md:text-xl font-lato font-semibold leading-relaxed">
          {c.hero.texto.map((paragrafo, index) => (
            <p key={index}>{paragrafo}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

