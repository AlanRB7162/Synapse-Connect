import { Box, CloseButton, Flex, Icon, Input } from "@chakra-ui/react";
import { FaImage } from "react-icons/fa6";
import { useState } from "react";
import './UploadFile.css'

interface UploadFileProps {
  onFileSelect?: (file: File | null) => void;
}

export const UploadFile = ({ onFileSelect }: UploadFileProps) => {
  const [fileName, setFileName] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (file) {
      setFileName(file.name);
      if (onFileSelect) onFileSelect(file);
    } else {
      setFileName(null);
      if (onFileSelect) onFileSelect(null);
    }
  }

  function handleClear() {
    setFileName(null);
    if (onFileSelect) onFileSelect(null);
  }

  return (
    <Box position="relative" w="100%">
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        hidden
        id="upload-input"
        w="100%"
      />
      <label htmlFor="upload-input" style={{ cursor: "pointer", width: "100%" }}>
        <Flex className="uploadfile" borderRadius="6px" w="100%" gap={4} align="center">
          <Icon as={FaImage} />
          {fileName || "Selecione uma imagem"}
        </Flex>
      </label>
      {fileName && (
        <CloseButton
          variant="plain"
          size="sm"
          onClick={handleClear}
          position="absolute"
          color="#6d5223"
          right="5px"
          top="5px"
        />
      )}
    </Box>
  );
};
