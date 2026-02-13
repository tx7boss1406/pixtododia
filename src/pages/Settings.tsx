import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/useTheme";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Sun, Moon, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function SettingsPage() {
  const { user, profile, updateProfile, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [name, setName] = useState(profile?.name || "");
  const [newPw, setNewPw] = useState("");
  const [saving, setSaving] = useState(false);

  const inputClass =
    "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition";

  const saveName = async () => {
    if (name.trim()) {
      setSaving(true);
      await updateProfile({ name: name.trim() });
      setSaving(false);
      toast.success("Nome atualizado!");
    }
  };

  const changePassword = async () => {
    if (!newPw || newPw.length < 6) {
      toast.error("A nova senha deve ter pelo menos 6 caracteres.");
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: newPw });
    if (error) toast.error(error.message);
    else {
      toast.success("Senha alterada com sucesso!");
      setNewPw("");
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Configurações</h1>
        <p className="text-sm text-muted-foreground mt-1">Gerencie sua conta e preferências</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <h2 className="text-sm font-semibold text-card-foreground">Perfil</h2>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-card-foreground">Nome</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-card-foreground">E-mail</label>
          <input type="email" value={user?.email || ""} disabled className={`${inputClass} opacity-60 cursor-not-allowed`} />
        </div>
        <button onClick={saveName} disabled={saving} className="rounded-lg gradient-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition disabled:opacity-50">
          {saving ? "Salvando..." : "Salvar alterações"}
        </button>
      </div>

      <div className="rounded-xl border border-border bg-card p-5 space-y-4">
        <h2 className="text-sm font-semibold text-card-foreground">Alterar senha</h2>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-card-foreground">Nova senha</label>
          <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="Mín. 6 caracteres" className={inputClass} />
        </div>
        <button onClick={changePassword} className="rounded-lg border border-border bg-background px-5 py-2 text-sm font-medium text-foreground hover:bg-muted transition">
          Alterar senha
        </button>
      </div>

      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="text-sm font-semibold text-card-foreground mb-4">Aparência</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-card-foreground">Tema {theme === "dark" ? "escuro" : "claro"}</p>
            <p className="text-xs text-muted-foreground">Alterne entre modo claro e escuro</p>
          </div>
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-background text-foreground hover:bg-muted transition"
          >
            {theme === "dark" ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-destructive/5 py-3 text-sm font-medium text-destructive hover:bg-destructive/10 transition"
      >
        <LogOut className="h-4 w-4" /> Sair da conta
      </button>
    </div>
  );
}
