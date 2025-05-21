import { Avatar, Button, Circle, Flex, Float, Icon, Popover } from "@chakra-ui/react";
import { FaBookOpen, FaRightFromBracket, FaUser } from "react-icons/fa6";
import { ElementType } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import './AvatarPopover.css'

export function AvatarPopover() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

    const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"]

    const pickPalette = (name: string) => {
      const index = name.charCodeAt(0) % colorPalette.length
      return colorPalette[index]
    }

    const handleLogout = () => {
      logout();                // limpa usuário do contexto + localStorage
      navigate("/login");      // redireciona para login
    };

  return (
    <Popover.Root>
      <Popover.Trigger>
       <Flex className='user-avatar'>
            <Avatar.Root variant='subtle' shape='full' ml='10px' colorPalette={user ? pickPalette(user.name) : "gray"}>
              <Avatar.Fallback name={user ? user.name : ""}/>
              <Float placement="bottom-end" offsetX="1" offsetY="1">
                <Circle
                  bg="green.500"
                  size="8px"
                  outlineColor="bg"
                />
              </Float>
            </Avatar.Root>
          </Flex>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.CloseTrigger/>
          <Popover.Arrow>
            <Popover.ArrowTip />
          </Popover.Arrow>
          <Popover.Body className="popover-body">
            <Flex direction="column" align="center" justify="center" width="100%" padding="4" gap="2">
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
