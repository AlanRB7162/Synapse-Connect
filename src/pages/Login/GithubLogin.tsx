import { Button } from "@chakra-ui/react";

//link de autenticação
const GITHUB_AUTH_URL = "http://localhost:3000/auth/github";

//Redireciona o usuário para a rota de autenticação do GitHub
export function CustomGithubButton(){
  const handleLogin = () => {
    window.location.href = GITHUB_AUTH_URL;
  };
//retorna o botão pronto
  return(
    <Button id="github-icon-in" onClick={handleLogin} >
        <i className="fa-brands fa-github"/>
    </Button>
  )
}