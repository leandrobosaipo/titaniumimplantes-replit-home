import { useState } from "react";

interface VerificationResponse {
  success: boolean;
  token: string;
  expiresAt: number;
  message: string;
}

/**
 * Hook para gerenciar verificação humana quando rate limit é atingido
 */
export function useHumanVerification() {
  const [isVerified, setIsVerified] = useState(false);
  const [verificationToken, setVerificationToken] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  /**
   * Solicita verificação humana ao backend
   * @returns Token de verificação ou null se falhar
   */
  const requestVerification = async (): Promise<string | null> => {
    setIsVerifying(true);
    try {
      const response = await fetch("/api/verify-human", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Erro ao verificar");
      }

      const data: VerificationResponse = await response.json();

      if (data.success && data.token) {
        setVerificationToken(data.token);
        setIsVerified(true);
        return data.token;
      }

      return null;
    } catch (error) {
      console.error("Erro ao solicitar verificação:", error);
      return null;
    } finally {
      setIsVerifying(false);
    }
  };

  /**
   * Reseta o estado de verificação
   */
  const reset = () => {
    setIsVerified(false);
    setVerificationToken(null);
    setIsVerifying(false);
  };

  return {
    isVerified,
    verificationToken,
    isVerifying,
    requestVerification,
    reset,
  };
}
