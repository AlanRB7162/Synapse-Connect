//src/pages/Login/Toggle/ToggleLeft/ToggleLeft.tsx

import { Flex, Heading, Text } from "@chakra-ui/react";
import { ToggleButton } from "../../../components/Buttons/ToggleButton/ToggleButton";
import { FC } from "react";

interface ToggleLeftProps {
  onToggle: () => void;
  isActive: boolean;
}

export const ToggleLeft: FC<ToggleLeftProps> = ({ onToggle, isActive }) => {
    return(
        <Flex className="toggle-panel toggle-left" 
        direction='column' align='center' justify='center'
        w='50%' h='100%'
        p='0 35px' textAlign='center' 
        transition='all 0.6s ease-in-out'
        borderRadius='0 150px 100px 0'
        transform={isActive ? 'translateX(0)' : 'translateX(-200%)'}>
            <Heading as='h1' fontSize='2em' fontWeight='bold'>Seja bem-vindo!</Heading>
            <Text as='p' className="p1" 
            fontSize='14px' lineHeight='20px' letterSpacing='0.3px' margin='5px 28px 0 28px'
            >Crie sua conta agora mesmo e tenha acesso ao conhecimento!</Text>
            <Text as='p' className="p2" 
            fontSize='14px' lineHeight='20px' letterSpacing='0.3px' margin='75px 0 20px 0'
            >Já possui uma conta?<br/>Entre agora mesmo!</Text>
            <ToggleButton id="btToggle-in" onClick={onToggle}>ENTRAR</ToggleButton>
            <Text as='p' fontSize='14px' mt='20px'>Um clique para começar seu futuro!</Text>
        </Flex>
    )
}