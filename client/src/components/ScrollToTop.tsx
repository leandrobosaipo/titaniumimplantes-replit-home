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
    const hashIndex = location.indexOf("#");
    const hash = hashIndex >= 0 ? location.slice(hashIndex + 1) : "";

    if (hash) {
      const id = decodeURIComponent(hash);

      const scrollToHash = () => {
        const target = document.getElementById(id);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          return true;
        }
        return false;
      };

      if (scrollToHash()) return;

      const retry = setTimeout(() => {
        scrollToHash();
      }, 120);

      return () => clearTimeout(retry);
    }

    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  return null;
}

