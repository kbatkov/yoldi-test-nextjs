"use client";

import { Link } from "kbatkov-react-transition-progress/next";
import { usePathname } from "next/navigation";

import { routes } from "@/_src/constants";

import s from "./Footer.module.scss";

export const Footer: React.FC = () => {
  const pathname = usePathname();

  const isHomeOrLoginPath = pathname === routes.home.path || pathname === routes.login.path;

  if (!isHomeOrLoginPath) return null;

  return (
    <div className={s.footer}>
      {pathname === routes.home.path ? (
        <p className={s.text}>
          Уже есть аккаунт?
          <Link href={routes.login.path} className={s.link}>
            Войти
          </Link>
        </p>
      ) : (
        <p className={s.text}>
          Еще нет аккаунта?
          <Link href={routes.home.path} className={s.link}>
            Зарегистрироваться
          </Link>
        </p>
      )}
    </div>
  );
};
