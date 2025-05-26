//src/pages/Login/SocialIcons/GitHub/GithubLogin.tsx

import { Button, Icon } from "@chakra-ui/react";
import { ElementType } from "react";
import { FaGithub } from "react-icons/fa6";

const CLIENT_ID = "Ov23liWwkyOZLTDR9qs2";

//link de autenticação
const redirectUri = "http://localhost:3001/auth/github/callback";
 const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=read:user`;


//Redireciona o usuário para a rota de autenticação do GitHub
export function CustomGithubButton(){
  const handleLogin = () => {
    window.location.href = githubAuthUrl;
  };
//retorna o botão pronto
  return(
    <Button id="github-icon-in" variant='outline' onClick={handleLogin}>
      <Icon as={FaGithub as ElementType} className='icon fa-github'/>
    </Button>
  )
}