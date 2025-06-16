//src/components/Input/InputLabel.tsx

import React, { useState, ChangeEvent } from "react";
import { Input, Textarea } from "@chakra-ui/react";
import { useColorModeValue } from "../ui/color-mode";
import './InputLabel.css'

interface InputLabelProps {
  id: string;
  type?: string;
  label?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  maxWidth?: string;
  required?: boolean;
  disabled?: boolean;
  rightElement?: React.ReactNode;
  paddingRight?: string;
  isTextarea?: boolean;
  onlyReal?: boolean;
  maxValue?: number;
}

const InputLabel: React.FC<InputLabelProps> = ({
  id,
  type = "text",
  label,
  value,
  onChange,
  maxWidth = "100%",
  required = false,
  disabled = false,
  rightElement,
  paddingRight,
  isTextarea = false,
  onlyReal = false,
  maxValue,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const shouldFloat = isFocused || (value && value.length > 0) || onlyReal;
  const labelColor = useColorModeValue("#6d5223", "yellow.300");

  const formatCurrency = (numStr: string) => {
    const digits = numStr.replace(/\D/g, "");
    let numberValue = parseInt(digits || "0", 10);
    if (maxValue !== undefined) {
      const maxValueCents = Math.round(maxValue * 100);
      if (numberValue > maxValueCents) {
        numberValue = maxValueCents;
      }
    }

    const formatted = (numberValue / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });

    return formatted;
  };

  const handleRealChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const digits = inputValue.replace(/\D/g, "");
    const formatted = formatCurrency(digits);

    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: formatted,
      }
    };
    onChange(syntheticEvent as ChangeEvent<HTMLInputElement>);
  };

  const inputCommonProps = {
    id,
    name: id,
    placeholder: " ",
    value: onlyReal ? formatCurrency(value) : value,
    required,
    disabled,
    onChange,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    borderRadius: "6px",
    paddingLeft: "1em",
    paddingRight: paddingRight ?? (rightElement ? "2.3rem" : "1em"),
    outline: "none",
    size: "md" as const,
    width: "100%",
    border: "none",
  };

  const maxLength = 400;

  return (
    <div style={{ position: "relative", width: "100%", maxWidth }} className="input-label">
      {isTextarea ? (
        <>
          <Textarea {...inputCommonProps} rows={4} autoresize resize="none" p={3} pb={8} maxLength={maxLength}/>
           <div style={{
            position: "absolute",
            bottom: "0.75rem",
            right: "0.5rem",
            fontSize: "0.75rem",
            color: "#6d5223",
          }}>
            {value.length} / {maxLength}
          </div>
        </>
      ) : (
      <Input 
      {...inputCommonProps}
      h="44px"
            type={onlyReal ? "text" : type}
            onChange={onlyReal ? handleRealChange : onChange}
          />
      )}
      {label && (
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
      )}
      {rightElement && (
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "0.25rem",
          transform: "translateY(-50%)",
        }}
      >
        {rightElement}
      </div>
    )}
    </div>
  );
};

export default InputLabel;
