import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import {
  LayoutDashboard,
  Briefcase,
  Sparkles,
  Users,
  MessageSquare,
  Calculator,
  Trophy,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  ChevronRight,
  Shield,
  HelpCircle,
  Star,
} from "lucide-react";


const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Serviços", path: "/services", icon: Briefcase },
  { title: "Gerador", path: "/generator", icon: Sparkles },
  { title: "Premium Studio", path: "/premium", icon: Star },
  { title: "Clientes", path: "/clients", icon: Users },
  { title: "Scripts", path: "/scripts", icon: MessageSquare },
  { title: "Calculadora", path: "/calculator", icon: Calculator },
  { title: "Conquistas", path: "/achievements", icon: Trophy },
  { title: "Configurações", path: "/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, profile, isAdmin, isAuthenticated, loading, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const currentPage = navItems.find((i) => i.path === location.pathname);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-5">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <span className="text-sm font-bold text-primary-foreground">P</span>
            </div>
            <span className="text-base font-semibold text-sidebar-foreground">PIX Todo Dia</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-sidebar-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                  }`}
                >
                  <item.icon className="shrink-0" style={{ width: 18, height: 18 }} />
                  {item.title}
                </Link>
              );
            })}
          </div>

          {isAdmin && (
            <div className="mt-6 pt-4 border-t border-sidebar-border">
              <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Admin</p>
              <Link
                to="/admin"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  location.pathname.startsWith("/admin")
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <Shield style={{ width: 18, height: 18 }} />
                Painel Admin
              </Link>
            </div>
          )}
        </nav>

        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sidebar-accent text-sm font-semibold text-sidebar-accent-foreground">
              {profile?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="flex-1 truncate">
              <p className="truncate text-sm font-medium text-sidebar-foreground">{profile?.name || "Usuário"}</p>
              <p className="truncate text-xs text-muted-foreground">{user?.email || ""}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-sidebar-accent/50 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-foreground">
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>PIX Todo Dia</span>
              {currentPage && (
                <>
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span className="font-medium text-foreground">{currentPage.title}</span>
                </>
              )}
            </div>
          </div>
         {/* MENU USUÁRIO — PREMIUM REAL */}
<div className="relative">
  <button
    onClick={() => setMenuOpen((v) => !v)}
    className="
      group
      flex items-center gap-3
      rounded-xl
      border border-border
      bg-gradient-to-b from-background to-muted/40
      px-4 py-2
      shadow-sm
      transition-all duration-200
      hover:shadow-lg
      hover:-translate-y-[1px]
      active:translate-y-0
    "
  >
    {/* Avatar */}
    <div className="
      h-9 w-9
      rounded-lg
      bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500
      shadow-md
      flex items-center justify-center
      text-white text-sm font-semibold
    ">
      {profile?.name?.charAt(0)?.toUpperCase() || "U"}
    </div>

    {/* Texto */}
    <span className="
      hidden sm:block
      text-sm font-semibold
      text-foreground
      tracking-tight
    ">
      Pessoa Física
    </span>

    {/* Glow hover */}
    <div className="
      pointer-events-none
      absolute inset-0
      rounded-xl
      opacity-0
      group-hover:opacity-100
      transition
      bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-cyan-500/10
    " />
  </button>

 {menuOpen && (
  <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-border bg-popover shadow-2xl z-50 p-2 backdrop-blur-xl animate-in fade-in zoom-in-95">

    {/* PERFIL */}
    <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent transition text-sm">
      <User className="h-4 w-4 shrink-0" />
      <span className="whitespace-nowrap">Perfil</span>
    </button>

    {/* DARK MODE */}
    <button
      onClick={toggleTheme}
      className="flex w-full items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent transition text-sm"
    >
      <Moon className="h-4 w-4 shrink-0" />
      <span className="whitespace-nowrap">Alternar modo escuro</span>
    </button>

    {/* CONFIGURAÇÕES */}
    <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent transition text-sm">
      <Settings className="h-4 w-4 shrink-0" />
      <span className="whitespace-nowrap">Configurações</span>
    </button>

    {/* AJUDA */}
    <button className="flex w-full items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent transition text-sm">
      <HelpCircle className="h-4 w-4 shrink-0" />
      <span className="whitespace-nowrap">Central de ajuda</span>
    </button>

    <div className="my-2 border-t border-border" />

    {/* SAIR */}
    <button
      onClick={handleLogout}
      className="flex w-full items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-sm text-red-500 transition"
    >
      <LogOut className="h-4 w-4 shrink-0" />
      <span className="whitespace-nowrap">Sair</span>
    </button>
  </div>
)}

</div>


        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  );
}
