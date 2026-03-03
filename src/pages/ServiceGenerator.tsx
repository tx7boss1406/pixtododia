import { useState } from "react";
import { Sparkles, Copy, Download, Save } from "lucide-react";
import { toast } from "sonner";
import { jsPDF } from "jspdf"; // Importando a biblioteca jsPDF

const serviceTypes = [
  "Bio profissional para Instagram",
  "Descrição de produto Shopee/ML",
  "Roteiro para Reels/TikTok",
  "Nome de marca + slogan",
  "Currículo profissional",
  "Post para Instagram",
  "Plano de renda online personalizado",
];

const mockResults: Record<string, string> = {
  "Bio profissional para Instagram": `🚀 [SEU NOME OU MARCA]

🎯 Especialista em [sua área de atuação]
💡 Ajudando pessoas a [principal benefício que você entrega]
🏆 +[número] clientes atendidos | Resultados comprovados

📍 [Cidade/Estado]  
📩 Contato direto no WhatsApp  
👇 Acesse o link e saiba mais`,

  "Descrição de produto Shopee/ML": `📦 [NOME DO PRODUTO] — Qualidade Premium

✨ Destaques do produto:
• Material resistente e durável  
• Design moderno e funcional  
• Excelente custo-benefício  

📏 Especificações técnicas:
• Tamanho: [informar]  
• Cor: [informar]  
• Material: [informar]  

🚚 Envio rápido para todo o Brasil  
🔒 Compra 100% segura  

🔥 Garanta agora o seu antes que acabe!`,

  "Roteiro para Reels/TikTok": `🎬 ROTEIRO DE VÍDEO CURTO

⏱️ Cena 1 — Gancho (0–3s)  
"Você sabia que [problema comum do público]?"

⏱️ Cena 2 — Desenvolvimento (3–12s)  
"A maioria das pessoas faz isso errado, mas o segredo é [dica prática]."

⏱️ Cena 3 — Autoridade  
"Eu já ajudei [número] pessoas a conseguirem [resultado]."

⏱️ Cena 4 — CTA (12–15s)  
"Salva esse vídeo e me segue para mais dicas como essa!"`,

  "Nome de marca + slogan": `💼 SUGESTÕES PROFISSIONAIS DE MARCA

1. NovaPulse  
Slogan: "A inovação que move resultados"

2. PrimeScale  
Slogan: "Crescimento inteligente para seu negócio"

3. BrightCore  
Slogan: "O centro da sua evolução digital"

4. ClickForge  
Slogan: "Transformando ideias em sucesso"

5. VeloBrand  
Slogan: "Velocidade e impacto para sua marca"`,

  "Currículo profissional": `══════════════════════════════════════════
                CURRÍCULO PROFISSIONAL
══════════════════════════════════════════

[NOME COMPLETO DO CANDIDATO]
[Cargo desejado ou área de atuação]

📍 [Cidade/Estado]  
📞 [Telefone]  
📧 [E-mail profissional]  
🔗 [LinkedIn ou Portfólio]

──────────────────────────────────────────
RESUMO PROFISSIONAL
──────────────────────────────────────────
Profissional com experiência em [área principal], atuando há [X anos]
no desenvolvimento de [principais atividades ou competências].

Possui forte habilidade em:
• [Competência 1]
• [Competência 2]
• [Competência 3]

Destaca-se por [resultado relevante ou conquista],
buscando contribuir diretamente com crescimento,
eficiência e geração de resultados na empresa.

──────────────────────────────────────────
EXPERIÊNCIA PROFISSIONAL
──────────────────────────────────────────

[Nome da Empresa] — [Cargo]
[Período: mês/ano – mês/ano ou Atual]

Principais responsabilidades:
• [Atividade relevante]
• [Resultado alcançado com números]
• [Ferramenta ou método utilizado]

──────────────────────────────────────────
FORMAÇÃO ACADÊMICA
──────────────────────────────────────────

[Curso ou Graduação] — [Instituição]
[Conclusão: ano]

──────────────────────────────────────────
HABILIDADES
──────────────────────────────────────────

• [Ferramenta ou software]
• [Competência técnica]
• [Idioma + nível]

══════════════════════════════════════════
Documento pronto para envio profissional
══════════════════════════════════════════`,

  "Post para Instagram": `📢 TÍTULO CHAMATIVO AQUI

Você sabia que [problema do público]? 🤔

A verdade é que [insight importante que resolve o problema].

Aqui vão 3 passos simples para começar hoje:

1️⃣ [Dica prática número 1]  
2️⃣ [Dica prática número 2]  
3️⃣ [Dica prática número 3]  

💾 Salve este post para não esquecer!  
📲 Compartilhe com alguém que precisa ver isso.

#marketing #negocios #empreender #dicas`,
};
const rendaQuestions = [
  {
    id: "tempo",
    label: "Quanto tempo por dia você pode dedicar?",
    options: ["30 minutos", "1 hora", "2 horas", "Mais de 3 horas"],
  },
  {
    id: "objetivo",
    label: "Qual seu principal objetivo?",
    options: [
      "Renda extra rápida",
      "Ganhar R$1.000/mês",
      "Criar negócio online",
      "Viver da internet",
    ],
  },
  {
    id: "habilidade",
    label: "Você já tem alguma dessas habilidades?",
    options: [
      "Redes sociais",
      "Vendas",
      "Design/edição",
      "Nenhuma ainda",
    ],
  },
  {
    id: "investimento",
    label: "Pode investir algum dinheiro para começar?",
    options: ["Nada", "Até R$50", "Até R$200", "Mais de R$200"],
  },
  {
    id: "estilo",
    label: "O que você prefere fazer?",
    options: [
      "Trabalhar pelo celular",
      "Falar com clientes",
      "Criar conteúdo",
      "Automatizar vendas",
    ],
  },
];

function gerarPlanoRenda(respostas: Record<string, string>) {
  const ideias: string[] = [];

  if (respostas.habilidade === "Redes sociais")
    ideias.push("Gestão de Instagram para negócios locais");

  if (respostas.habilidade === "Vendas")
    ideias.push("Revenda de produtos digitais como afiliado");

  if (respostas.habilidade === "Design/edição")
    ideias.push("Criação de artes e posts para redes sociais");

  if (respostas.habilidade === "Nenhuma ainda")
    ideias.push("Serviços simples usando apenas celular e internet");

  if (respostas.estilo === "Automatizar vendas")
    ideias.push("Mini estrutura automática de vendas com página simples");

  const meta =
    respostas.objetivo === "Renda extra rápida"
      ? "Meta inicial: R$300 em 7 dias"
      : respostas.objetivo === "Ganhar R$1.000/mês"
      ? "Meta inicial: R$1.000 em 30 dias"
      : respostas.objetivo === "Criar negócio online"
      ? "Meta inicial: Primeira venda em 15 dias"
      : "Meta inicial: Escalar para R$3.000/mês";

  return `
PLANO PERSONALIZADO DE RENDA ONLINE
Criado com base no seu perfil e objetivo financeiro.

━━━━━━━━━━━━━━━━━━━━━━
IDEIAS RECOMENDADAS
━━━━━━━━━━━━━━━━━━━━━━
${ideias.slice(0, 3).map((i, idx) => `${idx + 1}. ${i}`).join("\n")}

━━━━━━━━━━━━━━━━━━━━━━
${meta}
━━━━━━━━━━━━━━━━━━━━━━

PASSO A PASSO INICIAL
1. Escolher uma única ideia para focar
2. Criar uma oferta simples com preço acessível
3. Divulgar todos os dias nas redes sociais
4. Conversar com pelo menos 10 pessoas por dia
5. Reinvestir os primeiros ganhos

━━━━━━━━━━━━━━━━━━━━━━
MENSAGEM FINAL
━━━━━━━━━━━━━━━━━━━━━━
Você não precisa ser especialista para começar.
Com consistência diária, sua primeira renda online
pode surgir mais rápido do que imagina.
`;
}


export default function ServiceGenerator() {
  const [serviceType, setServiceType] = useState(serviceTypes[0]);
  const [details, setDetails] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});


 const generate = () => {
  setLoading(true);

  setTimeout(() => {
    if (serviceType === "Plano de renda online personalizado") {
      const plano = gerarPlanoRenda(answers);
      setResult(plano);
    } else {
      setResult(mockResults[serviceType] || "Serviço gerado com sucesso!");
    }

    setLoading(false);
    toast.success("Serviço gerado!");
  }, 1200);
};


  const copyResult = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copiado!");
  };

  // Função para gerar PDF
  const generatePDF = () => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // ===== FUNÇÃO AUXILIAR PARA ESCREVER TEXTO =====
  const writeText = (text: string, y: number, size = 11, bold = false) => {
    doc.setFont("Helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);

    const lines = doc.splitTextToSize(text, pageWidth - 40);
    doc.text(lines, 20, y);

    return y + lines.length * (size * 0.35) + 4;
  };

  // ===== LIMPAR EMOJIS DO TEXTO =====
  const cleanText = result.replace(/[^\x00-\x7F]/g, "");

  let y = 20;

  // ===== NOME GRANDE =====
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(20);
  doc.text(cleanText.split("\n")[2] || "NOME COMPLETO", pageWidth / 2, y, {
    align: "center",
  });

  y += 8;

  // ===== CARGO =====
  doc.setFontSize(12);
  doc.setFont("Helvetica", "normal");
  doc.text(cleanText.split("\n")[3] || "Cargo desejado", pageWidth / 2, y, {
    align: "center",
  });

  y += 10;

  // ===== LINHA DIVISÓRIA =====
  doc.line(20, y, pageWidth - 20, y);
  y += 8;

  // ===== RESTO DO CONTEÚDO =====
  const body = cleanText.split("\n").slice(4).join("\n");
  y = writeText(body, y, 11, false);

  // ===== SALVAR =====
  doc.save("curriculo-profissional.pdf");

  toast.success("PDF profissional gerado!");
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
  <label className="mb-1.5 block text-sm font-medium text-card-foreground">
    Informações para gerar seu plano
  </label>

  {serviceType === "Plano de renda online personalizado" ? (
    <div className="space-y-4">
      {rendaQuestions.map((q) => (
        <div key={q.id}>
          <p className="text-sm font-medium mb-1.5">{q.label}</p>

          <select
            value={answers[q.id] || ""}
            onChange={(e) =>
              setAnswers({ ...answers, [q.id]: e.target.value })
            }
            className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm"
          >
            <option value="">Selecione...</option>

            {q.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  ) : (
    <textarea
      value={details}
      onChange={(e) => setDetails(e.target.value)}
      rows={4}
      placeholder="Ex: Loja de roupas femininas, público 25-35 anos..."
      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm resize-none"
    />
  )}
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
<button onClick={generatePDF} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition">
  <Save className="h-3.5 w-3.5" /> Gerar PDF Profissional
</button>

            </div>
          </div>
         <textarea
  value={result}
  onChange={(e) => setResult(e.target.value)}
  className="w-full min-h-[300px] whitespace-pre-wrap rounded-lg bg-muted/50 p-4 text-sm text-card-foreground leading-relaxed font-mono resize-none outline-none"
/>

        </div>
      )}
    </div>
  );
}
