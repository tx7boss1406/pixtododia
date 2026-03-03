import { Zap, Mail, BarChart3, Settings } from "lucide-react";

const upgrades = [
  { icon: Zap, label: "Automação de vendas" },
  { icon: BarChart3, label: "Funil integrado" },
  { icon: Mail, label: "Email marketing" },
  { icon: Settings, label: "Painel administrativo extra" },
];

const OrderBumpSection = () => {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative rounded-3xl overflow-hidden border border-[hsl(217,91%,60%/0.15)]">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(225,40%,12%)] via-[hsl(225,45%,8%)] to-[hsl(225,50%,6%)]" />
          <div className="absolute inset-0 backdrop-blur-xl" />

          {/* Glow accent */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[radial-gradient(circle,hsl(217,91%,60%/0.1),transparent_70%)] blur-3xl" />

          <div className="relative z-10 p-8 sm:p-12 lg:p-16">
           <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase text-[hsl(40,90%,65%)] mb-4">
  Oportunidade Estratégica
</span>

            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-tight max-w-2xl">
             Transforme este projeto em uma{" "}
              <span className="bg-gradient-to-r from-[hsl(40,90%,65%)] to-[hsl(30,90%,60%)] bg-clip-text text-transparent">
                fonte real de renda
              </span>
            </h3>

            <p className="text-[hsl(220,20%,65%)] mb-8 max-w-xl">
              Enquanto muitas agências cobram valores elevados por projetos como este, você pode adquirir uma estrutura profissional por um custo acessível e utilizar para vender, revender ou escalar seus próprios serviços.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {upgrades.map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-white/80">
                  <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-[hsl(217,91%,55%/0.12)] flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-[hsl(217,91%,70%)]" />
                  </div>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <a
                href="https://pay.kirvano.com/upgrade-automacao"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 text-base font-semibold text-[hsl(225,45%,6%)] rounded-2xl bg-gradient-to-r from-[hsl(40,90%,65%)] to-[hsl(30,90%,55%)] hover:scale-105 transition-transform duration-300 shadow-lg shadow-[hsl(40,90%,50%/0.2)]"
              >
                Quero meu projeto estratégico
              </a>
              <span className="text-sm text-[hsl(220,20%,55%)]">
               Projetos desenvolvidos com padrão profissional e alto potencial de retorno.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderBumpSection;
