"use client";
import { Link } from "react-transition-progress/next";
import { usePathname } from "next/navigation";

import { routes } from "@/_src/constants";
import { isProtectedRoute } from "@/_src/helpers";

import s from "./Footer.module.scss";

export const Footer: React.FC = () => {
  const pathname = usePathname();

  if (isProtectedRoute(pathname)) return;

  return (
    <div className={s.footer}>
      {pathname === routes.home.path ? (
        <p className={s.text}>
          Уже есть аккаунт?{" "}
          <Link href={routes.login.path} className={s.link}>
            Войти
          </Link>
        </p>
      ) : (
        <p className={s.text}>
          Еще нет аккаунта?{" "}
          <Link href={routes.home.path} className={s.link}>
            Зарегистрироваться
          </Link>
        </p>
      )}
    </div>
  );
};
