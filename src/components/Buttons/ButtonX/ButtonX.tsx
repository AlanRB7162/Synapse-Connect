//src/components/Buttons/ButtonX/ButtonX.tsx

import React, { ElementType } from "react";
import { Button, Icon } from "@chakra-ui/react";  
import { FaXmark } from "react-icons/fa6";
import "./ButtonX.css"

type ButtonXProps = React.ComponentProps<typeof Button> & {
  // você pode adicionar props extras aqui se quiser
};

const ButtonX: React.FC<ButtonXProps> = (props) => {
  return (
    <Button
      id="x-pesquisar"
      variant="ghost"
      className="button-x"
      {...props}
    >
      <Icon as={FaXmark as ElementType} fontSize="xl" />
    </Button>
  );
};

export default ButtonX;
