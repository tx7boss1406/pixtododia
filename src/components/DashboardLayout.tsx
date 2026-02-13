import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
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
} from "lucide-react";

const navItems = [
  { title: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { title: "Serviços", path: "/services", icon: Briefcase },
  { title: "Gerador", path: "/generator", icon: Sparkles },
  { title: "Clientes", path: "/clients", icon: Users },
  { title: "Scripts", path: "/scripts", icon: MessageSquare },
  { title: "Calculadora", path: "/calculator", icon: Calculator },
  { title: "Conquistas", path: "/achievements", icon: Trophy },
  { title: "Configurações", path: "/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-background text-foreground transition-colors hover:bg-muted"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  );
}
