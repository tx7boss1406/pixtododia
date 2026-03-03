import { useState } from "react";
import { X } from "lucide-react";

interface Props {
  totalFaturado: number;
}

export default function JornadaConquistas({ totalFaturado }: Props) {
  const [open, setOpen] = useState(false);

  const niveis = [
    { nome: "Explorador", meta: 1 },
    { nome: "Avançado", meta: 100 },
    { nome: "Expert", meta: 1000 },
    { nome: "Ouro", meta: 50000 },
  ];

  const nivelAtual =
    niveis.filter((n) => totalFaturado >= n.meta).slice(-1)[0] ||
    niveis[0];

  const proximoNivel =
    niveis.find((n) => n.meta > totalFaturado) || niveis[niveis.length - 1];

  const progresso =
    (totalFaturado / proximoNivel.meta) * 100;

  return (
    <>
      {/* CARD RESUMIDO */}
      <div className="rounded-2xl bg-card border border-border p-6 hover:bg-muted/30 transition-all">

        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-lg">
            Jornada de conquistas
          </h2>

          <button
            onClick={() => setOpen(true)}
            className="text-sm text-blue-500 hover:underline"
          >
            Saiba mais →
          </button>
        </div>

        <div className="space-y-2 text-sm">
          <p className="text-muted-foreground">
            Você é <span className="text-foreground font-medium">{nivelAtual.nome}</span>
          </p>

          <p className="text-muted-foreground">
            Próximo nível <span className="text-foreground font-medium">{proximoNivel.nome}</span>
          </p>
        </div>

      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

          <div className="w-[900px] max-h-[85vh] overflow-y-auto rounded-3xl bg-[#0f141c] border border-border p-8 relative shadow-2xl">

            <button
              onClick={() => setOpen(false)}
              className="absolute right-6 top-6 text-muted-foreground hover:text-white"
            >
              <X />
            </button>

            <h1 className="text-2xl font-semibold mb-2">
              Jornada de conquistas
            </h1>

            <p className="text-muted-foreground mb-6">
              Cada etapa é marcada por uma nova meta de faturamento.
            </p>

            {/* PROGRESSO */}
            <div className="mb-8">
              <p className="text-sm mb-2">
                Seu nível: <strong>{nivelAtual.nome}</strong>
              </p>

              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${Math.min(progresso, 100)}%` }}
                />
              </div>
            </div>

            {/* LISTA DE NÍVEIS */}
            <div className="grid grid-cols-2 gap-6">
              {niveis.map((nivel) => (
                <div
                  key={nivel.nome}
                  className="rounded-2xl border border-border p-6 bg-card"
                >
                  <h3 className="font-semibold mb-2">
                    {nivel.nome}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Meta: R$ {nivel.meta.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}
    </>
  );
}