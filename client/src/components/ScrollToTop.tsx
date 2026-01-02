import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Componente que faz scroll automático para o topo da página
 * sempre que a rota mudar (detectado via useLocation do Wouter)
 * 
 * Não faz scroll se a URL contiver hash (âncora), permitindo que
 * links para seções dentro da página funcionem corretamente
 */
export function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    // Se a location contém hash (ex: /#contato), não faz scroll para o topo
    // Deixa o comportamento padrão ou handlers específicos fazerem o scroll para a seção
    if (location.includes("#")) {
      return;
    }
    
    // Para mudanças de página sem hash, faz scroll para o topo
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  
  return null;
}

