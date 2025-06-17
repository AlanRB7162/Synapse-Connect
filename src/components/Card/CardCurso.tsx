import { Box, Button, Card, Flex, Icon, Image, LinkOverlay, Text } from "@chakra-ui/react";
import { ElementType } from "react";
import { FaDoorOpen, FaPlay, FaX } from "react-icons/fa6";
import { Avatar } from "../Avatar/Avatar";
import './CardCurso.css'
import { useAuth } from "../../contexts/AuthContext";
import type { Curso } from "../../types/Curso";
import Tilt from 'react-parallax-tilt';
import { Link, useNavigate } from "react-router-dom";

interface CardCursoProps {
  curso: Curso;
  onDelete?: (id: string) => void;
}

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

export function CardCurso({ curso, onDelete }: CardCursoProps) {
    const { user } = useAuth();
    const navigate = useNavigate();

    return(
        <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.05}>
            <Card.Root variant='elevated' minW={curso.categorias?.length === 3 ? '280px' : '260px'} h="100%" overflow='hidden' gap={2}>
                <Box position="relative" w="100%" h="200px">
                    <Image
                        src={curso.imagemUrl || '/images/curso-default.png'}
                        h="100%"
                        w="100%"
                        objectFit="cover"
                        onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/images/curso-default.png';
                        }}
                    />

                    {onDelete && (
                        <Button
                        size="xs"
                        position="absolute"
                        top="10px"
                        right="10px"
                        bg="rgba(0, 0, 0, 0.6)"
                        borderRadius="full"
                        onClick={() => onDelete(curso.id)}
                        title="Excluir curso"
                        aria-label="Excluir curso"
                        zIndex={10}
                        backdropFilter="blur(4px)"
                        >
                        <Icon as={FaX as ElementType} className="icon"/>
                        </Button>
                    )}

                    <Box
                        position="absolute"
                        top="10px"
                        left="10px"
                        bg="rgba(0, 0, 0, 0.6)"
                        color="white"
                        fontSize="xs"
                        fontWeight="bold"
                        px={2}
                        py={1}
                        borderRadius="md"
                        backdropFilter="blur(4px)"
                    >
                        {curso.nivel}
                    </Box>
                </Box>
                <Card.Body px='15px' gap={1} alignItems="start" justifyContent="start">
                    <Flex gap={2} wrap="wrap" direction="row">
                        {curso?.categorias && curso.categorias.length > 0 ? (
                            curso.categorias.map((cat, index) => {
                                const color = getRandomColor();
                                return (
                                    <Flex
                                        key={index}
                                        align="center"
                                        border="1px solid rgb(126, 126, 126)"
                                        borderRadius="20px"
                                        p={1}
                                        px={2}
                                        whiteSpace="nowrap"
                                        gap={2}
                                        alignItems="center"
                                        h="30px"
                                    >
                                        <Box
                                            w={2}
                                            h={2}
                                            borderRadius="full"
                                            bg={color}
                                        />
                                        <Text fontSize="xs" flex="none">
                                            {cat}
                                        </Text>
                                    </Flex>
                                );
                            })
                        ) : (
                            <Text>Nenhuma categoria selecionada</Text>
                        )}
                    </Flex>
                    <Card.Title fontSize='1xl' truncate>{curso.nome}</Card.Title>
                    <Card.Description fontSize='sm' className="truncate-multiline">{curso.descricao}</Card.Description>
                    <Flex className="autor-curso" align='center' gap={2}>
                        <Avatar size="xs" user={curso.autor}/>
                        <Text className="autor-name" fontSize='sm' color='gray.400' cursor="pointer"
                        onClick={() => navigate(`/perfil/${curso.autor.nome}`)}>
                            {curso.autor.nome}
                        </Text>
                    </Flex>
                    <Text textStyle='3xl' fontWeight='bold' letterSpacing='tight'>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(curso.preco)}
                    </Text>
                </Card.Body>
                <Card.Footer justifyContent='end' p='10px' px={4}>
                    {!user && (
                    <Button className="btFav" variant='outline' size='sm' p='5px' w="100%"
                    onClick={() => navigate('/entrar')}>
                        <Icon as={FaDoorOpen as ElementType} className='icon fa-door-open'/>Entrar
                    </Button>
                    )}
                    {user && (
                    <Button className="btFav" variant='outline' size='sm' p='5px' w="100%"
                    onClick={() => navigate(`/curso/${curso.id}/conteudo`)}>
                        <Icon as={FaPlay as ElementType} className="fa-star"/>
                        Ver Curso
                    </Button>
                    )}
                </Card.Footer>
            </Card.Root>
        </Tilt>
    )
}