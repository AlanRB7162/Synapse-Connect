import { Button, Icon } from "@chakra-ui/react";
import { useGoogleLogin } from "@react-oauth/google";
import { ElementType, useState } from "react";
import { FaGooglePlusG } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export default function CustomGoogleButton(){
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            setIsLoading(true);
            try{
                const access_token = tokenResponse.access_token;

                if(!access_token){
                    navigate("/entrar", {
                        state: {
                            toast: {
                                title: "Algo deu errado com o Google",
                                description: "Não conseguimos validar suas informações. Tente novamente.",
                                type: "error"
                            },
                        },
                    });
                    return;
                }

                window.location.href = `http://localhost:3001/auth/google/callback?access_token=${access_token}`;
            } catch (err) {
                console.error("Erro ao enviar token para o backend:", err);
                navigate("/entrar", {
                    state: {
                        toast: {
                            title: "Não conseguimos finalizar seu login",
                            description: "Pode ter sido um problema na conexão ou no Google. Tente de novo em instantes.",
                            type: "error"
                        }
                    }
                });
            } finally {
                setIsLoading(false);
            }
        },
        onError: err => {
            console.error("Erro no login com Google:", err);
            navigate("/entrar", {
                state: {
                    toast: {
                        title: "Erro ao conectar com o Google",
                        description: "Pode ter sido negado o acesso ou ocorreu uma falha. Você pode tentar novamente.",
                        type: "error"
                    }
                }
            });
        }
    });

    return(
        <Button id="google-icon-in" onClick={() => login()} variant='outline'
        loading={isLoading}>
            <Icon as={FaGooglePlusG as ElementType} className='icon fa-google-plus-g'/>
        </Button>
    )
}