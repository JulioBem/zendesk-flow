import React, { ChangeEvent } from "react";

interface InputProps {
  value: string | boolean | undefined;
  type: string;
  inputId?: string;
  required?: boolean;
  options?: string[];
  onChange: (value: string) => void;
}

const SelectInput: React.FC<InputProps> = ({
  value,
  onChange,
  inputId,
  required,
  options,
}) => {
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  if (options && options.length > 0) {
    return (
      <select
        id={inputId}
        value={value as string}
        onChange={handleSelectChange}
        className="border p-2"
        required={required}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }
};

export default SelectInput;
