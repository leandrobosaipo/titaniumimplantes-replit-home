import { quemSomosPageConfig as c } from "@/data/quemSomosPage";

export function QuemSomosHeroSection() {
  return (
    <section className="relative h-[400px] md:h-[500px] flex items-center justify-center text-center mt-[70px] lg:mt-[130px]">
      <div className="absolute inset-0 z-0">
        <img
          src={c.hero.backgroundImage}
          className="w-full h-full object-cover brightness-50"
          alt="Background"
        />
      </div>
      <h1 className="relative z-10 text-white text-3xl md:text-5xl lg:text-6xl font-black max-w-4xl px-6 leading-tight font-lato">
        {c.hero.titulo}
      </h1>
    </section>
  );
}

