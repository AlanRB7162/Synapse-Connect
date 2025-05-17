//src/components/Logo/LogoTitle.tsx

import { Box, Heading } from '@chakra-ui/react';
import './LogoTitle.css'

export function LogoTitle() {
  return (
    <Box className="header-title">
      <Heading
        as="h2"
        size="md"
        className="gradient-text"
        fontSize={{ base: 'lg', md: 'xl' }}
      >
        SYNAPSE
      </Heading>
      <Heading
        as="h2"
        size="md"
        className="gradient-text"
        fontSize={{ base: 'lg', md: 'xl' }}
      >
        CONNECT
      </Heading>
    </Box>
  );
}
