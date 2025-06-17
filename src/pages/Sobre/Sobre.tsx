import { Box, Text, Heading, Flex, Image } from '@chakra-ui/react';

export function Sobre() {
  return (
    <Flex direction='column' mt={12}>
        <Flex w="100%" direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" mb={5}>
          <Image w={{base:"100%", md:'50%'}} objectFit="cover" h="100%"
          src='/images/sobre-page/cerebro.png'
          onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // evita loop caso a imagem fallback também falhe
              target.src = '/images/sobre-page/cerebro.png';
          }}/>
          <Box flex={1} p="15px" h="100%" alignContent="center">
            <Heading as="h2" size={{base:"3xl", sm:"5xl", md:"3xl", lg:"5xl", xl:"7xl"}} mb={4}>
              Nossa Missão
            </Heading>
            <Text fontSize={{base:"md", sm:"xl", md:"md", lg:"xl", xl:"2xl"}}>
              Nossa empresa nasceu com o propósito de resolver uma das principais dificuldades que as pessoas enfrentam hoje: a falta de tempo e acessibilidade para aprender e se aprimorar em novos temas. Entendemos que a rotina do dia a dia pode ser corrida e que, muitas vezes, é desafiador encontrar cursos que realmente se encaixem nas necessidades imediatas de quem busca aprendizado prático e acessível.
            </Text>
          </Box>
        </Flex>
        <Flex w="100%"   direction={{ base: 'column', md: 'row' }} justify="space-between" align="center" mb={5}>
          <Box flex={1} p="15px" order={{base: 1, md:0}} h="100%" alignContent="center">
             <Heading as="h2" size={{ base: "3xl", sm: "5xl", md: "3xl", lg: "5xl", xl: "7xl" }} mb={4}>
              Quem somos?
            </Heading>
            <Text fontSize={{base:"md", sm:"xl", md:"md", lg:"xl", xl:"2xl"}}>
              Somos uma plataforma de cursos online voltados para a área de tecnologia, criada com o propósito de compartilhar conhecimento de forma acessível e sem barreiras.
              Acreditamos que a educação tecnológica deve estar ao alcance de todos, independentemente da condição social, localização ou experiência prévia. 
            </Text>
          </Box>
          <Image w={{base:"100%", md:'50%'}} objectFit="cover" h="100%"
          src='/images/sobre-page/cerebro.png'
          onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // evita loop caso a imagem fallback também falhe
                    target.src = '/images/sobre-page/cerebro.png';
                }}
          />
        </Flex>
        <Flex w="100%" direction={{ base: 'column', md: 'row' }} justify="space-between" align="center">
          <Image w={{base:"100%", md:'50%'}} objectFit="cover"  h="100%"
          src='/images/sobre-page/cerebro.png'
          onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null; // evita loop caso a imagem fallback também falhe
              target.src = '/images/sobre-page/cerebro.png';
          }}/>
          <Box flex={1} p="15px" h="100%" alignContent="center">
            <Heading as="h2" size={{base:"3xl", sm:"5xl", md:"3xl", lg:"5xl", xl:"7xl"}} mb={4}>
              Nosso objetivo
            </Heading>
            <Text fontSize={{base:"md", sm:"xl", md:"md", lg:"xl", xl:"2xl"}}>
              Nosso objetivo é formar e capacitar pessoas para o mercado digital, oferecendo conteúdos atualizados, práticos e de fácil compreensão.
              Aqui, você encontra cursos sobre programação, desenvolvimento web, design, ferramentas digitais e muito mais.
            </Text>
          </Box>
        </Flex>
      </Flex>
  );
}

export default Sobre;
    
