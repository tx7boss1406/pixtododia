import { useState } from "react";
import { Sparkles, Copy, Eye, Pencil } from "lucide-react";
import { toast } from "sonner";

interface Service {
  id: number;
  title: string;
  description: string;
  suggestedPrice: number;
  category: string;
}

const defaultServices: Service[] = [
  { id: 1, title: "Bio profissional para Instagram", description: "Bio otimizada e atrativa para perfis profissionais no Instagram.", suggestedPrice: 15, category: "Redes Sociais" },
  { id: 2, title: "Descrição de produto Shopee/ML", description: "Descrição persuasiva para produtos em marketplaces.", suggestedPrice: 20, category: "E-commerce" },
  { id: 3, title: "Roteiro para Reels/TikTok", description: "Roteiros criativos e virais para vídeos curtos.", suggestedPrice: 25, category: "Conteúdo" },
  { id: 4, title: "Nome de marca + slogan", description: "Nomes criativos com slogan profissional para negócios.", suggestedPrice: 30, category: "Branding" },
  { id: 5, title: "Currículo profissional", description: "Currículo moderno e otimizado para o mercado.", suggestedPrice: 35, category: "Carreira" },
  { id: 6, title: "Post para Instagram", description: "Texto pronto para carrossel ou feed com CTA.", suggestedPrice: 10, category: "Redes Sociais" },
];

const adTemplate = (title: string, price: number) =>
  `🔥 ${title}\n\n✅ Feito sob medida para você\n✅ Entrega em até 24h\n✅ Profissional e otimizado\n\n💰 Apenas R$ ${price},00\n📲 Chama no direct/WhatsApp!`;

export default function Services() {
  const [prices, setPrices] = useState<Record<number, number>>(
    Object.fromEntries(defaultServices.map((s) => [s.id, s.suggestedPrice]))
  );
  const [editingId, setEditingId] = useState<number | null>(null);

  const copyAd = (s: Service) => {
    navigator.clipboard.writeText(adTemplate(s.title, prices[s.id]));
    toast.success("Anúncio copiado!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Serviços Disponíveis</h1>
        <p className="text-sm text-muted-foreground mt-1">Escolha um serviço, gere e comece a vender</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {defaultServices.map((s) => (
          <div key={s.id} className="rounded-xl border border-border bg-card p-5 flex flex-col animate-slide-up">
            <div className="flex items-start justify-between mb-3">
              <span className="inline-block rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                {s.category}
              </span>
            </div>
            <h3 className="text-base font-semibold text-card-foreground mb-1.5">{s.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 flex-1">{s.description}</p>

            {/* Price */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-muted-foreground">Preço sugerido:</span>
              {editingId === s.id ? (
                <input
                  type="number"
                  value={prices[s.id]}
                  onChange={(e) => setPrices({ ...prices, [s.id]: Number(e.target.value) })}
                  onBlur={() => setEditingId(null)}
                  autoFocus
                  className="w-20 rounded border border-input bg-background px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                />
              ) : (
                <button onClick={() => setEditingId(s.id)} className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                  R$ {prices[s.id]},00 <Pencil className="h-3 w-3" />
                </button>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <a
                href="/generator"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg gradient-primary py-2 text-xs font-medium text-primary-foreground hover:opacity-90 transition"
              >
                <Sparkles className="h-3.5 w-3.5" /> Gerar
              </a>
              <button
                onClick={() => copyAd(s)}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border bg-background py-2 text-xs font-medium text-foreground hover:bg-muted transition"
              >
                <Copy className="h-3.5 w-3.5" /> Copiar anúncio
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
