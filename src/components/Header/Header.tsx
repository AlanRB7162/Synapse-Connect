//src/components/Header/Header.tsx

import { ElementType, useState } from 'react';
import { Box, Button, Flex, Icon } from '@chakra-ui/react';
import { FaDoorOpen, FaMagnifyingGlass } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../Logo/Logo';
import { LogoTitle } from '../Logo/LogoTitle';
import InputLabel from '../Input/InputLabel';
import ButtonX from '../Buttons/ButtonX/ButtonX';
import { PesquisarPopover } from '../Popover/PesquisarPopover/PesquisarPopover';
import { CarrinhoPopover } from '../Popover/CarrinhoPopover/CarrinhoPopover';
import { AvatarPopover } from '../Popover/AvatarPopover/AvatarPopover';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css'

export function Header() {
    const [search, setSearch] = useState("");

    const navigate = useNavigate();
    
    const { user } = useAuth();

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
          <ButtonX onClear={()=> setSearch("")}/>
        </Flex>
        <PesquisarPopover/>
        <Box height='50px' width='1px' bg="gray.300" className='linha'/>
        {user && (
          <Flex className='user-l-display' id='user-l-display'>
            <CarrinhoPopover/>
            <AvatarPopover/>
          </Flex>
        )}
        {!user && (
        <Flex className='user-nl-display' id='user-nl-display'>
          <Button onClick={() => navigate("/login")} id='btLogin' className='btLogin' variant='ghost' p='7px'><Icon as={FaDoorOpen as ElementType} className='icon fa-door-open'/>Entrar</Button>
        </Flex>
        )}
      </Flex>
    );
}