//src/pages/CRUD/CRUD.tsx

import { Button, Flex, For, Stack, Table, Text } from "@chakra-ui/react";
import InputLabel from "../../components/Input/InputLabel";
import { useState } from "react";

export function Crud(){
    const [id, setID] = useState("");
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [cidade, setCidade] = useState("");

    const [modoEdicao, setModoEdicao] = useState(false);

    const handleNovo = () => {
        setID("");
        setNome("");
        setEndereco("");
        setCidade("");
        setModoEdicao(true);
    };

    const handleEditar = () => {
        if (clienteSelecionado) {
            setID(clienteSelecionado.id.toString());
            setNome(clienteSelecionado.nome);
            setCidade(clienteSelecionado.cidade);
            setModoEdicao(true);
        }
    };

    const handleCancelar = () => {
        setID("");
        setNome("");
        setEndereco("");
        setCidade("");
        setModoEdicao(false);
    };

    const handleSalvar = () => {
        setModoEdicao(false);
    };

    const [linhaSelecionadaId, setLinhaSelecionadaId] = useState<number | null>(null);
    const [clienteSelecionado, setClienteSelecionado] = useState<any>(null);


    return(
        <Flex className="crud" gap={10} justify="space-between">
            <Flex direction="column" gap={4} className="form">
                <Flex display="flex" align="center" gap={2} flex="1" minW="260px" className="input-id">
                <InputLabel
                    id="id"
                    label="ID"
                    value={id}
                    onChange={(e) => setID(e.target.value)}
                    required
                    disabled={!modoEdicao}
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
                    id="endereco"
                    label="Endereço"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    required
                    disabled={!modoEdicao}
                />
                </Flex>

                <Flex display="flex" align="center" gap={2} flex="1" minW="260px" className="input-cidade">
                <InputLabel
                    id="cidade"
                    label="Cidade"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                    required
                    disabled={!modoEdicao}
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
                <Table.Root size="lg" showColumnBorder interactive variant="outline" borderRadius="8px" bg="transparent">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader px="6" py="4">ID</Table.ColumnHeader>
                            <Table.ColumnHeader px="6" py="4">Nome</Table.ColumnHeader>
                            <Table.ColumnHeader px="6" py="4">Cidade</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {clientes.map((cliente) => {
                            const selecionado = cliente.id === linhaSelecionadaId;

                            return(
                                <Table.Row 
                                key={cliente.id} 
                                onClick={() => {
                                    if (!modoEdicao) {
                                        setLinhaSelecionadaId(cliente.id);
                                        setClienteSelecionado(cliente);
                                    }
                                }}
                                bg={cliente.id === linhaSelecionadaId ? "blue.100" : "transparent"}
                                cursor={modoEdicao ? "not-allowed" : "pointer"}
                                _hover={{ bg: modoEdicao ? "transparent" : "blue.50" }}
                                >
                                    <Table.Cell px="6" py="4">{cliente.id}</Table.Cell>
                                    <Table.Cell px="6" py="4">{cliente.nome}</Table.Cell>
                                    <Table.Cell px="6" py="4">{cliente.cidade}</Table.Cell>
                                </Table.Row>
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