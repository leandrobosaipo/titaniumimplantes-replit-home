import { useRef, useEffect } from "react";

/**
 * Hook para rastrear o tempo de preenchimento do formulário
 * 
 * Usado para detectar bots que preenchem formulários muito rapidamente
 * ou de forma suspeita.
 * 
 * @returns Timestamp de início do preenchimento
 */
export function useFormTimer() {
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Iniciar timer quando o componente montar
    startTimeRef.current = Date.now();

    return () => {
      // Limpar ao desmontar
      startTimeRef.current = null;
    };
  }, []);

  return {
    // Obter timestamp de início
    getStartTime: () => startTimeRef.current || Date.now(),
    // Resetar timer (útil para formulários que podem ser resetados)
    reset: () => {
      startTimeRef.current = Date.now();
    },
  };
}
