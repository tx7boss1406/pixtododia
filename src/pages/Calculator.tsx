import { useState } from "react";
import { DollarSign, TrendingUp, Calendar, Target } from "lucide-react";

export default function Calculator() {
  const [price, setPrice] = useState(25);
  const [salesPerDay, setSalesPerDay] = useState(3);

  const daily = price * salesPerDay;
  const weekly = daily * 7;
  const monthly = daily * 30;
  const yearly = daily * 365;

  const results = [
    { label: "Ganho diário", value: daily, icon: DollarSign },
    { label: "Ganho semanal", value: weekly, icon: TrendingUp },
    { label: "Ganho mensal", value: monthly, icon: Calendar },
    { label: "Projeção anual", value: yearly, icon: Target },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Calculadora de Ganhos</h1>
        <p className="text-sm text-muted-foreground mt-1">Simule seus ganhos com base no preço e volume de vendas</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-6">
        <div>
          <label className="mb-2 flex items-center justify-between text-sm font-medium text-card-foreground">
            Preço por serviço
            <span className="text-lg font-bold text-primary">R$ {price},00</span>
          </label>
          <input
            type="range"
            min={5}
            max={200}
            step={5}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>R$ 5</span>
            <span>R$ 200</span>
          </div>
        </div>

        <div>
          <label className="mb-2 flex items-center justify-between text-sm font-medium text-card-foreground">
            Vendas por dia
            <span className="text-lg font-bold text-primary">{salesPerDay}</span>
          </label>
          <input
            type="range"
            min={1}
            max={20}
            step={1}
            value={salesPerDay}
            onChange={(e) => setSalesPerDay(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1 venda</span>
            <span>20 vendas</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {results.map((r) => (
          <div key={r.label} className="rounded-xl border border-border bg-card p-5 animate-slide-up">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <r.icon className="h-4 w-4 text-accent-foreground" />
              </div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{r.label}</span>
            </div>
            <p className="text-2xl font-bold text-card-foreground">
              R$ {r.value.toLocaleString("pt-BR")},00
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-primary/20 bg-accent/30 p-5">
        <p className="text-sm text-accent-foreground">
          💡 <span className="font-semibold">Dica:</span> Comece com 2-3 vendas por dia. Conforme ganhar experiência, aumente o preço e o volume gradualmente.
        </p>
      </div>
    </div>
  );
}
