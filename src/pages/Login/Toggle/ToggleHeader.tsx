//src/pages/Login/Toggle/ToggleHeader.tsx

import { Flex, Heading, Text } from "@chakra-ui/react";

type ToggleHeaderProps = {
  isActive: boolean;
};

export function ToggleHeader({ isActive }: ToggleHeaderProps){
    return(
        <Flex className="toggle-header" top='0' 
        bg={'rgba(29, 29, 29, 1)'}
        w='100%' h='150px' pos='absolute'
        borderRadius='0 0 20px 20px' overflow='hidden'
        transition='all 0.6s ease-in-out'>
            <Flex className="toggle-header-content" h='200%' w='100%'
            direction='column' position='absolute' align='center' justify='center' overflow='hidden'
            textAlign='center'>
                <Flex className="toggle-header-register" 
                direction='column' align='center' h='50%' justify='center'
                transform={isActive ? 'translateY(0)' : 'translateY(-100%)'}
                transition='all 0.6s ease-in-out'
                >
                    <Heading as='h1' fontSize='2em' fontWeight='bold'>Seja bem-vindo!</Heading>
                    <Text as='p' className="p1" 
                    fontSize='14px' lineHeight='20px' letterSpacing='0.3px' margin='5px 28px 0 28px'
                    >Crie sua conta agora mesmo e tenha acesso ao conhecimento!</Text>
                </Flex>
                <Flex className="toggle-header-login" 
                direction='column' align='center' h='50%' justify='center'
                transform={isActive ? 'translateY(0)' : 'translateY(-100%)'}
                transition='all 0.6s ease-in-out'>
                    <Heading as='h1' fontSize='2em' fontWeight='bold'>Bem-vindo de volta!</Heading>
                    <Text as='p' className="p1"
                    fontSize='14px' lineHeight='20px' letterSpacing='0.3px' my='5px' mx='10px'
                    >Acesse sua conta para utilizar todos os recursos do site</Text>
                </Flex>
            </Flex>
        </Flex>
    )
}