// src/routes/PublicRoute.tsx

import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface PublicRouteProps {
  children: ReactNode;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}