import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !confirm) {
      setError("Preencha todos os campos.");
      return;
    }
    if (password !== confirm) {
      setError("As senhas não coincidem.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    setSubmitting(true);
    const result = await register(name, email, password);
    setSubmitting(false);
    if (result.error) {
      setError(result.error);
    } else {
      toast.success("Conta criada! Verifique seu e-mail para confirmar.");
      navigate("/login");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="flex items-center gap-2.5 mb-10 justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
            <span className="text-sm font-bold text-primary-foreground">P</span>
          </div>
          <span className="text-lg font-semibold text-foreground">PIX Todo Dia</span>
        </div>

        <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
          <h1 className="text-xl font-semibold text-card-foreground mb-1">Criar sua conta</h1>
          <p className="text-sm text-muted-foreground mb-6">Comece a vender serviços digitais agora</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
            )}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-card-foreground">Nome</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome" className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-card-foreground">E-mail</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-card-foreground">Senha</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mín. 6 caracteres"
                  className={`${inputClass} pr-10`}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-card-foreground">Confirmar senha</label>
              <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Repita a senha" className={inputClass} />
            </div>
            <button type="submit" disabled={submitting} className="w-full rounded-lg gradient-primary py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50">
              {submitting ? "Criando..." : "Criar conta"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Já tem conta?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">Entrar</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
