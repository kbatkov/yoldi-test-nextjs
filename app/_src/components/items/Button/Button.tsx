import { ButtonHTMLAttributes } from "react";

import s from "./Button.module.scss";

interface IButton {
  style?: "primary" | "secondary";
  size?: "big" | "small";
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
}

export const Button: React.FC<IButton> = ({
  type,
  style = "primary",
  size = "big",
  disabled,
  children,
  onClick,
  className = "",
}) => {
  return (
    <button
      className={
        s.btn +
        " " +
        (style == "primary" ? s.btn_primary : s.btn_secondary) +
        " " +
        (size == "big" ? s.btn_big : s.btn_small) +
        " " +
        (className && className)
      }
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
