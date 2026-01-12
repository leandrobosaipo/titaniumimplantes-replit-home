/**
 * Mensagens em português para o sistema de verificação humana
 */

export const humanChallengeMessages = {
  rateLimitTitle: "Muitos envios em pouco tempo",
  rateLimitDescription:
    "Entendemos que você precisa enviar várias mensagens. Para garantir que você é uma pessoa real e proteger nosso sistema contra spam, precisamos de uma confirmação rápida.",
  verifyButton: "Confirmar que sou humano",
  verifying: "Verificando...",
  verified: "Verificado! Enviando sua mensagem...",
  errorGeneric: "Ops! Algo deu errado. Por favor, tente novamente em alguns instantes.",
  errorVerificationFailed: "Não foi possível verificar. Por favor, tente novamente.",
  errorTokenExpired: "A verificação expirou. Por favor, solicite uma nova verificação.",
  successAfterVerification: "Mensagem enviada com sucesso após verificação!",
} as const;

export type HumanChallengeMessageKey = keyof typeof humanChallengeMessages;
