import { quemSomosConfig as c } from "@/data/quemSomos";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function QuemSomosSection() {
  if (!c.ativo) return null;

  return (
    <section
      className="relative w-full bg-cover bg-no-repeat pt-0 md:pt-[120px] min-h-[400px] md:min-h-[760px] pb-16 md:pb-[140px]"
      style={{
        backgroundImage: `url(${c.backgroundImage})`,
        backgroundPosition: "right center",
        maxHeight: "820px",
      }}
      data-testid="section-quem-somos"
    >
      {/* Overlay branco para clarear a imagem apenas no mobile */}
      <div className="absolute inset-0 bg-white/40 pointer-events-none md:hidden" />

      {/* Curva inferior branca - 160px altura */}
      <div
        className="absolute bottom-0 left-0 w-full bg-white pointer-events-none"
        style={{
          height: "40px",
          clipPath: "ellipse(90% 40% at 50% 100%)",
        }}
      />

      {/* Container centralizado com 1280px max-width e 32px padding lateral */}
      <SectionContainer className="relative h-full flex items-center">
        {/* Conteúdo alinhado à esquerda */}
        <div className="max-w-[640px] mb-8 w-full flex flex-col justify-center md:block">
          {/* Selo "QUEM SOMOS" */}
          <div className="flex justify-center mb-4 mt-8 md:mt-0">
            <SectionBadge variant="primary" className="min-w-[140px]">
              {c.tituloSessao}
            </SectionBadge>
          </div>

          {/* Título Principal */}
          <SectionTitle
            level={2}
            className="text-[#0a324c] mb-6 text-center md:text-left max-w-[600px]"
          >
            {c.titulo}
          </SectionTitle>

          {/* Descrição */}
          <p
            className="hidden md:block text-[#4A4A4A] text-body-md md:text-body-lg leading-relaxed font-lato max-w-[640px] mb-8"
            data-testid="text-quem-somos-desc"
          >
            {c.descricao}
          </p>
        </div>

        {/* Botão centralizado horizontalmente na seção inteira */}
        {c.mostrarBotao && c.textoBotao && c.linkBotao && (
          <div className="hidden md:flex justify-center w-full">
            <a
              href={c.linkBotao}
              className="inline-flex items-center justify-center bg-[#0d70dc] text-white rounded-full hover:opacity-90 transition uppercase text-body-sm md:text-xl px-6 md:px-8 py-2 md:py-3 min-h-[2.25rem] md:min-h-[3rem] font-bold font-lato tracking-wide"
              data-testid="button-quem-somos-cta"
            >
              {c.textoBotao.toUpperCase()}
            </a>
          </div>
        )}
      </SectionContainer>
    </section>
  );
}

