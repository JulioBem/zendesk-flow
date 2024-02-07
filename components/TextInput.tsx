import React, { ChangeEvent } from "react";

interface InputProps {
  value: string | number | undefined;
  type: string;
  inputId?: string;
  required?: boolean;
  onChange: (value: string) => void;
}

const TextInput: React.FC<InputProps> = ({
  value,
  onChange,
  type,
  inputId,
  required,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type={type}
      id={inputId}
      value={value}
      onChange={handleInputChange}
      className="border p-2"
      required={required}
    />
  );
};

export default TextInput;
