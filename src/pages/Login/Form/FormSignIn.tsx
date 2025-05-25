//src/pages/Login/Form/FormSignIn/FormSignIn.tsx

import { ElementType, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { FaEye, FaEyeSlash, FaKey, FaLinkedin, FaMicrosoft, FaUser } from "react-icons/fa6";
import { loginUser } from "../../../services/api";
import { useAuth } from "../../../contexts/AuthContext";
import { CustomGoogleButton } from "../SocialIcons/Google/GoogleLogin";
import { CustomGithubButton } from "../SocialIcons/Github/GithubLogin";
import InputLabel from "../../../components/Input/InputLabel";

type FormSignInProps = {
  isActive: boolean;
};


export function FormSignIn({ isActive }: FormSignInProps) {
    
    const [loginInput, setLoginInput] = useState("");
    const [senhaIn, setSenhaIn] = useState("");
    
    const [showPassword, setShowPassword] = useState(false);

    const [errorLogin, setErrorLogin] = useState("");
    const [successLogin, setSuccessLogin] = useState(false);

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!loginInput || !senhaIn) {
            setErrorLogin("Preencha todos os campos.");
            return;
        }

        try {
            const userData = await loginUser(loginInput, senhaIn);
            
            const rawUser = userData?.user;
            if (!rawUser) {
                throw new Error("Dados do usuário inválidos.");
            }

            const user = {
                name: rawUser.nome,
                email: rawUser.email,
                picture: rawUser.picture,
            };

            login(user);
            setSuccessLogin(true);
            setTimeout(() => {
            navigate("/");
            }, 1500);
            setErrorLogin("");
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setErrorLogin("Falha no login. Verifique seu e-mail e senha.");
            setSuccessLogin(false);
        }
    };

    return(
        <Flex className="form-container sign-in" 
        w={{base:'100%',md:'50%'}} 
        position={{base: 'absolute', md:'relative'}} 
        transform={isActive ? 'translateX(100%)' : 'translateX(0)'}
        transition={'all 0.6s ease-in-out'}
        >
            <form onSubmit={handleLogin}>
                <Flex className="form-content-sign-in" direction='column' gap={4}
                width='100%' h='100%' align='center' justify='center'>
                    <Flex className="sign-in-head" direction="column" gap={4} 
                    align='center' w='100%'>
                        <Heading as='h1' fontSize='2em' fontWeight='bold'>Entrar</Heading>
                        <Flex className="social-icons" gap={3}>
                            <CustomGoogleButton/>
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