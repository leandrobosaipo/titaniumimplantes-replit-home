/**
 * Interface para configuração de slides do carrossel
 * 
 * Cada slide representa um banner com imagem de fundo, título, subtítulo e botão de ação opcional.
 */
export interface CarouselSlide {
  /** Identificador único do slide */
  id: string;
  /** Caminho da imagem de fundo (pode ser import estático ou URL) */
  image: string;
  /** Texto alternativo descritivo da imagem para acessibilidade e SEO */
  alt?: string;
  /** Título principal do slide */
  title: string;
  /** Subtítulo/descrição do slide */
  subtitle: string;
  /** Texto do botão de ação (opcional) */
  buttonText?: string;
  /** Link de destino do botão (opcional, requer buttonText) */
  buttonLink?: string;
}

/**
 * Configuração completa do carrossel
 */
export interface CarouselConfig {
  /** Array de slides a serem exibidos */
  slides: CarouselSlide[];
  /** Intervalo em milissegundos para troca automática de slides (padrão: 5000) */
  autoplayInterval?: number;
}

