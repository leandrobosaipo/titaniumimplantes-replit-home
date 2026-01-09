/**
 * Constantes de design padronizadas para uso em todas as páginas
 * 
 * Sistema de design acessível baseado em rem para garantir
 * que textos escalem corretamente com preferências do usuário
 * 
 * TODOS os valores estão em rem para acessibilidade
 */

export const designConstants = {
  colors: {
    primary: "#0d70dc",
    primaryDark: "#01155a",
    primaryLight: "#0953b0",
    secondary: "#0071e2",
    text: {
      primary: "#0a324c",
      secondary: "#4A4A4A",
      light: "#1A1A1A",
      white: "#FFFFFF",
    },
    background: {
      white: "#FFFFFF",
      light: "#F4F5F7",
      dark: "#01155a",
    },
  },
  fonts: {
    primary: "Lato, sans-serif",
    secondary: "Inter, sans-serif",
    montserrat: "Montserrat, sans-serif",
  },
  spacing: {
    container: {
      maxWidth: "80rem", // 1280px em rem
      padding: {
        mobile: "2rem", // 32px em rem
        desktop: "3rem", // 48px em rem
      },
    },
    section: {
      paddingTop: {
        mobile: "4rem", // 64px em rem
        desktop: "6rem", // 96px em rem
      },
      paddingBottom: {
        mobile: "4rem", // 64px em rem
        desktop: "6rem", // 96px em rem
      },
    },
  },
  typography: {
    // Escala de títulos padronizada (H1 - Hero)
    h1: {
      fontSize: {
        mobile: "2.25rem", // 36px
        tablet: "3rem", // 48px
        desktop: "3.75rem", // 60px
      },
      fontWeight: 900,
      lineHeight: 1.2,
      fontFamily: "Lato, sans-serif",
    },
    // Escala de títulos padronizada (H2 - Seção)
    h2: {
      fontSize: {
        mobile: "1.875rem", // 30px
        tablet: "2.25rem", // 36px
        desktop: "3rem", // 48px
      },
      fontWeight: 900,
      lineHeight: 1.2,
      fontFamily: "Lato, sans-serif",
    },
    // Escala de títulos padronizada (H3 - Subseção)
    h3: {
      fontSize: {
        mobile: "1.5rem", // 24px
        tablet: "1.875rem", // 30px
        desktop: "1.875rem", // 30px
      },
      fontWeight: 700,
      lineHeight: 1.375,
      fontFamily: "Lato, sans-serif",
    },
    // Escala de títulos padronizada (H4 - Card)
    h4: {
      fontSize: {
        mobile: "1.25rem", // 20px
        tablet: "1.5rem", // 24px
        desktop: "1.5rem", // 24px
      },
      fontWeight: 700,
      lineHeight: 1.4,
      fontFamily: "Lato, sans-serif",
    },
    // Corpo de texto grande
    bodyLarge: {
      fontSize: {
        mobile: "1.125rem", // 18px
        desktop: "1.25rem", // 20px
      },
      fontWeight: 400,
      lineHeight: 1.625,
      fontFamily: "Lato, sans-serif",
    },
    // Corpo de texto padrão
    body: {
      fontSize: {
        mobile: "1rem", // 16px
        desktop: "1.125rem", // 18px
      },
      fontWeight: 400,
      lineHeight: 1.625,
      fontFamily: "Lato, sans-serif",
    },
    // Corpo de texto pequeno
    bodySmall: {
      fontSize: {
        mobile: "0.875rem", // 14px
        desktop: "1rem", // 16px
      },
      fontWeight: 400,
      lineHeight: 1.625,
      fontFamily: "Lato, sans-serif",
    },
    // Badges de seção
    badge: {
      fontSize: {
        mobile: "0.875rem", // 14px
        desktop: "1rem", // 16px
      },
      fontWeight: 600,
      lineHeight: 1.5,
      fontFamily: "Lato, sans-serif",
      padding: {
        vertical: "0.5em", // Padding relativo ao tamanho da fonte
        horizontal: "1em",
      },
      minHeight: "2em", // Altura mínima relativa
    },
  },
  // Dimensões de componentes (em rem ou em para escalar com texto)
  components: {
    icon: {
      small: "1em", // Escala com texto pai
      medium: "1.5em",
      large: "2em",
      xlarge: "3em",
    },
    badge: {
      minHeight: "2em", // Altura mínima relativa ao tamanho da fonte
      borderRadius: "9999px", // rounded-full
    },
  },
} as const;

