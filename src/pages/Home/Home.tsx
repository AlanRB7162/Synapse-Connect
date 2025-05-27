import { Flex } from "@chakra-ui/react";
import { CardCurso } from "../../components/Card/CardCurso";
import type { Curso } from "../../types/Curso";

export function Home(){

    const handleVerMais = (id: string) => {
        console.log("Ver mais curso id:", id);
    };

    const handleFavoritar = (id: string) => {
        console.log("Favoritar curso id:", id);
    }

    return(
        <>
        <Flex className="cursos-display" gap={5}>
            {cursosMock.map((curso) => (
                <CardCurso
                key={curso.id}
                curso={curso}
                onVerMais={handleVerMais}
                onFavoritar={handleFavoritar}
                />
            ))}
        </Flex>
        </>
    )
}

// src/mocks/cursos.ts (ou direto no componente)

export const cursosMock: Curso[] = [
  {
    id: "1",
    nome: "Curso de React",
    descricao: "Aprenda React do zero ao avançado.",
    imagemUrl: "https://source.unsplash.com/random/320x180?react",
    preco: 199.99,
    autor: {
      id: "a1",
      nome: "João Silva"
    }
  },
  {
    id: "2",
    nome: "Curso de TypeScript",
    descricao: "Domine TypeScript para aplicações modernas.",
    imagemUrl: "https://source.unsplash.com/random/320x180?typescript",
    preco: 149.99,
    autor: {
      id: "a2",
      nome: "Maria Oliveira"
    }
  },
  {
    id: "3",
    nome: "Curso de Chakra UI",
    descricao: "Construa interfaces bonitas com Chakra UI.",
    imagemUrl: "https://source.unsplash.com/random/320x180?ui",
    preco: 99.99,
    autor: {
      id: "a3",
      nome: "Carlos Pereira"
    }
  }
];
