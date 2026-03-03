import { useAuth } from "@/contexts/AuthContext";
import JornadaConquistas from "@/components/JornadaConquistas";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  DollarSign,
  TrendingUp,
  Briefcase,
  Target,
  CheckCircle2,
  Circle,
  Moon,
  User,
  LogOut,
  Settings,
  Wallet,
  ShoppingCart,
  Trophy,
  Eye,
  ArrowUpRight,
} from "lucide-react";

const currency = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const todayFull = new Date().toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

const greetingByHour = () => {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
};


const checklist = [
  { text: "Ativar primeiro serviço", done: true },
  { text: "Copiar anúncio de venda", done: true },
  { text: "Fazer primeira venda", done: false },
  { text: "Alcançar R$ 100 no dia", done: false },
];


export default function Dashboard() {
  const { profile } = useAuth();

  const [saldoDisponivel, setSaldoDisponivel] = useState(0);
const [vendasAprovadas, setVendasAprovadas] = useState(0);
const [ticketMedio, setTicketMedio] = useState(0);
const [chartData, setChartData] = useState([
  { day: "Dom", ganhos: 0 },
  { day: "Seg", ganhos: 0 },
  { day: "Ter", ganhos: 0 },
  { day: "Qua", ganhos: 0 },
  { day: "Qui", ganhos: 0 },
  { day: "Sex", ganhos: 0 },
  { day: "Sáb", ganhos: 0 },
]);
const [menuOpen, setMenuOpen] = useState(false);

const [recentActivities, setRecentActivities] = useState<
  { id: string; amount: number; status: string; created_at: string }[]
>([]);
const [ganhoHoje, setGanhoHoje] = useState(0);
const metaDiaria = 200; // depois podemos puxar isso do banco

useEffect(() => {
  let userId: string | null = null;

  const fetchDashboard = async () => {
    const { data: userData } = await supabase.auth.getUser();
    userId = userData.user?.id ?? null;

    if (!userId) return;

    // 🔹 Buscar todas as transações aprovadas
const { data, error } = await supabase
  .from("transactions")
  .select("id, amount, status, created_at")
  .eq("user_id", userId);

    if (error || !data) return;
// 🔹 GANHO DE HOJE
const hoje = new Date().toDateString();

const totalHoje = data
  .filter((t) => {
    const dataTransacao = new Date(t.created_at).toDateString();
    return dataTransacao === hoje && t.status === "approved";
  })
  .reduce((sum, t) => sum + Number(t.amount), 0);

setGanhoHoje(totalHoje);

    // 🔹 SALDO TOTAL
    const total = data.reduce((sum, t) => sum + Number(t.amount), 0);
    setSaldoDisponivel(total);

    // 🔹 VENDAS APROVADAS
    setVendasAprovadas(data.length);

    // 🔹 TICKET MÉDIO
    const ticket = data.length > 0 ? total / data.length : 0;
    setTicketMedio(ticket);

    // 🔹 GRÁFICO DA SEMANA
    const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const ganhosPorDia = [0, 0, 0, 0, 0, 0, 0];

    data.forEach((t) => {
      const d = new Date(t.created_at);
      const day = d.getDay();
      ganhosPorDia[day] += Number(t.amount);
    });

   setChartData(
  weekDays.map((day, i) => ({
    day,
    ganhos: ganhosPorDia[i],
  }))
);

// 🔹 ATIVIDADES RECENTES (últimas 5)
const latest = [...data]
  .sort(
    (a, b) =>
      new Date(b.created_at).getTime() -
      new Date(a.created_at).getTime()
  )
  .slice(0, 5);

setRecentActivities(latest);

};


  fetchDashboard();

  // 🔴 REALTIME
  const channel = supabase
    .channel("transactions-realtime")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "transactions" },
      fetchDashboard
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);



  const stats = [
  {
    label: "Saldo disponível",
    value: currency(saldoDisponivel),
    icon: Wallet,
    trend: `Pendente: ${currency(0)}`,
  },
  {
    label: "Vendas aprovadas",
    value: String(vendasAprovadas),
    icon: ShoppingCart,
    trend: `Ticket médio: ${currency(ticketMedio)}`,
  },
  { label: "Serviços ativados", value: "4", icon: Briefcase, trend: "" },
];


  // Hora atual
  const hour = new Date().getHours();

  // Saudação automática
  const greeting =
    hour < 12
      ? "Bom dia"
      : hour < 18
      ? "Boa tarde"
      : "Boa noite";

  // Data bonita em português
  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

const porcentagemMeta = Math.min(
  (ganhoHoje / metaDiaria) * 100,
  100
);

  return (
<div className="min-h-screen bg-background text-foreground px-10 py-8 space-y-12">
     {/* HEADER PREMIUM */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="h-14 w-14 rounded-2xl bg-[#1f2430] flex items-center justify-center text-white text-xl font-bold shadow-lg">
            {profile?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
<h1 className="text-3xl font-semibold tracking-tight">  {greeting}, {profile?.name || "chefe"}👋
</h1>

<p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground capitalize">
  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
  {today}
</p>

     <p className="text-muted-foreground">
          Pequenas ações, grandes resultados
        </p>
      </div>
        </div>
        </div>

{/* TOPO DASHBOARD PROFISSIONAL */}
<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

  {/* RECEITA TOTAL (2 COLUNAS) */}
  <div className="xl:col-span-2 rounded-2xl bg-card border border-border p-8 hover:bg-muted/30 transition-colors duration-200">

    <div className="flex items-start justify-between">

      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          Receita total
        </p>

        <h2 className="text-4xl font-semibold mt-3 tracking-tight">
          {currency(saldoDisponivel)}
        </h2>

        <div className="mt-4 flex items-center gap-2 text-sm text-emerald-500">
          <ArrowUpRight className="h-4 w-4" />
          +12% este mês
        </div>
      </div>

      <div className="h-14 w-14 rounded-xl bg-muted flex items-center justify-center">
        <Wallet className="h-6 w-6 text-muted-foreground" />
      </div>

    </div>

  </div>

 {/* META DO DIA DINÂMICA */}
<div className="rounded-2xl bg-card border border-border p-8 hover:bg-muted/30 transition-colors duration-200">

  <p className="text-xs uppercase tracking-wider text-muted-foreground">
    Meta diária
  </p>

  <h3 className="text-3xl font-semibold mt-3">
    {porcentagemMeta.toFixed(0)}%
  </h3>

  <div className="mt-4 w-full h-2 bg-muted rounded-full overflow-hidden">
    <div
      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
      style={{ width: `${porcentagemMeta}%` }}
    />
  </div>

  <p className="text-sm text-muted-foreground mt-3">
    {currency(ganhoHoje)} de {currency(metaDiaria)}
  </p>

</div>

</div>

  {/* CARDS SECUNDÁRIOS */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
  {stats.slice(1).map((s) => (
    <div
      key={s.label}
      className="rounded-2xl bg-card border border-border p-6 min-h-[140px] hover:bg-muted/40 transition-colors duration-200"
    >
      <div className="flex flex-col h-full justify-between">
        
        {/* TOPO */}
        <div className="flex items-start justify-between">
          <span className="text-xs uppercase tracking-wide text-muted-foreground">
            {s.label}
          </span>

          <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
            <s.icon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* VALOR */}
        <div className="mt-6">
          <p className="text-2xl font-semibold tracking-tight">
            {s.value}
          </p>

          {s.trend && (
            <p className="text-sm text-muted-foreground mt-2">
              {s.trend}
            </p>
          )}
        </div>

      </div>
    </div>
  ))}
</div>

      {/* GRID PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* GRÁFICO */}
<div className="lg:col-span-2 rounded-2xl bg-card border border-border p-8">   
         <h2 className="font-semibold mb-6 text-lg">Evolução de ganhos</h2>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
             <AreaChart data={chartData}>
  <defs>
    <linearGradient id="ganhos" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
      <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
    </linearGradient>
  </defs>

  <CartesianGrid stroke="hsl(var(--border))" />
  <XAxis stroke="hsl(var(--muted-foreground))" />
<YAxis stroke="hsl(var(--muted-foreground))" />
  <Tooltip
    contentStyle={{
     backgroundColor: "hsl(var(--card))",
border: "1px solid hsl(var(--border))",
color: "hsl(var(--foreground))"
    }}
  />

  <Area
    type="monotone"
    dataKey="ganhos"
    stroke="#3b82f6"
    strokeWidth={2.5}
    fill="url(#ganhos)"
    dot={false}
  />
</AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ATIVIDADE & NÍVEL PREMIUM */}
<div className="rounded-2xl bg-card border border-border p-8 relative overflow-hidden">

  {/* Gradiente sutil diferente */}
  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />

  <div className="relative space-y-8">

    {/* Título */}
    <div>
      <h2 className="font-semibold text-lg">
        Atividade & Nível
      </h2>
      <p className="text-sm text-muted-foreground mt-1">
        Suas últimas movimentações e progresso atual
      </p>
    </div>

    {/* ATIVIDADES RECENTES */}
    <div className="space-y-4">
      {recentActivities.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Nenhuma atividade recente.
        </p>
      ) : (
        recentActivities.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-xl bg-muted/40 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wallet className="h-4 w-4 text-primary" />
              </div>

              <div>
                <p className="text-sm font-medium">
                  {currency(Number(item.amount))}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(item.created_at).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </div>

            <span
              className={`text-xs px-2 py-1 rounded-full ${
                item.status === "approved"
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-yellow-500/10 text-yellow-500"
              }`}
            >
              {item.status === "approved" ? "Aprovado" : "Pendente"}
            </span>
          </div>
        ))
      )}
    </div>

    {/* PROGRESSO DE NÍVEL */}
    <div className="pt-6 border-t border-border space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          Nível Atual
        </span>
        <span className="text-sm text-muted-foreground">
          {vendasAprovadas} vendas
        </span>
      </div>

      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{
            width: `${Math.min((vendasAprovadas / 10) * 100, 100)}%`,
          }}
        />
      </div>

      <p className="text-xs text-muted-foreground">
        Próximo nível em 10 vendas
      </p>
    </div>

  </div>
</div>
      </div>
    </div>
  );
}
