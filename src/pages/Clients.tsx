import { ExternalLink, CheckCircle2 } from "lucide-react";

const platforms = [
  {
    name: "Grupos de Facebook",
    description: "Procure grupos como 'Freelancers Brasil', 'Empreendedores Digitais'. Ofereça seus serviços com profissionalismo.",
    link: "https://facebook.com/groups",
    steps: ["Entre em 5+ grupos do seu nicho", "Apresente-se com autoridade", "Poste ofertas 2-3x por semana"],
  },
  {
    name: "OLX / Enjoei",
    description: "Crie anúncios de serviços digitais como se fossem produtos. Funciona muito bem para currículos e bios.",
    link: "https://olx.com.br",
    steps: ["Crie um anúncio atrativo", "Use fotos de exemplo do serviço", "Responda rápido aos interessados"],
  },
  {
    name: "WhatsApp Status",
    description: "Poste no status oferecendo seus serviços. Seus contatos são seus primeiros clientes.",
    steps: ["Poste 3x por dia", "Mostre depoimentos", "Use CTAs diretos"],
  },
  {
    name: "Instagram Direct",
    description: "Aborde perfis de pequenos negócios oferecendo melhorias na bio, posts e descrições.",
    steps: ["Identifique perfis com bio fraca", "Envie uma sugestão gratuita", "Ofereça o serviço completo"],
  },
  {
    name: "Workana / 99Freelas",
    description: "Plataformas de freelancers onde clientes postam demandas todo dia.",
    link: "https://workana.com",
    steps: ["Crie um perfil completo", "Candidate-se a projetos diariamente", "Comece com preços competitivos"],
  },
];

export default function Clients() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Onde Conseguir Clientes</h1>
        <p className="text-sm text-muted-foreground mt-1">Locais práticos para encontrar seus primeiros clientes hoje</p>
      </div>

      <div className="space-y-4">
        {platforms.map((p) => (
          <div key={p.name} className="rounded-xl border border-border bg-card p-5 animate-slide-up">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-base font-semibold text-card-foreground">{p.name}</h3>
              {p.link && (
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-primary hover:underline">
                  Acessar <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-4">{p.description}</p>
            <div className="space-y-2">
              {p.steps.map((step, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm text-card-foreground">{step}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
