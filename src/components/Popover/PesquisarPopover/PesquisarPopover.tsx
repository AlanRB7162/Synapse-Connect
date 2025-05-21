import { Button, Icon, Popover } from "@chakra-ui/react";
import { ElementType, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import InputLabel from "../../Input/InputLabel";
import './PesquisarPopover.css'
import ButtonX from "../../Buttons/ButtonX/ButtonX";

export function PesquisarPopover() {
  const [search, setSearch] = useState("");
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button display={{base:"flex", md:"none"}} id='btPesquisar' variant='ghost'><Icon as={FaMagnifyingGlass as ElementType} className='icon fa-magnifying-glass'/></Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.CloseTrigger/>
          <Popover.Arrow>
            <Popover.ArrowTip />
          </Popover.Arrow>
          <Popover.Body className="popover-pesquisar popover-body" display='flex' gap={2}>
            <InputLabel
              id="pesquisa"
              label="Pesquisar"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <ButtonX onClear={()=> setSearch("")}/>
          </Popover.Body>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}
