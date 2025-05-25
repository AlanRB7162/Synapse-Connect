//src/pages/Login/Toggle/ToggleRight/ToggleRight.tsx

import { Flex, Heading, Text } from "@chakra-ui/react";
import { ToggleButton } from "../../../components/Buttons/ToggleButton/ToggleButton";
import { FC } from "react";

interface ToggleRightProps {
  onToggle: () => void;
  isActive: boolean;
}

export const ToggleRight: FC<ToggleRightProps> = ({ onToggle, isActive }) => {
    return(
        <Flex className="toggle-panel toggle-right" right='0'
        direction='column' align='center' justify='center'
        w='50%' h='100%' top='10px'
        p='0 35px' textAlign='center'
        transition='all 0.6s ease-in-out'
        borderRadius='150px 0 0 100px'
        transform={isActive ? 'translateX(+200%)' : 'translateX(0)'}>
            <Heading as='h1' fontSize='2em' fontWeight='bold'>Bem-vindo de volta!</Heading>
            <Text as='p' className="p1"
            fontSize='14px' lineHeight='20px' letterSpacing='0.3px' my='5px' mx='10px'
            >Acesse sua conta para utilizar todos os recursos do site</Text>
            <Text as='p' className="p2" 
            fontSize='14px' lineHeight='20px' letterSpacing='0.3px' mt='75px' mb='20px'
            >Ainda não possui uma conta?<br/>Cadastre-se agora mesmo!</Text>
            <ToggleButton id="btToggle-up" onClick={onToggle}>CADASTRAR-SE</ToggleButton>
            <Text as='p' fontSize='14px' mt='20px'>Um clique para começar seu futuro!</Text>
        </Flex>
    )
}