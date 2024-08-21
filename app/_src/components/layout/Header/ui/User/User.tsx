"use cleint";

import Skeleton from "react-loading-skeleton";
import { Link } from "kbatkov-react-transition-progress/next";
import { usePathname } from "next/navigation";

import { Button } from "@/_src/components/items";
import { Avatar } from "@/_src/components/ui";
import { routes } from "@/_src/constants";
import { isProtectedRoute } from "@/_src/helpers";
import { useGetProfileSWR } from "@/_src/hooks";

import s from "./User.module.scss";

export const User = () => {
  const pathname = usePathname();
  const isShowLoginLink = pathname === routes.home.path;
  const isShowRegisterLink = pathname === routes.login.path;
  const shouldFetch = isProtectedRoute(pathname);

  const { data, isLoading } = useGetProfileSWR({ shouldFetch });

  const { name, image, slug } = data || {};

  if (!shouldFetch)
    return (
      <>
        {" "}
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
