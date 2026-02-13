import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Index() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(isAuthenticated ? "/dashboard" : "/login", { replace: true });
  }, [isAuthenticated, navigate]);

  return null;
}
