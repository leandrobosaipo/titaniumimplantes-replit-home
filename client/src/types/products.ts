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
  /** Texto principal (intro). Se o produto tiver seções estruturadas, mantenha aqui um resumo curto. */
  fullDescription: string;
  mainImage: string;
  images: string[];
  anvisa?: string; // Número de registro ANVISA (opcional)

  /** Conteúdo no padrão do site de referência (seções). */
  characteristics?: string[];
  indications?: string[];
  diferentials?: string[];
  details?: string[];
}

/**
 * Configuração da Página de Produtos
 */
export interface ProductsPageConfig {
  categories: ProductCategory[];
  products: Product[];
  itemsPerPage: number;
}
