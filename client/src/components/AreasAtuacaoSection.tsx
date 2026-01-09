import { areasAtuacaoConfig as c } from "@/data/areasAtuacao";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { SectionTitle } from "@/components/ui/SectionTitle";

export function AreasAtuacaoSection() {
  if (!c.ativo) return null;

  return (
    <section
      className="relative w-full bg-[#f4efeb] md:bg-white"
      style={{
        paddingTop: "80px",
        paddingBottom: "100px",
      }}
      data-testid="section-areas-atuacao"
    >
      <div className="mx-auto max-w-[1280px] px-8">
        <div className="text-center">
          {/* Selo "ÁREAS DE ATUAÇÃO" */}
          <div className="mb-6">
            <SectionBadge variant="primary" className="min-w-[200px]">
              {c.tituloSessao}
            </SectionBadge>
          </div>

          {/* Título Principal */}
          <SectionTitle
            level={2}
            className="text-[#0a324c] mb-4"
            as="h2"
          >
            {c.titulo}
          </SectionTitle>

          {/* Subtítulo */}
          <p
            className="hidden md:block text-[#0a324c] text-body-lg-md md:text-2xl lg:text-3xl mb-15 font-lato leading-relaxed"
            data-testid="text-areas-atuacao-subtitle"
          >
            <span className="font-bold">Especialidades atendidas:</span>{" "}
            {c.subtitulo.replace("Especialidades atendidas: ", "")}
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {c.especialidades.map((especialidade) => (
            <div
              key={especialidade.id}
              className="relative bg-white rounded-xl shadow-lg overflow-hidden"
              data-testid={`card-especialidade-${especialidade.id}`}
            >
              {/* Container da imagem com posição relativa */}
              <div className="relative mb-4">
                {/* Imagem */}
                <img
                  src={especialidade.imagem}
                  alt={`Soluções em implantes cirúrgicos para ${especialidade.titulo} - Titanium Implantes Cuiabá-MT`}
                  className="w-full object-cover h-[140px] md:h-[180px] rounded-t-xl"
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
              <div className="mt-8 px-4 pb-4">
                {/* Título do card */}
                <h3
                  className="text-[#0a324c] text-heading-4 md:text-heading-4-md font-bold leading-normal font-lato mb-2"
                  data-testid={`text-card-title-${especialidade.id}`}
                >
                  {especialidade.titulo}
                </h3>

                {/* Descrição do card */}
                <p
                  className="text-[#4A4A4A] text-body font-lato leading-relaxed max-w-[16.25rem]"
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

