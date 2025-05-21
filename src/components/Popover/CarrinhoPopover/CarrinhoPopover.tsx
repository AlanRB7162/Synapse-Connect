import { Button, Icon, Popover } from "@chakra-ui/react";
import { ElementType } from "react";
import { FaCartShopping } from "react-icons/fa6";

export function CarrinhoPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button id='btCarrinho' className='btCarrinho' variant='ghost'><Icon as={FaCartShopping as ElementType} className='icon fa-cart-shopping'/></Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.CloseTrigger/>
          <Popover.Arrow>
            <Popover.ArrowTip />
          </Popover.Arrow>
          <Popover.Body className="popover-body">
            {/*ADICIONAR AQUI CONTEÚDO DO CARRINHO*/}
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}
