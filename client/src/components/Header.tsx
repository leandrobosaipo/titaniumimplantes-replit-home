import { useState } from "react";
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background shadow-sm">
      <div className="bg-primary py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-3 cursor-pointer hover-elevate active-elevate-2 px-3 py-1 rounded-md transition-transform">
              <div className="w-10 h-10 bg-primary-foreground rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">T</span>
              </div>
              <div className="text-primary-foreground">
                <div className="font-bold text-lg leading-none tracking-tight">TITANIUM</div>
                <div className="text-xs tracking-wider mt-0.5">IMPLANTES</div>
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                data-testid={`link-social-${social.label.toLowerCase()}`}
                className="w-8 h-8 flex items-center justify-center text-primary-foreground hover-elevate active-elevate-2 rounded-full transition-all"
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="lg:hidden text-primary-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-menu-toggle"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      <nav className="bg-background border-b hidden lg:block">
        <div className="max-w-7xl mx-auto px-6">
          <ul className="flex items-center justify-center gap-1">
            {menuItems.map((item) => {
              const isActive = location === item.path;
              return (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    data-testid={`link-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`block px-6 py-4 font-medium text-sm tracking-wide hover-elevate active-elevate-2 transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-background border-b">
          <nav className="max-w-7xl mx-auto px-6 py-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = location === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      href={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      data-testid={`link-mobile-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`block px-4 py-3 rounded-md font-medium hover-elevate active-elevate-2 transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center justify-center gap-2 mt-6 pt-6 border-t">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  data-testid={`link-mobile-social-${social.label.toLowerCase()}`}
                  className="w-10 h-10 flex items-center justify-center text-primary hover-elevate active-elevate-2 rounded-full transition-all border border-primary"
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
