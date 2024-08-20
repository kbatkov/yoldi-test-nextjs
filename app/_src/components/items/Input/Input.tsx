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
  component?: string;
}

export const Input: React.FC<IInput> = ({
  type,
  name,
  placeholder,
  children,
  error,
  className = "",
  component = "input",
}) => {
  const [isFocuses, setIsFocused] = useState<boolean>(false);
  const [inputType, setInputType] = useState<string>(type);

  return (
    <div
      className={`${s.input} ${className} ${isFocuses ? s.input_focused : ""} ${component == "textarea" ? s.input_textarea : ""} ${type == "slug" ? s.input_slug : ""}`}
    >
      {type == "slug" && <div className={s.slug}>example.com/</div>}
      {children}
      <Field
        component={component}
        name={name}
        type={inputType == "slug" ? "text" : inputType}
        rows={5}
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
