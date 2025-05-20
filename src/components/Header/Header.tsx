//src/components/Header/Header.tsx

import { ElementType, useState } from 'react';
import { Avatar, Box, Button, Flex, Icon } from '@chakra-ui/react';
import { FaCartShopping, FaDoorOpen, FaMagnifyingGlass } from 'react-icons/fa6';
import { Logo } from '../Logo/Logo';
import { LogoTitle } from '../Logo/LogoTitle';
import InputLabel from '../Input/InputLabel';
import ButtonX from '../Buttons/ButtonX/ButtonX';
import './Header.css'
import { useNavigate } from 'react-router-dom';

export function Header() {
    const [search, setSearch] = useState("");

    const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"]

    const pickPalette = (name: string) => {
      const index = name.charCodeAt(0) % colorPalette.length
      return colorPalette[index]
    }

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // ALAN - atualize `isLoggedIn` após o login
    // ex: setIsLoggedIn(true) após login bem-sucedido

    return (
      <Flex as="header" px={8} py={4} align="center" justify="space-between" gap={4} className="header">
        <Flex id="logo" align="center" gap={4} flex="1">
          <Logo/>
          <LogoTitle/>
        </Flex>
        <Flex display={{ base: "none", md: "flex" }}align="center" gap={2} flex="1" minW="260px" className="input-pesquisar">
          <Icon as={FaMagnifyingGlass as ElementType} className="icon fa-magnifying-glass"/>
          <InputLabel
            id="pesquisa"
            label="Pesquisar"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <ButtonX/>
        </Flex>
        <Button display={{base:"flex", md:"none"}} id='btPesquisar' variant='ghost'><Icon as={FaMagnifyingGlass as ElementType} className='icon fa-magnifying-glass'/></Button>
        <Box height='50px' width='1px' bg="gray.300" className='linha'/>
        {isLoggedIn && (
        <Flex className='user-l-display' id='user-l-display'>
          <Button id='btCarrinho' className='btCarrinho' variant='ghost'><Icon as={FaCartShopping as ElementType} className='icon fa-cart-shopping'/></Button>
          <Flex className='user-avatar'>
            <Avatar.Root variant='subtle' shape='full' ml='10px' colorPalette={pickPalette("Synapse Connect")}>{/*PRECISAMOS PUXAR O NOME DO USUÁRIO LOGADO PARA CÁ*/}
              <Avatar.Fallback name='Synapse Connect'/>{/*PRECISAMOS PUXAR O NOME DO USUÁRIO LOGADO PARA CÁ*/}
              <Avatar.Image/>
            </Avatar.Root>
          </Flex>
        </Flex>
        )}
        {!isLoggedIn && (
        <Flex className='user-nl-display' id='user-nl-display'>
          <Button onClick={() => navigate("/login")} id='btLogin' className='btLogin' variant='ghost' p='7px'><Icon as={FaDoorOpen as ElementType} className='icon fa-door-open'/>Entrar</Button>
        </Flex>
        )}
      </Flex>
    );
}