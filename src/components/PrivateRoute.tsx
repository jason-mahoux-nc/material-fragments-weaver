import { Navigate, useLocation } from "react-router-dom";
import { getAuthService } from "@/auth/auth.service";
import { useEffect, useState } from "react";

interface PrivateRouteProps {
  children: JSX.Element;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      if (typeof getAuthService().ready === "function") {
        await getAuthService().ready!();
      }
      setIsAuth(getAuthService().isAuthenticated());
      setLoading(false);
    }
    checkAuth();
  }, [location]);

  if (loading) {
    return null;
  }

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
