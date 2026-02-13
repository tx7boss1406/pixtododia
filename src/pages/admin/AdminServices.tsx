import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Copy, Eye, EyeOff } from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  suggested_price: number;
  generator_prompt: string;
  active: boolean;
  sort_order: number;
}

const emptyService: Omit<Service, "id"> = {
  name: "",
  description: "",
  category: "geral",
  suggested_price: 15,
  generator_prompt: "",
  active: true,
  sort_order: 0,
};

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<(Omit<Service, "id"> & { id?: string }) | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*").order("sort_order");
    setServices(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchServices(); }, []);

  const save = async () => {
    if (!editing || !editing.name.trim()) {
      toast.error("Nome é obrigatório");
      return;
    }
    if (editing.id) {
      const { id, ...rest } = editing;
      await supabase.from("services").update(rest).eq("id", id);
      toast.success("Serviço atualizado");
    } else {
      const { id, ...rest } = editing as any;
      await supabase.from("services").insert(rest);
      toast.success("Serviço criado");
    }
    setEditing(null);
    fetchServices();
  };

  const toggleActive = async (s: Service) => {
    await supabase.from("services").update({ active: !s.active }).eq("id", s.id);
    toast.success(s.active ? "Desativado" : "Ativado");
    fetchServices();
  };

  const duplicate = async (s: Service) => {
    const { id, ...rest } = s;
    await supabase.from("services").insert({ ...rest, name: `${s.name} (cópia)` });
    toast.success("Serviço duplicado");
    fetchServices();
  };

  const remove = async (s: Service) => {
    if (!confirm(`Excluir "${s.name}"?`)) return;
    await supabase.from("services").delete().eq("id", s.id);
    toast.success("Serviço excluído");
    fetchServices();
  };

  const inputClass =
    "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Gestão de Serviços</h1>
          <p className="text-sm text-muted-foreground mt-1">{services.length} serviços cadastrados</p>
        </div>
        <button
          onClick={() => setEditing({ ...emptyService })}
          className="flex items-center gap-2 rounded-lg gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
        >
          <Plus className="h-4 w-4" /> Novo serviço
        </button>
      </div>

      {/* Edit modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm" onClick={() => setEditing(null)}>
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-lg mx-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-card-foreground mb-4">{editing.id ? "Editar" : "Novo"} Serviço</h2>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-card-foreground">Nome</label>
                <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-card-foreground">Descrição</label>
                <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={2} className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-card-foreground">Categoria</label>
                  <input value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-card-foreground">Preço sugerido (R$)</label>
                  <input type="number" value={editing.suggested_price} onChange={(e) => setEditing({ ...editing, suggested_price: Number(e.target.value) })} className={inputClass} />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-card-foreground">Prompt do gerador</label>
                <textarea value={editing.generator_prompt} onChange={(e) => setEditing({ ...editing, generator_prompt: e.target.value })} rows={3} className={inputClass} placeholder="Use {details} para inserir os detalhes do cliente" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-card-foreground">Ordem de exibição</label>
                <input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} className={inputClass} />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setEditing(null)} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition">Cancelar</button>
              <button onClick={save} className="rounded-lg gradient-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition">Salvar</button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />)}</div>
      ) : (
        <div className="space-y-3">
          {services.map((s) => (
            <div key={s.id} className={`flex items-center justify-between rounded-xl border border-border bg-card p-4 transition ${!s.active ? "opacity-60" : ""}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold text-card-foreground truncate">{s.name}</h3>
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{s.category}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 truncate">{s.description}</p>
              </div>
              <div className="flex items-center gap-3 ml-4">
                <span className="text-sm font-semibold text-primary">R${s.suggested_price}</span>
                <div className="flex gap-1">
                  <button onClick={() => toggleActive(s)} className="p-1.5 rounded-lg hover:bg-muted transition" title={s.active ? "Desativar" : "Ativar"}>
                    {s.active ? <Eye className="h-4 w-4 text-primary" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                  </button>
                  <button onClick={() => setEditing(s)} className="p-1.5 rounded-lg hover:bg-muted transition" title="Editar">
                    <Pencil className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button onClick={() => duplicate(s)} className="p-1.5 rounded-lg hover:bg-muted transition" title="Duplicar">
                    <Copy className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <button onClick={() => remove(s)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition" title="Excluir">
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {services.length === 0 && (
            <div className="p-8 text-center text-sm text-muted-foreground rounded-xl border border-border bg-card">Nenhum serviço cadastrado.</div>
          )}
        </div>
      )}
    </div>
  );
}
