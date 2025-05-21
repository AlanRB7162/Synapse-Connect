// src/contexts/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

// Tipo dos dados do usuário (adicione mais campos conforme necessário)
type User = {
  name: string;
  email: string;
  picture?: string;
};

// Tipo do contexto de autenticação
type AuthContextType = {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
};

// Criar o contexto com tipo genérico
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider com tipagem
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Erro ao fazer parse do user no localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook customizado com verificação de contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
