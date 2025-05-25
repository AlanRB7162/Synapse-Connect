//src/pages/Login/SocialIcons/GitHub/GithubLogin.tsx

import { Button, Icon } from "@chakra-ui/react";
import { ElementType } from "react";
import { FaGithub } from "react-icons/fa6";

//link de autenticação
const GITHUB_AUTH_URL = "http://localhost:3000/auth/github";

//Redireciona o usuário para a rota de autenticação do GitHub
export function CustomGithubButton(){
  const handleLogin = () => {
    window.location.href = GITHUB_AUTH_URL;
  };
//retorna o botão pronto
  return(
    <Button id="github-icon-in" variant='outline' onClick={handleLogin}>
      <Icon as={FaGithub as ElementType} className='icon fa-github'/>
    </Button>
  )
}