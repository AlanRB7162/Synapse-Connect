//src/pages/Login/Form/FormSignIn/FormSignIn.tsx

import { ElementType, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { FaEye, FaEyeSlash, FaKey, FaLinkedin, FaMicrosoft, FaUser } from "react-icons/fa6";
import { loginUser } from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";
import { LoginGoogleButton } from "../SocialIcons/Google/GoogleLogin";
import { CustomGithubButton } from "../SocialIcons/Github/GithubButton";
import InputLabel from "../../../components/Input/InputLabel";

type FormSignInProps = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};


export function FormSignIn({ isActive, setIsActive }: FormSignInProps) {
    
    const [loginInput, setLoginInput] = useState("");
    const [senhaIn, setSenhaIn] = useState("");
    
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!loginInput || !senhaIn) {
            setIsActive(false);
            navigate("/entrar", {
                state: {
                    toast: {
                        title: "Erro ao fazer login",
                        description: "Todos os campos devem ser preenchidos",
                        type: "error"
                    }
                }
            })
            return;
        }

        try {
            const data = await loginUser(loginInput, senhaIn);
            const {user: rawUser, token } = data;
            
            if (!rawUser?.nome || !rawUser?.email || !token) {
                setIsActive(false);
                navigate("/entrar", {
                    state: {
                        toast: {
                            title: "Erro ao fazer login",
                            description: "Ocorreu um erro ao carregar suas informações de login. Por favor, tente novamente.",
                            type: "error"
                        }
                    }
                })
                return;
            }

            const user = {
                id: rawUser.id,
                nome: rawUser.nome,
                username: rawUser.username,
                email: rawUser.email,
                avatar: rawUser.avatar,
                provider: rawUser.provider,
                providerId: rawUser.providerId
            };

            navigate("/", {
                state: {
                    toast:{
                        title: "Login realizado com sucesso!",
                        description: `Bem-vindo(a) de volta, ${user.username}`,
                        type: "success"
                    }
                }
            })
            setTimeout(()=>{
                login(user, data.token);
            }, 10);
        } catch (err: any) {
            const message = err?.response?.data?.error || "Erro ao fazer login. Tente Novamente."
            console.error("Erro ao fazer login:", message)
            setIsActive(false);
            navigate("/entrar", {
                state: {
                    toast:{
                        title: "Erro ao fazer login",
                        description: message,
                        type: "error"
                    }
                }
            })
        }
    };

    const transformStyle = {
        md: isActive ? 'translateX(100%)' : 'translateX(0)',
        base: isActive ? 'translateY(0)' : 'translateY(-100%)'
    };

    return(
        <Flex className="form-container sign-in" h='100%'
        w={{base:'100%',md:'50%'}} 
        position='relative'
        transform={transformStyle}
        transition={'all 0.6s ease-in-out'}
        justify='center'
        textAlign='center'
        >
            <form onSubmit={handleLogin}>
                <Flex className="form-content-sign-in" direction='column' gap={4}
                width='100%' h='100%' align='center' justify='center'>
                    <Flex className="sign-in-head" direction="column" gap={4} 
                    align='center' w='100%'>
                        <Heading as='h1' fontSize='2em' fontWeight='bold'>Entrar</Heading>
                        <Flex className="social-icons" gap={3}>
                            <LoginGoogleButton/>
                            <Button id="microsoft-icon-in" variant='outline'><Icon as={FaMicrosoft as ElementType} className='icon fa-microsoft'/></Button>
                            <CustomGithubButton/>
                            <Button id="linkedin-icon-in" variant='outline'><Icon as={FaLinkedin as ElementType} className='icon fa-linkedin'/></Button>
                        </Flex>
                        <Text as='span' fontSize='12px' fontWeight='bold'>ou use seu e-mail e senha</Text>
                    </Flex>
                    <Flex className="sign-in-body" direction="column" gap={4} 
                    align='center' w='100%'>
                        <Flex className="input-login input-signin" align='center' gap={2} w='100%'>
                            <Icon as={FaUser as ElementType} className='icon fa-user'/>
                            <InputLabel id="inpLogin-in" type="text" label="Usuário ou E-mail" value={loginInput} onChange={(e) => setLoginInput(e.target.value)}/>
                        </Flex>
                        <Flex className="input-login input-signin" align='center' gap={2} w='100%'>
                            <Icon as={FaKey as ElementType} className='icon fa-key'/>
                            <InputLabel id="inpSenha-in" type={showPassword ? "text" : "password"} label="Senha" value={senhaIn} onChange={(e) => setSenhaIn(e.target.value)}
                            rightElement={<Button id="tp-eye-in" onClick={()=> setShowPassword(!showPassword)} bg='transparent' size='sm'><Icon as={showPassword ? FaEyeSlash as ElementType : FaEye as ElementType} className="icon fa-eye"/></Button>}/>
                        </Flex>

                        <Button id="btForgot" className="forgot" type="button"
                        textDecoration='none' bgColor='transparent'
                        transition='0.25s'>Esqueceu sua senha?</Button>

                        <Button id="btSign-in" className="button-login button-in" type="submit" 
                        w='50%' p='10px 45px' borderRadius='30px' transition='0.2s'
                        background='linear-gradient(to right, #F1CA84, #ECB251)' 
                        color='#fff' fontWeight='750px' letterSpacing='0.5px'
                        >ENTRAR 
                        </Button>
                        {/*errorLogin && <Text color="red.500">{errorLogin}</Text>}
                        {successLogin && <Text color="green.500">Login realizado com sucesso!</Text>*/}
                    </Flex>
                </Flex>
            </form>
        </Flex>
    )
}