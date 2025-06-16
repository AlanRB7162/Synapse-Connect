//src/pages/Login/Login.tsx

import { useState } from "react";
import { LoginMd } from "./LoginMd";
import { LoginBs } from "./LoginBs";
import { Flex } from "@chakra-ui/react";
import './Form/Form.css'
import './Toggle/Toggle.css'
import './Login.css'

export function Login(){
    const [isActive, setIsActive] = useState(false);

    return(
        <Flex className='login-page' w='100%' h="100%" minH={{base:'800px', md:'500px'}}
        position="relative" overflow="hidden" justify="center" align="center"
        borderRadius={{base: 0, md: '16px'}} py={{base: 0, md: 5}} px={{base: 0, md: 5}}
        mx={{base: 0, md: '10px'}} mt={{base: 0, md: 6}}
        >
            <LoginMd isActive={isActive} setIsActive={setIsActive}/>
            <LoginBs isActive={isActive} setIsActive={setIsActive}/>
        </Flex>
    );
};