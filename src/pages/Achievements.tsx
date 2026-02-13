import { Trophy, Lock, Star, Zap, Crown } from "lucide-react";

const levels = [
  {
    name: "Iniciante",
    icon: Star,
    description: "Você está começando sua jornada!",
    requirement: "Criar conta",
    unlocked: true,
    rewards: ["Acesso a 3 serviços básicos", "Scripts de abordagem"],
    progress: 100,
  },
  {
    name: "Ativo",
    icon: Zap,
    description: "Você já está gerando e vendendo!",
    requirement: "Gerar 5 serviços e completar checklist",
    unlocked: true,
    rewards: ["Todos os 6 serviços", "Scripts de objeções"],
    progress: 60,
  },
  {
    name: "Consistente",
    icon: Trophy,
    description: "Vendas regulares e clientes satisfeitos!",
    requirement: "10+ vendas registradas",
    unlocked: false,
    rewards: ["Scripts de follow-up", "Templates premium"],
    progress: 0,
  },
  {
    name: "Avançado",
    icon: Crown,
    description: "Você é referência na plataforma!",
    requirement: "50+ vendas e R$ 1.000 acumulados",
    unlocked: false,
    rewards: ["Acesso antecipado a novos serviços", "Badge exclusivo"],
    progress: 0,
  },
];

export default function Achievements() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Conquistas & Níveis</h1>
        <p className="text-sm text-muted-foreground mt-1">Evolua na plataforma e desbloqueie novos recursos</p>
      </div>

      <div className="space-y-4">
        {levels.map((level, i) => (
          <div
            key={level.name}
            className={`rounded-xl border p-5 animate-slide-up ${
              level.unlocked
                ? "border-primary/30 bg-card"
                : "border-border bg-card opacity-70"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                  level.unlocked ? "gradient-primary" : "bg-muted"
                }`}
              >
                {level.unlocked ? (
                  <level.icon className="h-6 w-6 text-primary-foreground" />
                ) : (
                  <Lock className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-semibold text-card-foreground">{level.name}</h3>
                  {level.unlocked && (
                    <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                      Desbloqueado
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-3">{level.description}</p>
                <p className="text-xs text-muted-foreground mb-3">
                  <span className="font-medium text-card-foreground">Requisito:</span> {level.requirement}
                </p>

                {/* Progress bar */}
                <div className="mb-3">
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full gradient-primary transition-all duration-700"
                      style={{ width: `${level.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 block">{level.progress}% completo</span>
                </div>

                {/* Rewards */}
                <div className="flex flex-wrap gap-2">
                  {level.rewards.map((r) => (
                    <span key={r} className="rounded-md bg-muted px-2.5 py-1 text-xs text-muted-foreground">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
