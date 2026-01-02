import { useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "wouter";
import abradiLogo from "@assets/abradi.png";
import eticaesaudeLogo from "@assets/eticaesaude.png";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <footer
      className="relative w-full py-8 md:pt-20 md:pb-20"
      style={{
        backgroundColor: "#01155a",
      }}
      data-testid="footer"
    >
      {/* Layout Mobile - Primeira linha horizontal */}
      <div className="md:hidden mx-auto max-w-[1280px] px-6">
        <div className="flex justify-between items-center w-full mb-6">
          {/* Bloco Esquerdo - Logo */}
          <img
            src="/logo.png"
            alt="Titanium Implantes - Distribuidora de implantes cirúrgicos em Cuiabá-MT"
            className="w-[140px] h-auto object-contain"
            data-testid="logo-footer"
            loading="lazy"
          />

          {/* Bloco Central - Menu */}
          <div className="flex flex-col items-center gap-1">
            <Link
              href="/"
              className="text-[#0d70dc] hover:opacity-80 transition-opacity no-underline"
              style={{
                fontFamily: "Inter, Lato, sans-serif",
                fontWeight: 600,
                fontSize: "16px",
              }}
              data-testid="link-footer-inicio-title"
            >
              Início
            </Link>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center justify-center w-10 h-9 rounded-md transition-colors"
              style={{
                backgroundColor: "#0d70dc",
              }}
              aria-label="Abrir menu"
              data-testid="button-footer-menu-toggle"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Bloco Direito - Logos */}
          <div className="flex items-center gap-4">
            <img
              src={abradiLogo}
              alt="ABRAIDI - Associação Brasileira de Importadores e Distribuidores de Implantes"
              className="h-12 object-contain"
              data-testid="logo-abraidi"
              loading="lazy"
            />
            <img
              src={eticaesaudeLogo}
              alt="ÉticaSaúde - Certificação de ética e compliance em saúde"
              className="h-12 object-contain"
              data-testid="logo-eticasaude"
              loading="lazy"
            />
          </div>
        </div>

        {/* Texto Institucional - Mobile */}
        <p
          className="text-center text-white text-base max-w-[240px] mx-auto mt-6"
          style={{
            fontFamily: "Inter, Lato, sans-serif",
            fontWeight: 400,
            lineHeight: 1.3,
          }}
          data-testid="text-footer-slogan"
        >
          Respeito, segurança, inovação e compromisso com a saúde.
        </p>
      </div>

      {/* Bloco Principal - 4 Colunas (Desktop) */}
      <div className="hidden md:block mx-auto max-w-[1280px] pt-20 pb-20 px-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Coluna 1: Logo + Slogan */}
          <div className="flex flex-col">
            {/* Logo */}
            <img
              src="/logo.png"
              alt="Titanium Implantes - Distribuidora de implantes cirúrgicos em Cuiabá-MT"
              className="w-[180px] h-auto object-contain mb-4"
              data-testid="logo-footer-desktop"
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
              data-testid="text-footer-slogan-desktop"
            >
              Respeito, segurança, inovação e compromisso com a saúde.
            </p>
          </div>

          {/* Coluna 2: Links de Navegação */}
          <div className="flex flex-col text-center md:text-left">
            {/* Título "Início" como link */}
            <Link
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
            </Link>

            {/* Links (excluindo "Início" que já está no título) */}
            <ul>
              {navigationLinks.filter(link => link.href !== "/").map((link, index, filteredLinks) => (
                <li
                  key={link.href}
                  style={{
                    marginBottom: index < filteredLinks.length - 1 ? "12px" : "0",
                  }}
                >
                  <Link
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
                  </Link>
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
          <div className="flex flex-col items-center">
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
                className="w-[90px] lg:w-[120px] h-[130px] object-contain"
                data-testid="logo-abraidi-desktop"
                loading="lazy"
              />

              {/* Logo ÉticaSaúde */}
              <img
                src={eticaesaudeLogo}
                alt="ÉticaSaúde - Certificação de ética e compliance em saúde"
                className="w-[90px] lg:w-[120px] h-[130px] object-contain"
                data-testid="logo-eticasaude-desktop"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Menu Mobile Drawer */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent
          side="right"
          className="bg-[#01155a] border-[#0d70dc]"
          data-testid="sheet-footer-menu"
        >
          <SheetHeader>
            <SheetTitle className="text-white">Menu</SheetTitle>
          </SheetHeader>
          <nav className="mt-6">
            <ul className="space-y-4">
              {navigationLinks.filter(link => link.href !== "/").map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-white hover:opacity-80 transition-opacity no-underline"
                    style={{
                      fontFamily: "Inter, Lato, sans-serif",
                      fontWeight: 500,
                      fontSize: "18px",
                    }}
                    data-testid={`link-footer-menu-${link.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Barra Inferior */}
      <div
        className="w-full py-3 md:py-4 px-6 md:px-12"
        style={{
          backgroundColor: "#0071e2",
        }}
        data-testid="footer-bottom-bar"
      >
        <div className="mx-auto max-w-[1280px] flex flex-col md:flex-row justify-between items-center gap-1.5 md:gap-0">
          {/* Texto Copyright */}
          <div
            className="text-white text-center md:text-left text-sm md:text-base"
            style={{
              fontFamily: "Inter, Lato, sans-serif",
              fontWeight: 400,
            }}
            data-testid="text-footer-copyright"
          >
            © {currentYear} Titaniun Implantes. Todos os Direitos Reservados
          </div>

          {/* Links Legais */}
          <div
            className="flex items-center flex-wrap justify-center md:justify-end gap-4 md:gap-8"
          >
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white hover:underline md:hover:opacity-80 transition-all text-sm md:text-base"
                style={{
                  fontFamily: "Inter, Lato, sans-serif",
                  fontWeight: 400,
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
