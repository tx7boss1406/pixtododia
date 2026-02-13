import { useEffect } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/hooks/useTheme";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  MessageSquare,
  ArrowLeft,
  Sun,
  Moon,
  Shield,
} from "lucide-react";

const adminNav = [
  { title: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { title: "Usuários", path: "/admin/users", icon: Users },
  { title: "Serviços", path: "/admin/services", icon: Briefcase },
  { title: "Scripts", path: "/admin/scripts", icon: MessageSquare },
];

export default function AdminLayout() {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && (!isAuthenticated || !isAdmin)) {
      navigate("/dashboard");
    }
  }, [loading, isAuthenticated, isAdmin, navigate]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Admin</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {adminNav.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                (item.path === "/admin" ? location.pathname === "/admin" : location.pathname.startsWith(item.path))
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{item.title}</span>
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-background text-foreground hover:bg-muted transition ml-2"
          >
            {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-5xl p-4 lg:p-6">
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
