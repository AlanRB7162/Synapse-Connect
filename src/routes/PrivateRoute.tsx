//src/routes/PrivateRoute.tsx

import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Flex } from "@chakra-ui/react";

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <Flex>Carregando...</Flex> // ou um spinner do Chakra UI
  }

  if (!user) {
    return <Navigate to="/entrar" />;
  }

  return <>{children}</>;
}