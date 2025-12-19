import { Layout } from "@/components/Layout";
import { PageSEO } from "@/components/SEO/PageSEO";
import { quemSomosPageConfig as c } from "@/data/quemSomosPage";
import { Diamond, Eye, Rocket } from "lucide-react";

export default function QuemSomos() {
  return (
    <Layout>
      <PageSEO
        title="Quem Somos | Titanium Implantes"
        description="Conheça a história e o compromisso da Titanium Implantes com a excelência em materiais cirúrgicos."
      />

      {/* Seção 1: Hero Banner */}
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

      {/* Seção 2: História */}
      <section className="py-16 md:py-24 bg-white px-8">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-[#4A4A4A] text-lg leading-relaxed font-lato space-y-6">
            {c.historia.texto.split("\n\n").map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={c.historia.imagem}
              alt="Nossa História"
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Seção 3: Missão, Visão e Valores */}
      <section className="py-16 bg-[#F4F5F7] px-8">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-3 gap-8">
          {c.mvv.map((item) => (
            <div
              key={item.id}
              className="bg-[#0d70dc] text-white p-10 rounded-[40px] flex flex-col items-center text-center shadow-lg"
            >
              <div className="mb-6 bg-white/20 p-4 rounded-full">
                {item.tipo === "missao" && <Rocket size={40} />}
                {item.tipo === "visao" && <Eye size={40} />}
                {item.tipo === "valores" && <Diamond size={40} />}
              </div>
              <h3 className="text-2xl font-bold mb-4 font-lato">{item.titulo}</h3>
              <p className="whitespace-pre-line leading-relaxed">{item.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Seção 4: Estrutura e Diferenciais */}
      <section className="py-16 md:py-24 bg-white px-8 text-center">
        <div className="max-w-[1280px] mx-auto">
          <h2 className="text-[#0d70dc] text-4xl md:text-5xl font-black mb-6 font-lato">
            {c.estrutura.titulo}
          </h2>
          <p className="text-xl text-[#4A4A4A] mb-12 max-w-3xl mx-auto">
            {c.estrutura.subtitulo}
          </p>

          <div className="mb-12 rounded-[40px] overflow-hidden shadow-xl max-w-5xl mx-auto">
            <img src={c.estrutura.imagem} alt="Estrutura" className="w-full" />
          </div>

          <p className="text-lg text-[#1A1A1A] font-bold max-w-4xl mx-auto mb-16">
            {c.estrutura.textoFinal}
          </p>

          <div className="space-y-6">
            <span className="inline-block bg-[#0d70dc] text-white px-6 py-2 rounded-full font-bold tracking-widest text-sm">
              {c.estrutura.propositoBadge}
            </span>
            <p className="text-xl md:text-2xl text-[#0a324c] font-medium max-w-4xl mx-auto leading-relaxed">
              {c.estrutura.propositoTexto}
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
