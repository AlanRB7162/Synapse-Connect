//src/pages/Login/Form/FormSignUp/FormSignUp.tsx

import { ElementType, useState } from "react";
import { Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { FaAddressCard, FaAt, FaEye, FaEyeSlash, FaGithub, FaKey, FaLinkedin, FaMicrosoft, FaUser } from "react-icons/fa6";
import { registerUser } from "../../../services/api";
import InputLabel from "../../../components/Input/InputLabel";

type FormSignUpProps = {
  isActive: boolean;
};

export function FormSignUp({ isActive }: FormSignUpProps) {
    
    const [nomeUp, setNomeUp] = useState("");
    const [usuarioUp, setUsuarioUp] = useState("");
    const [emailUp, setEmailUp] = useState("");
    const [senhaUp, setSenhaUp] = useState("");
    
    const [showPassword, setShowPassword] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!nomeUp || !emailUp || !usuarioUp || !senhaUp) {
            setError("Todos os campos são obrigatórios.");
            return;
        }
        try {
            await registerUser(nomeUp, emailUp, usuarioUp, senhaUp);
            setSuccess(true);
            setError("");
        } catch (error) {
            console.error("Error registering user:", error);
            setError("Erro ao registrar. Tente novamente.");
            setSuccess(false);
        }
    };


    return(
        <Flex className="form-container sign-up" h='100%'
        w={{base:'100%',md:'50%'}} 
        position={{base: 'absolute', md:'relative'}}
        transform={isActive ? 'translateX(0)' : 'translateX(-100%)'}
        zIndex={isActive ? '3' : '-1'}
        opacity={isActive ? '1' : '0'}
        transition={'all 0.6s ease-in-out'}
        >
            <form onSubmit={handleRegister}>
                <Flex className="form-content-sign-up" direction='column' gap={2} 
                w='100%' h='100%' align='center' justify='center'>
                    <Flex className="sign-up-head" direction='column' gap={3} 
                    align='center' w='100%'>
                        <Heading as='h1' fontSize='2em' fontWeight='bold'>Criar Conta</Heading>
                        <Flex className="social-icons" gap={3}>
                            <Button id="microsoft-icon-up" variant='outline'><Icon as={FaMicrosoft as ElementType} className='icon fa-microsoft'/></Button>
                            <Button id="github-icon-up" variant='outline'><Icon as={FaGithub as ElementType} className='icon fa-github'/></Button>
                            <Button id="linkedin-icon-up" variant='outline'><Icon as={FaLinkedin as ElementType} className='icon fa-linkedin'/></Button>
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
                        w='50%' mt='18px' p='10px 45px' borderRadius='30px' transition='0.17s'
                        background='linear-gradient(to right, #F1CA84, #ECB251)' 
                        color='#fff' fontWeight='750px' letterSpacing='0.5px'
                        >REGISTRE-SE
                        </Button>
                        {/*error && <Text color="red.500">{error}</Text>}
                        {success && <Text color="green.500">Cadastro realizado com sucesso!</Text>*/}
                    </Flex>
                </Flex>    
            </form>
        </Flex>
    )
}