
import { useEffect, useState } from "react";
import { TerminalFakeCode } from "../../components/TerminalFakeCode/TerminalFakeCode";
import { Blockquote, Box, Flex, Heading, HStack, Skeleton, SkeletonCircle, SkeletonText, Stack, Text } from "@chakra-ui/react";
import { CardCurso } from "../../components/Card/CardCurso";
import axios from "axios";

export function Home(){
    const [categoriasComCursos, setCategoriasComCursos] = useState<{ nome: string, cursos: any[] }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchCategoriasECursos() {
        try {
          const { data: categorias } = await axios.get("http://localhost:3001/categoria");
          
          const categoriasValidas = await Promise.all(
            categorias.map(async (cat: any) => {
              const { data: cursos } = await axios.get(`http://localhost:3001/cursos/categoria/${cat.nome}`);
              if (cursos.length > 0) {
                return { nome: cat.nome, cursos };
              }
              return null;
            })
          );

          setCategoriasComCursos(categoriasValidas.filter(Boolean));
        } catch (error) {
          console.error("Erro ao buscar categorias/cursos", error);
        } finally {
          setLoading(false);
        }
      }

      fetchCategoriasECursos();
    }, []);

    if (loading) {
      return (
        <Flex justify="center">
          <Stack gap="6" maxW="xs">
            <HStack width="full">
              <SkeletonCircle size="10" />
              <SkeletonText noOfLines={2} />
            </HStack>
            <Skeleton height="200px" />
          </Stack>
        </Flex>
      );
    }

    return(
      <Flex className="home-container" w="100%" direction="column" gap={3}> 
        <Flex className="hero-animated-bg" 
        px={{base: 5, md: 8}} pt={{base: 12, sm: 8, md: 0}} 
        minH={{base: "430px", sm: "320px", lg: "400px"}} align="center" 
        gap={{base: 4, sm: 4}} 
        direction={{base: "column", sm: "row"}}>
            <Flex className="hero-message" pt={{base: 4, sm: 0}} w={{base: "100%", sm: "50%"}} direction="column">
                <Heading className="hero-gradient-text" size={{base:"3xl", sm: "xl", md: "4xl", lg: "5xl", xl: "6xl"}} fontWeight="bolder">
                  Conecte saberes,
                </Heading>
                <Heading className="hero-gradient-text" size={{base:"2xl", sm: "lg", md: "3xl", lg: "4xl", xl: "5xl"}} fontWeight="bolder" ml={{base: 0.5, md: 1.75, xl: 2}} mt={{base: -2.5, md: -3, xl: -5}}>
                  transforme o mundo.
                </Heading>
                <Blockquote.Root mt='10px' p='10px' fontSize={{base: "xs", md: "sm", lg: "md", xl: "lg"}}>
                    <Blockquote.Content color="gray.300">
                        Sua jornada de aprendizado começa aqui. Cursos, ideias e conexões que expandem sua mente.
                    </Blockquote.Content>
                </Blockquote.Root>
            </Flex>
            <Flex className="hero-content" dir="column" w={{base: "100%", sm: "50%"}} justify={{base: "center", sm: "end"}}>
                <TerminalFakeCode/>
            </Flex>
        </Flex>
        <Flex align="center" justify="center" direction="column" px={2} mt={4} gap={3}>
          <Text 
              fontSize="xs"
              border="1px solid rgb(126, 126, 126)"
              borderRadius="40px"
              p={2}
          >
              Cursos em destaque
          </Text>
          <Flex direction="column" justify="center" align="center">
            <Heading size={{base:"2xl", sm: "lg", md: "3xl", lg: "4xl", xl: "5xl"}} fontWeight="bolder">
              Eleve suas
            </Heading>
            <Heading className="hero-gradient-text" size={{base:"3xl", sm: "xl", md: "4xl", lg: "5xl", xl: "6xl"}} fontWeight="bolder" ml={{base: 0.5, md: 1.75, xl: 2}} mt={{base: -2.5, md: -3, xl: -5}}>
              HABILIDADES
            </Heading>
          </Flex>
          <Text fontSize={{base:"xs", sm: "xs", md: "sm", lg: "md", xl: "lg"}} color="gray.400" textAlign="center">Conteúdos escolhidos a dedo por quem entende, <br/> feitos para transformar sua trajetória profissional.</Text>
        </Flex>

        <Box height='1px' width='100%' my={5} bg="gray.300"/>

        <Flex direction="column" gap={8} px={3} py={4}>
          {categoriasComCursos.map(({ nome, cursos }) => (
            <Box key={nome}>
              <Heading size="4xl" mb={3} className="gradient-text" fontWeight="bolder">{nome}</Heading>
              <Flex overflowX="auto" gap={4} px={4} py={5} borderRadius="10px"
              background="rgba(30, 30, 30, 0.6)" /* mais escuro e semi-transparente */
              backdrop-filter="blur(10px)"      /* efeito vidro */
              border="1px solid rgba(255, 255, 255, 0.08)">
                {cursos.map(curso => (
                  <CardCurso key={curso.id} curso={{
                    id: curso.id,
                    nome: curso.nome,
                    descricao: curso.descricao,
                    preco: Number(curso.valor),
                    imagemUrl: curso.capa_url,
                    autor: {
                      nome: curso.autor_username,
                      avatar: curso.autor_avatar
                    },
                    categorias: curso.categorias,
                    nivel: curso.nivel
                  }} />
                ))}
              </Flex>
            </Box>
          ))}
        </Flex>
      </Flex>

    )
}