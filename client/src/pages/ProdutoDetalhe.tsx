import { useEffect, useMemo, useState } from "react";
import { useRoute, Link } from "wouter";
import { ImageLightbox } from "@/components/ImageLightbox";
import { Layout } from "@/components/Layout";
import { PageSEO } from "@/components/SEO/PageSEO";
import { productsConfig as c } from "@/data/products";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import NotFound from "@/pages/not-found";
import { designConstants as d } from "@/lib/designConstants";
import {
  CheckCircle2,
  Brain,
  Zap,
  Battery,
  Shield,
  Activity,
  FileText,
  Users,
} from "lucide-react";

export default function ProdutoDetalhe() {
  const [, params] = useRoute<{ slug: string }>("/produtos/:slug");
  const product = useMemo(
    () => c.products.find((p) => p.slug === params?.slug),
    [params?.slug],
  );

  const [activeImg, setActiveImg] = useState(product?.mainImage ?? "");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const openLightbox = (src: string) => {
    setLightboxSrc(src);
    setLightboxOpen(true);
  };

  useEffect(() => {
    if (product) {
      setActiveImg(product.mainImage);
    }
  }, [product]);

  if (!product) return <NotFound />;

  const categoryLabel = c.categories.find((cat) => cat.id === product.categoryId)?.label;
  const isPerceptRC = product.slug === "percept-rc-neuroestimulador-medtronic";

  // Navegação anterior / próximo
  const currentIndex = c.products.findIndex((p) => p.slug === product.slug);
  const prevProduct = currentIndex > 0 ? c.products[currentIndex - 1] : null;
  const nextProduct = currentIndex >= 0 && currentIndex < c.products.length - 1 ? c.products[currentIndex + 1] : null;

  // Conteúdo específico para Percept RC
  const perceptContent = {
    overview: {
      title: "Visão Geral",
      text: "O Percept™ RC é um sistema de neuroestimulação cerebral profunda (DBS) recarregável desenvolvido pela Medtronic, líder mundial em tecnologias médicas. Equipado com a tecnologia exclusiva BrainSense™, este neuroestimulador representa uma evolução significativa no tratamento de distúrbios do movimento e condições neurológicas, oferecendo monitoramento cerebral em tempo real e terapias personalizadas adaptativas. O sistema é indicado para uso em neurocirurgia funcional, proporcionando controle preciso de sintomas em pacientes que não respondem adequadamente a tratamentos medicamentosos.",
    },
    benefits: [
      {
        icon: Brain,
        title: "Monitoramento cerebral em tempo real",
        description: "Tecnologia BrainSense™ permite sensoriamento contínuo da atividade neural durante a estimulação.",
      },
      {
        icon: Activity,
        title: "Terapia personalizada e adaptativa",
        description: "Programação avançada que se adapta às necessidades individuais do paciente.",
      },
      {
        icon: Battery,
        title: "Design compacto e confortável",
        description: "Perfil reduzido para maior conforto ao paciente, com recarga sem fio conveniente.",
      },
      {
        icon: Zap,
        title: "Bateria de longa duração",
        description: "Reduz a necessidade de trocas cirúrgicas, oferecendo até 15 anos de vida útil estimada.",
      },
      {
        icon: Shield,
        title: "Segurança e compatibilidade",
        description: "Compatibilidade MRI condicional (1.5T e 3T) para acompanhamento por imagem.",
      },
    ],
    brainSense: {
      title: "Tecnologia BrainSense™",
      description:
        "A tecnologia BrainSense™ é uma inovação exclusiva do Percept™ RC que permite o sensoriamento contínuo da atividade neural enquanto o dispositivo realiza a estimulação. Esta capacidade única oferece insights valiosos para os clínicos, permitindo ajustes mais precisos da terapia e monitoramento objetivo da resposta do paciente. Em comparação com sistemas DBS convencionais, o BrainSense™ representa um diferencial competitivo significativo, oferecendo dados quantitativos que complementam a avaliação clínica tradicional.",
      benefits: [
        "Sensoriamento neural em tempo real durante a estimulação",
        "Dados objetivos para ajustes de programação mais precisos",
        "Monitoramento contínuo da resposta à terapia",
        "Facilita terapias personalizadas baseadas em dados",
      ],
    },
    indications: [
      {
        condition: "Doença de Parkinson",
        description: "Indicado para pacientes com doença de Parkinson avançada que apresentam tremor, rigidez, bradicinesia ou flutuações motoras não adequadamente controladas com medicação.",
      },
      {
        condition: "Tremor essencial",
        description: "Tratamento de tremor essencial severo que não responde adequadamente a terapias medicamentosas.",
      },
      {
        condition: "Distonia",
        description: "Dispositivo de uso humanitário para tratamento de distonia primária generalizada ou segmentar em pacientes selecionados.",
      },
    ],
    specifications: [
      { label: "Tipo", value: "Neuroestimulador DBS recarregável" },
      { label: "Tecnologia", value: "BrainSense™" },
      { label: "Estimulação", value: "Direcional" },
      { label: "Recarga", value: "Sem fio" },
      { label: "Tempo de recarga", value: "< 1 hora (10% a 90%)" },
      { label: "Vida útil estimada", value: "Até 15 anos" },
      { label: "Compatibilidade MRI", value: "1.5T e 3T (condicional)" },
    ],
    components: [
      { name: "Neuroestimulador", description: "Unidade geradora de pulsos implantável com tecnologia BrainSense™" },
      { name: "Eletrodos SenSight™", description: "Eletrodos direcionais para estimulação precisa" },
      { name: "Extensões", description: "Cabo de conexão entre neuroestimulador e eletrodos" },
      { name: "Programador do clínico", description: "Dispositivo para ajustes de programação pelo médico" },
      { name: "Programador do paciente", description: "Controle remoto para uso pelo paciente" },
      { name: "Recarregador sem fio", description: "Sistema de recarga transcutânea" },
    ],
  };

  return (
    <Layout>
      <PageSEO
        title={`${product.title} | Produtos | Titanium Implantes`}
        description={product.description}
      />

      <div className="mx-auto max-w-[1280px] px-8 pt-[100px] lg:pt-[160px] pb-24">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Início</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/produtos">Produtos</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbPage>{product.title}</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Hero do Produto */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-white rounded-xl p-8 flex items-center justify-center min-h-[400px]">
              <button
                type="button"
                onClick={() => openLightbox(activeImg)}
                className="w-full h-full flex items-center justify-center"
                aria-label={`Ampliar imagem de ${product.title}`}
              >
                <img
                  src={activeImg}
                  className="max-h-full max-w-full object-contain"
                  alt={product.title}
                />
              </button>
            </div>
            <div className="space-y-6">
              {categoryLabel && (
                <span className="text-[#0d70dc] font-lato font-bold uppercase tracking-widest text-sm inline-block">
                  {categoryLabel}
                </span>
              )}
              <h1
                className="text-4xl md:text-5xl font-black font-lato leading-tight"
                style={{ color: d.colors.text.primary }}
              >
                {product.title}
              </h1>
              <div className="space-y-2">
                <p className="font-lato text-lg text-[#4A4A4A]">
                  <span className="font-semibold">Fabricante:</span> Medtronic
                </p>
                <p className="font-lato text-lg text-[#4A4A4A]">
                  <span className="font-semibold">Categoria:</span> Estimulação Cerebral Profunda (DBS)
                </p>
                {product.anvisa && (
                  <div className="flex items-center gap-2 mt-4">
                    <Shield className="w-5 h-5 text-[#0d70dc]" />
                    <p className="font-lato text-base font-semibold text-[#0a324c]">
                      nº ANVISA {product.anvisa}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {isPerceptRC && perceptContent ? (
          <>
            {/* Visão Geral */}
            <section className="mb-12">
              <h2
                className="text-3xl md:text-4xl font-black font-lato mb-6"
                style={{ color: d.colors.text.primary }}
              >
                {perceptContent.overview.title}
              </h2>
              <p className="text-lg leading-relaxed font-lato text-[#4A4A4A] max-w-4xl">
                {perceptContent.overview.text}
              </p>
            </section>

            <Separator className="my-12" />

            {/* Principais Benefícios */}
            <section className="mb-12">
              <h2
                className="text-3xl md:text-4xl font-black font-lato mb-8"
                style={{ color: d.colors.text.primary }}
              >
                Principais Benefícios
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {perceptContent.benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <Card key={index} className="border border-[#0d70dc]/20 bg-white">
                      <CardHeader>
                        <div className="w-12 h-12 rounded-lg bg-[#0d70dc]/10 flex items-center justify-center mb-4">
                          <Icon className="w-6 h-6 text-[#0d70dc]" />
                        </div>
                        <CardTitle className="text-xl font-lato font-bold" style={{ color: d.colors.text.primary }}>
                          {benefit.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-[#4A4A4A] font-lato leading-relaxed">{benefit.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            <Separator className="my-12" />

            {/* Tecnologia BrainSense™ */}
            <section className="mb-12">
              <Card className="bg-[#F4F5F7] border-0">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Brain className="w-8 h-8 text-[#0d70dc]" />
                    <CardTitle className="text-3xl font-lato font-black" style={{ color: d.colors.text.primary }}>
                      {perceptContent.brainSense.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-lg leading-relaxed font-lato text-[#4A4A4A]">
                    {perceptContent.brainSense.description}
                  </p>
                  <ul className="space-y-3 mt-6">
                    {perceptContent.brainSense.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#0d70dc] mt-0.5 flex-shrink-0" />
                        <span className="text-[#4A4A4A] font-lato">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Indicações Clínicas */}
            <section className="mb-12">
              <h2
                className="text-3xl md:text-4xl font-black font-lato mb-8"
                style={{ color: d.colors.text.primary }}
              >
                Indicações Clínicas
              </h2>
              <div className="space-y-6">
                {perceptContent.indications.map((indication, index) => (
                  <Card key={index} className="border border-[#0d70dc]/20">
                    <CardHeader>
                      <CardTitle className="text-xl font-lato font-bold" style={{ color: d.colors.text.primary }}>
                        {indication.condition}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-[#4A4A4A] font-lato leading-relaxed">{indication.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="mt-6 p-4 bg-amber-50 border-l-4 border-amber-400 rounded">
                <p className="text-sm font-lato text-amber-900">
                  <strong>Nota:</strong> Para distonia, este é um dispositivo de uso humanitário. Consulte as
                  regulamentações vigentes e o manual técnico antes do uso.
                </p>
              </div>
            </section>

            <Separator className="my-12" />

            {/* Especificações Técnicas */}
            <section className="mb-12">
              <h2
                className="text-3xl md:text-4xl font-black font-lato mb-8"
                style={{ color: d.colors.text.primary }}
              >
                Especificações Técnicas
              </h2>
              <Card className="border border-[#0d70dc]/20">
                <CardContent className="p-0">
                  <Table>
                    <TableBody>
                      {perceptContent.specifications.map((spec, index) => (
                        <TableRow key={index}>
                          <TableHead className="w-1/3 font-lato font-semibold" style={{ color: d.colors.text.primary }}>
                            {spec.label}
                          </TableHead>
                          <TableCell className="font-lato text-[#4A4A4A]">{spec.value}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Componentes do Sistema */}
            <section className="mb-12">
              <h2
                className="text-3xl md:text-4xl font-black font-lato mb-8"
                style={{ color: d.colors.text.primary }}
              >
                Componentes do Sistema
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {perceptContent.components.map((component, index) => (
                  <Card key={index} className="border border-[#0d70dc]/20">
                    <CardHeader>
                      <CardTitle className="text-lg font-lato font-semibold" style={{ color: d.colors.text.primary }}>
                        {component.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-[#4A4A4A] font-lato">{component.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Separator className="my-12" />

            {/* Conformidade Regulatória */}
            <section className="mb-12">
              <Card className="bg-[#F4F5F7] border-0">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-8 h-8 text-[#0d70dc]" />
                    <CardTitle className="text-3xl font-lato font-black" style={{ color: d.colors.text.primary }}>
                      Conformidade e Segurança
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {product.anvisa && (
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#0d70dc]" />
                      <p className="font-lato text-lg">
                        <strong className="font-semibold" style={{ color: d.colors.text.primary }}>
                          nº ANVISA:
                        </strong>{" "}
                        <span className="text-[#4A4A4A]">{product.anvisa}</span>
                      </p>
                    </div>
                  )}
                  <p className="text-lg leading-relaxed font-lato text-[#4A4A4A]">
                    Este dispositivo médico é comercializado e utilizado em conformidade com as regulamentações
                    vigentes da Agência Nacional de Vigilância Sanitária (ANVISA) e demais órgãos reguladores
                    competentes.
                  </p>
                  <p className="text-lg leading-relaxed font-lato text-[#4A4A4A]">
                    É fundamental a leitura do manual técnico e das instruções de uso antes da implantação e utilização
                    do dispositivo. Para informações técnicas detalhadas, entre em contato com nossa equipe de
                    especialistas.
                  </p>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-12" />

            {/* Chamada para Ação */}
            <section className="text-center">
              <Card className="bg-[#0d70dc] border-0">
                <CardContent className="p-12">
                  <Users className="w-12 h-12 text-white mx-auto mb-6" />
                  <h3 className="text-2xl md:text-3xl font-black font-lato text-white mb-4">
                    Precisa de mais informações?
                  </h3>
                  <p className="text-lg text-white/90 font-lato mb-8 max-w-2xl mx-auto">
                    Nossa equipe de especialistas está pronta para esclarecer dúvidas técnicas, fornecer informações
                    detalhadas e apoiar você no processo de decisão clínica.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/#contato">
                      <Button
                        size="lg"
                        className="bg-white text-[#0d70dc] hover:bg-white/90 font-lato font-bold px-8 h-14 text-lg rounded-lg"
                      >
                        Solicitar mais informações
                      </Button>
                    </Link>
                    <Link href="/#contato">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-white text-white hover:bg-white/10 font-lato font-bold px-8 h-14 text-lg rounded-lg"
                      >
                        Falar com um especialista
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </section>
          </>
        ) : (
          /* Layout padrão para outros produtos */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-2xl aspect-square bg-white">
                <button
                  type="button"
                  onClick={() => openLightbox(activeImg)}
                  className="w-full h-full"
                  aria-label={`Ampliar imagem de ${product.title}`}
                >
                  <img
                    src={activeImg}
                    className="w-full h-full object-contain p-4"
                    alt={product.title}
                  />
                </button>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={`${product.id}-${i}`}
                    onClick={() => {
                      setActiveImg(img);
                      openLightbox(img);
                    }}
                    className={`w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImg === img ? "border-[#0d70dc]" : "border-transparent opacity-70"
                    }`}
                    aria-label={`Ver imagem ${i + 1} de ${product.title}`}
                  >
                    <img src={img} className="w-full h-full object-cover" alt="" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                {categoryLabel && (
                  <span className="text-[#0d70dc] font-bold uppercase tracking-widest text-sm mb-2 block">
                    {categoryLabel}
                  </span>
                )}
                <h1
                  className="text-4xl md:text-5xl font-black font-lato leading-tight"
                  style={{ color: d.colors.text.primary }}
                >
                  {product.title}
                </h1>
                {product.anvisa && (
                  <p className="font-lato text-sm md:text-base text-[#4A4A4A] mt-3 font-normal">
                    nº ANVISA {product.anvisa}
                  </p>
                )}
              </div>

              <div className="text-lg leading-relaxed font-lato text-[#4A4A4A] whitespace-pre-line">
                {product.fullDescription}
              </div>

              {/* Seções no padrão do site de referência */}
              {(product.characteristics || product.indications || product.diferentials || product.details) && (
                <div className="space-y-8">
                  {product.characteristics?.length ? (
                    <div>
                      <h2 className="text-2xl font-black font-lato mb-3" style={{ color: d.colors.text.primary }}>
                        Características
                      </h2>
                      <ul className="space-y-2">
                        {product.characteristics.map((item, idx) => (
                          <li key={`char-${idx}`} className="flex gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#0d70dc] mt-0.5 flex-shrink-0" />
                            <span className="font-lato text-[#4A4A4A]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {product.indications?.length ? (
                    <div>
                      <h2 className="text-2xl font-black font-lato mb-3" style={{ color: d.colors.text.primary }}>
                        Indicações
                      </h2>
                      <ul className="space-y-2">
                        {product.indications.map((item, idx) => (
                          <li key={`ind-${idx}`} className="flex gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#0d70dc] mt-0.5 flex-shrink-0" />
                            <span className="font-lato text-[#4A4A4A]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {product.diferentials?.length ? (
                    <div>
                      <h2 className="text-2xl font-black font-lato mb-3" style={{ color: d.colors.text.primary }}>
                        Diferenciais
                      </h2>
                      <ul className="space-y-2">
                        {product.diferentials.map((item, idx) => (
                          <li key={`dif-${idx}`} className="flex gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#0d70dc] mt-0.5 flex-shrink-0" />
                            <span className="font-lato text-[#4A4A4A]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {product.details?.length ? (
                    <div>
                      <h2 className="text-2xl font-black font-lato mb-3" style={{ color: d.colors.text.primary }}>
                        Detalhes
                      </h2>
                      <ul className="space-y-2">
                        {product.details.map((item, idx) => (
                          <li key={`det-${idx}`} className="flex gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#0d70dc] mt-0.5 flex-shrink-0" />
                            <span className="font-lato text-[#4A4A4A]">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              )}

              <Link href="/#contato">
                <Button className="bg-[#0d70dc] hover:bg-[#0953b0] text-white rounded-full font-bold px-12 h-14 uppercase tracking-widest text-sm">
                  Solicitar Cotação
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Navegação entre produtos */}
      <div className="mx-auto max-w-[1280px] px-8 pb-24">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
          {prevProduct ? (
            <Link href={`/produtos/${prevProduct.slug}`} className="w-full md:w-auto">
              <Button variant="outline" className="w-full md:w-auto rounded-full px-6 h-12">
                ← Anterior
              </Button>
            </Link>
          ) : (
            <div className="hidden md:block" />
          )}

          <Link href="/produtos" className="w-full md:w-auto">
            <Button variant="ghost" className="w-full md:w-auto rounded-full px-6 h-12">
              Voltar para produtos
            </Button>
          </Link>

          {nextProduct ? (
            <Link href={`/produtos/${nextProduct.slug}`} className="w-full md:w-auto">
              <Button variant="outline" className="w-full md:w-auto rounded-full px-6 h-12">
                Próximo →
              </Button>
            </Link>
          ) : (
            <div className="hidden md:block" />
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxSrc && (
        <ImageLightbox
          open={lightboxOpen}
          onOpenChange={setLightboxOpen}
          src={lightboxSrc}
          alt={product.title}
        />
      )}
    </Layout>
  );
}
