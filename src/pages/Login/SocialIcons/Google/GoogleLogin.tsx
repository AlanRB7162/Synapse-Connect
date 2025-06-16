//src/pages/Login/SocialIcons/Google/GoogleLogin.tsx

import { Button, Icon } from "@chakra-ui/react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";
import axios from "axios";
import { FaGooglePlusG } from "react-icons/fa6";
import { ElementType } from "react";

export function LoginGoogleButton() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { access_token } = tokenResponse;

        const res = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        console.log("Usuário logado:", res.data);

        login(res.data);

        navigate("/");
      } catch (err) {
        console.error("Erro ao buscar dados do usuário:", err);
      }
    },
    onError: () => console.log("Erro no login com Google"),
  });

  return (
    <Button id="google-icon-in" onClick={() => googleLogin()} variant='outline'>
      <Icon as={FaGooglePlusG as ElementType} className='icon fa-google-plus-g'/>
    </Button>
  );
}