import { Button, Flex, Icon } from "@chakra-ui/react";
import { ElementType } from "react";
import { FaCircleInfo, FaHouse } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export function NavRoutes(){
    const navigate = useNavigate();

    return(
        <Flex className="nav-routes" direction='column' gap={3} align='center'>
            <Button variant='outline' w="95%" onClick={() => navigate("/")}>
                <Icon as={FaHouse as ElementType}/>
                Início
                </Button>
            <Button variant='outline' w="95%" onClick={() => navigate("/sobre")}>
                <Icon as={FaCircleInfo as ElementType}/>
                Sobre
                </Button>
        </Flex>
    )
}