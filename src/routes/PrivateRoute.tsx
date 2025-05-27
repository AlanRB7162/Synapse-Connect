//src/routes/PrivateRoute.tsx

import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}