import { MouseEvent } from "react";
import { lgpdPageConfig as d } from "@/data/lgpdPage";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Mail, Phone, MapPin, Users, Network, Share2, Shield } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { SectionContainer } from "@/components/ui/SectionContainer";

export function LgpdExercerDireitosSection() {
  const securityText = d.secaoDireitos.seguranca;
  const securityParts = securityText.split(": ");
  const securityLabel = securityParts[0] + ":";
  const securityContent = securityParts[1] || "";
  const [, setLocation] = useLocation();

  const scrollToContato = () => {
    const contatoEl =
      document.getElementById("contato") ||
      document.getElementById("contato-section");
    if (contatoEl) {
      contatoEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleContatoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setLocation("/#contato");
    // Garante o scroll após o roteamento para a home
    setTimeout(scrollToContato, 50);
  };

  return (
    <section className="bg-white py-12 md:py-24 overflow-x-hidden">
      <SectionContainer>
        <SectionTitle level={2} className="text-center text-[#0a324c] mb-8 md:mb-16" highlightedText="direitos">
          Como exercer seus direitos
        </SectionTitle>
        <div className="grid md:grid-cols-2 gap-8 md:gap-20 items-center">
          {/* Ilustração decorativa - Coluna esquerda */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full min-h-[16rem] flex items-center justify-center">
              <Users className="w-24 h-24 text-gray-300 absolute top-4 left-8" />
              <Network className="w-32 h-32 text-gray-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <Share2 className="w-20 h-20 text-gray-300 absolute bottom-8 right-12" />
              <Shield className="w-16 h-16 text-gray-300 absolute top-8 right-8" />
            </div>
          </div>
          
          {/* Conteúdo - Coluna direita */}
          <div className="space-y-6 md:space-y-10 text-left">
            {d.secaoDireitos.contatos.map((c, i) => (
              <div key={`${c.tipo}-${i}`} className="flex items-center gap-4 md:gap-6">
                <div className="w-14 h-14 md:w-16 md:h-16 text-[#0d70dc] flex items-center justify-center flex-shrink-0">
                  {c.tipo === "email" && <Mail className="w-7 h-7 md:w-8 md:h-8" />}
                  {c.tipo === "tel" && <Phone className="w-7 h-7 md:w-8 md:h-8" />}
                  {c.tipo === "map" && <MapPin className="w-7 h-7 md:w-8 md:h-8" />}
                </div>
                <span className="text-body-lg md:text-body-lg-md text-[#0a324c] font-medium font-lato break-words">{c.valor}</span>
              </div>
            ))}
            <p className="pt-6 md:pt-10 text-body-lg md:text-body-lg-md leading-relaxed font-lato">
              <span className="text-[#0d70dc] font-bold">{securityLabel}</span>{" "}
              <span className="text-[#0a324c]">{securityContent}</span>
            </p>
            <div className="pt-4">
              <Link href="/#contato" onClick={handleContatoClick}>
                <Button className="bg-[#0d70dc] hover:bg-[#0953b0] text-white rounded-full px-6 md:px-10 py-4 md:py-5 text-sm font-bold uppercase tracking-widest font-lato w-full md:w-auto">
                  Falar com o DPO
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}

