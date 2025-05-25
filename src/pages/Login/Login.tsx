//src/pages/Login/Login.tsx

import { Flex } from "@chakra-ui/react";
import { FormSignUp } from "./Form/FormSignUp";
import { FormSignIn } from "./Form/FormSignIn";
import { ToggleLeft } from "./Toggle/ToggleLeft";
import { ToggleRight } from "./Toggle/ToggleRight";
import './Form/Form.css'
import './Toggle/Toggle.css'
import './Login.css'
import { useState } from "react";

export function Login(){
    const [isActive, setIsActive] = useState(false);

    return(
        <Flex className='login-container'  
        maxW="1000px" w='100%' minH='500px'
        position="relative" overflow="hidden"
        borderRadius='16px' mt='25px'
        align='center'
        justify='center'
        direction={{base:'column', md:'row'}}
        gap={{base: 5, md: 0}}
        mx='20px'
        >
            <FormSignIn isActive={isActive}/>
            <FormSignUp isActive={isActive}/>

            <Flex display={{base: 'none', md: 'flex'}} className="toggle-container" left='50%' w='50%'
            zIndex='100' 
            transition='all 0.6s ease-in-out'
            top='0' h='100%' overflow='hidden'
            position='absolute'
            borderRadius={isActive ? '0 150px 100px 0' : '150px 0 0 100px'}
            transform={isActive ? 'translateX(-100%)' : 'translateX(0)'}
            >
                <Flex className="toggle" width='200%' h='100%'
                left='-100%'
                position='absolute'
                transform={isActive? 'translateX(50%)':'translateX(0)'}
                transition='all 0.6s ease-in-out'> 
                    <ToggleLeft onToggle={() => setIsActive(false)} isActive={isActive}/>
                    <ToggleRight onToggle={() => setIsActive(true)} isActive={isActive}/>
                </Flex>
            </Flex>
        </Flex>
    );
};