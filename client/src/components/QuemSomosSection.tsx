import { quemSomosConfig as c } from "@/data/quemSomos";

export function QuemSomosSection() {
  if (!c.ativo) return null;

  return (
    <section
      className="relative w-full bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${c.backgroundImage})`,
        backgroundPosition: "right center",
        minHeight: "760px",
        maxHeight: "820px",
        paddingTop: "120px",
        paddingBottom: "140px",
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
      <div className="relative mx-auto max-w-[1280px] px-8">
        {/* Conteúdo alinhado à esquerda */}
        <div className="max-w-[640px] mb-8">
          {/* Selo "QUEM SOMOS" */}
          <div className="mb-4">
            <span
              className="inline-block bg-[#0d70dc] text-white uppercase rounded-full text-[18px] md:text-[18px]"
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 600, // Semibold
                height: "32px",
                minWidth: "140px",
                borderRadius: "16px",
                letterSpacing: "1px",
                padding: "4px 16px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              data-testid="text-quem-somos-badge"
            >
              
              {c.tituloSessao}
            </span>
          </div>

          {/* Título Principal */}
          <h2
            className="text-[#0a324c] mb-6 text-[32px] md:text-[40px] lg:text-[40px]"
            style={{
              fontFamily: "Lato, sans-serif",
              fontWeight: 900, // Heavy
              lineHeight: 1.2,
              maxWidth: "600px",
              marginBottom: "24px",
            }}
            data-testid="text-quem-somos-title"
          >
            {c.titulo}
          </h2>

          {/* Descrição */}
          <p
            className="text-[#4A4A4A] text-[18px] md:text-[24px] lg:text-[24px]"
            style={{
              fontFamily: "Lato, sans-serif",
              fontWeight: 400, // Regular
              lineHeight: 1.55,
              maxWidth: "640px",
              marginBottom: "32px",
            }}
            data-testid="text-quem-somos-desc"
          >
            {c.descricao}
          </p>
        </div>

        {/* Botão centralizado horizontalmente na seção inteira */}
        {c.mostrarBotao && c.textoBotao && c.linkBotao && (
          <div className="flex justify-center w-full">
            <a
              href={c.linkBotao}
              className="inline-flex items-center justify-center bg-[#0d70dc] text-white rounded-full hover:opacity-90 transition uppercase text-[14px] md:text-[20px] px-6 md:px-8 py-2 md:py-3 min-h-[36px] md:min-h-[48px]"
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 700, // Bold
                borderRadius: "999px",
                letterSpacing: "0.5px",
              }}
              data-testid="button-quem-somos-cta"
            >
              {c.textoBotao.toUpperCase()}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

