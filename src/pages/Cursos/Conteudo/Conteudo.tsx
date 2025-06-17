import { Flex, IconButton, Box, Icon } from "@chakra-ui/react";
import { ElementType, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Video {
  videoId: string;
  ordem: number;
}

export function Conteudo() {
  const { id } = useParams<{ id: string }>();
  const [videos, setVideos] = useState<Video[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3001/conteudos/${id}`);
        if (!res.ok) throw new Error("Erro ao buscar vídeos");
        const data = await res.json();
        setVideos(data.videos);
        setCurrentIndex(0);
      } catch (error) {
        console.error(error);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchVideos();
  }, [id]);

  function handlePrev() {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  }

  function handleNext() {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  }

  if (loading) return <Flex justify="center" align="center" h="100vh">Carregando vídeos...</Flex>;

  if (!videos.length) return <Flex justify="center" align="center" h="100vh">Nenhum vídeo encontrado.</Flex>;

  return (
    <Flex direction="column" align="center" gap={4} p={4} w="100%" pt={12} mt={2}>
        <Flex align="center" gap={5}>
        <IconButton
            aria-label="Vídeo anterior"
            onClick={handlePrev}
            disabled={videos.length <= 1}
            borderRadius="full"
            background='linear-gradient(to right, #F1CA84, #ECB251)' 
            color='#6d5223;'
        >
            <Icon as={FaChevronLeft as ElementType}/>
        </IconButton>
      <Box position="relative" w="800px" h="450px">
        <iframe
          width="800"
          height="450"
          src={`https://www.youtube.com/embed/${videos[currentIndex].videoId}`}
          title="Vídeo do curso"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ borderRadius: "6px", border: "3px solid #ECB251" }}
        />
      </Box>
        <IconButton
            aria-label="Próximo vídeo"
            onClick={handleNext}
            disabled={videos.length <= 1}
            borderRadius="full"
            background='linear-gradient(to right, #F1CA84, #ECB251)' 
            color='#6d5223'
        >
            <Icon as={FaChevronRight as ElementType}/>
        </IconButton>
        </Flex>
      <Flex gap={2} wrap="wrap" justify="center">
        {videos.map((v, idx) => (
          <Box
            key={v.videoId}
            cursor="pointer"
            px={3}
            py={1}
            borderRadius="md"
            bg={idx === currentIndex ? 'linear-gradient(to right, #F1CA84, #ECB251)' : "transparent"}
            color={idx === currentIndex ? "#6d5223;" : "gray"}
            border={idx === currentIndex ? "#6d5223 1px solid" : "gray 2px solid"}
            onClick={() => setCurrentIndex(idx)}
          >
            Vídeo {idx + 1}
          </Box>
        ))}
      </Flex>
    </Flex>
  );
}
