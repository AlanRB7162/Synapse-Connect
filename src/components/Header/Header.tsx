//src/components/Header/Header.tsx

import { ElementType, useState } from 'react';
import { Flex, Icon } from '@chakra-ui/react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Logo } from '../Logo/Logo';
import { LogoTitle } from '../Logo/LogoTitle';
import InputLabel from '../Input/InputLabel';
import ButtonX from '../Buttons/ButtonX/ButtonX';
import './Header.css'

export function Header() {
    const [search, setSearch] = useState("");

  return (
    <Flex as="header" px={8} py={4} align="center" justify="space-between" flexWrap="wrap" gap={4} className="header">
      {/* Logo + Título */}
      <Flex id="logo" align="center" gap={4} flex="1" minW="260px">
        <Logo/>
        <LogoTitle/>
      </Flex>

      {/* Campo de pesquisa */}
      <Flex display={{ base: "none", md: "flex" }}align="center" gap={2} flex="1" minW="260px" className="input-pesquisar">
        <Icon as={FaMagnifyingGlass as ElementType} className="fa-magnifying-glass"/>

        <InputLabel
          id="pesquisa"
          label="Pesquisar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <ButtonX/>
      </Flex>

    </Flex>
  );
}
