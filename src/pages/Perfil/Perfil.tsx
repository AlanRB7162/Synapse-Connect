import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import InputLabel from "../../components/Input/InputLabel";
import { ElementType, useState } from "react";
import { FaCheck, FaEnvelope, FaHouse, FaLock, FaPen, FaUser, FaUserPlus, FaX } from "react-icons/fa6";
import { Avatar } from "../../components/Avatar/Avatar";

export function Perfil(){
    const [nomePerfil, setNomePerfil ]= useState("");
    const [editando, setEditando] = useState(false);
     return (
  <Flex className="perfil-container"direction="row"align="flex-start" justify="space-between"  gap={8} mt={4} px={8} minHeight="400px" w="100%">
    
    
    <Flex direction="column" align="flex-start" width="300px" >
      <Avatar boxSize="250px"  />

      <Flex direction="column" align="flex-start" mb={4} gap={1} mt={6}>
        <Text fontSize="3xl" fontWeight="bolder">Nome da Pessoa</Text>   
        <Text fontSize="xl" color="gray.400">@usuario</Text>             
      </Flex>

    
      {!editando ? (
        <Button className= "nf-bth" w="100%" onClick={() =>  setEditando(true)}>
                        <Icon as={FaPen as ElementType} className='fa-house'/>
                        Editar Perfil
        </Button>
        
      ) : (
        <Flex className="inputs-perfil" direction="column" gap={5} w="100%">
          {/* Inputs iguais os seus */}
          <Flex className="input-login input-signin" align="center" gap={2} w="100%">
            <Icon as={FaUserPlus as ElementType} className="icon fa-user" />
            <InputLabel
              id="inpNome-perfil"
              type="text"
              label="Nome"
              value={nomePerfil}
              onChange={(e) => setNomePerfil(e.target.value)}
            />
          </Flex>

          <Flex className="input-login input-signin" align="center" gap={2} w="100%">
            <Icon as={FaUser as ElementType} className="icon fa-user" />
            <InputLabel
              id="inpUsuario"
              type="text"
              label="Usuario"
              value={nomePerfil}
              onChange={(e) => setNomePerfil(e.target.value)}
            />
          </Flex>

          <Flex className="input-login input-signin" align="center" gap={2} w="100%">
            <Icon as={FaEnvelope as ElementType} className="icon fa-user" />
            <InputLabel
              id="inpEmail"
              type="text"
              label="Email"
              value={nomePerfil}
              onChange={(e) => setNomePerfil(e.target.value)}
            />
          </Flex>

          <Flex className="input-login input-signin" align="center" gap={2} w="100%">
            <Icon as={FaLock as ElementType} className="icon fa-user" />
            <InputLabel
              id="inpSenha"
              type="text"
              label="Senha"
              value={nomePerfil}
              onChange={(e) => setNomePerfil(e.target.value)}
            />
          </Flex>

          <Flex gap={4} mt={4}>
            <Button className= "nf-bth" w="50%" onClick={() =>  setEditando(false)}>
                        <Icon as={FaX as ElementType} className='fa-house'/>
                       Cancelar
            </Button>
            
             <Button className= "nf-bth" w="50%" onClick={() =>  setEditando(true)}>
                        <Icon as={FaCheck as ElementType} className='fa-house'/>
                       Salvar
            </Button>
          </Flex>
        </Flex>
      )}
    </Flex>

    {/* Coluna da direita: cursos criados */}
    <Flex direction="column" flex="1" pl={8} w="100%" h="100%">
      
      <h2>Cursos Criados</h2>
      {/* Aqui você lista os cursos da pessoa */}
    </Flex>
    
  </Flex>
);
}