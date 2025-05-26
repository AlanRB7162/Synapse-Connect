//src/pages/Login/LoginBs.tsx

import { Flex } from "@chakra-ui/react";
import { FormSignUp } from "./Form/FormSignUp";
import { FormSignIn } from "./Form/FormSignIn";
import './Form/Form.css'
import './Toggle/Toggle.css'
import './Login.css'
import { useState } from "react";
import { ToggleHeader } from "./Toggle/ToggleHeader";
import { ToggleFooter } from "./Toggle/ToggleFooter";

export function LoginBs(){
    const [isActive, setIsActive] = useState(false);

    return(
        <Flex className='login-container md'  
        display={{base: 'flex', md: 'none'}}
        w='100%' minH='800px'
        position="relative" overflow="hidden"
        borderRadius='16px'
        align='center'
        justify='center'
        direction={{base:'column', md:'row'}}
        gap={{base: 5, md: 0}}
        >
            <ToggleHeader isActive={isActive}/>
            <Flex className="login-form" w='100%'
            h='500px' pos='absolute' overflow='hidden'
            transition='all 0.6s ease-in-out'>
                <Flex className="login-form-content" h='200%' w='100%'
                direction='column' align='center' justify='center' 
                position='absolute' overflow='hidden'>
                    <FormSignUp isActive={isActive}/>
                    <FormSignIn isActive={isActive}/>
                </Flex>
            </Flex>
            <ToggleFooter isActive={isActive} onToggle={() => setIsActive(prev => !prev)}/>
        </Flex>
    );
};