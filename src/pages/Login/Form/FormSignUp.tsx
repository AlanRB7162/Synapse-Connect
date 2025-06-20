//src/pages/Login/Form/FormSignUp/FormSignUp.tsx

import { ElementType, useState } from "react";
import { Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { FaAddressCard, FaAt, FaEye, FaEyeSlash, FaKey, FaLinkedin, FaMicrosoft, FaUser } from "react-icons/fa6";
import InputLabel from "../../../components/Input/InputLabel";
import { useNavigate } from "react-router-dom";
import { CustomGithubButton } from "../SocialIcons/Github/GithubButton";
import CustomGoogleButton from "../SocialIcons/Google/GoogleButton";
import axios from "axios";

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
        try{
            const response = await axios.post("http://localhost:3001/user/register", {
                nome: nomeUp,
                username: usuarioUp,
                email: emailUp,
                senha: senhaUp,
            });

            const { token, source } = response.data;

            if (token) {
                // Redireciona programaticamente para a rota, passando o token como query param
                navigate(`/entrar/local?token=${token}&source=${source}`);
            } else {
                setIsActive(true);
                navigate("/entrar", {
                    state: {
                        toast: {
                        title: "Erro ao registrar",
                        description: "Não foi possível realizar o cadastro.",
                        type: "error",
                        },
                    },
                });
            }
        } catch (err: any) {
            const toastData = err?.response?.data?.toast;
            setIsActive(true);
            navigate("/entrar", {
                state: {
                    toast: toastData || {
                        title: "Erro interno",
                        description: "Erro ao registrar. Tente novamente.",
                        type: "error",
                    },
                },
            });
        }
    }   

    return(
        <Flex className="form-container sign-up" h='100%'
        w='50%'
        position='relative'
        transform={isActive ? 'translateX(0)' : 'translateX(-100%)'}
        zIndex={{base: 0, md: isActive ? '3' : '-1'}}
        opacity={{base: 1, md: isActive ? '1' : '0'}}
        transition={'all 0.6s ease-in-out'}
        justify='center'
        textAlign='center'
        >
            <form onSubmit={handleRegister}>
                <Flex className="form-content-sign-up" direction='column' gap={2} 
                w='100%' h='100%' align='center' justify='center'>
                    <Flex className="sign-up-head" direction='column' gap={3} 
                    align='center' w='100%'>
                        <Heading as='h1' fontSize='2em' fontWeight='bold'>Criar Conta</Heading>
                        <Flex className="social-icons" gap={3}>
                            <CustomGoogleButton/>
                            <CustomGithubButton/>
                            <Button id="microsoft-icon-up" variant='outline'><Icon as={FaMicrosoft as ElementType} className='icon fa-microsoft'/></Button>
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