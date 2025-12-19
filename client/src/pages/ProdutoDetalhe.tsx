import { useEffect, useMemo, useState } from "react";
import { useRoute, Link } from "wouter";
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
import NotFound from "@/pages/not-found";
import { designConstants as d } from "@/lib/designConstants";

export default function ProdutoDetalhe() {
  const [, params] = useRoute<{ slug: string }>("/produtos/:slug");
  const product = useMemo(
    () => c.products.find((p) => p.slug === params?.slug),
    [params?.slug],
  );

  const [activeImg, setActiveImg] = useState(product?.mainImage ?? "");

  useEffect(() => {
    if (product) {
      setActiveImg(product.mainImage);
    }
  }, [product]);

  if (!product) return <NotFound />;

  const categoryLabel = c.categories.find((cat) => cat.id === product.categoryId)?.label;

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-4">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-square bg-white">
              <img
                src={activeImg}
                className="w-full h-full object-contain p-4"
                alt={product.title}
              />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, i) => (
                <button
                  key={`${product.id}-${i}`}
                  onClick={() => setActiveImg(img)}
                  className={`w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImg === img ? "border-[#0d70dc]" : "border-transparent opacity-70"
                  }`}
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
            </div>

            <div className="text-lg leading-relaxed font-lato text-[#4A4A4A] whitespace-pre-line">
              {product.fullDescription}
            </div>

            <Link href="/contato">
              <Button className="bg-[#0d70dc] hover:bg-[#0953b0] text-white rounded-full font-bold px-12 h-14 uppercase tracking-widest text-sm">
                Solicitar Cotação
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
