import { Button, Flex } from "@chakra-ui/react";

export function NavRoutes(){
    return(
        <Flex className="nav-routes" direction='column' gap={3} align='center'>
            <Button variant='outline' w="95%">Home</Button>
            <Button variant='outline' w="95%">Cursos</Button>
            <Button variant='outline' w="95%">Sobre</Button>
            <Button variant='outline' w="95%">Sobre</Button>
            <Button variant='outline' w="95%">Sobre</Button>
            <Button variant='outline' w="95%">Sobre</Button>
        </Flex>
    )
}