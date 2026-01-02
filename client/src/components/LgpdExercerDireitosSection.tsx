import { MouseEvent } from "react";
import { lgpdPageConfig as d } from "@/data/lgpdPage";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Mail, Phone, MapPin, Users, Network, Share2, Shield } from "lucide-react";

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
    <section className="bg-white py-24 px-8">
      <div className="mx-auto max-w-[1280px]">
        <h2 className="text-center text-[44px] md:text-[52px] font-[900] text-[#0a324c] mb-16 font-lato">
          Como exercer seus <span className="text-[#0d70dc]">direitos</span>
        </h2>
        <div className="grid md:grid-cols-2 gap-20 items-center">
          {/* Ilustração decorativa - Coluna esquerda */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full h-64 flex items-center justify-center">
              <Users className="w-24 h-24 text-gray-300 absolute top-4 left-8" />
              <Network className="w-32 h-32 text-gray-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <Share2 className="w-20 h-20 text-gray-300 absolute bottom-8 right-12" />
              <Shield className="w-16 h-16 text-gray-300 absolute top-8 right-8" />
            </div>
          </div>
          
          {/* Conteúdo - Coluna direita */}
          <div className="space-y-10 text-left">
            {d.secaoDireitos.contatos.map((c, i) => (
              <div key={`${c.tipo}-${i}`} className="flex items-center gap-6">
                <div className="w-14 h-14 text-[#0d70dc] flex items-center justify-center">
                  {c.tipo === "email" && <Mail size={28} />}
                  {c.tipo === "tel" && <Phone size={28} />}
                  {c.tipo === "map" && <MapPin size={28} />}
                </div>
                <span className="text-xl text-[#0a324c] font-medium font-lato">{c.valor}</span>
              </div>
            ))}
            <p className="pt-10 text-xl leading-relaxed font-lato">
              <span className="text-[#0d70dc] font-bold">{securityLabel}</span>{" "}
              <span className="text-[#0a324c]">{securityContent}</span>
            </p>
            <div className="pt-4">
              <Link href="/#contato" onClick={handleContatoClick}>
                <Button className="bg-[#0d70dc] hover:bg-[#0953b0] text-white rounded-full px-10 py-5 text-sm font-bold uppercase tracking-widest font-lato">
                  Falar com o DPO
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

