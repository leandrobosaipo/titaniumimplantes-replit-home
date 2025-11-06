export function WelcomeSection() {
  return (
    <section className="py-16 md:py-24 bg-muted" data-testid="section-welcome">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider bg-accent px-4 py-2 rounded-full" data-testid="text-welcome-badge">
              Bem-vindo
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight" data-testid="text-welcome-title">
            Nossa missão é promover saúde e qualidade de vida com inovação e produtos de excelência
          </h2>
          <div className="space-y-4 text-muted-foreground text-base md:text-lg leading-relaxed">
            <p data-testid="text-welcome-p1">
              A Titanium Implantes é uma empresa comprometida com a excelência no fornecimento de materiais cirúrgicos e implantes médicos de alta qualidade.
            </p>
            <p data-testid="text-welcome-p2">
              Com foco em inovação e segurança, oferecemos soluções completas para especialidades cirúrgicas, sempre em parceria com as principais referências mundiais do setor.
            </p>
            <p data-testid="text-welcome-p3">
              Nossos produtos são certificados e desenvolvidos com tecnologia de ponta, garantindo os melhores resultados para profissionais da saúde e seus pacientes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
