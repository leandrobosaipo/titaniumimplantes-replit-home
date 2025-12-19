/**
 * Interface para Categorias de Produtos
 */
export interface ProductCategory {
  id: string;
  slug: string;
  label: string;
}

/**
 * Interface para o Produto
 */
export interface Product {
  id: string;
  slug: string;
  categoryId: string;
  title: string;
  description: string;
  fullDescription: string;
  mainImage: string;
  images: string[];
}

/**
 * Configuração da Página de Produtos
 */
export interface ProductsPageConfig {
  categories: ProductCategory[];
  products: Product[];
  itemsPerPage: number;
}
