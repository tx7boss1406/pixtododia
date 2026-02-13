import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users, Briefcase, Activity, TrendingUp } from "lucide-react";

interface Stats {
  totalUsers: number;
  totalServices: number;
  totalGenerations: number;
  recentGenerations: { service_name: string; created_at: string; user_id: string }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ totalUsers: 0, totalServices: 0, totalGenerations: 0, recentGenerations: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [usersRes, servicesRes, genRes, recentRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("services").select("id", { count: "exact", head: true }),
        supabase.from("generation_history").select("id", { count: "exact", head: true }),
        supabase.from("generation_history").select("service_name, created_at, user_id").order("created_at", { ascending: false }).limit(10),
      ]);
      setStats({
        totalUsers: usersRes.count || 0,
        totalServices: servicesRes.count || 0,
        totalGenerations: genRes.count || 0,
        recentGenerations: recentRes.data || [],
      });
      setLoading(false);
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Total de Usuários", value: stats.totalUsers, icon: Users, color: "text-primary" },
    { label: "Serviços Cadastrados", value: stats.totalServices, icon: Briefcase, color: "text-chart-2" },
    { label: "Gerações Totais", value: stats.totalGenerations, icon: Activity, color: "text-chart-3" },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div><h1 className="text-2xl font-semibold text-foreground">Painel Admin</h1></div>
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-5 animate-pulse"><div className="h-16 bg-muted rounded" /></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Painel Admin</h1>
        <p className="text-sm text-muted-foreground mt-1">Visão geral da plataforma</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">{card.label}</span>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </div>
            <p className="text-3xl font-bold text-card-foreground">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-card-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          Atividade Recente
        </h2>
        {stats.recentGenerations.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhuma atividade ainda.</p>
        ) : (
          <div className="space-y-3">
            {stats.recentGenerations.map((g, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg bg-muted/40 px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-card-foreground">{g.service_name}</p>
                  <p className="text-xs text-muted-foreground">{new Date(g.created_at).toLocaleString("pt-BR")}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
