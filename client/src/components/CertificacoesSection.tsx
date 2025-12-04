import { certificacoesConfig as c } from "@/data/certificacoes";

export function CertificacoesSection() {
  if (!c.ativo) return null;

  return (
    <section
      className="relative w-full bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${c.imagem})`,
        paddingTop: "80px",
        paddingBottom: "80px",
      }}
      data-testid="section-certificacoes"
    >
      <div className="mx-auto max-w-[1280px] px-8">
        {/* Conteúdo */}
        <div className="flex flex-col md:items-end">
          {/* Tag/Badge */}
          <div style={{ marginBottom: "24px" }}>
            <span
              className="inline-block bg-[#0d70dc] text-white uppercase rounded-full"
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 600, // Semibold
                fontSize: "14px",
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

          {/* Título H2 para SEO */}
          <h2
            className="text-[#1A1A1A]"
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
            className="text-[#1A1A1A]"
            style={{
              fontFamily: "Lato, sans-serif",
              fontWeight: 400, // Regular
              fontSize: "20px",
              lineHeight: 1.6,
              maxWidth: "540px",
              marginBottom: "32px",
            }}
            data-testid="text-certificacoes-institucional"
          >
            {c.textoInstitucional}
          </p>
        </div>

        {/* Botão centralizado horizontalmente na seção inteira */}
        {c.mostrarBotao && c.textoBotao && c.linkBotao && (
          <div className="flex justify-center w-full mt-8">
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

