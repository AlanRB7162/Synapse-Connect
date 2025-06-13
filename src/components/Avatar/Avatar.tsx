import { AvatarFallback, AvatarImage, AvatarRoot, Box, Circle, Float } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";

type SimpleUser = {
  nome: string;
  avatar?: string | null;
};

interface AvatarProps {
  user?: SimpleUser;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
  boxSize?: string;
}

export function Avatar({ size, user, boxSize }: AvatarProps) {
    
  const { user: authUser } = useAuth();
  const finalUser = user || authUser;

  const [imageError, setImageError] = useState(false);

  const colorPalette = ["red", "blue", "green", "yellow", "purple", "orange"];

  const pickPalette = (nome?: string) => {
    if (!nome || nome.length === 0) return "gray";
    return colorPalette[nome.charCodeAt(0) % colorPalette.length];
  };

  const hasAvatar = finalUser?.avatar && !imageError;

  const avatarContent = (
      <AvatarRoot
        variant="subtle"
        shape="full"
        colorPalette={finalUser?.nome ? pickPalette(finalUser.nome) : "gray"}
        size={size}
        {...(boxSize && { w: "100%", h: "100%" })}
      >
        {hasAvatar ? (
          <AvatarImage src={finalUser.avatar ?? undefined} alt={finalUser.nome} onError={() => setImageError(true)}/>
        ) : (
          <AvatarFallback name={finalUser?.nome || ""} />
        )}
        {!user && !boxSize && (
          <Float placement="bottom-end" offsetX="1" offsetY="1">
            <Circle bg="green.500" size="8px" outlineColor="bg" />
          </Float>
        )}
      </AvatarRoot>
  );

  return boxSize ? <Box boxSize={boxSize}>{avatarContent}</Box> : avatarContent;
}