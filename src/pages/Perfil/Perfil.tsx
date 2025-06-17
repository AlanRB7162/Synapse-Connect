import { Button, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { ElementType, useEffect, useState } from "react";
import { FaGears, FaPen, FaPlus, FaX } from "react-icons/fa6";
import { Avatar } from "../../components/Avatar/Avatar";
import { useAuth } from "../../contexts/AuthContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CardCurso } from "../../components/Card/CardCurso";
import { Curso } from "../../types/Curso";

export function Perfil() {
  const { username } = useParams();
  const location = useLocation();
  const { user } = useAuth();

  const [userPerfil, setUserPerfil] = useState<any>(null);
  const [cursos, setCursos] = useState<Curso[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPerfil = async () => {
      try {
        if (location.pathname === "/meu-perfil") {
          setUserPerfil(user);
        } else {
          const baseUrl = "http://localhost:3001";
          const res = await fetch(`${baseUrl}/user/${username}`);
          const data = await res.json();
          setUserPerfil(data);
        }
      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
      }
    };

    fetchUserPerfil();
  }, [location.pathname, user, username]);

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const baseUrl = "http://localhost:3001";
        const idAutor = location.pathname === "/meu-perfil" ? user?.id : userPerfil?.id;

        if (!idAutor) {
          setCursos([]);
          return;
        }

        const res = await fetch(`${baseUrl}/cursos/autor/${idAutor}`);
        const data = await res.json();
        console.log("Cursos recebidos:", data);

        if (Array.isArray(data)) {
          const cursosConvertidos: Curso[] = data.map((curso: any) => ({
            id: String(curso.id),
            nome: curso.nome,
            descricao: curso.descricao,
            preco: Number(curso.valor),
            imagemUrl: curso.capa_url || "", // ou algum fallback se for null
            autor: {
              nome: curso.autor_nome,
              avatar: curso.autor_avatar || null,
            },
            nivel: curso.nivel,
            categorias: curso.categorias || [],
          }));

          setCursos(cursosConvertidos);
        } else {
          setCursos([]);
        }
      } catch (err) {
        console.error("Erro ao buscar cursos:", err);
        setCursos([]);
      }
    };

    // Só executa se tiver o idAutor
    if (location.pathname === "/meu-perfil" && user?.id) {
      fetchCursos();
    } else if (userPerfil?.id) {
      fetchCursos();
    }
  }, [location.pathname, user, userPerfil]);
  
  function formatarNome(nome?: string){
    if (!nome) return "";
    const partes = nome.trim().split(" ");
    if(partes.length === 1) return capitalize(partes[0]);

    const primeiro = capitalize(partes[0]);
    const ultimo = capitalize(partes[partes.length - 1]);
    return `${primeiro} ${ultimo}`;
  }

  function capitalize(palavra: string) {
    return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
  }

  async function handleDeleteCurso(cursoId: string) {
    if (!userPerfil) return;

    const confirmed = window.confirm("Quer mesmo excluir este curso?");
    if (!confirmed) return;

    try {
      const baseUrl = "http://localhost:3001";
      const res = await fetch(`${baseUrl}/cursos/${cursoId}/autor/${userPerfil.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCursos((prev) => prev.filter(c => c.id !== cursoId));
        navigate("/meu-perfil", {
          state: {
            toast: {
              title: "Curso excluído com sucesso",
              type: "success"
            }
          }
        })
      } else {
        navigate("/meu-perfil", {
          state: {
            toast: {
              title: "Erro ao excluir curso.",
              type: "error"
            }
          }
        })
      }
    } catch (error) {
      console.error(error);
      navigate("/meu-perfil", {
        state: {
          toast: {
            title: "Erro ao excluir curso.",
            type: "error"
          }
        }
      })
    }
  }

  return (
    <Flex className="perfil-container" direction="column" align="flex-start" gap={6} mt={6} py={12} px={12} minHeight="400px" w="100%">
      <Flex direction="column" align="flex-start" width="100%">
        <Avatar boxSize="250px" user={userPerfil}/>

        <Flex direction="column" align="flex-start" mb={4} gap={1} mt={6}>
          <Text fontSize="3xl" fontWeight="bolder">{formatarNome(userPerfil?.nome)}</Text>
          <Text fontSize="xl" color="gray.400">@{userPerfil?.username}</Text>
        </Flex>

        {location.pathname === "/meu-perfil" && (
          <Button id="btCarrinho" className="nf-bth" flex={1} variant='outline' width='100%' maxW="300px" p={3} px={5}>
              <Icon as={FaPen as ElementType} flex={{base: "1", sm: "none"}}/>
              <Text flex="1" textAlign="center" display={{base: "none", sm: "inline"}}>Editar Perfil</Text>
              <Icon as={FaGears as ElementType}/>
          </Button>
        )}
      </Flex>

      <Flex w="100%" direction="column">
        <Heading size={{base: "3xl", sm: "4xl"}} mb={3} className="gradient-text" fontWeight="bolder">Cursos criados</Heading>
        <Flex overflowX="auto" gap={4} px={4} py={5} borderRadius="10px" flex={1}
        background="rgba(30, 30, 30, 0.6)" /* mais escuro e semi-transparente */
        backdrop-filter="blur(10px)"      /* efeito vidro */
        border="1px solid rgba(255, 255, 255, 0.08)">
          {cursos.length > 0 ? (
            cursos.map(curso => (
              <CardCurso key={curso.id} curso={curso} onDelete={location.pathname === '/meu-perfil' ? handleDeleteCurso : undefined}/>
            ))
          ) : (
            <Flex direction="column" align="center" justify="center" w="100%" py={12}>
              <Icon as={FaX} boxSize={12} color="gray.500" mb={3} />
              <Text fontSize="xl" color="gray.400">Nenhum curso criado ainda.</Text>
              {location.pathname === "/meu-perfil" && (
                <Flex direction="column">
                  <Text fontSize="md" color="gray.500">Que tal começar seu primeiro curso?</Text>
                  <Button id="btAddCurso" className="user-avatar-button btAddCurso" 
                  flex={1} variant='outline' width='100%' p="5px" px={5} mb={2}
                  onClick={()=>navigate("/meus-cursos/criar")}>
                      <Icon as={FaPlus as ElementType}/>
                      <Text flex="1" textAlign="center">Criar Novo Curso</Text>
                  </Button>
                </Flex>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
