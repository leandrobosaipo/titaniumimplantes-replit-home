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
  { title: "Home", href: "/" },
  { title: "Quem Somos", href: "/quem-somos" },
  { title: "Produtos", href: "/produtos" },
  { title: "Canal de Denúncia", href: "/canal-de-denuncia" },
  { title: "LGPD", href: "/lgpd" },
  { title: "Contato", href: "/#contato" },
];

const legalLinks = [...navigationLinks];

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
      {/* Container Principal com Grid Responsivo Mobile-First */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-12">
        {/* Layout Mobile Especial (< 640px) - Layout vertical espaçoso */}
        <div className="sm:hidden">
          {/* Primeira linha: Logo e Menu lado a lado */}
          <div className="flex justify-between items-center w-full mb-6">
            {/* Logo */}
            <img
              src="/logo.png"
              alt="Titanium Implantes - Distribuidora de implantes cirúrgicos em Cuiabá-MT"
              className="w-[120px] xs:w-[140px] h-auto object-contain flex-shrink-0"
              data-testid="logo-footer"
              loading="lazy"
            />

            {/* Menu Mobile */}
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-[#0d70dc] hover:opacity-80 transition-opacity no-underline text-body font-semibold font-lato whitespace-nowrap"
                data-testid="link-footer-inicio-title"
              >
                Início
              </Link>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="flex items-center justify-center w-10 h-9 rounded-md transition-colors flex-shrink-0"
                style={{
                  backgroundColor: "#0d70dc",
                }}
                aria-label="Abrir menu"
                data-testid="button-footer-menu-toggle"
              >
                <Menu className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Segunda linha: Logos associadas centralizadas */}
          <div className="flex items-center justify-center gap-4 xs:gap-6 mb-6">
            <img
              src={abradiLogo}
              alt="ABRAIDI - Associação Brasileira de Importadores e Distribuidores de Implantes"
              className="h-[2.5rem] xs:h-[3rem] w-auto object-contain"
              data-testid="logo-abraidi"
              loading="lazy"
            />
            <img
              src={eticaesaudeLogo}
              alt="ÉticaSaúde - Certificação de ética e compliance em saúde"
              className="h-[2.5rem] xs:h-[3rem] w-auto object-contain"
              data-testid="logo-eticasaude"
              loading="lazy"
            />
          </div>

          {/* Terceira linha: Slogan Mobile */}
          <p
            className="text-center text-white text-body max-w-[280px] xs:max-w-[320px] mx-auto font-lato leading-relaxed"
            data-testid="text-footer-slogan"
          >
            Respeito, segurança, inovação e compromisso com a saúde.
          </p>
        </div>

        {/* Grid Responsivo Mobile-First (≥ 640px) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 pt-8 sm:pt-12 lg:pt-20 pb-8 sm:pb-12 lg:pb-20">
          {/* Coluna 1: Logo + Slogan */}
          <div className="flex flex-col">
            <img
              src="/logo.png"
              alt="Titanium Implantes - Distribuidora de implantes cirúrgicos em Cuiabá-MT"
              className="w-[140px] sm:w-[160px] lg:w-[180px] h-auto object-contain mb-4"
              data-testid="logo-footer-desktop"
              width="180"
              height="54"
              loading="lazy"
            />
            <p
              className="text-white text-body sm:text-body-md font-lato leading-relaxed mt-2 sm:mt-4"
              data-testid="text-footer-slogan-desktop"
            >
              Respeito, segurança, inovação e compromisso com a saúde.
            </p>
          </div>

          {/* Coluna 2: Links de Navegação */}
          <div className="flex flex-col text-center sm:text-left">
            <Link
              href="/"
              className="mb-3 no-underline hover:opacity-80 transition-opacity text-lg sm:text-xl font-semibold text-[#0d70dc] font-lato"
              data-testid="link-footer-inicio-title-desktop"
            >
              Início
            </Link>
            <ul className="space-y-2 sm:space-y-3">
              {navigationLinks.filter(link => link.href !== "/").map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white hover:opacity-80 transition-opacity no-underline text-body sm:text-body-md font-medium font-lato"
                    data-testid={`link-footer-${link.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Contato + Endereço */}
          <div className="flex flex-col text-center sm:text-left space-y-4 sm:space-y-6">
            {/* Bloco Contato */}
            <div className="flex flex-col">
              <h3
                className="text-lg sm:text-xl font-semibold text-[#0d70dc] mb-2 sm:mb-3 font-lato"
                data-testid="text-footer-contato-title"
              >
                Contato
              </h3>
              <div className="flex flex-col space-y-2 sm:space-y-2.5">
                <a
                  href="tel:+556530255625"
                  className="text-white hover:opacity-80 transition-opacity no-underline text-body sm:text-body-md font-lato leading-relaxed break-words"
                  data-testid="link-footer-telefone"
                >
                  (65) 3025-5625
                </a>
                <a
                  href="mailto:contratos@titaniunimplantes.com.br"
                  className="text-white hover:opacity-80 transition-opacity no-underline text-body sm:text-body-md font-lato leading-relaxed break-words"
                  data-testid="link-footer-email"
                >
                  contratos@titaniunimplantes.com.br
                </a>
              </div>
            </div>

            {/* Bloco Endereço */}
            <div className="flex flex-col">
              <h3
                className="text-lg sm:text-xl font-semibold text-[#0d70dc] mb-2 sm:mb-3 font-lato"
                data-testid="text-footer-endereco-title"
              >
                Endereço
              </h3>
              <p
                className="text-white text-body sm:text-body-md font-lato leading-relaxed"
                data-testid="text-footer-endereco"
              >
                Av. Hist. Rubens de Mendonça, 2368, Sala 1101 - Cuiabá – MT
              </p>
            </div>
          </div>

          {/* Coluna 4: Empresas Associadas */}
          <div className="flex flex-col items-center sm:items-start lg:items-center">
            <h3
              className="text-center sm:text-left lg:text-center mb-3 text-lg sm:text-xl font-semibold text-[#0d70dc] font-lato"
              data-testid="text-footer-partners-title"
            >
              Empresa associada:
            </h3>
            <div className="flex items-center justify-center sm:justify-start lg:justify-center flex-wrap gap-4 sm:gap-6">
              <img
                src={abradiLogo}
                alt="ABRAIDI - Associação Brasileira de Importadores e Distribuidores de Implantes"
                className="w-[80px] sm:w-[90px] lg:w-[120px] min-h-[6rem] sm:min-h-[7rem] lg:min-h-[8rem] object-contain"
                data-testid="logo-abraidi-desktop"
                loading="lazy"
              />
              <img
                src={eticaesaudeLogo}
                alt="ÉticaSaúde - Certificação de ética e compliance em saúde"
                className="w-[80px] sm:w-[90px] lg:w-[120px] min-h-[6rem] sm:min-h-[7rem] lg:min-h-[8rem] object-contain"
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
                    className="block text-white hover:opacity-80 transition-opacity no-underline text-body-md font-medium font-lato"
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
            className="text-white text-center md:text-left text-body-sm md:text-body font-lato"
            data-testid="text-footer-copyright"
          >
            © {currentYear} Titaniun Implantes. Todos os Direitos Reservados
          </div>

          {/* Links Legais */}
          <div
            className="flex items-center flex-wrap justify-center md:justify-end gap-4 md:gap-8"
          >
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:underline md:hover:opacity-80 transition-all text-body-sm md:text-body font-lato"
                data-testid={`link-footer-legal-${link.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
