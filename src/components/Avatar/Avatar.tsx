import { AvatarFallback, AvatarRoot, Circle, Float } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";

type User = {
  name: string;
};

interface AvatarProps {
  user?: User;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function Avatar({ size, user }: AvatarProps) {
    
  const { user: authUser } = useAuth();
  const finalUser = user || authUser;

  const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"];

  const pickPalette = (name?: string) => {
    if (!name || name.length === 0) {
      return "gray";
    }
    const index = name.charCodeAt(0) % colorPalette.length;
    return colorPalette[index];
  };

  return (
    <AvatarRoot
      variant="subtle"
      shape="full"
      colorPalette={finalUser?.name ? pickPalette(finalUser.name) : "gray"}
      size={size}
    >
      <AvatarFallback name={finalUser?.name || ""} />
      {!user && (
        <Float placement="bottom-end" offsetX="1" offsetY="1">
          <Circle bg="green.500" size="8px" outlineColor="bg" />
        </Float>
      )}
    </AvatarRoot>
  );
}
