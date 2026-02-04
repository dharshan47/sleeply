"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  showPasswordToggle?: boolean;
  register?: UseFormRegisterReturn;
  ariaInvalid?: boolean | "true" | "false";
}

export const FormInput: React.FC<FormInputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  showPasswordToggle = false,
  register,
  ariaInvalid,
}) => {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-2 relative">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={isPassword && show ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...(register && { ...register })}
          aria-invalid={ariaInvalid}
        />
        {isPassword && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {show ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
