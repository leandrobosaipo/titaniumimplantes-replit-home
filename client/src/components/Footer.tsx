import abradiLogo from "@assets/abradi.png";
import eticaesaudeLogo from "@assets/eticaesaude.png";

const navigationLinks = [
  { title: "Início", href: "/" },
  { title: "Compliance", href: "/compliance" },
  { title: "LGPD", href: "/lgpd" },
  { title: "Canal de Denúncias", href: "/canal-de-denuncia" },
  { title: "Suporte", href: "/suporte" },
  { title: "FAQ", href: "/faq" },
];

const legalLinks = [
  { title: "Termos de Uso", href: "/termos" },
  { title: "Política de Privacidade", href: "/privacidade" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative w-full"
      style={{
        backgroundColor: "#01155a",
      }}
      data-testid="footer"
    >
      {/* Bloco Principal - 4 Colunas */}
      <div className="mx-auto max-w-[1280px] pt-16 pb-16 px-6 md:pt-20 md:pb-20 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 lg:gap-8">
          {/* Coluna 1: Logo + Slogan */}
          <div className="flex flex-col">
            {/* Logo */}
            <img
              src="/logo.png"
              alt="Titanium Implantes - Distribuidora de implantes cirúrgicos em Cuiabá-MT"
              className="w-[160px] md:w-[180px] h-auto object-contain mb-4"
              data-testid="logo-footer"
              width="180"
              height="54"
              loading="lazy"
            />

            {/* Slogan */}
            <p
              className="text-white"
              style={{
                fontFamily: "Inter, Lato, sans-serif",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: 1.4,
                marginTop: "16px",
              }}
              data-testid="text-footer-slogan"
            >
              Respeito, segurança, inovação e compromisso com a saúde.
            </p>
          </div>

          {/* Coluna 2: Links de Navegação */}
          <div className="flex flex-col text-center md:text-left">
            {/* Título "Início" como link */}
            <a
              href="/"
              className="mb-3 no-underline hover:opacity-80 transition-opacity"
              style={{
                fontFamily: "Inter, Lato, sans-serif",
                fontWeight: 600,
                fontSize: "20px",
                color: "#0d70dc",
                marginBottom: "12px",
              }}
              data-testid="link-footer-inicio-title"
            >
              Início
            </a>

            {/* Links (excluindo "Início" que já está no título) */}
            <ul>
              {navigationLinks.filter(link => link.href !== "/").map((link, index, filteredLinks) => (
                <li
                  key={link.href}
                  style={{
                    marginBottom: index < filteredLinks.length - 1 ? "12px" : "0",
                  }}
                >
                  <a
                    href={link.href}
                    className="text-white hover:opacity-80 transition-opacity no-underline"
                    style={{
                      fontFamily: "Inter, Lato, sans-serif",
                      fontWeight: 500,
                      fontSize: "18px",
                    }}
                    data-testid={`link-footer-${link.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Contato + Endereço */}
          <div className="flex flex-col text-center md:text-left" style={{ gap: "24px" }}>
            {/* Bloco Contato */}
            <div className="flex flex-col">
              <h3
                style={{
                  fontFamily: "Inter, Lato, sans-serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  color: "#0d70dc",
                  marginBottom: "12px",
                }}
                data-testid="text-footer-contato-title"
              >
                Contato
              </h3>
              <div className="flex flex-col" style={{ gap: "10px" }}>
                <a
                  href="tel:+556530255625"
                  className="text-white hover:opacity-80 transition-opacity no-underline"
                  style={{
                    fontFamily: "Inter, Lato, sans-serif",
                    fontWeight: 400,
                    fontSize: "18px",
                    lineHeight: 1.4,
                  }}
                  data-testid="link-footer-telefone"
                >
                  (65) 3025-5625
                </a>
                <a
                  href="mailto:contratos@titaniunimplantes.com.br"
                  className="text-white hover:opacity-80 transition-opacity no-underline"
                  style={{
                    fontFamily: "Inter, Lato, sans-serif",
                    fontWeight: 400,
                    fontSize: "18px",
                    lineHeight: 1.4,
                  }}
                  data-testid="link-footer-email"
                >
                  contratos@titaniunimplantes.com.br
                </a>
              </div>
            </div>

            {/* Bloco Endereço */}
            <div className="flex flex-col" style={{ marginTop: "0px" }}>
              <h3
                style={{
                  fontFamily: "Inter, Lato, sans-serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  color: "#0d70dc",
                  marginBottom: "12px",
                }}
                data-testid="text-footer-endereco-title"
              >
                Endereço
              </h3>
              <p
                className="text-white"
                style={{
                  fontFamily: "Inter, Lato, sans-serif",
                  fontWeight: 400,
                  fontSize: "18px",
                  lineHeight: 1.4,
                }}
                data-testid="text-footer-endereco"
              >
                Av. Hist. Rubens de Mendonça, 2368, Sala 1101 - Cuiabá – MT
              </p>
            </div>
          </div>

          {/* Coluna 4: Empresas Associadas */}
          <div className="flex flex-col items-center md:items-center">
            {/* Título */}
            <h3
              className="text-center mb-3"
              style={{
                fontFamily: "Inter, Lato, sans-serif",
                fontWeight: 600,
                fontSize: "20px",
                color: "#0d70dc",
                marginBottom: "12px",
              }}
              data-testid="text-footer-partners-title"
            >
              Empresa associada:
            </h3>

            {/* Logos */}
            <div
              className="flex items-center justify-center flex-wrap"
              style={{
                gap: "24px",
              }}
            >
              {/* Logo ABRAIDI */}
              <img
                src={abradiLogo}
                alt="ABRAIDI - Associação Brasileira de Importadores e Distribuidores de Implantes"
                className="w-[70px] md:w-[90px] lg:w-[120px] h-[130px] object-contain"
                data-testid="logo-abraidi"
                loading="lazy"
              />

              {/* Logo ÉticaSaúde */}
              <img
                src={eticaesaudeLogo}
                alt="ÉticaSaúde - Certificação de ética e compliance em saúde"
                className="w-[70px] md:w-[90px] lg:w-[120px] h-[130px] object-contain"
                data-testid="logo-eticasaude"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Barra Inferior */}
      <div
        className="w-full py-4 px-6 md:px-12"
        style={{
          backgroundColor: "#0071e2",
        }}
        data-testid="footer-bottom-bar"
      >
        <div className="mx-auto max-w-[1280px] flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
          {/* Texto Copyright */}
          <div
            className="text-white text-center md:text-left"
            style={{
              fontFamily: "Inter, Lato, sans-serif",
              fontWeight: 400,
              fontSize: "16px",
            }}
            data-testid="text-footer-copyright"
          >
            © {currentYear} Titaniun Implantes. Todos os Direitos Reservados
          </div>

          {/* Links Legais */}
          <div
            className="flex items-center flex-wrap justify-center md:justify-end"
            style={{
              gap: "32px",
            }}
          >
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white hover:opacity-80 transition-opacity"
                style={{
                  fontFamily: "Inter, Lato, sans-serif",
                  fontWeight: 400,
                  fontSize: "16px",
                }}
                data-testid={`link-footer-legal-${link.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
