//src/pages/CRUD/CRUD.tsx

import { Button, Flex, Table } from "@chakra-ui/react";
import InputLabel from "../../components/Input/InputLabel";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export function Crud(){
    const [id, setID] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [provedor, setProvedor] = useState("");
    const [idprovedor, setIDProvedor] = useState("");
    const [avatar, setAvatar] = useState("");
    const [criado_em, setCriado_em] = useState("");

    const [modoEdicao, setModoEdicao] = useState(false);

    const handleNovo = () => {
        setID("");
        setNome("");
        setEmail("");
        setProvedor("");
        setIDProvedor("");
        setAvatar("");
        setCriado_em("");
        setModoEdicao(true);
        
    };

    const handleEditar = () => {
        if (clienteSelecionado) {
            setID(clienteSelecionado.id.toString());
            setNome(clienteSelecionado.nome);
            setProvedor(clienteSelecionado.provedor);
            setAvatar(clienteSelecionado.avatar);
            setModoEdicao(true);
        }
    };

    const handleCancelar = () => {
        setID("");
        setNome("");
        setEmail("");
        setAvatar("");
        setModoEdicao(false);
    };

    const handleSalvar = () => {
        setModoEdicao(false);
    };

    const [linhaSelecionadaId, setLinhaSelecionadaId] = useState<number | null>(null);
    const [clienteSelecionado, setClienteSelecionado] = useState<any>(null);


    return(
        
        <Flex align="center" className="crud" gap={10} justify="center" w="100%" p={12}>
            <Flex direction="column" gap={4} className="form">
                <Flex display="flex" align="center" gap={2} flex="1" minW="260px" className="input-id">
                <InputLabel
                    id="id"
                    label="ID"
                    value={id}
                    onChange={(e) => setID(e.target.value)}
                    required
                    disabled={true}
                />
                </Flex>

                <Flex display="flex" align="center" gap={2} flex="1" minW="260px" className="input-nome">
                <InputLabel
                    id="nome"
                    label="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    disabled={!modoEdicao}
                />
                </Flex>

                <Flex display="flex" align="center" gap={2} flex="1" minW="260px" className="input-endereco">
                <InputLabel
                    id="email"
                    label="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={!modoEdicao}
                />
                </Flex>

                <Flex display="flex" align="center" gap={2} flex="1" minW="260px" className="input-cidade">
                <InputLabel
                    id="provedor"
                    label="Provedor"
                    value={provedor}
                    onChange={(e) => setProvedor(e.target.value)}
                    required
                    disabled={true}
                />
                </Flex>
                <Flex display="flex" align="center" gap={2} flex="1" minW="260px" className="input-cidade">
                <InputLabel
                    id="idprovedor"
                    label="IDProvedor"
                    value={provedor}
                    onChange={(e) => setIDProvedor(e.target.value)}
                    required
                    disabled={true}
                />
                </Flex>
                <Flex display="flex" align="center" gap={2} flex="1" minW="260px" className="input-cidade">
                <InputLabel
                    id="avatar"
                    label="Avatar"
                    value={provedor}
                    onChange={(e) => setAvatar(e.target.value)}
                    required
                    disabled={true}
                />
                </Flex>
                <Flex display="flex" align="center" gap={2} flex="1" minW="260px" className="input-cidade">
                <InputLabel
                    id="criado_em"
                    label="Criado em"
                    value={criado_em}
                    onChange={(e) => setCriado_em(e.target.value)}
                    required
                    disabled={true}
                />
                </Flex>


                {!modoEdicao &&(
                <Flex display="flex" align="center" gap={2} flex="1" minW="260px" className="input-cidade">
                    <Button onClick={handleNovo} disabled={linhaSelecionadaId !== null}>Novo</Button>
                    <Button onClick={handleEditar} disabled={!clienteSelecionado}>Editar</Button>
                    <Button disabled={!clienteSelecionado}>Excluir</Button>
                </Flex>
                )}

                {modoEdicao && (
                <Flex display="flex" align="center" gap={2} flex="1" minW="260px" className="input-cidade">
                    <Button onClick={handleSalvar}>Salvar</Button>
                    <Button onClick={handleCancelar}>Cancelar</Button>
                </Flex>
                )}
            </Flex>
            <Flex className="list">
                <Table.Root size="lg" showColumnBorder interactive variant="outline" borderRadius="12px" boxShadow="md" borderColor="gray.200"bg="transparent">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader px="6" py="4">ID</Table.ColumnHeader>
                            <Table.ColumnHeader px="6" py="4">Nome</Table.ColumnHeader>
                            <Table.ColumnHeader px="6" py="4">Email</Table.ColumnHeader>
                            <Table.ColumnHeader px="6" py="4">Provedor</Table.ColumnHeader>
                            <Table.ColumnHeader px="6" py="4">IDProvedor</Table.ColumnHeader>
                            <Table.ColumnHeader px="6" py="4">Avatar</Table.ColumnHeader>
                            <Table.ColumnHeader px="6" py="4">Criado em</Table.ColumnHeader>
                            <Table.ColumnHeader px="6" py="4">Ações</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {clientes.map((cliente) => {

                            return(
                                <><Table.Row
                                    key={cliente.id}
                                    onClick={() => {
                                        if (!modoEdicao) {
                                            setLinhaSelecionadaId(cliente.id);
                                            setClienteSelecionado(cliente);
                                        }
                                    } }
                                    bg={cliente.id === linhaSelecionadaId ? "yellow.500" : "transparent"}
                                    cursor={modoEdicao ? "not-allowed" : "pointer"}
                                    _hover={{ bg: modoEdicao ? "transparent" : "yellow.200" }}
                                >
                                    <Table.Cell px="6" py="4">{cliente.id}</Table.Cell>
                                    <Table.Cell px="6" py="4">{cliente.nome}</Table.Cell>
                                    <Table.Cell px="6" py="4">{cliente.cidade}</Table.Cell>
                                    </Table.Row>
                                    <Table.Cell px="6" py="4">
                            <Flex gap={2}>
                                <Button
                                    size="sm"
                                    colorScheme="yellow"
                                    variant="ghost"
                                    onClick={() => {
                                        setLinhaSelecionadaId(cliente.id);
                                        setClienteSelecionado(cliente);
                                        handleEditar(); 
                                    } }
                                >
                                <FaEdit />
                                </Button>
                                <Button
                                    size="sm"
                                    colorScheme="red"
                                    variant="ghost"
                                    onClick={() => {
                                        const confirmar = window.confirm("Tem certeza que deseja excluir este usuário?");
                                        if (confirmar) {                                       
                                        alert(`Usuário ${cliente.nome} excluído com sucesso!`);
                                    }
                                            } }
                            >
                                    <FaTrash />
                                </Button>
                                </Flex>
                         </Table.Cell></>
                                );
                             })}
                     </Table.Body>
                 </Table.Root>
              </Flex>
          </Flex>
     )
  }

const clientes = [
  { id: 1, nome: "Laptop", cidade: "Electronics", price: 999.99 },
  { id: 2, nome: "Coffee Maker", cidade: "Home Appliances", price: 49.99 },
  { id: 3, nome: "Desk Chair", cidade: "Furniture", price: 150.0 },
  { id: 4, nome: "Smartphone", cidade: "Electronics", price: 799.99 },
  { id: 5, nome: "Headphones", cidade: "Accessories", price: 199.99 },
]