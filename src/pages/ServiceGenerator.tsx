import { useState } from "react";
import { Sparkles, Copy, Download, Save } from "lucide-react";
import { toast } from "sonner";

const serviceTypes = [
  "Bio profissional para Instagram",
  "Descrição de produto Shopee/ML",
  "Roteiro para Reels/TikTok",
  "Nome de marca + slogan",
  "Currículo profissional",
  "Post para Instagram",
];

const mockResults: Record<string, string> = {
  "Bio profissional para Instagram":
    "🎯 Especialista em [sua área] | Transformando [problema] em [solução]\n📍 [Cidade]\n🚀 +500 clientes satisfeitos\n💼 Consultoria personalizada\n📩 DM para orçamento\n🔗 Link na bio 👇",
  "Descrição de produto Shopee/ML":
    "📦 [NOME DO PRODUTO] — Qualidade Premium\n\n✅ Material de alta qualidade\n✅ Envio rápido e seguro\n✅ Garantia de satisfação\n\n📏 Especificações:\n• Tamanho: [X]\n• Material: [Y]\n• Cor: [Z]\n\n🔥 OFERTA POR TEMPO LIMITADO\n⚡ Compre agora e receba em [prazo]!\n\n💬 Dúvidas? Chame no chat!",
  "Roteiro para Reels/TikTok":
    "🎬 ROTEIRO — [TEMA]\n\n[GANCHO - 0 a 3s]\n\"Você sabia que [dado impactante]?\"\n\n[DESENVOLVIMENTO - 3 a 12s]\n\"A maioria das pessoas faz [erro comum], mas o segredo é [dica].\"\n\n[CTA - 12 a 15s]\n\"Salva esse vídeo e manda pra alguém que precisa! Siga para mais dicas.\"",
  "Nome de marca + slogan":
    "🏷️ Sugestões de Nome + Slogan:\n\n1. NovaPulse — \"Inovação que pulsa no seu negócio\"\n2. ClickBrand — \"Sua marca, um clique à frente\"\n3. VeloCity — \"Velocidade que gera resultados\"\n4. PrimeEdge — \"A vantagem que faz a diferença\"\n5. BrightPath — \"Iluminando o caminho do sucesso\"",
  "Currículo profissional":
    "📄 CURRÍCULO PROFISSIONAL\n\n[NOME COMPLETO]\n[Cargo desejado]\n\n📧 email@exemplo.com | 📱 (XX) XXXXX-XXXX\n📍 [Cidade/Estado]\n\n--- RESUMO PROFISSIONAL ---\nProfissional com [X] anos de experiência em [área], especializado em [competência]. Reconhecido por [conquista].\n\n--- EXPERIÊNCIA ---\n[Empresa] — [Cargo] (20XX–Atual)\n• [Realização com métrica]\n• [Responsabilidade principal]\n\n--- FORMAÇÃO ---\n[Curso] — [Instituição] (20XX)",
  "Post para Instagram":
    "📱 POST PARA INSTAGRAM\n\n[TÍTULO CHAMATIVO]\n\nVocê sabia que [dado relevante]? 🤔\n\nA verdade é que [insight valioso].\n\nAqui vão 3 dicas práticas:\n\n1️⃣ [Dica 1]\n2️⃣ [Dica 2]\n3️⃣ [Dica 3]\n\n💡 Salve este post para consultar depois!\n\n#[hashtag1] #[hashtag2] #[hashtag3]",
};

export default function ServiceGenerator() {
  const [serviceType, setServiceType] = useState(serviceTypes[0]);
  const [details, setDetails] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = () => {
    setLoading(true);
    setTimeout(() => {
      setResult(mockResults[serviceType] || "Serviço gerado com sucesso!");
      setLoading(false);
      toast.success("Serviço gerado!");
    }, 1500);
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copiado!");
  };

  const downloadResult = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${serviceType.replace(/\s/g, "-").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Download iniciado!");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Gerador de Serviços</h1>
        <p className="text-sm text-muted-foreground mt-1">Selecione o tipo, adicione detalhes e gere em segundos</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-card-foreground">Tipo de serviço</label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
          >
            {serviceTypes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-card-foreground">Detalhes / Informações do cliente</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            rows={4}
            placeholder="Ex: Loja de roupas femininas, público 25-35 anos, foco em moda casual..."
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 resize-none"
          />
        </div>

        <button
          onClick={generate}
          disabled={loading}
          className="flex items-center gap-2 rounded-lg gradient-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition disabled:opacity-50"
        >
          <Sparkles className="h-4 w-4" />
          {loading ? "Gerando..." : "Gerar serviço"}
        </button>
      </div>

      {result && (
        <div className="rounded-xl border border-border bg-card p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-card-foreground">Resultado</h2>
            <div className="flex gap-2">
              <button onClick={copyResult} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition">
                <Copy className="h-3.5 w-3.5" /> Copiar
              </button>
              <button onClick={downloadResult} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition">
                <Download className="h-3.5 w-3.5" /> Baixar
              </button>
              <button onClick={() => toast.success("Salvo no histórico!")} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition">
                <Save className="h-3.5 w-3.5" /> Salvar
              </button>
            </div>
          </div>
          <pre className="whitespace-pre-wrap rounded-lg bg-muted/50 p-4 text-sm text-card-foreground leading-relaxed font-mono">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}
