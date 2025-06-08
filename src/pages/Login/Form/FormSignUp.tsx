//src/pages/Login/Form/FormSignUp/FormSignUp.tsx

import { ElementType, useState } from "react";
import { Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { FaAddressCard, FaAt, FaEye, FaEyeSlash, FaKey, FaLinkedin, FaMicrosoft, FaUser } from "react-icons/fa6";
import { registerUser } from "../../../services/api";
import InputLabel from "../../../components/Input/InputLabel";
import { RegisterGoogleButton } from "../SocialIcons/Google/GoogleRegister";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { CustomGithubButton } from "../SocialIcons/Github/GithubButton";

type FormSignUpProps = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export function FormSignUp({ isActive, setIsActive }: FormSignUpProps) {
    const [nomeUp, setNomeUp] = useState("");
    const [usuarioUp, setUsuarioUp] = useState("");
    const [emailUp, setEmailUp] = useState("");
    const [senhaUp, setSenhaUp] = useState("");
    
    const [showPassword, setShowPassword] = useState(false);

    const {login} = useAuth();

    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nomeUp || !emailUp || !usuarioUp || !senhaUp) {
            setIsActive(true);
            navigate("/entrar", {
                state: {
                    toast: {
                        title: "Erro ao registrar",
                        description: "Todos os campos devem ser preenchidos",
                        type: "error"
                    }
                }
            })
            return;
        }
        try {
            const data = await registerUser(nomeUp, emailUp, usuarioUp, senhaUp);
            
            if (data?.token && data?.user){
                const user = {
                    id: data.user.id,
                    nome: data.user.nome,
                    username: data.user.username,
                    email: data.user.email,
                    avatar: data.user.avatar,
                    provider: data.user.provider,
                    providerId: data.user.providerId
                };

                navigate("/", {
                    state: {
                        toast:{
                            title: "Cadastro realizado com sucesso!",
                            description: `Seja bem-vindo(a), ${user.username}`,
                            type: "success"
                        }
                    }
                })
                setTimeout(()=>{
                    login(user, data.token);
                }, 10);
            } else {
                setIsActive(false);
                navigate("/entrar", {
                    state: {
                        toast:{
                            title: "Falha ao realizar login automatico.",
                            description: "Registro realizado, porém houve problema ao logar automaticamente. Por favor, realize o login com suas credenciais",
                            type: "warning"
                        }
                    }
                })
                return;
            }
        } catch (err: any) {
            const message = err?.response?.data?.error || "Erro ao registrar. Tente Novamente."
            console.error("Erro ao registrar:", message)
            setIsActive(true);
            navigate("/entrar", {
                state: {
                    toast:{
                        title: "Erro interno",
                        description: message,
                        type: "error"
                    }
                }
            })
        }
    };

    const transformStyle = {
        md: isActive ? 'translateX(0)' : 'translateX(-100%)',
        base: isActive ? 'translateY(0)' : 'translateY(-100%)'
    };

    return(
        <Flex className="form-container sign-up" h='100%'
        w={{base:'100%',md:'50%'}} 
        position='relative'
        transform={transformStyle}
        zIndex={isActive ? '3' : '-1'}
        opacity={isActive ? '1' : '0'}
        transition={'all 0.6s ease-in-out'}
        textAlign='center'
        >
            <form onSubmit={handleRegister}>
                <Flex className="form-content-sign-up" direction='column' gap={2} 
                w='100%' h='100%' align='center' justify='center'>
                    <Flex className="sign-up-head" direction='column' gap={3} 
                    align='center' w='100%'>
                        <Heading as='h1' fontSize='2em' fontWeight='bold'>Criar Conta</Heading>
                        <Flex className="social-icons" gap={3}>
                            <RegisterGoogleButton/>
                            <Button id="microsoft-icon-up" variant='outline'><Icon as={FaMicrosoft as ElementType} className='icon fa-microsoft'/></Button>
                            <CustomGithubButton/>
                            <Button id="linkedin-icon-up" variant='outline'><Icon as={FaLinkedin as ElementType} className='icon fa-linkedin'/></Button>
                        </Flex>
                        <Text as='span' fontSize='12px' fontWeight='bold'>ou use seu e-mail para cadastro</Text>
                    </Flex>
                    <Flex className="sign-up-body" direction="column" gap={4} 
                    align='center' w='100%'>
                        <Flex className="input-login input-signup" align='center' gap={2} w='100%'>
                            <Icon as={FaAddressCard as ElementType} className='icon fa-adress-card'/>
                            <InputLabel id="inpNome-up" type="text" label="Nome" value={nomeUp} onChange={(e) => setNomeUp(e.target.value)}/>
                        </Flex>
                        <Flex className="input-login input-signup" align='center' gap={2} w='100%'>
                            <Icon as={FaUser as ElementType} className='icon fa-user'/>
                            <InputLabel id="inpUsuario-up" type="text" label="Usuário" value={usuarioUp} onChange={(e) => setUsuarioUp(e.target.value)}/>
                        </Flex>
                        <Flex className="input-login input-signup" align='center' gap={2} w='100%'>
                            <Icon as={FaAt as ElementType} className='icon fa-at'/>
                            <InputLabel id="inpEmail-up" type="email" label="E-mail" value={emailUp} onChange={(e) => setEmailUp(e.target.value)}/>
                        </Flex>
                        <Flex className="input-login input-signup" align='center' gap={2} w='100%'>
                            <Icon as={FaKey as ElementType} className='icon fa-key'/>
                            <InputLabel id="inpSenha-up" type={showPassword ? "text" : "password"} label="Senha" value={senhaUp} onChange={(e) => setSenhaUp(e.target.value)}
                            rightElement={<Button id="tp-eye-up" onClick={() => setShowPassword(!showPassword)} bg='transparent' size='sm'><Icon as={showPassword ? FaEyeSlash as ElementType : FaEye as ElementType} className='icon fa-eye'/></Button>}/>
                        </Flex>

                        <Button id="btSign-up" className="button-login button-up" type="submit" 
                        w='60%' mt='18px' p='10px 45px' borderRadius='30px' transition='0.17s'
                        background='linear-gradient(to right, #F1CA84, #ECB251)' 
                        color='#fff' fontWeight='750' letterSpacing='0.5px'
                        >REGISTRE-SE
                        </Button>
                    </Flex>
                </Flex>    
            </form>
        </Flex>
    )
}