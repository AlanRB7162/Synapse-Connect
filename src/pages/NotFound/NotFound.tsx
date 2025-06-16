import { Button, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { LogoTitle } from "../../components/Logo/LogoTitle";
import './NotFound.css'
import { FaHouse } from "react-icons/fa6";
import { ElementType } from "react";
import { useNavigate } from "react-router-dom";

export function NotFound(){
    const navigate = useNavigate();
    return(
        <Flex className="notfound-container" w='100%' h='100%' minH="500px" flex={1}
        direction='column' justify='center' gap={5} px={12}>
            <Flex align='center' justify='space-between'>
                <LogoTitle/>
            </Flex>
            <Flex className="erro-nf" gap={5}>
                <Text className='cod-nf' fontSize='3xl'>404.</Text>
                <Text fontSize='3xl' color='gray.200'>Código de ERRO.</Text>
            </Flex>
            <Flex className="msg-nf" direction='column'>
                <Text>A página que você está buscando não foi encontrada pelo nosso servidor.</Text>
                <Text color='gray.400'>Isso é tudo que sabemos.</Text>
            </Flex>
            <Button className="nf-bth" w={{base:'100%', md:'40%'}} onClick={() => navigate('/')}>
                <Icon as={FaHouse as ElementType} className='fa-house'/>
                Voltar para a Home
            </Button>
        </Flex>
    )
}