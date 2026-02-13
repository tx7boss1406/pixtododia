import { useState } from "react";
import { Copy, MessageSquare, RefreshCw, Shield } from "lucide-react";
import { toast } from "sonner";

interface Script {
  id: number;
  title: string;
  content: string;
  category: string;
}

const scripts: Script[] = [
  { id: 1, category: "Abordagem", title: "Primeiro contato — WhatsApp", content: "Oi! Tudo bem? 😊\n\nVi seu perfil e achei muito legal o que você faz! Trabalho com [serviço] e tenho ajudado pessoas como você a [benefício].\n\nPosso te mostrar um exemplo gratuito? Sem compromisso!" },
  { id: 2, category: "Abordagem", title: "Abordagem por Instagram", content: "Oi! Passei pelo seu perfil e notei que sua bio poderia ser ainda mais impactante! 🚀\n\nFiz uma sugestão rápida — posso te enviar? É de graça, sem compromisso. Se curtir, a gente conversa sobre o serviço completo!" },
  { id: 3, category: "Objeções", title: "\"Está caro\"", content: "Entendo! Mas pensa comigo: esse investimento pode te trazer muito mais clientes. Um cliente novo já paga o serviço inteiro! E o resultado é profissional, não é algo genérico. 😉\n\nPosso fazer um preço especial pra você começar?" },
  { id: 4, category: "Objeções", title: "\"Vou pensar\"", content: "Sem problemas! Só queria te avisar que essa condição especial é por tempo limitado. 😊\n\nSe quiser, posso te mandar um exemplo do resultado antes de decidir. Assim você vê na prática o que vai receber!" },
  { id: 5, category: "Objeções", title: "\"Não preciso disso\"", content: "Entendo! Mas sabia que [dado relevante]? Muitas vezes pequenas melhorias fazem grande diferença nos resultados.\n\nPosso te mostrar um antes e depois rápido? Aí você decide se faz sentido pra você!" },
  { id: 6, category: "Follow-up", title: "Follow-up 24h", content: "Oi! Tudo bem? 😊\n\nPassando pra saber se deu uma olhada na proposta que te enviei. Caso tenha alguma dúvida, estou à disposição!\n\nLembrando que o preço especial vale até [data]. 🚀" },
  { id: 7, category: "Follow-up", title: "Follow-up 48h", content: "Oi! Só queria te lembrar que seu orçamento ainda está reservado. 😊\n\nMuita gente já começou a usar e os feedbacks têm sido incríveis! Se quiser, posso te mostrar alguns depoimentos.\n\nO que acha?" },
  { id: 8, category: "Fechamento", title: "Fechar venda", content: "Ótimo! Fico feliz que tenha curtido! 🎉\n\nPra começar, preciso apenas de:\n✅ [Informação 1]\n✅ [Informação 2]\n\nO pagamento pode ser via PIX — te envio a chave assim que confirmar. Entrego em até 24h! 🚀" },
];

const categories = ["Todos", "Abordagem", "Objeções", "Follow-up", "Fechamento"];

const categoryIcons: Record<string, React.ReactNode> = {
  Abordagem: <MessageSquare className="h-4 w-4" />,
  Objeções: <Shield className="h-4 w-4" />,
  "Follow-up": <RefreshCw className="h-4 w-4" />,
  Fechamento: <Copy className="h-4 w-4" />,
};

export default function Scripts() {
  const [filter, setFilter] = useState("Todos");

  const filtered = filter === "Todos" ? scripts : scripts.filter((s) => s.category === filter);

  const copy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Script copiado!");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Scripts de Venda</h1>
        <p className="text-sm text-muted-foreground mt-1">Mensagens prontas para WhatsApp e redes sociais</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === c
                ? "gradient-primary text-primary-foreground"
                : "border border-border bg-card text-card-foreground hover:bg-muted"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((s) => (
          <div key={s.id} className="rounded-xl border border-border bg-card p-5 animate-slide-up">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                {categoryIcons[s.category]} {s.category}
              </span>
            </div>
            <h3 className="text-sm font-semibold text-card-foreground mb-3">{s.title}</h3>
            <pre className="whitespace-pre-wrap rounded-lg bg-muted/50 p-3 text-sm text-card-foreground leading-relaxed mb-4 font-sans">
              {s.content}
            </pre>
            <button
              onClick={() => copy(s.content)}
              className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-xs font-medium text-foreground hover:bg-muted transition"
            >
              <Copy className="h-3.5 w-3.5" /> Copiar script
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
