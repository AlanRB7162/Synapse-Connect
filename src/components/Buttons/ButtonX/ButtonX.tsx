//src/components/Buttons/ButtonX/ButtonX.tsx

import React, { ElementType } from "react";
import { Button, Icon } from "@chakra-ui/react";  
import { FaXmark } from "react-icons/fa6";
import "./ButtonX.css"

type ButtonXProps = React.ComponentProps<typeof Button> & {
  onClear?: () => void;
};

const ButtonX: React.FC<ButtonXProps> = ({ onClear, ...props }) => {
  return (
    <Button
      id="x-pesquisar"
      variant="ghost"
      className="button-x"
      onClick={onClear}
      {...props}
    >
      <Icon as={FaXmark as ElementType} fontSize="xl" />
    </Button>
  );
};

export default ButtonX;
