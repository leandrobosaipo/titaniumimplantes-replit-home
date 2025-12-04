/**
 * Constantes de design padronizadas para uso em todas as páginas
 * 
 * Extraídas do Header e Footer para garantir consistência visual
 * em páginas internas e futuras implementações
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
      maxWidth: "1280px",
      padding: {
        mobile: "32px", // px-8
        desktop: "48px", // px-12
      },
    },
    section: {
      paddingTop: {
        mobile: "64px", // py-16
        desktop: "96px", // py-24
      },
      paddingBottom: {
        mobile: "64px",
        desktop: "96px",
      },
    },
  },
  typography: {
    h1: {
      fontSize: {
        mobile: "36px",
        tablet: "48px",
        desktop: "56px",
      },
      fontWeight: 900,
      lineHeight: 1.2,
      fontFamily: "Lato, sans-serif",
    },
    h2: {
      fontSize: {
        mobile: "32px",
        tablet: "40px",
        desktop: "48px",
      },
      fontWeight: 900,
      lineHeight: 1.2,
      fontFamily: "Lato, sans-serif",
    },
    body: {
      fontSize: "18px",
      fontWeight: 400,
      lineHeight: 1.6,
      fontFamily: "Lato, sans-serif",
    },
  },
} as const;

