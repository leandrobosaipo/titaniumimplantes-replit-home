import { excelenciaMateriaisConfig as c } from "@/data/excelenciaMateriais";

export function ExcelenciaMateriaisSection() {
  if (!c.ativo) return null;

  return (
    <section
      className="relative w-full"
      style={{
        backgroundColor: "#0d70dc",
        paddingTop: "96px", // pt-24
        paddingBottom: "96px", // pb-24
      }}
      data-testid="section-excelencia-materiais"
    >
      <div className="mx-auto max-w-[1280px] px-8">
        {/* Grid principal: 2 colunas no desktop, 1 coluna no mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
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
                data-testid="text-excelencia-badge"
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
              data-testid="text-excelencia-title"
            >
              {c.titulo}
            </h2>

            {/* Parágrafo Institucional */}
            <p
              className="text-white"
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
              {c.descricao}
            </p>
          </div>

          {/* Coluna Direita: Texto Institucional + KPIs (2 linhas) */}
          <div className="flex flex-col gap-6 md:gap-8">
            {/* Linha 1: Texto Institucional */}
            <p
              className="text-white"
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
            <div className="flex flex-col md:grid md:grid-cols-3 gap-6 md:overflow-visible">
              {c.kpis.map((kpi) => (
                <div
                  key={kpi.id}
                  className="w-full md:min-w-0"
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                  }}
                  data-testid={`card-kpi-${kpi.id}`}
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
                      data-testid={`text-kpi-title-${kpi.id}`}
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
                      data-testid={`text-kpi-numero-${kpi.id}`}
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
                      data-testid={`text-kpi-legenda-${kpi.id}`}
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

