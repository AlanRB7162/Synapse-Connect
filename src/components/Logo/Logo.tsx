//src/components/Logo/Logo.tsx

import { Flex } from '@chakra-ui/react';
import { GradientBrainIcon } from './GradientBrainIcon';
import CircularText from './CircularText'; // Presumindo que você já tem esse componente

export function Logo() {
  return (
    <Flex
      align="center"
      justify="center"
      position="relative"
      width="80px"
      height="80px"
    >
      <CircularText
        text="SYNAPSE ♦ CONNECT ♦ "
        onHover="speedUp"
        spinDuration={20}
        className="custom-class"
      />
      <Flex position="absolute" top="50%" left="50%" transform="translate(-75%, -50%)" >
        <GradientBrainIcon />
      </Flex>
    </Flex>
  );
}
