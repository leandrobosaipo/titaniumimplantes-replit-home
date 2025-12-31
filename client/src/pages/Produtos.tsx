import { useMemo, useState, useEffect } from "react";
import { Link } from "wouter";
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
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return c.products;
    return c.products.filter((p) => p.categoryId === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

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

        {/* Filtro Horizontal de Categorias */}
        <div className="flex flex-wrap gap-3 mb-8">
          {c.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-2 rounded-full font-lato font-medium text-sm transition-all duration-300 ${
                activeCategory === cat.id
                  ? "border-2 border-[#0d70dc] bg-[#0d70dc] text-white shadow-md"
                  : "border-2 border-[#0d70dc] text-[#0d70dc] bg-transparent hover:bg-[#0d70dc]/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

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
                  <img
                    src={product.mainImage}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain drop-shadow-lg"
                  />
                </div>

                {/* Conteúdo - 40-35% */}
                <CardContent className="flex flex-col justify-between flex-1 p-6 md:p-8">
                  <div>
                    {/* Nome do Produto */}
                    <h4
                      className="font-lato font-semibold text-lg md:text-xl mb-2"
                      style={{ color: d.colors.text.primary }}
                    >
                      {product.title}
                    </h4>

                    {/* ANVISA */}
                    <p className="font-lato text-xs md:text-sm text-[#4A4A4A] mb-4 font-normal">
                      {product.anvisa ? `nº ANVISA ${product.anvisa}` : "Em conformidade"}
                    </p>
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
    </Layout>
  );
}
