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
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Início</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbPage>Produtos</BreadcrumbPage>
          </BreadcrumbList>
        </Breadcrumb>

        <h1
          className="text-4xl md:text-5xl font-black mb-12 font-lato"
          style={{ color: d.colors.text.primary }}
        >
          Produtos
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
          <aside className="space-y-2">
            <h3 className="font-bold text-lg mb-4 uppercase tracking-wider" style={{ color: d.colors.text.primary }}>
              Categorias
            </h3>
            {c.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all font-medium ${
                  activeCategory === cat.id
                    ? "bg-[#0d70dc] text-white shadow-md"
                    : "text-[#4A4A4A] hover:bg-gray-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </aside>

          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {paginatedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow group rounded-2xl"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-white">
                    <img
                      src={product.mainImage}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h4 className="font-bold text-xl mb-2 line-clamp-1" style={{ color: d.colors.text.primary }}>
                      {product.title}
                    </h4>
                    <p className="text-sm text-[#4A4A4A] line-clamp-2">{product.description}</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link href={`/produtos/${product.slug}`} className="w-full">
                      <Button className="w-full bg-[#0d70dc] hover:bg-[#0953b0] text-white rounded-full font-bold uppercase text-xs tracking-widest">
                        Ver Detalhes
                      </Button>
                    </Link>
                  </CardFooter>
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
                        className="cursor-pointer rounded-full"
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
      </div>
    </Layout>
  );
}
