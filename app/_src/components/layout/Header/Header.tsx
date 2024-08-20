"use client";

import { Link } from "react-transition-progress/next";
import Image from "next/image";

import { routes } from "@/_src/constants";

import { User } from "./ui/User/User";

import s from "./Header.module.scss";

export const Header: React.FC = () => {
  return (
    <div className={s.header}>
      <Link href={routes.list.path} className={s.logo}>
        <Image src="/img/logo.svg" className={s.logo} alt="Logo Yoldi" width={80} height={50} priority />
      </Link>
      <p className={s.text}>Разрабатываем и запускаем сложные веб проекты</p>
      <User />
    </div>
  );
};
