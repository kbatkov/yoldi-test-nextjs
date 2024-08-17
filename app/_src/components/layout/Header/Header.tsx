"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { Button } from "@/_src/components/items";

import s from "./Header.module.scss";

export const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <div className={s.header}>
      <Image src="/img/logo.svg" className={s.logo} alt="Logo Yoldi" width={80} height={50} priority />
      <p className={s.text}>Разрабатываем и запускаем сложные веб проекты</p>
      {pathname === "/" ? (
        <Button href="/login" className={s.btn} style="secondary" size="small">
          Войти
        </Button>
      ) : (
        <Button href="/" className={s.btn} style="secondary" size="small">
          Регистрация
        </Button>
      )}
    </div>
  );
};
