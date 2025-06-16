import { Button, Flex, Icon, Popover, Text } from "@chakra-ui/react";
import { FaRightFromBracket, FaUser } from "react-icons/fa6";
import { ElementType } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import './AvatarPopover.css'
import { Avatar } from "../../Avatar/Avatar";
import { CursosCollapsible } from "../../Collapsible/CursosCollapsible/CursosCollapsible";

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
    if(partes.length === 1) return capitalize(partes[0]);

    const primeiro = capitalize(partes[0]);
    const ultimo = capitalize(partes[partes.length - 1]);
    return `${primeiro} ${ultimo}`;
  }

  function capitalize(palavra: string) {
    return palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase();
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
                <Button id="btPerfil" className="user-avatar-button btPerfil" variant='outline' width='100%' p="5px" px={10}>
                  <Icon as={FaUser as ElementType} className='icon fa-user'/>
                  <Text flex="1" textAlign="center">Meu Perfil</Text>
                </Button>
                <CursosCollapsible/>
                <Button id="btSair" className="user-avatar-button btSair" variant='outline' width='100%' p="5px" px={10} onClick={handleLogout}>
                  <Icon as={FaRightFromBracket as ElementType} className='icon fa-right-from-bracket'/>
                  <Text flex="1" textAlign="center">Sair</Text>
                </Button>
            </Flex>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}
