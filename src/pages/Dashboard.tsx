import { useAuth } from "@/contexts/AuthContext";
import { DollarSign, TrendingUp, Briefcase, Target, CheckCircle2, Circle } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const chartData = [
  { day: "Seg", ganhos: 45 },
  { day: "Ter", ganhos: 72 },
  { day: "Qua", ganhos: 58 },
  { day: "Qui", ganhos: 95 },
  { day: "Sex", ganhos: 130 },
  { day: "Sáb", ganhos: 85 },
  { day: "Dom", ganhos: 110 },
];

const stats = [
  { label: "Ganhos hoje", value: "R$ 130,00", icon: DollarSign, trend: "+23%" },
  { label: "Total acumulado", value: "R$ 595,00", icon: TrendingUp, trend: "+12%" },
  { label: "Serviços ativados", value: "4", icon: Briefcase, trend: "" },
  { label: "Meta diária", value: "65%", icon: Target, trend: "R$ 200" },
];

const checklist = [
  { text: "Ativar primeiro serviço", done: true },
  { text: "Copiar anúncio de venda", done: true },
  { text: "Fazer primeira venda", done: false },
  { text: "Alcançar R$ 100 no dia", done: false },
];

export default function Dashboard() {
  const { profile } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Olá, {profile?.name || "Usuário"} 👋
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Aqui está o resumo do seu dia</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5 animate-slide-up">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{s.label}</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
                <s.icon className="h-4 w-4 text-accent-foreground" />
              </div>
            </div>
            <p className="text-2xl font-bold text-card-foreground">{s.value}</p>
            {s.trend && <span className="mt-1 inline-block text-xs font-medium text-primary">{s.trend}</span>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Chart */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-card-foreground mb-4">Evolução de ganhos</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorGanhos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(152, 76%, 36%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(152, 76%, 36%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" strokeOpacity={0.3} />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 46%)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222, 35%, 10%)",
                    border: "none",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  formatter={(value: number) => [`R$ ${value}`, "Ganhos"]}
                />
                <Area type="monotone" dataKey="ganhos" stroke="hsl(152, 76%, 36%)" strokeWidth={2} fill="url(#colorGanhos)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Checklist */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold text-card-foreground mb-4">Checklist inicial</h2>
          <div className="space-y-3">
            {checklist.map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                {item.done ? (
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground/40 shrink-0" />
                )}
                <span className={`text-sm ${item.done ? "text-muted-foreground line-through" : "text-card-foreground"}`}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-lg bg-accent/50 p-3">
            <p className="text-xs text-muted-foreground">
              Complete todas as tarefas para desbloquear o nível <span className="font-semibold text-primary">Ativo</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
