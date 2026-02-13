import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Search, Ban, CheckCircle, Trash2 } from "lucide-react";

interface UserProfile {
  id: string;
  user_id: string;
  name: string;
  level: string;
  progress: number;
  status: string;
  active_services: string[] | null;
  created_at: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    setUsers(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchUsers(); }, []);

  const toggleStatus = async (u: UserProfile) => {
    const newStatus = u.status === "active" ? "blocked" : "active";
    await supabase.from("profiles").update({ status: newStatus }).eq("id", u.id);
    toast.success(newStatus === "active" ? "Usuário desbloqueado" : "Usuário bloqueado");
    fetchUsers();
  };

  const updateLevel = async (u: UserProfile, level: string) => {
    await supabase.from("profiles").update({ level }).eq("id", u.id);
    toast.success("Nível atualizado");
    fetchUsers();
  };

  const deleteUser = async (u: UserProfile) => {
    if (!confirm(`Remover perfil de ${u.name || "este usuário"}?`)) return;
    await supabase.from("profiles").delete().eq("id", u.id);
    toast.success("Perfil removido");
    fetchUsers();
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.user_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Gestão de Usuários</h1>
        <p className="text-sm text-muted-foreground mt-1">{users.length} usuários cadastrados</p>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nome..."
          className="w-full rounded-lg border border-input bg-background pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30"
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />)}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Nome</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Nível</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Progresso</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase">Cadastro</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-card-foreground">{u.name || "—"}</td>
                    <td className="px-4 py-3">
                      <select
                        value={u.level}
                        onChange={(e) => updateLevel(u, e.target.value)}
                        className="rounded border border-input bg-background px-2 py-1 text-xs text-foreground"
                      >
                        <option value="iniciante">Iniciante</option>
                        <option value="ativo">Ativo</option>
                        <option value="consistente">Consistente</option>
                        <option value="avançado">Avançado</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 rounded-full bg-muted">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${u.progress}%` }} />
                        </div>
                        <span className="text-xs text-muted-foreground">{u.progress}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                        u.status === "active" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                      }`}>
                        {u.status === "active" ? "Ativo" : "Bloqueado"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">
                      {new Date(u.created_at).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => toggleStatus(u)} className="p-1.5 rounded-lg hover:bg-muted transition" title={u.status === "active" ? "Bloquear" : "Desbloquear"}>
                          {u.status === "active" ? <Ban className="h-4 w-4 text-muted-foreground" /> : <CheckCircle className="h-4 w-4 text-primary" />}
                        </button>
                        <button onClick={() => deleteUser(u)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition" title="Excluir">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="p-8 text-center text-sm text-muted-foreground">Nenhum usuário encontrado.</div>
          )}
        </div>
      )}
    </div>
  );
}
