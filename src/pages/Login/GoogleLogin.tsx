import { Button } from "@chakra-ui/react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

export function CustomGoogleButton() {
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
    <Button id="google-icon-in" onClick={() => googleLogin()}>
      <i className="fa-brands fa-google-plus-g" />
    </Button>
  );
}
