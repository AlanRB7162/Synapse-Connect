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
        fontSize='2rem'
        fontWeight="bold"
      >
        SYNAPSE
      </Heading>
      <Heading
        as="h2"
        size="md"
        className="gradient-text"
        fontSize='2rem'
        fontWeight="bold"
      >
        CONNECT
      </Heading>
    </Box>
  );
}
