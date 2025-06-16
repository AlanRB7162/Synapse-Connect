import InputLabel from "../../../components/Input/InputLabel";
import { Box, Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { ElementType, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaLink, FaPlus, FaX } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

interface FormConteudoProps {
  onVoltar: () => void;
  onAvancar: (videos: VideoAula[]) => void;
}

export interface VideoAula {
  url: string;
  videoId: string;
}

export function FormConteudo({ onVoltar, onAvancar }: FormConteudoProps){
    const [videoUrl, setVideoUrl] = useState("");
    const [videos, setVideos] = useState<VideoAula[]>([]);

    const navigate = useNavigate();

    const handleAdicionarVideo = () => {
        if (videos.length >= 3) {
            navigate("/meus-cursos/criar", {
                state: {
                    toast: {
                        title: "Limite atingido",
                        description: "Você só pode adicionar até 3 vídeos por curso.",
                        type: "warning",
                    }
                }
            });
            return;
        }

        const id = extrairVideoId(videoUrl);
        if (!id) {
            navigate("/meus-cursos/criar", {
                state: {
                    toast: {
                        title: "URL inválida",
                        description: "Insira uma URL válida do YouTube.",
                        type: "error",
                    }
                }
            })
            return;
        }

        const jaExiste = videos.some((v) => v.videoId === id);
        if (jaExiste) {
            navigate("/meus-cursos/criar", {
                state: {
                    toast: {
                        title: "Vídeo já adicionado",
                        description: "Esse vídeo já está na lista.",
                        type: "warning",
                    }
                }
            })
            return;
        }

        setVideos([...videos, { url: videoUrl, videoId: id }]);
        setVideoUrl("");
    };

    function extrairVideoId(url: string): string | null {
        const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }

    const handleAvancar = () => {
        if (videos.length === 0) {
            navigate("/meus-cursos/criar", {
                state: {
                    toast: {
                        title: "Nenhum vídeo adicionado",
                        description: "Adicione pelo menos um vídeo para avançar.",
                        type: "warning",
                    }
                }
            });
            return;
        }

        onAvancar(videos);
    };

    return(
        <Flex className="form-conteudo" w="100%" h="100%" px={{base: 4, md: 6, lg: 10}}
        direction="column" gap={1}>
            <Heading size={{base: "2xl", sm: "4xl" }} fontWeight="bolder">Conteúdo do Curso</Heading>	
            <Text fontSize={{base: "xs", sm: "xl" }} color="gray.400">Insira o conteúdo do seu curso</Text>

            <Box height='1px' width='100%' my={5} bg="gray.300"/>

            <Flex gap={4}>
                <Flex gap={4} w="100%">
                    <Icon as={FaLink as ElementType} alignSelf="center" className="icon"/>
                    <InputLabel
                        id="capa-url"
                        label="URL do Vídeo"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                    />
                </Flex>
                <Button onClick={handleAdicionarVideo} 
                w={{base: "50px", md: "160px"}} h="50px" borderRadius="8px"
                background="linear-gradient(to right, #F1CA84, #ECB251)"
                color="#6d5223"
                >
                    <Icon as={FaPlus as ElementType}/>
                    <Text display={{ base: "none", md: "inline" }}>
                        Adicionar Vídeo
                    </Text>
                </Button>
            </Flex> 
            <Text fontSize="sm" color="gray.500">*Limite de até 3 vídeos</Text>
            

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
                        <Button className="remover-conteudo"
                        borderBottomLeftRadius="md"
                        borderBottomRightRadius="md"
                        borderTopRadius="0"
                        background="linear-gradient(to right, #F1CA84, #ECB251)"
                        color="#6d5223" 
                        onClick={() => {
                            setVideos(videos.filter((_, i) => i !== index));
                            }}>
                            <Icon as={FaX as ElementType}/>
                        </Button>
                    </Flex>
                ))}
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
                onClick={handleAvancar}
                >
                    <Text display={{ base: "none", md: "inline" }}>
                        Avançar
                    </Text>
                    <Icon as={FaArrowRight as ElementType} className='fa-house'/>
                </Button>
            </Flex>
        </Flex>
    )
}