import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Crown } from "lucide-react";

interface Script {
  id: string;
  category: string;
  title: string;
  content: string;
  is_premium: boolean;
  sort_order: number;
}

const categories = ["abordagem", "objecao", "followup", "fechamento"];

export default function AdminScripts() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [editing, setEditing] = useState<(Omit<Script, "id"> & { id?: string }) | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchScripts = async () => {
    const { data } = await supabase.from("sales_scripts").select("*").order("sort_order");
    setScripts(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchScripts(); }, []);

  const save = async () => {
    if (!editing || !editing.title.trim()) {
      toast.error("Título é obrigatório");
      return;
    }
    if (editing.id) {
      const { id, ...rest } = editing;
      await supabase.from("sales_scripts").update(rest).eq("id", id);
      toast.success("Script atualizado");
    } else {
      const { id, ...rest } = editing as any;
      await supabase.from("sales_scripts").insert(rest);
      toast.success("Script criado");
    }
    setEditing(null);
    fetchScripts();
  };

  const remove = async (s: Script) => {
    if (!confirm(`Excluir "${s.title}"?`)) return;
    await supabase.from("sales_scripts").delete().eq("id", s.id);
    toast.success("Script excluído");
    fetchScripts();
  };

  const inputClass =
    "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30";

  const categoryLabels: Record<string, string> = {
    abordagem: "Abordagem",
    objecao: "Objeção",
    followup: "Follow-up",
    fechamento: "Fechamento",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Gestão de Scripts</h1>
          <p className="text-sm text-muted-foreground mt-1">{scripts.length} scripts cadastrados</p>
        </div>
        <button
          onClick={() => setEditing({ category: "abordagem", title: "", content: "", is_premium: false, sort_order: 0 })}
          className="flex items-center gap-2 rounded-lg gradient-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition"
        >
          <Plus className="h-4 w-4" /> Novo script
        </button>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm" onClick={() => setEditing(null)}>
          <div className="w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-lg mx-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-card-foreground mb-4">{editing.id ? "Editar" : "Novo"} Script</h2>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-xs font-medium text-card-foreground">Título</label>
                <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className={inputClass} />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-card-foreground">Categoria</label>
                <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className={inputClass}>
                  {categories.map((c) => <option key={c} value={c}>{categoryLabels[c] || c}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-card-foreground">Conteúdo</label>
                <textarea value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} rows={5} className={inputClass} />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={editing.is_premium} onChange={(e) => setEditing({ ...editing, is_premium: e.target.checked })} id="premium" className="rounded" />
                <label htmlFor="premium" className="text-sm text-card-foreground flex items-center gap-1">
                  <Crown className="h-3.5 w-3.5 text-yellow-500" /> Premium
                </label>
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-card-foreground">Ordem</label>
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
          {categories.map((cat) => {
            const catScripts = scripts.filter((s) => s.category === cat);
            if (catScripts.length === 0) return null;
            return (
              <div key={cat}>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">{categoryLabels[cat]}</h3>
                <div className="space-y-2">
                  {catScripts.map((s) => (
                    <div key={s.id} className="flex items-center justify-between rounded-xl border border-border bg-card p-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-card-foreground truncate">{s.title}</h4>
                          {s.is_premium && <Crown className="h-3.5 w-3.5 text-yellow-500 shrink-0" />}
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{s.content.substring(0, 80)}...</p>
                      </div>
                      <div className="flex gap-1 ml-4">
                        <button onClick={() => setEditing(s)} className="p-1.5 rounded-lg hover:bg-muted transition"><Pencil className="h-4 w-4 text-muted-foreground" /></button>
                        <button onClick={() => remove(s)} className="p-1.5 rounded-lg hover:bg-destructive/10 transition"><Trash2 className="h-4 w-4 text-destructive" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
