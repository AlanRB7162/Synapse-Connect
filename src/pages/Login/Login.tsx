//src/pages/Login/Login.tsx

import { Flex } from "@chakra-ui/react";
import './Form/Form.css'
import './Toggle/Toggle.css'
import './Login.css'
import { LoginMd } from "./LoginMd";
import { LoginBs } from "./LoginBs";

export function Login(){
    return(
        <Flex className='login-page'  
        maxW="1000px" w='100%' minH={{base:'800px', md:'500px'}}
        position="relative" overflow="hidden"
        borderRadius='16px' mt='25px'
        mx='15px'
        >
            <LoginMd/>
            <LoginBs/>
        </Flex>
    );
};