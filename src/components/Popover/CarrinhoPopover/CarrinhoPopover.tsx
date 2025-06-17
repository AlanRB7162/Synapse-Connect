import { Button, Icon, Popover, Text } from "@chakra-ui/react";
import { ElementType } from "react";
import { FaBagShopping, FaCartShopping, FaGears } from "react-icons/fa6";

export function CarrinhoPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button id='btCarrinho' className='btCarrinho' variant='ghost'><Icon as={FaBagShopping as ElementType} className='icon fa-bag-shopping'/></Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.CloseTrigger/>
          <Popover.Arrow>
            <Popover.ArrowTip />
          </Popover.Arrow>
          <Popover.Body className="popover-carrinho popover-body">
            {/*ADICIONAR AQUI CONTEÚDO DO CARRINHO*/}
            <Button id="btCarrinho" className="user-avatar-button" flex={1} variant='outline' width='100%' p="5px" px={5}>
                <Icon as={FaCartShopping as ElementType}/>
                <Text flex="1" textAlign="center">Ir para o Carrinho</Text>
                <Icon as={FaGears as ElementType}/>
            </Button>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}
