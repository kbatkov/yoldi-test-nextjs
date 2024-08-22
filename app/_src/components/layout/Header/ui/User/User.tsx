"use cleint";

import Skeleton from "react-loading-skeleton";
import { Link } from "kbatkov-react-transition-progress/next";
import { usePathname } from "next/navigation";

import { Button } from "@/_src/components/items";
import { Avatar } from "@/_src/components/ui";
import { routes } from "@/_src/constants";
import { useGetProfileSWR } from "@/_src/hooks";

import s from "./User.module.scss";

export const User = () => {
  const pathname = usePathname();
  const isShowLoginLink = pathname !== routes.login.path;
  const isShowRegisterLink = pathname === routes.login.path;

  const { data, isLoading } = useGetProfileSWR({});

  const { name, image, slug } = data || {};

  if (!isLoading && data?.statusCode === 401) {
    return (
      <>
        {isShowLoginLink && (
          <Button href={routes.login.path} className={s.btn} style="secondary" size="small">
            Войти
          </Button>
        )}
        {isShowRegisterLink && (
          <Button href={routes.home.path} className={s.btn} style="secondary" size="small">
            Регистрация
          </Button>
        )}
      </>
    );
  }

  if (!isLoading) {
    return (
      <Link href={`${routes.account.path}/${slug}`} className={s.user}>
        {name && <p className={s.name}>{name}</p>}
        <Avatar name={name} image={image} />
      </Link>
    );
  }

  if (isLoading) {
    <div className={s.user}>
      <Skeleton width={100} height={26} />
      <Skeleton width={50} height={50} circle={true} />
    </div>;
  }

  return (
    <div className={s.user}>
      <Skeleton width={100} height={26} />
      <Skeleton width={50} height={50} circle={true} />
    </div>
  );
};
