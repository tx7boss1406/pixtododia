import { useState } from "react";
import { Sparkles, Copy, Eye, Pencil, Star, TrendingUp } from "lucide-react";
import { toast } from "sonner";

interface Service {
  id: number;
  title: string;
  description: string;
  suggestedPrice: number;
  category: string;
  popularity?: string;
}

const defaultServices: Service[] = [
  { id: 1, title: "Bio profissional para Instagram", description: "Bio otimizada e atrativa para perfis profissionais no Instagram.", suggestedPrice: 15, category: "Redes Sociais", popularity: "Alta" },
  { id: 2, title: "Descrição de produto Shopee/ML", description: "Descrição persuasiva para produtos em marketplaces.", suggestedPrice: 20, category: "E-commerce", popularity: "Alta" },
  { id: 3, title: "Roteiro para Reels/TikTok", description: "Roteiros criativos e virais para vídeos curtos.", suggestedPrice: 25, category: "Conteúdo", popularity: "Média" },
  { id: 4, title: "Nome de marca + slogan", description: "Nomes criativos com slogan profissional para negócios.", suggestedPrice: 30, category: "Branding", popularity: "Alta" },
  { id: 5, title: "Currículo profissional", description: "Currículo moderno e otimizado para o mercado.", suggestedPrice: 35, category: "Carreira", popularity: "Média" },
  { id: 6, title: "Post para Instagram", description: "Texto pronto para carrossel ou feed com CTA.", suggestedPrice: 10, category: "Redes Sociais", popularity: "Alta" },
{ id: 6, title: "Post para Instagram", description: "Texto pronto para carrossel ou feed com CTA.", suggestedPrice: 10, category: "Redes Sociais", popularity: "Alta" },
{
  id: 7,
  title: "Plano de renda online personalizado",
  description:
    "Plano estratégico completo com ideias de renda, passos iniciais e roteiro para começar a ganhar dinheiro online.",
  suggestedPrice: 49,
  category: "Renda Online",
  popularity: "Alta",
},
];

const adTemplate = (title: string, price: number) =>
  `🔥 ${title}\n\n✅ Feito sob medida para você\n✅ Entrega em até 24h\n✅ Profissional e otimizado\n\n💰 Apenas R$ ${price},00\n📲 Chama no direct/WhatsApp!`;

export default function Services() {
  const [prices, setPrices] = useState<Record<number, number>>(
    Object.fromEntries(defaultServices.map((s) => [s.id, s.suggestedPrice]))
  );

  const [editingId, setEditingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filteredServices = defaultServices.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  const copyAd = (s: Service) => {
    navigator.clipboard.writeText(adTemplate(s.title, prices[s.id]));
    toast.success("Anúncio copiado!");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-foreground">Serviços Disponíveis</h1>
        <p className="text-sm text-muted-foreground">Escolha um serviço, gere conteúdo e comece a vender hoje.</p>
      </div>

      {/* Search */}
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Buscar serviço..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {filteredServices.map((s) => (
          <div
            key={s.id}
            className="group relative rounded-2xl border border-border bg-card p-5 flex flex-col shadow-sm hover:shadow-lg transition-all duration-300"
          >
            {/* Top badges */}
            <div className="flex items-center justify-between mb-3">
              <span className="rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                {s.category}
              </span>

              {s.popularity === "Alta" && (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-yellow-400">
                  <TrendingUp className="h-3 w-3" /> Em alta
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-base font-semibold text-card-foreground mb-1.5">
              {s.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4 flex-1">
              {s.description}
            </p>

            {/* Price */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-muted-foreground">Preço sugerido</span>

              {editingId === s.id ? (
                <input
                  type="number"
                  value={prices[s.id]}
                  onChange={(e) =>
                    setPrices({ ...prices, [s.id]: Number(e.target.value) })
                  }
                  onBlur={() => setEditingId(null)}
                  autoFocus
                  className="w-20 rounded-lg border border-input bg-background px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              ) : (
                <button
                  onClick={() => setEditingId(s.id)}
                  className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  R$ {prices[s.id]},00 <Pencil className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <a
                href="/generator"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary py-2 text-xs font-medium text-primary-foreground hover:opacity-90 transition"
              >
                <Sparkles className="h-3.5 w-3.5" /> Gerar
              </a>

              <button
                onClick={() => copyAd(s)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-background py-2 text-xs font-medium text-foreground hover:bg-muted transition"
              >
                <Copy className="h-3.5 w-3.5" /> Copiar
              </button>

              <button
                onClick={() => toast.info("Preview em breve")}
                className="flex items-center justify-center rounded-xl border border-border bg-background px-3 py-2 text-xs hover:bg-muted transition"
              >
                <Eye className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Glow hover */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filteredServices.length === 0 && (
        <div className="text-center text-sm text-muted-foreground py-10">
          Nenhum serviço encontrado.
        </div>
      )}
         {/* 🔥 BLOCO PREMIUM AQUI */}
      <div className="mt-12">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 p-[1px]">
          
          <div className="rounded-2xl bg-card p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-6 h-6 text-yellow-400" />
                <h2 className="text-2xl font-bold">
                  Plataforma Premium com IA
                </h2>
              </div>

              <p className="text-sm text-muted-foreground max-w-xl">
                Acesse a versão avançada com Agente de IA real,
                geração estratégica automática, personalização total
                e estrutura nível agência profissional.
              </p>
            </div>

            <a
              href="https://pixtododiia.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-yellow-500 text-black font-semibold hover:scale-105 transition"
            >
              Acessar Premium
            </a>

          </div>
        </div>
      </div>

    </div>
  );
}
    
