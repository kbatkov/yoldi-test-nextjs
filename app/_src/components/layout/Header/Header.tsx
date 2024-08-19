"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import useSWR from "swr";

import { getProfileFetcher } from "@/_src/actions/fetchers";
import { Button } from "@/_src/components/items";
import { routes } from "@/_src/constants";
import { isProtectedRoute } from "@/_src/helpers";

import s from "./Header.module.scss";

export const Header: React.FC = () => {
  const pathname = usePathname();
  const shouldFetch = isProtectedRoute(pathname);
  const { data } = useSWR(shouldFetch ? `${process.env.NEXT_PUBLIC_API_URL}/profile` : null, getProfileFetcher);

  return (
    <div className={s.header}>
      <Image src="/img/logo.svg" className={s.logo} alt="Logo Yoldi" width={80} height={50} priority />
      <p className={s.text}>Разрабатываем и запускаем сложные веб проекты</p>
      {pathname === routes.home.path && (
        <Button href={routes.login.path} className={s.btn} style="secondary" size="small">
          Войти
        </Button>
      )}
      {pathname === routes.login.path && (
        <Button href={routes.home.path} className={s.btn} style="secondary" size="small">
          Регистрация
        </Button>
      )}
      {pathname === routes.account.path && <>{data && data.name && <p className={s.name}>{data.name}</p>}</>}
    </div>
  );
};
