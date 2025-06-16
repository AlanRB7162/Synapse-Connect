//src/pages/Login/LocalLogin.tsx

import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Flex, Text } from "@chakra-ui/react";
import { Fade } from "@chakra-ui/transition";
import React from "react";
import { Logo } from "../../components/Logo/Logo";

type JwtPayload = {
  id: number;
  username: string;
  nome: string;
  avatar: string | null;
  email: string | null;
  provider: string;
  providerId: string | null;
  exp: number;
};

// Delay intencional para exibir "Conectando com sua conta..." antes de redirecionar
function delayedNavigate(navigate: NavigateFunction, path: string, state: object = {}, delay: number = 5000) {
  setTimeout(() => {
    navigate(path, { state });
  }, delay);
}

export default function LocalLogin(){
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const dicas = [
    "Mantenha sua senha segura e não compartilhe com ninguém.",
    "Para maior segurança, escolha uma senha forte com letras, números e símbolos.",
    "Você pode usar o login local ou conectar suas redes sociais para mais praticidade.",
    "Lembre-se de sair da conta ao usar computadores públicos para sua segurança.",
  ];

  const regToasterTitle = "Cadastro realizado, mas o login automático falhou";
  const regToasterDesc = "Sua conta foi criada com sucesso. Faça login para continuar."

  const [dicasIndex, setDicasIndex] = React.useState(0);

  const [source, setSource] = React.useState<"register" | "login">("login");

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDicasIndex((i) => (i + 1) % dicas.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [dicas.length]);

  useEffect(() => {
    const handleLocalLogin = async () => {
      const queryParams = new URLSearchParams(location.search);
      const token = queryParams.get("token");
      const sourceParam = queryParams.get("source") as "register" | "login";

      setSource(sourceParam);
      const isRegister = sourceParam === "register";

      if(!token){
        console.error("Token não encontrado na URL");
        delayedNavigate(navigate, "/entrar", {
          toast: {
            title: isRegister ? regToasterTitle : "Não conseguimos confirmar seu login",
            description: isRegister ? regToasterDesc : "Tente novamente ou use outro método de acesso.",
            type: isRegister ? "warning" : "error"
          }
        }, 2000)
        return
      }

      try{
        const decoded = jwtDecode<JwtPayload>(token);

        if(decoded.exp * 1000 < Date.now()){
          delayedNavigate(navigate, "/entrar", {
            toast: {
              title: isRegister ? regToasterTitle : "Sua sessão expirou.",
              description: isRegister ? regToasterDesc : "Por segurança, você precisa fazer login novamente.",
              type: isRegister ? "warning" : "error"
            }
          }, 2000);
          return;
        }

        if(!decoded.id || !decoded.email || !decoded.username){
          delayedNavigate(navigate, "/entrar", {
            toast: {
              title: isRegister ? regToasterTitle : "Não foi possível confirmar suas informações.",
              description: isRegister ? regToasterDesc : "Algo deu errado ao validar seus dados. Tente novamente.",
              type: isRegister ? "warning" : "error"
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
            title: isRegister
              ? "Conta criada com sucesso!"
              : "Login realizado com sucesso!",
            description: isRegister
              ? `Bem-vindo(a), ${decoded.nome || decoded.username}! Sua conta foi criada e você já está logado.`
              : `Olá novamente, ${decoded.nome || decoded.username}! Bom te ver por aqui.`,
            type: "success"
          }
        });
        return;
      } catch (err) {
        console.error("Erro ao decodificar o token:", err);
        delayedNavigate(navigate,"/entrar", {
          toast: {
            title: isRegister ? regToasterTitle : "Algo deu errado ao entrar com sua conta.",
            description: isRegister ? regToasterDesc : "Tente novamente ou escolha outro método de acesso.",
            type: isRegister ? "warning" : "error"
          }
        }, 2000)
      }
    };

  handleLocalLogin();
  },[location.search, login, navigate]);

const [dots, setDots] = React.useState("");

React.useEffect(() => {
  const interval = setInterval(() => {
    setDots((prev) => (prev.length < 3 ? prev + "." : ""));
  }, 500);
  return () => clearInterval(interval);
}, []);

  return(
    <Flex direction='column' align='center' justify='center' h='400px' w="100%" textAlign="center">
      <Logo/>
        <Text mt={4}>
          {source === "register" ? "Cadastrando sua conta local" : "Realizando login com sua conta local"}
          <Text as="span" display="inline" fontWeight="bold">{dots}</Text>
        </Text>
        <Fade in key={dicasIndex}>
          <Text mt={4} fontSize="sm" color="gray.500">{dicas[dicasIndex]}</Text>
        </Fade>
    </Flex>
  )
}