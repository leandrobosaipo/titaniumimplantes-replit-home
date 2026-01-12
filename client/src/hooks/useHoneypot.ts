import { useRef } from "react";

/**
 * Hook para implementar campo honeypot (anti-spam)
 * 
 * Retorna um objeto com o campo oculto que deve ser adicionado ao formulário.
 * Bots geralmente preenchem todos os campos, incluindo os ocultos.
 * 
 * @returns Objeto com props do campo honeypot
 */
export function useHoneypot() {
  const honeypotRef = useRef<HTMLInputElement>(null);

  return {
    // Props para o campo honeypot
    honeypotProps: {
      ref: honeypotRef,
      name: "website",
      type: "text",
      tabIndex: -1,
      autoComplete: "off",
      style: {
        position: "absolute" as const,
        left: "-9999px",
        width: "1px",
        height: "1px",
        opacity: 0,
        pointerEvents: "none" as const,
      },
      "aria-hidden": true,
    },
    // Função para obter o valor (para envio)
    getValue: () => honeypotRef.current?.value || "",
  };
}
