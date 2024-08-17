"use client";

import { useState } from "react";
import { Field } from "formik";

import { EyeIcon } from "@/_src/components/icons";

import s from "./Input.module.scss";

interface IInput {
  type: string;
  name: string;
  placeholder?: string;
  children?: React.ReactNode;
  error?: string | null;
  className?: string;
}

export const Input: React.FC<IInput> = ({ type, name, placeholder, children, error, className = "" }) => {
  const [isFocuses, setIsFocused] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>(type);

  return (
    <div className={`${s.input} ${className} ${isFocuses ? s.input_focused : ""}`}>
      {children}
      <Field
        name={name}
        type={inputType}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {type == "password" && (
        <EyeIcon
          className={s.eye}
          onClick={() => (inputType === "password" ? setInputType("text") : setInputType("password"))}
          active={inputType == "password"}
        />
      )}
      {error && <div className={`${s.error} error`}>*{error}</div>}
    </div>
  );
};
