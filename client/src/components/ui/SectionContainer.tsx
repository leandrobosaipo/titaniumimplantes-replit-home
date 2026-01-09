import { cn } from "@/lib/utils";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "default" | "narrow" | "wide";
}

/**
 * Wrapper padrão para seções
 * 
 * Max-width consistente (1280px / 80rem)
 * Padding responsivo
 * Espaçamento vertical flexível
 * 
 * @example
 * <SectionContainer>
 *   <SectionTitle level={2}>Título</SectionTitle>
 *   <p>Conteúdo...</p>
 * </SectionContainer>
 */
export function SectionContainer({
  children,
  className,
  maxWidth = "default",
}: SectionContainerProps) {
  const maxWidthClasses = {
    default: "max-w-[80rem]", // 1280px
    narrow: "max-w-[64rem]", // 1024px
    wide: "max-w-[90rem]", // 1440px
  };

  return (
    <div className={cn("section-container", maxWidthClasses[maxWidth], className)}>
      {children}
    </div>
  );
}

