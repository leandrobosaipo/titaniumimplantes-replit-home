import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ResponsiveIconProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

/**
 * Wrapper para ícones que escalam proporcionalmente com texto
 * 
 * Tamanho base em em para escalar com preferências do usuário
 * Mantém proporções e alinhamento
 * 
 * @example
 * <ResponsiveIcon icon={Lock} size="lg" />
 */
export function ResponsiveIcon({
  icon: Icon,
  size = "md",
  className,
}: ResponsiveIconProps) {
  const sizeClasses = {
    sm: "icon-responsive-sm",
    md: "icon-responsive-md",
    lg: "icon-responsive-lg",
    xl: "icon-responsive-xl",
  };

  return (
    <Icon className={cn(sizeClasses[size], className)} />
  );
}

