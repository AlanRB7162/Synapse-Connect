import { Blockquote, Box, Flex, Heading, Icon, Tabs } from "@chakra-ui/react";
import { FaTableList, FaTv } from "react-icons/fa6";
import { ElementType, useState } from "react";
import { CursoDados, FormDados } from "./FormDados";
import { FormConteudo, VideoAula } from "./FormConteudo";
import { FormOverview } from "./FormOverview";
import './CriarCurso.css'

export function CriarCurso(){
    const [tabValue, setTabValue] = useState("dados");    
    const [etapasHabilitadas, setEtapasHabilitadas] = useState({
        dados: true,
        conteudo: false,
        overview: false
    });

    const [dadosCurso, setDadosCurso] = useState<CursoDados | null>(null);
    const [videosCurso, setVideosCurso] = useState<VideoAula[]>([]);
    
    return (
        <Flex className="criarCurso-container" w="100%" direction="column" gap={3}> 
            <Flex className="hero-animated-bg" 
            px={8} pt={{base: 12, sm: 8, md: 0}} 
            minH={{base: "430px", sm: "320px", lg: "400px"}} align="center" 
            gap={{base: 4, sm: 4}} 
            direction={{base: "column", sm: "row"}}>
                <Flex className="hero-message" pt={{base: 4, sm: 0}} w={{base: "100%", sm: "50%"}} direction="column">
                    <Heading className="hero-gradient-text" size={{base:"3xl", sm: "2xl", md: "4xl", lg: "6xl", xl: "7xl"}} fontWeight="bolder">Compartilhe</Heading>
                    <Heading className="hero-gradient-text" size={{base:"3xl", sm: "2xl", md: "4xl", lg: "6xl", xl: "7xl"}} fontWeight="bolder" ml={{base: 0.5, md: 1.75, lg: 2}} mt={{base: -2.5, md: -3, lg: -5}}>Conhecimento</Heading>
                    <Blockquote.Root mt='10px' p='10px' fontSize={{base: "xs", md: "sm", lg: "md", xl: "lg"}}>
                        <Blockquote.Content color="gray.300">
                            Compartilhar seu conhecimento é mais poderoso do que você imagina. Crie um curso, inspire outras pessoas e ajude a transformar jornadas — tudo começa com o que você já sabe.
                        </Blockquote.Content>
                    </Blockquote.Root>
                </Flex>
                <Flex className="hero-content" dir="column" w={{base: "100%", sm: "50%"}} justify={{base: "center", sm: "end"}}>
                    <Box w={{base: "256px", sm: "208px", md: "352px", lg: "500px"}} h={{base: "144px", sm: "117px", md: "198px", lg: "270px"}} boxShadow="lg" borderRadius="12px" overflow="hidden">
                        <video
                            src="" /*TODO adicionar video aqui*/
                            width="100%"
                            height="100%"
                            autoPlay
                            muted
                            loop
                            playsInline
                            style={{ borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}
                        />
                    </Box>
                </Flex>
            </Flex>
            <Flex className="criar-form" align="center" justify="center">
                <Tabs.Root size={{base: "sm", sm: "md"}}
                value={tabValue} onValueChange={(val) => setTabValue(val.value)}
                activationMode="manual" w="100%" alignItems="center" justifyContent="center" mb={10}>
                    <Tabs.List gap={5} mb={5} w="100%" alignItems="center" justifyContent="center"> 
                        <Tabs.Trigger value="dados" className="tabs-criar"
                        cursor="default" fontSize={{base: "9px", sm: "14px"}}
                        disabled={!etapasHabilitadas.dados}
                        >
                            <Icon as={FaTableList as ElementType}/>
                            Inserir Dados
                        </Tabs.Trigger>

                        <Tabs.Trigger value="conteudo" className="tabs-criar"
                        cursor="default" fontSize={{base: "9px", sm: "14px"}}
                        disabled={!etapasHabilitadas.conteudo}
                        >
                            <Icon as={FaTv as ElementType}/>
                            Inserir Conteúdo
                        </Tabs.Trigger>

                        <Tabs.Trigger value="overview" className="tabs-criar"
                        cursor="default" fontSize={{base: "9px", sm: "14px"}}
                        disabled={!etapasHabilitadas.overview}
                        >
                            <Icon as={FaTv as ElementType}/>
                            Visão Geral
                        </Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="dados" w="100%">
                        <FormDados 
                        onAvancar={(dados) => {
                            setDadosCurso(dados);
                            setEtapasHabilitadas({
                                dados: false,
                                conteudo: true,
                                overview: false
                            });
                            setTabValue("conteudo");
                        }}/>
                    </Tabs.Content>
                    <Tabs.Content value="conteudo">
                        <FormConteudo
                        onVoltar={() => {
                            setEtapasHabilitadas({
                                dados: true,
                                conteudo: false,
                                overview: false
                            });
                            setTabValue("dados");
                        }}
                        onAvancar={(videos) => {
                            setVideosCurso(videos);
                            setEtapasHabilitadas({
                                dados: false,
                                conteudo: false,
                                overview: true
                            });
                            setTabValue("overview");
                        }}
                        />
                    </Tabs.Content>
                    <Tabs.Content value="overview">
                        <FormOverview
                        videos={videosCurso}
                        dados={dadosCurso}
                        onVoltar={() => {
                            setEtapasHabilitadas({
                                dados: false,
                                conteudo: true,
                                overview: false
                            });
                            setTabValue("conteudo");
                        }}
                        />
                    </Tabs.Content>
                </Tabs.Root>
            </Flex>
        </Flex>
    )
}