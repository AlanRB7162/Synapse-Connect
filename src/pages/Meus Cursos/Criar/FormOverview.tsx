import { Box, Button, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react";
import { ElementType } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { CursoDados } from "./FormDados";
import { VideoAula } from "./FormConteudo";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";

interface FormOverviewProps {
    dados: CursoDados | null;
    videos: VideoAula[];
    onVoltar: () => void;
}

export function FormOverview({ onVoltar, dados, videos }: FormOverviewProps){

    function getRandomColor() {
    const colors = [
        "#F87171", // vermelho
        "#60A5FA", // azul
        "#34D399", // verde
        "#FBBF24", // amarelo
        "#A78BFA", // roxo
        "#F472B6", // rosa
        "#FACC15", // amarelo forte
        "#22D3EE", // ciano
    ];
    return colors[Math.floor(Math.random() * colors.length)];
    }

    const user = useAuth();

    async function handleFinalizar(){
        try{
            let formData: FormData | null = null;
            
            const userId = user?.user?.id

            let dataToSend: any = {
                nome: dados?.nomeCurso,
                descricao: dados?.descCurso,
                nivel: dados?.nivel,
                preco: dados?.preco,
                categorias: dados?.categoria,
                videos: videos.map((v) => ({ videoId: v.videoId })),
                autor: userId
            };

            if (dados && typeof dados.capa !== "string" && dados.capa instanceof File) {
                formData = new FormData();
                formData.append("capa", dados.capa);
                for (const key in dataToSend) {
                    formData.append(key, JSON.stringify(dataToSend[key]));
                }
            } else {
                dataToSend.capa = dados?.capa; // string (URL)
            }

            const response = await axios.post("http://localhost:3001/cursos/criar", formData || dataToSend, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    ...(formData ? { "Content-Type": "multipart/form-data" } : { "Content-Type": "application/json" }),
                },
            });
            // TODO: Criar rota /cursos/criar no backend
            // TODO: Redirecionar ou mostrar toast após sucesso
        } catch (error) {
            console.error("Erro ao criar curso:", error);
            // TODO: Exibir toast de erro
        }
    }

    return(
        <Flex className="form-overview" w="100%" h="100%" px={10}
        direction="column" gap={1}>
            <Heading size={{base: "2xl", sm: "4xl" }} fontWeight="bolder" className="gradient-text">Visão Geral do Curso</Heading>	
            <Text fontSize={{base: "xs", sm: "md" }} color="gray.400">Confirme os dados inseridos antes de finalizar a criação do seu curso.</Text>

            <Box height='1px' width='100%' my={5} bg="gray.300"/>

            <Flex direction="column" gap={4}>
                <Text fontSize={{base: "sm", sm: "lg" }} color="gray.100" fontWeight="bold">Principais informações do seu curso</Text>
                    <Flex gap={4} direction={dados?.capa ? {base: "column", md: "row"} : "column"}>
                        <Flex direction="column">
                            <Text fontSize="lg" fontWeight="bolder" className="gradient-text">Capa do curso</Text>
                            {dados?.capa ? (
                                <Box maxW="300px" maxH="200px" overflow="hidden" borderRadius="8px" boxShadow="md">
                                    <Image
                                        width="100%" height="auto" display="block"
                                        src={
                                            typeof dados?.capa === "string"
                                            ? dados.capa
                                            : dados?.capa instanceof File
                                            ? URL.createObjectURL(dados.capa)
                                            : undefined
                                        }
                                        objectFit="cover"
                                        alt="Capa do curso"
                                    />
                                </Box>
                            ) : (
                                <Text 
                                    fontSize="md"
                                    borderRadius="md"
                                    p={2}
                                    whiteSpace="pre-wrap"
                                    overflowWrap="break-word"
                                    maxW="100%"
                                    wordBreak="break-word"
                                    minW="0"
                                    color="gray.400"
                                >
                                    Você não adicionou uma capa ao seu curso, ele será adicionado com uma capa padrão.
                                </Text>
                            )}  
                        </Flex>

                        <Flex direction="column" flex={1} gap={3} minW={0}>
                            <Flex direction="column" minW={0} gap={2}> 
                                <Text fontSize="lg" fontWeight="bolder" className="gradient-text">Nome do curso</Text>
                                <Text 
                                    fontSize="md"
                                    border="1px solid rgb(126, 126, 126)"
                                    borderRadius="md"
                                    p={4}
                                    whiteSpace="pre-wrap"
                                    overflowWrap="break-word"
                                    maxW="100%"
                                    wordBreak="break-word"
                                    minW="0"
                                >
                                    {dados?.nomeCurso}
                                </Text>
                            </Flex>
                            
                            {dados?.descCurso && (
                                <Flex direction="column" minW={0} gap={2}>
                                    <Text fontSize="lg" fontWeight="bolder" className="gradient-text">Descrição do curso</Text>
                                    <Text 
                                        fontSize="md"
                                        border="1px solid rgb(126, 126, 126)"
                                        borderRadius="md"
                                        p={4}
                                        whiteSpace="pre-wrap"
                                        overflowWrap="break-word"
                                        maxW="100%"
                                        wordBreak="break-word"
                                        minW="0"
                                    >
                                        {dados?.descCurso}
                                    </Text>
                                </Flex>
                            )}

                            <Flex direction="column" minW={0} gap={2}>
                                    <Text fontSize="lg" fontWeight="bolder" className="gradient-text">
                                        {dados?.categoria && dados.categoria.length > 1 ? "Categorias" : "Categoria"} do curso
                                    </Text>
                                    <Flex gap={2} wrap="wrap" flex={1} direction="row">
                                    {dados?.categoria && dados.categoria.length > 0 ? (
                                        dados.categoria.map((cat, index) => {
                                            const color = getRandomColor();
                                            return (
                                                <Flex
                                                    key={index}
                                                    align="center"
                                                    border="1px solid rgb(126, 126, 126)"
                                                    borderRadius="20px"
                                                    p={2}
                                                    px={5}
                                                    whiteSpace="nowrap"
                                                    gap={2}
                                                    alignItems="center"
                                                >
                                                    <Box
                                                        w={3}
                                                        h={3}
                                                        borderRadius="full"
                                                        bg={color}
                                                    />
                                                    <Text fontSize="md" flex="none">
                                                        {cat}
                                                    </Text>
                                                </Flex>
                                            );
                                        })
                                    ) : (
                                        <Text>Nenhuma categoria selecionada</Text>
                                    )}
                                    </Flex>
                            </Flex>

                            <Flex gap={4} direction={{base: "column", md: "row"}}>
                                <Flex direction="column" minW={0} gap={2} flex={1}>
                                    <Text fontSize="lg" fontWeight="bolder" className="gradient-text">Nível do curso</Text>
                                <Text 
                                    fontSize="md"
                                    border="1px solid rgb(126, 126, 126)"
                                    borderRadius="md"
                                    p={4}
                                    whiteSpace="pre-wrap"
                                    overflowWrap="break-word"
                                    maxW="100%"
                                    wordBreak="break-word"
                                    minW="0"
                                >
                                    {dados?.nivel}
                                </Text>
                                </Flex>

                                <Flex direction="column" minW={0} gap={2} flex={1}>
                                    <Text fontSize="lg" fontWeight="bolder" className="gradient-text">Preço do curso</Text>
                                <Text 
                                    fontSize="md"
                                    border="1px solid rgb(126, 126, 126)"
                                    borderRadius="md"
                                    p={4}
                                    whiteSpace="pre-wrap"
                                    overflowWrap="break-word"
                                    maxW="100%"
                                    wordBreak="break-word"
                                    minW="0"
                                >
                                    {dados?.preco}
                                </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex>

                    </Flex>
            </Flex>

            <Box height='1px' width='100%' my={5} bg="gray.300"/>

            <Flex direction="column" gap={4}>
                <Text fontSize={{base: "sm", sm: "lg" }} color="gray.100" fontWeight="bold">Conteúdo do seu curso</Text>
                <Flex wrap="wrap" gap={6} mt={4} justify="center">
                    {videos.map((video, index) => (
                        <Flex direction="column" key={index}>
                            <Text fontWeight="medium" mb={1}>Vídeo {index + 1}</Text>
                            <iframe
                                width="300"
                                height="170"
                                src={`https://www.youtube.com/embed/${video.videoId}`}
                                title={`Vídeo ${index + 1}`}
                                allowFullScreen
                                style={{ borderTopLeftRadius:"6px", borderTopRightRadius:"6px", border: "2px solid #ECB251" }}
                            />
                        </Flex>
                    ))}
                </Flex>
            </Flex>

            <Flex justify="space-between" mt={6}>
                <Button w={{base: "50px", md: "150px"}} alignSelf="end" borderRadius="8px"
                background="linear-gradient(to right,rgb(163, 159, 151),rgb(107, 102, 94))"
                color="rgb(76, 76, 75)"
                onClick={onVoltar}
                >
                    <Icon as={FaArrowLeft as ElementType} className='fa-house'/>
                    <Text display={{ base: "none", md: "inline" }}>
                        Voltar
                    </Text>
                </Button>
                <Button w={{base: "50px", md: "150px"}} alignSelf="end" borderRadius="8px"
                background="linear-gradient(to right, #F1CA84, #ECB251)"
                color="#6d5223"
                onClick={handleFinalizar}
                >
                    <Text display={{ base: "none", md: "inline" }}>
                        Finalizar
                    </Text>
                    <Icon as={FaArrowRight as ElementType} className='fa-house'/>
                </Button>
            </Flex>
        </Flex>
    )
}