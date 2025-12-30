import { certificacoesConfig as c } from "@/data/certificacoes";

export function CertificacoesSection() {
  if (!c.ativo) return null;

  return (
    <section
      className="relative w-full pt-12 pb-12 md:bg-cover md:bg-no-repeat md:bg-center md:pt-20 md:pb-20"
      style={{
        backgroundImage: `url(${c.imagem})`,
      }}
      data-testid="section-certificacoes"
    >
      {/* Overlay azul escuro no mobile */}
      <div className="absolute inset-0 bg-[#01155a] md:hidden" />
      <div className="relative mx-auto max-w-[600px] px-6 text-center md:max-w-[1280px] md:px-8 md:text-left">
        {/* Conteúdo */}
        <div className="flex flex-col items-center md:items-end">
          {/* Tag/Badge */}
          <div style={{ marginBottom: "20px" }}>
            <span
              className="inline-block bg-[#1E4DD9] text-white uppercase rounded-full text-lg md:bg-[#0d70dc] md:text-sm"
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 600, // Semibold
                borderRadius: "999px",
                padding: "6px 18px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                letterSpacing: "0.5px",
              }}
              data-testid="text-certificacoes-badge"
            >
              {c.tituloSessao}
            </span>
          </div>

          {/* Título H2 para SEO - Oculto no mobile */}
          <h2
            className="hidden text-[#1A1A1A] md:block"
            style={{
              fontFamily: "Lato, sans-serif",
              fontWeight: 700,
              fontSize: "28px",
              lineHeight: 1.2,
              maxWidth: "540px",
              marginBottom: "16px",
            }}
            data-testid="text-certificacoes-title"
          >
            Certificações e Compliance
          </h2>

          {/* Texto Institucional */}
          <p
            className="text-white text-center leading-[1.4] max-w-[90%] text-2xl md:text-[#1A1A1A] md:text-[20px] md:leading-[1.6] md:max-w-[540px]"
            style={{
              fontFamily: "Lato, sans-serif",
              fontWeight: 400, // Regular
              marginBottom: "32px",
            }}
            data-testid="text-certificacoes-institucional"
          >
            {c.textoInstitucional}
          </p>
        </div>

        {/* Botão centralizado horizontalmente na seção inteira - Oculto no mobile */}
        {c.mostrarBotao && c.textoBotao && c.linkBotao && (
          <div className="hidden justify-center w-full mt-8 md:flex">
            <a
              href={c.linkBotao}
              className="inline-flex items-center justify-center bg-[#0d70dc] text-white rounded-full hover:bg-[#0d70dc] transition uppercase"
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 600, // Semibold
                fontSize: "16px",
                borderRadius: "999px",
                padding: "14px 32px",
                letterSpacing: "0.5px",
              }}
              data-testid="button-certificacoes-cta"
            >
              {c.textoBotao.toUpperCase()}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

