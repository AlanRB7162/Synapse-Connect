import { Button } from "@chakra-ui/react";

//link de autenticação
const GITHUB_AUTH_URL = "http://localhost:3001/auth/github";

//Redireciona o usuário para a rota de autenticação do GitHub
export function CustomGithubButton(){
  window.location.href = GITHUB_AUTH_URL;
//retorna o botão pronto
  return(
    <Button id="github-icon-in" onClick={() => CustomGithubButton()} >
        <i className="fa-brands fa-github"/>
    </Button>
  )
}
