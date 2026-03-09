import { useMemo, useState, useEffect } from "react";
import { Link } from "wouter";
import { Layout } from "@/components/Layout";
import { PageSEO } from "@/components/SEO/PageSEO";
import { productsConfig as c } from "@/data/products";
import { ImageLightbox } from "@/components/ImageLightbox";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { designConstants as d } from "@/lib/designConstants";

export default function Produtos() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeManufacturer, setActiveManufacturer] = useState("all");
  const [activeTechnicalCategory, setActiveTechnicalCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const openLightbox = (src: string) => {
    setLightboxSrc(src);
    setLightboxOpen(true);
  };

  const categoriesWithProducts = useMemo(() => {
    const counts = c.products.reduce<Record<string, number>>((acc, p) => {
      acc[p.categoryId] = (acc[p.categoryId] || 0) + 1;
      return acc;
    }, {});

    // mantém "all" sempre e remove categorias vazias
    return c.categories.filter((cat) => cat.id === "all" || (counts[cat.id] ?? 0) > 0);
  }, []);

  const manufacturers = useMemo(() => {
    return [
      "all",
      ...Array.from(new Set(c.products.map((p) => p.manufacturer).filter(Boolean) as string[])).sort(),
    ];
  }, []);

  const technicalCategories = useMemo(() => {
    return [
      "all",
      ...Array.from(new Set(c.products.map((p) => p.technicalCategory).filter(Boolean) as string[])).sort(),
    ];
  }, []);

  const filteredProducts = useMemo(() => {
    return c.products.filter((p) => {
      const byArea = activeCategory === "all" || p.categoryId === activeCategory;
      const byManufacturer = activeManufacturer === "all" || p.manufacturer === activeManufacturer;
      const byTechnicalCategory =
        activeTechnicalCategory === "all" || p.technicalCategory === activeTechnicalCategory;

      return byArea && byManufacturer && byTechnicalCategory;
    });
  }, [activeCategory, activeManufacturer, activeTechnicalCategory]);

  useEffect(() => {
    // se a categoria atual não existe mais (ex: ficou vazia), volta para "all"
    if (!categoriesWithProducts.find((cat) => cat.id === activeCategory)) {
      setActiveCategory("all");
      return;
    }
    setCurrentPage(1);
  }, [activeCategory, activeManufacturer, activeTechnicalCategory, categoriesWithProducts]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / c.itemsPerPage));
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * c.itemsPerPage,
    currentPage * c.itemsPerPage,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout>
      <PageSEO
        title="Produtos | Titanium Implantes"
        description="Conheça nosso portfólio completo de implantes cirúrgicos certificados."
      />

      <div className="mx-auto max-w-[1280px] px-8 pt-[100px] lg:pt-[160px] pb-24">
        <Breadcrumb className="mb-6">
          <BreadcrumbList className="text-sm text-[#4A4A4A]">
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="hover:text-[#0a324c] transition-colors">Início</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbPage className="text-[#4A4A4A]">Produtos</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>

        <section className="mb-8 rounded-xl border border-[#e5e7eb] bg-white p-4 md:p-5 shadow-sm" aria-label="Filtros de produtos">
          <h2 className="font-lato font-bold text-base md:text-lg text-[#0a324c] mb-3">Filtrar produtos</h2>

          {/* Filtro Horizontal de Categorias */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categoriesWithProducts.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full font-lato font-medium text-sm transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "border-2 border-[#0d70dc] bg-[#0d70dc] text-white shadow-md"
                    : "border-2 border-[#0d70dc] text-[#0d70dc] bg-transparent hover:bg-[#0d70dc]/10"
                }`}
                aria-pressed={activeCategory === cat.id}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="manufacturer-filter" className="font-lato text-sm font-semibold text-[#0a324c]">
                Fabricante
              </label>
              <select
                id="manufacturer-filter"
                value={activeManufacturer}
                onChange={(e) => setActiveManufacturer(e.target.value)}
                className="h-11 w-full rounded-lg border border-[#d1d5db] px-3 font-lato text-sm"
              >
                <option value="all">Todos os fabricantes</option>
                {manufacturers
                  .filter((m) => m !== "all")
                  .map((manufacturer) => (
                    <option key={manufacturer} value={manufacturer}>
                      {manufacturer}
                    </option>
                  ))}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="technical-category-filter" className="font-lato text-sm font-semibold text-[#0a324c]">
                Categoria técnica
              </label>
              <select
                id="technical-category-filter"
                value={activeTechnicalCategory}
                onChange={(e) => setActiveTechnicalCategory(e.target.value)}
                className="h-11 w-full rounded-lg border border-[#d1d5db] px-3 font-lato text-sm"
              >
                <option value="all">Todas as categorias técnicas</option>
                {technicalCategories
                  .filter((tc) => tc !== "all")
                  .map((tc) => (
                    <option key={tc} value={tc}>
                      {tc}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-sm text-[#4A4A4A] font-lato">{filteredProducts.length} produto(s) encontrado(s)</p>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setActiveCategory("all");
                setActiveManufacturer("all");
                setActiveTechnicalCategory("all");
              }}
              className="w-full sm:w-auto"
            >
              Limpar filtros
            </Button>
          </div>
        </section>

        {/* Grid de Produtos */}
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedProducts.map((product) => (
              <Card
                key={product.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col min-h-[400px] md:min-h-[480px]"
              >
                {/* Área de Imagem - 60-65% */}
                <div className="bg-white flex items-center justify-center h-[60%] min-h-[240px] p-6">
                  <button
                    type="button"
                    onClick={() => openLightbox(product.mainImage)}
                    className="w-full h-full flex items-center justify-center"
                    aria-label={`Ampliar imagem de ${product.title}`}
                  >
                    <img
                      src={product.mainImage}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain drop-shadow-lg"
                    />
                  </button>
                </div>

                {/* Conteúdo - 40-35% */}
                <CardContent className="flex flex-col justify-between flex-1 p-6 md:p-8">
                  <div>
                    {/* Nome do Produto */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4
                        className="font-lato font-semibold text-lg md:text-xl"
                        style={{ color: d.colors.text.primary }}
                      >
                        {product.title}
                      </h4>
                      {product.videoUrl && (
                        <span className="inline-flex items-center rounded-full bg-red-100 text-red-700 px-2 py-0.5 text-[11px] font-bold uppercase tracking-wide">
                          Vídeo
                        </span>
                      )}
                    </div>

                    {/* ANVISA */}
                    <p className="font-lato text-xs md:text-sm text-[#4A4A4A] font-normal">
                      {product.anvisa ? `nº ANVISA ${product.anvisa}` : "Em conformidade"}
                    </p>
                    {product.manufacturer && (
                      <p className="font-lato text-xs md:text-sm text-[#4A4A4A] font-normal">
                        Fabricante: {product.manufacturer}
                      </p>
                    )}
                    {product.technicalCategory && (
                      <p className="font-lato text-xs md:text-sm text-[#4A4A4A] mb-4 font-normal">
                        Categoria técnica: {product.technicalCategory}
                      </p>
                    )}
                  </div>

                  {/* Botão */}
                  <Link href={`/produtos/${product.slug}`} className="w-[70%] mx-auto">
                    <Button
                      className="w-full bg-[#01155a] hover:bg-[#012a7a] text-white font-lato font-semibold rounded-lg py-3 min-h-12 transition-colors"
                      style={{ fontFamily: d.fonts.primary }}
                    >
                      Saiba mais
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={currentPage === page}
                      onClick={() => handlePageChange(page)}
                      className="cursor-pointer rounded-full transition-all"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
      {lightboxSrc && (
        <ImageLightbox
          open={lightboxOpen}
          onOpenChange={setLightboxOpen}
          src={lightboxSrc}
          alt="Imagem do produto"
        />
      )}
    </Layout>
  );
}
