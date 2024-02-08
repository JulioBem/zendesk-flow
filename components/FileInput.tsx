"use client";
import React, { ChangeEvent, useState } from "react";

interface InputProps {
  value: string | File | undefined;
  onChange: (value: string | File) => void;
  inputId?: string;
  required?: boolean;
  accept?: string;
}

const FileInput: React.FC<InputProps> = ({
  value,
  onChange,
  inputId,
  required,
  accept,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(
    value instanceof File ? value : undefined
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];

    if (newFile) {
      setSelectedFile(newFile);
      onChange(newFile);
    }
  };

  return (
    <div className="file-input-container relative flex flex-row align-center">
      <div className="min-w-36 flex flex-col justify-center align-center">
        <label
          htmlFor={inputId}
          className={`bg-red-700 text-white px-4 py-2 hover:bg-red-800 focus:outline-none focus:shadow-outline-red active:bg-red-900 cursor-pointer`}
        >
          {selectedFile ? "Alterar Arquivo" : "Escolher um Arquivo"}
        </label>
        <input
          type="file"
          id={inputId}
          onChange={handleFileChange}
          required={required}
          accept={accept}
          className="hidden"
        />
      </div>
      {selectedFile && (
        <div className="file-display text-white p-2 mt-2 max-w-38 truncate text-sm">
          {selectedFile.name}
        </div>
      )}
    </div>
  );
};

export default FileInput;
