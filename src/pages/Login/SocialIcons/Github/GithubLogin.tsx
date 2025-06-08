//src/pages/Login/SocialIcons/GitHub/GithubLogin.tsx

import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Flex, Spinner, Text } from "@chakra-ui/react";

type JwtPayload = {
  id: number;
  username: string;
  nome: string;
  avatar: string | null;
  email: string | null;
  provider: string;
  providerId: string;
  exp: number;
};

export default function GitHubLogin(){
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  useEffect(() => {
    const handleGithubLogin = async () => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get("token");

      if(!token){
        console.error("Token não encontrado na URL");
        navigate("/entrar", {
          state: {
            toast: {
              title: "Erro no login",
              description: "Não foi possível concluir o login com o GitHub. Tente novamente.",
              type: "error"
            }
          }
        })
        return
      }

      try{
        const decoded = jwtDecode<JwtPayload>(token);

        if(decoded.exp * 1000 < Date.now()){
          navigate("/entrar", {
            state: {
              toast: {
                title: "Sessão expirada",
                description: "O token de login expirou. Faça login novamente.",
                type: "error"
              }
            }
          });
          return;
        }

        if(!decoded.id || !decoded.providerId || !decoded.email){
          navigate("/entrar", {
            state: {
              toast: {
                title:"Token inválido",
                description: "Informações do usuário ausentes ou incompletas.",
                type: "error"
              }
            }
          });
          return;
        }

        login(
          {
            id: decoded.id,
            nome: decoded.nome,
            username: decoded.username,
            email: decoded.email,
            avatar: decoded.avatar,
            provider: decoded.provider,
            providerId: decoded.providerId,
          },
          token,
        );
        
        navigate("/", {
          state: {
            toast: {
              title: "Login realizado com sucesso!",
              description: `Olá ${decoded.username}`,
              type: "success"
            }
          }
        });
        return;
      } catch (err) {
        console.error("Erro ao decodificar o token:", err);
        navigate("/entrar", {
          state: {
            toast: {
              title: "Erro no login",
              description: "Houve um problema ao validar seus dados. Tente novamente ou entre com outro método.",
              type: "error"
            }
          }
        })
      }
    };

  handleGithubLogin();
  },[location.search]);

  return(
    <Flex direction='column' align='center' justify='center' h='400px'>
        <Spinner size="xl" borderWidth="4px" animationDuration="0.65s" />
        <Text>Conectando com sua conta GitHub...</Text>
    </Flex>
  )
}