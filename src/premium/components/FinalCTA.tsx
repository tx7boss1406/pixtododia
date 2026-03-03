const FinalCTA = () => {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,hsl(217,91%,60%/0.08),transparent_60%)] blur-3xl animate-glow-pulse" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
          Não é apenas um site.
          <br />
          <span className="bg-gradient-to-r from-[hsl(217,91%,60%)] to-[hsl(270,60%,60%)] bg-clip-text text-transparent">
            É um ativo digital
          </span>{" "}
          que trabalha por você.
        </h2>

        <p className="text-lg text-[hsl(220,20%,65%)] mb-12 max-w-xl mx-auto">
          Projetos desenvolvidos com engenharia de software de alto nível para
          escalar seu negócio.
        </p>

        <a
          href="#premium-services"
          className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(217,91%,55%)] to-[hsl(270,60%,55%)] rounded-2xl" />
          <div className="absolute -inset-2 bg-gradient-to-r from-[hsl(217,91%,55%/0.3)] to-[hsl(270,60%,55%/0.3)] rounded-3xl blur-xl animate-glow-pulse" />
          <span className="relative z-10">Iniciar meu projeto agora</span>
        </a>
      </div>
    </section>
  );
};

export default FinalCTA;
