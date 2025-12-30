import { excelenciaMateriaisConfig as c } from "@/data/excelenciaMateriais";

export function ExcelenciaMateriaisSection() {
  if (!c.ativo) return null;

  return (
    <section
      className="relative w-full bg-[#0953b0] md:bg-[#0d70dc] pt-12 pb-12 md:pt-24 md:pb-24"
      data-testid="section-excelencia-materiais"
    >
      <div className="mx-auto max-w-[640px] md:max-w-[1280px] px-5 md:px-8">
        {/* Versão Mobile: Badge e Título centralizados, KPIs horizontais */}
        <div className="md:hidden">
          {/* Badge centralizado */}
          <div className="mb-6 flex justify-center">
            <span
              className="inline-block bg-[#01155a] text-white uppercase rounded-full text-lg md:text-sm mx-auto md:mx-0"
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 600,
                borderRadius: "999px",
                padding: "6px 18px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                letterSpacing: "0.5px",
              }}
              data-testid="text-excelencia-badge"
            >
              {c.tituloSessao}
            </span>
          </div>

          {/* Título centralizado */}
          <h2
            className="text-white text-3xl md:text-[36px] lg:text-[56px] text-center md:text-left mb-8 md:mb-6"
            style={{
              fontFamily: "Lato, sans-serif",
              fontWeight: 800,
              lineHeight: 1.3,
            }}
            data-testid="text-excelencia-title"
          >
            {c.titulo}
          </h2>

          {/* Container de KPIs Mobile - Horizontal */}
          <div className="flex flex-col gap-5">
            {c.kpis.map((kpi) => (
              <div
                key={kpi.id}
                className="grid grid-cols-[3fr_2fr] rounded-xl overflow-hidden"
                data-testid={`card-kpi-${kpi.id}`}
              >
                {/* Lado Esquerdo: Texto (Azul Escuro) */}
                <div
                  className="bg-[#01155a] p-4 flex flex-col justify-center"
                  style={{
                    fontFamily: "Lato, sans-serif",
                  }}
                >
                  <h3
                    className="text-white"
                    style={{
                      fontSize: "18px",
                      fontWeight: 700,
                      lineHeight: 1.3,
                    }}
                    data-testid={`text-kpi-title-${kpi.id}`}
                  >
                    {kpi.titulo}
                  </h3>
                  <p
                    className="text-white"
                    style={{
                      fontSize: "16px",
                      opacity: 0.9,
                      lineHeight: 1.3,
                      marginTop: "4px",
                    }}
                  >
                    {kpi.subtitulo}
                  </p>
                </div>

                {/* Lado Direito: Número (Branco) */}
                <div
                  className="bg-white p-4 px-2 flex flex-col justify-center items-center text-center"
                  style={{
                    fontFamily: "Lato, sans-serif",
                  }}
                >
                  <div
                    className="text-[#0d70dc]"
                    style={{
                      fontSize: "52px",
                      fontWeight: 800,
                      lineHeight: 1,
                    }}
                    data-testid={`text-kpi-numero-${kpi.id}`}
                  >
                    {kpi.numero}
                  </div>
                  <p
                    className="text-[#0d70dc] mt-1"
                    style={{
                      fontSize: "18px",
                      fontWeight: 500,
                      lineHeight: 1.4,
                    }}
                    data-testid={`text-kpi-legenda-${kpi.id}`}
                  >
                    {kpi.legenda}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Versão Desktop: Grid 2 colunas, mantém estrutura original */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Coluna Esquerda: Tag, Título e Parágrafo (empilhados) */}
          <div className="flex flex-col">
            {/* Tag/Badge */}
            <div style={{ marginBottom: "28px" }}>
              <span
                className="inline-block bg-[#01155a] text-white uppercase rounded-full"
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
                data-testid="text-excelencia-badge-desktop"
              >
                {c.tituloSessao}
              </span>
            </div>

            {/* Título Grande */}
            <h2
              className="text-white text-[36px] md:text-[48px] lg:text-[56px]"
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 900, // Heavy
                lineHeight: 1.2,
                marginBottom: "24px",
              }}
              data-testid="text-excelencia-title-desktop"
            >
              {c.titulo}
            </h2>

            {/* Parágrafo Institucional */}
            <p
              className="text-white hidden md:block"
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 400, // Regular
                fontSize: "18px",
                lineHeight: 1.6,
                whiteSpace: "pre-line",
                maxWidth: "420px",
              }}
              data-testid="text-excelencia-desc"
            >
              {c.descricao} Explore nossas <a href="#areas-atuacao" className="text-white hover:underline font-semibold">especialidades</a> e conheça nossa <a href="/quem-somos" className="text-white hover:underline font-semibold">história e compromisso</a>.
            </p>
          </div>

          {/* Coluna Direita: Texto Institucional + KPIs (2 linhas) */}
          <div className="flex flex-col gap-6 md:gap-8">
            {/* Linha 1: Texto Institucional */}
            <p
              className="text-white hidden md:block"
              style={{
                fontFamily: "Lato, sans-serif",
                fontWeight: 400, // Regular
                fontSize: "20px",
                lineHeight: 1.6,
                maxWidth: "80%",
                marginBottom: "28px",
              }}
              data-testid="text-excelencia-lateral"
            >
              {c.textoLateral}
            </p>

            {/* Linha 2: Container de KPIs */}
            <div className="hidden md:grid md:grid-cols-3 gap-6 md:overflow-visible">
              {c.kpis.map((kpi) => (
                <div
                  key={kpi.id}
                  className="w-full md:min-w-0"
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                  }}
                  data-testid={`card-kpi-desktop-${kpi.id}`}
                >
                  {/* Cabeçalho do KPI (Parte Superior Azul) */}
                  <div
                    style={{
                      backgroundColor: "#01155a",
                      minHeight: "76px",
                      padding: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderTopLeftRadius: "16px",
                      borderTopRightRadius: "16px",
                    }}
                  >
                    <h3
                      className="text-white text-center"
                      style={{
                        fontFamily: "Lato, sans-serif",
                        fontWeight: 600, // Semibold
                        fontSize: "14px",
                        lineHeight: 1.4,
                      }}
                      data-testid={`text-kpi-title-desktop-${kpi.id}`}
                    >
                      {kpi.titulo}
                      <br />
                      <span style={{ fontWeight: 400, fontSize: "11px" }}>{kpi.subtitulo}</span>
                    </h3>
                  </div>

                  {/* Corpo do KPI (Parte Inferior Branca) */}
                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      padding: "24px 16px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      borderBottomLeftRadius: "16px",
                      borderBottomRightRadius: "16px",
                    }}
                  >
                    {/* Número/Percentual */}
                    <div
                      className="text-center mb-2"
                      style={{
                        fontFamily: "Lato, sans-serif",
                        fontWeight: 800, // Extrabold
                        fontSize: "52px",
                        lineHeight: 1,
                        color: "#0d70dc",
                      }}
                      data-testid={`text-kpi-numero-desktop-${kpi.id}`}
                    >
                      {kpi.numero}
                    </div>

                    {/* Legenda */}
                    <p
                      className="text-center"
                      style={{
                        fontFamily: "Lato, sans-serif",
                        fontWeight: 500, // Medium
                        fontSize: "14px",
                        lineHeight: 1.4,
                        color: "#0d70dc",
                      }}
                      data-testid={`text-kpi-legenda-desktop-${kpi.id}`}
                    >
                      {kpi.legenda}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

