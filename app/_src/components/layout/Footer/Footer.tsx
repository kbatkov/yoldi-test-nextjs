"use client";
import { Link } from "react-transition-progress/next";
import { usePathname } from "next/navigation";

import s from "./Footer.module.scss";

export const Footer: React.FC = () => {
  const pathname = usePathname();

  if (pathname !== "/" && pathname !== "/login") return;

  return (
    <div className={s.footer}>
      {pathname === "/" ? (
        <p className={s.text}>
          Уже есть аккаунт?{" "}
          <Link href="/login" className={s.link}>
            Войти
          </Link>
        </p>
      ) : (
        <p className={s.text}>
          Еще нет аккаунта?{" "}
          <Link href="/" className={s.link}>
            Зарегистрироваться
          </Link>
        </p>
      )}
    </div>
  );
};
