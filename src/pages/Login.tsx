import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import loginHero from "@/assets/login-hero.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);
    if (result.error) {
      setError(result.error === "Invalid login credentials" ? "E-mail ou senha incorretos." : result.error);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-16 xl:px-24 bg-background">
        <div className="mx-auto w-full max-w-sm animate-fade-in">
          <div className="flex items-center gap-2.5 mb-10">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <span className="text-sm font-bold text-primary-foreground">P</span>
            </div>
            <span className="text-lg font-semibold text-foreground">PIX Todo Dia</span>
          </div>

          <h1 className="text-2xl font-semibold text-foreground mb-1.5">Bem-vindo de volta</h1>
          <p className="text-sm text-muted-foreground mb-8">Entre na sua conta para continuar</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>
            )}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">Senha</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-input bg-background px-4 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg gradient-primary py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? "Entrando..." : "Entrar"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Não tem conta?{" "}
            <Link to="/register" className="font-medium text-primary hover:underline">
              Criar conta
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex lg:flex-1 items-center justify-center gradient-hero relative overflow-hidden">
        <img
          src={loginHero}
          alt="Dashboard preview"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
        />
        <div className="relative z-10 max-w-md text-center px-8">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Comece a vender serviços digitais <span className="text-gradient">hoje mesmo</span>
          </h2>
          <p className="text-sm text-primary-foreground/70 leading-relaxed">
            Gere serviços prontos, copie scripts de venda e comece a faturar com PIX. Tudo em uma plataforma profissional.
          </p>
        </div>
      </div>
    </div>
  );
}
