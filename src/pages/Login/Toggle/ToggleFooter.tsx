//src/pages/Login/Toggle/ToggleFooter.tsx

import { Flex, Text } from "@chakra-ui/react";
import { ToggleButton } from "../../../components/Buttons/ToggleButton/ToggleButton";

type ToggleFooterProps = {
    onToggle: () => void;
    isActive: boolean;
};

export function ToggleFooter({ onToggle, isActive }: ToggleFooterProps){
    return(
        <Flex className="toggle-footer" bottom='0' 
        bg={'rgba(29, 29, 29, 1)'}
        w='100%' h='150px' pos='absolute'
    	overflow='hidden' mb={3}
        transition='all 0.6s ease-in-out'
        textAlign='center'>
            <Flex className="toggle-footer-content" h='100%' w='200%'
            position='absolute' align='center' justify='center' overflow='hidden'
            >
                <Flex className="toggle-footer-register" 
                direction='column' align='center' w='50%' justify='center'
                transform={isActive ? 'translateX(0)' : 'translateX(-100%)'}
                transition='all 0.6s ease-in-out'>
                    <Text as='p' className="p2" 
                    fontSize='14px' lineHeight='20px' letterSpacing='0.3px' mb='20px'
                    >Ainda não possui uma conta?<br/>Cadastre-se agora mesmo!</Text>
                    <ToggleButton id="btToggle-up" onClick={onToggle}>CADASTRAR-SE</ToggleButton>
                    <Text as='p' fontSize='14px' mt='20px'>Um clique para começar seu futuro!</Text>
                </Flex>
                <Flex className="toggle-footer-login" 
                direction='column' align='center' w='50%' justify='center'
                transform={isActive ? 'translateX(0)' : 'translateX(-100%)'}
                transition='all 0.6s ease-in-out'>
                    <Text as='p' className="p2" 
                    fontSize='14px' lineHeight='20px' letterSpacing='0.3px' mb='15px'
                    >Já possui uma conta?<br/>Entre agora mesmo!</Text>
                    <ToggleButton id="btToggle-in" onClick={onToggle}>ENTRAR</ToggleButton>
                    <Text as='p' fontSize='14px' mt='15px'>Um clique para começar seu futuro!</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}