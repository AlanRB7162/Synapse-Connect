//src/components/Footer/Footer.tsx

import { FaCircleInfo, FaCircleQuestion, FaFile, FaGithub, FaLinkedin, FaShieldHalved, FaSquareInstagram, FaUpRightFromSquare, FaYoutube } from 'react-icons/fa6';
import { Blockquote, Box, Code, Flex, Icon, Link, Text } from '@chakra-ui/react';
import { ElementType } from 'react';
import { LogoTitle } from '../Logo/LogoTitle';
import './Footer.css'

export function Footer(){
    return(
        <Flex as="footer" px={8} py={4} direction='column' gap={4} pt='25px'>
            <Flex className='conteudo' direction={{base:'column', md:'row'}}>
                <Flex className='descricao' width={{base:'100%', md:'50%'}} justify='center' direction='column' pr='20px'>
                    <LogoTitle/>
                    <Blockquote.Root mt='10px' p='10px'>
                        <Blockquote.Content>
                            Synapse Connect é uma plataforma fictícia de cursos online criada como parte de um projeto acadêmico de programação. 
                            <br/>Todos os dados são simulados.
                        </Blockquote.Content>
                    </Blockquote.Root>
                </Flex>
                <Box height={{base:'1px', md:'200px'}} width={{base:'100%', md:'1px'}} my={{base:'20px', md:'0px'}} bg="gray.300"/>
                <Flex className='redes' width={{base:'100%', md:'25%'}} justify='center' direction='column' pl='20px' pr='20px'>  
                    <Text className='text'>Contatos:</Text>
                    <Flex><Link variant='underline' href='https://github.com/AlanRB7162/Synapse-Connect' className='link'><Icon as={FaGithub as ElementType} className='icon'/>GitHub<Icon as={FaUpRightFromSquare as ElementType} className='external'/></Link></Flex>
                    <Flex><Link variant='underline' href='/' className='link'><Icon as={FaLinkedin as ElementType} className='icon'/>LinkedIn<Icon as={FaUpRightFromSquare as ElementType} className='external'/></Link></Flex>
                    <Flex><Link variant='underline' href='/' className='link'><Icon as={FaSquareInstagram as ElementType} className='icon'/>Instagram<Icon as={FaUpRightFromSquare as ElementType} className='external'/></Link></Flex>
                    <Flex><Link variant='underline' href='/' className='link'><Icon as={FaYoutube as ElementType} className='icon'/>YouTube<Icon as={FaUpRightFromSquare as ElementType} className='external'/></Link></Flex>
                </Flex>
                <Box height={{base:'1px', md:'200px'}} width={{base:'100%', md:'1px'}} my={{base:'20px', md:'0px'}} bg="gray.300"/>
                <Flex className='links' width={{base:'100%', md:'25%'}} justify='center' direction='column' pl='20px'>
                    <Text className='text'>Links:</Text>
                    <Flex><Link variant='underline' href='/sobre' className='link'><Icon as={FaCircleInfo as ElementType} className='icon'/>Sobre</Link></Flex>
                    <Flex><Link variant='underline' href='/' className='link'><Icon as={FaCircleQuestion as ElementType} className='icon'/>FAQ</Link></Flex>
                    <Flex><Link variant='underline' href='/' className='link'><Icon as={FaFile as ElementType} className='icon'/>Termos de Uso</Link></Flex>
                    <Flex><Link variant='underline'href='/' className='link'><Icon as={FaShieldHalved as ElementType} className='icon'/>Política de Privacidade</Link></Flex>
                </Flex>
            </Flex>
            <Box height='1px' width='100%' bg="gray.300" mt={{base:'20px', md:'0px'}}/>
            <Flex className='direitos' justify='center'>
                <Code>{`console.log("© 2025 SYNAPSE CONNECT — Projeto Acadêmico para Fins de Aprendizado");`}</Code>
            </Flex>
        </Flex>
    );
}