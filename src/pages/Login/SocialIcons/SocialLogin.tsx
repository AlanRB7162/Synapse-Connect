//src/pages/Login/SocialIcons/SocialLogin.tsx

import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { FaGooglePlusG, FaSquareGithub } from "react-icons/fa6";
import { Fade } from "@chakra-ui/transition";
import React from "react";
import { Progress } from "../../../components/ui/progress";

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

// Delay intencional para exibir "Conectando com sua conta..." antes de redirecionar
function delayedNavigate(navigate: NavigateFunction, path: string, state: object = {}, delay: number = 5000) {
  setTimeout(() => {
    navigate(path, { state });
  }, delay);
}

export default function SocialLogin({ provider = "social" }: { provider?: string }){
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);

  const dicas = [
    `Dica: Você pode usar sua conta ${providerName} para login rápido.`,
    "Sabia que pode alterar seu username depois no perfil?",
    "Use a segurança da sua conta social para acessar mais rápido.",
    "Seu histórico de login fica salvo para facilitar o acesso.",
  ];

  const [dicasIndex, setDicasIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDicasIndex((i) => (i + 1) % dicas.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [dicas.length]);

  useEffect(() => {
    const handleSocialLogin = async () => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get("token");

      if(!token){
        console.error("Token não encontrado na URL");
        delayedNavigate(navigate, "/entrar", {
          toast: {
            title: "Não conseguimos confirmar seu login.",
            description: "Tente novamente ou use outro método de acesso.",
            type: "error"
          }
        }, 2000)
        return
      }

      try{
        const decoded = jwtDecode<JwtPayload>(token);

        if(decoded.exp * 1000 < Date.now()){
          delayedNavigate(navigate, "/entrar", {
            toast: {
              title: "Sua sessão expirou.",
              description: "Por segurança, você precisa fazer login novamente.",
              type: "error"
            }
          }, 2000);
          return;
        }

        if(!decoded.id || !decoded.providerId || !decoded.email){
          delayedNavigate(navigate, "/entrar", {
            toast: {
              title:"Não foi possível confirmar suas informações.",
              description: "Algo deu errado ao validar seus dados. Tente novamente.",
              type: "error"
            }
          }, 2000);
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
        
        delayedNavigate(navigate, "/", {
          toast: {
            title: "Login realizado com sucesso!",
            description: `Olá ${decoded.username}`,
            type: "success"
          }
        });
        return;
      } catch (err) {
        console.error("Erro ao decodificar o token:", err);
        delayedNavigate(navigate,"/entrar", {
          toast: {
            title: "Algo deu errado ao entrar com sua conta.",
            description: "Tente novamente ou escolha outro método de login.",
            type: "error"
          }
        }, 2000)
      }
    };

  handleSocialLogin();
  },[location.search, login, navigate]);

const [dots, setDots] = React.useState("");

React.useEffect(() => {
  const interval = setInterval(() => {
    setDots((prev) => (prev.length < 3 ? prev + "." : ""));
  }, 500);
  return () => clearInterval(interval);
}, []);

const [progress, setProgress] = React.useState(0);

React.useEffect(() => {
  const interval = setInterval(() => {
    setProgress((prev) => {
      if (prev >= 100) {
        clearInterval(interval);
        return 100;
      }
      return prev + 2;
    });
  },100);

  return () => clearInterval(interval);
}, []);

  return(
    <Flex direction='column' align='center' justify='center' h='400px'>
      <Icon as={provider === "google" ? FaGooglePlusG : FaSquareGithub} boxSize={20} mb={4}/>
        <Flex align="center" mb={4} w="250px" justify="center">
          <Progress 
            value={progress}
            showValueText={false}
            width="100%"
            size="xl"
            colorScheme="teal"
            style={{ transition: "width 0.1s ease-in-out" }}
          />
          <Text ml={2} minW="35px" textAlign="right" fontWeight="bold" whiteSpace="nowrap">{progress}%</Text>
        </Flex>
        <Text>
          Conectando com sua conta {providerName}
          <Text as="span" display="inline" fontWeight="bold">{dots}</Text>
        </Text>
        <Fade in key={dicasIndex}>
          <Text mt={4} fontSize="sm" color="gray.500">{dicas[dicasIndex]}</Text>
        </Fade>
    </Flex>
  )
}