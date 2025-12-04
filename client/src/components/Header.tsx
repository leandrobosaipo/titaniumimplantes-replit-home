import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const menuItems = [
  { label: "Home", path: "/" },
  { label: "Quem Somos", path: "/quem-somos" },
  { label: "Produtos", path: "/produtos" },
  { label: "Canal de Denúncia", path: "/canal-denuncia" },
  { label: "LGPD", path: "/lgpd" },
  { label: "Contato", path: "/contato" },
];

const socialLinks = [
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Hook de scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    
    // Verificar posição inicial
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Estado Completo (scroll <= 40px)
  if (!isScrolled) {
    return (
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out"
        style={{
          background: "linear-gradient(to bottom, #01155a 0%, #01155a 60%, #0953b0 100%)",
          height: "150px",
        }}
        data-testid="header"
      >
        <div className="max-w-[1280px] mx-auto px-8 md:px-12 relative h-full">
          {/* Linha Superior: Logo + Ícones Sociais - Sobe parcialmente */}
          <div
            className="flex justify-between items-center py-4 pt-7 transition-opacity duration-300"
            style={{
              position: "relative",
              top: "-20px",
            }}
            data-testid="header-top"
          >
            {/* Logo à esquerda */}
            <Link href="/" data-testid="link-home">
              <img
                src="/logo.png"
                alt="Titanium Implantes"
                className="w-[160px] md:w-[180px] lg:w-[200px] h-auto object-contain cursor-pointer transition-opacity hover:opacity-90"
                data-testid="logo-header"
              />
            </Link>

            {/* Ícones sociais à direita (desktop) + Botão hamburger (mobile) */}
            <div className="flex items-center gap-5 md:gap-6">
              {/* Ícones sociais - Desktop */}
              <div className="hidden lg:flex items-center gap-5 md:gap-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    data-testid={`link-social-${social.label.toLowerCase()}`}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-black hover:bg-gray-100 hover:scale-105 transition-all p-1.5"
                    style={{
                      opacity: 1,
                    }}
                  >
                    <social.icon className="w-full h-full" />
                  </a>
                ))}
              </div>

              {/* Botão hamburger - Mobile */}
              <Button
                size="icon"
                variant="ghost"
                className="lg:hidden text-white hover:bg-white/10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-testid="button-menu-toggle"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Linha Inferior: Menu Pill - Sobrepõe carrossel */}
          <div
            className="absolute bottom-0 inset-x-8 md:inset-x-12"
            style={{
              transform: "translateY(50%)",
              zIndex: 60,
            }}
            data-testid="header-menu-wrapper"
          >
            <nav
              className="bg-[#0d70dc] rounded-lg px-10 py-3.5 shadow-lg hidden lg:flex items-center transition-all duration-300 w-full"
              style={{
                boxShadow: "0px 6px 18px rgba(0,0,0,0.25)",
              }}
              data-testid="nav-desktop"
            >
              <ul className="flex items-center gap-10 md:gap-12">
                {menuItems.map((item) => {
                  const isActive = location === item.path;
                  return (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                        className={`px-4 py-2 rounded-sm font-semibold text-sm transition-all ${
                          isActive
                            ? "bg-white text-[#0d70dc] font-bold"
                            : "text-white hover:opacity-80"
                        }`}
                        style={{
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>

        {/* Menu Mobile (Hamburger) */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden absolute top-full left-0 right-0 w-full animate-in fade-in slide-in-from-top-2 duration-300"
            style={{
              background: "linear-gradient(to bottom, #01155a 0%, #01155a 60%, #0953b0 100%)",
            }}
            data-testid="nav-mobile"
          >
            <nav className="px-6 py-4">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const isActive = location === item.path;
                  return (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        onClick={() => setMobileMenuOpen(false)}
                        data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                        className={`block px-4 py-3 rounded-sm font-medium transition-all ${
                          isActive
                            ? "bg-white text-[#0d70dc] font-bold"
                            : "text-white hover:bg-white/10"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {/* Ícones sociais no menu mobile */}
              <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-white/20">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    data-testid={`link-mobile-social-${social.label.toLowerCase()}`}
                    className="w-10 h-10 flex items-center justify-center bg-white text-black hover:bg-gray-100 hover:scale-110 transition-transform rounded-full"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </nav>
          </div>
        )}
      </header>
    );
  }

  // Estado Compacto (scroll > 40px)
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out"
        style={{
          background: "linear-gradient(to bottom, #01155a 0%, #01155a 60%, #0953b0 100%)",
          height: "70px",
        }}
      data-testid="header-compact"
    >
      <div className="max-w-[1280px] mx-auto px-8 md:px-12 h-full">
        <div className="flex justify-between items-center h-full" data-testid="header-compact-inner">
          {/* Logo à esquerda */}
          <Link href="/" data-testid="link-home-compact">
            <img
              src="/logo.png"
              alt="Titanium Implantes"
              className="w-[140px] md:w-[160px] h-auto object-contain cursor-pointer transition-opacity hover:opacity-90"
              data-testid="logo-header-compact"
            />
          </Link>

          {/* Menu Compacto à direita */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Menu Pill Compacto - Desktop */}
            <nav
              className="bg-[#0d70dc] rounded-lg px-7 py-2.5 shadow-md hidden lg:flex items-center transition-all duration-300"
              style={{
                boxShadow: "0px 4px 12px rgba(0,0,0,0.2)",
              }}
              data-testid="nav-desktop-compact"
            >
              <ul className="flex items-center gap-7 md:gap-8">
                {menuItems.map((item) => {
                  const isActive = location === item.path;
                  return (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        data-testid={`link-nav-compact-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                        className={`px-3 py-1.5 rounded-sm font-semibold text-xs transition-all ${
                          isActive
                            ? "bg-white text-[#0d70dc] font-bold"
                            : "text-white hover:opacity-80"
                        }`}
                        style={{
                          fontFamily: "Inter, sans-serif",
                        }}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Botão hamburger - Mobile */}
            <Button
              size="icon"
              variant="ghost"
              className="lg:hidden text-white hover:bg-white/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-menu-toggle-compact"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Menu Mobile (Hamburger) - Compacto */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden absolute top-full left-0 right-0 w-full animate-in fade-in slide-in-from-top-2 duration-300"
          style={{
            background: "linear-gradient(to bottom, #01155a 0%, #01155a 60%, #0953b0 100%)",
          }}
          data-testid="nav-mobile-compact"
        >
          <nav className="px-6 py-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = location === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`link-mobile-compact-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                      className={`block px-4 py-3 rounded-sm font-medium transition-all ${
                        isActive
                          ? "bg-white text-[#0d70dc] font-bold"
                          : "text-white hover:bg-white/10"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
