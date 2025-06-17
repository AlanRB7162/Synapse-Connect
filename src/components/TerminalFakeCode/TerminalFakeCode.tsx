// src/components/TerminalFakeCode.tsx

import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { ElementType } from "react";
import { FaChevronRight, FaRocket } from "react-icons/fa6";

export function TerminalFakeCode() {
  return (
    <Box
      backdropFilter="blur(8px)"
      background="rgba(16, 16, 20, 0.4)" // fundo translúcido adaptado
      border="1px solid rgba(255, 255, 255, 0.05)"
      borderRadius="md"
      p={0}
      fontFamily="'Fira Code', monospace"
      fontSize="sm"
      w="100%"
      maxW="380px"
      boxShadow="0 8px 24px rgba(0, 0, 0, 0.4)"
      overflow="hidden"
    >
      {/* Barra estilo MacOS */}
      <Flex bg="rgba(26, 26, 30, 0.65)" px={3} py={2} align="center" gap={2}>
        <Box bg="#ff5f56" borderRadius="full" boxSize="10px" />
        <Box bg="#ffbd2e" borderRadius="full" boxSize="10px" />
        <Box bg="#27c93f" borderRadius="full" boxSize="10px" />
        <Text ml={3} fontSize="xs" color="gray.400">
          synapse-terminal
        </Text>
      </Flex>

      {/* Conteúdo do terminal */}
      <Box px={4} py={3}>
        <Text color="#00FFFF">
          $ <span style={{ color: "#00ff88" }}>npx</span> create-synapse-app
        </Text>
        <Text color="gray.300"> Installing dependencies...</Text>
        <Text color="gray.300"><Icon as={FaChevronRight as ElementType} size="xs" color="gray.300" mr={1}/> Setting up environment...</Text>
        <Text color="#7CFC00">
            <Icon as={FaChevronRight as ElementType} size="xs" color="#7CFC00" mr={1}/> Your coding journey begins now!</Text>
        <Text color="#ff66cc" mt={2}>
            <Icon as={FaRocket as ElementType} size="xs" color="#ff66cc" mr={4}/>
            Let's build something amazing.</Text>
      </Box>
    </Box>
  );
}
