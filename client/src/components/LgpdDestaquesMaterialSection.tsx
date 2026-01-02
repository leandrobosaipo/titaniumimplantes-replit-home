import { lgpdPageConfig as d } from "@/data/lgpdPage";

export function LgpdDestaquesMaterialSection() {
  return (
    <section className="bg-gray-50 py-24 px-8">
      <div className="mx-auto max-w-[1280px] grid md:grid-cols-2 items-center gap-20">
        <div className="flex justify-start">
          <img
            src={d.secaoDestaques.imagem}
            className="max-h-[620px] object-contain"
            alt="Destaque Material"
          />
        </div>
        <div>
          <h2 className="text-[#0a324c] text-[44px] md:text-[52px] font-[900] mb-16 font-lato leading-tight text-center md:text-left">
            Destaques do <span className="text-[#0d70dc]">material</span>
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {d.secaoDestaques.pills.map((text) => (
              <div
                key={text}
                className="bg-[#01155a] text-white px-10 py-5 rounded-full text-center text-lg font-semibold"
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

