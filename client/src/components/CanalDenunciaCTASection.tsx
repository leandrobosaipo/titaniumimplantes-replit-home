import { Link } from "wouter";
import { canalDenunciaPageConfig as c } from "@/data/canalDenunciaPage";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function CanalDenunciaCTASection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-[1280px] mx-auto px-8">
        <Card className="bg-[#0d70dc] border-0 shadow-xl rounded-2xl">
          <CardContent className="p-12 md:p-16 text-center">
            {/* Título */}
            <h2 className="text-white text-5xl md:text-6xl font-black font-lato mb-4">
              {c.cta.titulo}
            </h2>

            {/* Textos de apoio */}
            <div className="space-y-2 mb-8">
              {c.cta.textos.map((texto, index) => (
                <p key={index} className="text-white/90 text-lg md:text-xl font-lato">
                  {texto}
                </p>
              ))}
            </div>

            {/* Botão CTA */}
            <Link href={c.cta.botaoLink}>
              <Button
                size="lg"
                className="bg-white text-[#01155a] hover:bg-white/90 font-lato font-bold px-12 py-4 rounded-lg text-lg border-0"
              >
                {c.cta.botaoTexto}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

