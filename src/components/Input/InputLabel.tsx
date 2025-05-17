//src/components/Input/InputLabel.tsx

import React, { useState, ChangeEvent } from "react";
import { Input } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import './InputLabel.css'

interface InputLabelProps {
  id: string;
  type?: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  maxWidth?: string;
}

const InputLabel: React.FC<InputLabelProps> = ({
  id,
  type = "text",
  label,
  value,
  onChange,
  maxWidth = "100%",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const shouldFloat = isFocused || (value && value.length > 0);
  const labelColor = useColorModeValue("#6d5223", "yellow.300");

  return (
    <div style={{ position: "relative", width: "100%", maxWidth }} className="input-label">
      <Input
        id={id}
        name={id}
        type={type}
        placeholder=" "
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        borderRadius="8px"
        padding="0 1em"
        outline= "none"
        size="md"
        width="100%"
        border= "none"
      />
      <label
        htmlFor={id}
        style={{
          position: "absolute",
          left: "1rem",
          top: shouldFloat ? "0" : "50%",
          transform: "translateY(-50%)",
          fontSize: shouldFloat ? "0.7rem" : "1rem",
          padding: shouldFloat ? "0 0.5rem" : 0,
          borderRadius: "5px",
          color: labelColor,
          pointerEvents: "none",
          transition: "all 0.3s ease",
          userSelect: "none",
        }}
      >
        {label}
      </label>
    </div>
  );
};

export default InputLabel;
