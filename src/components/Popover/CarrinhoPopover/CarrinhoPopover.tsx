import { Button, Icon, Popover } from "@chakra-ui/react";
import { ElementType } from "react";
import { FaBagShopping, FaCartShopping } from "react-icons/fa6";

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
            <Button id="btSair" className="user-avatar-button btSair" variant='outline' width='100%'><Icon as={FaCartShopping as ElementType} className='icon fa-cart-shopping'/>Ir para o Carrinho</Button>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}
