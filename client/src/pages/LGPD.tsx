import { Layout } from "@/components/Layout";
import { PageSEO } from "@/components/SEO/PageSEO";
import { lgpdPageConfig as d } from "@/data/lgpdPage";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Edit3,
  Mail,
  MapPin,
  Phone,
  Search,
  Share,
  Undo2,
} from "lucide-react";

const lgpdIconMap = {
  search: Search,
  edit: Edit3,
  undo: Undo2,
  share: Share,
} as const;

export default function LGPD() {
  return (
    <Layout>
      <PageSEO
        title="LGPD e Compliance | Titanium Implantes"
        description="Certificações, Compliance e Proteção de Dados."
      />

      <div className="pt-[100px] lg:pt-[140px] pb-20 bg-white">
        {/* Breadcrumb e título */}
        <div className="mx-auto max-w-[1280px] px-8 text-center mb-16">
          <span className="text-sm font-semibold text-gray-500 uppercase tracking-[0.2em] block mb-4">
            {d.breadcrumb}
          </span>
          <h1 className="text-[#0a324c] text-[36px] md:text-[56px] font-[900] font-lato leading-tight">
            {d.secaoCertificacoes.titulo}
          </h1>
        </div>

        {/* Certificações */}
        <section className="mx-auto max-w-[1280px] px-8 grid grid-cols-2 md:grid-cols-4 gap-10 mb-24 relative">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gray-200 -z-10 hidden md:block" />
          {d.secaoCertificacoes.itens.map((item) => (
            <div key={item.id} className="flex flex-col items-center text-center">
              <div className="w-24 h-24 mb-6 rounded-full border-4 border-[#c5a059] flex items-center justify-center p-2 shadow-xl bg-white">
                <img src={item.img} alt={item.label} className="object-contain" />
              </div>
              <h3 className="font-bold text-[#0a324c] mb-2 text-sm md:text-base">
                {item.label}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed max-w-[180px]">
                {item.sublabel}
              </p>
            </div>
          ))}
        </section>

        {/* Destaques do material */}
        <section className="bg-white py-20 px-8">
          <div className="mx-auto max-w-[1280px] grid md:grid-cols-2 items-center gap-16">
            <div className="flex justify-center">
              <img
                src={d.secaoDestaques.imagem}
                className="max-h-[520px] object-contain mx-auto"
                alt="Destaque Material"
              />
            </div>
            <div>
              <h2 className="text-[#0a324c] text-[40px] md:text-[48px] font-[900] mb-12 font-lato leading-tight">
                {d.secaoDestaques.titulo.split(" ").slice(0, 2).join(" ")}{" "}
                <span className="text-[#0d70dc]">
                  {d.secaoDestaques.titulo.split(" ").slice(2).join(" ")}
                </span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {d.secaoDestaques.pills.map((text) => (
                  <div
                    key={text}
                    className="bg-[#01155a] text-white px-6 py-3 rounded-full text-center text-sm font-semibold shadow-md"
                  >
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* KPIs */}
        <section className="bg-white py-16 px-8">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="text-center text-[#0a324c] text-[32px] md:text-[42px] font-[900] font-lato mb-12">
              {d.secaoKpis.titulo}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {d.secaoKpis.kpis.map((kpi) => (
                <div
                  key={kpi.id}
                  className="flex flex-col items-center justify-center space-y-3"
                >
                  <div className="text-[#0d70dc] text-5xl font-[900] font-lato">
                    {kpi.valor}
                  </div>
                  <p className="text-[#0a324c] font-semibold">{kpi.label}</p>
                  {kpi.tipo === "stars" && (
                    <div className="text-[#0d70dc] text-lg">★★★★★</div>
                  )}
                  {kpi.tipo === "bar" && (
                    <div className="w-24 h-2 bg-white border border-[#0d70dc] rounded-full overflow-hidden">
                      <div className="h-full w-full bg-[#0d70dc]" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section className="bg-[#01155a] text-white py-24 px-8">
          <div className="mx-auto max-w-[1280px] grid md:grid-cols-2 gap-16 items-center">
            <div className="rounded-[30px] overflow-hidden shadow-2xl bg-white/5">
              <img src={d.secaoCompliance.imagem} alt="Compliance" className="w-full h-auto" />
            </div>
            <div>
              <h2 className="text-[38px] md:text-[42px] font-[900] mb-6 font-lato">
                {d.secaoCompliance.titulo.split(" ").slice(0, 1).join(" ")}{" "}
                <span className="text-[#0d70dc]">
                  {d.secaoCompliance.titulo.split(" ").slice(1).join(" ")}
                </span>
              </h2>
              <p className="text-xl opacity-90 mb-8 leading-relaxed">
                {d.secaoCompliance.descricao}
              </p>
              <ul className="space-y-4">
                {d.secaoCompliance.lista.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-lg">
                    <span className="text-[#0d70dc] text-2xl leading-none">•</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* LGPD Proteção de Dados */}
        <section className="bg-[#0d70dc] text-white py-24 px-8">
          <div className="mx-auto max-w-[1280px]">
            <div className="grid md:grid-cols-2 gap-16 mb-16 items-center">
              <h2 className="text-[42px] md:text-[48px] font-[900] leading-tight font-lato">
                {d.secaoLgpd.titulo.split(" ").slice(0, 1).join(" ")}
                <br />
                {d.secaoLgpd.titulo.split(" ").slice(1).join(" ")}
              </h2>
              <div className="flex justify-center md:justify-end">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-pulse" />
                  <div className="absolute inset-2 rounded-full border-2 border-white/20 opacity-60" />
                  <div className="absolute inset-6 rounded-full bg-white/10 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-xl border-4 border-white flex items-center justify-center">
                      <Search className="w-7 h-7" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {d.secaoLgpd.cards.map((card) => {
                const Icon = lgpdIconMap[card.icone];
                return (
                  <div
                    key={card.id}
                    className="border border-white/30 p-6 rounded-xl text-center hover:bg-white/10 transition-all space-y-3"
                  >
                    <Icon className="w-8 h-8 mx-auto" />
                    <p className="text-sm font-medium leading-relaxed">{card.texto}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Direitos e contatos */}
        <section className="bg-white py-24 px-8">
          <div className="mx-auto max-w-[1280px] text-center">
            <h2 className="text-[40px] md:text-[44px] font-[900] text-[#0a324c] mb-12 font-lato">
              {d.secaoDireitos.titulo.split(" ").slice(0, 3).join(" ")}{" "}
              <span className="text-[#0d70dc]">
                {d.secaoDireitos.titulo.split(" ").slice(3).join(" ")}
              </span>
            </h2>
            <div className="grid md:grid-cols-2 gap-16 items-center text-left">
              <div className="hidden md:block relative">
                <div className="w-full h-full rounded-3xl bg-gradient-to-br from-[#0d70dc]/10 via-[#01155a]/10 to-transparent" />
              </div>
              <div className="space-y-8">
                {d.secaoDireitos.contatos.map((c, i) => (
                  <div key={`${c.tipo}-${i}`} className="flex items-center gap-6 group">
                    <div className="w-12 h-12 bg-[#0d70dc]/10 text-[#0d70dc] rounded-full flex items-center justify-center group-hover:bg-[#0d70dc] group-hover:text-white transition-all">
                      {c.tipo === "email" && <Mail size={24} />}
                      {c.tipo === "tel" && <Phone size={24} />}
                      {c.tipo === "map" && <MapPin size={24} />}
                    </div>
                    <span className="text-lg text-[#4A4A4A] font-medium">{c.valor}</span>
                  </div>
                ))}
                <p className="pt-8 border-t border-gray-100 text-[#0d70dc] font-bold text-lg leading-relaxed">
                  {d.secaoDireitos.seguranca}
                </p>
                <div className="pt-4">
                  <Link href="/contato">
                    <Button className="bg-[#0d70dc] hover:bg-[#0953b0] text-white rounded-full px-10 py-5 text-sm font-bold uppercase tracking-widest">
                      Falar com o DPO
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
