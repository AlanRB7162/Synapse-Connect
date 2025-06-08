import { Button, Card, Flex, Icon, Image, Text } from "@chakra-ui/react";
import { ElementType } from "react";
import { FaCircleInfo, FaStar } from "react-icons/fa6";
import { Avatar } from "../Avatar/Avatar";
import './CardCurso.css'
import { useAuth } from "../../contexts/AuthContext";
import type { Curso } from "../../types/Curso";
import Tilt from 'react-parallax-tilt';

interface CardCursoProps {
  curso: Curso;
  onVerMais?: (id: string) => void;
  onFavoritar?: (id: string) => void;
}

export function CardCurso({ curso, onVerMais, onFavoritar }: CardCursoProps) {
  const { user } = useAuth();

    return(
        <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.05}>
            <Card.Root variant='elevated' w='275px' h='450px' overflow='hidden' gap={2}>
                <Image src={curso.imagemUrl || '/images/curso-default.png'}
                h="200px" w="100%" objectFit="cover"
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // evita loop caso a imagem fallback também falhe
                    target.src = '/images/curso-default.png';
                }}/>
                <Card.Body px='10px' gap={2}>
                    <Card.Title fontSize='1xl' truncate>{curso.nome}</Card.Title>
                    <Card.Description fontSize='sm' className="truncate-multiline">{curso.descricao}</Card.Description>
                    <Flex className="autor-curso" align='center' gap={2}>
                        <Avatar size="xs" user={curso.autor}/>
                        <Text className="autor-name" fontSize='sm' color='gray.400'>
                            {curso.autor.nome}
                        </Text>
                    </Flex>
                    <Text textStyle='3xl' fontWeight='bold' letterSpacing='tight'>
                        R${curso.preco.toFixed(2)}
                    </Text>
                </Card.Body>
                <Card.Footer justifyContent='end' p='10px'>
                    <Button className="btVerMais" variant='outline' size='xs' p='5px'
                    color='gray.400'
                    onClick={() => onVerMais?.(curso.id)}>
                        <Icon as={FaCircleInfo as ElementType} className="fa-circle-info"/>
                        Ver Mais
                    </Button>
                    {user && (
                    <Button className="btFav" variant='ghost' size='sm' p='5px'
                    onClick={() => onFavoritar?.(curso.id)}>
                        <Icon as={FaStar as ElementType} className="fa-star"/>
                    </Button>

                    )}
                </Card.Footer>
            </Card.Root>
        </Tilt>
    )
}