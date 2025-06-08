import { Button, Flex, Icon, Popover, Text } from "@chakra-ui/react";
import { FaBookOpen, FaRightFromBracket, FaUser } from "react-icons/fa6";
import { ElementType } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import './AvatarPopover.css'
import { Avatar } from "../../Avatar/Avatar";

export function AvatarPopover() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const user = useAuth();

  const handleLogout = () => {
    logout();                // limpa usuário do contexto + localStorage
    navigate("/entrar");      // redireciona para login
  };

  function formatarNome(nome?: string){
    if (!nome) return "";
    const partes = nome.trim().split(" ");
    if(partes.length === 1) return partes[0];
    return `${partes[0]} ${partes[partes.length - 1]}`;
  }

  return (
    <Popover.Root>
      <Popover.Trigger>
       <Flex className='user-avatar'>
            <Avatar/>
          </Flex>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.CloseTrigger/>
          <Popover.Arrow>
            <Popover.ArrowTip />
          </Popover.Arrow>
          <Popover.Body className="popover-body">
            <Flex direction="column" justify="center" width="100%" padding="4" gap="2">
            <Text fontSize="lg" fontWeight="bolder">Olá, {formatarNome(user.user?.nome)}!</Text>
                <Button id="btPerfil" className="user-avatar-button btPerfil" variant='outline' width='100%'><Icon as={FaUser as ElementType} className='icon fa-user'/>Meu Perfil</Button>
                <Button id="btMeusCursos" className="user-avatar-button btMeusCursos" variant='outline' width='100%'><Icon as={FaBookOpen as ElementType} className='icon fa-book-open'/>Meus Cursos</Button>
                <Button id="btSair" className="user-avatar-button btSair" variant='outline' width='100%' onClick={handleLogout}><Icon as={FaRightFromBracket as ElementType} className='icon fa-right-from-bracket'/>Sair</Button>
            </Flex>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}
