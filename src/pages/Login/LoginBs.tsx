//src/pages/Login/LoginBs.tsx

import { Flex } from "@chakra-ui/react";
import { FormSignUp } from "./Form/FormSignUp";
import { FormSignIn } from "./Form/FormSignIn";
import './Form/Form.css'
import './Toggle/Toggle.css'
import './Login.css'
import { ToggleHeader } from "./Toggle/ToggleHeader";
import { ToggleFooter } from "./Toggle/ToggleFooter";

interface LoginBsProps {
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export function LoginBs({ isActive, setIsActive }: LoginBsProps){
    return(
        <Flex className='login-container-bs'  
        display={{base: 'flex', md: 'none'}}
        w='100%' minH='870px' h="100%" pt={12}
        position="relative" overflow="hidden"
        align='center'
        justify='center'
        direction={{base:'column', md:'row'}}
        gap={{base: 5, md: 0}}
        borderBottom="1.3px solid #ccc"
        >
            <ToggleHeader isActive={isActive}/>
            <Flex className="login-form" w='100%'
            h='500px' pos='absolute' overflow='hidden'
            transition='all 0.6s ease-in-out'>
                <Flex className="login-form-content" h='100%' w='200%'
                align='center' justify='center' 
                position='absolute' overflow='hidden'>
                    <FormSignUp isActive={isActive} setIsActive={setIsActive}/>
                    <FormSignIn isActive={isActive} setIsActive={setIsActive}/>
                </Flex>
            </Flex>
            <ToggleFooter isActive={isActive} onToggle={() => setIsActive(prev => !prev)}/>
        </Flex>
    );
};