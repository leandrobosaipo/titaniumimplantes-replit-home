import { cn } from "@/lib/utils";

interface SectionTitleProps {
  level?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  highlightedText?: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
}

/**
 * Componente reutilizável para títulos de seção
 * 
 * Usa sistema de design padronizado e acessível baseado em rem
 * Line-height generoso para garantir legibilidade com texto aumentado
 * 
 * @example
 * <SectionTitle level={2}>Título da Seção</SectionTitle>
 * <SectionTitle level={2} highlightedText="destaque">Título com <span>destaque</span></SectionTitle>
 */
export function SectionTitle({
  level = 2,
  children,
  highlightedText,
  className,
  as,
}: SectionTitleProps) {
  const HeadingTag = as || (`h${level}` as "h1" | "h2" | "h3" | "h4");

  const baseClasses = {
    1: "text-heading-1 md:text-heading-1-md lg:text-heading-1-lg font-black leading-tight font-lato",
    2: "text-heading-2 md:text-heading-2-md lg:text-heading-2-lg font-black leading-tight font-lato",
    3: "text-heading-3 md:text-heading-3-md font-bold leading-snug font-lato",
    4: "text-heading-4 md:text-heading-4-md font-bold leading-normal font-lato",
  };

  // Se highlightedText for fornecido, processar children para destacar
  let content = children;
  if (highlightedText && typeof children === "string") {
    const parts = children.split(highlightedText);
    if (parts.length > 1) {
      content = (
        <>
          {parts[0]}
          <span className="text-[#0d70dc]">{highlightedText}</span>
          {parts[1]}
        </>
      );
    }
  }

  return (
    <HeadingTag className={cn(baseClasses[level], className)}>
      {content}
    </HeadingTag>
  );
}

