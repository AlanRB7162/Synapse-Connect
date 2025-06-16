import { Box, Button, Collapsible, Flex, Icon, Text } from "@chakra-ui/react";
import { ElementType, useState } from "react";
import { FaBook, FaBookOpen, FaChevronDown, FaChevronRight, FaPlus, FaScrewdriverWrench } from "react-icons/fa6";
import './CursosCollapsible.css'
import { useNavigate } from "react-router-dom";

export function CursosCollapsible(){
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    return(
    <Collapsible.Root justifyContent="center" alignItems="center" w="100%">
        <Collapsible.Trigger w="100%" transition="0.1s">
            <Button onClick={() => setIsOpen(!isOpen)} id="btCursosCollapsible" className="user-avatar-button btCursosCollapsible" 
            variant='outline' width='100%' p="5px" px={10}
            justifyContent="space-between"
            transition="0.1s">
                <Icon as={FaBook as ElementType}/>
                <Box flex="1" textAlign="center" overflow="hidden">
                    Cursos
                </Box>
                <Icon as={FaChevronDown as ElementType} 
                transition="transform 0.3s ease"
                transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}/>
            </Button>   
        </Collapsible.Trigger>
        <Collapsible.Content alignSelf="center" w="100%"
        alignItems="center" justifyContent="center" mt={2} py={2}>
            <Flex gap={4} align="center" pr={4}>
                <Icon as={FaChevronRight as ElementType}/>
                <Button id="btAddCurso" className="user-avatar-button btAddCurso" 
                flex={1} variant='outline' width='100%' p="5px" px={5} mb={2}
                onClick={()=>navigate("/meus-cursos/criar")}>
                    <Icon as={FaPlus as ElementType}/>
                    <Text flex="1" textAlign="center">Criar Novo Curso</Text>
                </Button>
            </Flex>
            <Flex gap={4} align="center" pr={4}>
                <Icon as={FaChevronRight as ElementType}/>
                <Button id="btAddCurso" className="user-avatar-button btAddCurso" flex={1} variant='outline' width='100%' p="5px" px={5} mb={2}>
                    <Icon as={FaScrewdriverWrench as ElementType}/>
                    <Text flex="1" textAlign="center">Cursos Criados</Text>
                </Button>
            </Flex>
            <Flex gap={4} align="center" pr={4}>
                <Icon as={FaChevronRight as ElementType}/>
                <Button id="btAddCurso" className="user-avatar-button btAddCurso" flex={1} variant='outline' width='100%' p="5px" px={5}>
                    <Icon as={FaBookOpen as ElementType}/>
                    <Text flex="1" textAlign="center">Cursos Comprados</Text>
                </Button>
            </Flex>
        </Collapsible.Content>
    </Collapsible.Root>
    )
}