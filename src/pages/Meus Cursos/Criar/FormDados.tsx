//src/pages/Meus Cursos/Criar/FormDados.tsx

import { ElementType, useEffect, useState } from "react";
import InputLabel from "../../../components/Input/InputLabel";
import { Box, Button, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react";
import { FaArrowRight, FaComment, FaDollarSign, FaFile, FaLink, FaList, FaPenToSquare, FaRankingStar, FaUpload } from "react-icons/fa6";
import { Select } from "../../../components/Select/Select";
import { UploadFile } from "../../../components/UploadFile/UploadFile";
import { useNavigate } from "react-router-dom";

interface FormDadosProps {
  onAvancar: (dados: CursoDados) => void;
}

export interface CursoDados {
  nomeCurso: string;
  descCurso: string;
  categoria: string[];
  nivel: string;
  preco: string;
  tipo: string;
  capa: string | File | null;
}

type Option = {
  label: string;
  value: string; // <- antes era string | number
};

export function FormDados({ onAvancar }: FormDadosProps){
    const [nomeCurso, setNomeCurso] = useState("");
    const [descCurso, setDescCurso] = useState("");
    const [categoria, setCategoria] = useState<string[]>([]);
    const [nivel, setNivel] = useState<string>("");
    const [preco, setPreco] = useState("");
    
    const [tipo, setTipo] = useState<string>("");
    const [capaUrl, setCapaUrl] = useState("");
    const [capaPreview, setCapaPreview] = useState<string | null>(null);
    const [erroCapaPreview, setErroCapaPreview] = useState(false);
    const [erroCapaUrl, setErroCapaUrl] = useState(false);

    useEffect(() => {
    setErroCapaPreview(false);
    }, [capaPreview]);

    useEffect(() => {
    setErroCapaUrl(false);
    }, [capaUrl]);

    const [categorias, setCategorias] = useState<Option[]>([]);
    const [niveis, setNiveis] = useState<Option[]>([]);

    const API_URL = "http://localhost:3001";

    useEffect(() => {
    fetch(`${API_URL}/categoria`)
      .then(res => res.json())
      .then((data: { id: number; nome: string }[]) => {
        const options = data.map(item => ({
          label: item.nome,
          value: item.nome,
        }));
        setCategorias(options);
      })
    .catch(console.error);

    fetch(`${API_URL}/nivel`)
        .then(res => res.json())
        .then((data: { id: number; nome: string }[]) => {
            const options = data.map(item => ({
            label: item.nome,
            value: item.nome,
            }));
            setNiveis(options);
        })
        .catch(console.error);
    }, []);

    const navigate = useNavigate();
    
    const handleAvancar = () => {
        const capa = tipo === "url" ? capaUrl : capaPreview;

        if (
            (tipo === "url" && erroCapaUrl) ||
            (tipo === "upload" && erroCapaPreview)
        ) {
            navigate("/meus-cursos/criar", {
                state: {
                    toast: {
                        title: "Imagem inválida",
                        description: "A imagem da capa não pôde ser carregada. Verifique a URL ou selecione outra imagem.",
                        type: "error"
                    }
                }
            });
            return;
        }

        if (
            nomeCurso.trim() === "" ||
            categoria.length === 0 ||
            nivel.trim() === "" ||
            preco.trim() === ""
        ) {
            navigate("/meus-cursos/criar", {
                state: {
                    toast: {
                        title: "Preencha todos os campos obrigatórios",
                        description: "Verifique se todos os campos com * estão preenchidos corretamente.",
                        type: "warning"
                    }
                }
            });
            return;
        } 
        onAvancar({
        nomeCurso,
        descCurso,
        categoria,
        nivel,
        preco,
        tipo,
        capa
    });
    }
    
    const handlePrecoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPreco(e.target.value);
    };

    const [capaFile, setCapaFile] = useState<File | null>(null);

    function handleFileSelect(file: File | null) {
        if (file) {
            if (capaPreview) {
            URL.revokeObjectURL(capaPreview);
            }
            setCapaFile(file);
            const previewUrl = URL.createObjectURL(file);
            setCapaPreview(previewUrl);
        } else {
            if (capaPreview) {
            URL.revokeObjectURL(capaPreview);
            }
            setCapaPreview(null);
        }
    }

    useEffect(() => {
        if (tipo === "url") {
            setCapaPreview(null);
        } else if (tipo === "upload") {
            setCapaUrl("");
        }
    }, [tipo]);

    return(
        <Flex className="form-dados" w="100%" h="100%" px={{base: 4, md: 6, lg: 10}}
        direction="column" gap={1}>
            <Heading size={{base: "2xl", sm: "4xl" }} fontWeight="bolder">Informações do Curso</Heading>
            <Text fontSize={{base: "xs", sm: "xl" }} color="gray.400">Insira as informações básicas do seu curso</Text>

            <Box height='1px' width='100%' my={5} bg="gray.300"/>

            <Flex direction="column" gap={2}>
                <Flex className="input-criar input-nome" align='center' gap={2} w='100%'>
                    <Icon as={FaPenToSquare as ElementType} className='icon'/>
                    <InputLabel id="inpCriar-nome" label="Nome do Curso" required maxLength={100}
                    value={nomeCurso} onChange={(e) => setNomeCurso(e.target.value)}/>
                </Flex>
                <Text color="gray.500" fontSize="xs" ml={6}>*obrigatório</Text>
            </Flex>

            <Flex className="input-criar input-desc" align='center' gap={2} w='100%' mt={4}>
                <Icon as={FaComment as ElementType} className='icon'/>
                <InputLabel id="inpCriar-desc" label="Descrição do Curso" required isTextarea
                value={descCurso} onChange={(e) => setDescCurso(e.target.value)} maxLength={400}/>
            </Flex>

            <Flex align="center" justify="space-between" w="100%" gap={{base: 2, md: 6, lg: 10}} mt={2} direction={{base: "column", md: "row"}}>
                <Flex direction="column" gap={2} w={{base: "100%", md: "33%"}} h="100%">
                    <Flex w="100%" h="100%" justify="center" gap={2}>
                        <Icon as={FaList as ElementType} className='icon' mt={1}/>
                        <Select 
                            placeholder="Selecione até 3 categorias"
                            items={categorias}
                            value={categoria}
                            onValueChange={(categs) => setCategoria(categs)}
                            multiple={true}
                            label="Categoria do Curso"
                        />
                    </Flex>
                    <Text color="gray.500" fontSize="xs" ml={6}>*obrigatório</Text>
                </Flex>
                <Flex direction="column" gap={2} w={{base: "100%", md: "33%"}} h="100%">
                    <Flex w="100%" h="100%" justify="center" gap={2}>
                        <Icon as={FaRankingStar as ElementType} className='icon' mt={1}/>
                        <Select 
                            placeholder="Selecione o nível do curso"
                            items={niveis}
                            value={nivel}
                            onValueChange={(nivels) => setNivel(nivels)}
                            label="Nível do Curso"
                        />
                    </Flex>
                    <Text color="gray.500" fontSize="xs" ml={6}>*obrigatório</Text>
                </Flex>
                <Flex direction="column" gap={2} w={{base: "100%", md: "33%"}} h="100%">
                    <Flex w="100%" h="100%" justify="center" gap={2}>
                        <Icon as={FaDollarSign as ElementType} className='icon' mt={1}/>
                        <Flex direction="column" w="100%" h="100%" justify="end" gap={1}>
                            <Text fontSize="14px" fontWeight="500">Preço do Curso</Text>
                            <InputLabel
                            id="preco"
                            value={preco}
                            onChange={handlePrecoChange}
                            onlyReal
                            maxValue={99999.99}
                            />
                        </Flex>
                    </Flex>
                    <Text color="gray.500" fontSize="xs" ml={6}>*obrigatório</Text>
                </Flex>
            </Flex>

            <Box height='1px' width='100%' my={5} mt={12} bg="gray.300"/>

            <Flex direction="column" gap={2}>
                <Heading size={{base: "2xl", sm: "4xl" }} fontWeight="bolder">Capa do Curso</Heading>
                <Text fontSize={{base: "sm", sm: "xl" }} color="gray.400">Adicione uma capa para o seu curso</Text>
                <Text fontSize={{base: "10px", sm: "sm" }} color="gray.500">Tamanho recomendado da imagem: <strong>300x200px</strong></Text>
                <Flex w="100%" gap={5} h="100%" align="center" direction={{base: "column", md: "row"}} mt={2}>
                    <Flex w={tipo ? { base: "100%", md: "300px" } : { base: "100%" }} gap={5} align="center">
                        <Icon as={
                            tipo === 'url' ? FaLink as ElementType 
                            : tipo === 'upload' ? FaUpload as ElementType 
                            : FaFile as ElementType } className="icon"/>
                        <Select 
                            placeholder="Selecione o tipo de arquivo"
                            items={tipos}
                            value={tipo}
                            onValueChange={(types) => setTipo(types)}
                            maxW="100%"
                        />
                    </Flex>
                    {tipo === "url" && (
                        <Flex w="100%">
                            <InputLabel
                                id="capa-url"
                                label="URL da imagem de capa"
                                value={capaUrl}
                                onChange={(e) => setCapaUrl(e.target.value)}
                            />
                        </Flex>
                    )}
                    {tipo === "upload" && (
                        <Flex w="100%" h="100%">
                            <UploadFile onFileSelect={handleFileSelect}/>
                        </Flex>
                    )}
                </Flex>
                {capaPreview && (
                <Flex w="100%"direction="column" pt={2}>
                    <Heading size="2xl" fontWeight="bolder" color="gray.400">Pré-visualização da Capa</Heading>
                    <Box mt={4} maxW="300px" maxH="200px" overflow="hidden" borderRadius="8px" boxShadow="md">
                        {!erroCapaPreview ? (
                            <Image
                                width="100%" height="auto" display="block"
                                src={capaPreview}
                                objectFit="cover"
                                alt="Capa do curso"
                                onError={() => setErroCapaPreview(true)}
                            />
                            ) : (
                            <Text color="red.500" fontSize="sm" mt={2}>Não foi possível carregar a imagem.</Text>
                        )}
                    </Box>
                </Flex>
                )}

                {tipo === "url" && capaUrl && (
                <Flex w="100%"direction="column" pt={2}>
                    <Heading size={{base: "xl", sm: "2xl" }} fontWeight="bolder" color="gray.400">Pré-visualização da Capa</Heading>
                    <Box mt={4} maxW="300px" maxH="200px" overflow="hidden" borderRadius="8px" boxShadow="md">
                        {!erroCapaUrl ? (
                            <Image
                                width="100%" height="auto" display="block"
                                src={capaUrl}
                                objectFit="cover"
                                alt="Capa do curso"
                                onError={() => setErroCapaUrl(true)}
                            />
                            ) : (
                            <Text color="red.500" fontSize="sm" m={2}>Não foi possível carregar a imagem.</Text>
                        )}
                    </Box>
                </Flex>
                )}
            </Flex>

            <Button w={{base: "50px", md: "150px"}} alignSelf="end" borderRadius="8px"
            background="linear-gradient(to right, #F1CA84, #ECB251)"
            color="#6d5223" mt={6}
            onClick={handleAvancar}
            >
                <Text display={{ base: "none", md: "inline" }}>
                    Avançar
                </Text>
                <Icon as={FaArrowRight as ElementType} className='fa-house'/>
            </Button>
        </Flex>
    )
}

const tipos = [
    { label: "URL", value: "url" },
    { label: "Upload", value: "upload" },
];