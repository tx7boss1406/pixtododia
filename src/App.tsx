import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import ServiceGenerator from "./pages/ServiceGenerator";
import Clients from "./pages/Clients";
import Scripts from "./pages/Scripts";
import Calculator from "./pages/Calculator";
import Achievements from "./pages/Achievements";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminServices from "./pages/admin/AdminServices";
import AdminScripts from "./pages/admin/AdminScripts";

const queryClient = new QueryClient();

function DashboardRoute({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<DashboardRoute><Dashboard /></DashboardRoute>} />
            <Route path="/services" element={<DashboardRoute><Services /></DashboardRoute>} />
            <Route path="/generator" element={<DashboardRoute><ServiceGenerator /></DashboardRoute>} />
            <Route path="/clients" element={<DashboardRoute><Clients /></DashboardRoute>} />
            <Route path="/scripts" element={<DashboardRoute><Scripts /></DashboardRoute>} />
            <Route path="/calculator" element={<DashboardRoute><Calculator /></DashboardRoute>} />
            <Route path="/achievements" element={<DashboardRoute><Achievements /></DashboardRoute>} />
            <Route path="/settings" element={<DashboardRoute><SettingsPage /></DashboardRoute>} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="scripts" element={<AdminScripts />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
