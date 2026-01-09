import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

/**
 * Componente reutilizável para badges de seção
 * 
 * Padding flexível baseado em em para escalar com texto
 * Altura mínima relativa, não fixa
 * 
 * @example
 * <SectionBadge>ÁREAS DE ATUAÇÃO</SectionBadge>
 * <SectionBadge variant="secondary">COMPLIANCE</SectionBadge>
 */
export function SectionBadge({
  children,
  variant = "primary",
  className,
}: SectionBadgeProps) {
  const variantClasses = {
    primary: "bg-[#0d70dc] text-white",
    secondary: "bg-[#01155a] text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center uppercase rounded-full font-semibold",
        "text-badge md:text-badge-md leading-normal",
        "px-4 py-2 md:px-6 md:py-2.5",
        "min-h-[2em]",
        "tracking-wider",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

