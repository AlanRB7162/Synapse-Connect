import { Button, Icon, Popover } from "@chakra-ui/react";
import { ElementType } from "react";
import { FaBars } from "react-icons/fa6";
import { NavRoutes } from "../../Nav/NavRoutes";

export function NavPopover() {
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button id='btNav' className='btNav' variant='ghost' size='sm'><Icon as={FaBars as ElementType} className='icon fa-bars'/></Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.CloseTrigger/>
          <Popover.Arrow>
            <Popover.ArrowTip />
          </Popover.Arrow>
          <Popover.Body className="popover-nav popover-body" p={4} maxH='300px' overflow='auto'>
            <NavRoutes/>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}
