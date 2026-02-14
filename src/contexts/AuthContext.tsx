import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupaUser } from "@supabase/supabase-js";

interface Profile {
  name: string;
  level: string;
  progress: number;
  active_services: string[] | null;
  status: string;
}

interface AuthContextType {
  user: SupaUser | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SupaUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("name, level, progress, active_services, status")
      .eq("user_id", userId)
      .single();
    if (data) setProfile(data);
  };

  const checkAdmin = async (userId: string) => {
    const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
    setIsAdmin(!!data);
  };

  useEffect(() => {
    let mounted = true;

    const safeLoadUser = async (sessionUser: SupaUser | null) => {
      if (!mounted) return;

      setUser(sessionUser);

      if (!sessionUser) {
        setProfile(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        await Promise.race([
          (async () => {
            await fetchProfile(sessionUser.id);
            await checkAdmin(sessionUser.id);
          })(),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("timeout")), 4000)
          ),
        ]);
      } catch (err) {
        console.error("Erro ao carregar perfil:", err);
        setProfile(null);
        setIsAdmin(false);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    // 🔹 Correção definitiva para evitar sessão inválida
    const loadSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const session = data.session;
      const u = session?.user ?? null;
      safeLoadUser(u);
    };

    loadSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      safeLoadUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return {};
  };

  const register = async (name: string, email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name }, emailRedirectTo: window.location.origin },
    });
    if (error) return { error: error.message };
    return {};
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setIsAdmin(false);
  };

  const updateProfile = async (data: Partial<Profile>) => {
    if (!user) return;
    await supabase.from("profiles").update(data).eq("user_id", user.id);
    setProfile((p) => (p ? { ...p, ...data } : null));
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  return (
    <AuthContext.Provider
      value={{ user, profile, isAuthenticated: !!user, isAdmin, loading, login, register, logout, updateProfile, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
