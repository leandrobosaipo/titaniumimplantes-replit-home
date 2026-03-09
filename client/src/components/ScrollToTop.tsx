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
    const hash = window.location.hash?.replace(/^#/, "") ?? "";

    const scrollToHash = (id: string) => {
      const target = document.getElementById(decodeURIComponent(id));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return true;
      }
      return false;
    };

    if (hash) {
      if (scrollToHash(hash)) return;
      const retry = setTimeout(() => scrollToHash(hash), 180);
      return () => clearTimeout(retry);
    }

    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  return null;
}

