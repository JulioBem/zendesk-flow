import React, { ChangeEvent } from "react";

interface InputProps {
  value: string;
  inputId?: string;
  required?: boolean;
  onChange: (value: string) => void;
}

const TextInputArea: React.FC<InputProps> = ({
  value,
  onChange,
  inputId,
  required,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      id={inputId}
      value={value}
      onChange={handleInputChange}
      className="border p-2"
      required={required}
    />
  );
};

export default TextInputArea;
