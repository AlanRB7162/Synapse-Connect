import { Box, Text, Heading, Stack, Flex, Image } from '@chakra-ui/react';

export function Sobre() {
  return (
    <Flex direction='column'>
        <Flex w="100%"   direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" mb={12}>
          <Image w={{base:"100%", md:'50%'}} objectFit="cover"
          src='/images/sobre-page/camera-menor (1).png'
          onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // evita loop caso a imagem fallback também falhe
                    target.src = '/images/sobre-page/camera-menor (1).png';
                }}
          />
          <Box flex={1} m="15px">
            <Heading as="h2" size={{base:"3xl", sm:"5xl", md:"3xl", lg:"5xl", xl:"7xl"}} mb={4}>
              Nossa Missão
            </Heading>
            <Text fontSize={{base:"md", sm:"xl", md:"md", lg:"xl", xl:"2xl"}}>
              Nossa empresa nasceu com o propósito de resolver uma das principais dificuldades que as pessoas enfrentam hoje: a falta de tempo e acessibilidade para aprender e se aprimorar em novos temas. Entendemos que a rotina do dia a dia pode ser corrida e que, muitas vezes, é desafiador encontrar cursos que realmente se encaixem nas necessidades imediatas de quem busca aprendizado prático e acessível.
            </Text>
          </Box>
        </Flex>
        <Flex w="100%"   direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" mb={12}>
          <Box flex={1} m="15px" order={{base: 1, md:0}}>
             <Heading as="h2" size={{ base: "3xl", sm: "5xl", md: "3xl", lg: "5xl", xl: "7xl" }} mb={4}>
              Nossa Missão
            </Heading>
            <Text fontSize={{base:"md", sm:"xl", md:"md", lg:"xl", xl:"2xl"}}>
              Nossa empresa nasceu com o propósito de resolver uma das principais dificuldades que as pessoas enfrentam hoje: a falta de tempo e acessibilidade para aprender e se aprimorar em novos temas. Entendemos que a rotina do dia a dia pode ser corrida e que, muitas vezes, é desafiador encontrar cursos que realmente se encaixem nas necessidades imediatas de quem busca aprendizado prático e acessível.
            </Text>
          </Box>
          <Image w={{base:"100%", md:'50%'}} objectFit="cover"
          src='/images/sobre-page/camera-menor (1).png'
          onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // evita loop caso a imagem fallback também falhe
                    target.src = '/images/sobre-page/camera-menor (1).png';
                }}
          />
        </Flex>
        <Flex w="100%"   direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" mb={12}>
          <Image w={{base:"100%", md:'50%'}} objectFit="cover"
          src='/images/sobre-page/camera-menor (1).png'
          onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // evita loop caso a imagem fallback também falhe
                    target.src = '/images/sobre-page/camera-menor (1).png';
                }}
          />
          <Box flex={1} m="15px">
            <Heading as="h2" size={{base:"3xl", sm:"5xl", md:"3xl", lg:"5xl", xl:"7xl"}} mb={4}>
              Nossa Missão
            </Heading>
            <Text fontSize={{base:"md", sm:"xl", md:"md", lg:"xl", xl:"2xl"}}>
              Nossa empresa nasceu com o propósito de resolver uma das principais dificuldades que as pessoas enfrentam hoje: a falta de tempo e acessibilidade para aprender e se aprimorar em novos temas. Entendemos que a rotina do dia a dia pode ser corrida e que, muitas vezes, é desafiador encontrar cursos que realmente se encaixem nas necessidades imediatas de quem busca aprendizado prático e acessível.
            </Text>
          </Box>
        </Flex>
        </Flex>
  );
}

export default Sobre;
    
