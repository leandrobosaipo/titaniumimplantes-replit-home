import { Link } from "wouter";
import { Mail, MapPin, Phone } from "lucide-react";

const navigationLinks = [
  { title: "Início", href: "/" },
  { title: "Compliance", href: "/compliance" },
  { title: "LGPD", href: "/lgpd" },
  { title: "Canal de Denúncias", href: "/canal-denuncia" },
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
    <footer className="bg-primary text-primary-foreground" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary-foreground rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-xl">T</span>
              </div>
              <div>
                <div className="font-bold text-xl leading-none tracking-tight">TITANIUM</div>
                <div className="text-xs tracking-wider mt-1 opacity-90">IMPLANTES</div>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed mb-4" data-testid="text-footer-tagline">
              Respeito, segurança, inovação e compromisso com a saúde.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4" data-testid="text-footer-nav-title">Navegação</h3>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/80 hover:text-primary-foreground text-sm hover-elevate inline-block transition-all"
                    data-testid={`link-footer-${link.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4" data-testid="text-footer-contact-title">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <a 
                    href="tel:+556530255625" 
                    className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
                    data-testid="link-footer-phone"
                  >
                    (65) 3025-5625
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <a 
                    href="mailto:contratos@titaniumimplantes.com.br" 
                    className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors break-all"
                    data-testid="link-footer-email"
                  >
                    contratos@titaniumimplantes.com.br
                  </a>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4" data-testid="text-footer-address-title">Endereço</h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <address className="text-primary-foreground/80 text-sm not-italic leading-relaxed" data-testid="text-footer-address">
                Av. Hist. Rubens de Mendonça, 2368, Sala 1101 - Cuiabá - MT
              </address>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6 flex-wrap justify-center md:justify-start">
              <div className="text-sm text-primary-foreground/70" data-testid="text-footer-copyright">
                © {currentYear} Titanium Implantes. Todos os Direitos Reservados
              </div>
            </div>

            <div className="flex items-center gap-6 flex-wrap justify-center">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  data-testid={`link-footer-legal-${link.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-primary-foreground/20">
            <div className="text-center">
              <p className="text-sm text-primary-foreground/60 mb-4" data-testid="text-footer-partners">
                Empresa associada:
              </p>
              <div className="flex items-center justify-center gap-8 flex-wrap">
                <div className="bg-primary-foreground/10 px-6 py-3 rounded-md">
                  <span className="text-primary-foreground font-semibold text-sm" data-testid="text-partner-abraidi">
                    ABRAIDI
                  </span>
                </div>
                <div className="bg-primary-foreground/10 px-6 py-3 rounded-md">
                  <span className="text-primary-foreground font-semibold text-sm" data-testid="text-partner-eticasaude">
                    Ética Saúde
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
