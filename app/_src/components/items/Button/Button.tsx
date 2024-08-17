import { Link } from "react-transition-progress/next";

import s from "./Button.module.scss";

interface IButton {
  style?: "primary" | "secondary";
  size?: "big" | "small";
  disabled?: boolean;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "submit" | "reset" | "button" | undefined;
  className?: string;
  href?: string;
}

export const Button: React.FC<IButton> = ({
  type,
  style = "primary",
  size = "big",
  disabled,
  children,
  onClick,
  className = "",
  href,
}) => {
  const buttonClasses = `${s.btn} ${style === "primary" ? s.btn_primary : s.btn_secondary} ${
    size === "big" ? s.btn_big : s.btn_small
  } ${className && className}`;

  return href ? (
    <Link className={buttonClasses} href={href} type={type}>
      {children}
    </Link>
  ) : (
    <button className={buttonClasses} type={type} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
