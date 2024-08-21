"use client";

import { Link } from "kbatkov-react-transition-progress/next";

import { Avatar } from "@/_src/components/ui";
import { routes } from "@/_src/constants";
import { UserType } from "@/_src/types";

import s from "./UserCard.module.scss";

export const UserCard: React.FC<UserType> = ({ image, name, email, slug }) => {
  return (
    <Link href={`${routes.account.path}/${slug}`} className={s.card}>
      <Avatar className={s.avatar} image={image} name={name} />
      <p className={s.name}>{name}</p>
      <p className={s.email}>{email}</p>
    </Link>
  );
};
