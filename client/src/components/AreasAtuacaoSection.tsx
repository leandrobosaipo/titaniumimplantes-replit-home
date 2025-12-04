import { areasAtuacaoConfig as c } from "@/data/areasAtuacao";

export function AreasAtuacaoSection() {
  if (!c.ativo) return null;

  return (
    <section
      className="relative w-full bg-white"
      style={{
        paddingTop: "80px",
        paddingBottom: "100px",
      }}
      data-testid="section-areas-atuacao"
    >
      <div className="mx-auto max-w-[1280px] px-8">
        <div className="text-center">
          {/* Selo "ÁREAS DE ATUAÇÃO" */}
          <div style={{ marginBottom: "24px" }}>
            <span
              className="inline-block bg-[#0d70dc] text-white uppercase rounded-full"
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 600, // Semibold
                fontSize: "25.47px",
                height: "36px",
                minWidth: "200px",
                borderRadius: "18px",
                padding: "4px 20px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                letterSpacing: "0.5px",
              }}
              data-testid="text-areas-atuacao-badge"
            >
              {c.tituloSessao}
            </span>
          </div>

          {/* Título Principal */}
          <h2
            className="text-[#0a324c] text-[36px] md:text-[50px] lg:text-[63.58px] mb-4"
            style={{
              fontFamily: "Lato, sans-serif",
              fontWeight: 900, // Heavy
              lineHeight: 1.2,
              marginBottom: "16px",
            }}
            data-testid="text-areas-atuacao-title"
          >
            {c.titulo}
          </h2>

          {/* Subtítulo */}
          <p
            className="text-[#0a324c] text-[22px] md:text-[28px] lg:text-[32px] mb-15"
            style={{
              fontFamily: "Lato, sans-serif",
              fontWeight: 400, // Regular para o texto completo
              lineHeight: 1.4,
              marginBottom: "60px",
            }}
            data-testid="text-areas-atuacao-subtitle"
          >
            <span style={{ fontWeight: 700 }}>Especialidades atendidas:</span>{" "}
            {c.subtitulo.replace("Especialidades atendidas: ", "")}
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {c.especialidades.map((especialidade) => (
            <div
              key={especialidade.id}
              className="relative"
              data-testid={`card-especialidade-${especialidade.id}`}
            >
              {/* Container da imagem com posição relativa */}
              <div className="relative mb-4">
                {/* Imagem */}
                <img
                  src={especialidade.imagem}
                  alt={`Soluções em implantes cirúrgicos para ${especialidade.titulo} - Titanium Implantes Cuiabá-MT`}
                  className="w-full object-cover h-[140px] md:h-[180px]"
                  style={{
                    borderRadius: "20px 20px 0 0",
                  }}
                  loading="lazy"
                  data-testid={`img-especialidade-${especialidade.id}`}
                />

                {/* Ícone circular sobreposto */}
                <div
                  className="absolute bottom-0 left-[5%] transform translate-y-1/2 rounded-full flex items-center justify-center bg-[#0d70dc] w-[50px] h-[50px] md:w-[60px] md:h-[60px]"
                  data-testid={`icon-especialidade-${especialidade.id}`}
                >
                  <img
                    src={especialidade.icone}
                    alt={`Ícone representativo de ${especialidade.titulo} - Titanium Implantes`}
                    className="object-contain w-[34px] h-[34px] md:w-[40px] md:h-[40px]"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Conteúdo do card (espaçamento para o ícone sobreposto) */}
              <div className="mt-8">
                {/* Título do card */}
                <h3
                  className="text-[#0a324c]"
                  style={{
                    fontFamily: "Lato, sans-serif",
                    fontWeight: 700, // Bold
                    fontSize: "25px",
                    marginBottom: "8px",
                  }}
                  data-testid={`text-card-title-${especialidade.id}`}
                >
                  {especialidade.titulo}
                </h3>

                {/* Descrição do card */}
                <p
                  className="text-[#4A4A4A]"
                  style={{
                    fontFamily: "Lato, sans-serif",
                    fontWeight: 400, // Regular
                    fontSize: "18px",
                    lineHeight: 1.55,
                    maxWidth: "260px",
                  }}
                  data-testid={`text-card-desc-${especialidade.id}`}
                >
                  {especialidade.descricao}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

